import json

from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import HttpResponse

from teams.models import Team
from sponsors.models import Sponsor

def teams(request):
    teams = get_list_or_404(Team)
    return render(request, 'teams/teams_page.html', {'teams': teams})


def teams_json(request):
    teams = json.dumps([team_properties(t) for t in Team.objects.all()])
    return HttpResponse(teams)


def by_slug(request, slug):
    team = get_object_or_404(Team, slug=slug)
    members = members_to_json(team)
    properties = team_properties(team)
    sponsors = Sponsor.objects.filter(visible_for_team=True)

    return render(request, 'teams/team.html', locals())


def members_to_json(team: Team) -> str:
    """ Retrieve a JSON encoded string with the members of the given team. """
    members_dict = {}
    take_from_member = ('first_name', 'last_name', 'slug', 'origin', 'weight', 'height', 'handedness',
                        'description', 'some_instagram', 'some_twitter', 'some_facebook', 'some_snapchat',
                        'game_years_junior', 'game_years_pro_tribe', 'game_years_pro_other', 'video_url',)
    take_from_membership = ('number', 'position', 'role')
    for ms in team.memberships.all():
        m = ms.member
        members_dict[m.id] = dict([(v, getattr(m, v)) for v in take_from_member])
        members_dict[m.id]['born'] = m.born.year if m.born else None  # format date separately
        members_dict[m.id]['school'] = m.school.name if m.school else None
        members_dict[m.id]['image'] = m.image.url if m.image else None
        members_dict[m.id].update(dict([(v, getattr(ms, v)) for v in take_from_membership]))

    if members_dict:
        return json.dumps(members_dict)
    else:
        return json.dumps(None)


def team_properties(team: Team) -> str:
    """ Retrieve a JSON encoded string with the properties of the given team. """
    team_dict = {}
    take_from_team = ('name', 'slug', 'description', 'contact_name', 'contact_email', 'contact_phone',
                        'leader_name', 'leader_email', 'leader_phone', 'registration_link',
                        'some_instagram', 'some_twitter', 'some_facebook', 'some_snapchat', 'current_player_count',
                        'max_player_count', 'gender', 'path', 'sport', 'age_level', 'short_description',
                      )
    take_from_area = ('name', 'address', 'lat', 'lng')
    for attr in take_from_team:
        team_dict[attr] = getattr(team, attr)
    for attr in take_from_area:
        team_dict["area_"+attr] = getattr(team.area, attr) if hasattr(team.area, attr) else None
    team_dict["image"] = team.image.url if team.image else None
    team_dict["brochure"] = team.brochure.url if team.brochure else None

    return team_dict

