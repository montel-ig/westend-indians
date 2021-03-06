# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from wagtail.wagtailcore.models import Page

from django.db.models.functions import datetime

from news.utils import _serialize_news
from sponsors.models import Sponsor
from news.models import NewsItem
from events.models import Event
from products.models import ProductImage
from teams.models import Match
from stats.models import UpcomingGame


class IndiansBasePage(Page):

    # Sponsors

    @property
    def all_sponsors(self):
        return Sponsor.objects.all().order_by('-boost')

    @property
    def team_sponsors(self):
        return Sponsor.objects.filter(visible_for_team=True).order_by('-boost')

    @property
    def tribe_sponsors(self):
        return Sponsor.objects.filter(visible_for_tribe=True).order_by('-boost')

    @property
    def front_page_sponsors(self):
        return Sponsor.objects.filter(visible_for_frontpage=True).order_by('-boost')

    # News

    @property
    def front_page_news(self):
        return NewsItem.objects.order_by("-created_at")[:3]

    @property
    def representative_team_page_news_json(self):
        now = datetime.datetime.now()
        news = NewsItem.objects.filter(subject='miehet-edustus', publication_date__lt=now, visible=True).order_by(
            "-publication_date")[:5]
        return _serialize_news(news)

    @property
    def tribe_page_news_json(self):
        now = datetime.datetime.now()
        news = NewsItem.objects.filter(subject='heimo', publication_date__lt=now, visible=True).order_by(
            "-publication_date")[:5]
        return _serialize_news(news)

    # Events

    @property
    def front_page_events(self):
        return Event.objects.order_by("-created_at")[:3]

    # Products

    @property
    def front_page_product_images(self):
        return ProductImage.objects.order_by('-id')[:4]

    # Lift images

    @property
    def lift_count(self):
        images = [self.pinnalla, self.pinnalla2, self.pinnalla3]
        count = len([i for i in images if i])
        return count

    @property
    def home_banners(self):
        home = Page.objects.get(title="Westend Indians").homepage
        images = [home.pinnalla, home.pinnalla2, home.pinnalla3]
        count = len([i for i in images if i])
        return dict(count=count, page=home)

    class Meta:
        abstract = True

    # Games

    @property
    def upcoming_home_games(self):
        team = "Indians"
        now = datetime.datetime.now()
        return UpcomingGame.objects.filter(date__gte=now, home_team__name=team).order_by('date')
