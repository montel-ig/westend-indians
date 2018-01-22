from django.db import models

from teams.models.team import Team
from teams.models.area import Area


class Match(models.Model):
    opponent = models.CharField(max_length=255)
    homegame = models.BooleanField(default=True)
    date = models.DateTimeField(null=False)
    team = models.ForeignKey(Team, null=False)
    location = models.CharField(max_length=255, null=True, blank=True)

    @property
    def match_name(self):
        if self.homegame:
            return f"{self.team.name} - {self.opponent} {self.date.date().strftime('%d.%m.%Y')}"
        else:
            return f"{self.opponent} - {self.team.name} {self.date.date()}"

    def __str__(self):
        return self.match_name

    class Meta:
        verbose_name_plural = 'Matches'