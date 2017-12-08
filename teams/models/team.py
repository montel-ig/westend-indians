from django.db import models

from django.utils.text import slugify

from teams.models.area import Area

SPORT_TYPES = (
    ('floorball', 'Floorball'),
    ('multiple', 'Multiple sports'),
    ('running', 'Running sports'),
    ('futsal', 'Futsal'),
    ('soccer', 'Soccer'),
)

class Team(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True, editable=False)

    description = models.TextField(null=True, blank=True)
    contact_email = models.EmailField(blank=True, null=True)
    contact_phone = models.CharField(max_length=64, blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    some_instagram = models.CharField(max_length=255, blank=True, null=True)
    some_twitter = models.CharField(max_length=255, blank=True, null=True)
    some_facebook = models.CharField(max_length=255, blank=True, null=True)
    some_snapchat = models.CharField(max_length=255, blank=True, null=True)

    sport = models.CharField(blank=True, null=True, max_length=12, choices=SPORT_TYPES)
    area = models.ForeignKey(Area, null=True, blank=True)

    player_age_start = models.SmallIntegerField(null=True, blank=True)
    player_age_end = models.SmallIntegerField(null=True, blank=True)
    max_players = models.SmallIntegerField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if (not self.slug) or (self.slug != self.__get_unique_slug()):
            self.slug = self.__get_unique_slug()
        super().save()

    def __get_unique_slug(self):
        slug = slugify(self.name)
        unique_slug = slug
        num = 1
        while Team.objects.filter(slug=unique_slug).exists():
            unique_slug = '{}-{}'.format(slug, num)
            num += 1
        return unique_slug