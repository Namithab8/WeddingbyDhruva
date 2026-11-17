const { PNG } = require('pngjs');
const fs = require('fs');
const p = PNG.sync.read(fs.readFileSync('public/dhruva-street.png'));
const { width: W, height: H, data } = p;
// golden pixel: r high, g mid, b low
const isGold=(r,g,b)=> r>180 && g>100 && g<200 && b<100 && r>b+80;
// column profile of gold pixels
const cols=new Array(W).fill(0);
for(let y=0;y<H;y++)for(let x=0;x<W;x++){
  const i=(y*W+x)*4;
  if(isGold(data[i],data[i+1],data[i+2])) cols[x]++;
}
// print profile in 40px bins
const bin=40;
for(let x=0;x<W;x+=bin){
  let s=0;for(let k=x;k<Math.min(x+bin,W);k++)s+=cols[k];
  const bar='#'.repeat(Math.min(60,Math.round(s/200)));
  console.log(String(Math.round(x/W*100)).padStart(3)+'%', bar, s);
}
