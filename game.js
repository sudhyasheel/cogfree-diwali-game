// DIYA-MAN — a Cogfree Diwali arcade game. Vanilla JS, Canvas 2D, no dependencies.
// Everything editable (copy, timings, speeds, colours, the maze) lives in CONFIG below.
// Plain (non-module) script so index.html also works when double-clicked (file://).

const CONFIG = {
  // 21 x 22, left/right symmetrical.  # wall  . diya  o advance payment  (space) corridor  - ghost door  G house  P hero start
  map: [
    '#####################',
    '#.........#.........#',
    '#.###.###.#.###.###.#',
    '#o###.###.#.###.###o#',
    '#...................#',
    '#.###.#.#####.#.###.#',
    '#.....#...#...#.....#',
    '#####.###.#.###.#####',
    '#####.#       #.#####',
    '#####.# ##-## #.#####',
    '     .  #GGG#  .     ',
    '#####.# ##### #.#####',
    '#####.#       #.#####',
    '#####.#.#####.#.#####',
    '#.........#.........#',
    '#.###.###.#.###.###.#',
    '#o..#.....P.....#..o#',
    '###.#.#.#####.#.#.###',
    '#.....#...#...#.....#',
    '#.#######.#.#######.#',
    '#...................#',
    '#####################',
  ],
  colors: {
    bg: '#070B1A', red: '#ED1C24', blue: '#00AEEF', green: '#8DC63F', orange: '#F7941D', gold: '#FFC83D',
    fright: '#1E2A9A', frightFlash: '#FFFFFF', stampRed: '#ff3b45',
  },
  speeds: { // tiles per second
    hero: 5.2, heroPower: 5.6, ghostStart: 3.4, ghostMax: 3.9, frightened: 2.3, eyes: 10, tunnel: 0.55,
    amberSlow: 0.8, sprint: 1.5, leave: 4,
  },
  input: { bufferSec: 0.3, cornerAssist: 0.35, swipePx: 18 },
  collisionRadius: 0.42,
  lives: 5,
  firstRevision: 4,
  scores: { pellet: 10, coin: 50, ghostChain: [200, 400, 800, 1600], kaju: 500, chai: 100 },
  timings: {
    powerSec: 10, frightFlashSec: 2, readySec: 1.5, toastSec: 2.5, banterEvery: [15, 20],
    modes: [['scatter', 8], ['chase', 15], ['scatter', 8], ['chase', 15], ['chase', Infinity]],
    release: [0, 6, 12, 18],
    kajuAtLit: [0.3, 0.7], kajuSec: 9, chaiWindow: [40, 80], chaiSec: 8, chaiFreezeSec: 3,
    deathFreeze: 0.4, deathAnim: 0.9, deathStamp: 1.7,
    winFade: 1.2, winFireworks: 3, winStampHold: 4.2, overHold: 3.6,
    loadSec: 2, loadHold: 0.6, chatTyping: 900, chatGap: 450,
  },
  hero: { sizeTiles: 1.6, mouthHz: 9, mouthMaxDeg: 32, spinSec: 1.2 },
  ghosts: [
    { key: 'bigger', label: 'MAKE THE LOGO BIGGER', short: 'BIGGER LOGO', color: '#FF3EA5', scatter: [20, 0],
      growEverySec: 10, growPct: 0.08, growMax: 1.5 },
    { key: 'options', label: '2 MORE OPTIONS BY EOD', short: '2 MORE OPTIONS', color: '#8B5CF6', scatter: [0, 0],
      splitRadius: 5, splitScale: 0.7, mergeSec: 8, nameA: 'OPTION A', nameB: 'OPTION B', splitOncePerLife: false },
    { key: 'pop', label: 'CAN YOU MAKE IT POP?', short: 'MAKE IT POP', color: '#14D3C1', scatter: [20, 21],
      popEvery: [9, 13], popMinDist: 8, popWarnSec: 0.5, randomProb: 0.6 },
    { key: 'change', label: 'JUST A SMALL CHANGE', short: 'SMALL CHANGE', color: '#FFC233', scatter: [0, 21],
      sprintEverySec: 15, sprintSec: 1.5, warnSec: 0.6, sprintText: '…actually' },
  ],
  titles: [ // [min score, title]
    [0, 'Intern on Night Shift'], [2000, 'Senior Designer, Surviving'],
    [5000, 'Art Director, Seen It All'], [8000, 'Chief Druid 🔥'],
  ],
  keys: { up: ['ArrowUp', 'w', 'W'], left: ['ArrowLeft', 'a', 'A'], down: ['ArrowDown', 's', 'S'], right: ['ArrowRight', 'd', 'D'] },
  storage: { best: 'diyaman_best', mute: 'diyaman_mute', dpad: 'diyaman_dpad' },
  clientParamMax: 30,
  text: {
    intro: {
      contactName: 'Client 🙏', status: 'online', badge: 'Cogfree client', time: '11:47 PM',
      messages: ['Hi team Cogfree.', 'Small change 🙏', 'Can we see it tonight?'],
      reply: 'Ok sir 👍 (Tap to Play)',
      howto: 'Eat every diya. Dodge the feedback. Swipe or use arrow keys.',
    },
    loading: { label: 'Exporting Final_FINAL_v12_revised_USE THIS.psd…', review: 'Client is reviewing…' },
    hud: { score: 'SCORE', lit: 'DIYAS EATEN', best: 'BEST', lives: 'REVISIONS LEFT', pauseAria: 'Pause game', muteAria: 'Toggle sound' },
    ready: 'READY?',
    pause: { title: 'Client is typing', resume: 'RESUME', restart: 'RESTART', soundOn: 'SOUND: ON', soundOff: 'SOUND: OFF', dpadOn: 'D-PAD: ON', dpadOff: 'D-PAD: OFF' },
    credit: 'Designed and developed by Cogfree. © 2026 cogfree. All Rights Reserved.',
    frightLabel: 'UNDER REVIEW…',
    coinLabel: 'ADVANCE PAYMENT RECEIVED',
    eaten: 'Noted, will revert 🙏',
    pop: 'POP!',
    toasts: [
      "Saw this on competitor's page, can we do similar?", 'Can we try it in yellow?', 'Boss wants to see it once',
      'Font is not looking premium', 'Make it festive but minimal', 'Can you share the open file?',
      'Keep it simple but grand', 'Just one last change, promise', 'Can we make the white more white?',
      "Let's go back to the first option", 'Add more Diwali vibes', 'Why does it look so empty?',
      'Make it viral', 'Can we have it by tomorrow morning?',
    ],
    power: '💰 Advance Payment Received! (Rare event)',
    kaju: 'Client sent mithai. Scope unchanged.',
    chai: 'Chai break! Feedback paused.',
    merged: 'Merged into Option C',
    death: 'REVISION {n} - SEND BY EOD!',
    deathSub: '',
    win: { stamp: 'APPROVED. NO CHANGES.', sub: '(This has never happened in real life. Happy Diwali 🪔)' },
    over: { stamp: 'PROJECT ON HOLD', sub: 'Will connect after Diwali 🙏' },
    end: {
      scoreLabel: 'FINAL SCORE', lit: 'DIYAS EATEN', eaten: 'FEEDBACK NOTED', time: 'TIME TAKEN',
      best: 'Your best: {n}', happy: 'Happy Diwali, {name}!',
      message: 'Wishing you a Diwali with zero revisions. Love, Team Cogfree 🪔',
      share: 'SHARE MY SCORE', download: 'Download scorecard', copy: 'Copy link', copied: 'Copied! ✅', again: 'PLAY AGAIN',
      footer: 'Any resemblance to actual clients is entirely intentional. With love, Cogfree.',
      shareText: "I survived 'Make the Logo Bigger' and scored {score} in Diya-Man 🪔 Title: {title}. Can your team beat this? {url}",
    },
    card: { name: 'DIYA-MAN — Diwali Edition', footer: 'A Diwali game by Cogfree', ogLine1: 'Eat every diya.', ogLine2: 'Dodge the feedback.', ogPlay: 'PLAY NOW' },
  },
  assets: { logo: 'assets/cogfree-logo.png' },
};

/* =====================================================================
   BASICS
   ===================================================================== */
const C = CONFIG, T = C.text, SP = C.speeds, TM = C.timings;
const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[(Math.random() * arr.length) | 0];
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const getPath = (o, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const vib = (ms) => { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { /* ignore */ } };
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } },
};

const DX = [0, -1, 0, 1], DY = [-1, 0, 1, 0]; // 0 up, 1 left, 2 down, 3 right
const opp = (d) => (d + 2) & 3;

/* ---------- map ---------- */
const GRID = C.map.map((r) => r.split(''));
const H = GRID.length, W = GRID[0].length;
let startTile = [10, 16];
for (let r = 0; r < H; r++) {
  if (GRID[r].length !== W) console.warn('[Diya-Man] map row', r, 'has wrong length', GRID[r].length);
  for (let c = 0; c < W; c++) if (GRID[r][c] === 'P') { startTile = [c, r]; GRID[r][c] = ' '; }
}
const tileAt = (c, r) => (r < 0 || r >= H ? '#' : GRID[r][((c % W) + W) % W]);
const heroCan = (c, r) => { const t = tileAt(c, r); return t !== '#' && t !== '-' && t !== 'G'; };
const HOME = [10, 10], DOOR = [10, 9], EXIT = [10, 8];

function bfs(sx, sy, can) {
  const d = Array.from({ length: H }, () => new Int16Array(W).fill(-1));
  const q = [[sx, sy]]; d[sy][sx] = 0;
  for (let i = 0; i < q.length; i++) {
    const [x, y] = q[i];
    for (let k = 0; k < 4; k++) {
      const nx = (x + DX[k] + W) % W, ny = y + DY[k];
      if (ny < 0 || ny >= H || d[ny][nx] >= 0 || !can(nx, ny)) continue;
      d[ny][nx] = d[y][x] + 1; q.push([nx, ny]);
    }
  }
  return d;
}
const reach = bfs(startTile[0], startTile[1], heroCan);
let TOTAL_DIYAS = 0;
(function verifyMap() {
  let bad = 0;
  for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
    const ch = GRID[r][c];
    if (ch === '.') TOTAL_DIYAS++;
    if ((ch === '.' || ch === 'o') && reach[r][c] < 0) { bad++; console.warn('[Diya-Man] UNREACHABLE pellet at', c, r); }
  }
  console.info(`[Diya-Man] map ${W}x${H}: ${TOTAL_DIYAS} diyas, ${bad} unreachable`);
})();
const eyeDist = bfs(HOME[0], HOME[1], (c, r) => tileAt(c, r) !== '#');
const chaiTiles = [];
for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) if (GRID[r][c] === ' ' && reach[r][c] >= 0 && !(r === 10 && (c < 5 || c > 15)) && r !== 12) chaiTiles.push([c, r]);
const walkTiles = [];
for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) if (heroCan(c, r) && reach[r][c] >= 0) walkTiles.push([c, r]);
const inTunnel = (x, y) => Math.floor(y) === 10 && (x < 5 || x >= 16);

/* =====================================================================
   AUDIO — synthesised with Web Audio, no files
   ===================================================================== */
