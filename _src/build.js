/* Builds every page of the Fabirium website from the content below.
   Run:  node _src/build.js   (from the website folder). Then open index.html. */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

/* ---------------- links ---------------- */
const L = {
  sbPlay: 'https://skabir155.github.io/street-bites-play/',
  sbExe: 'https://skabir155.github.io/street-bites-play/street-bites-setup.exe',
  sbApk: 'https://skabir155.github.io/street-bites-play/street-bites.apk',
  skApk: 'https://github.com/SkAbir155/sonali-khata-app/raw/main/SonaliKhata.apk',
  skWeb: 'https://sonali-khata.web.app/app/',
  kbApk: 'https://github.com/SkAbir155/keyas-bakery-app/raw/main/KeyasBakery.apk',
  kbWeb: 'https://keyas-bakery.web.app/app/',
  spZip: 'downloads/fabirium-spades.zip', // relative to the site root
};

/* ---------------- icons ---------------- */
const ICONS = {
  home: 'M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6',
  bag: 'M5 8h14l-1.2 12H6.2zM9 8V6.5a3 3 0 016 0V8',
  pad: 'M7.5 7h9a5 5 0 010 10h-9a5 5 0 010-10zM8.5 10v4M6.5 12h4M15.5 11h.01M17.5 13h.01',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  video: 'M3 6.5h12.5v11H3zM15.5 10.5l5.5-3v9l-5.5-3',
  search: 'M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4',
  back: 'M19 12H5M11 6l-6 6 6 6',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  monitor: 'M4 5h16a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zM9 20h6M12 16v4',
  phone: 'M8 2.5h8A1.5 1.5 0 0117.5 4v16a1.5 1.5 0 01-1.5 1.5H8A1.5 1.5 0 016.5 20V4A1.5 1.5 0 018 2.5zM11 18.5h2',
  globe: 'M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z',
  info: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 11v5M12 8h.01',
  users: 'M16 19v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1M9.5 10a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM21 19v-1a4 4 0 00-3-3.9M16 3.2a3.5 3.5 0 010 6.6',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  food: 'M4 11h16a8 8 0 01-16 0zM3 21h18M8 7c0-1.5 1-1.5 1-3M12 7c0-1.5 1-1.5 1-3M16 7c0-1.5 1-1.5 1-3',
  smile: 'M12 21a9 9 0 100-18 9 9 0 000 18zM8.5 14a4 4 0 007 0M9 9.5h.01M15 9.5h.01',
  chair: 'M7 3v8M17 3v8M6 11h12v4H6zM7 15v6M17 15v6',
  cloud: 'M7 18a4.5 4.5 0 01-.6-9 6 6 0 0111.5 1.5A3.75 3.75 0 0117.5 18z',
  bot: 'M5 9h14v10H5zM12 5v4M9 14h.01M15 14h.01M3 13v3M21 13v3',
  cards: 'M6 4h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zM16 7.5l2.6.7a2 2 0 011.4 2.4l-2.4 8.9',
  refresh: 'M20 11a8 8 0 10-2.3 5.7M20 5v6h-6',
  check: 'M5 12l5 5L20 7',
  music: 'M9 18V5l11-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM20 16a3 3 0 11-6 0 3 3 0 016 0z',
  lock: 'M7 11V8a5 5 0 0110 0v3M5 11h14v10H5z',
  shield: 'M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5',
  language: 'M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M11 5c0 3-2 6-6 8M13 21l4-9 4 9M14.5 17.5h5',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6',
  image: 'M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zM9 11a2 2 0 100-4 2 2 0 000 4zM21 15l-5-5L5 21',
  list: 'M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zM9 8h6M9 12h6M9 16h3',
  fridge: 'M7 2.5h10a1 1 0 011 1v17a1 1 0 01-1 1H7a1 1 0 01-1-1v-17a1 1 0 011-1zM6 10h12M9 6v2M9 13v3',
  cash: 'M3 6h18v12H3zM12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM6 10v4M18 10v4',
  chart: 'M3 20h18M6 16v-5M11 16V6M16 16v-8',
  printer: 'M7 8V3h10v5M7 17H5a2 2 0 01-2-2v-5a2 2 0 012-2h14a2 2 0 012 2v5a2 2 0 01-2 2h-2M7 14h10v7H7z',
};
const sprite = '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
  Object.entries(ICONS).map(([k, d]) => `<symbol id="i-${k}" viewBox="0 0 24 24"><path d="${d}"/></symbol>`).join('') +
  '<symbol id="i-play" viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z"/></symbol></svg>';
const ic = (name, cls = 'icon') => `<svg class="${cls}${name === 'play' ? ' fill' : ''}"><use href="#i-${name}"/></svg>`;

/* ---------------- logos ---------------- */
const NIGHT = '#14122B';
// the main Fabirium tile: number 3, coral F, violet a
const mainTile = (frame = '#FFFFFF') => `<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="7" y="7" width="86" height="86" rx="12" fill="#1A1733" stroke="${frame}" stroke-width="5"/><text x="17" y="28" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#FFFFFF">3</text><text x="50" y="71" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="50" letter-spacing="-1"><tspan fill="#FF5D73">F</tspan><tspan fill="#9D86FF">a</tspan></text></svg>`;
// the branch icons (drawn on 24 x 24); `cut` is the colour of the holes
const badgeIcon = (key, cut) => ({
  arcade: `<path fill="${NIGHT}" d="M7 5.5h10a6.5 6.5 0 010 13H7a6.5 6.5 0 010-13z"/><path d="M7 9v6M4 12h6" fill="none" stroke="${cut}" stroke-width="2.4" stroke-linecap="round"/><circle cx="16" cy="10.4" r="1.7" fill="${cut}"/><circle cx="19" cy="13.6" r="1.7" fill="${cut}"/>`,
  labs: `<path fill="${NIGHT}" d="M9 2.5h6v2h-1v5.2l5.4 8.9a2 2 0 01-1.7 3H6.3a2 2 0 01-1.7-3l5.4-8.9V4.5H9z"/><path d="M7.6 15.4h8.8" fill="none" stroke="${cut}" stroke-width="1.6" stroke-linecap="round"/>`,
  cuts: `<path fill="${NIGHT}" d="M8 4.8c0-.9 1-1.4 1.7-1l10.6 6.9c.7.5.7 1.6 0 2.1L9.7 19.7c-.7.5-1.7-.1-1.7-1z"/>`,
})[key];

