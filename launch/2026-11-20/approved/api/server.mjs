import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,sep,extname} from 'node:path';
import {createHash} from 'node:crypto';
import {validateLead} from './lead-validation.mjs';
import {buildTtsInquiryFields} from './tts-inquiry-policy.mjs';
const root=fileURLToPath(new URL('./public/',import.meta.url));
let project=process.env.GOOGLE_CLOUD_PROJECT||'',token='',expires=0;
const metadata=async path=>{const r=await fetch('http://metadata.google.internal/computeMetadata/v1/'+path,{headers:{'Metadata-Flavor':'Google'},signal:AbortSignal.timeout(4000)});if(!r.ok)throw Error('Metadata unavailable');return r};
async function auth(){if(!project)project=await (await metadata('project/project-id')).text();if(Date.now()>expires){const d=await (await metadata('instance/service-accounts/default/token')).json();token=d.access_token;expires=Date.now()+(d.expires_in-60)*1000}return token}
const fvalue=v=>typeof v==='number'?{integerValue:String(v)}:typeof v==='boolean'?{booleanValue:v}:{stringValue:String(v)};
async function saveLead(d,ip){
 const bearer=await auth();const database=`projects/${project}/databases/(default)/documents`,base='https://firestore.googleapis.com/v1/';
 async function api(path,body){const r=await fetch(base+path,{method:body?'POST':'GET',headers:{Authorization:'Bearer '+bearer,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(8000)});if(r.status===404)return null;const data=await r.json();if(!r.ok){const e=new Error(data.error?.message||'Database request failed');e.status=r.status;throw e}return data}
 const reference='TT-'+d.submissionId.slice(0,8).toUpperCase();const doc=database+'/leads/'+d.submissionId;
 const rateId=createHash('sha256').update(ip+'|'+Math.floor(Date.now()/3600000)).digest('hex');const rateDoc=database+'/lead_rate_limits/'+rateId;
 for(let attempt=0;attempt<3;attempt++){
  let transaction;
  try{
   transaction=(await api(database+':beginTransaction',{})).transaction;
   const suffix='?transaction='+encodeURIComponent(transaction);
   const existing=await api(doc+suffix);if(existing){await api(database+':rollback',{transaction});return reference}
   const rate=await api(rateDoc+suffix);const count=Number(rate?.fields?.count?.integerValue||0);
   if(count>=5){await api(database+':rollback',{transaction});const e=new Error('Too many inquiries. Please try again in an hour.');e.status=429;throw e}
   const fields=Object.fromEntries(Object.entries({name:d.name,email:d.email,company:d.company,venture:d.venture,message:d.message,consent:true,privacyVersion:'2026-11',createdAt:Date.now()}).map(([k,v])=>[k,fvalue(v)]));
   Object.assign(fields,buildTtsInquiryFields(d,reference));
   await api(database+':commit',{transaction,writes:[{update:{name:doc,fields},currentDocument:{exists:false}},{update:{name:rateDoc,fields:{count:{integerValue:String(count+1)},expiresAt:{timestampValue:new Date(Date.now()+7200000).toISOString()}}}}]});return reference;
  }catch(e){if(transaction)await api(database+':rollback',{transaction}).catch(()=>{});if(e.status===409&&attempt<2)continue;throw e}
 }
}
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
const security={'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'"};
createServer(async(req,res)=>{
 const json=(body,status=200)=>{res.writeHead(status,{...security,'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(body))};
 try{
  const host=req.headers.host||'localhost';const url=new URL(req.url,'http://'+host);
  if(url.pathname==='/api/leads'){
   if(req.method!=='POST')return json({error:'Use the inquiry form.'},405);
   const origin=req.headers.origin;if(origin&&!new Set(["https://thinktanksolutionsai.cloud", "https://think-tank-solutions-ai.web.app", "https://think-tank-solutions-ai.firebaseapp.com", "https://think-tank-hub-889688545997.us-east1.run.app", "https://simutrade-labs-tts.web.app", "https://simutrade-labs-tts.firebaseapp.com", "https://simutradelabs.thinktanksolutionsai.online", "https://clientflow-ai-tts.web.app", "https://clientflow-ai-tts.firebaseapp.com", "https://clientflowai.thinktanksolutionsai.cloud"]).has(origin))return json({error:'Please use the inquiry form on this website.'},403);
   if(!(req.headers['content-type']||'').includes('application/json'))return json({error:'Please enable JavaScript and use the inquiry form.'},415);
   let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>12000)return json({error:'Your message is too long.'},413)}
   let payload;try{payload=JSON.parse(raw)}catch{return json({error:'Please check the inquiry fields.'},400)}
   const r=validateLead(payload);if(!r.ok)return json({error:r.error},400);const d=r.data;
   if(d.website)return json({reference:'TT-'+d.submissionId.slice(0,8).toUpperCase()});
   const ip=String(req.headers['x-forwarded-for']||req.socket.remoteAddress||'unknown').split(',').at(-1).trim();
   try{return json({reference:await saveLead(d,ip)},201)}catch(e){return json({error:e.status===429?e.message:'The inquiry service is unavailable. Please try again shortly.'},e.status===429?429:503)}
  }
  if(!['GET','HEAD'].includes(req.method))return json({error:'Method not allowed.'},405);
  const file=resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));if(!file.startsWith(root.endsWith(sep)?root:root+sep))return json({error:'Not found.'},404);
  let bytes;try{bytes=await readFile(file)}catch{return json({error:'Not found.'},404)}
  res.writeHead(200,{...security,'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':extname(file)==='.webp'?'public,max-age=86400':'no-cache'});res.end(req.method==='HEAD'?undefined:bytes);
 }catch{if(!res.headersSent)json({error:'The service could not complete this request.'},500);else res.end()}
}).listen(Number(process.env.PORT||8080),'0.0.0.0',()=>console.log('Think Tank hub listening'));
