(() => {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduceMotion = () => motionQuery.matches;
  const pxSize = () => (window.innerWidth <= 700 ? 3 : 4);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  // Seeded RNG so the scenery looks the same on every visit.
  function rng(seed) {
    return () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
  }

  const spriteCache = {};
  function sprite(name, overrides) {
    const key = name + JSON.stringify(overrides || {});
    if (!spriteCache[key]) spriteCache[key] = renderSprite(name, overrides);
    return spriteCache[key];
  }

  document.querySelectorAll('img[data-sprite]').forEach((img) => {
    img.src = sprite(img.dataset.sprite).url;
  });
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---------- hero scene ----------
  const scene = document.querySelector('.scene');
  const heroText = document.querySelector('.hero-text');
  function drawScene() {
    const P = pxSize();
    const W = Math.ceil(scene.clientWidth / P);
    const H = Math.ceil(scene.clientHeight / P);
    scene.width = W;
    scene.height = H;
    const c = scene.getContext('2d');
    const r = rng(7);
    const horizon = Math.round(H * 0.4);

    const sky = ['#6fbfe9', '#86c9ea', '#9fd2e8', '#b9dae2', '#d3dfd6', '#ead9bd', '#f7d3a2', '#ffcb8f'];
    const band = Math.ceil(horizon / sky.length);
    sky.forEach((col, i) => { c.fillStyle = col; c.fillRect(0, i * band, W, band); });

    const sunX = Math.round(W * 0.24), sunY = Math.round(horizon * 0.62);
    c.fillStyle = '#ffe9b0';
    for (let y = -9; y <= 9; y++) {
      const half = Math.round(Math.sqrt(81 - y * y));
      c.fillRect(sunX - half, sunY + y, half * 2, 1);
    }

    c.fillStyle = 'rgba(255,255,255,0.85)';
    for (let i = 0; i < 6; i++) {
      const cx = Math.round(r() * W), cy = Math.round(4 + r() * horizon * 0.45), w = 14 + Math.round(r() * 26);
      c.fillRect(cx, cy, w, 2);
      c.fillRect(cx + 3, cy - 2, w - 8, 2);
      c.fillRect(cx + 7, cy - 4, Math.max(4, w - 18), 2);
    }

    // islands
    const island = (x0, w, h, col) => {
      c.fillStyle = col;
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const hh = Math.round(h * Math.sin(Math.PI * t) * (0.8 + 0.2 * Math.sin(t * 9)));
        c.fillRect(x0 + x, horizon - hh, 1, hh);
      }
    };
    island(Math.round(W * 0.55), Math.round(W * 0.18), 6, '#8fa9b0');
    island(-10, Math.round(W * 0.3), 16, '#2f5d4f');
    // palm tree
    const px = Math.round(W * 0.12), top = horizon - 34;
    c.fillStyle = '#5a3d2a';
    for (let y = top; y < horizon - 10; y++) c.fillRect(px + Math.round((horizon - y) * 0.12), y, 2, 1);
    c.fillStyle = '#2e7d32';
    const tx = px + Math.round(24 * 0.12);
    [[-10, 3], [-7, 1], [8, 3], [6, 0], [0, -3], [-3, -2], [3, -2]].forEach(([dx, dy]) => {
      const steps = Math.abs(dx) || 3;
      for (let i = 0; i <= steps; i++) c.fillRect(tx + Math.round(dx * i / steps), top + dy + Math.round(Math.abs(i - steps / 2)), 2, 1);
    });

    const sea = ['#5aa6cf', '#4b9bcb', '#3f92c5', '#338abf', '#2a84bb', '#1b7fb8'];
    const seaBand = Math.ceil((H - horizon) / sea.length);
    sea.forEach((col, i) => { c.fillStyle = col; c.fillRect(0, horizon + i * seaBand, W, seaBand + 1); });

    // sun glitter + waves, kept clear of the hero text
    const sr = scene.getBoundingClientRect();
    const tr = heroText.getBoundingClientRect();
    const pad = 6;
    const tx0 = (tr.left - sr.left) / P - pad, tx1 = (tr.right - sr.left) / P + pad;
    const ty0 = (tr.top - sr.top) / P - pad, ty1 = (tr.bottom - sr.top) / P + pad;
    const behindText = (x, y, w) => y >= ty0 && y <= ty1 && x + w >= tx0 && x <= tx1;
    c.fillStyle = 'rgba(255,240,200,0.7)';
    for (let y = horizon + 2; y < H * 0.75; y += 3) {
      const w = 2 + Math.round(r() * 8);
      const x = sunX - w / 2 + Math.round((r() - 0.5) * 10);
      if (!behindText(x, y, w)) c.fillRect(x, y, w, 1);
    }
    c.fillStyle = 'rgba(255,255,255,0.35)';
    for (let i = 0; i < W * 0.6; i++) {
      const y = horizon + 3 + Math.round(Math.pow(r(), 1.4) * (H - horizon - 6));
      const x = Math.round(r() * W), w = 2 + Math.round(r() * 5);
      if (!behindText(x, y, w)) c.fillRect(x, y, w, 1);
    }
  }

  // ---------- seabed ----------
  const seabed = document.querySelector('.seabed');
  function drawSeabed() {
    const P = pxSize();
    const W = Math.ceil(seabed.clientWidth / P);
    const H = Math.ceil(seabed.clientHeight / P);
    seabed.width = W;
    seabed.height = H;
    const c = seabed.getContext('2d');
    const r = rng(42);
    const ground = (x) => Math.round(H * 0.45 + 3 * Math.sin(x / 11) + 2 * Math.sin(x / 4.3));
    for (let x = 0; x < W; x++) {
      const g = ground(x);
      c.fillStyle = '#3a332c'; c.fillRect(x, g, 1, 1);
      c.fillStyle = '#29231e'; c.fillRect(x, g + 1, 1, H);
      c.fillStyle = '#1c1814'; c.fillRect(x, g + 12 + Math.round(2 * Math.sin(x / 7)), 1, H);
    }
    for (let i = 0; i < W / 9; i++) {
      const x = Math.round(r() * W), w = 3 + Math.round(r() * 8), h = 2 + Math.round(r() * 4), g = ground(x);
      c.fillStyle = '#17130f'; c.fillRect(x, g - h + 1, w, h);
      c.fillStyle = '#4a4038'; c.fillRect(x + 1, g - h + 1, w - 2, 1);
    }
    // tube worms
    const wx = Math.round(W * 0.72);
    for (let i = 0; i < 9; i++) {
      const x = wx + i * 2 + Math.round(r() * 2), h = 5 + Math.round(r() * 9), g = ground(x);
      c.fillStyle = '#e8e2d0'; c.fillRect(x, g - h, 1, h);
      c.fillStyle = '#e63946'; c.fillRect(x - 1, g - h - 2, 3, 2);
    }
    // vent
    const vx = Math.round(W * 0.88), vg = ground(vx);
    c.fillStyle = '#100d0b'; c.fillRect(vx, vg - 14, 6, 14); c.fillRect(vx - 2, vg - 6, 10, 6);
    c.fillStyle = '#ff8a3d'; c.fillRect(vx + 2, vg - 15, 2, 1); c.fillRect(vx + 1, vg - 9, 1, 2);
    c.fillStyle = 'rgba(180,180,180,0.25)';
    for (let i = 0; i < 12; i++) c.fillRect(vx + 1 + Math.round((r() - 0.5) * (i / 2)), vg - 17 - i * 2, 3 + Math.round(i / 3), 2);
  }

  // ---------- fish ----------
  const blueTang = { Y: 'B', y: 'b' };
  const ZONE_FISH = {
    sunlight: [['clownfish', 3, 26, 40], ['tang', 2, 22, 34], ['tang', 3, 22, 34, '', blueTang], ['turtle', 1, 50, 70]],
    twilight: [['jelly', 4, 10, 16, 'glow-pink'], ['squid', 2, 18, 28], ['shark', 1, 45, 60]],
    midnight: [['lanternfish', 7, 20, 34, 'glow-cyan'], ['angler', 1, 50, 70, 'glow-gold'], ['jelly', 2, 12, 18, 'glow-pink']],
    abyss: [['gulper', 2, 40, 60, 'glow-cyan'], ['angler', 2, 45, 65, 'glow-gold'], ['lanternfish', 2, 24, 34, 'glow-cyan']],
    hadal: [['snailfish', 4, 30, 50], ['lanternfish', 1, 28, 36, 'glow-cyan']],
  };
  const r = rng(3);
  document.querySelectorAll('.zone').forEach((zone) => {
    const layer = document.createElement('div');
    layer.className = 'fish-layer';
    layer.setAttribute('aria-hidden', 'true');
    (ZONE_FISH[zone.dataset.zone] || []).forEach(([name, count, minDur, maxDur, glow, overrides]) => {
      for (let i = 0; i < count; i++) {
        const s = sprite(name, overrides);
        const fish = document.createElement('div');
        const far = r() < 0.35;
        const isJelly = name === 'jelly';
        fish.className = `fish ${isJelly ? 'jelly' : r() < 0.5 ? 'left' : 'right'} ${glow || ''}`;
        fish.style.top = `${4 + r() * 82}%`;
        const dur = minDur + r() * (maxDur - minDur);
        fish.style.animationDuration = `${dur}s`;
        fish.style.animationDelay = `${-r() * dur}s`;
        fish.style.setProperty('--rest', `${5 + r() * 80}vw`);
        if (isJelly) {
          const x0 = 5 + r() * 80;
          fish.style.setProperty('--x0', `${x0}vw`);
          fish.style.setProperty('--x1', `${clamp(x0 + (r() - 0.5) * 20, 2, 90)}vw`);
        }
        const img = document.createElement('img');
        img.className = 'sprite';
        img.alt = '';
        img.src = s.url;
        img.dataset.w = s.w;
        img.dataset.far = far ? 1 : 0;
        img.style.animationDuration = `${1.8 + r() * 1.6}s`;
        if (far) img.style.opacity = '0.55';
        fish.appendChild(img);
        layer.appendChild(fish);
      }
    });
    zone.prepend(layer);
  });
  function sizeFish() {
    const P = pxSize();
    document.querySelectorAll('.fish .sprite').forEach((img) => {
      img.style.width = `${img.dataset.w * (img.dataset.far === '1' ? P - 1 : P)}px`;
    });
  }

  // ---------- depth ----------
  const MAX_DEPTH = 10935;
  const STOPS = [
    [0, [27, 127, 184]], [60, [22, 110, 166]], [200, [15, 82, 136]], [600, [10, 53, 102]],
    [1000, [7, 35, 74]], [2500, [4, 22, 51]], [4000, [3, 13, 34]], [6000, [2, 8, 22]], [MAX_DEPTH, [1, 3, 9]],
  ];
  const ZONES = [
    [200, 'Sunlight zone', 'sunlight'], [1000, 'Twilight zone', 'twilight'], [4000, 'Midnight zone', 'midnight'],
    [6000, 'Abyssal zone', 'abyss'], [Infinity, 'Hadal zone', 'hadal'],
  ];
  const root = document.documentElement;
  const rays = document.querySelector('.rays');
  const snow = document.querySelector('.snow');
  const vignette = document.querySelector('.vignette');
  const diver = document.querySelector('.diver');
  const lamp = document.querySelector('.lamp');
  const line = document.querySelector('.line');
  const boat = document.querySelector('.boat');
  const depthEl = document.getElementById('depth');
  const zoneEl = document.getElementById('zone');
  const pressureEl = document.getElementById('pressure');
  const sections = [...document.querySelectorAll('.zone')];
  const navLinks = [...document.querySelectorAll('.nav a')];
  let anchors = [];
  let depth = 0;

  function buildAnchors() {
    const half = window.innerHeight / 2;
    anchors = [[half, 0]];
    sections.forEach((s) => anchors.push([s.offsetTop, +s.dataset.depth]));
    anchors.push([root.scrollHeight - half, MAX_DEPTH]);
  }

  function depthAt(y) {
    for (let i = 1; i < anchors.length; i++) {
      const [y0, d0] = anchors[i - 1];
      const [y1, d1] = anchors[i];
      if (y <= y1) return y <= y0 || y1 === y0 ? d0 : d0 + ((y - y0) / (y1 - y0)) * (d1 - d0);
    }
    return MAX_DEPTH;
  }

  function waterColor(d) {
    for (let i = 1; i < STOPS.length; i++) {
      const [d0, c0] = STOPS[i - 1];
      const [d1, c1] = STOPS[i];
      if (d <= d1) {
        const t = (d - d0) / (d1 - d0);
        return `rgb(${c0.map((v, k) => Math.round(v + (c1[k] - v) * t)).join(',')})`;
      }
    }
    return 'rgb(1,3,9)';
  }

  let lastY = window.scrollY;
  let ticking = false;
  function update() {
    ticking = false;
    const y = window.scrollY;
    const probe = y + window.innerHeight / 2;
    depth = clamp(depthAt(probe), 0, MAX_DEPTH) || 0;
    const atBottom = y + window.innerHeight >= root.scrollHeight - 2;
    if (atBottom) depth = MAX_DEPTH;

    root.style.setProperty('--water', waterColor(depth));
    rays.style.opacity = clamp(1 - depth / 220, 0, 1);
    snow.style.opacity = clamp((depth - 150) / 500, 0, 0.9);
    vignette.style.opacity = clamp((depth - 400) / 2000, 0, 1);
    lamp.style.opacity = clamp((depth - 300) / 600, 0, 1);

    const zone = depth < 1 ? ['', 'Surface', 'surface'] : ZONES.find(([max]) => depth < max);
    document.body.dataset.zone = zone[2];
    depthEl.textContent = Math.round(depth).toLocaleString('en-US');
    zoneEl.textContent = atBottom ? 'Challenger Deep' : zone[1];
    pressureEl.textContent = Math.round(1 + depth / 10).toLocaleString('en-US');

    if (Math.abs(y - lastY) > 2) {
      diver.classList.toggle('up', y < lastY);
      lastY = y;
    }

    const boatRect = boat.getBoundingClientRect();
    const lineTop = Math.max(0, boatRect.bottom - pxSize() * 3);
    const diverTop = diver.getBoundingClientRect().top + pxSize() * 2;
    line.style.top = `${lineTop}px`;
    line.style.height = `${Math.max(0, diverTop - lineTop)}px`;

    let active = navLinks[0];
    sections.forEach((s, i) => { if (probe >= s.offsetTop) active = navLinks[i + 1]; });
    navLinks.forEach((a) => a.classList.toggle('active', a === active));
    if (reduceMotion()) drawSnow();
  }
  function requestUpdate() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  // ---------- bubbles ----------
  function spawnBubbles() {
    if (reduceMotion()) { document.querySelectorAll('.bubble').forEach((el) => el.remove()); return; }
    if (document.hidden) return;
    const rect = diver.getBoundingClientRect();
    const up = diver.classList.contains('up');
    const n = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) {
      const b = document.createElement('div');
      b.className = 'bubble';
      const size = 3 + Math.random() * 6;
      b.style.width = b.style.height = `${size}px`;
      b.style.left = `${rect.left + rect.width * (0.3 + Math.random() * 0.5)}px`;
      b.style.top = `${up ? rect.top : rect.bottom - rect.height * 0.25}px`;
      b.style.setProperty('--dx', `${(Math.random() - 0.5) * 30}px`);
      b.style.animationDelay = `${i * 0.18}s`;
      b.addEventListener('animationend', () => b.remove());
      document.body.appendChild(b);
    }
  }

  // ---------- marine snow ----------
  const sctx = snow.getContext('2d');
  let flakes = [];
  function sizeSnow() {
    snow.width = window.innerWidth;
    snow.height = window.innerHeight;
    flakes = Array.from({ length: Math.round(window.innerWidth / 14) }, () => ({
      x: Math.random() * snow.width, y: Math.random() * snow.height,
      s: Math.random() < 0.8 ? 2 : 3, v: 0.15 + Math.random() * 0.35, glow: Math.random() < 0.08,
    }));
  }
  function drawSnow() {
    if (+snow.style.opacity > 0) {
      sctx.clearRect(0, 0, snow.width, snow.height);
      const bio = clamp((depth - 1000) / 1500, 0, 1);
      flakes.forEach((f) => {
        if (!reduceMotion()) {
          f.y += f.v;
          f.x += Math.sin(f.y / 40) * 0.15;
          if (f.y > snow.height) { f.y = -4; f.x = Math.random() * snow.width; }
        }
        sctx.fillStyle = f.glow && bio > 0 ? `rgba(102,255,224,${0.4 + 0.5 * bio})` : 'rgba(220,235,245,0.55)';
        sctx.fillRect(Math.round(f.x), Math.round(f.y), f.s, f.s);
      });
    }
  }
  function snowLoop() {
    if (!reduceMotion()) drawSnow();
    requestAnimationFrame(snowLoop);
  }

  function layout() {
    drawScene();
    drawSeabed();
    sizeFish();
    sizeSnow();
    buildAnchors();
    update();
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(layout, 120); });
  window.addEventListener('load', buildAnchors);
  if (document.fonts) document.fonts.ready.then(layout);
  layout();
  setInterval(spawnBubbles, 1100);
  requestAnimationFrame(snowLoop);
})();