const BR = {
  arcade: { name: 'Fabirium Arcade', word: 'ARCADE', what: 'Games', c: '#FF5D73', text: '#FF7A8C', href: 'store.html#games' },
  labs: { name: 'Fabirium Labs', word: 'LABS', what: 'Apps', c: '#7B5CFF', text: '#A99BFF', href: 'store.html#apps' },
  cuts: { name: 'Fabirium Cuts', word: 'CUTS', what: 'Videos', c: '#FFB547', text: '#FFC46B', href: 'cuts.html' },
};
// small round branch badge, used next to names
const dot = (key) => `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="${BR[key].c}"/><g transform="translate(5 5) scale(.583)">${badgeIcon(key, BR[key].c)}</g></svg>`;
const devLink = (key, pre) => `<a class="dev" style="--b:${BR[key].text}" href="${pre}${BR[key].href}">${dot(key)}${BR[key].name}</a>`;

/* ---------------- page frame ---------------- */
function head(pre, title, desc, og) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="https://fabirium.com/assets/${og}">
<meta name="theme-color" content="#0D0B1C">
<link rel="icon" href="${pre}assets/logo/favicon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="${pre}assets/logo/icon-192.png" sizes="192x192" type="image/png">
<link rel="apple-touch-icon" href="${pre}assets/logo/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@700&family=Hind+Siliguri:wght@500&display=swap">
<link rel="stylesheet" href="${pre}assets/site.css">
</head>`;
}
function header(pre, active) {
  const a = (key, href, text, cls = '') => `<a${cls ? ` class="${cls}"` : ''} href="${pre}${href}"${active === key ? ' aria-current="page"' : ''}>${text}</a>`;
  return `<header class="site-header"><div class="wrap">
  <a class="brand" href="${pre}index.html" aria-label="Fabirium home">${mainTile()}<span class="brand-name">Fabirium</span></a>
  <nav class="nav" aria-label="Main">${a('games', 'store.html#games', 'Games')}${a('apps', 'store.html#apps', 'Apps')}${a('cuts', 'cuts.html', 'Videos')}${a('about', 'index.html#about', 'About')}${a('store', 'store.html', 'Store', 'nav-store')}</nav>
</div></header>`;
}
function tabbar(pre, active) {
  const t = (key, href, icon, text) => `<a href="${pre}${href}"${active === key ? ' aria-current="page"' : ''}>${ic(icon)}${text}</a>`;
  return `<nav class="tabbar" aria-label="Sections">${t('home', 'index.html', 'home', 'Home')}${t('games', 'store.html#games', 'pad', 'Games')}${t('apps', 'store.html#apps', 'grid', 'Apps')}${t('cuts', 'cuts.html', 'video', 'Videos')}</nav>`;
}
function footer(pre) {
  return `<footer class="site-footer"><div class="wrap">
  <div><a class="brand" href="${pre}index.html" aria-label="Fabirium home">${mainTile()}<span class="brand-name">Fabirium</span></a><p>Games, apps and videos, made by two.</p></div>
  <div><h4>${dot('arcade')}Arcade</h4><ul><li><a href="${pre}games/street-bites.html">Street Bites</a></li><li><a href="${pre}games/fabirium-spades.html">Fabirium Spades</a></li></ul></div>
  <div><h4>${dot('labs')}Labs</h4><ul><li><a href="${pre}apps/sonali-khata.html">Sonali Khata</a></li><li><a href="${pre}apps/keyas-bakery.html">Keya's Bakery</a></li></ul></div>
  <div><h4>${dot('cuts')}Cuts</h4><ul><li><a href="${pre}cuts.html">Our channels</a></li><li><a href="${pre}store.html">Store</a></li></ul></div>
  <p class="legal">© <span data-year>2026</span> Fabirium · Made in Bangladesh</p>
</div></footer>`;
}
const page = (pre, o, body) => `${head(pre, o.title, o.desc, o.og || 'og.png')}
<body${o.style ? ` style="${o.style}"` : ''}>
${sprite}
${header(pre, o.active)}
<main>
${body}
</main>
${footer(pre)}
${tabbar(pre, o.tab)}
<script src="${pre}assets/site.js"></script>
</body>
</html>
`;

/* ---------------- products ---------------- */
const P = [
  {
    slug: 'street-bites', dir: 'games', name: 'Street Bites', branch: 'arcade', kind: 'Restaurant game', tag: 'beta', icon: 'street-bites.png',
    p: '#A4521F', soft: '#2A1A10', text: '#F2A65A',
    lead: 'Run your own street-food restaurant. Walk around as the waiter to take orders and serve the food, then switch to manager to buy ingredients, arrange the tables and set everyone\'s pay.',
    short: 'Run a street-food restaurant: take orders, carry the food and keep customers smiling.',
    platforms: 'Android · Windows · Browser', search: 'street bites restaurant food game waiter manager',
    get: { android: [L.sbApk, 'Get', '5.9 MB'], ios: [L.sbPlay, 'Play', 'In Safari'], desktop: [L.sbPlay, 'Play', 'In browser'] },
    install: [
      { for: 'android', icon: 'download', title: 'Download for Android', sub: 'APK · 5.9 MB', href: L.sbApk },
      { for: 'ios desktop', icon: 'play', title: 'Play in your browser', sub: 'Computer, phone or tablet · always the newest', href: L.sbPlay },
      { for: '', icon: 'monitor', title: 'Download for Windows', sub: 'Installer · about 99 MB', href: L.sbExe },
    ],
    fine: 'Free. On a phone, turn it sideways to play.',
    stats: [['Free', 'Price'], ['5.9 MB', 'Android'], ['English', 'Language'], ['Beta', 'Status']],
    visual: '<img class="land" src="../assets/shots/street-play.jpg" alt="The waiter stands next to a customer who is ready to order">',
    homeShot: { land: 'street-play.jpg', alt: 'Street Bites: a customer is ready to order' },
    shots: [['ld', 'street-play.jpg', 'Serve customers as the waiter'], ['ld', 'street-morning.jpg', 'Morning: run the business as the manager'], ['ld', 'street-menu.jpg', 'The main menu']],
    body: `
