const {harness,test}=require('./payment-regression.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
async function download(h,url){return h.load('app/api/download/route.ts').GET(new Request(url));}
(async()=>{
  await test('Legacy configuration selects the protected AI kit, never the old Drive product',async()=>{
    const h=harness();delete h.state.setting.productSlug;const p=await h.prepare();const o=h.state.orders[0];
    assert.equal(o.package,'AI Creator Kit');assert.ok(o.deliveryUrl.startsWith('https://isolated.test/api/download?'));assert.notEqual(o.deliveryUrl,h.state.setting.productDriveUrl);
    assert.equal(h.state.gatewayOrder.notes.product,'AI Creator Kit');assert.equal((await download(h,o.deliveryUrl)).status,403);
    const r=await h.request('confirm',p);assert.equal(r.body.order.productName,'AI Creator Kit');assert.equal(r.body.purchase.productName,'AI Creator Kit');
    const file=await download(h,r.body.downloadUrl);assert.equal(file.status,200);assert.equal(file.headers.get('content-type'),'application/zip');assert.equal(file.headers.get('cache-control'),'private, no-store');
    const bytes=Buffer.from(await file.arrayBuffer());assert.equal(bytes.readUInt32LE(0),0x04034b50);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),JSON.parse(fs.readFileSync('private/manifest.json','utf8')).sha256);
    assert.equal(h.state.emails[0].productName,'AI Creator Kit');assert.equal(h.state.emails[0].productDriveUrl,r.body.downloadUrl);
  });
  for(const change of ['token','order','refund','package','database'])await test('Protected download blocks '+change,async()=>{
    const h=harness();delete h.state.setting.productSlug;const p=await h.prepare();await h.request('confirm',p);let url=h.state.orders[0].deliveryUrl;
    if(change==='token')url=url.replace(/token=.*/,`token=${'0'.repeat(64)}`);
    if(change==='order')url=url.replace('order=order_1','order=order_999');
    if(change==='refund')h.state.orders[0].status='Refunded';
    if(change==='package')h.state.orders[0].package='Money Saving System';
    if(change==='database')h.state.connected=false;
    assert.ok((await download(h,url)).status>=400);
  });
  await test('Missing archive fails before any gateway order or payment',async()=>{const h=harness();delete h.state.setting.productSlug;h.state.missingArchive=true;const r=await h.create();assert.equal(r.status,503);assert.equal(h.state.gatewayOrder,undefined);assert.equal(h.state.orders.length,0);});
  await test('Historical order, delivery, email and tracking brand survive new settings',async()=>{
    const h=harness(),p=await h.prepare(),o=h.state.orders[0];o.package='Money Saving System';const original=o.deliveryUrl;
    h.state.setting.productDriveUrl='https://drive.google.com/drive/folders/newKit';h.state.setting.basePrice=249;
    const r=await h.request('confirm',p);assert.equal(r.body.downloadUrl,original);assert.equal(r.body.order.productName,'Money Saving System');assert.equal(r.body.purchase.productName,'Money Saving System');assert.equal(r.body.order.amount,199);assert.equal(h.state.emails[0].productName,'Money Saving System');
  });
  await test('Admin can change delivery and price; new orders use saved settings, historical snapshots stay',async()=>{
    const h=harness(),p=await h.prepare(),old=h.state.orders[0].deliveryUrl;const headers={authorization:'Bearer isolated-admin'};
    let r=await h.request('settings',{deliveryMode:'package',basePrice:249},headers);assert.equal(r.status,200);assert.equal(r.body.setting.deliveryMode,'package');
    const second=await h.create();assert.equal(second.body.order.amount,24900);assert.ok(h.state.orders[1].deliveryUrl.includes('/api/download?'));assert.equal(h.state.orders[0].deliveryUrl,old);
    r=await h.request('settings',{deliveryMode:'drive',productDriveUrl:'https://drive.google.com/drive/folders/newKit'},headers);assert.equal(r.status,200);await h.create();assert.equal(h.state.orders[2].deliveryUrl,'https://drive.google.com/drive/folders/newKit');
  });
  await test('Migration prevents activating the previous product link and unsupported mode',async()=>{const h=harness();delete h.state.setting.productSlug;const headers={authorization:'Bearer isolated-admin'},legacy=h.state.setting.productDriveUrl;assert.equal((await h.request('settings',{deliveryMode:'drive',productDriveUrl:legacy},headers)).status,400);assert.equal((await h.request('settings',{deliveryMode:'public'},headers)).status,400);const r=await h.request('settings',{deliveryMode:'package'},headers);assert.equal(r.status,200);assert.equal(r.body.setting.productDriveUrl,'');assert.equal(h.state.setting.previousProductDriveUrl,legacy);assert.equal((await h.request('settings',{deliveryMode:'drive',productDriveUrl:legacy},headers)).status,400);});
  await test('Downloaded archive is outside public files and in deployment tracing',async()=>{assert.ok(!fs.existsSync('public/AI-Creator-Kit.zip'));assert.ok(fs.readFileSync('next.config.mjs','utf8').includes('./private/AI-Creator-Kit-v2.zip'));const page=fs.readFileSync('components/CreatorStorefront.tsx','utf8');assert.ok(!page.includes('Money Saving System'));assert.ok(!page.includes('Testimonials'));assert.ok(!page.includes('Lifetime Access'));});
  console.log('AI Creator Kit migration and protected-delivery checks passed. No live payment or database mutation.');
})().catch(e=>{console.error(e);process.exitCode=1;});
