export const GOLD_HOVER_COLOR = { r: 0x85, g: 0x89, b: 0xa5 }; // #8589A5

export function isGoldPixel(r, g, b) {
  if (r <= g || g <= b) return false;
  const max = r;
  const min = Math.min(g, b);
  const delta = max - min;
  if (delta < 15 || max < 40) return false;
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  if (lum > 0.92) return false;
  let hue;
  if (max === r) hue = 60 * (((g - b) / delta) % 6);
  else if (max === g) hue = 60 * ((b - r) / delta + 2);
  else hue = 60 * ((r - g) / delta + 4);
  if (hue < 0) hue += 360;
  const sat = delta / max;
  const minSat = lum > 0.72 ? 0.3 : 0.12;
  return hue >= 18 && hue <= 70 && sat >= minSat && r > b + 12;
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0));
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360 / 360;
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [Math.round(f(h + 1 / 3) * 255), Math.round(f(h) * 255), Math.round(f(h - 1 / 3) * 255)];
}

// red target: hue ~0, keep per-pixel saturation & lightness for detail
const TARGET_HUE = 0;
const TARGET_SAT = 0.25;
const TARGET_LUM = 0.59;

export function goldifyCanvas(source) {
  const w = source.naturalWidth || source.width;
  const h = source.naturalHeight || source.height;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(source, 0, 0);
  const imageData = ctx.getImageData(0, 0, w, h);
  const d = imageData.data;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] < 16) continue;
    if (isGoldPixel(d[i], d[i + 1], d[i + 2])) {
      const [hh, ss, ll] = rgbToHsl(d[i], d[i + 1], d[i + 2]);
      const nr = Math.min(1, ss * 1.4);
      const nl = Math.min(0.85, Math.max(0.25, ll * 0.9 + TARGET_LUM * 0.25));
      const [tr, tg, tb] = hslToRgb(TARGET_HUE, nr, nl);
      d[i] = tr; d[i + 1] = tg; d[i + 2] = tb;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

function attachGoldHover(img) {
  if (img.dataset.goldHoverBound) return;
  img.dataset.goldHoverBound = '1';
  let overlay = null;
  let fadeTimer = null;

  const show = () => {
    if (overlay) return;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    if (!w || !h) return;
    const canvas = goldifyCanvas(img);
    const rect = img.getBoundingClientRect();
    overlay = canvas;
    overlay.className = 'gold-hover-overlay';
    overlay.style.cssText =
      `position:fixed;left:${rect.left}px;top:${rect.top}px;` +
      `width:${rect.width}px;height:${rect.height}px;` +
      `z-index:9999;pointer-events:none;opacity:0;` +
      `transition:opacity .5s ease;`;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => { overlay.style.opacity = '1'; });
  };

  const hide = () => {
    if (!overlay) return;
    const el = overlay;
    overlay = null;
    el.style.opacity = '0';
    clearTimeout(fadeTimer);
    fadeTimer = setTimeout(() => el.remove(), 550);
  };

  img.addEventListener('mouseenter', show);
  img.addEventListener('mouseleave', hide);
  img.addEventListener('focus', show);
  img.addEventListener('blur', hide);
}

export function initGoldHover(root = document) {
  const scan = () => {
    root.querySelectorAll('img').forEach((img) => {
      if (img.dataset.goldHoverBound) return;
      if (img.closest('.street-copy')) return;
      if ((img.width || 0) < 8 && (img.height || 0) < 8) return;
      if (!img.complete || !img.naturalWidth) {
        img.addEventListener('load', () => attachGoldHover(img), { once: true });
        return;
      }
      attachGoldHover(img);
    });
  };
  scan();

  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.tagName === 'IMG') {
          if (!node.closest('.street-copy')) attachGoldHover(node);
        }
        if (node.querySelectorAll) {
          node.querySelectorAll('img').forEach((img) => {
            if (!img.closest('.street-copy')) attachGoldHover(img);
          });
        }
      });
    }
  });
  mo.observe(root.body || root.documentElement, { childList: true, subtree: true });
  return mo;
}
