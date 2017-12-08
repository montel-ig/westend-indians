from django.contrib import admin

from sponsors.models import *

class SponsorAdmin(admin.ModelAdmin):
    list_display = ('name', 'level', 'visible_for_frontpage', 'visible_for_tribe', 'visible_for_team')
    model = Sponsor


admin.site.register(Sponsor, SponsorAdmin)