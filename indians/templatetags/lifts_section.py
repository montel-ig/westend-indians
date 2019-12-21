from django import template

from content.models import IndiansBasePage

register = template.Library()


@register.inclusion_tag('lifts_section.html')
def lifts_section(page_or_lifts, top=None, bottom=None, bg_color=None):
    lifts = []
    lift_bgcolor = bg_color
    if isinstance(page_or_lifts, IndiansBasePage):
        for attr_prefix in ("pinnalla", "pinnalla2", "pinnalla3"):
            img = getattr(page_or_lifts, attr_prefix, None)
            link = getattr(page_or_lifts, attr_prefix+'_link', "").strip()
            if img and link:
                lifts.append(dict(
                    image=img,
                    link=link,
                ))
        lift_count = page_or_lifts.lift_count
        if not bg_color and hasattr(page_or_lifts, 'lift_bgcolor'):
            lift_bgcolor = page_or_lifts.lift_bgcolor

    return locals()