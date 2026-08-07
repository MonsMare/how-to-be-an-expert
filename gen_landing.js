/* 生成器：静态落地页 index.html（无 JS 依赖） */
const D = require('./data.js');
const fs = require('fs');
const {CAT, EXPERTS, CAT_STATS} = D;
const N = EXPERTS.length;
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const splitP = s => s.split('（')[0];

const topChips = Object.keys(CAT).map(k=>({name:CAT[k],count:CAT_STATS[k].count}))
  .sort((a,b)=>b.count-a.count).slice(0,8)
  .map(s=>`<span><b>${s.count}</b> ${esc(splitP(s.name))}</span>`).join('');

const exlist = EXPERTS.map(e=>
  `<a class="ex" href="${e.file}">${esc(e.nameZh)}<span class="f">${esc(e.field)} · ${e.countryBirth}→${e.countryWork}</span></a>`).join('');

const html = `<!DOCTYPE html>
<html lang="zh-CN" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>如何成为专家 · 研究工程</title>
<style>
:root{--page:#0a0b0e;--surface:#15171c;--panel:#1a1d24;--border:rgba(255,255,255,.08);--border2:rgba(255,255,255,.14);--ink:#fff;--sec:#c7ccd6;--muted:#8a93a3;--s1:#3987e5;--s3:#199e70;--s4:#c98500;--s5:#d55181;--s7:#9085e9;--grad:linear-gradient(135deg,#3987e5,#9085e9)}
*{box-sizing:border-box;margin:0;padding:0}
body{background:radial-gradient(1200px 600px at 70% -10%,#1a2233 0,transparent 60%),var(--page);color:var(--ink);font-family:system-ui,-apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;line-height:1.7}
.hero{max-width:1040px;margin:0 auto;padding:60px 22px 10px}
.hero .k{color:var(--s1);font-size:12px;letter-spacing:2px;text-transform:uppercase}
.hero h1{font-size:38px;font-weight:800;margin:10px 0 8px;line-height:1.2;background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.hero p{color:var(--sec);font-size:15px;max-width:780px}
.wrap{max-width:1040px;margin:0 auto;padding:10px 22px 70px}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;margin:28px 0 36px}
.card{background:var(--panel);border:1px solid var(--border);border-radius:16px;padding:22px 24px;text-decoration:none;color:inherit;transition:transform .15s,border-color .15s;position:relative;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.25);animation:fadeUp .6s ease both}
.card::before{content:"";position:absolute;top:0;left:0;width:3px;height:100%}
.card.k1::before{background:var(--s1)}.card.k2::before{background:var(--s3)}.card.k3::before{background:var(--s4)}.card.k4::before{background:var(--s5)}
.card:hover{transform:translateY(-3px);border-color:var(--border2)}
.card .num{font-size:11px;color:var(--muted);letter-spacing:1px}
.card h3{font-size:17px;margin:6px 0 8px}
.card p{font-size:13px;color:var(--sec)}
.card .go{color:var(--s1);font-size:12px;margin-top:10px;display:block}
.findings{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:22px 26px;margin:26px 0 42px}
.findings h2{font-size:16px;margin-bottom:12px;border-bottom:1px solid var(--border);padding-bottom:8px}
.findings ol{margin:8px 0 0 18px}
.findings li{margin:5px 0;font-size:13px;color:var(--sec)}
.findings li b{color:var(--ink)}
.findings .top{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.findings .top span{font-size:12px;background:var(--panel);border:1px solid var(--border);padding:4px 11px;border-radius:8px;color:var(--sec)}
.findings .top span b{color:var(--s1)}
h2.sec{font-size:18px;margin:38px 0 14px;border-bottom:1px solid var(--border);padding-bottom:8px}
.exlist{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:8px}
.ex{background:var(--panel);border:1px solid var(--border);border-radius:10px;padding:10px 13px;text-decoration:none;color:var(--sec);font-size:13px;transition:.12s;animation:fadeUp .5s ease both}
.ex:hover{border-color:var(--s1);color:var(--ink);transform:translateY(-1px)}
.ex .f{font-size:10px;color:var(--muted);display:block;margin-top:2px}
.foot{color:var(--muted);font-size:12px;border-top:1px solid var(--border);margin-top:42px;padding-top:16px;line-height:1.7}
.foot code{background:var(--panel);padding:1px 5px;border-radius:4px}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.hero{animation:fadeUp .8s ease both}
.findings{animation:fadeUp .7s ease both}
</style>
</head>
<body>
<div class="hero">
  <div class="k">研究工程 · how-to-be-an-expert</div>
  <h1>如何成为一个专家？</h1>
  <p>跨八域、${N} 位中外专家的深度研究工程（含 15 位中国专家；国别维度记录出生国→主要执业国）。先广采（专家原话与观点），再细织（多维分类 Wiki），又精析（观点共识与聚类可视化 + 真实性核验 + 领域分野），终深挖（思想报告与实验汇报书）。目的：找到"成为专家"的通用能力框架与必要条件，而非堆砌成功学语录。</p>
</div>
<div class="wrap">
  <div class="cards">
    <a class="card k1" href="wiki/index.html"><div class="num">第一步·广 + 第二步·细</div><h3>专家资料 & 多维 Wiki</h3><p>${N} 位专家的背景、原话、提炼观点与研究者思考。按领域/年龄/收入/性别/国别/文化圈/学派/反馈效度/领域簇九维筛选浏览。</p><span class="go">进入 Wiki →</span></a>
    <a class="card k2" href="analysis/index.html"><div class="num">第三步·精</div><h3>观点数据分析与可视化</h3><p>17 节点共识排名、专家×观点热力矩阵、思想学派聚类、真实性核验、实践型vs知识型、领域分野八项可视化。</p><span class="go">查看分析 →</span></a>
    <a class="card k3" href="report/index.html"><div class="num">第四步·深</div><h3>深度思想报告</h3><p>直答三问：如何成长为专家、专家必备思维模式、专家如何获得时间自由；含实践型vs知识型分野与领域分野两章。</p><span class="go">阅读报告 →</span></a>
    <a class="card k4" href="README.md"><div class="num">说明</div><h3>项目 README</h3><p>工程结构、方法论、数据来源与局限、如何本地浏览。</p><span class="go">查看说明 →</span></a>
  </div>
  <div class="findings">
    <h2>核心发现</h2>
    <ol>
      <li><b>跨领域存在通用结构</b>：${N} 位中外专家横跨八域，在"长期复利积累"上共识最高（${CAT_STATS.C2.count}/${N}），其次"刻意练习"（${CAT_STATS.C1.count}）、"教学外化"（${CAT_STATS.C16.count}）、"过程导向"（${CAT_STATS.C15.count}）、"成长思维"（${CAT_STATS.C7.count}）。</li>
      <li><b>成为专家 = 方向×复利×反馈×心性</b>的自运转系统，天赋只决定初始斜率，系统决定终点。</li>
      <li><b>观点真实性核验</b>：约 ${(D.AUTH_STATS['亲历']/D.EXPERTS.reduce((s,e)=>s+e.viewpoints.length,0)*100).toFixed(0)}% 观点为亲历型（基于自身经历/研究/实践），约 ${(D.AUTH_STATS['借鉴']/D.EXPERTS.reduce((s,e)=>s+e.viewpoints.length,0)*100).toFixed(0)}% 为显式借鉴，仅极少数为通用常识——共识建立于亲历思考而非人云亦云。</li>
      <li><b>实践型 vs 知识型分野</b>（报告第五章）：两类专家成长路径有根本差异，根源是领域反馈结构；实践型策略放进知识型环境会变劣势（移植悖论）。</li>
      <li><b>领域分野</b>（报告第六章）：策略效果不能跨场景统一，须先按"反馈效度"（高/中/低）做垂直分野，再匹配策略。</li>
    </ol>
    <div class="top">${topChips}</div>
  </div>
  <h2 class="sec">${N} 位专家 · 直接资料</h2>
  <div class="exlist">${exlist}</div>
  <div class="foot">
    工程目录：<code>how-to-be-an-expert/</code> · 专家资料 <code>experts/</code> · Wiki <code>wiki/</code> · 分析 <code>analysis/</code> · 报告 <code>report/</code> · 数据集 <code>data.js</code><br>
    全部页面数据预烘焙为静态 HTML（Node 生成器 <code>gen_*.js</code>），无需 JS 即可查看 · 配色通过 dataviz 验证器 CVD/对比度检查。
  </div>
</div>
</body></html>`;
fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html generated:', html.length, 'chars');
