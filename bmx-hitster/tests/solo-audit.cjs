const fs=require('fs'),vm=require('vm'),assert=require('assert');
const node=new Proxy(function(){},{get:(_,k)=>k==='value'?'0':k==='checked'?false:k==='querySelectorAll'?()=>[]:node,set:()=>true,apply:()=>node});
function read(file){const h=fs.readFileSync(file,'utf8');const js=h.match(/<script>([\s\S]*?)<\/script>/)[1].split('/* ===================== Start ===================== */')[0];const c={console,document:node,window:node,location:{protocol:'https:'},localStorage:{getItem:()=>null,setItem:()=>{}},Audio:function(){return node},setTimeout:()=>0,clearTimeout:()=>{},setInterval:()=>0,clearInterval:()=>{}};vm.createContext(c);vm.runInContext(js,c);return c;}
const c=read('bmx-hitster/index.html');
vm.runInContext(`
const opt={yearFrom:0,fmt:'all',min20k:false,strict:false,bonus:true};
const test=(v,m)=>{if(!v)throw Error(m)};
const deck=allCards();
test(deck.filter(x=>passesFilters(x,opt)).every(x=>x.riders.length===1),'No ambiguous multi-rider cards playable');
test(!passesFilters({riders:['A','B'],song:'Song',artist:'Artist',year:2026,partResolved:true},opt),'Music credits do not legitimise a mix');
for(const id of ['antIDvGtrdA','zQl2ZosE6BI','u1ylreMLT1M','tFEGCijg1cs']){
const x=deck.find(x=>x.yt===id);test(x&&x.riders.length===1&&viewsOf(x)>20000,'User example '+id);
}
test(!passesFilters(deck.find(x=>x.yt==='u1ylreMLT1M'),opt),'Documentary music interval remains pending');
test(!passesFilters(deck.find(x=>x.yt==='axzHv6n3p3Y'),{...opt,min20k:true}),'Below threshold stays excluded');
for(const [id,times] of [['wXHhmcLt2lE',[28,324,452,491,612,804,1323]],['Wqm8PPpQ1_c',[20,496,639,1020,1523,1947,2476]]]){
 const a=deck.filter(x=>x.yt===id&&x.fromMeta);
 test(a.length===7,'Seven individual chapters '+id);
 test(a.every(x=>times.includes(x.start)&&x.startKind==='published-part-start'),'Exact published start, no offset '+id);
 test(a.every(x=>!x.song),'No song association inferred from order');
}
test(deck.filter(x=>x.video==='Lead By Example').every(x=>x.year===2025),'Film release year');
test(deck.find(x=>x.yt==='hHOttB2enSQ').artist==='Oliver Lodge','Artist and title correctly oriented');
console.log('PASS: all mixed cards excluded, four examples, view threshold, 14 chapter boundaries, release years.');
const count={total:deck.length,solo:deck.filter(x=>x.riders.length===1).length,mixedBlocked:deck.filter(x=>x.riders.length!==1).length,eligibleNoViewFilter:deck.filter(x=>passesFilters(x,opt)).length,curatedRecent:RECENT_SOLO_PARTS.length,curatedOver20k:RECENT_SOLO_PARTS.filter(x=>viewsOf(x)>=20000).length};
console.log(JSON.stringify(count));
`,c);
