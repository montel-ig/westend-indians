# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-22 11:57
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0008_auto_20171122_0912'),
    ]

    operations = [
        migrations.RenameField(
            model_name='homepage',
            old_name='shop_description',
            new_name='cta_shop_description',
        ),
        migrations.RenameField(
            model_name='homepage',
            old_name='shop_title',
            new_name='cta_shop_title',
        ),
        migrations.RenameField(
            model_name='homepage',
            old_name='team_description',
            new_name='cta_team_description',
        ),
        migrations.RenameField(
            model_name='homepage',
            old_name='team_title',
            new_name='cta_team_title',
        ),
        migrations.RenameField(
            model_name='homepage',
            old_name='tribe_description',
            new_name='cta_tribe_description',
        ),
        migrations.RenameField(
            model_name='homepage',
            old_name='tribe_title',
            new_name='cta_tribe_title',
        ),
    ]