const Audio = {
  ctx: null, master: null, noise: null, muted: store.get(C.storage.mute) === '1', tick: 0,
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    this.ctx = new AC(); this.master = this.ctx.createGain(); this.master.gain.value = this.muted ? 0 : 0.5; this.master.connect(this.ctx.destination);
    const n = this.ctx.sampleRate, b = this.ctx.createBuffer(1, n, n), d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    this.noise = b;
  },
  setMuted(m) { this.muted = m; store.set(C.storage.mute, m ? '1' : '0'); if (this.master) this.master.gain.value = m ? 0 : 0.5; },
  tone(f, dur, type, vol, f2, delay) {
    if (!this.ctx || this.muted) return;
    const t0 = this.ctx.currentTime + (delay || 0), o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t0);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol || 0.2, t0 + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(this.master); o.start(t0); o.stop(t0 + dur + 0.02);
  },
  hiss(dur, vol, freq, delay, q) {
    if (!this.ctx || this.muted) return;
    const t0 = this.ctx.currentTime + (delay || 0), s = this.ctx.createBufferSource(), f = this.ctx.createBiquadFilter(), g = this.ctx.createGain();
    s.buffer = this.noise; f.type = 'bandpass'; f.frequency.value = freq || 3000; f.Q.value = q || 0.8;
    g.gain.setValueAtTime(vol || 0.2, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    s.connect(f); f.connect(g); g.connect(this.master); s.start(t0, Math.random() * 0.5); s.stop(t0 + dur + 0.02);
  },
  pellet() { this.tick ^= 1; this.tone(this.tick ? 740 : 988, 0.06, 'sine', 0.1); },
  power() { [523, 659, 784, 1047, 1319].forEach((f, i) => this.tone(f, 0.12, 'triangle', 0.18, 0, i * 0.06)); },
  eat() { this.tone(320, 0.14, 'square', 0.12, 1000); },
  popSnd() { this.tone(260, 0.12, 'sine', 0.22, 900); this.tone(520, 0.08, 'sine', 0.1, 1400, 0.05); },
  death() {
    if (!this.ctx || this.muted) return;
    const t0 = this.ctx.currentTime, o = this.ctx.createOscillator(), l = this.ctx.createOscillator(), lg = this.ctx.createGain(), g = this.ctx.createGain();
    o.type = 'sawtooth'; o.frequency.setValueAtTime(700, t0); o.frequency.exponentialRampToValueAtTime(90, t0 + 0.9);
    l.frequency.value = 14; lg.gain.value = 40; l.connect(lg); lg.connect(o.frequency);
    g.gain.setValueAtTime(0.16, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.95);
    o.connect(g); g.connect(this.master); o.start(t0); l.start(t0); o.stop(t0 + 1); l.stop(t0 + 1);
  },
  stamp() { this.tone(130, 0.3, 'sine', 0.5, 38); this.hiss(0.18, 0.35, 400, 0, 0.5); },
  toast() { this.tone(1320, 0.07, 'sine', 0.09); this.tone(1760, 0.09, 'sine', 0.09, 0, 0.08); },
  kaju() { [784, 988, 1175].forEach((f, i) => this.tone(f, 0.14, 'sine', 0.16, 0, i * 0.07)); },
  chai() { this.tone(440, 0.2, 'sine', 0.15); this.tone(554, 0.28, 'sine', 0.13, 0, 0.12); },
  crackle() { for (let i = 0; i < 5; i++) this.hiss(0.05, 0.22, 2500 + Math.random() * 4000, i * 0.035, 1.4); this.tone(200 + Math.random() * 120, 0.18, 'sine', 0.12, 60); },
  winArp() { [523, 659, 784, 1047, 784, 1047, 1319, 1568].forEach((f, i) => this.tone(f, 0.18, 'triangle', 0.17, 0, i * 0.11)); },
};

/* =====================================================================
   LOGO GEOMETRY (shared by hero, death, scorecard, HUD svg)
   ===================================================================== */
const QCOL = { tl: C.colors.red, tr: C.colors.blue, bl: C.colors.green, br: C.colors.orange };
// petals in order TL, TR, BR, BL, with their inner leaf colours
const PETALS = [
  { ang: -135, inner: C.colors.blue }, { ang: -45, inner: C.colors.red },
  { ang: 45, inner: C.colors.green }, { ang: 135, inner: C.colors.orange },
];
function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function squareRect(L, i) { // geometry for square i (0 TL,1 TR,2 BL,3 BR) relative to centre
  const gap = L * 0.06, s = (L - gap) / 2;
  return { x: (i & 1 ? gap / 2 : -gap / 2 - s), y: (i & 2 ? gap / 2 : -gap / 2 - s), s };
}
const SQ_COL = [QCOL.tl, QCOL.tr, QCOL.bl, QCOL.br];
function drawSquares(ctx, L) { // centred at 0,0
  for (let i = 0; i < 4; i++) { const q = squareRect(L, i); ctx.fillStyle = SQ_COL[i]; rrect(ctx, q.x, q.y, q.s, q.s, q.s * 0.18); ctx.fill(); }
}
function leaf(ctx, x0, x1, hw) {
  const mx = (x0 + x1) / 2; ctx.beginPath(); ctx.moveTo(x0, 0); ctx.quadraticCurveTo(mx, -hw * 2, x1, 0); ctx.quadraticCurveTo(mx, hw * 2, x0, 0); ctx.closePath(); ctx.fill();
}
function drawFlower(ctx, L, rot) {
  ctx.save(); ctx.rotate(rot || 0);
  ctx.fillStyle = '#fff';
  for (const p of PETALS) { ctx.save(); ctx.rotate(p.ang * Math.PI / 180); leaf(ctx, 0, L * 0.5, L * 0.135); ctx.restore(); }
  for (const p of PETALS) { ctx.save(); ctx.rotate(p.ang * Math.PI / 180); ctx.fillStyle = p.inner; leaf(ctx, L * 0.1, L * 0.41, L * 0.088); ctx.restore(); }
  ctx.restore();
}
function drawLogo(ctx, cx, cy, L) { ctx.save(); ctx.translate(cx, cy); drawSquares(ctx, L); drawFlower(ctx, L, 0); ctx.restore(); }
function logoSVG(px) { // same geometry as an inline SVG (100 unit box)
  const g = 6, s = 47, sq = [[0, 0, QCOL.tl], [s + g, 0, QCOL.tr], [0, s + g, QCOL.bl], [s + g, s + g, QCOL.br]]
    .map(([x, y, f]) => `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="8.5" fill="${f}"/>`).join('');
  const pet = PETALS.map((p) => `<g transform="translate(50 50) rotate(${p.ang})"><path d="M0 0Q25 -27 50 0Q25 27 0 0Z" fill="#fff"/><path d="M10 0Q25.5 -17.6 41 0Q25.5 17.6 10 0Z" fill="${p.inner}"/></g>`).join('');
  return `<svg width="${px}" height="${px}" viewBox="0 0 100 100" aria-hidden="true">${sq}${pet}</svg>`;
}

/* =====================================================================
   RENDER SETUP + PRE-RENDERED LAYERS
   ===================================================================== */
const cv = $('cv'), ctx = cv.getContext('2d');
let dpr = 1, S = 16; // S = device pixels per tile
const L = {}; // pre-rendered layers
const mk = (w, h) => { const c = document.createElement('canvas'); c.width = Math.max(1, w | 0); c.height = Math.max(1, h | 0); return c; };

function layout() {
  const stage = $('stage'); if (!stage.clientWidth) return;
  dpr = Math.min(2, window.devicePixelRatio || 1);
  const css = Math.min(stage.clientWidth / W, stage.clientHeight / H);
  S = Math.max(6, Math.floor(css * dpr));
  cv.width = W * S; cv.height = H * S;
  cv.style.width = (W * S / dpr) + 'px'; cv.style.height = (H * S / dpr) + 'px';
  buildLayers();
}

