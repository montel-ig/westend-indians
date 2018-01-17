from django.contrib import admin

from teams.models import Team, Member, School, TeamMembership, Area


class MembershipInline(admin.TabularInline):
    model = TeamMembership
    extra = 1


class MemberAdmin(admin.ModelAdmin):
    model = Member
    inlines = (MembershipInline,)
    list_display = ('name', 'team_memberships')
    list_filter = ('teams__name',)

    def team_memberships(self, obj):
        return ','.join(map(lambda t: t.name, obj.teams.all()))

    def name(self, obj):
        return obj.full_name
    name.admin_order_field = 'first_name'


class TeamAdmin(admin.ModelAdmin):
    model = Team
    inlines = (MembershipInline,)


admin.site.register(Team, TeamAdmin)
admin.site.register(Member, MemberAdmin)
admin.site.register(School)
admin.site.register(Area)
