# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from wagtail.wagtailcore.models import Page

from sponsors.models import Sponsor


class IndiansBasePage(Page):

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

    class Meta:
        abstract = True