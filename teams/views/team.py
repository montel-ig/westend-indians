import json

from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import HttpResponse

from teams.models import Team, AgeLevel
from sponsors.models import Sponsor


def teams(request):
    teams = get_list_or_404(Team)
    return render(request, 'teams/teams_page.html', {'teams': teams})


def teams_json(request):
    teams = json.dumps([team_properties(t) for t in Team.objects.all().prefetch_related('age_levels', 'sponsors')])
    return HttpResponse(teams)


def types_json(request):
    types = json.dumps([t for t in AgeLevel.objects.all().values()])
    return HttpResponse(types)


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
                        'game_years_junior', 'game_years_pro_tribe', 'game_years_combined', 'year_joined', 'video_url',)
    take_from_membership = ('number', 'position', 'role')
    for ms in team.memberships.all():
        m = ms.member
        members_dict[m.id] = dict([(v, getattr(m, v)) for v in take_from_member])
        members_dict[m.id]['born'] = m.born.year if m.born else None  # format date separately
        members_dict[m.id]['school'] = m.school
        members_dict[m.id]['image'] = m.image.url if m.image else None

        sponsors_serialized = [r for r in m.sponsors.all() if r]
        sponsors_dict = {}
        for s in sponsors_serialized:
            sponsor_dict = {}
            sponsor_dict['name'] = s.name if hasattr(s, 'name') else None
            sponsor_dict['url'] = s.url if hasattr(s, 'url') else None
            sponsor_dict['sponsor_thumbnail'] = s.sponsor_thumbnail.url if hasattr(s, 'sponsor_thumbnail') else None
            sponsors_dict[s.name] = sponsor_dict

        members_dict[m.id]['sponsors'] = sponsors_dict
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
                      'max_player_count', 'gender', 'path', 'sport', 'short_description',
                      'show_name_in_modal', 'visible'
                      )
    take_from_area = ('name', 'address', 'lat', 'lng')

    for attr in take_from_team:
        team_dict[attr] = getattr(team, attr)

    team_dict['age_levels'] = [l.name for l in team.age_levels.all()]
    sponsors_serialized = [r for r in team.sponsors.all() if r]
    sponsors_dict = {}
    for s in sponsors_serialized:
        sponsor_dict = {}
        sponsor_dict['name'] = s.name if hasattr(s, 'name') else None
        sponsor_dict['url'] = s.url if hasattr(s, 'url') else None
        sponsor_dict['sponsor_thumbnail'] = s.sponsor_thumbnail.url if hasattr(s, 'sponsor_thumbnail') else None
        sponsors_dict[s.name] = sponsor_dict
    team_dict['sponsors'] = sponsors_dict
    for attr in take_from_area:
        team_dict["area_" + attr] = getattr(team.area, attr) if hasattr(team.area, attr) else None
    team_dict["image"] = team.image.url if team.image else None
    team_dict["leader_image"] = team.leader_image_medium.url if team.leader_image else None
    team_dict["contact_image"] = team.contact_image_medium.url if team.contact_image else None
    team_dict["brochure"] = team.brochure.url if team.brochure else None

    return team_dict
