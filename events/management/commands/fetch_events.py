import os
import pytz
import requests
import pprint
import urllib.request
from datetime import datetime

from django.core.files import File
from django.core.management import BaseCommand
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
    my_events_url = '/Events/GetMyEvents'

    def add_arguments(self, parser):
        parser.add_argument('-d', '--dry-run', dest='dryrun', default=False, action='store_true')

    def handle(self, *args, **kwargs):
        dryrun = kwargs['dryrun']
        # print('Dryrun? %s' % dryrun)
        self.refresh_access_code()
        data = self.get_my_events()
        if data.status_code == 401:
            self.stdout.write(self.style.WARNING('We need to reauthenticate...'))
            self.refresh_access_code()
            data = self.get_my_events()

        if data.ok:
            events = data.json()
            self.stdout.write(self.style.SUCCESS(f"total: {len(events)}"))
            if not dryrun:
                new_events = 0
                old_events = 0
                skipped_events = 0
                for e in events:
                    if e['MinPrice'] <= 0.0:
                        skipped_events += 1
                        continue
                    start = datetime.strptime(e['Start'], '%Y-%m-%dT%H:%M:%S')
                    end = datetime.strptime(e['End'], '%Y-%m-%dT%H:%M:%S')
                    vars = dict(street_address=e['VenueName'],
                                name=e['Name'],
                                start_time=pytz.timezone(TZ).localize(start),
                                end_time=pytz.timezone(TZ).localize(end),
                                subject='miehet-edustus')
                    event = Event(**vars)
                    if e['ImageThumbUrl']:
                        event = self.set_image(event, e['ImageThumbUrl'])
                    if not Event.objects.filter(start_time=vars['start_time'], end_time=vars['end_time']).exists():
                        event.save()
                        new_events += 1
                    else:
                        old_events += 1
                if new_events == 0:
                    self.stdout.write(self.style.WARNING(f"no new events found"))
                else:
                    self.stdout.write(self.style.SUCCESS(f"Updated events. {new_events} new events found"))
                if old_events > 0:
                    self.stdout.write(self.style.WARNING(f'Skipped {old_events} (old) events'))
                if skipped_events > 0:
                    self.stdout.write(self.style.WARNING(f'Skipped {skipped_events} (private) events'))
            else:
                pprint.pprint(data.json())

        else:
            self.stdout.write(self.style.ERROR('Something went wrong'))
            print(data.json())

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
            self.stdout.write(self.style.SUCCESS('Logged in'))
        return content

    def get_events_list(self):
        url = self.api_url + self.list_events_url
        #print('fetching with token', self.floud_access_token)
        headers = {
            'host': self.host,
            'Accept': 'application/json',
            'Authorization': f"bearer {self.floud_access_token}"
        }
        print('Fetching from URL %s' % url)
        response = requests.get(url, headers=headers)
        return response

    def get_my_events(self):
        url = self.api_url + self.my_events_url
        # print('fetching our events with token', self.floud_access_token)
        headers = {
            # 'host': self.host,
            'Accept': 'application/json',
            'Authorization': f"bearer {self.floud_access_token}"
        }
        print(f"Fetching events from {url}")
        response = requests.get(url, headers=headers)
        return response

    def set_image(self, event, image_url):
        result = urllib.request.urlretrieve(image_url)
        event.image.save(
            os.path.basename(image_url),
            File(open(result[0], 'rb')),
            save=False
        )
        return event

