# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from content.models.indians_base_page import IndiansBasePage as Parent

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel

from events.models import Event


class EventsPage(Parent):
    body = RichTextField(blank=True)
    partners = models.CharField(max_length=255, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('body', classname="full"),
        FieldPanel('partners', classname="full")
    ]

    @property
    def events(self):
        return Event.objects.all()