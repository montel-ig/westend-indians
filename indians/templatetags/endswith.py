from django import template

register = template.Library()

@register.filter()
def endswith(string, prefix):
    if "#" in string:
        string = string.split('#', 1)[0]
    if string.endswith(prefix):
        return True
    return False
