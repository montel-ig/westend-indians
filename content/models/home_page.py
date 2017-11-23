# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel


class HomePage(Page):
    description = models.CharField(max_length=255, blank=True,)
    home_page_cta = models.CharField(max_length=255, blank=True)

    body = RichTextField(blank=True)
    content_panels = Page.content_panels + [
        FieldPanel('description', classname="full"),
        FieldPanel('body', classname="full"),
    ]


