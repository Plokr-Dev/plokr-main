/* Security & data integrity page */
function SecurityContent(){
  const { openAuth } = usePlokr();
  const pillars = [
    [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>,"Authorize-first access","Plokr sees nothing until you connect a tool and approve its scopes. No data is read without your explicit consent."],
    [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="2.6"/></svg>,"Read-only by default","We never write to your boards, repos, or pipelines. Plokr observes — it does not modify your source of truth."],
    [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/><circle cx="9" cy="8" r="2.6" fill="currentColor"/><circle cx="15" cy="16" r="2.6" fill="currentColor"/></svg>,"Granular, revocable scopes","Grant access per project and per repo, and revoke any connection instantly. Tokens are removed on disconnect."],
    [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3Z"/><path d="M9 12l2 2 4-4"/></svg>,"Encrypted & isolated","Data encrypted in transit (TLS 1.2+) and at rest (AES-256). Tokens are isolated per workspace."],
  ];
  return (
    <React.Fragment>
      <style>{`
        .mc .cclist{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
        .mc .ccbox{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:26px;}
        .mc .ccbox.ok{border-top:3px solid var(--ok);}
        .mc .ccbox.no{border-top:3px solid var(--bad);}
        .mc .ccbox h3{font-size:18px;margin-bottom:16px;display:flex;align-items:center;gap:9px;}
        .mc .ccbox li{list-style:none;display:flex;gap:11px;align-items:flex-start;font-size:14.5px;color:var(--ink2);margin-bottom:12px;line-height:1.45;}
        .mc .ccbox .mk{flex:none;font-weight:800;margin-top:1px;}
        .mc .ccbox.ok .mk{color:var(--ok);}
        .mc .ccbox.no .mk{color:var(--bad);}
        .mc .badges{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
        .mc .badge{background:#fff;border:1px solid var(--line);border-radius:14px;padding:24px;text-align:center;}
        .mc .badge .bi{width:46px;height:46px;border-radius:12px;background:#EAF1FE;color:var(--blue-d);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;}
        .mc .badge .bi svg{width:23px;height:23px;}
        .mc .badge b{font-family:"Archivo";font-size:15px;display:block;}
        .mc .badge span{font-size:13px;color:var(--muted);}
        .mc .scope{display:flex;align-items:center;gap:13px;padding:15px 20px;border-top:1px solid var(--line);}
        .mc .scope:first-of-type{border-top:0;}
        .mc .scope .si{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex:none;color:#fff;font-family:"Archivo";font-weight:700;font-size:13px;}
        .mc .scope .sn{flex:1;}
        .mc .scope .sn b{font-size:13.5px;font-family:"Archivo";font-weight:600;display:block;color:var(--ink);}
        .mc .scope .sn span{font-size:12px;color:var(--muted);}
        .mc .ro{font-family:"JetBrains Mono";font-size:10.5px;font-weight:600;color:#0A7553;background:#E6F7F1;padding:4px 9px;border-radius:6px;white-space:nowrap;}
        .mc .permfoot{padding:15px 20px;border-top:1px solid var(--line);display:flex;align-items:center;gap:9px;font-size:12.5px;color:var(--ink2);background:#FBFCFE;}
        .mc .permfoot .stamp{margin-left:auto;font-family:"JetBrains Mono";font-size:11px;color:var(--ok);font-weight:600;}
      `}</style>

      <header className="phero dark">
        <div className="wrap">
          <div className="crumbs"><a href="Plokr Homepage.html">Home</a><span>/</span><span>Product</span><span>/</span><span style={{color:"#fff"}}>Security</span></div>
          <span className="eyebrow">Security &amp; data integrity</span>
          <h1>Your data <em>stays yours</em>.</h1>
          <p className="lede">Plokr is built to earn the trust of security-conscious teams. Read-only by design, authorize-first by default, and never a place your customer data lives without explicit consent.</p>
          <div className="cta">
            <a className="btn btn-primary btn-lg" href="contact.html">Request security docs</a>
            <a className="btn btn-line btn-lg" href={PLOKR_APP} onClick={openAuth('signup')} style={{background:"rgba(255,255,255,.06)",borderColor:"rgba(255,255,255,.22)",color:"#fff"}}>Start free trial</a>
          </div>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><span className="ftag">Principles</span><h2 style={{marginTop:16}}>Four commitments behind every connection.</h2></div>
          <div className="pillars" style={{maxWidth:920,margin:"0 auto"}}>
            {pillars.map((p,i)=>(<div className="pillar" key={i}><span className="pi">{p[0]}</span><h4>{p[1]}</h4><p>{p[2]}</p></div>))}
          </div>
        </div>
      </section>

      <section className="sec soft">
        <div className="wrap">
          <div className="sec-head"><h2>What Plokr can — and can't — do.</h2><p>Transparency about exactly what we touch.</p></div>
          <div className="cclist">
            <div className="ccbox ok">
              <h3><span className="mk">✓</span>What Plokr reads</h3>
              {["Jira & Trello board, sprint, and issue metadata","Repository names, branches, and commit metadata","Dependency manifests and lockfiles (e.g. package.json)","Public vulnerability advisories and CVE data"].map((t,i)=>(<li key={i}><span className="mk">✓</span>{t}</li>))}
            </div>
            <div className="ccbox no">
              <h3><span className="mk">✕</span>What Plokr never does</h3>
              {["Write, edit, or delete anything in your tools","Clone or store your source code","Access data outside the scopes you grant","Share or sell your data to third parties"].map((t,i)=>(<li key={i}><span className="mk">✕</span>{t}</li>))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="frow">
            <div>
              <span className="ftag">Authorize-first</span>
              <h2>You approve every scope, and can revoke in one click.</h2>
              <p className="lead">Connections use standard OAuth with the narrowest read-only scopes. You see exactly what each grant allows before approving, and disconnecting removes Plokr's access and stored tokens immediately.</p>
              <ul className="checklist">
                {["Least-privilege, read-only OAuth scopes","Per-project and per-repo granularity","Instant revocation from settings","Tokens encrypted and isolated per workspace"].map((t,i)=>(<li key={i}><span className="tick">✓</span>{t}</li>))}
              </ul>
            </div>
            <div className="card">
              <div className="ch"><span className="t">Authorize Plokr</span><span className="chip">read-only · OAuth</span></div>
              {[["#2A6FDB","J","Jira — Payments project","Read issues, sprints & status"],["#1F2328","G","GitHub — acme/api-gateway","Read repo metadata & manifests"],["#0B66C3","T","Trello — Roadmap board","Read cards, lists & members"]].map((s,i)=>(
                <div className="scope" key={i}><span className="si" style={{background:s[0]}}>{s[1]}</span><span className="sn"><b>{s[2]}</b><span>{s[3]}</span></span><span className="ro">READ-ONLY</span></div>
              ))}
              <div className="permfoot"><span>You control access — revoke anytime.</span><span className="stamp">✓ Authorized by you</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec soft">
        <div className="wrap">
          <div className="sec-head"><span className="ftag">Compliance</span><h2 style={{marginTop:16}}>Built for security reviews.</h2></div>
          <div className="badges">
            {[
              [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3Z"/><path d="M9 12l2 2 4-4"/></svg>,"SOC 2 Type II","Audited annually"],
              [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>,"GDPR","EU data ready · DPA available"],
              [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>,"Encryption","TLS 1.2+ · AES-256 at rest"],
              [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12l2 2 4-4"/></svg>,"Audit logs","Full activity trail on Enterprise"],
            ].map((b,i)=>(<div className="badge" key={i}><span className="bi">{b[0]}</span><b>{b[1]}</b><span>{b[2]}</span></div>))}
          </div>
        </div>
      </section>

      <section className="sec ctaband" style={{paddingTop:0}}><div className="wrap"><div className="box">
        <h2>Need our security package?</h2>
        <p>We'll share our SOC 2 report, DPA, and architecture overview under NDA.</p>
        <div className="cta"><a className="btn btn-primary btn-lg" href="contact.html" style={{background:"#fff",color:"#0C1A2B"}}>Request documents</a><a className="btn btn-line btn-lg" href="dpa.html">Read the DPA</a></div>
      </div></div></section>
    </React.Fragment>
  );
}
window.SecurityContent = SecurityContent;
