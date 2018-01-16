# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from content.models.indians_base_page import IndiansBasePage as Parent

from wagtail.wagtailcore.models import Page
from wagtail.wagtailadmin.edit_handlers import FieldPanel

from teams.models import Team


class TeamsPage(Parent):
    description = models.CharField(max_length=255, blank=True,)
    content_panels = Page.content_panels + [
        FieldPanel('description', classname="full")
    ]

    @property
    def teams(self):
        return Team.objects.all()