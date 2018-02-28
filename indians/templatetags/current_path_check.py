from django import template

register = template.Library()

@register.simple_tag(takes_context=True)
def current_path_check(context, prefix):
    print("context: ", context)
    if context['request'].path.startswith(prefix):
        return 'current'
    return ''