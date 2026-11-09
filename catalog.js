(() => {
  const { languages, names, catalog } = DominoLocales;
  const copy = {
    pl: ['Masz kilka minut na grę?', 'Najczęściej otwierane', 'Wszystkie gry', 'Zaproponuj grę lub zgłoś błąd', 'Osiem Asów'],
    en: ['Got a few minutes to play?', 'Most opened', 'All games', 'Suggest a game or report an issue', 'Eight Aces'],
    es: ['¿Tienes unos minutos para jugar?', 'Más abiertos', 'Todos los juegos', 'Sugiere un juego o informa de un problema', 'Ocho ases'],
    de: ['Ein paar Minuten Zeit zum Spielen?', 'Am häufigsten geöffnet', 'Alle Spiele', 'Spiel vorschlagen oder Fehler melden', 'Acht Asse'],
    'zh-Hans': ['有几分钟玩一局吗？', '最常打开', '所有游戏', '推荐游戏或报告问题', '八张王牌'],
    hi: ['खेलने के लिए कुछ मिनट हैं?', 'सबसे अधिक खोले गए', 'सभी खेल', 'खेल सुझाएँ या समस्या बताएँ', 'आठ इक्के'],
    fr: ['Quelques minutes pour jouer ?', 'Les plus ouverts', 'Tous les jeux', 'Proposer un jeu ou signaler un problème', 'Huit as'],
    ar: ['هل لديك بضع دقائق للعب؟', 'الأكثر فتحًا', 'كل الألعاب', 'اقترح لعبة أو أبلغ عن مشكلة', 'ثمانية آسات'],
    it: ['Hai qualche minuto per giocare?', 'Più aperti', 'Tutti i giochi', 'Suggerisci un gioco o segnala un problema', 'Otto assi'],
    uk: ['Маєш кілька хвилин для гри?', 'Найчастіше відкривали', 'Усі ігри', 'Запропонуй гру або повідом про проблему', 'Вісім тузів']
  };
  const themes = {
    porcelain: 'Porcelain', ink: 'Ink & paper', sage: 'Sage', studio: 'Studio',
    forma: 'Forma', energy: 'Energy', tangerine: 'Tangerine', ukraine: 'Ukraine', contrast: 'High contrast'
  };
  const language = document.querySelector('#language');
  const theme = document.querySelector('#theme');
  const cards = [...document.querySelectorAll('#all-games .game')];
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
    const [intro, frequent, all, feedback, aces] = copy[value];
    for (const [key, label] of Object.entries({intro, frequent, all, feedback})) {
      document.querySelector('[data-copy="' + key + '"]').textContent = label;
    }
    document.querySelector('#appearance').textContent = catalog.Appearance[column];
    for (const option of theme.options) option.textContent = catalog[themes[option.value]]?.[column] ?? themes[option.value];
    for (const [element, polish] of formCopy) {
      const english = element.dataset.en;
      element.textContent = value === 'pl' ? polish : catalog[english]?.[column] ?? english;
      element.lang = value === 'pl' || catalog[english] ? value : 'en';
    }
    for (const label of document.querySelectorAll('[data-umami-event-game="eight-aces"] span')) label.textContent = aces;
  }
  language.replaceChildren(...languages.map(value => new Option(names[value], value)));
  theme.replaceChildren(...Object.entries(themes).map(([value, name]) => new Option(name, value)));
  const savedLanguage = read('games-chest-language', 'pl');
  const savedTheme = read('games-chest-theme', 'porcelain');
  language.value = languages.includes(savedLanguage) ? savedLanguage : 'pl';
  theme.value = Object.hasOwn(themes, savedTheme) ? savedTheme : 'porcelain';
  document.documentElement.dataset.theme = theme.value;

  const favorites = document.querySelector('#favorites');
  function renderFavorites() {
    const counts = read('games-chest-counts', {});
    const ranked = cards.filter(card => counts[card.dataset.umamiEventGame] > 0)
      .sort((a, b) => counts[b.dataset.umamiEventGame] - counts[a.dataset.umamiEventGame]).slice(0, 3);
    favorites.hidden = !ranked.length;
    favorites.querySelector('.tiles').replaceChildren(...ranked.map(card => card.cloneNode(true)));
  }
  renderFavorites();
  window.addEventListener('pageshow', event => {
    if (event.persisted) renderFavorites();
  });
  document.addEventListener('click', event => {
    const card = event.target.closest('.game');
    if (!card) return;
    const id = card.dataset.umamiEventGame;
    const counts = read('games-chest-counts', {});
    counts[id] = (Number(counts[id]) || 0) + 1;
    save('games-chest-counts', counts);
  });
  applyLanguage(language.value);
  language.addEventListener('change', () => {
    save('games-chest-language', language.value);
    applyLanguage(language.value);
  });
  theme.addEventListener('change', () => {
    document.documentElement.dataset.theme = theme.value;
    save('games-chest-theme', theme.value);
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