<section class="section"><div class="wrap">
  <div class="section-head"><div><h2>About this game</h2><p>You play two jobs. The computer runs the rest of the staff for now.</p></div></div>
  <div class="features">
    <div class="feature"><div class="ficon">${ic('users')}</div><h3>Two jobs</h3><p>In the restaurant you're the <b>waiter</b>: take orders, ring the kitchen, carry the food, clear dirty tables. Before opening and after closing you're the <b>manager</b>.</p></div>
    <div class="feature"><div class="ficon">${ic('clock')}</div><h3>A full day</h3><p>Buy ingredients in the morning, open the doors, serve customers until 10 PM, then read the night report.</p></div>
    <div class="feature"><div class="ficon">${ic('food')}</div><h3>Street food menu</h3><p>Burgers, pizza, ramen, sushi, tacos, biryani, kebab, momo, fuchka, sundaes, bubble tea and mango lassi.</p></div>
    <div class="feature"><div class="ficon">${ic('smile')}</div><h3>Happy customers</h3><p>Customers show how they feel and leave 1 to 5 stars. Good stars bring more customers.</p></div>
    <div class="feature"><div class="ficon">${ic('chair')}</div><h3>Build your place</h3><p>Buy furniture, upgrades and new dishes. Place, move or sell tables, chairs and decorations.</p></div>
    <div class="feature"><div class="ficon">${ic('cloud')}</div><h3>Play anywhere</h3><p>Use <b>Profile &amp; Sync</b> with your email to carry on from another phone or computer.</p></div>
  </div>
