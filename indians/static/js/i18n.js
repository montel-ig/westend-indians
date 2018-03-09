var locales = {
  'fi':
    {
      'player_modal': {
        'both': 'molemmilta',
        'right': 'oikealta',
        'left': 'vasemmalta',
        "fwd": "hyökkääjä",
        "goal": "maalivahti",
        "def": "puolustaja"
      },
      'news_carousel': {
        'no news': 'Ei uutisia',
      }
    }
}

function t(page, string) {
  return locales.fi[page][string]
}