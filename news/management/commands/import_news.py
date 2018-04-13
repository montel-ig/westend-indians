import json

import datetime
from urllib.parse import urlparse

import pytz
import requests
from django.core.files import File
from django.core.management import BaseCommand
from io import BytesIO

from news.models import NewsItem


class Command(BaseCommand):
    help = 'Import the news from the given url'

    def add_arguments(self, parser):
        parser.add_argument('posts_url', type=str)

    def handle(self, *args, **kwargs):
        url = kwargs['posts_url']
        content = None
        if url.startswith('http'):
            print('Fetching from URL %s' % url)
            with requests.get(url) as r:
                content = r.json()
        else:
            if url.startswith('file://'):
                url = url[7:]
            print('Fetching from FILE %s' % url)
            with open(url, 'rt') as f:
                content = json.load(f)

        for n in content:
            n = self._convert_to_news_item(n)

    def _convert_to_news_item(self, e):
        title = e['title']
        ingress = e['introduction']
        subject = 'miehet-edustus' if e['team'] == 'Miehet Edustus' else 'heimo'
        if subject == 'miehet-edustus':
            body = e['content'] + \
                   f"<p class='author'>// {e['text_by']}</p>"
        else:
            if e['team']:
                body = f"<p class='team'>{e['team']}</p>" + \
                       e['content'] + \
                       f"<p class='author'>// {e['text_by']}</p>"
            else:
                body = e['content'] + \
                       f"<p class='author'>// {e['text_by']}</p>"

        try:
            publication_date = datetime.datetime.strptime(e['published_at'], '%Y-%m-%dT%H:%M:%S+03:00')
        except ValueError:
            publication_date = datetime.datetime.strptime(e['published_at'], '%Y-%m-%dT%H:%M:%S+02:00')
        except TypeError:
            publication_date = datetime.datetime(2012, 1, 1, 0, 0, 0)  # there are null values..

        publication_date = pytz.timezone('Europe/Helsinki').localize(publication_date)
        if NewsItem.objects.filter(title=title, publication_date=publication_date).exists():
            print(f'Already had {title}')
            return NewsItem.objects.get(title=title, publication_date=publication_date)

        news_item = NewsItem(
            title=title,
            ingress=ingress,
            subject=subject,
            body=body,
            publication_date=publication_date,
        )

        if e['mainimage']:
            image = requests.get(e['mainimage'])
            fp = BytesIO()
            fp.write(image.content)
            name = urlparse(e['mainimage']).path.split('/')[-1]
            news_item.image.save(name, File(fp))
        news_item.save()
        print(f'Imported #{news_item.id} {news_item.title}')
        return news_item
