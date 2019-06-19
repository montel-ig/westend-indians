# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.db.models import TextField

from events.models import Event
from content.models.indians_base_page import IndiansBasePage as Parent

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel


class InfoPage(Parent):
    body = RichTextField(blank=True)
    tickets = RichTextField(blank=True)
    information = RichTextField(blank=True)
    contact = RichTextField(blank=True)
    partners = RichTextField(blank=True)
    tables = TextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('body', classname="full"),
        FieldPanel('tickets', classname="full"),
        FieldPanel('information', classname="full"),
        FieldPanel('contact', classname="full"),
        FieldPanel('partners', classname="full"),
        FieldPanel('tables', classname="full"),
    ]

    @property
    def events(self):
        return Event.objects.filter(subject="miehet-edustus")
