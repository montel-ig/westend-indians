# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-02-09 09:53
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0019_auto_20180207_1102'),
    ]

    operations = [
        migrations.RenameField(
            model_name='homepage',
            old_name='lift_image',
            new_name='pinnalla',
        ),
        migrations.RenameField(
            model_name='homepage',
            old_name='lift_image2',
            new_name='pinnalla2',
        ),
        migrations.RenameField(
            model_name='homepage',
            old_name='lift_image3',
            new_name='pinnalla3',
        ),
    ]
