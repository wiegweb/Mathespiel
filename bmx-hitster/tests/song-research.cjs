const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('bmx-hitster/index.html','utf8');let js=html.match(/<script>([\s\S]*?)<\/script>/)[1].split('/* ===================== Start ===================== */')[0];
const node=new Proxy(function(){},{get:(_,k)=>k==='value'?'0':k==='checked'?false:k==='querySelectorAll'?()=>[]:node,set:()=>true,apply:()=>node});
const context={console,document:node,window:node,location:{protocol:'https:'},localStorage:{getItem:()=>null,setItem:()=>{}},Audio:function(){return node},setTimeout:()=>0,clearTimeout:()=>{},setInterval:()=>0,clearInterval:()=>{}};
vm.createContext(context);vm.runInContext(js,context);
vm.runInContext(`
const check=(v,m)=>{if(!v)throw Error(m)};
const o={yearFrom:0,fmt:'all',min20k:false,strict:false,bonus:true};
check(passesFilters({section:'Full-Length',riders:['A'],year:2020},o)===false,'Unresolved film blocked');
check(passesFilters({sourceMismatch:true,riders:['A'],year:2020},o)===false,'Wrong video blocked');
check(filterReason({section:'Full-Length'},o)==='Part-Zuordnung offen','Readable reason retained');
check(RESEARCHED_PARTS.length===102,'102 curated records');
const cards=allCards();
for(const c of RESEARCHED_PARTS){
 check(c.song&&c.artist&&c.riders.length&&c.songOnly&&c.src,'Complete provenance');
 check(cards.some(x=>x.song===c.song&&x.yt===c.yt),'Research card survives expansion: '+c.song);
}
check(DEFAULT_DECK.find(c=>c.video==='Grow Up'&&c.riders[0]==='Aaron Ross').yt==='QqQPdVEQrm4','Aaron URL');
check(DEFAULT_DECK.find(c=>c.video==='Grow Up'&&c.riders[0]==='Brett Silva').yt==='VuajzrJf1hc','Brett URL');
check(DEFAULT_DECK.filter(c=>c.video==="It's Later Than You Think").every(c=>c.year===2018),'Original film year');
const sample=RESEARCHED_PARTS[0]; PV[songKey(sample)]={ok:false};
check(noSound(sample)===true,'Video link cannot mask missing preview');delete PV[songKey(sample)];
check(bestMatch([{a:sample.artist,t:sample.song+' Wrong Song'}],sample,x=>x.a,x=>x.t)===undefined,'No title prefix false positives');
check(bestMatch([{a:'Cover Artist',t:sample.song}],sample,x=>x.a,x=>x.t)===undefined,'No cover artist false positive');
check(bestMatch([{a:sample.artist,t:sample.song}],sample,x=>x.a,x=>x.t),'Exact match accepted');
stopAll=()=>{};showHost=()=>{};setStatus=()=>{};trySources=async()=>{};
G={card:sample};
prepareSource(sample).then(()=>{
 check(JSON.stringify(G.chain)==='["preview"]','No arbitrary source for song-only cards');
 console.log('PASS: data, filters, years, source selection, preview matching. Deck:',cards.length);
});
`,context);
