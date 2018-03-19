from django import template
from django.template.defaultfilters import urlencode

register = template.Library()

@register.filter()
def startswith(string, prefix):
    string = urlencode(string)
    print(">> ", string, " == ", prefix, string.startswith(prefix))
    if string.startswith(prefix):
        print("CAN HAZ TRUEEUEUE")
        return True
    return False
