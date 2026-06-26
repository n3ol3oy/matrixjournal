# MatrixJournal

MatrixJournal is a hybrid-ready trading journal for uploading structured TXT records produced by ChatGPT after each trading session. The first version is a static browser app with local storage, JSON as the internal data model, XML/JSON export, a local password gate, fee schedules, performance dashboards, and behavior coaching.

## Quick start

1. Open `index.html` in a browser, or host the repository as static files.
2. Unlock with username `admin` and password `magetochikardari`.
3. Ask ChatGPT to produce a MatrixJournal TXT record using the template below.
4. Upload or paste the TXT into the app.
5. Export JSON and XML regularly before clearing browser data.

> Security note: the local password gate is only a privacy screen in a static app. It is not real production authentication because static source files can be inspected. The project is structured so real auth and backend storage can replace the local gate later.

## Files

- `index.html` — app shell, login gate, import controls, dashboards, journal list, and behavior library container.
- `styles.css` — responsive dark/light themes and compact/moderate/comprehensive layout densities.
- `app.js` — local storage, TXT parsing, stats, warnings, fee schedules, JSON/XML export, and rendering.
- `samples/example-trade.txt` — example upload file based on the double-bottom MES journal.
- `scripts/build-single-file.js` — creates a portable bundled HTML file.
- `dist/matrixjournal-single.html` — generated self-contained version for simple hosting or backup.

## ChatGPT TXT template

Use this exact section structure. The parser accepts semicolon-separated fields inside `[EXECUTIONS]`.

```txt
[META]
Date: YYYY-MM-DD
Title: Short setup title
Instrument: MESU6
Direction: Long
Setup: Potential double bottom
Setup Quality: Successful / Failed / Mixed
Tags: double bottom, neckline, risk free exit

[EXECUTIONS]
Trade: 1; Instrument: MESU6; Direction: Long; Quantity: 1; Order Submitted: 06:38:50; Entry Price: 7367.25; Exit Price: 7371.50; Exit Type: Protective stop moved into profit; Initial Stop: Unknown; Points: 4.25; Ticks: 17; Gross PnL: 21.25; Fees: 1.24

[THESIS]
Why I entered, what I saw, and what I expected.

[MANAGEMENT]
How I managed risk, targets, stops, scaling, and conviction changes.

[OUTCOME]
What happened and whether the setup, execution, and management were successful.

[LESSONS]
What to repeat, avoid, measure, or screenshot next time.
```

## Data model

The app stores records in `localStorage` under `matrixjournal.v1`. Each record represents one setup/session and contains one or more executions. JSON is the canonical in-browser format because it is easier for analytics and future database migration. XML export is included for portability.

Core record fields:

- `date`, `title`, `setup`, `instrument`, `direction`, `quality`
- `thesis`, `management`, `outcome`, `lessons`, `tags`
- `executions[]` with entry, exit, quantity, points, ticks, gross P&L, fees, and net P&L

## Reports included

- Net P&L, gross P&L, fees, win rate, trade count, points, ticks, average win, and average loss.
- Equity curve by execution.
- Instrument filter and text search.
- Rule-based coach warnings for fees, payoff imbalance, loss clusters, and positive expectancy windows.
- 200 concise behavior-coaching essays displayed in comprehensive mode.
- Collapsible journal records with execution tables.

## Fees

Default futures-first fee presets are included for MES, MNQ, ES, and NQ. TXT records can override fees per execution with `Fees: 1.24`. The fee editor lets you adjust round-turn defaults.

## Hybrid/backend roadmap

When you are ready for real online access:

1. Replace the local password gate in `app.js` with backend authentication.
2. Move records from `localStorage` into a database table keyed by user ID.
3. Keep the TXT parser as an ingestion endpoint or client-side preprocessor.
4. Store JSON as the source of truth and generate XML exports on demand.
5. Add encrypted backups and server-side validation for imported records.

Suggested future stack: Supabase, Firebase, or a small Node/Express API with PostgreSQL.

## Build the single-file version

```bash
node scripts/build-single-file.js
```

The output is `dist/matrixjournal-single.html`.
