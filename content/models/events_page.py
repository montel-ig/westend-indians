# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from wagtail.wagtailcore.models import Page
from wagtail.wagtailadmin.edit_handlers import FieldPanel

from events.models import Event


class EventsPage(Page):
    description = models.CharField(max_length=255, blank=True)
    content_panels = Page.content_panels + [
        FieldPanel('description', classname="full")
    ]

    @property
    def events(self):
        return Event.objects.all()