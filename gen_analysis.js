/* 生成器：从 data.js 渲染静态 analysis/index.html（无客户端 JS 依赖，数据预烘焙） */
const D = require('./data.js');
const fs = require('fs');
const {CAT, AUTH, SCHOOLS, EXPERTS, CAT_STATS, AUTH_STATS, DOMAIN, TIERS, CLUSTER_ORDER} = D;
const CAT_KEYS = Object.keys(CAT);
const N = EXPERTS.length;
const INCOME_LABEL = {1:"学者/中产",2:"十万至百万$",3:"数百万至千万级",4:"千万至亿$",5:"亿美元以上"};
const totalVP = EXPERTS.reduce((s,e)=>s+e.viewpoints.length,0);

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const splitP = s => s.split('（')[0];
const catCount = k => EXPERTS.filter(e=>e.viewpoints.some(v=>v.c.includes(k))).length;
const expertsOf = k => EXPERTS.filter(e=>e.viewpoints.some(v=>v.c.includes(k)));

// ---- ① cloud ----
const cloud = Object.keys(CAT).map(k=>({k,name:CAT[k],count:CAT_STATS[k].count}))
  .sort((a,b)=>b.count-a.count).map(it=>{
    const size = 13 + Math.sqrt(it.count)*6.5;
    const cls = it.count>=16?'w4':it.count>=11?'w3':it.count>=6?'w2':'w1';
    return `<span class="${cls}" style="font-size:${size.toFixed(0)}px" title="${esc(it.name)}：${it.count}/${N} 位专家">${esc(splitP(it.name))}</span>`;
  }).join(' ');

// ---- ② consensus bars ----
const bars = Object.keys(CAT).map(k=>({k,name:CAT[k],count:CAT_STATS[k].count,experts:CAT_STATS[k].experts}))
  .sort((a,b)=>b.count-a.count).map(it=>{
    const names = it.experts.map(id=>EXPERTS.find(e=>e.id===id).nameZh).join('、');
    const w = it.count/N*100;
    return `<div class="bar" title="${esc(it.k)} ${esc(it.name)}（${it.count}位）：${esc(names)}">
      <div class="lab">${it.k} · ${esc(splitP(it.name))}</div>
      <div class="track"><div class="fill" style="width:${w}%"></div></div>
      <div class="val">${it.count}<small>/${N}</small></div></div>`;
  }).join('');

// ---- ③ expert heatmap ----
const heatRows = EXPERTS.map(e=>{
  const cells = CAT_KEYS.map(k=>{
    const n = e.viewpoints.filter(v=>v.c.includes(k)).length;
    const cls = n===0?'c0':n===1?'c1':n===2?'c2':n===3?'c3':'c4';
    return `<div class="cell ${cls}" title="${esc(e.nameZh)} × ${k} ${esc(CAT[k])}：${n}条"></div>`;
  }).join('');
  return `<div class="rh">${esc(e.nameZh)}</div>${cells}`;
}).join('');
const heatHead = '<div class="rhc"></div>' + CAT_KEYS.map(k=>`<div class="ch" title="${esc(CAT[k])}">${k}</div>`).join('');

// ---- ④ schools ----
const schoolSlots = {practice:'--s2',thinking:'--s1',mindset:'--s7',strategy:'--s3',generalist:'--s4',action:'--s5',system:'--s6'};
const schools = Object.keys(SCHOOLS).map(sk=>{
  const members = EXPERTS.filter(e=>e.schools.includes(sk));
  const lis = members.map(e=>`<li title="${esc(e.nameZh)}：${esc(e.schools.map(s=>SCHOOLS[s]).join('、'))}">${esc(e.nameZh)}<span class="ct">${e.viewpoints.length}条</span></li>`).join('');
  return `<div class="school"><div class="sh"><i style="background:var(${schoolSlots[sk]})"></i>${esc(SCHOOLS[sk])}</div><ul>${lis}</ul></div>`;
}).join('');
const schoolLegend = Object.keys(SCHOOLS).map(sk=>{
  const n = EXPERTS.filter(e=>e.schools.includes(sk)).length;
  return `<span class="sw"><i style="background:var(${schoolSlots[sk]})"></i>${esc(splitP(SCHOOLS[sk]))}(${n})</span>`;
}).join('');

