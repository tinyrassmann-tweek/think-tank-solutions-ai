const allowed = new Set(['Help me find the right fit', 'Think Tank Solutions AI', 'Think Tank Digital', 'TerraForm Sovereign AI', 'TerraForm Oasis', 'Genesis Revitalization Group', 'ClientFlow AI', 'My Ancestry Speaks', 'My Ancestry Lives / Ancestral Encounters', 'SimuTrade Labs', 'Privacy-Pod (YourSpace)', 'SiteForge']);
export function validateLead(input) {
    if (!input || typeof input !== 'object' || Array.isArray(input))
        return { ok: false, error: 'Please check the inquiry fields.' };
    const d = input;
    const clean = (k) => typeof d[k] === 'string' ? d[k].trim() : '';
    const data = { submissionId: clean('submissionId'), name: clean('name'), email: clean('email').toLowerCase(), company: clean('company'), venture: clean('venture'), message: clean('message'), website: clean('website') };
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.submissionId))
        return { ok: false, error: 'Please reload the form and try again.' };
    if (data.name.length < 1 || data.name.length > 100)
        return { ok: false, error: 'Please enter your name (up to 100 characters).' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254)
        return { ok: false, error: 'Please enter a valid email address.' };
    if (data.company.length > 140)
        return { ok: false, error: 'Please shorten the business or project name.' };
    if (!allowed.has(data.venture))
        return { ok: false, error: 'Please choose a venture or ask for guidance.' };
    if (data.message.length < 10 || data.message.length > 3000)
        return { ok: false, error: 'Please enter a message between 10 and 3,000 characters.' };
    if (data.venture === 'Think Tank Solutions AI' && d.requestType !== undefined) {
        if (!['build','snapshot','full','privacy'].includes(d.requestType))return {ok:false,error:'Please choose a valid service.'};
        data.requestType=d.requestType;
        if (['snapshot','full'].includes(data.requestType)) {
            if (d.auditTermsAccepted !== true || d.auditTermsVersion !== 'tts-audits-2026-11-20')return {ok:false,error:'Please read and accept the audit order terms.'};
            data.businessUrl=clean('businessUrl');
            try {const u=new URL(data.businessUrl);if(!['https:','http:'].includes(u.protocol)||u.username||u.password||data.businessUrl.length>300)throw Error();}catch{return {ok:false,error:'Please enter the business website to review.'};}
            data.auditTermsAccepted=true;
        }
    }
    if (d.consent !== true)
        return { ok: false, error: 'Please agree to be contacted about this inquiry.' };
    return { ok: true, data };
}
