# AtendeAI — project notes for agents

## What this project is
A static marketing site (Portuguese, `pt-BR`) for "AtendeAI": plain HTML pages, one
shared `style.css` and one shared `script.js`. There is **no build step, no package
manager, no framework and no backend**. `BACK_END/` is a folder of JavaScript study
exercises and notes — it is not served code and has no server in it.

## Running it
```bash
docker compose -f docker-compose.base44.yml up -d
```
- `web` (nginx:alpine) serves the repository root on host port **3000**.
- The repo is bind-mounted read-only at `/usr/share/nginx/html`, with
  `.base44/nginx.conf` as the site config (listens on 3000, `no-store` caching).
- Because nginx reads files from disk per request, **editing HTML/CSS/JS needs no
  rebuild or restart** — refresh the browser to see changes. A hard refresh may be
  needed if the browser keeps a stale page.
- Verify: `curl -s http://localhost:3000/ | head` should return the AtendeAI home page.

## Quirks worth knowing
- Pages must reference the shared script as `<script src="script.js">`. It lives at the
  repo root, **not** in a `js/` folder.
- `demonstracao.html` drives the fake chat via inline `onclick="responder(...)"` calls
  defined in `script.js`; `login.html` and `cadastro.html` are demo-only forms
  (login just redirects to `painel.html`, no server-side auth).
- Filenames in `BACK_END/` contain spaces and typos (`exercicio 17,js`); leave them
  alone, they are exercise notes.
- No external services or credentials are required.

## Verifying it works
Load `/`, click through the nav (Serviços, Como funciona, Planos, Demonstração), press
a demo chat button ("Quanto custa?") and confirm a bot reply appears, then submit the
login form and confirm it lands on `painel.html`.
