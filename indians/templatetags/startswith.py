from django import template
from django.template.defaultfilters import urlencode

register = template.Library()

@register.filter()
def startswith(string, prefix):
    string = urlencode(string)
    if string.startswith(prefix):
        return True
    return False
