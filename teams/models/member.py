from django.db import models
from django.utils.text import slugify

from sponsors.models import Sponsor
from teams.models.team import Team
from teams.models.school import School

POSITION_TYPES = (
    ('fwd', 'Forward'),
    ('def', 'Defense'),
    ('goal', 'Goalie'),
    ('coach', 'Coach'),
    ('support', 'Support'),
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

    origin = models.CharField(max_length=255, blank=True, null=True)
    born = models.DateField(blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    handedness = models.CharField(choices=HANDEDNESS_TYPES, max_length=10, blank=True, null=True)

    description = models.TextField(blank=True, null=True)
    some_instagram = models.CharField(max_length=255, blank=True, null=True)
    some_twitter = models.CharField(max_length=255, blank=True, null=True)
    some_facebook = models.CharField(max_length=255, blank=True, null=True)
    some_snapchat = models.CharField(max_length=255, blank=True, null=True)

    image = models.ImageField(null=True, blank=True)
    video_url = models.CharField(max_length=255, null=True, blank=True)

    game_years_junior = models.CharField(max_length=24, help_text="Given in the format YYYY-YYYY, e.g. 1983-1987",
                                         blank=True, null=True)
    game_years_pro_tribe = models.CharField(max_length=24, help_text="Given in the format YYYY-YYYY, e.g. 1983-1987",
                                            blank=True, null=True)
    game_years_pro_other = models.CharField(max_length=24, help_text="Given in the format YYYY-YYYY, e.g. 1983-1987",
                                            blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    school = models.CharField(max_length=255, null=True, blank=True)
    teams = models.ManyToManyField(through='TeamMembership', to=Team, related_name='members')

    sponsors = models.ManyToManyField(to=Sponsor, related_name='sponsored_players')

    def save(self, *args, **kwargs):
        if (not self.slug) or (self.slug != self.__get_unique_slug()):
            self.slug = self.__get_unique_slug()
        super().save()

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __get_unique_slug(self):
        slug = slugify(f"{self.first_name} {self.last_name}")
        unique_slug = slug
        num = 1
        while Member.objects.filter(slug=unique_slug).exists():
            unique_slug = '{}-{}'.format(slug, num)
            num += 1
        return unique_slug

    def __str__(self):
        return self.full_name


class TeamMembership(models.Model):
    member = models.ForeignKey(Member, related_name='memberships')
    team = models.ForeignKey(Team, related_name='memberships')
    number = models.IntegerField(null=True, blank=True)
    position = models.CharField(choices=POSITION_TYPES, max_length=10, null=True, blank=True)
    role = models.CharField(max_length=255, null=True, blank=True)