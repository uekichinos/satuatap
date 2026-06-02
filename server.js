import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="#111827"/>
  <path d="M 16,74 L 50,20 L 84,74" fill="none" stroke="#3B82F6"
        stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const ARROW_SVG = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5"/>
</svg>`;

const apps = [
  {
    name: 'trackline',
    url: 'https://trackline.satuatap.app',
    description: 'Track and manage your tasks',
  },
  {
    name: 'stablescout',
    url: 'https://stablescout.satuatap.app',
    description: 'Scout and monitor stables',
  },
  {
    name: 'vitalflow',
    url: 'https://vitalflow.satuatap.app',
    description: 'Monitor vital flows and trends',
  },
  {
    name: 'costlog',
    url: 'https://costlog.satuatap.app',
    description: 'Log and track your expenses',
  },
];

function renderPage() {
  const cards = apps
    .map(
      ({ name, url, description }) => `
    <a class="card" href="${url}" target="_blank" rel="noopener">
      <div class="card-body">
        <span class="card-name">${name}</span>
        <span class="card-desc">${description}</span>
      </div>
      <span class="card-arrow">${ARROW_SVG}</span>
    </a>`,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Satu Atap</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0d1117;
      --surface: #161b22;
      --border: #30363d;
      --text: #e6edf3;
      --muted: #8b949e;
      --accent: #58a6ff;
      --radius: 10px;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
    }

    a { color: var(--accent); text-decoration: none; }

    .container { max-width: 640px; width: 100%; margin: 0 auto; }

    header { text-align: center; margin-bottom: 2.5rem; }

    .lockup {
      display: inline-flex; align-items: center; gap: 14px;
      margin-bottom: 0.6rem;
    }

    .brand {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600; font-size: 1.45rem;
      letter-spacing: 0.2em; color: var(--text);
    }

    header p { color: var(--muted); margin-top: 0; font-size: 0.9rem; }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 0.875rem;
    }

    .card {
      display: flex; align-items: center; justify-content: space-between;
      padding: 1.1rem 1.25rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      color: var(--text);
      transition: border-color 0.15s, background 0.15s;
      gap: 0.75rem;
    }

    .card:hover {
      border-color: var(--accent);
      background: #1c2128;
      text-decoration: none;
    }

    .card-body { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }

    .card-name {
      font-weight: 600; font-size: 0.95rem;
    }

    .card-desc {
      color: var(--muted); font-size: 0.82rem;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    .card-arrow { color: var(--muted); flex-shrink: 0; transition: color 0.15s; }
    .card:hover .card-arrow { color: var(--accent); }

    footer {
      text-align: center; margin-top: 2.5rem;
      font-size: 0.8rem; color: var(--muted);
    }
  </style>
</head>
<body>
<div class="container">

  <header>
    <div class="lockup">
      <svg viewBox="0 0 44 54" width="36" height="44" fill="none"
           stroke="#3B82F6" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 2,50 L 22,4 L 42,50"/>
      </svg>
      <span class="brand">SATU ATAP</span>
    </div>
    <p>A suite of lightweight web applications.</p>
  </header>

  <div class="grid">
    ${cards}
  </div>

  <footer>
    <p>Built and hosted by <a href="https://uekichinos.xyz/" target="_blank" rel="noopener">uekichinos</a></p>
  </footer>

</div>
</body>
</html>`;
}

app.get('/favicon.svg', (_req, res) => {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(FAVICON_SVG);
});

app.get('/', (_req, res) => {
  res.send(renderPage());
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