</div></section>
<section class="section section-alt" id="how"><div class="wrap">
  <div class="section-head"><div><h2>How to play</h2></div></div>
  <div class="two-col">
    <div class="panel"><h3>A day at your restaurant</h3><ol class="steps">
      <li><div><b>Morning:</b> open <b>Ingredients</b>, tap <b>Fill for … customers</b> (it buys enough for today's expected customers), then <b>Buy</b>.</div></li>
      <li><div>Tap <b>Open the restaurant</b>.</div></li>
      <li><div>Take each order, ring the kitchen, carry the food to the table and clear dirty tables. Tips go into the waiter's wallet.</div></li>
      <li><div>At <b>10 PM</b> the restaurant closes. Read the night report, shop and rest. The game saves by itself at the end of each day.</div></li>
    </ol></div>
    <div class="panel"><h3>Controls</h3><p class="sub">The big round button always shows what you can do where you stand.</p><ul class="ticks">
      <li><div><b>Phone or tablet:</b> drag anywhere on the left half to move, and tap the big round button on the right to act.</div></li>
      <li><div><b>Computer:</b> <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> or the arrow keys to move, <kbd>Space</kbd> or <kbd>E</kbd> to act.</div></li>
      <li><div><b>Windows app:</b> <kbd>F11</kbd> switches full screen on and off.</div></li>
      <li><div>Watch the faces: 😊 happy, 😐 waiting too long, 😠 about to leave.</div></li>
    </ul></div>
  </div>
</div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><div><h2>Installing</h2></div></div>
  <div class="features">
    <div class="panel"><h3>Android</h3><ol class="steps"><li><div>Download the APK and open it.</div></li><li><div>Allow installing from this source if asked, then tap <b>Install</b>.</div></li><li><div>To update, install the new file over the old one. <b>Don't uninstall first</b>, or your saves are lost.</div></li></ol></div>
    <div class="panel"><h3>In the browser</h3><ol class="steps"><li><div>Open the game. It's always the newest version.</div></li><li><div>To keep it like an app: in Chrome or Edge click <b>Install</b> in the address bar, or <b>⋮ → Install</b>.</div></li></ol></div>
    <div class="panel"><h3>Windows</h3><ol class="steps"><li><div>Download the installer and open it.</div></li><li><div>If Windows says <b>“Windows protected your PC”</b>, click <b>More info → Run anyway</b>.</div></li><li><div>Street Bites appears on your desktop and Start menu.</div></li></ol></div>
  </div>
  <div class="callout" style="margin-top:18px">${ic('info')}<div>Each version (browser, Windows, Android) keeps its own saved games. Use <b>Profile &amp; Sync</b> with the same email to move your progress. In this <b>beta</b>, the chef, dishwasher and cleaner are run by the computer and will become playable later.</div></div>
</div></section>`,
    cta: ['Ready to open your restaurant?', 'Free on Android, Windows and the web.'],
  },
  {
    slug: 'fabirium-spades', dir: 'games', name: 'Fabirium Spades', branch: 'arcade', kind: 'Card game for 4', tag: 'new', icon: 'fabirium-spades.png',
    p: '#17835A', soft: '#0E2A1F', text: '#5FD39B',
    lead: 'Spades for friends and family. Put an iPad in the middle as the table, and every phone becomes a hand. Play a card and it flies off your phone onto the table; win a trick and the cards fly back to you.',
    short: 'Spades with friends: the iPad is the table and every phone is a hand.',
    platforms: 'PC · iPad &amp; phones', search: 'fabirium spades card game cards ipad phones friends',
    get: { desktop: [L.spZip, 'Get', 'PC · 68 KB'] },
    install: [
      { for: 'desktop', icon: 'download', title: 'Download for PC', sub: 'Windows, Mac or Linux · 68 KB', href: '../' + L.spZip, download: true },
      { for: '', icon: 'globe', title: 'Play online', sub: 'Coming soon', off: true },
    ],
    fine: 'Free. Start it on a computer at home, then everyone joins from their phone on the same Wi-Fi. <a href="#start">How to start</a>',
    stats: [['Free', 'Price'], ['68 KB', 'PC download'], ['2–4', 'Players + bots'], ['English', 'Language']],
    visual: '<img class="land" src="../assets/shots/spades-table.jpg" alt="The iPad table: four cards in the middle, each turned towards its player">',
    homeShot: { land: 'spades-table.jpg', alt: 'Fabirium Spades on an iPad table' },
    shots: [['ld', 'spades-table.jpg', 'The iPad table: each card faces its player'], ['ph', 'spades-phone.jpg', 'Your phone shows only your cards'], ['ld', 'spades-lobby.jpg', 'Friends scan the QR code to sit down']],
    body: `
<section class="section"><div class="wrap">
  <div class="section-head"><div><h2>About this game</h2></div></div>
  <div class="two-col">
    <div class="panel"><h3>📺 iPad in the middle</h3><ul class="ticks"><li><div>The iPad is the table: played cards (each turned towards its player), bids, tricks and scores.</div></li><li><div>Each phone shows <b>only that player's cards</b>. Tap <b>Show table</b> to see the table on your phone too.</div></li><li><div>The music plays on the iPad only.</div></li></ul></div>
    <div class="panel"><h3>📱 Phones only</h3><ul class="ticks"><li><div>No iPad needed. Whoever taps <b>Phones only</b> becomes the host.</div></li><li><div>Every phone shows the whole table plus its own cards.</div></li><li><div>The music plays on every phone; each player can turn it off.</div></li></ul></div>
  </div>
  <div class="features" style="margin-top:20px">
    <div class="feature"><div class="ficon">${ic('users')}</div><h3>2 vs 2 or solo</h3><p>Partners sit across from each other, or play 1 v 1 v 1 v 1.</p></div>
    <div class="feature"><div class="ficon">${ic('bot')}</div><h3>Bots fill empty seats</h3><p>Only 2 or 3 of you? Computer players take the empty seats.</p></div>
    <div class="feature"><div class="ficon">${ic('cards')}</div><h3>Flying cards</h3><p>Cards fly from your phone to the table, and won tricks fly back into your pile.</p></div>
    <div class="feature"><div class="ficon">${ic('refresh')}</div><h3>Never lose your seat</h3><p>If a phone locks or reloads, you're back in the same seat with the same cards.</p></div>
    <div class="feature"><div class="ficon">${ic('check')}</div><h3>Fair quitting</h3><p>The game only ends early when every player agrees.</p></div>
    <div class="feature"><div class="ficon">${ic('music')}</div><h3>Music and sounds</h3><p>Relaxed background music and card sounds, with a switch for each.</p></div>
  </div>
</div></section>
<section class="section section-alt" id="start"><div class="wrap">
  <div class="section-head"><div><h2>Start a game at home</h2><p>The game runs on a computer at home. Everyone joins from the same Wi-Fi.</p></div></div>
  <div class="two-col">
    <div class="panel"><h3>On a Windows PC</h3><ol class="steps">
      <li><div>Install <a href="https://nodejs.org" rel="noopener">Node.js</a> (the free LTS version). Only once.</div></li>
      <li><div>Download the game, right-click the zip and choose <b>Extract All</b>.</div></li>
      <li><div>Double-click <b>Start Fabirium Spades.bat</b>. The first start needs internet once.</div></li>
      <li><div>If Windows Firewall asks, tick <b>Private networks</b> and click <b>Allow access</b>.</div></li>
      <li><div>Open the address it shows (like <code>http://192.168.0.102:3000</code>) on the iPad and tap <b>iPad in the middle</b>, or on a phone and tap <b>Phones only</b>.</div></li>
    </ol></div>
    <div class="panel"><h3>Good to know</h3><ul class="ticks">
      <li><div><b>Mac or Linux:</b> run <code>npm install</code>, then <code>npm start</code> in the folder.</div></li>
      <li><div><b>Same Wi-Fi:</b> the iPad and every phone must be on the computer's Wi-Fi. Keep the computer on while you play.</div></li>
      <li><div><b>Mobile data:</b> needs the online version, coming soon.</div></li>
      <li><div><b>Phone died?</b> Tap that player's name on the table and a bot plays until they're back.</div></li>
    </ul></div>
  </div>
</div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><div><h2>How to play</h2></div></div>
  <div class="two-col">
    <div class="panel"><h3>A game, step by step</h3><ol class="steps">
      <li><div><b>Join:</b> scan the QR code on the table (or type the 4-letter code), enter your name and pick a seat.</div></li>
      <li><div><b>Set up:</b> choose <b>2 vs 2</b> or <b>1 v 1 v 1 v 1</b>, the target score, Nil and the bag penalty, then <b>Start game</b>.</div></li>
      <li><div><b>Bid</b> how many tricks you'll win. 0 is <b>Nil</b>.</div></li>
      <li><div><b>Play:</b> tap a card to lift it, tap again to play. Grey cards can't be played.</div></li>
      <li><div>Tap <b>Next hand</b> after each hand. First to the target wins.</div></li>
    </ol></div>
    <div class="panel"><h3>The rules</h3><ul class="ticks">
      <li><div>Spades are always trump. Follow the led suit if you can.</div></li>
      <li><div>Nobody can lead spades until one has been played, unless they hold only spades.</div></li>
      <li><div><b>Bid made:</b> 10 per trick bid, +1 per extra trick (a “bag”). <b>Missed:</b> −10 per trick bid.</div></li>
      <li><div><b>Nil:</b> +100 if you win no tricks, −100 if you win any. Every 10 bags costs 100.</div></li>
    </ul></div>
  </div>
</div></section>`,
    cta: ['Gather three friends and deal.', 'Free download. Bots fill any empty seats.'],
  },
  {
    slug: 'sonali-khata', dir: 'apps', name: 'Sonali Khata', branch: 'labs', kind: 'Sales app for shops', tag: 'beta', icon: 'sonali-khata.png',
    p: '#12806F', soft: '#0E2622', text: '#5FD1BE',
    lead: 'A chat-style sales calculator for shops. Each salesman types the prices and taps Complete sale, and every sale is saved under his name. The owner sees the statistics, cash, leaderboard and reports.',
    short: 'A chat-style sales calculator: every sale saved, the owner sees everything.',
    platforms: 'Android · iPhone · Bangla & English', search: 'sonali khata sales calculator shop owner salesman app',
    get: { android: [L.skApk, 'Get', '5.8 MB'], ios: [L.skWeb, 'Open', 'Web app'], desktop: [L.skWeb, 'Open', 'Web app'] },
    install: [
      { for: 'android', icon: 'download', title: 'Download for Android', sub: 'APK · 5.8 MB · always the latest version', href: L.skApk },
      { for: 'ios desktop', icon: 'phone', title: 'Open on iPhone or computer', sub: 'Web app · add it to your home screen', href: L.skWeb },
    ],
    note: `${ic('lock')}<div><b>Private beta.</b> New shops can't sign up yet. If your shop already uses Sonali Khata, ask the owner to add your Gmail on the <b>Staff</b> page.</div>`,
    stats: [['Free', 'Price'], ['5.8 MB', 'Android'], ['বাংলা · EN', 'Language'], ['Beta', 'Status']],
    visual: '<img class="phone back" src="../assets/shots/sonali-stats.jpg" alt="The owner\'s statistics"><img class="phone" src="../assets/shots/sonali-sell.jpg" alt="A salesman\'s calculator with bills shown like chat messages">',
    homeShot: { phone: 'sonali-sell.jpg', alt: 'Sonali Khata: the salesman\'s calculator' },
    shots: [['ph', 'sonali-sell.jpg', 'Salesman: type a price, tap ↑, then Complete sale'], ['ph', 'sonali-stats.jpg', 'Owner: today\'s sales and sales by hour'], ['ph', 'sonali-board.jpg', 'Leaderboard: sales and organizing stars']],
    body: `
<section class="section"><div class="wrap">
  <div class="section-head"><div><h2>About this app</h2><p>The app is in Bangla by default, with an English switch.</p></div></div>
  <div class="two-col">
    <div class="panel"><h3>For salesmen</h3><ul class="ticks">
      <li><div>Type a price and tap <b>↑</b> to add it. Use <b>×</b> for more than one.</div></li>
      <li><div>Tap <b>Complete sale</b> <span class="bn">(বিক্রি সম্পন্ন)</span>. The bill appears like a chat message.</div></li>
      <li><div>Choose <b>Cash</b> or <b>QR</b>, and name items or the customer if you like.</div></li>
      <li><div>Print a receipt on the shop's Bluetooth printer (Android).</div></li>
      <li><div>Undo your own sale within 5 minutes if no receipt was printed. After that, ask the owner with a reason.</div></li>
    </ul></div>
    <div class="panel"><h3>For the owner</h3><ul class="ticks">
      <li><div><b>Statistics</b> for today, 7 days, 30 days or any date: sales, customers, average bill, sales by hour.</div></li>
      <li><div><b>Cash:</b> morning cash in the drawer, cash out with tags, and <b>Close the day</b> with any cash difference shown.</div></li>
      <li><div>Approve void requests, or void a sale yourself with a reason.</div></li>
      <li><div><b>Leaderboard</b>, daily to monthly <b>reports</b> printed as strips, and <b>staff</b> by Gmail.</div></li>
    </ul></div>
  </div>
  <div class="features" style="margin-top:20px">
    <div class="feature"><div class="ficon">${ic('shield')}</div><h3>Nothing gets lost</h3><p>Every sale is kept for good. Mistakes get a correcting record instead of being deleted.</p></div>
    <div class="feature"><div class="ficon">${ic('lock')}</div><h3>Checked on the server</h3><p>The undo and void rules are checked on Google's servers, not only in the app.</p></div>
    <div class="feature"><div class="ficon">${ic('language')}</div><h3>Bangla first</h3><p>Natural Bangla, with an English switch. Receipts print in English.</p></div>
  </div>
</div></section>
<section class="section section-alt"><div class="wrap">
  <div class="section-head"><div><h2>Getting started</h2></div></div>
  <div class="two-col">
    <div class="panel"><h3>Install</h3><ol class="steps">
      <li><div><b>Android:</b> download the APK, open it, allow installing from this source, then tap <b>Install</b>. If Play Protect warns you, tap <b>More details → Install anyway</b>.</div></li>
      <li><div><b>iPhone:</b> open the web app in <b>Safari</b>, tap <b>Share → Add to Home Screen</b>.</div></li>
      <li><div>New versions show an <b>Update</b> message inside the app. Printing works only from the Android app.</div></li>
    </ol></div>
    <div class="panel"><h3>Every day</h3><ol class="steps">
      <li><div><b>Sign in with Google</b>, using the Gmail the owner added.</div></li>
      <li><div><b>Owner, morning:</b> in <b>Cash</b> <span class="bn">(ক্যাশ)</span>, type the drawer cash and tap <b>Put in drawer</b>.</div></li>
      <li><div><b>All day:</b> salesmen record each sale and tap <b>Complete sale</b>.</div></li>
      <li><div><b>Owner, closing:</b> tap <b>Close the day</b>, then check <b>Statistics</b> <span class="bn">(পরিসংখ্যান)</span>.</div></li>
    </ol></div>
  </div>
</div></section>`,
    cta: ['Keep every sale in one place.', 'Free for Android and iPhone.'],
  },
  {
    slug: 'keyas-bakery', dir: 'apps', name: "Keya's Bakery", branch: 'labs', kind: 'Bakery shop app', tag: 'beta', icon: 'keyas-bakery.png',
    p: '#2B47D9', soft: '#111A3A', text: '#93A8FF',
    lead: 'The shop app for Keya\'s Bakery. Show customers the cake catalog, take orders, keep track of the fridge, and record every taka the salesman collects and hands over.',
    short: 'Cake catalog, orders, fridge stock and cash, for the bakery team.',
    platforms: 'Android · iPhone · Bangla & English', search: 'keyas keya bakery cake catalog orders fridge cash app',
    get: { android: [L.kbApk, 'Get', '13.5 MB'], ios: [L.kbWeb, 'Open', 'Web app'], desktop: [L.kbWeb, 'Open', 'Web app'] },
    install: [
      { for: 'android', icon: 'download', title: 'Download for Android', sub: 'APK · 13.5 MB · always the latest version', href: L.kbApk },
      { for: 'ios desktop', icon: 'phone', title: 'Open on iPhone or computer', sub: 'Web app · add it to your home screen', href: L.kbWeb },
    ],
    note: `${ic('user')}<div><b>For the Keya's Bakery team.</b> The owner adds your name and Gmail; your account switches on the first time you sign in with Google.</div>`,
    stats: [['Free', 'Price'], ['13.5 MB', 'Android'], ['বাংলা · EN', 'Language'], ['Beta', 'Status']],
    visual: '<img class="phone back" src="../assets/shots/keya-home.jpg" alt="Home: cash with the salesman and upcoming deliveries"><img class="phone" src="../assets/shots/keya-gallery.jpg" alt="The cake catalog">',
    homeShot: { phone: 'keya-gallery.jpg', alt: 'Keya\'s Bakery: the cake catalog' },
    shots: [['ph', 'keya-home.jpg', 'Home: cash and upcoming deliveries'], ['ph', 'keya-gallery.jpg', 'Cake catalog to show customers'], ['ph', 'keya-fridge.jpg', 'Fridge: every cake, with counts and prices']],
    body: `
<section class="section"><div class="wrap">
  <div class="section-head"><div><h2>About this app</h2><p>The app is in Bangla by default. Tap <b>EN</b> at the top for English.</p></div></div>
  <div class="features">
    <div class="feature"><div class="ficon">${ic('image')}</div><h3>Cake catalog</h3><p>Nearly a hundred designs in groups (classic, heart shape, two tiers) to show customers.</p></div>
    <div class="feature"><div class="ficon">${ic('list')}</div><h3>Orders</h3><p>From the catalog or the customer's own photo: flavour, pounds, price, advance and due, from new to delivered.</p></div>
    <div class="feature"><div class="ficon">${ic('fridge')}</div><h3>Fridge</h3><p>Every cake with its price. Put new ones in, tap a picture to sell, and see the fridge history for any day.</p></div>
    <div class="feature"><div class="ficon">${ic('cash')}</div><h3>Cash account</h3><p>Cash with the salesman, today's sales and money given to the owner. Every handover is recorded.</p></div>
    <div class="feature"><div class="ficon">${ic('chart')}</div><h3>Reports</h3><p>Daily, weekly and monthly totals, including who sold what.</p></div>
    <div class="feature"><div class="ficon">${ic('printer')}</div><h3>Receipts</h3><p>Print on a Bluetooth printer from the Android app: one copy for the customer, one for the shop.</p></div>
  </div>
</div></section>
<section class="section section-alt"><div class="wrap">
  <div class="section-head"><div><h2>How to use it</h2></div></div>
  <div class="two-col">
    <div class="panel"><h3>Everyday tasks</h3><ol class="steps">
      <li><div><b>Take an order:</b> open <b>Gallery</b> <span class="bn">(গ্যালারি)</span>, tap a design, then <b>Order this cake</b> and <b>Confirm order</b>.</div></li>
      <li><div><b>Sell from the fridge:</b> open <b>Fridge</b> <span class="bn">(ফ্রিজ)</span>, tap the cake's picture, then <b>Sell</b>.</div></li>
      <li><div><b>Hand money to the owner:</b> in <b>Cash</b>, tap <b>Give money to owner</b>.</div></li>
      <li><div><b>Owner:</b> add people in <b>Settings → New user</b>, stock the fridge with <b>Add cakes to fridge</b>, and check <b>Reports</b> <span class="bn">(রিপোর্ট)</span>.</div></li>
    </ol></div>
    <div class="panel"><h3>Install</h3><ol class="steps">
      <li><div><b>Android:</b> download the APK, open it, allow installing from this source, then tap <b>Install</b>. If Play Protect warns you, tap <b>More details → Install anyway</b>.</div></li>
      <li><div><b>iPhone:</b> open the web app in <b>Safari</b>, tap <b>Share → Add to Home Screen</b>.</div></li>
      <li><div>New versions show an <b>Update</b> message inside the app. Printing works only from the Android app.</div></li>
    </ol></div>
  </div>
</div></section>`,
    cta: ['Every cake and every taka, recorded.', 'Free for the Keya\'s Bakery team.'],
  },
];