function traceLoops() {
  const wall = (c, r) => r >= 0 && r < H && c >= 0 && c < W && GRID[r][c] === '#';
  const out = new Map(), all = [];
  const add = (x1, y1, x2, y2) => { const e = { x1, y1, x2, y2, used: false }; all.push(e); const k = x1 + ',' + y1; if (!out.has(k)) out.set(k, []); out.get(k).push(e); };
  for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
    if (!wall(c, r)) continue;
    if (!wall(c, r - 1)) add(c, r, c + 1, r);
    if (!wall(c + 1, r)) add(c + 1, r, c + 1, r + 1);
    if (!wall(c, r + 1)) add(c + 1, r + 1, c, r + 1);
    if (!wall(c - 1, r)) add(c, r + 1, c, r);
  }
  const loops = [];
  for (const e0 of all) {
    if (e0.used) continue;
    const pts = [[e0.x1, e0.y1]]; let e = e0;
    for (let guard = 0; guard < 5000; guard++) {
      e.used = true;
      if (e.x2 === e0.x1 && e.y2 === e0.y1) break;
      pts.push([e.x2, e.y2]);
      const cand = (out.get(e.x2 + ',' + e.y2) || []).filter((n) => !n.used);
      if (!cand.length) break;
      const dx = Math.sign(e.x2 - e.x1), dy = Math.sign(e.y2 - e.y1), rx = -dy, ry = dx; // right turn first
      cand.sort((a, b) => score(a) - score(b));
      function score(n) { const ndx = Math.sign(n.x2 - n.x1), ndy = Math.sign(n.y2 - n.y1); return ndx === rx && ndy === ry ? 0 : ndx === dx && ndy === dy ? 1 : 2; }
      e = cand[0];
    }
    // drop collinear points
    const n = pts.length, clean = [];
    for (let i = 0; i < n; i++) {
      const a = pts[(i + n - 1) % n], b = pts[i], c = pts[(i + 1) % n];
      if ((b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]) !== 0) clean.push(b);
    }
    if (clean.length >= 3) loops.push(clean);
  }
  return loops;
}
function insetLoop(pts, d) {
  const n = pts.length, res = [];
  for (let i = 0; i < n; i++) {
    const a = pts[(i + n - 1) % n], b = pts[i], c = pts[(i + 1) % n];
    const ax = Math.sign(b[0] - a[0]), ay = Math.sign(b[1] - a[1]), bx = Math.sign(c[0] - b[0]), by = Math.sign(c[1] - b[1]);
    res.push([b[0] + d * (-ay + -by), b[1] + d * (ax + bx)]);
  }
  return res;
}
function roundedPath(g, pts, r) {
  const n = pts.length, len = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  g.beginPath(); g.moveTo((pts[n - 1][0] + pts[0][0]) / 2, (pts[n - 1][1] + pts[0][1]) / 2);
  for (let i = 0; i < n; i++) {
    const p = pts[i], q = pts[(i + 1) % n], pr = pts[(i + n - 1) % n];
    const rr = Math.min(r, len(pr, p) / 2, len(p, q) / 2);
    g.arcTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, rr);
  }
  g.closePath();
}
function quadrantGradient() {
  const gw = W * 6, gh = H * 6, c = mk(gw, gh), g = c.getContext('2d'), img = g.createImageData(gw, gh);
  const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const A = hex(QCOL.tl), B = hex(QCOL.tr), Cc = hex(QCOL.bl), D = hex(QCOL.br);
  for (let y = 0; y < gh; y++) {
    const wy = smooth(0.36, 0.64, y / gh);
    for (let x = 0; x < gw; x++) {
      const wx = smooth(0.36, 0.64, x / gw), i = (y * gw + x) * 4;
      for (let k = 0; k < 3; k++) img.data[i + k] = lerp(lerp(A[k], B[k], wx), lerp(Cc[k], D[k], wx), wy);
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0); return c;
}
function blurCopy(src, div) { // cheap blur via down/up scale (works everywhere)
  const w = src.width, h = src.height, s1 = mk(w / div, h / div), g1 = s1.getContext('2d');
  g1.imageSmoothingEnabled = true; g1.drawImage(src, 0, 0, s1.width, s1.height);
  const s2 = mk(s1.width / 2, s1.height / 2), g2 = s2.getContext('2d'); g2.drawImage(s1, 0, 0, s2.width, s2.height);
  const out = mk(w, h), g3 = out.getContext('2d'); g3.imageSmoothingEnabled = true; g3.drawImage(s2, 0, 0, w, h); return out;
}

function buildMaze() {
  const mask = mk(W * S, H * S), m = mask.getContext('2d'); m.scale(S, S);
  m.strokeStyle = '#fff'; m.lineJoin = 'round'; m.lineWidth = 0.062;
  for (const lp of traceLoops()) {
    roundedPath(m, insetLoop(lp, 0.15), 0.36); m.stroke();
    roundedPath(m, insetLoop(lp, 0.29), 0.24); m.stroke();
  }
  // door: thin gold line
  const door = mk(W * S, H * S), d = door.getContext('2d'); d.scale(S, S);
  d.strokeStyle = C.colors.gold; d.lineWidth = 0.09; d.lineCap = 'round'; d.beginPath(); d.moveTo(DOOR[0] + 0.08, DOOR[1] + 0.5); d.lineTo(DOOR[0] + 0.92, DOOR[1] + 0.5); d.stroke();
  // colour by quadrant
  const col = mk(W * S, H * S), cg = col.getContext('2d');
  cg.drawImage(mask, 0, 0); cg.globalCompositeOperation = 'source-in'; cg.imageSmoothingEnabled = true; cg.drawImage(quadrantGradient(), 0, 0, W * S, H * S);
  cg.globalCompositeOperation = 'source-over'; cg.drawImage(door, 0, 0);
  const glow = blurCopy(col, 6), glow2 = blurCopy(col, 3);
  const out = mk(W * S, H * S), o = out.getContext('2d');
  o.globalCompositeOperation = 'lighter'; o.globalAlpha = 0.9; o.drawImage(glow, 0, 0); o.drawImage(glow, 0, 0); o.globalAlpha = 0.6; o.drawImage(glow2, 0, 0);
  o.globalAlpha = 1; o.globalCompositeOperation = 'source-over'; o.drawImage(col, 0, 0);
  L.maze = out;
}

function drawBowl(g, q, r) {
  const x = q + 0.5, y = r + 0.62;
  g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(x, y, 0.21, 0.11, 0, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#e4e8f0'; g.beginPath(); g.ellipse(x, y - 0.025, 0.16, 0.066, 0, 0, Math.PI * 2); g.fill();
}
function buildPellets() { // only diyas that are still uneaten; eaten ones are erased by clearPellet
  const c = mk(W * S, H * S), g = c.getContext('2d'); g.scale(S, S);
  for (let r = 0; r < H; r++) for (let q = 0; q < W; q++) if (pel[r] && pel[r][q] === 1) drawBowl(g, q, r);
  L.pellets = c;
  // flame + glow sprites (2x2 tiles, additive): 4 flicker frames
  L.flames = [];
  const hs = [1, 0.78, 1.2, 0.92], sw = [0, 0.025, -0.02, 0.012];
  for (let i = 0; i < 4; i++) {
    const f = mk(S * 2, S * 2), fg = f.getContext('2d'); fg.scale(S, S); fg.translate(0.5, 0.5);
    const gr = fg.createRadialGradient(0.5, 0.5, 0, 0.5, 0.5, 1.0);
    gr.addColorStop(0, 'rgba(255,225,130,1)'); gr.addColorStop(0.25, 'rgba(255,175,60,0.65)'); gr.addColorStop(0.6, 'rgba(255,125,30,0.25)'); gr.addColorStop(1, 'rgba(255,110,20,0)');
    fg.fillStyle = gr; fg.fillRect(-0.5, -0.5, 2, 2);
    const h = 0.32 * hs[i], bx = 0.5 + sw[i];
    fg.fillStyle = '#ff9a1a'; fg.beginPath(); fg.moveTo(bx, 0.58 - h); fg.bezierCurveTo(bx + 0.13, 0.5, bx + 0.11, 0.6, 0.5, 0.6); fg.bezierCurveTo(bx - 0.11, 0.6, bx - 0.13, 0.5, bx, 0.58 - h); fg.fill();
    fg.fillStyle = '#ffe56a'; fg.beginPath(); fg.ellipse(0.5, 0.53, 0.07, 0.12 * hs[i], 0, 0, Math.PI * 2); fg.fill();
    fg.fillStyle = '#fffbe0'; fg.beginPath(); fg.ellipse(0.5, 0.56, 0.032, 0.06 * hs[i], 0, 0, Math.PI * 2); fg.fill();
    L.flames.push(f);
  }
}
function clearPellet(c, r) {
  if (!L.pellets) return; const g = L.pellets.getContext('2d');
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(c * S, r * S, S, S); g.restore();
}

function buildRangoli() {
  const c = mk(W * S, H * S), g = c.getContext('2d'); g.scale(S, S);
  const cx = W / 2, cy = H / 2, len = 9.2, hw = 3.0, cols = [QCOL.tl, QCOL.tr, QCOL.br, QCOL.bl];
  const prof = (u) => hw * Math.pow(Math.sin(Math.PI * u), 0.85);
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let k = 0; k < 4; k++) {
    g.save(); g.translate(cx, cy); g.rotate((-135 + 90 * k) * Math.PI / 180); g.fillStyle = cols[k];
    for (let u = 0.03; u < 1; u += 0.2 / len * 1.0) { // outline dots
      const w = prof(u); for (const s of [-1, 1]) { g.beginPath(); g.arc(u * len, s * w, 0.085, 0, 6.3); g.fill(); }
    }
    for (let x = 0.5, row = 0; x < len; x += 0.42, row++) { // fill dots
      const u = x / len, w = prof(u) - 0.25; for (let y = -w + (row % 2) * 0.21; y <= w; y += 0.42) { g.globalAlpha = 0.55 + rnd() * 0.45; g.beginPath(); g.arc(x, y, 0.07, 0, 6.3); g.fill(); }
    }
    g.globalAlpha = 1; g.fillStyle = '#ffffffcc';
    for (let x = len * 0.2; x < len * 0.8; x += 0.5) { g.beginPath(); g.arc(x, 0, 0.06, 0, 6.3); g.fill(); }
    g.restore();
  }
  g.fillStyle = C.colors.gold; // ring of gold dots
  for (let a = 0; a < 6.283; a += 0.07) { g.beginPath(); g.arc(cx + Math.cos(a) * 2.2, cy + Math.sin(a) * 2.2, 0.08, 0, 6.3); g.fill(); }
  L.rangoli = c;
}

function buildBg() {
  const c = mk(W * S, H * S), g = c.getContext('2d'); g.scale(S, S);
  g.fillStyle = C.colors.bg; g.fillRect(0, 0, W, H);
  let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = 0; i < 90; i++) { g.globalAlpha = 0.15 + rnd() * 0.45; g.fillStyle = '#cfe0ff'; const s = 0.02 + rnd() * 0.045; g.fillRect(rnd() * W, rnd() * H, s, s); }
  L.bg = c;
  L.glows = [C.colors.red, C.colors.blue, C.colors.orange, C.colors.green].map((col) => {
    const gc = mk(S * 8, S * 8), gg = gc.getContext('2d'), gr = gg.createRadialGradient(S * 4, S * 4, 0, S * 4, S * 4, S * 4);
    gr.addColorStop(0, col + '55'); gr.addColorStop(1, col + '00'); gg.fillStyle = gr; gg.fillRect(0, 0, S * 8, S * 8); return gc;
  });
}

const HS = C.hero.sizeTiles;
function buildHero() {
  const sq = mk(HS * S, HS * S), g = sq.getContext('2d'); g.translate(sq.width / 2, sq.height / 2); g.scale(S, S); drawSquares(g, HS);
  const pad = 1.5, fl = mk(HS * pad * S, HS * pad * S), f = fl.getContext('2d'); f.translate(fl.width / 2, fl.height / 2); f.scale(S, S); drawFlower(f, HS, 0);
  L.heroSq = sq; L.heroFl = fl;
  // soft golden glow sprite
  const gl = mk(S * 4, S * 4), gg = gl.getContext('2d'), gr = gg.createRadialGradient(S * 2, S * 2, 0, S * 2, S * 2, S * 2);
  gr.addColorStop(0, 'rgba(255,210,80,0.75)'); gr.addColorStop(0.5, 'rgba(255,180,40,0.25)'); gr.addColorStop(1, 'rgba(255,170,30,0)');
  gg.fillStyle = gr; gg.fillRect(0, 0, S * 4, S * 4); L.heroGlow = gl;
}
function buildLayers() { buildBg(); buildMaze(); buildPellets(); buildRangoli(); buildHero(); pillCache.clear(); }

/* =====================================================================
   GAME STATE
   ===================================================================== */
const G = {
  state: 'idle', // idle | ready | playing | dying | winning | losing
  paused: false, simT: 0, playT: 0, lifeT: 0,
  score: 0, lives: C.lives, deaths: 0, lit: 0, eaten: 0, chain: 0,
  powerT: 0, freezeT: 0, modeIdx: 0, modeT: 0, bannerT: 0, readyT: 0, seqT: 0,
  kajuDone: [false, false], chaiAt: 60, chaiDone: false, rangoliBoost: 0, fadeGhosts: 1, flowerPopped: false,
  stampShown: 0, subTyped: 0,
};
const pel = []; // 0 none, 1 diya on the board, 2 eaten (G.lit counts eaten diyas)
const diyaList = []; // every diya tile with a random flicker group
const flick = { frame: new Uint8Array(8), next: new Float32Array(8) };
let coins = [], items = [], hero, ghosts = [], gIdx = 0;

function newPellets() {
  pel.length = 0; diyaList.length = 0;
  for (let r = 0; r < H; r++) { pel.push(new Uint8Array(W)); for (let c = 0; c < W; c++) if (GRID[r][c] === '.') { pel[r][c] = 1; diyaList.push({ c, r, grp: (Math.random() * 8) | 0 }); } }
  coins = []; for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) if (GRID[r][c] === 'o') coins.push({ c, r, on: true });
}
function makeHero() {
  return { x: startTile[0] + 0.5, y: startTile[1] + 0.5, px: 0, py: 0, dir: 1, want: -1, wantT: 0, moving: false, phase: 0, mouth: 0, death: 0, spin: 0 };
}
function makeGhost(def, i) {
  return {
    def, key: def.key, color: def.color, label: def.short, idx: i, isClone: false, variant: '',
    state: 'house', fright: false, col: 10, row: 8, t: 0, dir: 1, x: 9.5 + i * 0, y: 10.5, px: 0, py: 0,
    scale: 1, targetScale: 1, wave: 0, eyeDir: 1, releaseAt: TM.release[i], bob: Math.random() * 6,
    // gimmick state
    growN: 0, split: false, splitDone: false, mergeT: 0, popT: rand(...(def.popEvery || [8, 9])), shimmer: 0, sc: 0, sr: 0,
    sprintT: def.sprintEverySec || 0, warnT: 0, sprintOn: 0, sayT: 0, patrol: 0, patrolT: 0,
  };
}
function resetPositions() {
  hero = makeHero(); hero.px = hero.x; hero.py = hero.y;
  ghosts.length = 0;
  const hx = [10.5, 9.5, 10.5, 11.5];
  C.ghosts.forEach((def, i) => {
    const g = makeGhost(def, i); ghosts.push(g);
    if (i === 0) { g.state = 'active'; g.col = EXIT[0]; g.row = EXIT[1]; g.t = 0; g.dir = 1; g.releaseAt = 0; }
    else { g.x = hx[i]; g.y = 10.5; }
    ghostXY(g); g.px = g.x; g.py = g.y;
  });
  G.lifeT = 0; G.powerT = 0; G.freezeT = 0; G.chain = 0; G.modeIdx = 0; G.modeT = 0; G.fadeGhosts = 1; G.flowerPopped = false;
  items = items.filter((it) => it.kind === 'kaju' && false); // bonuses vanish on reset
  pCount = 0; floats.length = 0;
}
function newGame() {
  G.score = 0; G.lives = C.lives; G.deaths = 0; G.lit = 0; G.eaten = 0; G.playT = 0; G.simT = 0;
  G.kajuDone = [false, false]; G.chaiAt = rand(...TM.chaiWindow); G.chaiDone = false; G.rangoliBoost = 0; G.bannerT = rand(...TM.banterEvery);
  newPellets(); if (L.maze) buildPellets(); items = []; resetPositions();
  hideStamp(); $('cv').classList.remove('grey'); updateHUD(true); renderLives();
}

/* ---------- ghosts: position + AI ---------- */
function ghostXY(g) {
  if (g.state === 'active' || g.state === 'eyes') {
    g.x = g.col + 0.5 + DX[g.dir] * g.t; g.y = g.row + 0.5 + DY[g.dir] * g.t;
    if (g.x < 0) g.x += W; else if (g.x >= W) g.x -= W;
  }
}
const ghostCan = (g, c, r) => { const t = tileAt(c, r); if (t === '#') return false; if (t === '-' || t === 'G') return g.state === 'eyes'; return true; };
const heroTile = () => [Math.floor(hero.x), Math.floor(hero.y)];

