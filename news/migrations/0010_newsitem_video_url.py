# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-10-01 13:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0009_newsitem_visible'),
    ]

    operations = [
        migrations.AddField(
            model_name='newsitem',
            name='video_url',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
