import json


def _serialize_news(news):
    return json.dumps(list(
        map(lambda x: {'title': x.title, 'image': x.image_medium.url, 'ingress': x.ingress, 'video_url': x.video_url,
                       'id': x.id, 'slug': x.slug, 'publication_date': x.publication_date.strftime('%d.%m.%Y')},
            news)
    ))