function targetFor(g) {
  const [hx, hy] = heroTile(), mode = TM.modes[G.modeIdx][0];
  if (g.sprintOn > 0) return [hx, hy];
  if (mode === 'scatter' && g.key !== 'pop') return g.def.scatter;
  switch (g.key) {
    case 'bigger': return [hx, hy];
    case 'options': return g.variant === 'A' ? [hx, hy] : [hx + DX[hero.dir] * 4, hy + DY[hero.dir] * 4];
    case 'change': {
      if (hy >= 11 && Math.abs(hx - g.col) + Math.abs(hy - g.row) < 12) return [hx, hy];
      const pts = [[1, 20], [9, 18], [19, 20], [10, 14], [3, 16], [17, 16]];
      if (g.patrolT <= 0 || (Math.abs(pts[g.patrol][0] - g.col) + Math.abs(pts[g.patrol][1] - g.row)) < 2) { g.patrol = (g.patrol + 1) % pts.length; g.patrolT = 5; }
      return pts[g.patrol];
    }
    default: return [hx, hy];
  }
}
const chooseOpts = [0, 0, 0, 0];
function chooseDir(g) {
  let n = 0;
  for (let d = 0; d < 4; d++) { if (d === opp(g.dir)) continue; if (ghostCan(g, (g.col + DX[d] + W) % W, g.row + DY[d])) chooseOpts[n++] = d; }
  if (n === 0) { const d = opp(g.dir); return ghostCan(g, (g.col + DX[d] + W) % W, g.row + DY[d]) ? d : g.dir; }
  if (g.state === 'eyes') {
    let best = chooseOpts[0], bd = 1e9;
    for (let d = 0; d < 4; d++) { const nc = (g.col + DX[d] + W) % W, nr = g.row + DY[d]; if (nr < 0 || nr >= H || !ghostCan(g, nc, nr)) continue; const v = eyeDist[nr][nc]; if (v >= 0 && v < bd) { bd = v; best = d; } }
    return best;
  }
  if (g.fright || n === 1 || (g.key === 'pop' && Math.random() < g.def.randomProb)) return chooseOpts[(Math.random() * n) | 0];
  const [tx, ty] = targetFor(g); let best = chooseOpts[0], bd = 1e9;
  for (let i = 0; i < n; i++) { const d = chooseOpts[i], nx = g.col + DX[d] - tx, ny = g.row + DY[d] - ty, v = nx * nx + ny * ny; if (v < bd - 1e-9) { bd = v; best = d; } }
  return best;
}
function reverseGhost(g) {
  if (g.state !== 'active' && g.state !== 'eyes') return;
  g.col = (g.col + DX[g.dir] + W) % W; g.row += DY[g.dir]; g.t = 1 - g.t; g.dir = opp(g.dir); ghostXY(g);
}
function ghostSpeed(g) {
  if (g.state === 'eyes') return SP.eyes;
  const base = lerp(SP.ghostStart, SP.ghostMax, G.lit / TOTAL_DIYAS);
  let s = g.fright ? SP.frightened : base;
  if (!g.fright) { if (g.key === 'change') s *= g.sprintOn > 0 ? SP.sprint : SP.amberSlow; }
  if (g.row === 10 && (g.col < 5 || g.col > 15)) s *= SP.tunnel;
  return s;
}
function updateGhost(g, dt) {
  g.px = g.x; g.py = g.y; g.wave += dt;
  if (g.state === 'house') {
    g.bob += dt * 5; g.y = 10.5 + Math.sin(g.bob) * 0.07;
    if (G.lifeT >= g.releaseAt) { g.state = 'leaving'; }
    return;
  }
  if (g.state === 'leaving') {
    const s = SP.leave * dt;
    if (Math.abs(g.x - 10.5) > 0.02) g.x += clamp(10.5 - g.x, -s, s);
    else { g.x = 10.5; g.y -= s; }
    if (g.y <= EXIT[1] + 0.5) { g.state = 'active'; g.col = EXIT[0]; g.row = EXIT[1]; g.t = 0; g.dir = g.idx & 1 ? 3 : 1; ghostXY(g); }
    return;
  }
  let dist = ghostSpeed(g) * dt;
  while (dist > 1e-6) {
    const need = 1 - g.t;
    if (dist < need) { g.t += dist; break; }
    dist -= need; g.col = (g.col + DX[g.dir] + W) % W; g.row += DY[g.dir]; g.t = 0;
    if (g.state === 'eyes' && g.col === HOME[0] && g.row === HOME[1]) { g.state = 'leaving'; g.fright = false; g.x = 10.5; g.y = 10.5; return; }
    g.dir = chooseDir(g);
  }
  g.eyeDir = g.dir; ghostXY(g);
}

/* ---------- ghost gimmicks ---------- */
function updateGimmicks(g, dt) {
  const def = g.def;
  g.scale = lerp(g.scale, g.targetScale, Math.min(1, dt * 6));
  if (g.state === 'house' || g.state === 'leaving') return;
  const [hx, hy] = [hero.x, hero.y];
  if (g.key === 'bigger') {
    const n = Math.floor(G.playT / def.growEverySec);
    g.targetScale = Math.min(def.growMax, Math.pow(1 + def.growPct, n));
  } else if (g.key === 'options') {
    if (!g.isClone) {
      if (!g.split && !(g.splitDone && !def.splitOncePerLife) && g.state === 'active' && !g.fright && Math.hypot(hx - g.x, hy - g.y) < def.splitRadius) splitViolet(g);
      if (g.split) { g.mergeT -= dt; if (g.mergeT <= 0) mergeViolet(g); }
    }
  } else if (g.key === 'pop') {
    if (g.shimmer > 0) {
      g.shimmer -= dt;
      if (g.shimmer <= 0 && g.state === 'active') popGhost(g);
    } else if (g.state === 'active') {
      g.popT -= dt;
      if (g.popT <= 0) {
        g.popT = rand(...def.popEvery);
        if (!g.fright) { // pick a destination far from the hero
          for (let tries = 0; tries < 40; tries++) {
            const [c, r] = pick(walkTiles); if (r >= 9 && r <= 12 && c > 7 && c < 13) continue;
            if (Math.hypot(c + 0.5 - hx, r + 0.5 - hy) >= def.popMinDist) { g.sc = c; g.sr = r; g.shimmer = def.popWarnSec; break; }
          }
        }
      }
    }
  } else if (g.key === 'change') {
    g.patrolT -= dt;
    if (g.sayT > 0) g.sayT -= dt;
    if (g.warnT > 0) { g.warnT -= dt; if (g.warnT <= 0) { g.sprintOn = def.sprintSec; } }
    else if (g.sprintOn > 0) g.sprintOn -= dt;
    else if (g.state === 'active' && !g.fright) {
      g.sprintT -= dt;
      if (g.sprintT <= 0) { g.sprintT = def.sprintEverySec; g.warnT = def.warnSec; g.sayT = def.warnSec + 0.9; }
    }
    if (g.fright) { g.warnT = 0; g.sprintOn = 0; }
  }
}
function splitViolet(g) {
  const def = g.def, c = makeGhost(def, g.idx);
  Object.assign(c, { isClone: true, variant: 'B', state: g.state, fright: g.fright, col: g.col, row: g.row, t: g.t, dir: opp(g.dir), x: g.x, y: g.y, px: g.x, py: g.y, label: def.nameB, scale: 1, targetScale: def.splitScale });
  if (c.state === 'active') { c.col = (g.col + DX[g.dir] + W) % W; c.row = g.row + DY[g.dir]; c.t = 1 - g.t; ghostXY(c); c.px = c.x; c.py = c.y; }
  g.split = true; g.splitDone = true; g.variant = 'A'; g.label = def.nameA; g.targetScale = def.splitScale; g.mergeT = def.mergeSec; g.clone = c;
  ghosts.push(c); burst(g.x, g.y, g.color, 14, 3);
}
function mergeViolet(g) {
  if (g.clone) { ghosts.splice(ghosts.indexOf(g.clone), 1); burst(g.clone.x, g.clone.y, g.color, 10, 3); g.clone = null; }
  g.split = false; g.variant = ''; g.label = g.def.short; g.targetScale = 1; toast(T.merged);
}
function popGhost(g) {
  burst(g.x, g.y, g.color, 16, 5, true); Audio.popSnd();
  g.col = g.sc; g.row = g.sr; g.t = 0; g.dir = chooseDirFrom(g); ghostXY(g); g.px = g.x; g.py = g.y;
  burst(g.x, g.y, g.color, 22, 6, true); addFloat(T.pop, g.x, g.y - 0.8, g.color, 1);
}
function chooseDirFrom(g) { // any open direction at a fresh tile
  const o = []; for (let d = 0; d < 4; d++) if (ghostCan(g, (g.col + DX[d] + W) % W, g.row + DY[d])) o.push(d); return o.length ? pick(o) : 1;
}

/* ---------- particles (pooled) ---------- */
const MAXP = 300;
const PX = new Float32Array(MAXP), PY = new Float32Array(MAXP), PVX = new Float32Array(MAXP), PVY = new Float32Array(MAXP),
  PL = new Float32Array(MAXP), PM = new Float32Array(MAXP), PS = new Float32Array(MAXP), PG = new Float32Array(MAXP), PC = new Uint8Array(MAXP);
const PCOL = []; // palette strings
const palIdx = (c) => { let i = PCOL.indexOf(c); if (i < 0) { PCOL.push(c); i = PCOL.length - 1; } return i; };
let pCount = 0, pCursor = 0;
function spawnP(x, y, vx, vy, life, size, col, grav) {
  for (let k = 0; k < MAXP; k++) {
    const i = (pCursor + k) % MAXP;
    if (PL[i] <= 0) { PX[i] = x; PY[i] = y; PVX[i] = vx; PVY[i] = vy; PL[i] = PM[i] = life; PS[i] = size; PC[i] = palIdx(col); PG[i] = grav; pCursor = i + 1; return; }
  }
}
function burst(x, y, color, n, speed, rainbow) {
  const cols = [C.colors.red, C.colors.blue, C.colors.green, C.colors.orange, C.colors.gold];
  const m = REDUCED ? Math.ceil(n / 2) : n;
  for (let i = 0; i < m; i++) { const a = Math.random() * 6.283, s = speed * (0.4 + Math.random() * 0.8); spawnP(x, y, Math.cos(a) * s, Math.sin(a) * s, 0.5 + Math.random() * 0.5, 0.12 + Math.random() * 0.1, rainbow ? cols[i % 5] : color, 2); }
}
function firework(x, y) {
  const cols = [C.colors.red, C.colors.blue, C.colors.green, C.colors.orange, C.colors.gold, C.colors.gold];
  const n = REDUCED ? 16 : 34, base = cols[(Math.random() * cols.length) | 0];
  for (let i = 0; i < n; i++) { const a = (i / n) * 6.283 + Math.random() * 0.2, s = 3 + Math.random() * 3.2; spawnP(x, y, Math.cos(a) * s, Math.sin(a) * s, 1 + Math.random() * 0.7, 0.16, i % 5 === 0 ? '#ffffff' : base, 3.2); }
  Audio.crackle();
}
function updateParticles(dt) {
  for (let i = 0; i < MAXP; i++) if (PL[i] > 0) { PL[i] -= dt; PVY[i] += PG[i] * dt; PVX[i] *= 0.992; PX[i] += PVX[i] * dt; PY[i] += PVY[i] * dt; }
}
function drawParticles() {
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < MAXP; i++) if (PL[i] > 0) { const a = PL[i] / PM[i]; ctx.globalAlpha = a > 1 ? 1 : a; ctx.fillStyle = PCOL[PC[i]]; const s = PS[i] * (0.5 + a * 0.5); ctx.fillRect(PX[i] - s / 2, PY[i] - s / 2, s, s); }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
}
const floats = []; // floating text {txt,x,y,t,col,sub}
function addFloat(txt, x, y, col, life, sub) { if (floats.length > 10) floats.shift(); floats.push({ txt, x, y, t: life || 1.4, max: life || 1.4, col, sub }); }

