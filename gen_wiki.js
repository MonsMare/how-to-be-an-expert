/* 生成器：静态 wiki/index.html v3 —— 左侧筛选侧栏 + 右侧可展开卡片网格（<details> 无JS可用，筛选为JS增强） */
const D = require('./data.js');
const fs = require('fs');
const {CAT, AUTH, SCHOOLS, EXPERTS, CAT_STATS, DOMAIN, TIERS, CLUSTER_ORDER} = D;
const N = EXPERTS.length;
const INCOME_LABEL = {1:"学者/中产",2:"十万至百万美元",3:"数百万至千万级",4:"千万至亿$",5:"亿美元以上"};
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const splitP = s => s.split('（')[0];
const schoolSlots = {practice:'--s2',thinking:'--s1',mindset:'--s7',strategy:'--s3',generalist:'--s4',action:'--s5',system:'--s6'};

const FIELDS = [...new Set(EXPERTS.map(e=>e.field))];
const TIERS_LIST = ["高效度","中效度","低效度"];
const AGE_LIST = ["30-49","50-64","65+"];
const GENDER_LIST = ["男","女"];
const REGION_LIST = ["西方","中国","日本","古罗马"];
const COUNTRY_LIST = [...new Set(EXPERTS.map(e=>e.countryWork))];
function dimCount(dim,val){
  return EXPERTS.filter(e=>{
    if(dim==="field")return e.field===val;
    if(dim==="age")return e.ageBracket===val;
    if(dim==="income")return e.incomeTier===val;
    if(dim==="gender")return e.gender===val;
    if(dim==="region")return e.region===val;
    if(dim==="country")return e.countryWork===val;
    if(dim==="school")return e.schools.includes(val);
    if(dim==="tier")return DOMAIN[e.id].tier===val;
    if(dim==="cluster")return DOMAIN[e.id].cluster===val;
  }).length;
}
function chips(dim,vals,map){
  return vals.map(v=>`<span class="chip" data-dim="${dim}" data-val="${esc(String(v))}">${map?map(v):esc(String(v))}<i>${dimCount(dim,v)}</i></span>`).join('');
}
const dimsHtml = [
  ["field","从事领域",FIELDS,null],
  ["tier","反馈效度",TIERS_LIST,null],
  ["cluster","领域簇",CLUSTER_ORDER,null],
  ["school","思想学派",Object.keys(SCHOOLS),v=>splitP(SCHOOLS[v])],
  ["age","年龄段",AGE_LIST,v=>v+"岁"],
  ["income","年收入",[1,2,3,4,5],v=>INCOME_LABEL[v]],
  ["gender","性别",GENDER_LIST,null],
  ["country","国别（执业）",COUNTRY_LIST,null],
  ["region","文化圈",REGION_LIST,null],
].map(([k,label,vals,map])=>`<div class="dim"><span class="dl">${label}</span><div class="chips">${chips(k,vals,map)}</div></div>`).join('');