/* ---------------- shared bits ---------------- */
const tagHtml = (t) => t === 'beta' ? '<span class="badge badge-beta">Beta</span>' : t === 'new' ? '<span class="badge badge-new">New</span>' : '';
const href = (p, pre) => `${pre}${p.dir}/${p.slug}.html`;
// the round "Get" button: links to the store page, then site.js switches it to this device's download
function getBtn(p, pre) {
  const attrs = Object.entries(p.get).map(([dev, [link, label, note]]) =>
    ` data-${dev}="${link.startsWith('http') ? link : pre + link}" data-${dev}-label="${label}" data-${dev}-note="${note}"`).join('');
  return `<a class="get view" href="${href(p, pre)}" data-get${attrs} aria-label="Get ${p.name}">View</a>`;
}
function appRow(p, pre) {
  return `<div class="app-row" data-search="${(p.name + ' ' + p.search).toLowerCase()}">
  <a href="${href(p, pre)}"><img src="${pre}assets/icons/${p.icon}" alt="" loading="lazy"></a>
  <a class="info" href="${href(p, pre)}"><b>${p.name} ${tagHtml(p.tag)}</b><span class="sub">${p.kind}</span><span class="meta">${p.platforms}</span></a>
  ${getBtn(p, pre)}
</div>`;
}
function branchTile(key, pre) {
  const b = BR[key];
  return `<a class="branch" href="${pre}${b.href}" style="--c:${b.c}" data-name="${b.name}" data-what="${b.what.toUpperCase()}">
  <div class="tile">
    <div class="face"><div class="fa" aria-hidden="true"><span class="f">F</span><span class="a">a</span></div><div class="flood"></div></div>
    <div class="label">${b.word}</div>
    <div class="badge-dot" aria-hidden="true"><svg viewBox="0 0 24 24">${badgeIcon(key, b.c)}</svg></div>
  </div>
  <div class="caption"><b>${b.name}</b><span>${key === 'arcade' ? 'Games' : key === 'labs' ? 'Software' : 'Videos &amp; media'}</span></div>
</a>`;
}

