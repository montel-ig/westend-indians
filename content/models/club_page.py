# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel


class ClubPage(Page):
    body = RichTextField(blank=True)
    introduction = RichTextField(blank=True)
    values = RichTextField(blank=True)
    contact = RichTextField(blank=True)
    personnel = RichTextField(blank=True)
    partners = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('body', classname="full"),
        FieldPanel('introduction', classname="full"),
        FieldPanel('values', classname="full"),
        FieldPanel('contact', classname="full"),
        FieldPanel('personnel', classname="full"),
        FieldPanel('partners', classname="full"),
    ]
