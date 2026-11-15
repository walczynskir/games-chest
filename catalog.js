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
  const installCopy = {
    pl: ['Zainstaluj grę', 'Otwórz grę z listy. W Chrome lub Edge wybierz w menu opcję instalacji aplikacji (na Androidzie może być pod „Dodaj do ekranu głównego”). W Safari na iPhonie wybierz „Udostępnij” → „Do ekranu początkowego”, a na Macu „Dodaj do Docka”.'],
    en: ['Install a game', 'Open a game from the list. In Chrome or Edge, use the install option in the browser menu (on Android it may be under “Add to Home screen”). In Safari on iPhone, choose Share → Add to Home Screen. On Mac, choose Add to Dock.'],
    es: ['Instalar un juego', 'Abre un juego de la lista. En Chrome o Edge, usa la opción de instalar del menú (en Android puede estar en «Añadir a pantalla de inicio»). En Safari para iPhone, elige Compartir → Añadir a pantalla de inicio. En Mac, elige Añadir al Dock.'],
    de: ['Spiel installieren', 'Öffne ein Spiel aus der Liste. Wähle in Chrome oder Edge im Menü die Installationsoption (unter Android eventuell unter „Zum Startbildschirm hinzufügen“). In Safari auf dem iPhone wähle Teilen → Zum Home-Bildschirm. Auf dem Mac wähle Zum Dock hinzufügen.'],
    'zh-Hans': ['安装游戏', '从列表中打开游戏。在 Chrome 或 Edge 的菜单中选择安装（Android 上可能位于“添加到主屏幕”下）。在 iPhone 的 Safari 中选择“分享”→“添加到主屏幕”。在 Mac 上选择“添加到程序坞”。'],
    hi: ['गेम इंस्टॉल करें', 'सूची से गेम खोलें। Chrome या Edge के मेनू में इंस्टॉल का विकल्प चुनें (Android पर यह “होम स्क्रीन में जोड़ें” में हो सकता है)। iPhone पर Safari में शेयर → होम स्क्रीन में जोड़ें चुनें। Mac पर Dock में जोड़ें चुनें।'],
    fr: ['Installer un jeu', 'Ouvrez un jeu de la liste. Dans Chrome ou Edge, utilisez l’option d’installation du menu (sur Android, elle peut se trouver sous « Ajouter à l’écran d’accueil »). Sur iPhone dans Safari, choisissez Partager → Sur l’écran d’accueil. Sur Mac, choisissez Ajouter au Dock.'],
    ar: ['تثبيت لعبة', 'افتح لعبة من القائمة. في Chrome أو Edge، اختر التثبيت من القائمة (قد يكون ضمن «إضافة إلى الشاشة الرئيسية» على Android). في Safari على iPhone، اختر مشاركة ثم إضافة إلى الشاشة الرئيسية. على Mac، اختر إضافة إلى Dock.'],
    it: ['Installa un gioco', 'Apri un gioco dall’elenco. In Chrome o Edge, usa l’opzione di installazione nel menu (su Android potrebbe essere in «Aggiungi a schermata Home»). In Safari su iPhone, scegli Condividi → Aggiungi alla schermata Home. Sul Mac, scegli Aggiungi al Dock.'],
    uk: ['Установити гру', 'Відкрийте гру зі списку. У Chrome або Edge виберіть установлення в меню (на Android ця опція може бути в пункті «Додати на головний екран»). У Safari на iPhone виберіть «Поділитися» → «На початковий екран». На Mac виберіть «Додати на панель Dock».']
  };
  const installPanel = document.querySelector('#install-games');
  const installLinks = document.querySelector('#install-links');
  const gameLinks = [...document.querySelectorAll('#all-games .game')];
  const installDestinations = gameLinks.map(game => game.href);
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
    const [installTitle, installSteps] = installCopy[value];
    installPanel.querySelector('summary').textContent = installTitle;
    document.querySelector('#install-steps').textContent = installSteps;
    for (const [index, link] of installLinks.querySelectorAll('a').entries()) {
      link.textContent = gameLinks[index].querySelector('span').textContent;
    }
  }
  language.replaceChildren(...languages.map(value => new Option(names[value], value)));
  const savedLanguage = read('games-chest-language', 'pl');
  language.value = languages.includes(savedLanguage) ? savedLanguage : 'pl';
  for (const url of installDestinations) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = url;
    item.append(link);
    installLinks.append(item);
  }
  installPanel.hidden = false;
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