/* =====================================================================
   HUD / TOASTS / STAMPS
   ===================================================================== */
const hud = { score: -1, lit: -1, best: -1, lives: -1, ring: -1 };
let best = parseInt(store.get(C.storage.best) || '0', 10) || 0;
function updateHUD(force) {
  if (force || hud.score !== G.score) { hud.score = G.score; $('hScore').textContent = G.score; }
  const pct = Math.floor((G.lit / TOTAL_DIYAS) * 100);
  if (force || hud.lit !== pct) { hud.lit = pct; $('hLit').textContent = pct + '%'; }
  const b = Math.max(best, G.score);
  if (force || hud.best !== b) { hud.best = b; $('hBest').textContent = b; }
}
function renderLives() {
  const el = $('lives'); if (hud.lives === G.lives && el.childElementCount) return; hud.lives = G.lives;
  el.innerHTML = ''; for (let i = 0; i < C.lives; i++) { const s = document.createElement('span'); s.innerHTML = logoSVG(22); s.style.opacity = i < G.lives ? '1' : '0.15'; el.appendChild(s); }
}
function updateRing() {
  const f = G.powerT > 0 ? G.powerT / TM.powerSec : 0, v = Math.round(f * 88);
  if (v !== hud.ring) { hud.ring = v; $('ringFg').style.strokeDashoffset = String(88 - v); }
}
let toastT = 0, lastToast = '';
function toast(txt) { const el = $('toast'); el.textContent = txt; el.classList.add('on'); toastT = TM.toastSec; Audio.toast(); }
function hideToast() { $('toast').classList.remove('on'); toastT = 0; }
function showStamp(txt, cls, sub) {
  const s = $('stamp'); s.className = 'on ' + cls; $('stampMain').textContent = txt; $('stampSub').textContent = sub || '';
  const m = $('stampMain'); m.style.animation = 'none'; void m.offsetWidth; m.style.animation = '';
  Audio.stamp(); vib(40);
  if (!REDUCED) { const st = $('stage'); st.classList.remove('shake'); void st.offsetWidth; st.classList.add('shake'); }
}
function hideStamp() { $('stamp').className = ''; $('stampMain').textContent = ''; $('stampSub').textContent = ''; }

/* =====================================================================
   INPUT
   ===================================================================== */
function setWant(d) { if (!hero) return; hero.want = d; hero.wantT = G.simT; }
const keyDir = {}; for (const [n, i] of [['up', 0], ['left', 1], ['down', 2], ['right', 3]]) for (const k of C.keys[n]) keyDir[k] = i;
addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const d = keyDir[e.key];
  if (d !== undefined && $('game').classList.contains('active')) { e.preventDefault(); if (!G.paused) setWant(d); return; }
  if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') { if ($('game').classList.contains('active')) { e.preventDefault(); togglePause(); } }
  else if (e.key === 'm' || e.key === 'M') toggleMute();
});
// swipe: fire the moment the threshold is crossed
{
  const area = $('game'); let ox = 0, oy = 0, on = false;
  area.addEventListener('touchstart', (e) => { if (e.target.closest('button,.overlay')) return; const t = e.touches[0]; ox = t.clientX; oy = t.clientY; on = true; }, { passive: true });
  area.addEventListener('touchmove', (e) => {
    if (!on) return; e.preventDefault(); const t = e.touches[0], dx = t.clientX - ox, dy = t.clientY - oy;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < C.input.swipePx) return;
    if (!G.paused) setWant(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 3 : 1) : (dy > 0 ? 2 : 0));
    ox = t.clientX; oy = t.clientY;
  }, { passive: false });
  area.addEventListener('touchend', () => { on = false; }, { passive: true });
  area.addEventListener('touchcancel', () => { on = false; }, { passive: true });
  document.addEventListener('touchmove', (e) => { if (area.classList.contains('active')) e.preventDefault(); }, { passive: false });
  document.addEventListener('dblclick', (e) => e.preventDefault());
  document.querySelectorAll('.dp').forEach((b) => {
    const go = (e) => { e.preventDefault(); if (!G.paused) setWant(+b.dataset.dir); vib(0); };
    b.addEventListener('pointerdown', go);
  });
}

/* =====================================================================
   SIMULATION
   ===================================================================== */
const STEP = 1 / 60;

function heroStep(dt) {
  const h = hero; h.px = h.x; h.py = h.y;
  if (h.want >= 0 && G.simT - h.wantT > C.input.bufferSec) h.want = -1;
  if (h.want >= 0 && h.want !== h.dir) {
    if (h.want === opp(h.dir)) { h.dir = h.want; h.want = -1; }
    else {
      const col = Math.floor(h.x), row = Math.floor(h.y), horiz = h.dir === 1 || h.dir === 3;
      const off = horiz ? h.x - (col + 0.5) : h.y - (row + 0.5);
      if (Math.abs(off) <= C.input.cornerAssist && heroCan(col + DX[h.want], row + DY[h.want])) { h.dir = h.want; h.want = -1; }
    }
  }
  const dist = (G.powerT > 0 ? SP.heroPower : SP.hero) * (inTunnel(h.x, h.y) ? SP.tunnel : 1) * dt;
  const dx = DX[h.dir], dy = DY[h.dir], col = Math.floor(h.x), row = Math.floor(h.y);
  if (dx !== 0) { const cy = row + 0.5; h.y += clamp(cy - h.y, -dist, dist); } else { const cx = col + 0.5; h.x += clamp(cx - h.x, -dist, dist); }
  const pos = dx !== 0 ? h.x : h.y, sign = dx + dy, centre = Math.floor(pos) + 0.5;
  const blocked = !heroCan(col + dx, row + dy);
  let np = pos + sign * dist;
  if (blocked && (sign > 0 ? np > centre : np < centre)) np = centre;
  const moved = Math.abs(np - pos) > 1e-7;
  if (dx !== 0) h.x = np; else h.y = np;
  if (h.x < 0) h.x += W; else if (h.x >= W) h.x -= W;
  h.moving = moved;
  if (moved) { h.phase += dt * C.hero.mouthHz * 6.2832; h.mouth = 0.5 - 0.5 * Math.cos(h.phase); } else h.mouth *= 0.85;
  h.spin = G.powerT > 0 ? h.spin + dt * 6.2832 / C.hero.spinSec : 0;
}

function eatThings() {
  const c = Math.floor(hero.x), r = Math.floor(hero.y);
  if (Math.abs(hero.x - c - 0.5) + Math.abs(hero.y - r - 0.5) < 0.5) {
    if (pel[r][c] === 1) {
      pel[r][c] = 2; clearPellet(c, r); G.lit++; G.score += C.scores.pellet; Audio.pellet();
      checkBonusSpawns(); if (G.lit >= TOTAL_DIYAS) startWin();
    }
  }
  for (const k of coins) if (k.on && Math.abs(hero.x - k.c - 0.5) < 0.6 && Math.abs(hero.y - k.r - 0.5) < 0.6) {
    k.on = false; G.score += C.scores.coin; startPower();
  }
  for (let i = items.length - 1; i >= 0; i--) {
    const it = items[i];
    if (Math.abs(hero.x - it.c - 0.5) < 0.65 && Math.abs(hero.y - it.r - 0.5) < 0.65) {
      items.splice(i, 1);
      if (it.kind === 'kaju') { G.score += C.scores.kaju; toast(T.kaju); Audio.kaju(); addFloat('+' + C.scores.kaju, it.c + 0.5, it.r, C.colors.gold, 1.2); }
      else { G.score += C.scores.chai; G.freezeT = TM.chaiFreezeSec; toast(T.chai); Audio.chai(); addFloat('+' + C.scores.chai, it.c + 0.5, it.r, '#ffffff', 1.2); }
    }
  }
}
function startPower() {
  G.powerT = TM.powerSec; G.chain = 0; Audio.power(); vib(30); toast(T.power);
  for (const g of ghosts) if (g.state !== 'eyes' && !g.fright) { g.fright = true; reverseGhost(g); }
}
function checkBonusSpawns() {
  const f = G.lit / TOTAL_DIYAS;
  for (let i = 0; i < 2; i++) if (!G.kajuDone[i] && f >= TM.kajuAtLit[i]) { G.kajuDone[i] = true; items.push({ kind: 'kaju', c: 10, r: 12, t: TM.kajuSec }); }
}
function spawnChai() {
  const [hx, hy] = heroTile(); let tile = null;
  for (let k = 0; k < 40 && !tile; k++) { const t = pick(chaiTiles); if (Math.abs(t[0] - hx) + Math.abs(t[1] - hy) >= 4) tile = t; }
  if (!tile) tile = pick(chaiTiles);
  items.push({ kind: 'chai', c: tile[0], r: tile[1], t: TM.chaiSec });
}

function ghostHitsHero() {
  for (const g of ghosts) {
    if (g.state !== 'active') continue;
    let dx = Math.abs(g.x - hero.x); if (dx > W / 2) dx = W - dx;
    if (Math.hypot(dx, g.y - hero.y) >= C.collisionRadius) continue;
    if (G.freezeT > 0) continue;
    if (g.fright) {
      g.state = 'eyes'; g.fright = false; const pts = C.scores.ghostChain[Math.min(G.chain, 3)]; G.chain++; G.score += pts; G.eaten++;
      addFloat(T.eaten, g.x, g.y - 0.3, g.color, 1.8, '+' + pts); Audio.eat(); vib(40); burst(g.x, g.y, g.color, 12, 4);
    } else { startDeath(); return; }
  }
}

function updatePlaying(dt) {
  G.playT += dt; G.lifeT += dt;
  // mode schedule (paused while power mode is active)
  if (G.powerT <= 0) {
    G.modeT += dt; const lim = TM.modes[G.modeIdx][1];
    if (G.modeT >= lim && G.modeIdx < TM.modes.length - 1) { G.modeIdx++; G.modeT = 0; for (const g of ghosts) if (!g.fright) reverseGhost(g); }
  }
  if (G.powerT > 0) { G.powerT -= dt; if (G.powerT <= 0) { G.powerT = 0; for (const g of ghosts) g.fright = false; } }
  if (G.freezeT > 0) G.freezeT -= dt;
  // item timers
  for (let i = items.length - 1; i >= 0; i--) { items[i].t -= dt; if (items[i].t <= 0) items.splice(i, 1); }
  if (!G.chaiDone && G.playT >= G.chaiAt) { G.chaiDone = true; spawnChai(); }
  // banter
  G.bannerT -= dt;
  if (G.bannerT <= 0) { G.bannerT = rand(...TM.banterEvery); if (toastT <= 0) { let s; do { s = pick(T.toasts); } while (s === lastToast && T.toasts.length > 1); lastToast = s; toast(s); } }
  heroStep(dt); eatThings();
  const frozen = G.freezeT > 0;
  for (let i = 0; i < ghosts.length; i++) {
    const g = ghosts[i];
    if (!frozen || g.state === 'eyes') updateGhost(g, dt); else { g.px = g.x; g.py = g.y; }
    if (!frozen) updateGimmicks(g, dt); else g.scale = lerp(g.scale, g.targetScale, Math.min(1, dt * 6));
  }
  if (G.state === 'playing') ghostHitsHero();
}

