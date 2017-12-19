# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from teams.views.team import members_to_json
from teams.models import Team
from content.models.indians_base_page import IndiansBasePage as Parent

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel


class RepresentativeTeamPage(Parent):
    body = RichTextField(blank=True)
    main_lift = RichTextField(blank=True)
    partners = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('body', classname="full"),
        FieldPanel('main_lift', classname="full"),
        FieldPanel('partners', classname="full"),
    ]

    def get_players(self):
        players = members_to_json(Team.objects.first())
        return players

