from django.contrib import admin

from events.models import *


class EventAdmin(admin.ModelAdmin):
    model = Event


admin.site.register(Event, EventAdmin)