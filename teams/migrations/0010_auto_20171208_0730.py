# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-08 07:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teams', '0009_auto_20171208_0724'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='brochure',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='team',
            name='contact_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='team',
            name='current_player_count',
            field=models.SmallIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='team',
            name='leader_email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AddField(
            model_name='team',
            name='leader_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='team',
            name='leader_phone',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AddField(
            model_name='team',
            name='max_player_count',
            field=models.SmallIntegerField(blank=True, null=True),
        ),
    ]
