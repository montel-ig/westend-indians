from django.db import models

from teams.models import Team


class Signup(models.Model):

    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.EmailField()
    phone = models.CharField(max_length=24)

    comments = models.TextField(null=True, blank=True)
    team = models.ForeignKey(Team)

    staff_comments = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name + ' ' + self.last_name
