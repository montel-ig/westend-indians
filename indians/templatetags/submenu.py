import re
from django import template
from django.template.defaultfilters import safe, truncatewords

register = template.Library()

MENU_HEADER_MATCHER = re.compile(r'\s*<h\d>([^<]+)</h\d>')


@register.simple_tag()
def submenu(page):
    menu_items = []
    for t in ('body', 'introduction', 'tickets', 'values', 'information', 'contact', 'personnel'):
        r = hasattr(page, t) and getattr(page, t)
        if r:
            f = re.match(MENU_HEADER_MATCHER, r)
            if f:
                txt = truncatewords(f.groups()[0], 4)
                menu_items.append(f"<a href='#{t}' data-href='#{t}' class='scroll-to-link'>{txt}</a>")
    if len(menu_items) > 1:
        return safe("<nav class='submenu'><div>" + ' '.join(menu_items) + "</div></nav>")
    return ''
