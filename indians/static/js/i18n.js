var locales = {'fi':
  {'player_modal':
    {'both': 'molemmilta',
      'right': 'oikealta',
      'left': 'vasemmalta',
      "fwd": "hyökkääjä",
      "goal": "maalivahti",
      "def": "puolustaja"
    }
  }
};

function t(page,string) {
  return locales.fi[page][string];
}