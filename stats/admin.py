from django.contrib import admin

from stats.models import *

class PlayedGameAdmin(admin.ModelAdmin):
    list_display = ('home_team', 'away_team', 'date', 'location', 'home_score', 'away_score', 'game_report')
    raw_id_fields = ('game_report',)
    model = PlayedGame


admin.site.register(PlayedGame, PlayedGameAdmin)