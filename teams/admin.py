from django.contrib import admin, messages

from teams.models import Team, Member, School, TeamMembership, Area, Match


# def add_all_to_new_team(_modeladmin, request, queryset):
#     try:
#         new_team = Team.objects.get(name="Temporary Tiipee")
#     except Team.DoesNotExist:
#         new_team = Team.objects.create(name="Temporary Tiipee")
#
#     for member in queryset:
#
#     messages.success(request, "Successfully created {} with {} as admin".format(new_school, new_admin))
#
# add_all_to_new_team.short_description = "Add selected to Temporary Tiipee team"


def remove_from_all_teams(_, request, queryset):
    for member in queryset:
        member.memberships.all().delete()
        messages.success(request, f"Successfully removed {member.full_name} from all teams")
remove_from_all_teams.short_description = "Remove player(s) from all teams"


class MembershipInline(admin.TabularInline):
    model = TeamMembership
    extra = 1


class MemberAdmin(admin.ModelAdmin):
    model = Member
    inlines = (MembershipInline,)
    list_display = ('name', 'team_memberships')
    list_filter = ('teams__name',)
    actions = (remove_from_all_teams,)

    def team_memberships(self, obj):
        return ','.join(map(lambda t: t.name, obj.teams.all()))

    def name(self, obj):
        return obj.full_name
    name.admin_order_field = 'first_name'


class TeamAdmin(admin.ModelAdmin):
    model = Team
    list_display = ('name', 'path', 'sport')
    list_filter = ('path', 'sport')
    ordering = ('path', 'name')
    inlines = (MembershipInline,)


admin.site.register(Team, TeamAdmin)
admin.site.register(Member, MemberAdmin)
admin.site.register(School)
admin.site.register(Area)
admin.site.register(Match)

