# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from content.models.indians_base_page import IndiansBasePage as Parent

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel
from wagtail.wagtailimages.models import Image
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from colorful.fields import RGBColorField


class HomePage(Parent):
    description = models.CharField(max_length=255, blank=True)

    team_title = models.CharField(max_length=255, blank=True)
    team_description = models.CharField(max_length=255, blank=True)
    team_cta = models.CharField(max_length=255, blank=True)

    tribe_title = models.CharField(max_length=255, blank=True)
    tribe_description = models.CharField(max_length=255, blank=True)
    tribe_cta = models.CharField(max_length=255, blank=True)

    shop_title = models.CharField(max_length=255, blank=True)
    shop_description = models.CharField(max_length=255, blank=True)
    shop_cta = models.CharField(max_length=255, blank=True)

    pinnalla = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    pinnalla2 = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    pinnalla3 = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    lift_bgcolor = RGBColorField(max_length=120,blank=True)

    body = RichTextField(blank=True)
    content_panels = Page.content_panels + [
        FieldPanel('description', classname="full"),
        FieldPanel('body', classname="full"),

        FieldPanel('team_title', classname="full"),
        FieldPanel('team_description', classname="full"),
        FieldPanel('team_cta', classname="full"),

        FieldPanel('tribe_title', classname="full"),
        FieldPanel('tribe_description', classname="full"),
        FieldPanel('tribe_cta', classname="full"),

        FieldPanel('shop_title', classname="full"),
        FieldPanel('shop_description', classname="full"),
        FieldPanel('shop_cta', classname="full"),

        FieldPanel('lift_bgcolor', classname="full"),
        ImageChooserPanel('pinnalla'),
        ImageChooserPanel('pinnalla2'),
        ImageChooserPanel('pinnalla3'),
    ]


