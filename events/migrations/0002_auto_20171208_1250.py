# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-08 12:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='lat',
            field=models.DecimalField(blank=True, decimal_places=16, default=None, max_digits=19, null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='lng',
            field=models.DecimalField(blank=True, decimal_places=16, default=None, max_digits=19, null=True),
        ),
    ]