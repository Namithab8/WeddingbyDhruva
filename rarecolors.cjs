const { PNG } = require('pngjs');
const fs = require('fs');
const p = PNG.sync.read(fs.readFileSync('wedding_navigation_box_reference.png'));
const { width: W, height: H, data } = p;

// Find rare saturated colors (potential marks) - colors appearing in small counts
const hist = new Map();
for (let i = 0; i < data.length; i += 4) {
  const r=data[i],g=data[i+1],b=data[i+2],a=data[i+3];
  if(a<200)continue;
  const mx=Math.max(r,g,b),mn=Math.min(r,g,b);
  if(mx-mn>60 && mx>120){ // saturated
    const key=`${r>>5<<5},${g>>5<<5},${b>>5<<5}`;
    hist.set(key,(hist.get(key)||0)+1);
  }
}
// Show colors with counts between 50 and 2000 (rare but present)
const rare=[...hist.entries()].filter(([k,v])=>v>50&&v<3000).sort((a,b)=>b[1]-a[1]);
console.log('rare saturated colors (count 50-3000):');
for(const [k,v] of rare.slice(0,30)) console.log(k,v);
