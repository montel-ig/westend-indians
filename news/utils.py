import json


def _serialize_news(news):
    return json.dumps(list(
        map(lambda x: {'title': x.title, 'image': x.image_medium.url, 'ingress': x.ingress,
                       'id': x.id, 'slug': x.slug}, news)
    ))

