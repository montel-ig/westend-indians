from django.db import models
from django.utils.text import slugify

from news.models import NewsItem


class StatsTeam(models.Model):
    name = models.CharField(max_length=255)

    @staticmethod
    def get_or_create(name):
        if StatsTeam.objects.filter(name=name).exists():
            return StatsTeam.objects.get(name=name)
        return StatsTeam.objects.create(name=name)

    def __str__(self):
        return f"{self.name}"


class StandingsSet(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)

    @staticmethod
    def latest():
        return StandingsSet.objects.all().order_by('-created_at').prefetch_related('rows', 'rows__team').first()


class StandingsRow(models.Model):
    team = models.ForeignKey(StatsTeam, on_delete=models.CASCADE)
    set = models.ForeignKey(StandingsSet, on_delete=models.CASCADE, related_name='rows')
    position = models.SmallIntegerField()
    matches = models.SmallIntegerField()
    wins = models.SmallIntegerField()
    wins_contd_period = models.SmallIntegerField()
    losses = models.SmallIntegerField()
    losses_contd_period = models.SmallIntegerField()
    goals_scored = models.SmallIntegerField()
    goals_suffered = models.SmallIntegerField()
    goal_difference = models.SmallIntegerField()
    points = models.SmallIntegerField()


class PlayedGame(models.Model):
    home_team = models.ForeignKey(StatsTeam, on_delete=models.CASCADE, related_name='as_home_team')
    away_team = models.ForeignKey(StatsTeam, on_delete=models.CASCADE, related_name='as_away_team')
    date = models.DateTimeField()
    location = models.CharField(max_length=255, null=True, blank=True)
    home_score = models.SmallIntegerField(default=0)
    away_score = models.SmallIntegerField(default=0)
    game_report = models.ForeignKey(NewsItem, on_delete=models.SET_NULL, null=True, blank=True,
                                    related_name='as_game_report')

    def __str__(self):
        return f"{self.home_team} - {self.away_team}"


class UpcomingGame(models.Model):
    home_team = models.ForeignKey(StatsTeam, on_delete=models.CASCADE, related_name='as_upcoming_home_team')
    away_team = models.ForeignKey(StatsTeam, on_delete=models.CASCADE, related_name='as_upcoming_away_team')
    date = models.DateTimeField()
    location = models.CharField(max_length=255, null=True, blank=True)

