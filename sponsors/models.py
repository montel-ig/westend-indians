from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFit


class Sponsor(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=255, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    sponsor_thumbnail = ImageSpecField(source='image',
                                       processors=[ResizeToFit(width=150, height=150, upscale=False)],
                                       format='PNG',
                                       options={'quality': 60},
                                       autoconvert=True)

    level = models.CharField(choices=(
        ('top', 'Top level sponsor'),
        ('second', 'Second level sponsor'),
        ('third', 'Third level sponsor'),
        ('bottom', 'Bottom level logo'),
    ), blank=True, null=True, max_length=12)

    boost = models.SmallIntegerField(default=0)
    visible_for_team = models.BooleanField(default=True)
    visible_for_tribe = models.BooleanField(default=True)
    visible_for_frontpage = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
