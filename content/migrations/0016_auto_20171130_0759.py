# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-30 07:59
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0015_tribepage'),
    ]

    operations = [
        migrations.RenameField(
            model_name='representativeteampage',
            old_name='lift_1',
            new_name='main_lift',
        ),
    ]
