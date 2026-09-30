// Read-only configuration audit. Never outputs values or private delivery URLs.
const {loadEnvConfig}=require('@next/env');loadEnvConfig(process.cwd());
const mongoose=require('mongoose');
(async()=>{
 console.log('Environment presence:',Object.fromEntries(['MONGODB_URI','RAZORPAY_KEY_ID','RAZORPAY_KEY_SECRET','RAZORPAY_WEBHOOK_SECRET','SMTP_HOST','SMTP_PORT','SMTP_USER','SMTP_PASS','NEXT_PUBLIC_META_PIXEL_ID'].map(k=>[k,!!process.env[k]])));
 if(!process.env.MONGODB_URI){console.log('Database audit unavailable: missing configuration');return;}
 try{
  await mongoose.connect(process.env.MONGODB_URI,{serverSelectionTimeoutMS:5000,autoIndex:false});
  const s=await mongoose.connection.db.collection('settings').findOne({}, {projection:{basePrice:1,metaPixelId:1,adminPin:1,productDriveUrl:1}});
  console.log('Database read-only audit:',{settingsPresent:!!s,priceIs199:s?.basePrice===199,pixelNormalizesToExpected:typeof s?.metaPixelId==='string'&&s.metaPixelId.trim()==='1661133268328575',pinConfigured:!!s?.adminPin,deliveryConfigured:typeof s?.productDriveUrl==='string'&&/^https:\/\/(drive|docs)\.google\.com\//.test(s.productDriveUrl)&&!/sample/i.test(s.productDriveUrl)});
  if(s?.productDriveUrl&&!/sample/i.test(s.productDriveUrl)){
   try{const r=await fetch(s.productDriveUrl,{signal:AbortSignal.timeout(15000)});const html=await r.text();console.log('Google Drive unauthenticated read-only check:',{httpStatus:r.status,loginRequired:/accounts\.google\.com\/ServiceLogin/.test(r.url),excelMention:/\.xlsx|\.xls\b/i.test(html),pdfMention:/\.pdf/i.test(html),savingMention:/saving/i.test(html),guideMention:/guide/i.test(html),challengeMention:/challenge/i.test(html),zipMention:/\.zip/i.test(html),folderLink:/\/folders\//.test(s.productDriveUrl)});
    const fileId = s.productDriveUrl.match(/\/file\/d\/([A-Za-z0-9_-]+)/)?.[1];
    if(fileId){
      const download=await fetch('https://drive.usercontent.google.com/download?id='+encodeURIComponent(fileId)+'&export=download',{signal:AbortSignal.timeout(30000)});
      const buffer=Buffer.from(await download.arrayBuffer());
      if(buffer.length>=4&&buffer.readUInt32LE(0)===0x04034b50){
        const names=[];for(let i=0;i<buffer.length-46;i++){if(buffer.readUInt32LE(i)===0x02014b50){const len=buffer.readUInt16LE(i+28),extra=buffer.readUInt16LE(i+30),comment=buffer.readUInt16LE(i+32);names.push(buffer.subarray(i+46,i+46+len).toString('utf8'));i+=45+len+extra+comment;}}
        console.log('Configured Drive ZIP read-only contents:',{excelFiles:names.filter(n=>/\.xlsx?$/i.test(n)).length,pdfFiles:names.filter(n=>/\.pdf$/i.test(n)).length,trackerPresent:names.some(n=>/tracker.*\.xlsx?$|\.xlsx?$/i.test(n)),challengesPresent:names.some(n=>/challeng.*\.pdf$/i.test(n)),guidePresent:names.some(n=>/guide.*\.pdf$/i.test(n))});
      }else console.log('Configured Drive file download is not a directly accessible ZIP; three-file access remains unverified.');
    }}catch{console.log('Google Drive check unavailable: network/access failure');}
  }
 }catch{console.log('Database audit unavailable: connection/access failure');}finally{await mongoose.disconnect();}
})();
