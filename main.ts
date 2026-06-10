const SUPABASE_HOST = 'abgzfqreabkkwrmhhsfs.supabase.co';
const SUPABASE_KEY  = 'sb_publishable_W35ogbzHL_RlzCJEEwBheA_5jNnyx5w';

Deno.serve(async (req) => {
  const method = req.method;
  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': '*',
    }});
  }
  const u = new URL(req.url);
  const t = 'https://'+SUPABASE_HOST+u.pathname+u.search;
  const h = new Headers();
  h.set('apikey',SUPABASE_KEY);
  h.set('Content-Type',req.headers.get('content-type')||'application/json');
  const a = req.headers.get('authorization');
  if(a) h.set('Authorization',a);
  if(req.headers.get('prefer')) h.set('Prefer',req.headers.get('prefer'));
  try {
    const r = await fetch(t,{method,headers:h,body:(method==='GET'||method==='HEAD')?undefined:req.body});
    const rh = new Headers(r.headers);
    rh.set('Access-Control-Allow-Origin','*');
    rh.set('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS');
    rh.set('Access-Control-Allow-Headers','*');
    rh.set('Access-Control-Expose-Headers','*');
    return new Response(r.body,{status:r.status,statusText:r.statusText,headers:rh});
  } catch(e) {
    return new Response(JSON.stringify({error:'proxy_error',message:e.message}),{status:502,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
  }
});
