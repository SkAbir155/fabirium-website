# Fabirium Labs website

The website for Fabirium Labs: a home page plus one page for each game and app, with download buttons and instructions.

## Preview it

Double-click `index.html` to open it in your browser. Everything works offline except the fonts and the download buttons, which need internet.

## What's inside

| Path | What it is |
|---|---|
| `index.html` | Home page: games, apps and "Why Fabirium?" |
| `games/street-bites.html` | Street Bites: play in the browser, Windows and Android downloads, how to play |
| `games/fabirium-spades.html` | Fabirium Spades: PC download, how to start a game at home, how to play, rules |
| `apps/sonali-khata.html` | Sonali Khata: Android and iPhone, features, install and getting started |
| `apps/keyas-bakery.html` | Keya's Bakery: Android and iPhone, features, roles, how to use |
| `assets/site.css` | All the styles. Violet `#7B5CFF` is Abir, coral `#FF5D73` is Farhana |
| `assets/logo/` | Logo 01 (the 2·Fa element tile) as PNG, favicon and app icons |
| `assets/shots/` | Screenshots of each game and app |
| `assets/icons/` | Each product's own icon |
| `assets/og.png` | The picture shown when someone shares the site on Facebook or WhatsApp |
| `downloads/fabirium-spades.zip` | The Fabirium Spades download, with `Start Fabirium Spades.bat` for Windows |

## Where the download buttons go

These always give the newest version, so they don't need changing after an update:

- **Street Bites:** the public build at `skabir155.github.io/street-bites-play` (browser game, `street-bites-setup.exe`, `street-bites.apk`)
- **Sonali Khata:** `github.com/SkAbir155/sonali-khata-app/raw/main/SonaliKhata.apk`, and the iPhone web app at `sonali-khata.web.app/app/`
- **Keya's Bakery:** `github.com/SkAbir155/keyas-bakery-app/raw/main/KeyasBakery.apk`, and the iPhone web app at `keyas-bakery.web.app/app/`
- **Fabirium Spades:** the zip in `downloads/`. After changing the game, rebuild the zip from the `Card game` folder (without `node_modules`).

When Fabirium Spades goes online, replace the grey "Play online · Coming soon" button in `games/fabirium-spades.html` with a link to it.

## Put it online

It's a plain static site, so any free static host works. GitHub Pages is simplest, because Street Bites already uses it:

1. Create a public repository, for example `fabirium-website`, and upload everything in this folder.
2. In the repository: **Settings → Pages → Deploy from a branch → main → / (root)**.
3. After you buy `fabirium.com`: in **Settings → Pages → Custom domain**, enter `fabirium.com`. Then in your domain's DNS settings add four **A** records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, plus a **CNAME** record for `www` pointing to `skabir155.github.io`. Tick **Enforce HTTPS** once it's available.

The share-picture tags (`og:image`) assume the address `https://fabirium.com`. Change them if you use a different address.

## Changing the pages (new, important)

All pages are now generated from one file: `_src/build.js`. It holds the branches, the four products (names, downloads, sizes, screenshots, instructions) and the shared header, phone tab bar and footer.

1. Edit `_src/build.js` (for example, a new version's size, or a new game).
2. In this folder run: `node _src/build.js`
3. Open `index.html` to check.

Don't edit the `.html` files by hand: the next build overwrites them.

Pages: `index.html` (home with the three branches), `store.html` (the store), `cuts.html` (videos, coming soon) and one store page per game or app in `games/` and `apps/`.
