/* Jira Monitoring feature page */
function JiraContent(){
  const { openAuth } = usePlokr();
  const cols = [
    ["To Do","todo",[["PAY-301","Add 3DS fallback flow","#7C3AED","SA"],["PAY-340","Webhook signature rotation","#3B82F6","ML"]]],
    ["In Progress","prog",[["PAY-318","Reconcile Stripe retries","#3B82F6","ML"],["PAY-310","Ledger → decimal","#10B981","JD"]]],
    ["Blocked","block",[["PAY-322","Refund idempotency keys","#EF4444","RK"]]],
    ["Done","ok",[["PAY-298","Payout audit log","#10B981","TM"],["PAY-289","Rate-limit refunds","#3B82F6","ML"]]],
  ];
  const feats = [
    ["Stale & blocked detection","Plokr flags issues sitting untouched past your threshold and surfaces blockers the moment a dependency link goes red."],
    ["Sprint health & burndown","Live burndown, scope-creep tracking, and a single health score per sprint — without opening Jira."],
    ["Workload balance","See load distribution across assignees, squads, and epics so no one silently becomes a bottleneck."],
    ["Slippage trends","Historical velocity and cycle-time trends predict which sprints are about to slip, weeks ahead."],
    ["Cross-project rollups","Roll up status across many projects and boards into one executive overview for leadership."],
    ["Jira + Trello","Monitor Jira boards and Trello boards side by side in one consistent view."],
  ];
  return (
    <React.Fragment>
      <style>{`
        .mc .jhero .wrap{display:grid;grid-template-columns:1fr 1.02fr;gap:54px;align-items:center;}
        .mc .kanban{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
        .mc .kcol{background:var(--navy2);border:1px solid rgba(255,255,255,.10);border-radius:12px;padding:12px;}
        .mc .kcol .kh{display:flex;align-items:center;justify-content:space-between;margin-bottom:11px;font-family:"Archivo";font-weight:700;font-size:12px;color:#fff;}
        .mc .kcol .kh .ct{font-family:"JetBrains Mono";font-size:10px;color:rgba(255,255,255,.5);background:rgba(255,255,255,.08);padding:1px 7px;border-radius:20px;}
        .mc .kcard{background:var(--navy3);border:1px solid rgba(255,255,255,.07);border-radius:9px;padding:11px;margin-bottom:9px;}
        .mc .kcard:last-child{margin-bottom:0;}
        .mc .kcard .kk{font-family:"JetBrains Mono";font-size:10px;color:rgba(255,255,255,.5);}
        .mc .kcard .kt{font-size:12px;color:#fff;margin:6px 0 9px;line-height:1.3;}
        .mc .kcard .kf{display:flex;align-items:center;justify-content:space-between;}
        .mc .kcard .ava{width:20px;height:20px;font-size:9px;}
        .mc .kdot{width:8px;height:8px;border-radius:50%;}
        .mc .metricrow{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:8px;}
        .mc .metric{text-align:center;}
        .mc .metric .mv{font-family:"Archivo";font-weight:800;font-size:40px;color:var(--ink);letter-spacing:-.02em;}
        .mc .metric .ml{font-size:13.5px;color:var(--muted);margin-top:4px;}
      `}</style>

      <header className="phero dark jhero">
        <div className="wrap">
          <div>
            <div className="crumbs"><a href="Plokr Homepage.html">Home</a><span>/</span><span>Product</span><span>/</span><span style={{color:"#fff"}}>Jira Monitoring</span></div>
            <span className="eyebrow">Jira Monitoring</span>
            <h1>Real-time command of every <em>board</em>.</h1>
            <p className="lede">Plokr syncs your Jira and Trello boards continuously and turns raw tickets into signal — what's moving, what's stuck, and where a sprint is about to slip.</p>
            <div className="cta">
              <a className="btn btn-primary btn-lg" href={PLOKR_APP} onClick={openAuth('signup')}>Start free trial</a>
              <a className="btn btn-line btn-lg" href="contact.html" style={{background:"rgba(255,255,255,.06)",borderColor:"rgba(255,255,255,.22)",color:"#fff"}}>Book a demo</a>
            </div>
          </div>
          <div className="card" style={{background:"var(--navy2)",borderColor:"rgba(255,255,255,.1)"}}>
            <div className="ch" style={{borderColor:"rgba(255,255,255,.08)"}}><span className="t" style={{color:"#fff"}}>Sprint 24 · Payments squad</span><span className="chip" style={{color:"rgba(255,255,255,.5)",borderColor:"rgba(255,255,255,.14)"}}>live</span></div>
            <div style={{padding:14}}>
              <div className="kanban">
                {cols.map((c,i)=>(
                  <div className="kcol" key={i}>
                    <div className="kh"><span>{c[0]}</span><span className="ct">{c[2].length}</span></div>
                    {c[2].map((t,j)=>(
                      <div className="kcard" key={j}>
                        <div className="kk">{t[0]}</div>
                        <div className="kt">{t[1]}</div>
                        <div className="kf"><span className="kdot" style={{background:c[1]==="block"?"#EF4444":c[1]==="ok"?"#10B981":c[1]==="prog"?"#3B82F6":"#7C3AED"}}></span><span className="ava" style={{background:t[2]}}>{t[3]}</span></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="sec alt tight">
        <div className="wrap">
          <div className="metricrow">
            {[["62%","Avg sprint progress"],["3.1d","Mean time-to-unblock"],["−40%","Stale issues after 30 days"],["100%","Boards in one view"]].map((m,i)=>(
              <div className="metric" key={i}><div className="mv">{m[0]}</div><div className="ml">{m[1]}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><span className="ftag">Capabilities</span><h2 style={{marginTop:16}}>Everything you need to keep delivery on track.</h2></div>
          <div className="grid3">
            {feats.map((f,i)=>(
              <div className="feat-card" key={i}>
                <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg></span>
                <h3>{f[0]}</h3><p>{f[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec soft">
        <div className="wrap">
          <div className="frow">
            <div>
              <span className="ftag">Stay ahead of slippage</span>
              <h2>Know which sprints are at risk — before standup.</h2>
              <p className="lead">Plokr learns your team's velocity and cycle time, then flags the sprints trending toward a miss. Leaders get a heads-up while there's still time to act.</p>
              <ul className="checklist">
                {["Predictive at-risk sprint flags","Scope-creep and carry-over tracking","Per-squad velocity and cycle-time trends","Weekly digest to inbox or webhook"].map((t,i)=>(<li key={i}><span className="tick">✓</span>{t}</li>))}
              </ul>
            </div>
            <div className="card">
              <div className="ch"><span className="t">Velocity & risk · last 8 sprints</span><span className="chip">Payments</span></div>
              <div style={{padding:"22px 20px"}}>
                <svg viewBox="0 0 360 150" width="100%" height="150" preserveAspectRatio="none">
                  <defs><linearGradient id="jv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3B82F6" stopOpacity="0.28"/><stop offset="1" stopColor="#3B82F6" stopOpacity="0"/></linearGradient></defs>
                  {[30,60,90,120].map(y=>(<line key={y} x1="0" y1={y} x2="360" y2={y} stroke="#E4EAF1" strokeWidth="1"/>))}
                  <polygon points="0,110 51,96 102,104 153,72 204,80 255,52 306,60 360,34 360,150 0,150" fill="url(#jv)"/>
                  <polyline points="0,110 51,96 102,104 153,72 204,80 255,52 306,60 360,34" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinejoin="round"/>
                  <circle cx="255" cy="52" r="4" fill="#EF4444"/>
                </svg>
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:14,fontSize:13,color:"var(--muted)"}}><span className="pill block">at risk</span> Sprint 22 flagged — scope grew 18% mid-sprint.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec ctaband"><div className="wrap"><div className="box">
        <h2>Put your boards on autopilot.</h2>
        <p>Connect Jira in minutes and let Plokr watch every sprint for you.</p>
        <div className="cta"><a className="btn btn-primary btn-lg" href={PLOKR_APP} onClick={openAuth('signup')} style={{background:"#fff",color:"#0C1A2B"}}>Start free trial</a><a className="btn btn-line btn-lg" href="pricing.html">See pricing</a></div>
      </div></div></section>
    </React.Fragment>
  );
}
window.JiraContent = JiraContent;
