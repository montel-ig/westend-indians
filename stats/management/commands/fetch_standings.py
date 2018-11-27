import pprint
from datetime import timedelta
from html.parser import HTMLParser

import requests
from django.core.management import BaseCommand
from django.utils.datetime_safe import datetime

from stats.models import StandingsSet, StandingsRow, StatsTeam

SERIES_ID = 2923


class StandingsHTMLParser(HTMLParser):
    DIGIT_ORDER = [
        'matches', 'wins', 'losses_contd_period', 'losses',
        'goals_scored', 'goals_suffered', 'goal_difference', 'points'
    ]
    team_data = []
    __cur_elem = None
    __cur_team_data = []
    __digit_counter = None

    def handle_starttag(self, tag, attrs):
        # print("Encountered a start tag:", tag)
        self.__cur_elem = None
        if tag == 'td':
            if ('class', 'ranking') in attrs:
                if self.__cur_team_data:
                    self.team_data.append(self.__cur_team_data)
                self.__cur_elem = 'position'
                self.__cur_team_data = []
                self.__digit_counter = -1  # start from -1 to end up with 0-based list
            elif ('class', 'team') in attrs:
                self.__cur_elem = 'name'
            elif ('class', 'twoDigit') in attrs or ('class', 'threeDigit') in attrs:
                self.__digit_counter += 1
                self.__cur_elem = 'digit'

    def handle_endtag(self, tag):
        # print("Encountered an end tag :", tag)
        if tag == 'body':
            self.team_data.append(self.__cur_team_data)

    def handle_data(self, data):
        # print("Encountered some data  :", data)
        if self.__cur_elem:
            data = data.strip()
            if data:
                if self.__cur_elem == 'digit':
                    key = self.DIGIT_ORDER[self.__digit_counter]
                else:
                    key = self.__cur_elem
                print(f"Marking {key} as {data}")
                self.__cur_team_data.append((key, data))


class Command(BaseCommand):
    help = 'Import the series standings'

    def add_arguments(self, parser):
        parser.add_argument('-d', '--dry-run', dest='dryrun', default=False, action='store_true')

    def handle(self, *args, **kwargs):
        dryrun = kwargs['dryrun']
        url = f"https://api.floorball.fi/embed/{SERIES_ID}/standings"
        if url.startswith('http'):
            print('Fetching from URL %s' % url)
            with requests.get(url) as r:
                parser = StandingsHTMLParser()
                parser.feed(r.content.decode('UTF-8'))
                pprint.pprint(parser.team_data)
                if not dryrun:
                    recent_rows = StandingsSet.objects.filter(created_at__gte=(datetime.now() - timedelta(hours=6)))
                    for recent in recent_rows:
                        self.stdout.write(self.style.WARNING(f"Deleting recent set {recent} to create an update"))
                        recent.delete()
                    standings_set = StandingsSet.objects.create()
                    for team_data in parser.team_data:
                        team = StatsTeam.get_or_create(list(filter(lambda x: x[0] == 'name', team_data))[0][1])
                        row = StandingsRow(set=standings_set, team=team)
                        for attr, val in team_data:
                            if hasattr(row, attr):
                                setattr(row, attr, val)
                        # note that we are hardcoding this here to 0 as it is not provided in the data
                        row.wins_contd_period = 0
                        row.save()

                    self.stdout.write(self.style.SUCCESS(f"Created a new Standings set with {standings_set.rows.count()} rows"))

