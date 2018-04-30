# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from content.models.indians_base_page import IndiansBasePage as Parent

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from colorful.fields import RGBColorField


class TribePage(Parent):
    body = RichTextField(blank=True)
    main_lift = RichTextField(blank=True)
    partners = RichTextField(blank=True)
    pinnalla_link = models.CharField(max_length=255, blank=True)
    pinnalla2_link = models.CharField(max_length=255, blank=True)
    pinnalla3_link = models.CharField(max_length=255, blank=True)


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


    content_panels = Page.content_panels + [
            FieldPanel('body', classname="full"),
            FieldPanel('main_lift', classname="full"),
            FieldPanel('partners', classname="full"),
            FieldPanel('lift_bgcolor', classname="full"),
            ImageChooserPanel('pinnalla'),
            FieldPanel('pinnalla_link'),
            ImageChooserPanel('pinnalla2'),
            FieldPanel('pinnalla2_link'),
            ImageChooserPanel('pinnalla3'),
            FieldPanel('pinnalla3_link'),

        ]