// ---- ⑤ demographics ----
function dist(key){const m={};EXPERTS.forEach(e=>m[e[key]]=(m[e[key]]||0)+1);return m;}
function mini(title,map,ordinal){
  const entries=Object.keys(map).sort((a,b)=>ordinal?Number(a)-Number(b):map[b]-map[a]||a.localeCompare(b));
  const rows=entries.map((k,i)=>{
    const v=map[k],pct=v/N*100;
    const color=ordinal?`var(--seq${Math.min(i+1,4)})`:`var(--s${(i%8)+1})`;
    return `<div class="mbar" title="${esc(String(k))}：${v}位"><div class="ml">${esc(String(k))}</div><div class="mt"><div class="mf" style="width:${pct}%;background:${color}"></div></div><div class="mv">${v}</div></div>`;
  }).join('');
  return `<div class="mini"><h4>${esc(title)}</h4>${rows}</div>`;
}
const demo = mini('从事领域',dist('field'),false)+mini('国别（执业）',dist('countryWork'),false)+mini('出生国',dist('countryBirth'),false)
  +mini('文化圈',dist('region'),false)+mini('性别',dist('gender'),false)
  +mini('年龄段',dist('ageBracket'),true)
  +mini('年收入层级',(()=>{const m={};EXPERTS.forEach(e=>m[INCOME_LABEL[e.incomeTier]]=(m[INCOME_LABEL[e.incomeTier]]||0)+1);return m;})(),true);

// ---- ⑥ auth ----
const authTiles = ['亲历','借鉴','共识'].map(a=>{
  const n=AUTH_STATS[a]||0;
  return `<div class="auth-tile" title="${esc(AUTH[a])}"><div class="n a-${a}">${n}</div><div class="l">${a}</div><div class="pct">${(n/totalVP*100).toFixed(0)}% / ${totalVP}条</div></div>`;
}).join('');
const authBars = Object.keys(CAT).map(k=>{
  const cnt={亲历:0,借鉴:0,共识:0};
  EXPERTS.forEach(e=>e.viewpoints.forEach(v=>{if(v.c.includes(k))cnt[v.auth]++;}));
  return {k,name:CAT[k],cnt,total:cnt.亲历+cnt.借鉴+cnt.共识};
}).filter(x=>x.total>0).sort((a,b)=>b.total-a.total).map(item=>{
  const segs=['亲历','借鉴','共识'].map(a=>item.cnt[a]>0?`<span class="seg-${a}" style="width:${item.cnt[a]/item.total*100}%"></span>`:'').join('');
  return `<div class="authbar" title="${esc(item.name)}（共${item.total}条）：亲历${item.cnt.亲历}·借鉴${item.cnt.借鉴}·共识${item.cnt.共识}">
    <div class="lab">${item.k} · ${esc(splitP(item.name))}</div><div class="stack">${segs}</div><div class="tot">${item.total}</div></div>`;
}).join('');

// ---- ⑦ practice vs knowledge ----
const PTYPE = {
  "实践型": new Set(["waitzkin","leonard","kasparov","kobe","serena","federer","rams","adria","torvalds","musashi","goggins","biles"]),
  "知识型": new Set(EXPERTS.map(e=>e.id).filter(id=>!["waitzkin","leonard","kasparov","kobe","serena","federer","rams","adria","torvalds"].includes(id)))
};
const pN=PTYPE["实践型"].size, kN=PTYPE["知识型"].size;
const ptypeRows = Object.keys(CAT).map(k=>{
  const p=EXPERTS.filter(e=>PTYPE["实践型"].has(e.id)&&e.viewpoints.some(v=>v.c.includes(k))).length;
  const kn=EXPERTS.filter(e=>PTYPE["知识型"].has(e.id)&&e.viewpoints.some(v=>v.c.includes(k))).length;
  return {k,name:CAT[k],p,kn,pp:p/pN*100,kp:kn/kN*100,diff:Math.abs(p/pN-kn/kN)};
}).sort((a,b)=>b.diff-a.diff).map(it=>`
  <div class="ptype" title="${esc(it.name)}：实践型 ${it.p}/${pN}（${it.pp.toFixed(0)}%）· 知识型 ${it.kn}/${kN}（${it.kp.toFixed(0)}%）">
    <div class="lab">${it.k} · ${esc(splitP(it.name))}</div>
    <div class="rows"><div class="pr"><span class="pn">实践</span><div class="pt"><div class="pf" style="width:${it.pp}%;background:var(--s1)"></div></div><span class="pv">${it.p}/${pN}</span></div>
    <div class="pr"><span class="pn">知识</span><div class="pt"><div class="pf" style="width:${it.kp}%;background:var(--s2)"></div></div><span class="pv">${it.kn}/${kN}</span></div></div></div>`
).join('');

