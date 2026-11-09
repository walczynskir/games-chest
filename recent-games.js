(() => {
  const links = [...document.querySelectorAll('[data-umami-event-game]')];
  const known = new Set(links.map(link => link.dataset.umamiEventGame));
  const key = 'games-chest-recent';
  let recent = [];
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(saved)) recent = [...new Set(saved.filter(id => known.has(id)))].slice(0, 4);
  } catch {}

  function updateLinks() {
    for (const link of document.querySelectorAll('[data-umami-event-game]')) {
      const url = new URL(link.href);
      url.searchParams.delete('gc-recent');
      if (recent.length) url.searchParams.set('gc-recent', recent.join(','));
      link.href = url.href;
    }
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('[data-umami-event-game]');
    if (!link) return;
    const id = link.dataset.umamiEventGame;
    recent = [id, ...recent.filter(game => game !== id)].slice(0, 4);
    try { localStorage.setItem(key, JSON.stringify(recent)); } catch {}
    updateLinks();
  });
  updateLinks();
})();
