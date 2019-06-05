import os
import pytz
import requests
import pprint
from datetime import datetime

from django.conf import settings
from django.core.management import BaseCommand
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from events.models import Event

TZ = 'Europe/Helsinki'


class Command(BaseCommand):
    help = 'Import the floud events'
    username = os.environ.get('FLOUD_USERNAME')
    floud_client_id = os.environ.get('FLOUD_CLIENT_ID')
    floud_secret = os.environ.get('FLOUD_SECRET')
    floud_username = os.environ.get('FLOUD_USERNAME')
    floud_external_token = os.environ.get('FLOUD_EXTERNAL_TOKEN')
    floud_access_token = os.environ.get('FLOUD_ACCESS_TOKEN')
    floud_refresh_token = os.environ.get('FLOUD_REFRESH_TOKEN')

    host = 'api.floud.com'
    api_url = 'https://api.floud.com/api/v1/'
    list_events_url = '/external/events/'

    def add_arguments(self, parser):
        parser.add_argument('-d', '--dry-run', dest='dryrun', default=False, action='store_true')

    def handle(self, *args, **kwargs):
        dryrun = kwargs['dryrun']
        print('Dryrun? %s' % dryrun)
        data = self.get_events_list()
        if data.status_code == 401:
            # Access token is valid for 30 mins,
            # so practically we do this every time
            self.stdout.write(self.style.WARNING('We need to reauthenticate...'))
            self.refresh_access_code()
            data = self.get_events_list()

        if data.ok:
            events = data.json()['Events']
            if not dryrun:
                new_events = 0
                old_events = 0
                for e in events:
                    start = datetime.strptime(e['Start'], '%Y-%m-%dT%H:%M:%S')
                    end = datetime.strptime(e['End'], '%Y-%m-%dT%H:%M:%S')
                    vars = dict(street_address=e['Address'],
                                name=e['Name'],
                                start_time=pytz.timezone(TZ).localize(start),
                                end_time=pytz.timezone(TZ).localize(end),
                                subject='miehet-edustus')
                    if not Event.objects.filter(start_time=vars['start_time'], end_time=vars['end_time']).exists():
                        Event.objects.create(**vars)
                        new_events += 1
                    else:
                        old_events += 1

                self.stdout.write(self.style.SUCCESS(f"Updated events. {new_events} new events found"))
                if old_events > 0:
                    self.stdout.write(self.style.WARNING(f'{old_events} old events found'))
            else:
                pprint.pprint(data.json())

        else:
            self.stdout.write(self.style.ERROR('Something went wrong'))
            print(data)

    def refresh_access_code(self):
        headers = {
            'content-type': 'application/json',
            'host': self.host
        }
        data = {
            'username': self.username,
            'external_token': self.floud_external_token,
            'grant_type': 'external',
            'client_id': self.floud_client_id,
            'client_secret': self.floud_secret,
        }
        response = requests.get('https://api.floud.com/token', headers=headers, data=data)
        content = response.json()
        if 'error' in content:
            self.stdout.write(self.style.ERROR(content['error']))
        else:
            self.floud_access_token = content['access_token']
            self.stdout.write(self.style.SUCCESS('Success'))
        return content

    def get_events_list(self):
        url = self.api_url + self.list_events_url
        headers = {
            'host': self.host,
            'Authorization': f"bearer {self.floud_access_token}"
        }
        print('Fetching from URL %s' % url)
        response = requests.get(url, headers=headers)
        return response