/* ---------- sequences ---------- */
function startDeath() {
  G.state = 'dying'; G.seqT = 0; G.lives--; G.deaths++; G.powerT = 0; hero.death = 0; G.stampShown = 0;
  hideToast(); updateHUD(); renderLives(); updateRing(); vib(120);
}
function updateDying(dt) {
  G.seqT += dt; const f = TM.deathFreeze, a = TM.deathAnim;
  if (G.seqT >= f && hero.death === 0) { hero.death = 0.0001; Audio.death(); }
  if (hero.death > 0) hero.death = clamp((G.seqT - f) / a, 0.0001, 1);
  if (hero.death >= 0.28 && !G.flowerPopped) { G.flowerPopped = true; for (let i = 0; i < 26; i++) { const an = Math.random() * 6.283, s = 1 + Math.random() * 4; spawnP(hero.x, hero.y, Math.cos(an) * s, Math.sin(an) * s - 1, 0.7 + Math.random() * 0.5, 0.14, i % 2 ? '#ffffff' : C.colors.gold, 3); } }
  if (!G.stampShown && G.seqT >= f + a) { G.stampShown = 1; const rev = C.firstRevision + G.deaths - 1; showStamp(T.death.replace('{n}', rev), 'red', T.deathSub.replace('{n}', rev)); }
  if (G.stampShown === 1 && G.seqT >= f + a + TM.deathStamp) {
    hideStamp();
    if (G.lives > 0) { resetPositions(); beginReady(); } else startOver();
  }
}
function startOver() { G.state = 'losing'; G.seqT = 0; G.stampShown = 0; $('cv').classList.add('grey'); }
function updateLosing(dt) {
  G.seqT += dt;
  if (!G.stampShown && G.seqT >= 0.9) { G.stampShown = 1; showStamp(T.over.stamp, 'grey', T.over.sub); }
  if (G.seqT >= TM.overHold) { hideStamp(); showEnd(false); }
}
function startWin() {
  G.state = 'winning'; G.seqT = 0; G.stampShown = 0; G.subTyped = 0; G.powerT = 0; G.freezeT = 0; hideToast(); G.fireworksLeft = REDUCED ? 6 : 10; G.nextFw = 0.9;
  for (const g of ghosts) g.fright = false;
}
function updateWinning(dt) {
  G.seqT += dt; G.fadeGhosts = clamp(1 - G.seqT / TM.winFade, 0, 1); G.rangoliBoost = clamp(G.seqT / 1.6, 0, 1);
  if (G.fireworksLeft > 0 && G.seqT >= G.nextFw) { G.fireworksLeft--; G.nextFw += TM.winFireworks / (REDUCED ? 6 : 10); firework(rand(3, W - 3), rand(3, 13)); }
  const ts = 0.9 + TM.winFireworks + 0.2;
  if (!G.stampShown && G.seqT >= ts) { G.stampShown = 1; showStamp(T.win.stamp, 'green', ''); }
  if (G.stampShown === 1) {
    const typed = Math.floor((G.seqT - ts - 0.5) * 28);
    if (typed > G.subTyped && typed <= T.win.sub.length) { G.subTyped = typed; $('stampSub').textContent = [...T.win.sub].slice(0, typed).join(''); }
    if (G.seqT >= ts + 0.5 + T.win.sub.length / 28 + 1.6) { hideStamp(); showEnd(true); }
  }
}

function beginReady() {
  G.state = 'ready'; G.readyT = TM.readySec; hero.want = -1; $('ready').textContent = T.ready; $('ready').classList.add('on');
}
function update(dt) {
  G.simT += dt;
  updateParticles(dt);
  for (let i = floats.length - 1; i >= 0; i--) { floats[i].t -= dt; floats[i].y -= dt * 0.35; if (floats[i].t <= 0) floats.splice(i, 1); }
  switch (G.state) {
    case 'ready': G.readyT -= dt; hero.px = hero.x; hero.py = hero.y; hero.mouth *= 0.9; if (G.readyT <= 0) { G.state = 'playing'; $('ready').classList.remove('on'); } break;
    case 'playing': updatePlaying(dt); break;
    case 'dying': updateDying(dt); break;
    case 'winning': updateWinning(dt); break;
    case 'losing': updateLosing(dt); break;
    default: break;
  }
  updateHUD(); updateRing();
}

/* =====================================================================
   RENDERING
   ===================================================================== */
const pillCache = new Map();
function pill(txt, x, y, color, alpha) { // text pill centred at x, bottom at y (world units)
  const css = S / dpr, fs = Math.max(0.36, 7.5 / css), key = txt + '|' + fs;
  ctx.font = `${fs}px "Press Start 2P", ui-monospace, monospace`;
  let w = pillCache.get(key); if (w === undefined) { w = ctx.measureText(txt).width; pillCache.set(key, w); }
  const pw = w + fs * 1.1, ph = fs * 1.9; let px = x - pw / 2; px = clamp(px, 0.05, W - pw - 0.05); const py = Math.max(0.05, y - ph);
  ctx.globalAlpha = alpha === undefined ? 1 : alpha;
  ctx.fillStyle = '#070b1aE6'; rrect(ctx, px, py, pw, ph, ph / 2); ctx.fill();
  ctx.lineWidth = fs * 0.14; ctx.strokeStyle = color; ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText(txt, px + fs * 0.55, py + ph / 2 + fs * 0.06);
  ctx.globalAlpha = 1;
}
const ip = (p, c, a) => (Math.abs(c - p) > W / 2 ? c : p + (c - p) * a);

function wrapDraw(x, fn, a, b, c) { fn(x, a, b, c); if (x < 1.4) fn(x + W, a, b, c); else if (x > W - 1.4) fn(x - W, a, b, c); }

function drawHeroAt(x, y, a) {
  const h = hero, size = HS, hs = size / 2;
  ctx.save(); ctx.translate(x, y);
  if (G.powerT > 0) { ctx.globalCompositeOperation = 'lighter'; const gs = 3.6 + Math.sin(G.simT * 8) * 0.25; ctx.drawImage(L.heroGlow, -gs / 2, -gs / 2, gs, gs); ctx.globalCompositeOperation = 'source-over'; }
  let sc = 1; if (!h.moving && G.state !== 'dying') sc = 1.02 + 0.02 * Math.sin(G.simT * 3.2);
  ctx.scale(sc, sc);
  const open = h.mouth * C.hero.mouthMaxDeg * Math.PI / 180;
  const layers = () => { ctx.drawImage(L.heroSq, -hs, -hs, size, size); ctx.save(); ctx.rotate(h.spin); ctx.drawImage(L.heroFl, -hs * 1.5, -hs * 1.5, size * 1.5, size * 1.5); ctx.restore(); };
  if (open < 0.012) layers();
  else {
    const horiz = h.dir === 1 || h.dir === 3, R = 1.6;
    for (let side = 0; side < 2; side++) {
      ctx.save();
      if (horiz) {
        const px = h.dir === 3 ? -hs : hs, sg = (h.dir === 3 ? -1 : 1) * (side === 0 ? 1 : -1); // side 0 = top half
        ctx.translate(px, 0); ctx.rotate(sg * open / 2); ctx.translate(-px, 0);
        ctx.beginPath(); ctx.rect(-R, side === 0 ? -R : 0, 2 * R, R); ctx.clip();
      } else {
        const py = h.dir === 0 ? hs : -hs, sg = (h.dir === 0 ? -1 : 1) * (side === 0 ? 1 : -1); // side 0 = left half
        ctx.translate(0, py); ctx.rotate(sg * open / 2); ctx.translate(0, -py);
        ctx.beginPath(); ctx.rect(side === 0 ? -R : 0, -R, R, 2 * R); ctx.clip();
      }
      layers(); ctx.restore();
    }
  }
  ctx.restore();
}
function drawHeroDeath(x, y) {
  const p = hero.death, L0 = HS;
  ctx.save(); ctx.translate(x, y);
  const fade = p < 0.5 ? 1 : 1 - (p - 0.5) * 2;
  ctx.globalAlpha = clamp(fade, 0, 1);
  for (let i = 0; i < 4; i++) {
    const q = squareRect(L0, i), dx = i & 1 ? 1 : -1, dy = i & 2 ? 1 : -1, d = p * 1.5;
    ctx.save(); ctx.translate(dx * d, dy * d); ctx.translate(q.x + q.s / 2, q.y + q.s / 2); ctx.rotate(p * (i % 2 ? 3 : -3));
    ctx.fillStyle = SQ_COL[i]; rrect(ctx, -q.s / 2, -q.s / 2, q.s, q.s, q.s * 0.18); ctx.fill(); ctx.restore();
  }
  if (p < 0.28) { ctx.globalAlpha = clamp(fade, 0, 1) * (1 - p / 0.28); ctx.scale(1 + p * 1.6, 1 + p * 1.6); drawFlower(ctx, L0, p * 4); }
  ctx.restore(); ctx.globalAlpha = 1;
}

function drawGhostAt(x, y, g, a) {
  const sc = g.scale * (g.key === 'change' && g.warnT > 0 ? 1 : 1), w = 1.1 * sc, h = 1.05 * sc;
  const eyesOnly = g.state === 'eyes', fr = g.fright && !eyesOnly;
  let flash = false; if (fr && G.powerT < TM.frightFlashSec) flash = Math.floor(G.simT * 6) % 2 === 0;
  ctx.save(); ctx.translate(x, y);
  if (g.warnT > 0) ctx.translate(Math.sin(G.simT * 90) * 0.06, 0);
  if (g.state === 'house' || g.state === 'leaving') ctx.globalAlpha = 1;
  if (G.fadeGhosts < 1) ctx.globalAlpha = G.fadeGhosts;
  const left = -w / 2, right = w / 2, top = -h / 2, bot = h / 2;
  if (!eyesOnly) {
    const body = fr ? (flash ? C.colors.frightFlash : C.colors.fright) : g.color;
    ctx.fillStyle = body; ctx.beginPath();
    const r = w * 0.4; ctx.moveTo(left, bot - 0.05); ctx.lineTo(left, top + r); ctx.arcTo(left, top, left + r, top, r); ctx.lineTo(right - r, top); ctx.arcTo(right, top, right, top + r, r); ctx.lineTo(right, bot - 0.05);
    const n = 4, ph = Math.floor(G.simT * 7) & 1;
    for (let i = 0; i < n; i++) { const x1 = right - (i + 1) * (w / n), cxp = x1 + w / n / 2, up = (i + ph) & 1 ? 0.14 : -0.04; ctx.quadraticCurveTo(cxp, bot + 0.08 - up * 2, x1, bot - 0.05); }
    ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(left + w * 0.12, bot - h * 0.3); ctx.lineTo(left - w * 0.12, bot + h * 0.1); ctx.lineTo(left + w * 0.38, bot - h * 0.1); ctx.closePath(); ctx.fill();
  }
  const ex = w * 0.2, ey = -h * 0.08, dxe = DX[g.eyeDir] * w * 0.07, dye = DY[g.eyeDir] * w * 0.07;
  if (fr) {
    const c = flash ? '#d11' : '#fff'; ctx.fillStyle = c; ctx.beginPath(); ctx.arc(-ex, ey, w * 0.07, 0, 6.3); ctx.arc(ex, ey, w * 0.07, 0, 6.3); ctx.fill();
    ctx.strokeStyle = c; ctx.lineWidth = w * 0.06; ctx.beginPath(); const my = h * 0.2, wob = Math.sin(G.simT * 20) * 0.02;
    ctx.moveTo(-w * 0.3, my); for (let i = 0; i < 6; i++) ctx.lineTo(-w * 0.3 + (i + 1) * w * 0.1, my + (i & 1 ? 0.07 : -0.05) + wob); ctx.stroke();
  } else {
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(-ex, ey, w * 0.17, h * 0.22, 0, 0, 6.3); ctx.ellipse(ex, ey, w * 0.17, h * 0.22, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#0a1030'; ctx.beginPath(); ctx.arc(-ex + dxe, ey + dye, w * 0.09, 0, 6.3); ctx.arc(ex + dxe, ey + dye, w * 0.09, 0, 6.3); ctx.fill();
  }
  // chai steam
  if (G.freezeT > 0 && !eyesOnly) {
    ctx.strokeStyle = '#ffffffcc'; ctx.lineWidth = 0.06; ctx.lineCap = 'round';
    for (let i = -1; i <= 1; i++) { ctx.beginPath(); const bx = i * 0.22, ph2 = G.simT * 4 + i; ctx.moveTo(bx, top - 0.05); ctx.bezierCurveTo(bx + Math.sin(ph2) * 0.12, top - 0.25, bx - Math.sin(ph2) * 0.12, top - 0.4, bx + Math.sin(ph2 + 1) * 0.08, top - 0.6 - ((G.simT * 0.8 + i) % 1) * 0.1); ctx.stroke(); }
  }
  ctx.restore();
  if (!eyesOnly) pill(fr ? T.frightLabel : g.label, x, y - h / 2 - 0.12, fr ? '#6c7bff' : g.color, G.fadeGhosts);
  if (g.key === 'change' && g.sayT > 0 && !fr) pill(g.def.sprintText, x, y - h / 2 - 0.6, g.color, 1);
}
function drawShimmer(g) {
  if (g.key !== 'pop' || g.shimmer <= 0) return;
  const t = 1 - g.shimmer / g.def.popWarnSec, x = g.sc + 0.5, y = g.sr + 0.5;
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = g.color; ctx.lineWidth = 0.08; ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 30);
  ctx.beginPath(); ctx.arc(x, y, 0.7 - t * 0.35, 0, 6.3); ctx.stroke();
  for (let i = 0; i < 6; i++) { const a = G.simT * 8 + i * 1.047, rr = 0.55 - t * 0.2; ctx.fillStyle = i % 2 ? '#fff' : g.color; ctx.fillRect(x + Math.cos(a) * rr - 0.04, y + Math.sin(a) * rr - 0.04, 0.08, 0.08); }
  ctx.restore();
}

