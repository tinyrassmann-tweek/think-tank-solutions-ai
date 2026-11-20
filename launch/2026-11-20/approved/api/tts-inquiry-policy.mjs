export const AUDIT_TERMS_VERSION='tts-audits-2026-11-20';
export const RETENTION_DAYS=90;
const DAY=86400000;
export function buildTtsInquiryFields(d,reference,now=Date.now()) {
 if(d.venture!=='Think Tank Solutions AI')return {};
 const requestType=d.requestType||(/^Studio request: Search Visibility Snapshot/.test(d.message)?'snapshot':/^Studio request: Full Search Visibility Audit/.test(d.message)?'full':'build');
 const fields={reference:{stringValue:reference},requestType:{stringValue:requestType},ownerDirector:{stringValue:'Think Tank Solutions Director'},contactStatus:{stringValue:'unconverted'},retentionCategory:{stringValue:requestType==='privacy'?'rights_request':'service_inquiry'},lastContactAt:{timestampValue:new Date(now).toISOString()},lastMeaningfulContactAt:{timestampValue:new Date(now).toISOString()},marketingConsent:{booleanValue:false}};
 if(requestType!=='privacy')fields.retentionExpiresAt={timestampValue:new Date(now+RETENTION_DAYS*DAY).toISOString()};
 if(['snapshot','full'].includes(requestType))Object.assign(fields,{auditPackage:{stringValue:requestType==='snapshot'?'snapshot_497':'full_1497'},paymentState:{stringValue:'awaiting_payment'},auditTermsAccepted:{booleanValue:d.auditTermsAccepted===true},auditTermsVersion:{stringValue:d.auditTermsAccepted===true?AUDIT_TERMS_VERSION:'not_recorded_legacy'},businessUrl:{stringValue:d.businessUrl||''}});
 return fields;
}
export function shouldExpireTtsInquiry(d,now=Date.now()) {
 if(d.venture!=='Think Tank Solutions AI'||d.retentionCategory!=='service_inquiry'||d.contactStatus!=='unconverted'||d.isCustomer===true||['paid','customer','refunded'].includes(d.paymentState)||d.legalHold===true)return false;
 const contact=Date.parse(d.lastMeaningfulContactAt||''),expiry=Date.parse(d.retentionExpiresAt||'');
 return Number.isFinite(contact)&&Number.isFinite(expiry)&&expiry<=now&&contact+RETENTION_DAYS*DAY<=now;
}
