# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from wagtail.wagtailcore.models import Page

from sponsors.models import Sponsor
from news.models import NewsItem


class IndiansBasePage(Page):

    #sponsors
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

    #news
    @property
    def front_page_news(self):
        return NewsItem.objects.order_by("-created_at")[:3]
    
    class Meta:
        abstract = True