function drawCoin(k) {
  const x = k.c + 0.5, y = k.r + 0.5, w = Math.abs(Math.cos(G.simT * 3 + k.c)) * 0.34 + 0.06;
  ctx.save(); ctx.translate(x, y);
  ctx.globalCompositeOperation = 'lighter'; const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, 0.9); gr.addColorStop(0, 'rgba(255,200,60,0.55)'); gr.addColorStop(1, 'rgba(255,200,60,0)'); ctx.fillStyle = gr; ctx.fillRect(-0.9, -0.9, 1.8, 1.8);
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#e0a000'; ctx.beginPath(); ctx.ellipse(0, 0, w + 0.05, 0.4, 0, 0, 6.3); ctx.fill();
  ctx.fillStyle = C.colors.gold; ctx.beginPath(); ctx.ellipse(0, 0, w, 0.36, 0, 0, 6.3); ctx.fill();
  if (w > 0.2) { ctx.fillStyle = '#7a4a00'; ctx.font = `bold 0.46px Inter, system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.save(); ctx.scale(w / 0.4, 1); ctx.fillText('₹', 0, 0.02); ctx.restore(); }
  ctx.restore();
  if (hero && Math.hypot(hero.x - x, hero.y - y) < 4.5) pill(T.coinLabel, x, y - 0.55, C.colors.gold, smooth(4.5, 2.5, Math.hypot(hero.x - x, hero.y - y)));
}
function drawItem(it) {
  const x = it.c + 0.5, y = it.r + 0.5 + Math.sin(G.simT * 3) * 0.07, blink = it.t < 2 && Math.floor(G.simT * 8) % 2 === 0;
  if (blink) return;
  ctx.save(); ctx.translate(x, y);
  ctx.globalCompositeOperation = 'lighter'; const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, 0.8); gr.addColorStop(0, 'rgba(255,230,160,0.4)'); gr.addColorStop(1, 'rgba(255,230,160,0)'); ctx.fillStyle = gr; ctx.fillRect(-0.8, -0.8, 1.6, 1.6); ctx.globalCompositeOperation = 'source-over';
  if (it.kind === 'kaju') {
    ctx.fillStyle = '#b3262e'; rrect(ctx, -0.42, 0.02, 0.84, 0.36, 0.06); ctx.fill();
    ctx.fillStyle = '#e5c07a'; ctx.strokeStyle = '#e8e8f0'; ctx.lineWidth = 0.04;
    for (const dx of [-0.2, 0.2]) { ctx.beginPath(); ctx.moveTo(dx, -0.36); ctx.lineTo(dx + 0.24, -0.1); ctx.lineTo(dx, 0.16); ctx.lineTo(dx - 0.24, -0.1); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  } else {
    ctx.fillStyle = '#f2ece0'; ctx.beginPath(); ctx.moveTo(-0.28, -0.14); ctx.lineTo(0.28, -0.14); ctx.lineTo(0.22, 0.2); ctx.quadraticCurveTo(0, 0.34, -0.22, 0.2); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#f2ece0'; ctx.lineWidth = 0.06; ctx.beginPath(); ctx.arc(0.3, 0.0, 0.1, -1.4, 1.4); ctx.stroke();
    ctx.fillStyle = '#7a4a20'; ctx.fillRect(-0.22, -0.12, 0.44, 0.07);
    ctx.fillStyle = '#d9d2c4'; ctx.fillRect(-0.4, 0.3, 0.8, 0.06);
    ctx.strokeStyle = '#ffffffaa'; ctx.lineWidth = 0.05; for (let i = -1; i <= 1; i += 2) { ctx.beginPath(); const ph = G.simT * 3 + i; ctx.moveTo(i * 0.1, -0.2); ctx.bezierCurveTo(i * 0.1 + Math.sin(ph) * 0.1, -0.35, i * 0.1 - Math.sin(ph) * 0.1, -0.45, i * 0.1, -0.58); ctx.stroke(); }
  }
  ctx.restore();
}

function render(alpha, rdt) {
  if (!L.maze) return;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
  ctx.setTransform(S, 0, 0, S, 0, 0); ctx.imageSmoothingEnabled = true;
  ctx.drawImage(L.bg, 0, 0, W, H);
  // slow drifting firework glows
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 4; i++) { const t = performance.now() / 1000 * 0.05 + i * 1.7, gx = W / 2 + Math.sin(t * 1.3 + i) * 8, gy = H / 2 + Math.cos(t + i * 2) * 8; ctx.globalAlpha = 0.5 + 0.2 * Math.sin(t * 3); ctx.drawImage(L.glows[i], gx - 4, gy - 4, 8, 8); }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  // rangoli reveals with progress
  const frac = G.lit / TOTAL_DIYAS, ra = lerp(frac * 0.3, 1, G.rangoliBoost);
  if (ra > 0.003) { ctx.globalAlpha = ra; ctx.drawImage(L.rangoli, 0, 0, W, H); ctx.globalAlpha = 1; }
  ctx.drawImage(L.maze, 0, 0, W, H);
  ctx.drawImage(L.pellets, 0, 0, W, H);
  const now = G.simT; // flicker updated in batches by group
  for (let g = 0; g < 8; g++) if (now >= flick.next[g]) { flick.frame[g] = (flick.frame[g] + 1 + ((Math.random() * 2) | 0)) & 3; flick.next[g] = now + 0.07 + Math.random() * 0.09; }
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < diyaList.length; i++) { const d = diyaList[i]; if (pel[d.r][d.c] === 1) ctx.drawImage(L.flames[flick.frame[d.grp]], d.c - 0.5, d.r - 0.5, 2, 2); }
  ctx.globalCompositeOperation = 'source-over';
  for (const k of coins) if (k.on) drawCoin(k);
  for (const it of items) drawItem(it);
  if (!hero) return;
  // ghosts
  for (const g of ghosts) {
    drawShimmer(g);
    if (g.state === 'house' || g.state === 'leaving' || true) {
      const x = ip(g.px, g.x, alpha), y = g.py + (g.y - g.py) * alpha;
      wrapDraw(x, drawGhostAt, y, g, alpha);
    }
  }
  // hero
  const hx = ip(hero.px, hero.x, alpha), hy = hero.py + (hero.y - hero.py) * alpha;
  if (G.state !== 'losing' || true) {
    if (hero.death > 0) wrapDraw(hx, drawHeroDeath, hy); else if (!(G.state === 'dying' && hero.death >= 1)) wrapDraw(hx, drawHeroAt, hy, alpha);
  }
  drawParticles();
  // floating texts
  for (const f of floats) {
    const css = S / dpr, fs = Math.max(0.4, 8 / css); ctx.globalAlpha = clamp(f.t / 0.5, 0, 1); ctx.font = `${fs}px "Press Start 2P", ui-monospace, monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const x = clamp(f.x, 3.5, W - 3.5); ctx.lineWidth = fs * 0.3; ctx.strokeStyle = '#070b1a'; ctx.fillStyle = f.col; ctx.strokeText(f.txt, x, f.y); ctx.fillText(f.txt, x, f.y);
    if (f.sub) { ctx.strokeText(f.sub, x, f.y + fs * 1.6); ctx.fillStyle = '#fff'; ctx.fillText(f.sub, x, f.y + fs * 1.6); }
  }
  ctx.globalAlpha = 1;
  if (toastT > 0) { toastT -= rdt; if (toastT <= 0) hideToast(); }
}

/* =====================================================================
   MAIN LOOP
   ===================================================================== */
let last = performance.now(), acc = 0;
function frame(now) {
  requestAnimationFrame(frame);
  let dt = (now - last) / 1000; last = now; if (dt > 0.25) dt = 0.25; if (dt < 0) dt = 0;
  if (!$('game').classList.contains('active')) { acc = 0; return; }
  if (G.paused || G.state === 'idle') { render(1, 0); return; }
  acc += dt; let n = 0;
  while (acc >= STEP && n < 5) { update(STEP); acc -= STEP; n++; }
  if (n === 5) acc = 0;
  render(acc / STEP, dt);
}

/* =====================================================================
   SCREENS + FLOW
   ===================================================================== */
function showScreen(id) {
  for (const s of document.querySelectorAll('.screen')) s.classList.toggle('active', s.id === id);
  if (id === 'game') requestAnimationFrame(() => { layout(); });
}
function applyText() {
  document.title = 'Diya-Man — A Diwali Game by Cogfree';
  document.querySelectorAll('[data-t]').forEach((el) => { const v = getPath(T, el.dataset.t); if (typeof v === 'string') el.textContent = v; });
  document.querySelectorAll('[data-aria]').forEach((el) => { const v = getPath(T, el.dataset.aria); if (v) el.setAttribute('aria-label', v); });
  document.querySelectorAll('[data-logo]').forEach((el) => { el.innerHTML = logoSVG(+el.dataset.logo); });
  $('loadLabel').textContent = T.loading.label;
}

/* ---------- intro chat ---------- */
function runIntro() {
  const body = $('chatBody'), msgs = T.intro.messages; let i = 0;
  const typing = document.createElement('div'); typing.className = 'typing'; typing.innerHTML = '<i></i><i></i><i></i>';
  const next = () => {
    if (i >= msgs.length) { typing.remove(); const b = $('btnPlay'); b.hidden = false; Audio.toast(); b.focus({ preventScroll: true }); return; }
    body.appendChild(typing);
    setTimeout(() => {
      typing.remove(); const m = document.createElement('div'); m.className = 'bubble'; m.textContent = msgs[i++];
      const s = document.createElement('small'); s.textContent = T.intro.time; m.appendChild(s); body.appendChild(m); Audio.toast();
      setTimeout(next, TM.chatGap);
    }, TM.chatTyping);
  };
  setTimeout(next, 500);
}
$('btnPlay').addEventListener('click', () => { Audio.init(); runLoading(); });

function runLoading() {
  showScreen('loading'); const fill = $('barFill'), pct = $('loadPct'), lab = $('loadLabel'); lab.textContent = T.loading.label;
  const t0 = performance.now(), run = (TM.loadSec - TM.loadHold) * 1000, hold = TM.loadHold * 1000; let phase = 0;
  (function tick(now) {
    const e = now - t0;
    if (e < run) { const p = 99 * (1 - Math.pow(1 - e / run, 2)); fill.style.width = p + '%'; pct.textContent = Math.floor(p) + '%'; }
    else if (e < run + hold) { if (!phase) { phase = 1; lab.textContent = T.loading.review; fill.style.width = '99%'; pct.textContent = '99%'; } }
    else { fill.style.width = '100%'; pct.textContent = '100%'; setTimeout(() => startGame(), 160); return; }
    requestAnimationFrame(tick);
  })(t0);
}
function startGame() {
  showScreen('game'); newGame(); G.paused = false; $('pause').hidden = true; G.state = 'idle';
  // wait for layout (next frame) so the stage has a size, then begin
  requestAnimationFrame(() => requestAnimationFrame(() => { beginReady(); }));
}

