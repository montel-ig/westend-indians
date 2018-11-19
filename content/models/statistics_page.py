from django.utils.datetime_safe import datetime

from content.models.indians_base_page import IndiansBasePage as Parent

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel

from stats.models import StandingsSet, PlayedGame, UpcomingGame


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
        return PlayedGame.objects.filter(date__year=this_year)

    @property
    def upcoming_games(self):
        now = datetime.now()
        return UpcomingGame.objects.filter(date__gte=now)
