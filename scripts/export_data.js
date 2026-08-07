// 从 data.js 导出结构化数据为 JSON，供图表生成脚本使用
const D = require('../data.js');
const fs = require('fs');
const { CAT, AUTH, SCHOOLS, EXPERTS, CAT_STATS, AUTH_STATS, DOMAIN, TIERS, CLUSTER_ORDER } = D;

const N = EXPERTS.length;
const totalVP = EXPERTS.reduce((s, e) => s + e.viewpoints.length, 0);

const out = {
  meta: {
    nExperts: N,
    totalViewpoints: totalVP,
    nCats: Object.keys(CAT).length,
    nSchools: Object.keys(SCHOOLS).length,
    nClusters: CLUSTER_ORDER.length,
  },
  CAT,
  AUTH,
  SCHOOLS,
  CAT_STATS,
  AUTH_STATS,
  TIERS,
  CLUSTER_ORDER,
  DOMAIN,
  experts: EXPERTS.map(e => ({
    id: e.id, name: e.name, nameZh: e.nameZh, gender: e.gender,
    birth: e.birth, died: e.died, age: e.age, ageBracket: e.ageBracket,
    field: e.field, income: e.income, incomeTier: e.incomeTier, region: e.region,
    countryBirth: e.countryBirth, countryWork: e.countryWork,
    schools: e.schools,
    viewpoints: e.viewpoints.map(v => ({ t: v.t, c: v.c, auth: v.auth })),
  })),
};

fs.writeFileSync(__dirname + '/../report/data_export.json', JSON.stringify(out, null, 1), 'utf8');
console.log('OK', out.meta);
