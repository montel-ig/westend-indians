from django.db import models
from django.utils.text import slugify
from imagekit.models import ImageSpecField
from pilkit.processors import ResizeToFit

from teams.models.area import Area
from sponsors.models import Sponsor

from ckeditor.fields import RichTextField


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
    ('urheilijan', '3+ (Urheilijan polku)'),
    ('kilpailijan', '3-2 (Kilpailijan polku)'),
    ('harrastajan', '2-1 (Harrastajan polku)'),
    ('Kaupunginosajoukkueet', 'Kaupunginosajoukkueet (F-G-juniorit)'),
    ('salibandy_koulut', 'Salibandykoulut (H-juniorit)'),
    ('koulujen_iltapaivatoiminta', 'Koulujen iltapäivätoiminta (6lk-Esikoulu)'),
    ('erityisryhmat', 'Erityisryhmät'),
)

AGE_LEVEL_TYPES = (
    ('adult', '1997 => (Aikuiset)'),
    ('a', '1998-2000 (A-juniorit)'),
    ('b', '2001-2002 (B-juniorit)'),
    ('c', '2003-2004 (C-juniorit)'),
    ('d', '2005-2006 (D-juniorit)'),
    ('e', '2007-2008 (E-juniorit)'),
    ('f', '2009-2010 (F-juniorit)'),
    ('g', '2011-2012 (G-juniorit)'),
    ('h', '2013-2017 (H-juniorit)'),
)


class Team(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True, editable=False)

    description = RichTextField(null=True, blank=True)
    short_description = models.TextField(blank=True, null=True)

    contact_name = models.CharField(blank=True, null=True, max_length=255)
    contact_email = models.EmailField(blank=True, null=True)
    contact_phone = models.CharField(max_length=64, blank=True, null=True)
    contact_image = models.ImageField(null=True, blank=True)
    contact_image_medium = ImageSpecField(source='image',
                                         processors=[ResizeToFit(width=200, height=200, upscale=True)],
                                         options={'quality': 80},
                                         autoconvert=True)

    leader_name = models.CharField(blank=True, null=True, max_length=255)
    leader_email = models.EmailField(blank=True, null=True)
    leader_phone = models.CharField(max_length=64, blank=True, null=True)
    leader_image = models.ImageField(null=True, blank=True)
    leader_image_medium = ImageSpecField(source='image',
                                processors=[ResizeToFit(width=200, height=200, upscale=True)],
                                options={'quality': 80},
                                autoconvert=True)

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
    sponsors = models.ManyToManyField(to=Sponsor, blank=True, related_name='sponsored_teams')

    registration_link = models.CharField(blank=True, null=True, max_length=255)
    show_name_in_modal = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if (not self.slug) or (slugify(self.name) not in self.slug):
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
