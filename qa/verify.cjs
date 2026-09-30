/* Isolated regression checks. No network, production DB, payment or email calls. */
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
let passed = 0;
function check(name, fn) { fn(); passed++; console.log(`PASS ${name}`); }
function load(file, mocks = {}, globals = {}) {
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React, esModuleInterop: true } }).outputText;
  const context = { module, exports: module.exports, require: name => { if (name in mocks) return mocks[name]; if (name === 'crypto') return crypto; throw new Error(`Unmocked dependency ${name}`); }, console: { log() {}, warn() {}, error() {} }, Date, Math, Number, JSON, Intl, Response, Request, process: { env: {} }, global: {}, ...globals };
  vm.runInNewContext(code, context, { filename: file });
  return module.exports;
}
const jsonResponse = { NextResponse: { json: (body, options) => new Response(JSON.stringify(body), options) } };
const demo = load('lib/savingsDemo.ts');
check('Expense sequence: 50,000 → 38,000 → 31,200 → 26,700 → 18,700 → 5,300', () => [50000,38000,31200,26700,18700,5300].forEach((n,i) => assert.equal(Math.round(demo.storyBalance(i/5)), n)));
check('Scroll progress is clamped', () => { assert.equal(demo.storyBalance(-1),50000); assert.equal(demo.storyBalance(2),5300); });
check('98 inclusive days produce ₹1,020.41', () => { const p=demo.calculateSavings(100000,0,'2026-12-31','2026-09-25'); assert.equal(p.days,98); assert.equal(p.daily.toFixed(2),'1020.41'); });
check('Opening savings, percentage and daily target', () => { const p=demo.calculateSavings(100000,10000,'2026-12-25','2026-09-27'); assert.equal(p.remaining,90000); assert.equal(p.daily,1000); assert.equal(p.progress,10); });
check('Past dates, blank dates, invalid dates and invalid amounts rejected', () => { for (const args of [[0,0,'2026-12-31','2026-09-27'],[100,-1,'2026-12-31','2026-09-27'],[100,0,'2026-09-26','2026-09-27'],[100,0,'','2026-09-27'],[100,0,'2026-02-30','2026-02-01'],[NaN,0,'2026-12-31','2026-09-27']]) assert.ok(demo.calculateSavings(...args).error); });
check('Today is one day; leap day is counted; completed goal is bounded', () => { assert.equal(demo.calculateSavings(100,0,'2026-09-27','2026-09-27').days,1); assert.equal(demo.calculateSavings(100,0,'2028-03-01','2028-02-28').days,3); const p=demo.calculateSavings(100,120,'2026-09-27','2026-09-27'); assert.equal(p.remaining,0); assert.equal(p.daily,0); assert.equal(p.progress,100); });
check('Partial, missed, full and excess savings carry-forward', () => { for (const [saved,unpaid,next] of [[600,400,1400],[0,1000,2000],[1000,0,1000],[1200,0,1000],[999.99,.01,1000.01]]) { const p=demo.carryForward(1000,saved); assert.equal(p.unpaid,unpaid); assert.equal(p.next,next); } });

console.log(`${passed} savings calculator regression checks passed.`);