// ---- ⑧ domain heatmap ----
const dheatRows = CLUSTER_ORDER.map(cl=>{
  const members = EXPERTS.filter(e=>DOMAIN[e.id].cluster===cl);
  const tier = members[0]?DOMAIN[members[0].id].tier:'';
  const cells = CAT_KEYS.map(k=>{
    const n = members.filter(e=>e.viewpoints.some(v=>v.c.includes(k))).length;
    const pct = members.length?n/members.length*100:0;
    const cls = pct===0?'c0':pct<=33?'c1':pct<=66?'c2':pct<100?'c3':'c4';
    return `<div class="cell ${cls}" title="${esc(cl)} × ${k} ${esc(CAT[k])}：${n}/${members.length}（${pct.toFixed(0)}%）"></div>`;
  }).join('');
  return `<div class="rh"><span class="cl">${esc(cl)}</span><span class="ti">${esc(tier)}·${members.length}位</span></div>${cells}`;
}).join('');

// ---- stats tiles ----
const stats = `
  <div class="stat"><div class="n t1">${N}</div><div class="l">专家数（中外）</div></div>
  <div class="stat"><div class="n">${totalVP}</div><div class="l">提炼观点总数</div></div>
  <div class="stat"><div class="n t2">${CAT_KEYS.length}</div><div class="l">能力框架节点</div></div>
  <div class="stat"><div class="n t3">${AUTH_STATS['亲历']}</div><div class="l">亲历型观点（${(AUTH_STATS['亲历']/totalVP*100).toFixed(0)}%）</div></div>
  <div class="stat"><div class="n t4">${EXPERTS.filter(e=>e.gender==='女').length}</div><div class="l">女性专家</div></div>`;

