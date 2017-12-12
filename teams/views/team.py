import json

from django.shortcuts import render, get_object_or_404, get_list_or_404

from teams.models import Team


def teams(request):
    teams = get_list_or_404(Team)
    return render(request, 'teams/teams_page.html', {'teams': teams})


def by_slug(request, slug):
    team = get_object_or_404(Team, slug=slug)
    members = members_to_json(team)
    #team_attributes = team_properties_to_json(team)
    return render(request, 'teams/team.html', locals())


def members_to_json(team: Team) -> str:
    """ Retrieve a JSON encoded string with the members of the given team. """
    members_dict = {}
    take_from_member = ('first_name', 'last_name', 'slug', 'origin', 'weight', 'height', 'handedness',
                        'description', 'some_instagram', 'some_twitter', 'some_facebook', 'some_snapchat',
                        'game_years_junior', 'game_years_pro_tribe', 'game_years_pro_other')
    take_from_membership = ('number', 'position')
    for ms in team.memberships.all():
        m = ms.member
        members_dict[m.id] = dict([(v, getattr(m, v)) for v in take_from_member])
        members_dict[m.id]['born'] = m.born.isoformat() if m.born else None  # format date separately
        members_dict[m.id]['school'] = m.school.name if m.school else None
        members_dict[m.id].update(dict([(v, getattr(ms, v)) for v in take_from_membership]))

    return json.dumps(members_dict)


def team_properties_to_json(team: Team) -> str:
    """ Retrieve a JSON encoded string with the properties of the given team. """
    team_dict = {}
    take_from_team = ('name', 'slug', 'description', 'contact_name', 'contact_email', 'contact_phone',
                        'leader_name', 'leader_email', 'leader_phone', 'brochure', 'image',
                        'some_instagram', 'some_twitter', 'some_facebook', 'some_snapchat', 'current_player_count',
                        'max_player_count', 'gender', 'path', 'sport', 'age_level', 'area')
    take_from_area = ('name', 'address')
    for ms in dir(team):
        #m = ms.member
        team_dict[ms.id] = dict([(v, getattr(ms, v)) for v in take_from_team])
        team_dict[ms.id].update(dict([(v, getattr(ms, v)) for v in take_from_area]))

    return json.dumps(team_dict)