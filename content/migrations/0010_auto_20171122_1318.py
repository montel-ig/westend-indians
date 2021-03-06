# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-22 13:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0009_auto_20171122_1157'),
    ]

    operations = [
        migrations.RenameField(
            model_name='homepage',
            old_name='cta_shop_description',
            new_name='shop_cta',
        ),
        migrations.RenameField(
            model_name='homepage',
            old_name='cta_shop_title',
            new_name='shop_description',
        ),
        migrations.RenameField(
            model_name='homepage',
            old_name='cta_team_description',
            new_name='shop_title',
        ),
        migrations.RenameField(
            model_name='homepage',
            old_name='cta_team_title',
            new_name='team_cta',
        ),
        migrations.RenameField(
            model_name='homepage',
            old_name='cta_tribe_description',
            new_name='team_description',
        ),
        migrations.RenameField(
            model_name='homepage',
            old_name='cta_tribe_title',
            new_name='team_title',
        ),
        migrations.AddField(
            model_name='homepage',
            name='tribe_cta',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='homepage',
            name='tribe_description',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='homepage',
            name='tribe_title',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
