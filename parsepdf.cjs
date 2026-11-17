const fs = require('fs');
const x = fs.readFileSync('pdfbbox.html', 'utf8');
const re = /<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]+)<\/word>/g;
const words = [];
let m;
while ((m = re.exec(x))) words.push({ x: +m[1], y: +m[2], x2: +m[3], y2: +m[4], t: m[5] });
console.log('page:', x.match(/<page width="([\d.]+)" height="([\d.]+)"/).slice(1));
console.log(JSON.stringify(words.filter(w => /^[1-7]$/.test(w.t)), null, 1));
// also dump all words with positions for context near top area
console.log(JSON.stringify(words.slice(0, 60)));
