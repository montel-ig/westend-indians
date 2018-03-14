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


class IndiansBasePage(Page):

    # Sponsors

    @property
    def all_sponsors(self):
        return Sponsor.objects.all()

    @property
    def team_sponsors(self):
        return Sponsor.objects.filter(visible_for_team=True)

    @property
    def tribe_sponsors(self):
        return Sponsor.objects.filter(visible_for_tribe=True)

    @property
    def front_page_sponsors(self):
        return Sponsor.objects.filter(visible_for_frontpage=True)

    # News

    @property
    def front_page_news(self):
        return NewsItem.objects.order_by("-created_at")[:3]

    @property
    def representative_team_page_news_json(self):
        now = datetime.datetime.now()
        news = NewsItem.objects.filter(subject='miehet-edustus', publication_date__lt=now).order_by("-publication_date")[:3]
        return _serialize_news(news)

    @property
    def tribe_page_news(self):
        now = datetime.datetime.now()
        return NewsItem.objects.filter(subject='heimo', publication_date__lt=now).order_by("-publication_date")[:3]

    # Events

    @property
    def front_page_events(self):
        return Event.objects.order_by("-created_at")[:3]

    # Products

    @property
    def front_page_product_images(self):
        return ProductImage.objects.order_by('-id')[:4]

    # Matches

    @property
    def representative_team_page_matches(self):
        teamId = 2
        now = datetime.datetime.now()
        return Match.objects.filter(date__gt=now, team__id=teamId).order_by('date')[:6]

    @property
    def upcoming_homegame(self):
        teamId = 2
        now = datetime.datetime.now()
        return Match.objects.filter(homegame=True, date__gt=now, team__id=teamId).order_by('-date').last()

    # Lift images

    @property
    def lift_count(self):
        images = [self.pinnalla,self.pinnalla2,self.pinnalla3]
        count = len([i for i in images if i])
        return count

    class Meta:
        abstract = True