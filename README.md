# Ikigai Rituals · PWA-Prototyp

Rituale, 30-Tage-Challenges und Monatsziele als installierbare Web-App im High-Fi-Design (Variante A: Indigo + Kaki, Light und Dark).

Alles läuft im Browser, ohne Server. Die Daten liegen lokal auf dem Gerät (localStorage).

## Veröffentlichen mit GitHub Pages

1. Im Repo auf **Settings › Pages** gehen.
2. Bei **Source** „Deploy from a branch“ wählen, Branch `main`, Ordner `/ (root)`, speichern.
3. Nach ein bis zwei Minuten ist die App erreichbar unter `https://<nutzername>.github.io/<repo-name>/`.

## Auf dem iPhone installieren

1. Den Link in **Safari** öffnen (nicht in Chrome oder einer In-App-Ansicht).
2. Unten auf **Teilen** tippen, dann **Zum Home-Bildschirm**.
3. Ab jetzt die App über das Icon starten. Sie läuft im Vollbild und funktioniert auch offline.

Testpersonen machen dasselbe mit deinem Link. Jede Person hat ihre eigenen Daten auf ihrem Gerät.

## Benachrichtigungen

**Testbenachrichtigung (geht sofort):** In der App unter Profil › Einstellungen › Testbenachrichtigung. Auf dem iPhone nur, wenn die App vom Home-Bildschirm gestartet wurde (iOS 16.4 oder neuer).

**Tägliche Erinnerung bei geschlossener App (braucht OneSignal, kostenlos):**

1. Konto auf [onesignal.com](https://onesignal.com) anlegen, neue App erstellen, Plattform **Web** wählen.
2. Bei der Einrichtung **Typical Site** wählen, als Site URL die GitHub-Pages-Adresse eintragen.
3. Die **App ID** kopieren und in `config.js` bei `oneSignalAppId` eintragen.
4. Als Service-Worker-Pfad ist `sw.js` bereits eingebaut. In OneSignal unter den erweiterten Einstellungen „Service worker path“ auf `sw.js` setzen, falls danach gefragt wird.
5. Committen, kurz warten, App auf dem iPhone neu öffnen und unter Einstellungen die tägliche Erinnerung einschalten.
6. In OneSignal unter **Messages › New Push** eine Nachricht anlegen, zum Beispiel „Dein Ritual für heute wartet“. Bei **Schedule** „Send at a specific time“ und **Per user time zone** wählen, als Zielgruppe ein Segment mit dem Filter Tag `reminder` = `1`. Für eine tägliche Wiederholung eignet sich eine Journey mit Zeitplan.

Die App speichert die gewählte Uhrzeit als Tag `reminder_time` bei OneSignal. Damit lassen sich später Segmente pro Uhrzeit bauen.

## Updates ausrollen

Nach Änderungen an den Dateien in `sw.js` die Zeile `var VERSION = 'ikigai-rituals-v1';` hochzählen (v2, v3 …). Sonst zeigen installierte Geräte eventuell noch die alte Version.

## Dateien

| Datei | Inhalt |
| --- | --- |
| `index.html` | App-Hülle, Meta-Tags für iOS |
| `styles.css` | Design-Tokens und Komponenten (Light und Dark) |
| `app.js` | Logik und alle Screens |
| `config.js` | OneSignal-App-ID |
| `sw.js` | Offline-Cache und Benachrichtigungen |
| `manifest.webmanifest` | Name, Icons, Startseite |
| `icons/` | App-Icons mit dem Rituals-Signet |
