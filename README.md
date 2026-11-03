# DIYA-MAN — A Cogfree Diwali Arcade Game

Static site, no build step: `index.html`, `style.css`, `game.js` (plain script, vanilla JS + Canvas 2D), `assets/`.

## Run locally

You can also just double-click `index.html` (or `play.html`, the single-file bundle). To serve over http:

```bash
python3 -m http.server 8080
```

or `npx serve .`, then open http://localhost:8080

## Change the text, speeds, colours, maze

Everything lives in the `CONFIG` object at the top of `game.js`:

| What | Where |
| --- | --- |
| Maze (array of strings) | `CONFIG.map` |
| Speeds (tiles/s) | `CONFIG.speeds` |
| Timings: power mode, release, bonuses, sequences | `CONFIG.timings` |
| Ghost names, in-maze labels, colours, gimmick numbers | `CONFIG.ghosts` |
| Score titles | `CONFIG.titles` |
| **All copy**: chat, toasts, stamps, end screen, share text | `CONFIG.text` |

In-maze ghost pills use the short `short` label (readable on a phone); the full `label` is kept in CONFIG for reuse.

## Personalised client links

Append `?c=ClientName`:

```
https://your-site.example/?c=Too%20Yumm
```

The end screen shows "Happy Diwali, Too Yumm!" and the shared scorecard carries the name too. The value is URL-decoded, reduced to letters, numbers, spaces, `&` and `-`, capped at 30 characters, and only ever written with `textContent`.

## Assets

- `assets/cogfree-logo.png` is the real Cogfree logo, used on the share scorecard (drawn on a white plate, since its petals are transparent).
- `assets/og-image.png` (1200x630) is the link preview for WhatsApp/LinkedIn. Regenerate it if the logo ever changes: open `?debug=1`, then in the console run `__dm.renderCard('og', {score:0,title:'',pct:0,time:0,won:true})` and save the canvas.

## Deploy (drag-and-drop static)

- **Netlify**: https://app.netlify.com/drop, drop this folder.
- **Vercel**: `npx vercel` in this folder (framework: Other, no build command, output `.`).
- **GitHub Pages**: push to a repo, Settings, Pages, deploy from branch `main` / root.

After deploying, set `og:image` in `index.html` to the absolute URL of `assets/og-image.png` so previews work everywhere.

## Controls

Arrow keys / WASD, `P` or `Esc` pause, `M` mute. Touch: swipe anywhere, plus an optional D-pad (toggle in the pause menu).

## Design notes

- Fixed 60 Hz simulation with interpolated rendering; frame gaps are clamped.
- Maze, rangoli and diya bowls are pre-rendered; eaten diyas are erased from the bowl layer; particles are pooled (max 300).
- Violet ghost splits once per game (`splitOncePerLife: true` in CONFIG to allow it each life).
