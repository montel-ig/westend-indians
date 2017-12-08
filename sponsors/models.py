from django.db import models

class Sponsor(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=255, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    level = models.CharField(choices=(
        ('top', 'Top level sponsor'),
        ('second', 'Second level sponsor'),
        ('third', 'Third level sponsor'),
    ), blank=True, null=True, max_length=12)

    visible_for_team = models.BooleanField(default=True)
    visible_for_tribe = models.BooleanField(default=True)
    visible_for_frontpage = models.BooleanField(default=True)


    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
