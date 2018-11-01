from django.db import models


class StatsTeam(models.Model):
    name = models.CharField(max_length=255)

    @staticmethod
    def get_or_create(name):
        if StatsTeam.objects.filter(name=name).exists():
            return StatsTeam.objects.get(name=name)
        return StatsTeam.objects.create(name=name)


class StandingsSet(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)


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