/* ---------------- pages ---------------- */
function write(rel, html) { fs.mkdirSync(path.dirname(path.join(ROOT, rel)), { recursive: true }); fs.writeFileSync(path.join(ROOT, rel), html); console.log('wrote', rel); }

// Home
write('index.html', page('', { title: 'Fabirium · Games, apps and videos', desc: 'Fabirium: games by Fabirium Arcade, apps by Fabirium Labs and videos by Fabirium Cuts. Free to download.', active: 'home', tab: 'home' }, `
<section class="hero"><div class="wrap">
  <p class="eyebrow">Fabirium</p>
  <h1>Games, apps and videos, <em>made by two.</em></h1>
  <p class="lead">We're Abir and Farhana, a small studio in Bangladesh. Fabirium has three branches. Pick one to start.</p>
  <nav class="branches" aria-label="Our three branches">${['arcade', 'labs', 'cuts'].map((k) => branchTile(k, '')).join('')}</nav>
  <div class="btn-row"><a class="btn btn-primary" href="store.html">${ic('bag')} Open the store</a></div>
</div></section>

<section class="section section-alt"><div class="wrap">
  <div class="section-head"><div><p class="eyebrow">From the store</p><h2>Our games and apps</h2><p>Everything is free. Tap <b>Get</b> to download the right version for your phone or computer.</p></div><a class="btn btn-ghost" href="store.html">See the store ${ic('arrow')}</a></div>
  <div class="grid-2">
${P.map((p) => `  <article class="pcard" style="--p-soft:${p.soft}">
    <a class="pcard-shot${p.homeShot.phone ? ' phone' : ''}" href="${href(p, '')}"><img src="assets/shots/${p.homeShot.land || p.homeShot.phone}" alt="${p.homeShot.alt}" loading="lazy"></a>
    <div class="pcard-body">
      <div class="pcard-top"><img src="assets/icons/${p.icon}" alt=""><div><h3><a class="name" href="${href(p, '')}">${p.name}</a> ${tagHtml(p.tag)}</h3>${devLink(p.branch, '')}</div>${getBtn(p, '')}</div>
      <p>${p.short}</p>
    </div>
  </article>`).join('\n')}
  </div>
</div></section>

<section class="section" id="about"><div class="wrap about">
  ${mainTile()}
  <div>
    <p class="eyebrow">About us</p>
    <h2>Why “Fabirium”?</h2>
    <p class="formula"><span class="f">Fa</span>rhana + A<span class="a">bir</span> + ium</p>
    <p class="muted">The name is made from our two names, plus “-ium”, the ending of an element's name. So we drew it as a new element: symbol <b style="color:var(--coral-text)">F</b><b style="color:var(--violet-text)">a</b>, number <b>3</b>, for our three branches: Arcade, Labs and Cuts.</p>
    <p class="muted">We build things we want to use ourselves: games to play with family and friends, apps for real shops we know, and videos about it all.</p>
  </div>
</div></section>`));

