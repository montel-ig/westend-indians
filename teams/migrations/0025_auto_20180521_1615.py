# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-05-21 13:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teams', '0024_team_show_name_in_modal'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='member',
            name='game_years_pro_other',
        ),
        migrations.AddField(
            model_name='member',
            name='game_years_combined',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='member',
            name='year_joined',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
