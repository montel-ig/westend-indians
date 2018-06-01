import csv

from django import template
from django.template.defaultfilters import safe

register = template.Library()

@register.filter()
def csv_to_tables(string):
    converted = ""
    csv_buffer = []
    if not string:
        return ''
    for line in string.split("\r\n"):
        line = line.strip()
        if line:
            if line.startswith('#'):
                converted += f"<h2>{line[1:]}</h2>\n"
            else:
                csv_buffer.append(line)
        else:
            if len(csv_buffer) > 0:
                converted += _convert_to_html_table(csv_buffer)
                csv_buffer = []
    if len(csv_buffer) > 0:
        converted += _convert_to_html_table(csv_buffer)

    return safe(converted)


def _convert_to_html_table(csv_buffer):
    reader = csv.reader(csv_buffer, delimiter=';')
    converted = ""
    converted += "<div><table>\n"
    for i, row in enumerate(reader):
        if i == 0:
            converted += f"<tr>{' '.join(map(lambda x: '<th>'+x+'</th>', row))}</tr>"
        else:
            converted += f"<tr>{' '.join(map(lambda x: '<td>'+x+'</td>', row))}</tr>"
    converted += "</table></div>\n"
    return converted

