# Wydania Games Chest

Każda gra oraz katalog Games Chest mają własną numerację `MAJOR.MINOR.PATCH` i tę samą procedurę. Każdy pakiet zmian publikowany użytkownikom dostaje nowy numer. Robocze commity mogą składać się na jedno wydanie.

- **PATCH** dla poprawek, zmian wyglądu, tłumaczeń i poprawek dostępności.
- **MINOR** dla nowych funkcji zgodnych z dotychczasowymi zapisami i ustawieniami.
- **MAJOR** dla zmian niekompatybilnych. Wersję formatu zapisów gry prowadź osobno.

1. Pobierz aktualny `main` źródeł i osobnego GitHub Pages, jeśli istnieje. Porównaj je z kopią roboczą. Zachowaj nowsze zmiany, domenę, ustawienia dostępu i konfigurację Umami wraz z tagiem gry.
2. Uruchom `node scripts/release-version.mjs X.Y.Z`. To aktualizuje `VERSION`, publiczny `version.json` oraz istniejące oznaczenia wersji w projekcie. Przy zmianie zasobów aktualizuj też ich wersje w adresach. Dodaj wpis w `CHANGELOG.md`. Uruchom testy projektu i `node scripts/release-version.mjs --check`.
3. Oznacz sprawdzony commit źródłowy adnotowanym tagiem `vX.Y.Z` i wyślij razem commit oraz tag. Tagów wydania nie przenoś. Przy osobnym repozytorium Pages opublikuj zawartość `dist/` tego wydania, zachowaj `CNAME` i `.nojekyll` oraz dodaj ten sam numer tagu do commita publikacyjnego. W Sites przypisz wydanie do zapisanego commita źródeł i zapisz identyfikator wdrożenia.
4. Sprawdź publiczny adres, odczytaj `/version.json` i zapisz commit źródłowy oraz publikacyjny, gdy są osobne. Jeśli publikacja korzysta z tego samego repozytorium, zapisz commit wdrożonego źródła.

Nowa gra kopiuje ten dokument, `scripts/release-version.mjs` i kontrolę wersji w CI. Zaczyna od `0.1.0` w fazie rozwoju albo `1.0.0` przy pierwszym stabilnym wydaniu.
