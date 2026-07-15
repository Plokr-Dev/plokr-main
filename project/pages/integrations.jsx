/* Integrations overview page */
function IntegrationsContent(){
  const { openAuth } = usePlokr();
  const integ = [
    ["#2A6FDB","J","Jira","Issue tracking",["Boards, sprints & epics","Issues, status & assignees","Real-time sync"]],
    ["#1F2328","G","GitHub","Source & dependencies",["Repos & branches","Manifests & lockfiles","Public and private"]],
    ["#2563EB","B","Bitbucket","Source & dependencies",["Repos & branches","Manifests & lockfiles","Cloud & Server"]],
    ["#E2432A","L","GitLab","Source & dependencies",["Projects & repos","Manifests & lockfiles","Self-managed or SaaS"]],
    ["#0B66C3","T","Trello","Boards",["Cards, lists & labels","Members & due dates","Workspace-wide"]],
  ];
  return (
    <React.Fragment>
      <style>{`
        .mc .intcard{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:26px;display:flex;flex-direction:column;}
        .mc .intcard .top{display:flex;align-items:center;gap:13px;}
        .mc .intcard .sq{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-family:"Archivo";font-weight:800;font-size:20px;flex:none;}
        .mc .intcard .nm{font-family:"Archivo";font-weight:700;font-size:18px;}
        .mc .intcard .ty{font-size:12.5px;color:var(--muted);font-family:"JetBrains Mono";}
        .mc .intcard ul{list-style:none;margin:20px 0 22px;display:flex;flex-direction:column;gap:10px;flex:1;}
        .mc .intcard li{font-size:14px;color:var(--ink2);display:flex;gap:9px;align-items:flex-start;}
        .mc .intcard li::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--blue);margin-top:7px;flex:none;}
        .mc .intcard .row{display:flex;align-items:center;gap:10px;}
        .mc .notif{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
        .mc .notif .n{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid var(--line);border-radius:11px;padding:14px 20px;font-weight:600;font-size:15px;color:var(--ink);}
        .mc .notif .n .d{width:20px;height:20px;border-radius:6px;}
      `}</style>

      <header className="phero">
        <div className="wrap" style={{textAlign:"center"}}>
          <span className="eyebrow" style={{margin:"0 auto"}}>Integrations</span>
          <h1 style={{margin:"20px auto 0"}}>Connect the tools your team already runs on.</h1>
          <p className="lede" style={{margin:"22px auto 0"}}>Plokr links to your issue trackers and code hosts with read-only OAuth. Authorize in a click, scope exactly what it can read, and revoke anytime.</p>
          <div className="cta" style={{justifyContent:"center"}}>
            <a className="btn btn-primary btn-lg" href={PLOKR_APP} onClick={openAuth('signup')}>Start free trial</a>
            <a className="btn btn-line btn-lg" href="docs.html">Read setup docs</a>
          </div>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="grid3">
            {integ.map((it,i)=>(
              <div className="intcard" key={i}>
                <div className="top"><span className="sq" style={{background:it[0]}}>{it[1]}</span><div><div className="nm">{it[2]}</div><div className="ty">{it[3]}</div></div></div>
                <ul>{it[4].map((f,j)=>(<li key={j}>{f}</li>))}</ul>
                <div className="row"><a className="btn btn-line" href={PLOKR_APP} onClick={openAuth('signup')} style={{flex:1}}>Connect</a><span className="ro" style={{fontFamily:"JetBrains Mono",fontSize:10.5,fontWeight:600,color:"#0A7553",background:"#E6F7F1",padding:"7px 10px",borderRadius:7}}>READ-ONLY</span></div>
              </div>
            ))}
            <div className="intcard" style={{justifyContent:"center",alignItems:"center",textAlign:"center",borderStyle:"dashed",background:"transparent"}}>
              <div className="nm" style={{color:"var(--muted)"}}>More on the way</div>
              <p style={{fontSize:13.5,color:"var(--muted)",margin:"10px 0 16px"}}>Azure DevOps, Linear &amp; more are in progress.</p>
              <a className="btn btn-line" href="contact.html">Request an integration</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec soft">
        <div className="wrap">
          <div className="sec-head"><span className="ftag">How connections work</span><h2 style={{marginTop:16}}>Authorize-first, read-only, revocable.</h2></div>
          <div className="steps">
            {[["01","Authorize with OAuth","Click connect and approve the exact scopes you want. Plokr can see nothing until you do."],["02","Read-only sync","Plokr reads boards and manifests on a schedule and on push — it never writes to your tools."],["03","Revoke anytime","Disconnect any integration instantly from settings; access and stored tokens are removed."]].map((s,i)=>(
              <div className="step" key={i}><span className="n">{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><span className="ftag">Notifications</span><h2 style={{marginTop:16}}>Get alerts where you work.</h2><p>Plokr pushes ranked alerts out so the right people hear about blockers and vulnerabilities first.</p></div>
          <div className="notif">
            <span className="n"><span className="d" style={{background:"#3B82F6"}}></span>Email digests</span>
            <span className="n"><span className="d" style={{background:"#10B981"}}></span>Outbound webhooks</span>
            <span className="n"><span className="d" style={{background:"#62748B"}}></span>In-app inbox</span>
          </div>
        </div>
      </section>

      <section className="sec ctaband"><div className="wrap"><div className="box">
        <h2>Connect your first tool today.</h2>
        <p>It takes under five minutes and your first insights land immediately.</p>
        <div className="cta"><a className="btn btn-primary btn-lg" href={PLOKR_APP} onClick={openAuth('signup')} style={{background:"#fff",color:"#0C1A2B"}}>Start free trial</a><a className="btn btn-line btn-lg" href="security.html">How we handle data</a></div>
      </div></div></section>
    </React.Fragment>
  );
}
window.IntegrationsContent = IntegrationsContent;
