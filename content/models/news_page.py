# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from wagtail.wagtailcore.models import Page
from wagtail.wagtailadmin.edit_handlers import FieldPanel

from news.models import NewsItem


class NewsPage(Page):
    description = models.CharField(max_length=255, blank=True)
    content_panels = Page.content_panels + [
        FieldPanel('description', classname="full")
    ]

    @property
    def news(self):
        return NewsItem.objects.all()