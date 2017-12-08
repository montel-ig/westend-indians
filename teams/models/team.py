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

GENDER_TYPES = (
    ('male', 'Male'),
    ('female', 'Female'),
    ('mixed', 'Mixed'),
)

PATH_TYPES = (
    ('urheilijan', 'Urheilijan polku (3+)'),
    ('kilpailijan', 'Kilpailijan polku (3-2)'),
    ('harrastajan', 'Harrastajan polku (1)'),
    ('salibandy_koulut', 'Salibandy koulut (1, 2 tai 3)'),
    ('koulujen_iltapaivatoiminta', 'Koulujen iltapäivätoiminta (1 tai 2)'),
    ('erityisryhmat', 'Erityisryhmät'),
)

AGE_LEVEL_TYPES = (
    ('adult', '+20-vuotiaat (Aikuiset)'),
    ('a', '20-17-vuotiaat (A-juniorit)'),
    ('b', '17-15-vuotiaat (B-juniorit)'),
    ('c', '15-13-vuotiaat (C-juniorit)'),
    ('d', '13-11-vuotiaat (D-juniorit)'),
    ('e', '11-9-vuotiaat (E-juniorit)'),
    ('f', '9-7-vuotiaat (F-juniorit)'),
    ('g', '7-5-vuotiaat (G-juniorit)'),
    ('h', '5-3-vuotiaat (H-juniorit)'),
    ('i', '3-1 vuotiaat (I-juniorit)')
)


class Team(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True, editable=False)

    description = models.TextField(null=True, blank=True)

    contact_name = models.CharField(blank=True, null=True, max_length=255)
    contact_email = models.EmailField(blank=True, null=True)
    contact_phone = models.CharField(max_length=64, blank=True, null=True)

    leader_name = models.CharField(blank=True, null=True, max_length=255)
    leader_email = models.EmailField(blank=True, null=True)
    leader_phone = models.CharField(max_length=64, blank=True, null=True)

    brochure = models.FileField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    some_instagram = models.CharField(max_length=255, blank=True, null=True)
    some_twitter = models.CharField(max_length=255, blank=True, null=True)
    some_facebook = models.CharField(max_length=255, blank=True, null=True)
    some_snapchat = models.CharField(max_length=255, blank=True, null=True)

    # player_age_start = models.SmallIntegerField(null=True, blank=True)
    # player_age_end = models.SmallIntegerField(null=True, blank=True)

    current_player_count = models.SmallIntegerField(null=True, blank=True)
    max_player_count = models.SmallIntegerField(null=True, blank=True)

    gender = models.CharField(max_length=12, null=True, blank=True, choices=GENDER_TYPES)
    path = models.CharField(max_length=32, null=True, blank=True, choices=PATH_TYPES)
    sport = models.CharField(blank=True, null=True, max_length=12, choices=SPORT_TYPES)
    age_level = models.CharField(blank=True, null=True, max_length=12, choices=AGE_LEVEL_TYPES)
    area = models.ForeignKey(Area, null=True, blank=True)

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
