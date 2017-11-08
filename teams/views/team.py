from django.shortcuts import render, get_object_or_404, get_list_or_404

from teams.models import Team


def teams(request):
    teams = get_list_or_404(Team)
    return render(request, 'teams/teams.html', {'teams': teams})

def by_slug(request, slug):
    team = get_object_or_404(Team, slug=slug)
    return render(request, 'teams/team.html', {'team': team})
