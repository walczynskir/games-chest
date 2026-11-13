(() => {
  const { languages, names, catalog } = DominoLocales;
  const copy = {
    pl: ['Zaproponuj grę lub zgłoś błąd', 'Osiem Asów'],
    en: ['Suggest a game or report an issue', 'Eight Aces'],
    es: ['Sugiere un juego o informa de un problema', 'Ocho ases'],
    de: ['Spiel vorschlagen oder Fehler melden', 'Acht Asse'],
    'zh-Hans': ['推荐游戏或报告问题', '八张王牌'],
    hi: ['खेल सुझाएँ या समस्या बताएँ', 'आठ इक्के'],
    fr: ['Proposer un jeu ou signaler un problème', 'Huit as'],
    ar: ['اقترح لعبة أو أبلغ عن مشكلة', 'ثمانية آسات'],
    it: ['Suggerisci un gioco o segnala un problema', 'Otto assi'],
    uk: ['Запропонуй гру або повідом про проблему', 'Вісім тузів']
  };
  const language = document.querySelector('#language');
  const form = document.querySelector('#game-feedback');
  const formCopy = [...form.parentElement.querySelectorAll('[data-en]')]
    .map(element => [element, element.textContent]);
  function read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }
  function applyLanguage(value) {
    document.documentElement.lang = value;
    document.documentElement.dir = value === 'ar' ? 'rtl' : 'ltr';
    const column = languages.indexOf(value);
    const [feedback, aces] = copy[value];
    document.querySelector('[data-copy="feedback"]').textContent = feedback;
    for (const [element, polish] of formCopy) {
      const english = element.dataset.en;
      element.textContent = value === 'pl' ? polish : catalog[english]?.[column] ?? english;
      element.lang = value === 'pl' || catalog[english] ? value : 'en';
    }
    for (const label of document.querySelectorAll('[data-umami-event-game="eight-aces"] span')) label.textContent = aces;
  }
  language.replaceChildren(...languages.map(value => new Option(names[value], value)));
  const savedLanguage = read('games-chest-language', 'pl');
  language.value = languages.includes(savedLanguage) ? savedLanguage : 'pl';
  applyLanguage(language.value);
  language.addEventListener('change', () => {
    save('games-chest-language', language.value);
    applyLanguage(language.value);
  });

  form.elements.kind.addEventListener('change', () => {
    form.elements.description.required = form.elements.kind.value !== 'new-game';
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const { kind, game, description } = form.elements;
    const name = game.value.trim();
    const details = description.value.trim();
    if (!name) return game.focus();
    if (!details && kind.value !== 'new-game') return description.focus();
    const subject = 'Games Chest — ' + kind.selectedOptions[0].textContent + ' — ' + name;
    location.href = 'mailto:walczynskir@gmail.com?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(details);
  });
})();
