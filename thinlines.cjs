const { PNG } = require('pngjs');
const fs = require('fs');
const p = PNG.sync.read(fs.readFileSync('wedding_navigation_box_reference.png'));
const { width: W, height: H, data } = p;
const px=(x,y)=>{const i=(y*W+x)*4;return [data[i],data[i+1],data[i+2]];};
const close=(a,b,t=8)=>Math.abs(a[0]-b[0])<=t&&Math.abs(a[1]-b[1])<=t&&Math.abs(a[2]-b[2])<=t;

// Find THIN horizontal lines: row y has uniform-color run >=50px,
// and row y-1 and y+1 at same x do NOT have that color (thin line)
const hLines=[];
for(let y=1;y<H-1;y++){
  let x=0;
  while(x<W){
    const c=px(x,y);
    let x2=x+1;
    while(x2<W&&close(px(x2,y),c))x2++;
    const len=x2-x;
    if(len>=50){
      // check thin: above and below differ at midpoint
      const mx=(x+x2)>>1;
      const above=px(mx,y-1), below=px(mx,y+1);
      const isThin = !close(above,c,15) && !close(below,c,15);
      if(isThin) hLines.push({y,x0:x,x1:x2-1,len,col:c});
    }
    x=x2;
  }
}
console.log('thin hLines', hLines.length);
// cluster by y
hLines.sort((a,b)=>a.y-b.y);
const yg=[];
for(const l of hLines){
  const g=yg[yg.length-1];
  if(g&&l.y-g.maxy<=2){g.maxy=l.y;g.lines.push(l);}
  else yg.push({miny:l.y,maxy:l.y,lines:[l]});
}
for(const g of yg){
  const xs=g.lines.map(l=>[l.x0,l.x1]);
  console.log('y~'+((g.miny+g.maxy)/2).toFixed(0),'n='+g.lines.length,'x',Math.min(...xs.map(a=>a[0])),'-',Math.max(...xs.map(a=>a[1])),'col',g.lines[0].col);
}