/* ---------- pause ---------- */
function updatePauseButtons() {
  $('pSound').textContent = Audio.muted ? T.pause.soundOff : T.pause.soundOn;
  $('pDpad').textContent = dpadOn ? T.pause.dpadOn : T.pause.dpadOff;
  $('btnMute').textContent = Audio.muted ? '🔇' : '🔊';
}
function togglePause(force) {
  if (G.state !== 'ready' && G.state !== 'playing' && !G.paused) return;
  const p = typeof force === 'boolean' ? force : !G.paused; if (p === G.paused) return;
  G.paused = p; $('pause').hidden = !p; if (p) { updatePauseButtons(); $('pResume').focus(); } else { last = performance.now(); acc = 0; }
}
function toggleMute() { Audio.setMuted(!Audio.muted); updatePauseButtons(); }
$('btnPause').addEventListener('click', () => togglePause(true));
$('btnMute').addEventListener('click', () => { Audio.init(); toggleMute(); });
$('pResume').addEventListener('click', () => togglePause(false));
$('pRestart').addEventListener('click', () => { G.paused = false; $('pause').hidden = true; hideToast(); startGame(); });
$('pSound').addEventListener('click', () => { Audio.init(); toggleMute(); });
let dpadOn = store.get(C.storage.dpad) === null ? matchMedia('(pointer: coarse)').matches : store.get(C.storage.dpad) === '1';
function applyDpad() { $('dpad').classList.toggle('on', dpadOn); requestAnimationFrame(layout); }
$('pDpad').addEventListener('click', () => { dpadOn = !dpadOn; store.set(C.storage.dpad, dpadOn ? '1' : '0'); applyDpad(); updatePauseButtons(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) togglePause(true); });
let rz = 0; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { if ($('game').classList.contains('active')) layout(); }, 120); });

/* =====================================================================
   END SCREEN, SCORECARD, SHARING
   ===================================================================== */
function sanitizeName(raw) { return (raw || '').replace(/[^A-Za-z0-9 &-]/g, '').replace(/\s+/g, ' ').trim().slice(0, C.clientParamMax); }
const clientName = (() => { try { return sanitizeName(new URLSearchParams(location.search).get('c')); } catch (e) { return ''; } })();
const titleFor = (s) => { let t = C.titles[0][1]; for (const [m, n] of C.titles) if (s >= m) t = n; return t; };
const fmtTime = (s) => { s = Math.round(s); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
const gameUrl = () => location.origin + location.pathname;
let endState = null, cardBlob = null, logoImg = null;
// On file:// a drawn image taints the canvas (breaks scorecard export), so use the vector logo there.
if (location.protocol !== 'file:' || C.assets.logo.startsWith('data:')) { const im = new Image(); im.onload = () => { logoImg = im; }; im.onerror = () => { logoImg = null; }; im.src = C.assets.logo; }

function showEnd(won) {
  G.state = 'idle'; $('ready').classList.remove('on'); hideToast();
  const isBest = G.score > best; if (isBest) { best = G.score; store.set(C.storage.best, String(best)); }
  const pct = Math.round((G.lit / TOTAL_DIYAS) * 100);
  endState = { won, score: G.score, title: titleFor(G.score), pct, eaten: G.eaten, time: G.playT, name: clientName };
  const hp = $('eHappy'); if (clientName) { hp.hidden = false; hp.textContent = T.end.happy.replace('{name}', clientName); } else hp.hidden = true;
  $('eScore').textContent = G.score; $('eTitle').textContent = endState.title; $('eLit').textContent = pct + '%'; $('eEaten').textContent = G.eaten; $('eTime').textContent = fmtTime(G.playT);
  $('eBest').textContent = T.end.best.replace('{n}', best);
  $('btnCopy').textContent = T.end.copy; cardBlob = null;
  showScreen('end'); $('btnShare').focus({ preventScroll: true });
  document.fonts.load('20px "Press Start 2P"').finally(() => renderCard('score', endState).then((c) => c.toBlob((b) => { cardBlob = b; }, 'image/png')));
}
$('btnAgain').addEventListener('click', () => { Audio.init(); startGame(); });

function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function fitText(g, txt, maxW, size, font) { let s = size; g.font = `${s}px ${font}`; while (g.measureText(txt).width > maxW && s > 10) { s -= 2; g.font = `${s}px ${font}`; } return s; }
async function renderCard(mode, st) {
  const og = mode === 'og', w = og ? 1200 : 1080, h = og ? 630 : 1350, c = mk(w, h), g = c.getContext('2d'), F = '"Press Start 2P", ui-monospace, monospace';
  try { await document.fonts.load('20px "Press Start 2P"'); } catch (e) { /* fallback font */ }
  const bg = g.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#0b1230'); bg.addColorStop(1, '#070B1A'); g.fillStyle = bg; g.fillRect(0, 0, w, h);
  const rnd = mulberry(og ? 5 : 9); g.fillStyle = '#cfe0ff';
  for (let i = 0; i < 120; i++) { g.globalAlpha = 0.15 + rnd() * 0.5; g.fillRect(rnd() * w, rnd() * h, 2 + rnd() * 3, 2 + rnd() * 3); }
  g.globalAlpha = 1; g.globalCompositeOperation = 'lighter';
  const cols = [C.colors.red, C.colors.blue, C.colors.green, C.colors.orange, C.colors.gold];
  for (let b = 0; b < (og ? 6 : 8); b++) { const bx = rnd() * w, by = rnd() * h * 0.75 + 20, col = cols[b % 5], rad = 90 + rnd() * 130; g.strokeStyle = col; g.fillStyle = col; g.lineCap = 'round';
    for (let k = 0; k < 28; k++) { const a = k / 28 * 6.283, r1 = rad * 0.35, r2 = rad; g.globalAlpha = 0.5; g.lineWidth = 4; g.beginPath(); g.moveTo(bx + Math.cos(a) * r1, by + Math.sin(a) * r1); g.lineTo(bx + Math.cos(a) * r2, by + Math.sin(a) * r2); g.stroke(); g.globalAlpha = 0.9; g.beginPath(); g.arc(bx + Math.cos(a) * r2, by + Math.sin(a) * r2, 4, 0, 6.3); g.fill(); } }
  g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
  const logo = (cx, cy, size) => { if (logoImg && logoImg.naturalWidth) { const k = size / Math.max(logoImg.naturalWidth, logoImg.naturalHeight); g.fillStyle = '#fff'; rrect(g, cx - size / 2, cy - size / 2, size, size, size * 0.07); g.fill(); g.drawImage(logoImg, cx - logoImg.naturalWidth * k / 2, cy - logoImg.naturalHeight * k / 2, logoImg.naturalWidth * k, logoImg.naturalHeight * k); } else drawLogo(g, cx, cy, size); };
  g.textAlign = 'center'; g.textBaseline = 'middle';
  if (og) {
    logo(230, 315, 300); g.textAlign = 'left';
    g.fillStyle = C.colors.gold; g.font = `46px ${F}`; g.fillText('DIYA-MAN', 440, 190);
    g.fillStyle = '#fff'; g.font = `20px ${F}`; g.fillText('Diwali Edition', 440, 245);
    g.font = `24px ${F}`; g.fillText(T.card.ogLine1, 440, 340); g.fillText(T.card.ogLine2, 440, 390);
    g.fillStyle = C.colors.green; rrect(g, 440, 440, 340, 76, 14); g.fill(); g.fillStyle = '#0b1a00'; g.font = `26px ${F}`; g.textAlign = 'center'; g.fillText(T.card.ogPlay + ' ▶', 610, 480);
    g.textAlign = 'left'; g.fillStyle = '#9fb0e0'; g.font = `14px ${F}`; g.fillText(T.card.footer, 440, 570);
    return c;
  }
  logo(w / 2, 190, 260);
  g.fillStyle = C.colors.gold; fitText(g, T.card.name, w - 120, 38, F); g.fillText(T.card.name, w / 2, 400);
  if (st.name) { g.fillStyle = '#fff'; fitText(g, T.end.happy.replace('{name}', st.name), w - 120, 28, F); g.fillText(T.end.happy.replace('{name}', st.name), w / 2, 470); }
  g.fillStyle = '#9fb0e0'; g.font = `24px ${F}`; g.fillText(T.end.scoreLabel, w / 2, 560);
  g.fillStyle = '#fff'; g.shadowColor = C.colors.blue; g.shadowBlur = 40; fitText(g, String(st.score), w - 160, 150, F); g.fillText(String(st.score), w / 2, 680); g.shadowBlur = 0;
  g.fillStyle = C.colors.gold; fitText(g, st.title, w - 120, 36, F); g.fillText(st.title, w / 2, 810);
  g.fillStyle = '#9fb0e0'; g.font = `22px ${F}`; g.fillText(`${st.pct}% ${T.end.lit}  ·  ${fmtTime(st.time)}`, w / 2, 880);
  g.save(); g.translate(w / 2, 1060); g.rotate(-0.12); const stampTxt = st.won ? T.win.stamp : T.over.stamp, sc = st.won ? '#59f08a' : '#ff3b45';
  g.font = `44px ${F}`; const tw = Math.min(g.measureText(stampTxt).width, w - 200); fitText(g, stampTxt, w - 220, 44, F);
  g.strokeStyle = sc; g.fillStyle = sc; g.lineWidth = 8; const bw = Math.min(g.measureText(stampTxt).width, w - 200) + 70; rrect(g, -bw / 2, -62, bw, 124, 12); g.stroke(); g.lineWidth = 3; rrect(g, -bw / 2 + 12, -50, bw - 24, 100, 8); g.stroke(); g.fillText(stampTxt, 0, 4); g.restore();
  g.fillStyle = '#9fb0e0'; g.font = `20px ${F}`; g.fillText(T.card.footer, w / 2, 1270);
  return c;
}
const shareText = (withUrl) => { const s = T.end.shareText.replace('{score}', endState.score).replace('{title}', endState.title); return withUrl ? s.replace('{url}', gameUrl()) : s.replace('{url}', '').trim(); };
async function getBlob() { if (cardBlob) return cardBlob; const c = await renderCard('score', endState); cardBlob = await new Promise((r) => c.toBlob(r, 'image/png')); return cardBlob; }
$('btnShare').addEventListener('click', async () => {
  if (!endState) return;
  try {
    const blob = await getBlob(), file = new File([blob], 'diya-man-scorecard.png', { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], text: shareText(false), url: gameUrl() }); return; }
    if (navigator.share) { await navigator.share({ text: shareText(false), url: gameUrl() }); return; }
  } catch (e) { if (e && e.name === 'AbortError') return; }
  window.open('https://wa.me/?text=' + encodeURIComponent(shareText(true)), '_blank', 'noopener');
});
$('btnDownload').addEventListener('click', async () => {
  if (!endState) return; const blob = await getBlob(), a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'diya-man-scorecard.png'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
});
$('btnCopy').addEventListener('click', async () => {
  const url = gameUrl(), b = $('btnCopy');
  try { await navigator.clipboard.writeText(url); } catch (e) { const ta = document.createElement('textarea'); ta.value = url; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e2) { /* ignore */ } ta.remove(); }
  b.textContent = T.end.copied; setTimeout(() => { b.textContent = T.end.copy; }, 1800);
});

/* =====================================================================
   BOOT
   ===================================================================== */
applyText(); applyDpad(); updatePauseButtons();
document.fonts && document.fonts.load('10px "Press Start 2P"').catch(() => {});
resetPositions(); newPellets(); updateHUD(true); renderLives();
requestAnimationFrame(frame);
runIntro();
if (new URLSearchParams(location.search).get('debug') === '1') {
  window.__dm = { G, CONFIG, update, drawLogo, beginReady, showStamp, get hero() { return hero; }, get ghosts() { return ghosts; }, pel, startGame, showEnd, renderCard, startWin, startPower, startDeath, setWant, layout,
    get endState() { return endState; }, set endState(v) { endState = v; }, get items() { return items; }, get coins() { return coins; }, TOTAL_DIYAS, Audio, spawnChai,
    lightAll(n) { let k = 0; for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) if (pel[r][c] === 1 && k < n) { pel[r][c] = 2; clearPellet(c, r); G.lit++; k++; } checkBonusSpawns(); } };
}
