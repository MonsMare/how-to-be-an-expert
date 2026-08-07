// 校验 data.js v3：中国专家、国别字段、观点数
const D = require('../data.js');
const out = [];
out.push('N = ' + D.EXPERTS.length);
out.push('中国专家 = ' + D.EXPERTS.filter(e => e.region === '中国').map(e => e.nameZh).join(', '));
out.push('ericsson: ' + D.EXPERTS.find(e => e.id === 'ericsson').countryBirth + ' → ' + D.EXPERTS.find(e => e.id === 'ericsson').countryWork);
out.push('杨振宁: ' + D.EXPERTS.find(e => e.id === 'yangzhenning').countryBirth + ' → ' + D.EXPERTS.find(e => e.id === 'yangzhenning').countryWork);
out.push('李小龙: ' + D.EXPERTS.find(e => e.id === 'brucelee').countryBirth + ' → ' + D.EXPERTS.find(e => e.id === 'brucelee').countryWork);
out.push('总观点 = ' + D.EXPERTS.reduce((s, e) => s + e.viewpoints.length, 0));
out.push('DOMAIN xiaolai = ' + D.DOMAIN['xiaolai'].cluster + ' / ' + D.DOMAIN['xiaolai'].tier);
out.push('DOMAIN yaoming = ' + D.DOMAIN['yaoming'].cluster + ' / ' + D.DOMAIN['yaoming'].tier);
out.push('缺国别字段的专家 = ' + D.EXPERTS.filter(e => !e.countryBirth || !e.countryWork).map(e => e.id).join(',') || '(无)');
out.push('每人观点数范围 = ' + Math.min(...D.EXPERTS.map(e => e.viewpoints.length)) + '-' + Math.max(...D.EXPERTS.map(e => e.viewpoints.length)));
const fs = require('fs');
fs.writeFileSync(__dirname + '/_v3check.txt', out.join('\n'), 'utf8');
console.log('OK');
