# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-04-30 11:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0025_representativeteamplayerspage'),
    ]

    operations = [
        migrations.AddField(
            model_name='tribepage',
            name='pinnalla2_link',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='tribepage',
            name='pinnalla3_link',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='tribepage',
            name='pinnalla_link',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