const cards = EXPERTS.map(e=>{
  const schools = e.schools.map(s=>`<span class="tag s-${s}">${esc(splitP(SCHOOLS[s]))}</span>`).join('');
  const vps = e.viewpoints.map(v=>`
    <div class="vp-item"><div class="vt">${esc(v.t)}<span class="vauth ${v.auth}" title="${esc(AUTH[v.auth])}">${v.auth}</span></div>
    <div class="vd">${esc(v.d)}</div><div class="vverify">${esc(v.verify)}</div>
    <div class="vcats">${v.c.map(c=>`<span class="c">${c}·${esc(splitP(CAT[c]))}</span>`).join('')}</div></div>`).join('');
  return `<details class="card" data-field="${esc(e.field)}" data-tier="${esc(DOMAIN[e.id].tier)}" data-cluster="${esc(DOMAIN[e.id].cluster)}" data-age="${esc(e.ageBracket)}" data-income="${e.incomeTier}" data-gender="${esc(e.gender)}" data-region="${esc(e.region)}" data-country="${esc(e.countryWork)}" data-schools="${esc(e.schools.join(','))}">
    <summary><div class="row1"><span class="nm">${esc(e.nameZh)}<small>${esc(e.name)}</small></span><span class="reg">${esc(e.countryBirth)}→${esc(e.countryWork)}</span><span class="chev"></span></div>
    <div class="row2"><span class="field">${esc(e.field)}</span><span class="sep">·</span><span>${e.ageBracket}岁</span><span class="sep">·</span><span>${e.viewpoints.length}条观点</span></div></summary>
    <div class="body">
      <div class="facts">
        <div><span>性别</span><b>${esc(e.gender)}</b></div><div><span>国别（出生→执业）</span><b>${esc(e.countryBirth)}→${esc(e.countryWork)}</b></div><div><span>年收入</span><b>${esc(e.income)}</b></div>
        <div><span>反馈效度</span><b>${esc(DOMAIN[e.id].tier)}</b></div><div><span>领域簇</span><b>${esc(DOMAIN[e.id].cluster)}</b></div>
        <div><span>思想学派</span><b class="sch">${esc(e.schools.map(s=>splitP(SCHOOLS[s])).join('、'))}</b></div>
        <div class="facts-tags">${schools}</div>
      </div>
      <div class="bio">${esc(e.bio)}</div>
      <div class="vps">${vps}</div>
      <a class="mdlink" href="../${e.file}" target="_blank">查看完整资料（含原话原材料）→</a>
    </div>
  </details>`;
}).join('');

