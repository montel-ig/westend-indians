# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-08 07:24
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('teams', '0008_auto_20171208_0723'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='team',
            name='max_players',
        ),
        migrations.RemoveField(
            model_name='team',
            name='player_age_end',
        ),
        migrations.RemoveField(
            model_name='team',
            name='player_age_start',
        ),
    ]
