var locales = {'fi':
  {'player_modal':
    {'both': 'molemmat',
      'right': 'oikea',
      'left': 'vasen',
      "fwd": "hyökkääjä",
      "goal": "maalivahti",
      "def": "puolustaja"
    }
  }
};

function t(page,string) {
  return locales.fi[page][string];
}