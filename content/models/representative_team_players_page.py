# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from content.models.indians_base_page import IndiansBasePage as Parent

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from colorful.fields import RGBColorField

from teams.models import Team
from teams.views import members_to_json, team_properties


class RepresentativeTeamPlayersPage(Parent):
    body = RichTextField(blank=True)

    team_photo = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

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
            ImageChooserPanel('team_photo'),
            ImageChooserPanel('pinnalla'),
            ImageChooserPanel('pinnalla2'),
            ImageChooserPanel('pinnalla3'),
            FieldPanel('lift_bgcolor', classname="full"),
        ]

    # Representative team object.. relies on db slug
    @property
    def representative_team(self):
        team = Team.objects.get(slug='miehet-edustus')
        return team

    def properties(self):
        return team_properties(self.representative_team)

    def members_json(self):
        return members_to_json(self.representative_team)