import pprint
from html.parser import HTMLParser

import pytz
import requests
from django.core.management import BaseCommand
from django.utils.datetime_safe import datetime

from stats.models import StatsTeam, UpcomingGame

SERIES_ID = 5635
INDIANS_ID = 3587
TZ = pytz.timezone('Europe/Helsinki')


class UpcomingGamesHTMLParser(HTMLParser):
    data = []
    __cur_elem = None
    __cur_date = None
    __cur_location = None
    __cur_home_team = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__current_year = datetime.now().year

    def handle_starttag(self, tag, attrs):
        # print("Encountered a start tag:", tag)
        if tag == 'div':
            if ('class', 'date') in attrs:
                self.__cur_elem = 'date'
                # Get complete time from title of the div
                # eg. [('class', 'date'), ('title', '29.01.2020 18.30, Energia Areena Vantaa')]
                time, location, = attrs[1][1].split(',')
                self.__cur_date = TZ.localize(datetime.strptime(time, '%d.%m.%Y %H.%M'))
                self.__cur_location = location.strip()

            elif ('class', 'hometeam') in attrs:
                self.__cur_elem = 'home-team'
            elif ('class', 'awayteam') in attrs:
                self.__cur_elem = 'away-team'

    def handle_endtag(self, tag):
        # print("Encountered an end tag :", tag)
        self.__cur_elem = None
        # if tag == 'body':
        #     self.data.append(self.__cur_data)

    def handle_data(self, data):
        if self.__cur_elem == 'home-team':
            self.__cur_home_team = data.strip()
        elif self.__cur_elem == 'away-team':
            self.data.append(dict(date=self.__cur_date,
                                  home_team=self.__cur_home_team, away_team=data.strip(),
                                  location=self.__cur_location))
            self.__cur_date = None
            self.__cur_location = None
            self.__cur_home_team = None


class Command(BaseCommand):
    help = 'Import the upcoming games'

    def add_arguments(self, parser):
        parser.add_argument('-d', '--dry-run', dest='dryrun', default=False, action='store_true')

    def handle(self, *args, **kwargs):
        dryrun = kwargs['dryrun']
        url = f"https://api.floorball.fi/embed/{SERIES_ID}/games/upcoming/{INDIANS_ID}"
        if url.startswith('http'):
            print('Fetching from URL %s' % url)
            print('Dryrun? %s' % dryrun)
            with requests.get(url, verify=False) as r:
                parser = UpcomingGamesHTMLParser()
                parser.feed(r.content.decode('UTF-8'))
                pprint.pprint(parser.data)
                if not dryrun:
                    new_games = 0
                    for d in parser.data:
                        away = StatsTeam.get_or_create(d['away_team'])
                        home = StatsTeam.get_or_create(d['home_team'])
                        vars = dict(away_team=away, home_team=home, date=d['date'], location=d['location'])
                        if not UpcomingGame.objects.filter(**vars).exists():
                            UpcomingGame.objects.create(**vars)
                            new_games += 1

                    self.stdout.write(self.style.SUCCESS(f"Updated upcoming games. {new_games} new games found"))
