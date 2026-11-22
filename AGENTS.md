
## Wydania

Stosuj [wspólne zasady wersjonowania Games Chest](docs/RELEASES.md) i skrypt `scripts/release-version.mjs` przed każdą publikacją.

- Nie używaj przeglądarkowych `alert()`, `confirm()` ani `prompt()`. Potwierdzenia i pytania pokazuj w dostępnych, tłumaczonych oknach aplikacji, a krótkie komunikaty o wyniku umieszczaj przy akcji, której dotyczą. Okna obsługuj klawiaturą, w tym klawiszem Escape, i po zamknięciu przywracaj fokus do elementu, który je otworzył.

- W katalogu i krótkim nagłówku używaj nazwy „Gomoku” we wszystkich językach. Pełna nazwa w tytule karty i pomocy gry łączy „Gomoku” z lokalnym doprecyzowaniem, np. „Gomoku — Pięć w rzędzie” i „Gomoku — Five in a Row”.
