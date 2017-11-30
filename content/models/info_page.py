# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel


class InfoPage(Page):
    body = RichTextField(blank=True)
    tickets = RichTextField(blank=True)
    information = RichTextField(blank=True)
    contact = RichTextField(blank=True)
    partners = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('body', classname="full"),
        FieldPanel('tickets', classname="full"),
        FieldPanel('information', classname="full"),
        FieldPanel('contact', classname="full"),
        FieldPanel('partners', classname="full"),
    ]
