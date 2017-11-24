from django.contrib import admin

from teams.models import Team, Member, School, TeamMembership


class MembershipInline(admin.TabularInline):
    model = TeamMembership
    extra = 1


class MemberAdmin(admin.ModelAdmin):
    model = Member
    inlines = (MembershipInline,)


class TeamAdmin(admin.ModelAdmin):
    model = Team
    inlines = (MembershipInline,)


admin.site.register(Team, TeamAdmin)
admin.site.register(Member, MemberAdmin)
admin.site.register(School)
