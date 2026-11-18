(() => {
  const { languages, names } = DominoLocales;
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
    pl: ['Jak zainstalować grę', 'Uruchom grę w przeglądarce. W Chrome lub Edge wybierz w menu opcję instalacji aplikacji (na Androidzie może być pod „Dodaj do ekranu głównego”). W Safari na iPhonie wybierz „Udostępnij” → „Do ekranu początkowego”, a na Macu „Dodaj do Docka”.'],
    en: ['How to install a game', 'Open the game in your browser. In Chrome or Edge, use the install option in the browser menu (on Android it may be under “Add to Home screen”). In Safari on iPhone, choose Share → Add to Home Screen. On Mac, choose Add to Dock.'],
    es: ['Cómo instalar un juego', 'Abre el juego en el navegador. En Chrome o Edge, usa la opción de instalar del menú (en Android puede estar en «Añadir a pantalla de inicio»). En Safari para iPhone, elige Compartir → Añadir a pantalla de inicio. En Mac, elige Añadir al Dock.'],
    de: ['So installierst du ein Spiel', 'Öffne das Spiel im Browser. Wähle in Chrome oder Edge im Menü die Installationsoption (unter Android eventuell unter „Zum Startbildschirm hinzufügen“). In Safari auf dem iPhone wähle Teilen → Zum Home-Bildschirm. Auf dem Mac wähle Zum Dock hinzufügen.'],
    'zh-Hans': ['如何安装游戏', '在浏览器中打开游戏。在 Chrome 或 Edge 的菜单中选择安装（Android 上可能位于“添加到主屏幕”下）。在 iPhone 的 Safari 中选择“分享”→“添加到主屏幕”。在 Mac 上选择“添加到程序坞”。'],
    hi: ['गेम कैसे इंस्टॉल करें', 'ब्राउज़र में गेम खोलें। Chrome या Edge के मेनू में इंस्टॉल का विकल्प चुनें (Android पर यह “होम स्क्रीन में जोड़ें” में हो सकता है)। iPhone पर Safari में शेयर → होम स्क्रीन में जोड़ें चुनें। Mac पर Dock में जोड़ें चुनें।'],
    fr: ['Comment installer un jeu', 'Ouvrez le jeu dans votre navigateur. Dans Chrome ou Edge, utilisez l’option d’installation du menu (sur Android, elle peut se trouver sous « Ajouter à l’écran d’accueil »). Sur iPhone dans Safari, choisissez Partager → Sur l’écran d’accueil. Sur Mac, choisissez Ajouter au Dock.'],
    ar: ['كيفية تثبيت لعبة', 'افتح اللعبة في المتصفح. في Chrome أو Edge، اختر التثبيت من القائمة (قد يكون ضمن «إضافة إلى الشاشة الرئيسية» على Android). في Safari على iPhone، اختر مشاركة ثم إضافة إلى الشاشة الرئيسية. على Mac، اختر إضافة إلى Dock.'],
    it: ['Come installare un gioco', 'Apri il gioco nel browser. In Chrome o Edge, usa l’opzione di installazione nel menu (su Android potrebbe essere in «Aggiungi a schermata Home»). In Safari su iPhone, scegli Condividi → Aggiungi alla schermata Home. Sul Mac, scegli Aggiungi al Dock.'],
    uk: ['Як установити гру', 'Відкрийте гру в браузері. У Chrome або Edge виберіть установлення в меню (на Android ця опція може бути в пункті «Додати на головний екран»). У Safari на iPhone виберіть «Поділитися» → «На початковий екран». На Mac виберіть «Додати на панель Dock».']
  };
  // Each row follows the language order in DominoLocales.languages.
  const labels = {
    garibaldka: ['Garibaldka', 'Russian Bank', 'Crapé', 'Streitpatience', '双人接龙', 'दो खिलाड़ियों का सॉलिटेयर', 'Crapette', 'طنج', 'Crapette', 'Гарібальдка'],
    sudoku: ['Sudoku', 'Sudoku', 'Sudoku', 'Sudoku', '数独', 'सुडोकू', 'Sudoku', 'سودوكو', 'Sudoku', 'Судоку'],
    domino: ['Domino', 'Domino', 'Dominó', 'Domino', '多米诺', 'डोमिनो', 'Domino', 'دومينو', 'Domino', 'Доміно'],
    language: ['Język', 'Language', 'Idioma', 'Sprache', '语言', 'भाषा', 'Langue', 'اللغة', 'Lingua', 'Мова'],
    feedbackHelp: [
      'Proponujesz nową grę? Jeśli możesz, dodaj link do zasad lub wklej instrukcję. Zgłaszasz błąd? Opisz, co zrobiłeś tuż przed jego wystąpieniem.',
      'Suggesting a new game? If you can, include a link to the rules or paste the instructions. Reporting a bug? Describe what you did just before it appeared.',
      '¿Propones un juego nuevo? Si puedes, añade un enlace a las reglas o pega las instrucciones. ¿Informas de un error? Describe lo que hiciste justo antes de que apareciera.',
      'Schlägst du ein neues Spiel vor? Verlinke nach Möglichkeit die Regeln oder füge die Anleitung ein. Meldest du einen Fehler? Beschreibe, was du unmittelbar davor gemacht hast.',
      '想推荐新游戏？如果可以，请附上规则链接或粘贴玩法说明。要报告错误？请描述错误出现前你做了什么。',
      'नया गेम सुझा रहे हैं? हो सके तो नियमों का लिंक दें या निर्देश यहाँ चिपकाएँ। किसी गड़बड़ी की सूचना दे रहे हैं? बताएँ कि उसके आने से ठीक पहले आपने क्या किया था।',
      'Vous proposez un nouveau jeu ? Si possible, ajoutez un lien vers les règles ou copiez-les ici. Vous signalez un bug ? Décrivez ce que vous avez fait juste avant son apparition.',
      'هل تقترح لعبة جديدة؟ أضف رابطًا للقواعد أو ألصق التعليمات إن أمكن. هل تبلغ عن خلل؟ صف ما فعلته قبل ظهوره مباشرةً.',
      'Vuoi proporre un nuovo gioco? Se puoi, aggiungi un link alle regole o incolla le istruzioni. Vuoi segnalare un errore? Descrivi cosa hai fatto subito prima che si verificasse.',
      'Пропонуєте нову гру? Якщо можете, додайте посилання на правила або вставте інструкцію. Повідомляєте про помилку? Опишіть, що ви зробили безпосередньо перед її появою.'
    ],
    category: ['Kategoria', 'Category', 'Categoría', 'Kategorie', '类别', 'श्रेणी', 'Catégorie', 'الفئة', 'Categoria', 'Категорія'],
    newGame: ['Nowa gra', 'New game', 'Juego nuevo', 'Neues Spiel', '新游戏', 'नया गेम', 'Nouveau jeu', 'لعبة جديدة', 'Nuovo gioco', 'Нова гра'],
    bug: ['Błąd', 'Bug', 'Error', 'Fehler', '错误', 'गड़बड़ी', 'Bug', 'خلل', 'Errore', 'Помилка'],
    improvement: ['Ulepszenie', 'Improvement', 'Mejora', 'Verbesserung', '改进建议', 'सुधार', 'Amélioration', 'تحسين', 'Miglioramento', 'Покращення'],
    gameName: ['Nazwa gry lub strony', 'Game or page name', 'Nombre del juego o de la página', 'Name des Spiels oder der Seite', '游戏或页面名称', 'गेम या पेज का नाम', 'Nom du jeu ou de la page', 'اسم اللعبة أو الصفحة', 'Nome del gioco o della pagina', 'Назва гри або сторінки'],
    description: ['Opis', 'Description', 'Descripción', 'Beschreibung', '描述', 'विवरण', 'Description', 'الوصف', 'Descrizione', 'Опис'],
    emailDraft: ['Otwórz szkic e-maila', 'Open email draft', 'Abrir borrador de correo', 'E-Mail-Entwurf öffnen', '打开邮件草稿', 'ईमेल का मसौदा खोलें', 'Ouvrir le brouillon du courriel', 'فتح مسودة البريد الإلكتروني', 'Apri la bozza del messaggio', 'Відкрити чернетку листа']
  };
  const installPanel = document.querySelector('#install-games');
  const language = document.querySelector('#language');
  const form = document.querySelector('#game-feedback');
  const localizedLabels = document.querySelectorAll('[data-label]');
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
    for (const element of localizedLabels) {
      element.textContent = labels[element.dataset.label][column];
    }
    for (const label of document.querySelectorAll('[data-umami-event-game="eight-aces"] span')) label.textContent = aces;
    const [installTitle, installSteps] = installCopy[value];
    installPanel.querySelector('summary').textContent = installTitle;
    document.querySelector('#install-steps').textContent = installSteps;
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
