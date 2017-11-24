import json

from django.shortcuts import render, get_object_or_404, get_list_or_404

from teams.models import Team


def teams(request):
    teams = get_list_or_404(Team)
    return render(request, 'teams/teams_page.html', {'teams': teams})


def by_slug(request, slug):
    team = get_object_or_404(Team, slug=slug)
    return render(request, 'teams/team.html', {'team': team})


def members_to_json(team: Team) -> str:
    members_dict = {}
    take_from_member = ('first_name', 'last_name', 'slug', 'origin', 'weight', 'height', 'handedness',
                        'description', 'some_instagram', 'some_twitter', 'some_facebook', 'some_snapchat',
                        'game_years_junior', 'game_years_pro_tribe', 'game_years_pro_other')
    take_from_membership = ('number', 'position')
    # todo:
    # school
    # teams
    for ms in team.memberships.all():
        m = ms.member
        members_dict[m.id] = dict([(v, getattr(m, v)) for v in take_from_member])
        members_dict[m.id]['born'] = m.born.isoformat() if m.born else None  # format date separately
        members_dict[m.id]['school'] = m.school.name if m.school else None
        members_dict[m.id].update(dict([(v, getattr(ms, v)) for v in take_from_membership]))

    return json.dumps(members_dict)