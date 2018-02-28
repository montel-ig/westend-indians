from django import template

register = template.Library()

@register.filter()
def startswith(string, prefix):
    if string.startswith(prefix):
        return True
    return False
