# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-08 06:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sponsors', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sponsor',
            name='url',
            field=models.URLField(blank=True, max_length=255, null=True),
        ),
    ]