// Store
write('store.html', page('', { title: 'Store · Fabirium', desc: 'Download Fabirium games and apps: Street Bites, Fabirium Spades, Sonali Khata and Keya\'s Bakery. Free.', active: 'store', tab: 'store' }, `
<section class="store-head"><div class="wrap">
  <h1>Store</h1>
  <p class="muted">Every Fabirium game and app, free to download.</p>
  <div class="search">${ic('search')}<input id="storeSearch" type="search" placeholder="Search games and apps" aria-label="Search games and apps" autocomplete="off"></div>
  <div class="tabs" role="tablist" aria-label="Show"><button type="button" role="tab" data-tab="all" aria-selected="true">All</button><button type="button" role="tab" data-tab="games" aria-selected="false">Games</button><button type="button" role="tab" data-tab="apps" aria-selected="false">Apps</button></div>
</div></section>
<div class="wrap">
  <section class="store-section" data-kind="games" id="games-list">
    <h2>${dot('arcade')}Games</h2><p>By Fabirium Arcade</p>
    <div class="app-list">${P.filter((p) => p.dir === 'games').map((p) => appRow(p, '')).join('')}</div>
  </section>
  <section class="store-section" data-kind="apps" id="apps-list">
    <h2>${dot('labs')}Apps</h2><p>By Fabirium Labs</p>
    <div class="app-list">${P.filter((p) => p.dir === 'apps').map((p) => appRow(p, '')).join('')}</div>
  </section>
  <p class="empty">Nothing found. Try another word.</p>
  <div class="callout" style="margin:26px 0 48px">${ic('info')}<div><b>Get</b> picks the right version for your device: the Android app on Android, the web app on iPhone, and the PC version on a computer. Tap a name to see every option and how to install it.</div></div>
</div>`));

