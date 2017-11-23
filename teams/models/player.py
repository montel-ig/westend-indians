from django.db import models
from django.utils.text import slugify

from teams.models.team import Team
from teams.models.school import School

POSITION_TYPES = (
    ('fwd', 'Forward'),
    ('def', 'Defense'),
    ('goal', 'Goalie'),
    ('player', 'Player'),
)
HANDEDNESS_TYPES = (
    ('left', 'Left'),
    ('right', 'Right'),
    ('both', 'Both'),
)


class Member(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True, editable=False)

    origin = models.CharField(max_length=255)
    born = models.DateTimeField()
    weight = models.IntegerField()
    height = models.IntegerField()
    handedness = models.CharField(choices=HANDEDNESS_TYPES, max_length=10)

    description = models.TextField()
    some_instagram = models.CharField(max_length=255)
    some_twitter = models.CharField(max_length=255)
    some_facebook = models.CharField(max_length=255)
    some_snapchat = models.CharField(max_length=255)

    game_years_junior = models.CharField(max_length=24)
    game_years_pro_tribe = models.CharField(max_length=24)
    game_years_pro_other = models.CharField(max_length=24)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    school = models.ForeignKey(School, null=True, default=None)
    teams = models.ManyToManyField(through='TeamMembership', to=Team, related_name='members')

    def save(self, *args, **kwargs):
        if (not self.slug) or (self.slug != self.__get_unique_slug()):
            self.slug = self.__get_unique_slug()
        super().save()

    def __get_unique_slug(self):
        slug = slugify(f"{self.first_name} {self.last_name}")
        unique_slug = slug
        num = 1
        while Member.objects.filter(slug=unique_slug).exists():
            unique_slug = '{}-{}'.format(slug, num)
            num += 1
        return unique_slug


class TeamMembership(models.Model):
    member = models.OneToOneField(Member)
    team = models.OneToOneField(Team)
    number = models.IntegerField()
    position = models.CharField(choices=POSITION_TYPES, max_length=10)