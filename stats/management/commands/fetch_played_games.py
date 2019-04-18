import pprint
from html.parser import HTMLParser

import pytz
import requests
from django.core.management import BaseCommand
from django.utils.datetime_safe import datetime

from stats.models import StandingsSet, StandingsRow, StatsTeam, PlayedGame

SEASON_ID = 2923
PLAYOFFS_ID = 5257
INDIANS_ID = 3587
TZ = pytz.timezone('Europe/Helsinki')


class PlayedGamesHTMLParser(HTMLParser):
    data = []
    __cur_elem = None
    __cur_date = None
    __cur_location = None
    __cur_home_team = None
    __cur_home_score = None
    __cur_away_team = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__current_year = datetime.now().year

    def handle_starttag(self, tag, attrs):
        # print("Encountered a start tag:", tag)
        if tag == 'div':
            if ('class', 'date') in attrs:
                self.__cur_elem = 'date'
                title = next(filter(lambda x: x[0] == 'title', attrs))[1]
                date, location = title.split(',', 1)
                time = datetime.strptime(date.strip(), '%d.%m.%Y %H.%M')
                self.__cur_date = TZ.localize(time)
                self.__cur_location = location.strip()
            elif ('class', 'home-team') in attrs:
                self.__cur_elem = 'home-team'
            elif ('class', 'away-team') in attrs:
                self.__cur_elem = 'away-team'
            elif ('class', 'home-score') in attrs:
                self.__cur_elem = 'home-score'
            elif ('class', 'away-score') in attrs:
                self.__cur_elem = 'away-score'

    def handle_endtag(self, tag):
        # print("Encountered an end tag :", tag)
        self.__cur_elem = None
        # if tag == 'body':
        #     self.data.append(self.__cur_data)

    def handle_data(self, data):
        # print("Encountered some data  :", data)
        if self.__cur_elem == 'date':
            # date, location = data.split(',', 1)
            # time = datetime.strptime(date.strip(), '%d.%m %H.%M')
            # time = time.replace(year=self.__current_year)
            # self.__cur_date = TZ.localize(time)
            # self.__cur_location = location.strip()
            pass
        elif self.__cur_elem == 'home-team':
            self.__cur_home_team = data.strip()
        elif self.__cur_elem == 'home-score':
            self.__cur_home_score = int(data.strip())
        elif self.__cur_elem == 'away-team':
            self.__cur_away_team = data.strip()
        elif self.__cur_elem == 'away-score':
            self.data.append(dict(away_score=int(data.strip()), home_score=self.__cur_home_score, date=self.__cur_date,
                                  home_team=self.__cur_home_team, away_team=self.__cur_away_team,
                                  location=self.__cur_location))
            self.__cur_date = None
            self.__cur_location = None
            self.__cur_home_team = None
            self.__cur_away_team = None
            self.__cur_home_score = None


class Command(BaseCommand):
    help = 'Import the played games'

    def add_arguments(self, parser):
        parser.add_argument('-d', '--dry-run', dest='dryrun', default=False, action='store_true')
        parser.add_argument('-p', '--playoffs', dest='playoffs', default=False, action='store_true')

    def handle(self, *args, **kwargs):
        dryrun = kwargs['dryrun']
        playoffs = kwargs['playoffs']
        series_id = PLAYOFFS_ID if playoffs else SEASON_ID

        url = f"https://api.floorball.fi/embed/{series_id}/games/played/{INDIANS_ID}"
        if url.startswith('http'):
            print('Fetching from URL %s' % url)
            print('Dryrun? %s' % dryrun)
            with requests.get(url) as r:
                parser = PlayedGamesHTMLParser()
                parser.feed(r.content.decode('UTF-8'))
                pprint.pprint(parser.data)
                if not dryrun:
                    new_games = 0
                    for d in parser.data:
                        away = StatsTeam.get_or_create(d['away_team'])
                        home = StatsTeam.get_or_create(d['home_team'])
                        vars = dict(away_team=away, home_team=home, date=d['date'], location=d['location'],
                                    away_score=d['away_score'], home_score=d['home_score'])
                        if not PlayedGame.objects.filter(**vars).exists():
                            PlayedGame.objects.create(**vars)
                            new_games += 1

                    self.stdout.write(self.style.SUCCESS(f"Updated played games. {new_games} new games found"))

