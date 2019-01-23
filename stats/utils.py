import json


def standings_to_json(standings):
    """ Retrieve a JSON encoded string with the league standings. """
    return json.dumps(list(
        map(lambda x: {'id': x.team_id, 'name': x.team.name, 'position': x.position, 'matches': x.matches, 'wins': x.wins,
                       'wins_contd_period': x.wins_contd_period, 'losses': x.losses,
                       'losses_contd_period': x.losses_contd_period, 'goals_scored': x.goals_scored,
                       'goals_suffered': x.goals_suffered, 'goal_difference': x.goal_difference, 'points': x.points},
            standings.rows.all())
    ))

