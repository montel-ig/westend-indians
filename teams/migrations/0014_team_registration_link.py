# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-03-01 12:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teams', '0013_match_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='registration_link',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