const html = `<!DOCTYPE html>
<html lang="zh-CN" data-theme="dark">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>如何成为专家 · 多维分类 Wiki</title>
<style>
:root{--page:#0a0b0e;--surface:#15171c;--panel:#1a1d24;--panel2:#21252e;--border:rgba(255,255,255,.08);--border2:rgba(255,255,255,.14);--ink:#fff;--sec:#c7ccd6;--muted:#8a93a3;--s1:#3987e5;--s2:#d95926;--s3:#199e70;--s4:#c98500;--s5:#d55181;--s7:#9085e9;--grad:linear-gradient(135deg,#3987e5,#9085e9)}
*{box-sizing:border-box;margin:0;padding:0}
body{background:radial-gradient(1200px 600px at 70% -10%,#1a2233 0,transparent 60%),var(--page);color:var(--ink);font-family:system-ui,-apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;font-size:14px;line-height:1.6}
a{color:var(--s1);text-decoration:none}
.topbar{max-width:1400px;margin:24px auto 0;display:flex;align-items:center;gap:18px;flex-wrap:wrap;background:linear-gradient(135deg,rgba(57,135,229,.12),rgba(144,133,233,.08));border:1px solid var(--border);border-radius:18px;padding:16px 24px;position:relative;animation:fadeUp .6s ease both}
.topbar h1{font-size:22px;font-weight:800}.topbar h1 .sub{color:var(--muted);font-weight:400;font-size:13px;margin-left:8px}
.topbar .meta{color:var(--muted);font-size:12px}
.topbar .meta b{color:var(--s3)}
.back-home{margin-left:auto;font-size:12px;color:var(--muted);padding:6px 12px;border:1px solid var(--border);border-radius:8px;transition:.15s}
.back-home:hover{color:var(--ink);border-color:var(--muted)}
.main{max-width:1400px;margin:0 auto;padding:18px 22px 90px;display:grid;grid-template-columns:296px 1fr;gap:18px;align-items:start}
/* sidebar */
.sidebar{position:sticky;top:16px;max-height:calc(100vh - 32px);overflow-y:auto;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:16px 18px;box-shadow:0 10px 30px rgba(0,0,0,.25);animation:fadeUp .5s ease both}
.sidebar::-webkit-scrollbar{width:6px}.sidebar::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px}
.s-head{display:flex;align-items:center;justify-content:space-between;font-size:13px;font-weight:700;padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid var(--border)}
.s-head .cnt{font-size:11px;color:var(--muted);font-weight:400}.s-head .cnt b{color:var(--s3)}
.dim{margin-bottom:12px}
.dl{display:block;font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;margin-bottom:5px}
.chips{display:flex;flex-wrap:wrap;gap:4px}
.chip{background:var(--panel2);border:1px solid var(--border);color:var(--sec);padding:3px 9px;border-radius:12px;font-size:11px;cursor:pointer;user-select:none;transition:.15s}
.chip:hover{border-color:var(--s1);color:var(--ink)}
.chip.on{background:var(--s1);border-color:var(--s1);color:#fff}
.chip i{opacity:.55;font-size:9px;margin-left:3px;font-style:normal}
.reset{width:100%;margin-top:4px;background:transparent;border:1px dashed var(--border);color:var(--muted);padding:7px;border-radius:10px;font-size:12px;cursor:pointer;transition:.15s}
.reset:hover{color:var(--ink);border-color:var(--muted)}
/* content */
.content{min-width:0}
.count{color:var(--muted);font-size:12px;margin:2px 2px 12px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}
.card{background:var(--panel);border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:border-color .15s,transform .15s;box-shadow:0 8px 24px rgba(0,0,0,.22);animation:fadeUp .5s ease both}
.card:hover{border-color:var(--s1);transform:translateY(-1px)}
.card[open]{border-color:var(--s1)}
.card summary{list-style:none;cursor:pointer;padding:14px 16px}
.card summary::-webkit-details-marker{display:none}
.card summary .row1{display:flex;align-items:center;gap:8px}
.card .nm{font-weight:700;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.card .nm small{color:var(--muted);font-size:11px;font-weight:400;margin-left:5px}
.card .reg{margin-left:auto;flex-shrink:0;font-size:9px;color:var(--muted);border:1px solid var(--border);padding:1px 6px;border-radius:8px}
.card .chev{flex-shrink:0;width:18px;height:18px;border-radius:50%;background:var(--panel2);border:1px solid var(--border);position:relative;transition:transform .2s}
.card[open] .chev{transform:rotate(180deg)}
.card .chev::after{content:"";position:absolute;top:50%;left:50%;width:5px;height:5px;border-right:1.5px solid var(--sec);border-bottom:1.5px solid var(--sec);transform:translate(-50%,-70%) rotate(45deg)}
.card summary .row2{display:flex;align-items:center;gap:6px;margin-top:7px;font-size:11px;color:var(--muted)}
.card summary .row2 .field{color:var(--s1)}
.card summary .row2 .sep{opacity:.4}
.body{padding:0 16px 16px;border-top:1px solid var(--border);animation:fadeIn .25s ease}
.facts{display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;margin:12px 0}
.facts>div{font-size:11px;display:flex;justify-content:space-between;gap:8px;border-bottom:1px dashed var(--border);padding-bottom:4px}
.facts span{color:var(--muted);flex-shrink:0}
.facts b{color:var(--sec);text-align:right;font-weight:500}
.facts b.sch{font-size:10px}
.facts-tags{display:flex;gap:4px;justify-content:flex-end;flex-wrap:wrap;border-bottom:none!important}
.tag{font-size:9px;padding:1px 6px;border-radius:7px}
.s-practice{color:#f87171;background:#332023}.s-thinking{color:#60a5fa;background:#1a2433}.s-mindset{color:#c084fc;background:#2a1d33}.s-strategy{color:#34d399;background:#13302a}.s-generalist{color:#fbbf24;background:#332a14}.s-action{color:#f472b6;background:#331f2a}.s-system{color:#5eead4;background:#14302a}
.bio{color:var(--sec);font-size:12px;margin:10px 0;border-left:2px solid var(--s1);padding-left:10px}
.vps{margin-top:8px}
.vp-item{background:var(--panel2);border:1px solid var(--border);border-radius:8px;padding:8px 10px;margin-bottom:7px}
.vp-item .vt{font-weight:600;font-size:12.5px}
.vp-item .vd{color:var(--muted);font-size:11.5px;margin-top:2px}
.vp-item .vverify{font-size:10.5px;color:var(--muted);margin-top:2px;font-style:italic}
.vp-item .vverify::before{content:"核验｜";font-style:normal}
.vp-item .vcats{margin-top:4px;display:flex;gap:3px;flex-wrap:wrap}
.vp-item .c{font-size:9.5px;padding:0 5px;border-radius:5px;background:var(--panel);color:var(--s1);border:1px solid var(--border)}
.vauth{display:inline-block;margin-left:6px;font-size:9.5px;padding:0 5px;border-radius:5px;font-weight:600}
.vauth.亲历{background:#13302a;color:#34d399;border:1px solid #199e70}.vauth.借鉴{background:#332a14;color:#fbbf24;border:1px solid #c98500}.vauth.共识{background:#262626;color:#9a9892;border:1px solid #383835}
.mdlink{display:inline-block;margin-top:10px;padding:7px 14px;background:linear-gradient(90deg,var(--s1),var(--s7));color:#fff;border-radius:8px;font-size:12px;transition:filter .15s}
.mdlink:hover{filter:brightness(1.15)}
.card.hidden{display:none}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@media(max-width:920px){.main{grid-template-columns:1fr}.sidebar{position:static;max-height:none}.back-home{margin-left:0}}
</style></head>
<body>
<div class="topbar">
  <h1>如何成为专家 · 多维分类 Wiki<span class="sub">${N} 位非中国专家</span></h1>
  <div class="meta">从任意维度切入筛选 · 点击卡片展开全部观点（含真实性标签）</div>
  <a class="back-home" href="../index.html">← 返回总览</a>
</div>
<div class="main">
  <aside class="sidebar">
    <div class="s-head">筛选维度<span class="cnt">当前 <b id="curN">${N}</b>/${N} 位</span></div>
    ${dimsHtml}
    <button class="reset">清空筛选</button>
  </aside>
  <div class="content">
    <div class="count" id="count">共 ${N} 位专家 · 点击卡片展开详情</div>
    <div class="grid" id="grid">${cards}</div>
  </div>
</div>
<script>
const sel={};
document.querySelectorAll('.chip').forEach(c=>{
  c.onclick=()=>{
    const d=c.dataset.dim,v=c.dataset.val;
    sel[d]=sel[d]||new Set();
    if(sel[d].has(v)){sel[d].delete(v);c.classList.remove('on');}else{sel[d].add(v);c.classList.add('on');}
    applyFilters();
  };
});
document.querySelector('.reset').onclick=()=>{Object.keys(sel).forEach(k=>sel[k].clear());document.querySelectorAll('.chip.on').forEach(c=>c.classList.remove('on'));applyFilters();};
function matchDim(card,dim,val){
  if(dim==="field")return card.dataset.field===val;
  if(dim==="tier")return card.dataset.tier===val;
  if(dim==="cluster")return card.dataset.cluster===val;
  if(dim==="age")return card.dataset.age===val;
  if(dim==="income")return card.dataset.income===val;
  if(dim==="gender")return card.dataset.gender===val;
  if(dim==="region")return card.dataset.region===val;
  if(dim==="country")return card.dataset.country===val;
  if(dim==="school")return card.dataset.schools.split(',').includes(val);
}
function applyFilters(){
  let vis=0;
  document.querySelectorAll('.card').forEach(card=>{
    let ok=true;
    for(const d in sel){if(sel[d].size===0)continue;let m=false;for(const v of sel[d]){if(matchDim(card,d,v)){m=true;break;}}if(!m){ok=false;break;}}
    card.classList.toggle('hidden',!ok);if(ok)vis++;
  });
  document.getElementById('curN').textContent=vis;
  document.getElementById('count').textContent='共 '+vis+' 位专家 · 点击卡片展开详情';
}
</script>
</body></html>`;
fs.writeFileSync('wiki/index.html', html, 'utf8');
console.log('wiki/index.html generated:', html.length, 'chars');
