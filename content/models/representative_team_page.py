# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from content.models.indians_base_page import IndiansBasePage as Parent

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from colorful.fields import RGBColorField


class RepresentativeTeamPage(Parent):
    body = RichTextField(blank=True)
    main_lift = RichTextField(blank=True)
    partners = RichTextField(blank=True)

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
            ImageChooserPanel('pinnalla2'),
            ImageChooserPanel('pinnalla3'),
        ]

