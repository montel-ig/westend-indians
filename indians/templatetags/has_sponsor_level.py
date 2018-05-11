from django import template

register = template.Library()

@register.filter()
def has_sponsor_level(list, level):
    if any(s.level == level for s in list):
        return True
    return False