const html = `<!DOCTYPE html>
<html lang="zh-CN" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>如何成为专家 · 观点数据分析</title>
<style>
:root{
  --page:#0a0b0e;--surface:#15171c;--panel:#1a1d24;--panel2:#21252e;--border:rgba(255,255,255,.08);--border2:rgba(255,255,255,.14);
  --ink:#ffffff;--sec:#c7ccd6;--muted:#8a93a3;--hairline:#232830;--axis:#2a2f38;
  --s1:#3987e5;--s2:#d95926;--s3:#199e70;--s4:#c98500;--s5:#d55181;--s6:#3faa3f;--s7:#9085e9;--s8:#e66767;
  --seq1:#184f95;--seq2:#1c5cab;--seq3:#2a78d6;--seq4:#5598e7;
  --grad:linear-gradient(135deg,#3987e5,#9085e9);
}
*{box-sizing:border-box;margin:0;padding:0}
body{background:radial-gradient(1200px 600px at 70% -10%,#1a2233 0,transparent 60%),var(--page);color:var(--ink);font-family:system-ui,-apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;font-size:14px;line-height:1.6}
.wrap{max-width:1200px;margin:0 auto;padding:32px 22px 90px}
a{color:var(--s1);text-decoration:none}
.head{position:relative;border:1px solid var(--border);border-radius:18px;padding:24px 28px;margin-bottom:10px;background:linear-gradient(135deg,rgba(57,135,229,.12),rgba(144,133,233,.08))}
.head .back{position:absolute;top:24px;right:28px;font-size:12px;color:var(--muted)}
.head .k{color:var(--s1);font-size:11px;letter-spacing:2px;text-transform:uppercase}
.head h1{font-size:26px;font-weight:800;margin:6px 0 4px;letter-spacing:.2px}
.head .sub{color:var(--sec);font-size:13px;max-width:780px}
.stats{display:flex;gap:12px;flex-wrap:wrap;margin:20px 0 6px}
.stat{flex:1;min-width:140px;background:var(--panel);border:1px solid var(--border);border-radius:14px;padding:16px 18px;position:relative;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.25);animation:pop .5s ease both}
.stat::after{content:"";position:absolute;inset:0 auto 0 0;width:3px;background:var(--border2)}
.stat .n{font-size:26px;font-weight:800;font-variant-numeric:tabular-nums;letter-spacing:-.5px}
.stat .n.t1{color:var(--s1)}.stat .n.t2{color:var(--s3)}.stat .n.t3{color:var(--s4)}.stat .n.t4{color:var(--s5)}
.stat .l{font-size:11px;color:var(--muted);margin-top:4px}
nav.toc{display:flex;gap:16px;flex-wrap:wrap;margin:18px 0 30px;font-size:13px;padding:12px 16px;background:rgba(21,23,28,.85);backdrop-filter:blur(8px);border:1px solid var(--border);border-radius:12px;position:sticky;top:0;z-index:20}
nav.toc a{color:var(--sec);padding:2px 0}
nav.toc a:hover{color:var(--ink)}
section{margin-bottom:46px;scroll-margin-top:70px;animation:fadeUp .7s ease both}
section h2{font-size:18px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
section h2 .bar-accent{width:4px;height:18px;border-radius:2px;background:var(--grad)}
section .lead{color:var(--sec);font-size:13px;margin:6px 0 18px;max-width:880px}
.note{color:var(--muted);font-size:11px;margin-top:12px;line-height:1.6}
.panel{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:22px 24px;box-shadow:0 10px 30px rgba(0,0,0,.25)}
/* cloud */
.cloud{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;justify-content:center;min-height:200px;padding:6px}
.cloud span{font-weight:700;line-height:1.1;cursor:default;transition:transform .15s,color .15s;animation:fadeIn .9s ease both}
.cloud span:hover{transform:scale(1.08)}
.cloud .w1{color:var(--seq3)}.cloud .w2{color:var(--s1)}.cloud .w3{color:var(--s4)}.cloud .w4{color:var(--s5)}
/* bars */
.bar{display:grid;grid-template-columns:170px 1fr 50px;align-items:center;gap:12px;margin-bottom:8px}
.bar .lab{font-size:12px;color:var(--sec);text-align:right}
.bar .track{background:var(--hairline);border-radius:6px;height:20px;overflow:hidden}
.bar .fill{height:100%;border-radius:6px;background:linear-gradient(90deg,var(--s1),var(--s7));transform-origin:left;animation:barGrow 1.1s cubic-bezier(.2,.8,.2,1) both}
.bar .val{font-size:12px;color:var(--ink);font-variant-numeric:tabular-nums;font-weight:600}
.bar .val small{color:var(--muted);font-weight:400}
.bar:hover .fill{filter:brightness(1.2)}
/* heat */
.hwrap{overflow:auto}.heat{display:grid;grid-template-columns:120px repeat(${CAT_KEYS.length},24px);gap:2px;font-size:10px;width:fit-content;margin:0 auto}
.heat .ch{color:var(--muted);text-align:center;padding-bottom:4px;writing-mode:vertical-rl;transform:rotate(180deg);height:56px;line-height:1}
.heat .rhc{}
.heat .rh{color:var(--sec);text-align:right;padding-right:6px;display:flex;align-items:center;justify-content:flex-end;line-height:1.1;font-size:11px}
.heat .cell{height:24px;border-radius:4px;cursor:default;transition:transform .12s,filter .12s}
.heat .cell:hover{transform:scale(1.4);outline:1px solid var(--ink);position:relative;z-index:5;filter:brightness(1.3)}
.c0{background:var(--hairline)}.c1{background:var(--seq1)}.c2{background:var(--seq2)}.c3{background:var(--seq3)}.c4{background:var(--seq4)}
.legend{display:flex;gap:14px;align-items:center;margin-top:12px;font-size:11px;color:var(--muted);flex-wrap:wrap}
.legend .sw{display:flex;align-items:center;gap:5px}
.legend i{width:14px;height:14px;border-radius:3px;display:inline-block}
/* schools */
.schools{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px}
.school{background:var(--panel);border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:transform .15s,border-color .15s;box-shadow:0 8px 24px rgba(0,0,0,.2);animation:fadeUp .6s ease both}
.school:hover{transform:translateY(-2px);border-color:var(--border2)}
.school .sh{padding:12px 16px;font-weight:600;font-size:13px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--border)}
.school .sh i{width:12px;height:12px;border-radius:3px}
.school ul{list-style:none;padding:8px 12px 14px}
.school li{font-size:12px;color:var(--sec);padding:5px 8px;border-radius:6px;margin:2px 0}
.school li:hover{background:var(--panel2);color:var(--ink)}
.school li .ct{color:var(--muted);font-size:10px;float:right}
/* demo */
.demo{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px}
.mini{background:var(--panel);border:1px solid var(--border);border-radius:14px;padding:16px}
.mini h4{font-size:12px;color:var(--sec);margin-bottom:12px;font-weight:600}
.mbar{display:grid;grid-template-columns:84px 1fr 26px;align-items:center;gap:6px;margin-bottom:6px;font-size:11px}
.mbar .ml{color:var(--sec);text-align:right;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mbar .mt{background:var(--hairline);border-radius:3px;height:12px;overflow:hidden}
.mbar .mf{height:100%;border-radius:3px;transition:width .6s}
.mbar .mv{color:var(--muted);font-variant-numeric:tabular-nums}
/* auth */
.auth-tiles{display:flex;gap:12px;flex-wrap:wrap;margin:16px 0}
.auth-tile{background:var(--panel);border:1px solid var(--border);border-radius:14px;padding:14px 18px;min-width:160px}
.auth-tile .n{font-size:24px;font-weight:800;font-variant-numeric:tabular-nums}
.auth-tile .n.a-亲历{color:var(--s3)}.auth-tile .n.a-借鉴{color:var(--s4)}.auth-tile .n.a-共识{color:var(--muted)}
.auth-tile .l{font-size:11px;color:var(--muted);margin-top:2px}
.auth-tile .pct{font-size:11px;color:var(--sec);margin-top:1px}
h3.sub{font-size:13px;color:var(--muted);margin:22px 0 10px;text-transform:uppercase;letter-spacing:.5px}
.authbar{display:grid;grid-template-columns:170px 1fr 50px;align-items:center;gap:12px;margin-bottom:8px}
.authbar .lab{font-size:12px;color:var(--sec);text-align:right}
.authbar .stack{height:20px;border-radius:6px;display:flex;overflow:hidden;background:var(--hairline);gap:2px}
.authbar .stack span{height:100%}
.seg-亲历{background:var(--s3)}.seg-借鉴{background:var(--s4)}.seg-共识{background:#4a4a48}
.authbar .tot{font-size:12px;color:var(--ink);font-variant-numeric:tabular-nums}
.auth-legend{display:flex;gap:14px;align-items:center;margin-top:14px;font-size:11px;color:var(--muted);flex-wrap:wrap}
.auth-legend i{width:14px;height:14px;border-radius:3px;display:inline-block;margin-right:5px}
/* ptype */
.ptype{display:grid;grid-template-columns:170px 1fr;gap:12px;align-items:center;margin-bottom:9px}
.ptype .lab{font-size:12px;color:var(--sec);text-align:right}
.ptype .rows{display:flex;flex-direction:column;gap:4px}
.ptype .pr{display:grid;grid-template-columns:36px 1fr 40px;align-items:center;gap:6px;font-size:10px}
.ptype .pn{color:var(--muted)}
.ptype .pt{background:var(--hairline);border-radius:3px;height:12px;overflow:hidden}
.ptype .pf{height:100%;border-radius:3px}
.ptype .pv{color:var(--muted);font-variant-numeric:tabular-nums;text-align:right}
/* dheat */
.dheat{display:grid;grid-template-columns:138px repeat(${CAT_KEYS.length},24px);gap:2px;font-size:10px;width:fit-content;margin:0 auto}
.dheat .ch{color:var(--muted);text-align:center;padding-bottom:4px;writing-mode:vertical-rl;transform:rotate(180deg);height:56px;line-height:1}
.dheat .rh{display:flex;flex-direction:column;justify-content:center;align-items:flex-end;text-align:right;padding-right:6px;line-height:1.1}
.dheat .rh .cl{font-weight:600;color:var(--sec)}
.dheat .rh .ti{font-size:9px;color:var(--muted);margin-top:2px}
.dheat .cell{height:24px;border-radius:4px;cursor:default;transition:transform .12s,filter .12s}
.dheat .cell:hover{transform:scale(1.4);outline:1px solid var(--ink);position:relative;z-index:5;filter:brightness(1.3)}
.foot{color:var(--muted);font-size:11px;border-top:1px solid var(--border);margin-top:36px;padding-top:16px;line-height:1.7}
.foot code{background:var(--panel);padding:1px 5px;border-radius:4px}
@media(max-width:720px){.bar,.authbar{grid-template-columns:120px 1fr 44px}.ptype{grid-template-columns:120px 1fr}.bar .lab,.authbar .lab,.ptype .lab{font-size:10px}}
@keyframes barGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes pop{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:none}}
.bar,.authbar,.ptype,.mbar,.ex{animation:fadeUp .6s ease both}
.mbar .mf{transform-origin:left;animation:barGrow 1s cubic-bezier(.2,.8,.2,1) both}
.authbar .stack{transform-origin:left;animation:barGrow 1.1s cubic-bezier(.2,.8,.2,1) both}
.ptype .pf{transform-origin:left;animation:barGrow 1s cubic-bezier(.2,.8,.2,1) both}
</style>
</head>
<body>
<div class="wrap">
  <div class="head">
    <a class="back" href="../index.html">← 返回总览</a>
    <div class="k">观点数据分析与可视化 · ${N} 位非中国专家</div>
    <h1>如何成为专家 · 观点数据分析</h1>
    <div class="sub">22 位→30 位专家的观点经 17 个能力节点分类标注 + 真实性核验 + 领域分野。本页全部数据预烘焙为静态 HTML，无需 JS 即可查看；悬停可见明细。</div>
  </div>
  <div class="stats">${stats}</div>
  <nav class="toc">
    <a href="#cloud">① 关键词云</a><a href="#consensus">② 共识排名</a><a href="#matrix">③ 专家×节点矩阵</a>
    <a href="#schools">④ 思想学派</a><a href="#demo">⑤ 样本分布</a><a href="#auth">⑥ 真实性核验</a>
    <a href="#ptype">⑦ 实践型 vs 知识型</a><a href="#domain">⑧ 领域分野</a>
  </nav>

  <section id="cloud"><h2><span class="bar-accent"></span>① 关键词云：成为专家的高频概念</h2>
    <div class="lead">词号大小＝持有该能力节点的专家数（共 ${N} 位）。越大的词，越多专家将其视为必要条件。</div>
    <div class="panel"><div class="cloud">${cloud}</div></div></section>

  <section id="consensus"><h2><span class="bar-accent"></span>② 观点共识排名：哪些"必要条件"被最多专家认可</h2>
    <div class="lead">17 个能力节点按持有专家数降序。悬停查看持该观点的专家名单。</div>
    <div class="panel">${bars}</div>
    <div class="note">共识高≠正确，而是"被这批专家广泛认可"。C17（环境机遇）虽仅 4 位，却是对"个人努力论"的重要反题。</div></section>

  <section id="matrix"><h2><span class="bar-accent"></span>③ 专家 × 观点节点矩阵</h2>
    <div class="lead">行＝专家，列＝17 节点。色深＝该专家在该节点的观点条数。色块聚集处即"观点相近的专家群体"。</div>
    <div class="panel"><div class="hwrap"><div class="heat">${heatHead}${heatRows}</div></div>
    <div class="legend"><span>色深＝观点条数</span><span class="sw"><i class="c0"></i>0</span><span class="sw"><i class="c1"></i>1</span><span class="sw"><i class="c2"></i>2</span><span class="sw"><i class="c3"></i>3+</span></div></div></section>

  <section id="schools"><h2><span class="bar-accent"></span>④ 思想学派群体：观点相近的专家聚类</h2>
    <div class="lead">按观点倾向归入 7 个学派（可多重归属）。</div>
    <div class="schools">${schools}</div>
    <div class="legend" style="margin-top:14px">${schoolLegend}</div></section>

  <section id="demo"><h2><span class="bar-accent"></span>⑤ 样本维度分布</h2>
    <div class="lead">30 位专家的画像，便于判断结论适用边界。</div>
    <div class="demo">${demo}</div></section>

  <section id="auth"><h2><span class="bar-accent"></span>⑥ 观点真实性核验：亲历 vs 借鉴 vs 共识</h2>
    <div class="lead">每条观点判定是否基于自身经历/研究/实践（亲历）、显式借用他人（借鉴）、或接近通用常识（共识）。</div>
    <div class="auth-tiles">${authTiles}</div>
    <h3 class="sub">各能力节点的观点真实性构成</h3>
    <div class="panel">${authBars}</div>
    <div class="auth-legend"><span><i style="background:var(--s3)"></i>亲历：自身经历/研究/实践</span><span><i style="background:var(--s4)"></i>借鉴：显式借用（已注明）</span><span><i style="background:#4a4a48"></i>共识：接近通用常识</span></div>
    <div class="note">约 ${(AUTH_STATS['亲历']/totalVP*100).toFixed(0)}% 为亲历型——共识建立于亲历思考而非人云亦云。借鉴型多为显式引用（Munger 引 Jacobi、Godin 引 Jobs、Gladwell 引 Ericsson、Brown 引罗斯福等）。</div></section>

  <section id="ptype"><h2><span class="bar-accent"></span>⑦ 实践型 vs 知识型：成长路径指纹</h2>
    <div class="lead">实践/竞技型 ${pN} 位（友好环境）vs 知识/研究型 ${kN} 位（恶劣环境），按差异降序。差异最大节点即两类路径分野。</div>
    <div class="panel">${ptypeRows}</div>
    <div class="auth-legend"><span><i style="background:var(--s1)"></i>实践/竞技型（${pN}位）</span><span><i style="background:var(--s2)"></i>知识/研究型（${kN}位）</span></div>
    <div class="note">C1 刻意练习：实践型 ${(PTYPE["实践型"].size>0? EXPERTS.filter(e=>PTYPE["实践型"].has(e.id)&&e.viewpoints.some(v=>v.c.includes("C1"))).length/PTYPE["实践型"].size*100:0).toFixed(0)}% vs 知识型 ${(EXPERTS.filter(e=>PTYPE["知识型"].has(e.id)&&e.viewpoints.some(v=>v.c.includes("C1"))).length/PTYPE["知识型"].size*100).toFixed(0)}%；C11 阅读：实践型 ${(EXPERTS.filter(e=>PTYPE["实践型"].has(e.id)&&e.viewpoints.some(v=>v.c.includes("C11"))).length/PTYPE["实践型"].size*100).toFixed(0)}% vs 知识型 ${(EXPERTS.filter(e=>PTYPE["知识型"].has(e.id)&&e.viewpoints.some(v=>v.c.includes("C11"))).length/PTYPE["知识型"].size*100).toFixed(0)}%——移植风险信号，详见报告第五、六章。</div></section>

  <section id="domain"><h2><span class="bar-accent"></span>⑧ 领域分野：策略不能跨场景统一</h2>
    <div class="lead">按"反馈效度"主轴分 3 档 × 9 领域簇。色深＝簇内命中比例。横向看是簇的"策略指纹"，纵向看可见同节点在不同簇的差异。</div>
    <div class="panel"><div class="hwrap"><div class="dheat">${heatHead.replace('class="rhc"','')}${dheatRows}</div></div>
    <div class="legend"><span>色深＝簇内命中比例</span><span class="sw"><i class="c0"></i>0</span><span class="sw"><i class="c1"></i>1–33%</span><span class="sw"><i class="c2"></i>34–66%</span><span class="sw"><i class="c3"></i>67–99%</span><span class="sw"><i class="c4"></i>100%</span></div></div>
    <div class="note">高效度(友好)刻意练习有效；低效度(恶劣)刻意练习反加固错误；中效度(混合)两策略叠加。同档内簇间仍有差异（竞技重偏执重复、工艺创造重实验编码）——详见报告第六章。</div></section>

  <div class="foot">数据源：<code>experts/</code> ${N} 份专家资料 · 分类与真实性核验见 <code>data.js</code>（经 Node 生成器预烘焙为静态 HTML）· 配色通过 dataviz 验证器 CVD/对比度检查。</div>
</div>
</body></html>`;

fs.writeFileSync('analysis/index.html', html, 'utf8');
console.log('analysis/index.html generated:', html.length, 'chars');
