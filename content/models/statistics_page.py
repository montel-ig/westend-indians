# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from content.models.indians_base_page import IndiansBasePage as Parent

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel


class StatisticsPage(Parent):
    body = RichTextField(blank=True)
    matches = RichTextField(blank=True)
    series_status = RichTextField(blank=True)
    points = RichTextField(blank=True)
    partners = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('body', classname="full"),
        FieldPanel('matches', classname="full"),
        FieldPanel('series_status', classname="full"),
        FieldPanel('points', classname="full"),
        FieldPanel('partners', classname="full"),
    ]
