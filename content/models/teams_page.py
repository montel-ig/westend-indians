# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from content.models.indians_base_page import IndiansBasePage as Parent

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel

from teams.models import Team


class TeamsPage(Parent):
    description = RichTextField(blank=True)
    content_panels = Page.content_panels + [
        FieldPanel('description', classname="full")
    ]

    @property
    def teams(self):
        return Team.objects.all()