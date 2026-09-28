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

(async () => {
  const memory = { globalMemorySettings: { basePrice: 321, bumpPrice: 99, productDriveUrl: 'https://example.test/download', adminPin: 'test-only-pin' }, memoryOrders: [] };
  const emails = [], persisted = [];
  const baseMocks = { 'next/server': jsonResponse, '@/lib/dbConnect': async () => null, '@/models/Order': { create: async data => persisted.push(data), findOneAndUpdate: async (...args) => persisted.push(args) }, '@/models/Setting': {}, '@/lib/sendProductEmail': { sendProductEmail: async data => { emails.push(data); return { success:true }; } } };
  let gatewayOptions;
  class Gateway { constructor() { this.orders={create:async options => {gatewayOptions=options;return {id:'order_test_only'}}}; } }
  const create = load('app/api/create-order/route.ts', {...baseMocks, razorpay:Gateway}, {global:memory,process:{env:{RAZORPAY_KEY_ID:'rzp_test_isolated',RAZORPAY_KEY_SECRET:'test-only'}}});
  const created = await (await create.POST(new Request('https://example.test/api/create-order',{method:'POST',body:JSON.stringify({amount:1,notes:{fullName:'Test Buyer',email:'buyer@example.test',phone:'0000000000'}})}))).json();
  check('Existing create-order uses settings price, ignoring submitted amount',()=>{assert.equal(created.order.amount,32100);assert.equal(gatewayOptions.amount,32100);assert.equal(created.order.isRealRazorpayOrder,true);});
  const confirm = load('app/api/confirm-payment/route.ts',baseMocks,{global:memory});
  const payload={orderId:'order_test_only',paymentId:'pay_test_only',status:'Captured',name:'Test Buyer',email:'buyer@example.test',phone:'0000000000',amount:321,package:'Money Saving 3-in-1 Bundle'};
  const confirmed = await (await confirm.POST(new Request('https://example.test/api/confirm-payment',{method:'POST',body:JSON.stringify(payload)}))).json();
  check('Existing confirmation stores order and returns configured delivery link',()=>{assert.equal(confirmed.success,true);assert.equal(confirmed.downloadUrl,memory.globalMemorySettings.productDriveUrl);assert.equal(memory.memoryOrders.length,1);assert.equal(memory.memoryOrders[0].amount,321);assert.equal(emails.length,1);assert.equal(emails[0].toEmail,payload.email);});
  await confirm.POST(new Request('https://example.test/api/confirm-payment',{method:'POST',body:JSON.stringify({...payload,status:'Failed'})}));
  check('Existing failure updates same order without dispatching another email',()=>{assert.equal(memory.memoryOrders.length,1);assert.equal(memory.memoryOrders[0].status,'Failed');assert.equal(emails.length,1);});
  const missing=await confirm.POST(new Request('https://example.test/api/confirm-payment',{method:'POST',body:'{}'}));
  check('Missing order/payment identifiers are rejected',()=>assert.equal(missing.status,400));
  const hook=load('app/api/webhook/razorpay/route.ts',baseMocks,{process:{env:{RAZORPAY_WEBHOOK_SECRET:'test-secret'}}});
  const event=JSON.stringify({event:'payment.captured',payload:{payment:{entity:{id:'pay_test',order_id:'order_test',email:'buyer@example.test',contact:'0000000000'}}}});
  const bad=await hook.POST(new Request('https://example.test/webhook',{method:'POST',headers:{'x-razorpay-signature':'invalid'},body:event}));
  const signature=crypto.createHmac('sha256','test-secret').update(event).digest('hex');
  const good=await hook.POST(new Request('https://example.test/webhook',{method:'POST',headers:{'x-razorpay-signature':signature},body:event}));
  check('Existing webhook rejects incorrect HMAC and accepts correct HMAC',()=>{assert.equal(bad.status,400);assert.equal(good.status,200);assert.equal(persisted.length,1);});

  // Exercise the actual checkout component with isolated hook, fetch and SDK adapters.
  const slots=[], effects=[], events=[], requests=[]; let cursor=0, options, failedHandler;
  const React={createElement:(type,props,...children)=>({type,props:props||{},children:children.flat(Infinity)}),useState:initial=>{const i=cursor++;if(!(i in slots))slots[i]=initial;return [slots[i],v=>{slots[i]=v;}];},useEffect:fn=>{if(!effects.length)effects.push(fn);}};
  class SDK {constructor(opts){options=opts;}on(name,fn){if(name==='payment.failed')failedHandler=fn;}open(){events.push('gateway-open');}}
  const checkoutFetch=async(url,init)=>{requests.push({url,body:init?.body?JSON.parse(init.body):null});return {ok:true,json:async()=>url==='/api/admin/settings'?{success:true,setting:{basePrice:321,productDriveUrl:'https://example.test/download'}}:url==='/api/create-order'?{success:true,order:{id:'order_test',key:'rzp_test_isolated',amount:32100,currency:'INR',isRealRazorpayOrder:true}}:{success:true,downloadUrl:'https://example.test/confirmed-download'}};};
  const component=load('components/CheckoutSection.tsx',{react:React,'lucide-react':new Proxy({},{get:(_,key)=>String(key)}),'@/lib/metaPixel':{trackMetaEvent:(...args)=>events.push(args),trackMetaPurchase:(...args)=>events.push(['Purchase',...args])}},{window:{Razorpay:SDK},fetch:checkoutFetch});
  const render=()=>{cursor=0;return component.CheckoutSection();};
  function find(tree,predicate){if(!tree||typeof tree!=='object')return null;if(predicate(tree))return tree;for(const child of tree.children||[]){const found=find(child,predicate);if(found)return found;}return null;}
  render();effects[0]();await new Promise(r=>setImmediate(r));
  for(const [id,value] of [['checkout-name','Test Buyer'],['checkout-phone','0000000000'],['checkout-email','buyer@example.test']])find(render(),n=>n.props.id===id).props.onChange({target:{value}});
  await find(render(),n=>n.type==='form').props.onSubmit({preventDefault(){}});
  check('Actual checkout sends admin price, buyer details and opens existing SDK',()=>{assert.equal(requests.find(r=>r.url==='/api/create-order').body.amount,321);assert.equal(options.order_id,'order_test');assert.equal(options.prefill.email,'buyer@example.test');assert.ok(events.includes('gateway-open'));});
  await failedHandler({error:{description:'Test decline',metadata:{payment_id:'pay_declined'}}});
  check('Actual checkout failure calls existing confirmation route with Failed status',()=>assert.equal(requests.filter(r=>r.url==='/api/confirm-payment').at(-1).body.status,'Failed'));
  await options.handler({razorpay_payment_id:'pay_success'});
  check('Actual checkout success retains delivery, receipt and analytics hooks',()=>{assert.equal(requests.filter(r=>r.url==='/api/confirm-payment').at(-1).body.status,'Captured');assert.ok(find(render(),n=>n.type==='a'&&n.props.href==='https://example.test/confirmed-download'));assert.ok(events.some(e=>Array.isArray(e)&&e[0]==='Purchase'));});
  console.log(`\n${passed} isolated regression checks passed. No live payment, DB write or email was made.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
