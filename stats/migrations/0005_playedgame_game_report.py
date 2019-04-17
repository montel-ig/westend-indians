# -*- coding: utf-8 -*-
# Generated by Django 1.11.18 on 2019-04-17 07:25
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0010_newsitem_video_url'),
        ('stats', '0004_upcominggame'),
    ]

    operations = [
        migrations.AddField(
            model_name='playedgame',
            name='game_report',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='as_game_report', to='news.NewsItem'),
        ),
    ]
