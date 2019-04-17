from django.utils.datetime_safe import datetime

from content.models.indians_base_page import IndiansBasePage as Parent

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel

from stats.models import StandingsSet, PlayedGame, UpcomingGame
from stats import utils


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

    @property
    def standings(self):
        return StandingsSet.latest()

    @property
    def played_games(self):
        this_year = datetime.now().year
        return PlayedGame.objects.filter(date__year=this_year).order_by('id')

    @property
    def upcoming_games(self):
        now = datetime.now()
        return UpcomingGame.objects.filter(date__gte=now)

    @property
    def standings_json(self):
        standings = self.standings
        return utils.standings_to_json(standings)
