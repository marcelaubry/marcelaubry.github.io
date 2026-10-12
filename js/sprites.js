// Pixel-art sprites. Each row is a string; each character is a palette key ('.' = transparent).
// Fish face left; the page flips them to swim right.
const PALETTE = {
  K: '#14141f', k: '#2a2a3a',
  S: '#26324a', s: '#3b4c6b',
  Y: '#f2c14e', y: '#c9962c',
  F: '#ff7a3d', f: '#c4521f',
  M: '#8be3ff', m: '#e63946',
  P: '#f0b78f', W: '#ffffff',
  O: '#ff8c1a', o: '#d95f0e',
  B: '#2b7bd6', b: '#1b4f99',
  G: '#4caf50', g: '#2e7d32', T: '#a0d8b3',
  L: '#fff3a0', l: '#ffd54a',
  R: '#e63946', r: '#9c1c27',
  J: '#f7a1d8', j: '#c86bb5',
  U: '#5a6a80', V: '#c9d6e3',
  N: '#3d2b1f', n: '#7a5230', w: '#a8743f',
  X: '#121a24', x: '#24334a',
  C: '#66ffe0',
  Q: '#f4c7d0', q: '#d99aab',
  D: '#c9823f', d: '#8f5626', H: '#45455c',
};

const SPRITES = {
  dachshund: [
    '....................KKKK....',
    '...................KkkkkK...',
    '..................KkkkDkK...',
    'K...KKKKKKKKKKKKKKkkkkWkKKKK',
    'kK.KkHHHHHHHHkkkkHHkkkkDDDDX',
    '.kKkkkkkkkkkkkkkkHHHkkdDDDK.',
    '.kkkkkkkkkkkkkkkkHHHHkKKKK..',
    'Hk.KkkkkkkkkkkkkkkHHHkK.....',
    '...KkkdDkkkkkkkkkkHHkDDK....',
    '...kKDDKkHkHkHkkkKDDDK......',
    '....KDDK.k.k.k...KDDK.......',
    '....KKKK.........KKKK.......',
  ],
  boat: [
    '..............K.................',
    '..............KRRRRWW...........',
    '..............KRRRWWR...........',
    '..............KRRWWRR...........',
    '..............KRWWRRR...........',
    '..............KWWRRRR...........',
    '..............K......KKKKKKK....',
    '..............K......KWMWMWK....',
    '......KKKKKKKKKKKKKKKKWWWWWKK...',
    'KKKKKKwwwwwwwwwwwwwwwwwwwwwwKKKK',
    '.KnnnnnnnnnnnnnnnnnnnnnnnnnnnnK.',
    '..KWWWWWWWWWWWWWWWWWWWWWWWWWWK..',
    '...KKKKKKKKKKKKKKKKKKKKKKKKKK...',
  ],
  clownfish: [
    '....KKKKK.....',
    '..KKOWOOOKK.KK',
    '.KOKOWOOWOKKOK',
    'KOOOWWOOWWOOOK',
    'KOOOOWOOWOOOOK',
    '.KOOOWOOWOKKOK',
    '..KKOWOOOKK.KK',
    '....KKKKK.....',
  ],
  tang: [
    '....KKKK....',
    '...KYYYYK...',
    '..KYYYYYYK.K',
    '.KYKYYYYYYYK',
    'KYYYYYYYYYYK',
    '.KYYYYYYYYKK',
    '..KYYYYYYK.K',
    '...KYYYYK...',
    '....KKKK....',
  ],
  turtle: [
    '......KKKKKKK.......',
    '....KKgGgGgGgKK.....',
    '...KgGgGgGgGgGgK....',
    'KKKgGgGgGgGgGgGgK...',
    'KTTKgGgGgGgGgGgGKK..',
    'KTKTKKKKKKKKKKKKKTK.',
    '.KTTK.KTTK..KTTK.KTK',
    '..KK..KTTK..KTTK..K.',
    '......KKK....KKK....',
  ],
  shark: [
    '..................KK..............',
    '.................KUUK.............',
    '................KUUUK.............',
    '......KKKKKKKKKKUUUUKKKKKK.....KK.',
    '....KKUUUUUUUUUUUUUUUUUUUUKKK.KUUK',
    '..KKUUKUUUUUUUUUUUUUUUUUUUUUUKUUK.',
    'KKUUUUUUUUUUUUUUUUUUUUUUUUUUUUUK..',
    'KVVVVVVVVUUUUUUUUUUUUUUUUUUUUUUK..',
    '.KKVVVVVVVVVVVVVVVVUUUUUUUUUKKUUK.',
    '...KKKKVVVVVVVVKKVVVVVVVKKKK.KUUK.',
    '.........KKKKK.KUUKKKKKK......KK..',
    '................KK................',
  ],
  jelly: [
    '...JJJJJ...',
    '.JJJJJJJJJ.',
    'JJjJJJJJjJJ',
    'JJJJJJJJJJJ',
    'jJjJjJjJjJj',
    '.j.j.j.j.j.',
    '.j..j.j..j.',
    '..j.j.j.j..',
    '.j..j..j.j.',
    '..j..j.j...',
    '.j..j...j..',
    '...j..j....',
  ],
  squid: [
    '..KKKKKKKKK.......',
    '.KRRRRRRRRRKKK.K..',
    'KRRRRRRRRRRRRRKrKr',
    'RRRRRRRRRRRWKRRrrr',
    'KRRRRRRRRRRRRRKrKr',
    '.KRRRRRRRRRKKK.K..',
    '..KKKKKKKKK.......',
  ],
  lanternfish: [
    '...KKKKKK...',
    '.KKxxxxxxKKK',
    'KCKxXCXCXxKx',
    'KxxxxxxxxxxK',
    '.KKxCxCxKKKx',
    '...KKKKKK...',
  ],
  angler: [
    '..LL................',
    '.LllL...............',
    '..LL................',
    '...K................',
    '....K...............',
    '.....KKKKKKKK.......',
    '...KKxxxxxxxxKK...KK',
    '..KxxLxxxxxxxxxK.KxK',
    '.KWxxxxxxxxxxxxxKxxK',
    'KW.WxxxxxxxxxxxxxxxK',
    'K.....xxxxxxxxxxxKxK',
    'KW.WxxxxxxxxxxxxK.KK',
    '.KWxxxxxxxxxxKKK....',
    '..KKKKKKKKKKK.......',
  ],
  gulper: [
    'KKKKKK........................',
    'KxxxxxKK......................',
    '.KxxxxxxKKKKKKKKKKKKK.........',
    '..KCxxxxxxxxxxxxxxxxxKKKKKK...',
    '..KxxxxxxxxxxxxxxxxxxxxxxxxKKC',
    '.KxxxxxxKKKKKKKKKKKKKKKKKKK...',
    'KxxxxxKK......................',
    'KKKKKK........................',
  ],
  snailfish: [
    '...QQQQQQ.....',
    '.QQQqQQQQQQQ..',
    'QKQQQQQQQQQQQQ',
    'QQQQQQQQQQQQqq',
    '.QqQQQQQQQQQ..',
    '...qqqqqq.....',
  ],
  chest: [
    '..KKKKKKKKKKKK..',
    '.KnnnnnnnnnnnnK.',
    'KnwwwwwwwwwwwwnK',
    'KKKKKKKKKKKKKKKK',
    'KlLlLlLlLlLlLlLK',
    'KnnnnnnKKnnnnnnK',
    'KnwwwwwKlKwwwwnK',
    'KnnnnnnKKnnnnnnK',
    'KnwwwwwwwwwwwwnK',
    'KnnnnnnnnnnnnnnK',
    'KKKKKKKKKKKKKKKK',
  ],
};

function renderSprite(name, overrides = {}) {
  const rows = SPRITES[name];
  const w = Math.max(...rows.map((r) => r.length));
  const h = rows.length;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const key = overrides[ch] || ch;
      const color = PALETTE[key] || key;
      if (ch === '.' || !color || color === '.') return;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    });
  });
  return { url: canvas.toDataURL(), w, h };
}