// Cuts
write('cuts.html', page('', { title: 'Fabirium Cuts · Videos', desc: 'Fabirium Cuts: videos by Fabirium on YouTube, Facebook, Instagram and TikTok.', active: 'cuts', tab: 'cuts', style: '--p:#C77F0A; --p-soft:#2A1F0C; --p-text:#FFC46B' }, `
<section class="hero"><div class="wrap">
  <div style="width:120px;height:120px;margin:0 auto 22px;position:relative">${branchTile('cuts', '').match(/<div class="tile">[\s\S]*?<\/div>\s*<div class="label">[\s\S]*?<\/div>\s*<div class="badge-dot"[\s\S]*?<\/div>\s*<\/div>/)[0].replace('class="tile"', 'class="tile" style="--size:120px;--c:#FFB547"')}</div>
  <p class="eyebrow" style="color:#FFC46B">Fabirium Cuts</p>
  <h1>Videos, coming soon</h1>
  <p class="lead">Fabirium Cuts is our video branch. Our channels are on the way. Follow us there once they're live.</p>
</div></section>
<section class="section section-alt"><div class="wrap">
  <div class="channels">
    ${['YouTube', 'Facebook', 'Instagram', 'TikTok'].map((n) => `<div class="channel"><b>${n}</b><span>Fabirium Cuts</span><span class="soon">Coming soon</span></div>`).join('')}
  </div>
</div></section>`));

// Product pages
for (const p of P) {
  const pre = '../';
  const install = p.install.map((b, i) => b.off
    ? `<span class="btn btn-off" aria-disabled="true">${ic(b.icon)}<span class="btn-text">${b.title}<small>${b.sub}</small></span></span>`
    : `<a class="btn ${i === 0 ? 'btn-product' : 'btn-ghost'}" href="${b.href}" data-for="${b.for}"${b.download ? ' download' : ''}>${ic(b.icon)}<span class="btn-text">${b.title}<small>${b.sub}</small></span></a>`).join('\n      ');
  write(`${p.dir}/${p.slug}.html`, page(pre, {
    title: `${p.name} · ${BR[p.branch].name}`, desc: p.short, og: 'shots/' + (p.homeShot.land || p.homeShot.phone),
    active: p.dir, tab: p.dir, style: `--p:${p.p}; --p-soft:${p.soft}; --p-text:${p.text}`,
  }, `
<div class="wrap crumb"><a href="${pre}store.html#${p.dir}">${ic('back', 'icon')} Store</a></div>
<section><div class="wrap listing">
  <div>
    <div class="listing-id"><img src="${pre}assets/icons/${p.icon}" alt="${p.name} icon"><div><h1>${p.name}</h1>${devLink(p.branch, pre)} <span class="muted" style="font-size:14px">· ${p.kind}</span> ${tagHtml(p.tag)}</div></div>
    <div class="stats">${p.stats.map(([b, s]) => `<div><b>${b}</b><span>${s}</span></div>`).join('')}</div>
    <div class="install">
      ${install}
    </div>
    ${p.fine ? `<p class="muted" style="font-size:14px;margin-bottom:12px">${p.fine}</p>` : ''}
    ${p.note ? `<div class="callout">${p.note}</div>` : ''}
    <p class="lead" style="margin-top:16px">${p.lead}</p>
  </div>
  <div class="listing-visual">${p.visual}</div>
</div></section>
<section class="section" style="padding-bottom:12px"><div class="wrap">
  <div class="section-head" style="margin-bottom:12px"><div><h2>Screenshots</h2></div></div>
  <div class="shots">${p.shots.map(([k, src, cap]) => `<figure class="${k}"><img src="${pre}assets/shots/${src}" alt="${cap}" loading="lazy"><figcaption>${cap}</figcaption></figure>`).join('')}</div>
</div></section>
${p.body}
<section class="wrap cta-section" style="margin-top:40px"><div class="cta">
  <div><h2>${p.cta[0]}</h2><p>${p.cta[1]}</p></div>
  <div class="btn-row">${getBtn(p, pre).replace('class="get view"', 'class="get view" style="min-height:48px;padding:10px 24px;font-size:16px"')}</div>
</div></section>`));
}
