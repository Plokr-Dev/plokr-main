/* Homepage content — rendered inside <SiteChrome>. Uses usePlokr() for auth CTAs. */
function HomeContent() {
  const { openAuth } = usePlokr();
  const [billing, setBilling] = React.useState('monthly');
  const heatCells = Array.from({length:7*18}, (_,i)=>{
    const day=i%7, wk=Math.floor(i/7);
    let v=(Math.sin(wk*0.6+1)+1)/2*0.55 + 0.12 + ((i*37)%5)/14;
    if(day===5) v*=0.5; if(day===6) v*=0.35;
    return Math.max(0.06, Math.min(1, v));
  });
  return (
    <React.Fragment>
      <style>{`
        .mc .hhero{background:var(--navy);color:#fff;position:relative;overflow:hidden;padding:72px 0 96px;}
        .mc .hhero::before{content:"";position:absolute;inset:0;background:radial-gradient(900px 460px at 78% 8%,rgba(59,130,246,.30),transparent 58%),radial-gradient(620px 420px at 6% 92%,rgba(56,189,248,.14),transparent 60%);}
        .mc .hhero .wrap{position:relative;display:grid;grid-template-columns:1fr 1.04fr;gap:54px;align-items:center;}
        .mc .hhero .eyebrow{font-family:"JetBrains Mono";background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.32);color:var(--blue-l);}
        .mc .hhero h1{font-size:58px;margin:24px 0 0;color:#fff;font-weight:800;letter-spacing:-.02em;line-height:1.02;}
        .mc .hhero h1 em{font-style:normal;color:var(--cyan);}
        .mc .hhero p.sub{font-size:19px;color:rgba(255,255,255,.72);margin-top:22px;max-width:520px;line-height:1.55;}
        .mc .hhero .cta{display:flex;gap:14px;margin-top:32px;}
        .mc .hhero .btn-line{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.22);color:#fff;}
        .mc .hhero .btn-line:hover{background:rgba(255,255,255,.12);}
        .mc .hhero .trust{margin-top:28px;display:flex;gap:24px;align-items:center;color:rgba(255,255,255,.5);font-size:13px;}
        .mc .hhero .trust b{color:#fff;font-family:"Archivo";}
        .mc .panel{background:var(--navy2);border:1px solid rgba(255,255,255,.10);border-radius:16px;box-shadow:0 40px 90px -30px rgba(0,0,0,.6);overflow:hidden;}
        .mc .panel .ph{height:46px;display:flex;align-items:center;gap:8px;padding:0 16px;border-bottom:1px solid rgba(255,255,255,.08);}
        .mc .panel .ph .t{color:rgba(255,255,255,.9);font-weight:600;font-size:13.5px;font-family:"Archivo";}
        .mc .panel .ph .live{margin-left:auto;font-family:"JetBrains Mono";font-size:11px;color:var(--ok);display:flex;align-items:center;gap:6px;}
        .mc .panel .ph .live::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--ok);box-shadow:0 0 0 3px rgba(16,185,129,.2);}
        .mc .pgrid{padding:16px;display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .mc .kpi{background:var(--navy3);border:1px solid rgba(255,255,255,.06);border-radius:11px;padding:14px;}
        .mc .kpi .lab{font-size:11px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.06em;font-weight:600;}
        .mc .kpi .num{font-family:"Archivo";font-weight:800;font-size:30px;color:#fff;margin-top:6px;line-height:1;}
        .mc .kpi .num small{font-size:13px;color:var(--ok);font-weight:600;margin-left:6px;}
        .mc .kpi .num small.bad{color:var(--bad);}
        .mc .spark{display:flex;align-items:flex-end;gap:3px;height:26px;margin-top:10px;}
        .mc .spark i{flex:1;background:var(--blue);border-radius:2px;opacity:.55;}
        .mc .feed{padding:0 16px 16px;}
        .mc .feed .fr{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid rgba(255,255,255,.06);font-size:12.5px;}
        .mc .feed .fr .ic{width:22px;height:22px;border-radius:6px;flex:none;display:flex;align-items:center;justify-content:center;font-size:11px;}
        .mc .feed .fr .tx{color:rgba(255,255,255,.82);flex:1;}
        .mc .feed .fr .tm{color:rgba(255,255,255,.4);font-family:"JetBrains Mono";font-size:10.5px;}
        .mc .viz{background:var(--navy);color:#fff;position:relative;overflow:hidden;}
        .mc .viz::before{content:"";position:absolute;inset:0;background:radial-gradient(820px 420px at 50% -12%,rgba(59,130,246,.20),transparent 62%);}
        .mc .viz .wrap{position:relative;}
        .mc .vizgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        .mc .vcard{background:var(--navy2);border:1px solid rgba(255,255,255,.10);border-radius:14px;padding:20px;position:relative;}
        .mc .vcard .vh{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
        .mc .vcard .vh .t{font-family:"Archivo";font-weight:700;font-size:14px;color:#fff;}
        .mc .vcard .vh .m{font-family:"JetBrains Mono";font-size:11px;color:rgba(255,255,255,.45);}
        .mc .vcard .big{font-family:"Archivo";font-weight:800;font-size:32px;line-height:1;color:#fff;}
        .mc .vcard .sub{font-size:12.5px;color:rgba(255,255,255,.5);margin-top:5px;}
        .mc .wide{grid-column:1 / -1;}
        .mc .donutrow{display:flex;align-items:center;gap:20px;}
        .mc .donut{width:104px;height:104px;border-radius:50%;background:conic-gradient(var(--ok) 0 91%,rgba(255,255,255,.12) 91% 100%);display:flex;align-items:center;justify-content:center;position:relative;flex:none;}
        .mc .donut::after{content:"";position:absolute;width:72px;height:72px;border-radius:50%;background:var(--navy2);}
        .mc .donut .dv{position:relative;font-family:"Archivo";font-weight:800;font-size:21px;color:#fff;}
        .mc .leg{display:flex;flex-direction:column;gap:9px;font-size:12.5px;color:rgba(255,255,255,.7);}
        .mc .leg .lk{display:flex;align-items:center;gap:8px;}
        .mc .leg .lk i{width:10px;height:10px;border-radius:3px;flex:none;}
        .mc .vbars{display:flex;align-items:stretch;gap:9px;height:108px;margin-top:8px;}
        .mc .vbars .bg{flex:1;height:100%;display:flex;flex-direction:column;justify-content:flex-end;gap:3px;}
        .mc .vbars i{display:block;border-radius:3px 3px 0 0;}
        .mc .vbars .lbl{font-family:"JetBrains Mono";font-size:9.5px;color:rgba(255,255,255,.4);text-align:center;margin-top:6px;}
        .mc .heat{display:grid;grid-template-rows:repeat(7,1fr);grid-auto-flow:column;gap:4px;margin-top:6px;}
        .mc .heat span{aspect-ratio:1;border-radius:3px;background:rgba(59,130,246,var(--o,.2));}
        .mc .heatfoot{display:flex;align-items:center;justify-content:space-between;margin-top:12px;}
        .mc .heatfoot .lab{font-family:"JetBrains Mono";font-size:11px;color:rgba(255,255,255,.4);}
        .mc .heatlegend{display:flex;align-items:center;gap:6px;font-size:11px;color:rgba(255,255,255,.5);}
        .mc .heatlegend i{width:12px;height:12px;border-radius:3px;}
        .mc .vchips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:32px;}
        .mc .vchip{font-family:"JetBrains Mono";font-size:12px;color:rgba(255,255,255,.72);border:1px solid rgba(255,255,255,.18);padding:6px 13px;border-radius:999px;}
        .mc .scope{display:flex;align-items:center;gap:13px;padding:15px 20px;border-top:1px solid var(--line);}
        .mc .scope:first-of-type{border-top:0;}
        .mc .scope .si{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex:none;}
        .mc .scope .sn{flex:1;}
        .mc .scope .sn b{font-size:13.5px;font-family:"Archivo";font-weight:600;display:block;color:var(--ink);}
        .mc .scope .sn span{font-size:12px;color:var(--muted);}
        .mc .ro{font-family:"JetBrains Mono";font-size:10.5px;font-weight:600;color:#0A7553;background:#E6F7F1;padding:4px 9px;border-radius:6px;white-space:nowrap;}
        .mc .permfoot{padding:15px 20px;border-top:1px solid var(--line);display:flex;align-items:center;gap:9px;font-size:12.5px;color:var(--ink2);background:#FBFCFE;}
        .mc .permfoot .stamp{margin-left:auto;font-family:"JetBrains Mono";font-size:11px;color:var(--ok);font-weight:600;}
      `}</style>

      {/* HERO */}
      <header className="hhero">
        <div className="wrap">
          <div>
            <span className="eyebrow">▮ MISSION CONTROL FOR ENGINEERING</span>
            <h1>One view for every <em>sprint</em> and <em>dependency</em>.</h1>
            <p className="sub">Plokr gives engineering leaders real-time visibility into Jira progress and dependency health across every repo — so blockers and vulnerabilities surface before they cost a release.</p>
            <div className="cta">
              <a className="btn btn-primary btn-lg" href={PLOKR_APP} onClick={openAuth('signup')}>Start free trial</a>
              <a className="btn btn-line btn-lg" href={PLOKR_APP} onClick={openAuth('login')}>Log in to Plokr</a>
            </div>
            <div className="trust"><span><b>200+</b> teams</span><span><b>14k</b> repos monitored</span><span><b>SOC 2</b> Type II</span></div>
          </div>
          <div className="panel">
            <div className="ph"><span className="t">Engineering Overview</span><span className="live">LIVE</span></div>
            <div className="pgrid">
              <div className="kpi"><div className="lab">Sprint progress</div><div className="num">62%<small>+8%</small></div>
                <div className="spark">{[40,55,48,70,62,80,72,90].map((h,i)=>(<i key={i} style={{height:h+"%"}}></i>))}</div></div>
              <div className="kpi"><div className="lab">Dependency health</div><div className="num">91%<small>good</small></div>
                <div className="spark">{[88,90,86,91,89,93,91,91].map((h,i)=>(<i key={i} style={{height:h+"%",background:"#10B981"}}></i>))}</div></div>
              <div className="kpi"><div className="lab">Blocked issues</div><div className="num">2<small className="bad">+1</small></div></div>
              <div className="kpi"><div className="lab">Vulnerabilities</div><div className="num">1<small className="bad">high</small></div></div>
            </div>
            <div className="feed">
              {[["#FDE9E9","✕","jsonwebtoken flagged — CVE-2022-23529","2m"],["#FEF3DC","!","PAY-322 blocked for 3 days","18m"],["#E6F7F1","✓","Sprint 24 burndown on track","1h"],["#EAF1FE","↑","express 4.21.1 available in api-gateway","2h"]].map((r,i)=>(
                <div className="fr" key={i}><span className="ic" style={{background:r[0]}}>{r[1]}</span><span className="tx">{r[2]}</span><span className="tm">{r[3]}</span></div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* LOGOS */}
      <div className="logos" id="integrations">
        <div className="wrap">
          <p>Plugs into your existing stack</p>
          <div className="logorow">
            <span className="lgo"><span className="sq" style={{background:"#2A6FDB"}}></span>Jira</span>
            <span className="lgo"><span className="sq" style={{background:"#1F2328"}}></span>GitHub</span>
            <span className="lgo"><span className="sq" style={{background:"#2563EB"}}></span>Bitbucket</span>
            <span className="lgo"><span className="sq" style={{background:"#62748B"}}></span>GitLab</span>
            <span className="lgo"><span className="sq" style={{background:"#0B66C3"}}></span>Trello</span>
          </div>
        </div>
      </div>

      {/* FEATURE 1 — Jira */}
      <section className="sec" id="platform">
        <div className="wrap">
          <div className="frow">
            <div>
              <span className="ftag">Jira monitoring</span>
              <h2>Real-time command of every board.</h2>
              <p className="lead">Plokr syncs your Jira projects continuously and turns raw tickets into signal: what's moving, what's stuck, and where a sprint is about to slip.</p>
              <ul className="checklist">
                {["Live burndown and sprint progress, no Jira tab required","Automatic detection of stale, blocked, and at-risk issues","Workload balance across assignees, squads, and epics","Trend history to catch slippage weeks before the deadline"].map((t,i)=>(<li key={i}><span className="tick">✓</span>{t}</li>))}
              </ul>
              <a className="btn btn-line" href="jira-monitoring.html" style={{marginTop:28}}>Explore Jira Monitoring →</a>
            </div>
            <div className="card">
              <div className="ch"><span className="t">Sprint 24 · Payments squad</span><span className="chip">updated 2m ago</span></div>
              {[["PAY-318","Reconcile Stripe webhook retries","prog","In Progress","#3B82F6","ML"],["PAY-322","Idempotency keys for refunds","block","Blocked","#EF4444","RK"],["PAY-310","Migrate ledger to decimal","prog","In Progress","#10B981","JD"],["PAY-301","Add 3DS fallback flow","todo","To Do","#7C3AED","SA"]].map((r,i)=>(
                <div className="drow" key={i}>
                  <span className="ver" style={{width:60,flex:"none"}}>{r[0]}</span>
                  <span className="pkg" style={{fontFamily:"Hanken Grotesk",fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r[1]}</span>
                  <span className={"pill "+r[2]}>{r[3]}</span>
                  <span className="ava" style={{background:r[4]}}>{r[5]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 2 — Dependencies */}
      <section className="sec" style={{paddingTop:0}}>
        <div className="wrap">
          <div className="frow rev">
            <div>
              <span className="ftag">Dependency checker</span>
              <h2>Outdated and vulnerable, caught early.</h2>
              <p className="lead">Connect GitHub, Bitbucket and GitLab and Plokr audits every repo's dependencies around the clock — ranking risk so your team fixes what matters first.</p>
              <ul className="checklist">
                {["Continuous scanning across all your repos","Severity-ranked CVE alerts with safe upgrade guidance","Outdated-package tracking with one-click PR drafts","A single risk dashboard for every service and library"].map((t,i)=>(<li key={i}><span className="tick">✓</span>{t}</li>))}
              </ul>
              <a className="btn btn-line" href="dependency-checker.html" style={{marginTop:28}}>Explore Dependency Checker →</a>
            </div>
            <div className="card">
              <div className="ch"><span className="t mono" style={{fontFamily:"JetBrains Mono",fontSize:14}}>acme/api-gateway</span><span className="chip">main · scanned 4m ago</span></div>
              {[["jsonwebtoken","8.5.1 → 9.0.2","vuln","CVE · high"],["express","4.18.2 → 4.21.1","out","outdated"],["axios","1.4.0 → 1.7.7","out","outdated"],["pg","8.11.3","ok","up to date"],["zod","3.23.8","ok","up to date"]].map((r,i)=>(
                <div className="drow" key={i}><span className="pkg">{r[0]}</span><span className="ver">{r[1]}</span><span className={"tag "+r[2]}>{r[3]}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISUALIZE */}
      <section className="sec viz" id="insights">
        <div className="wrap">
          <div className="sec-head">
            <span className="ftag">Dashboards &amp; insights</span>
            <h2 style={{marginTop:16}}>See progress the way you think about it.</h2>
            <p>Velocity charts, dependency health, delivery heatmaps and more — Plokr turns raw activity across Jira and your repos into views your whole team can read at a glance.</p>
          </div>
          <div className="vizgrid">
            <div className="vcard">
              <div className="vh"><span className="t">Sprint velocity</span><span className="m">last 8</span></div>
              <div className="big">38 <span style={{fontSize:14,color:"var(--ok)",fontWeight:600}}>pts/sprint</span></div>
              <div className="sub">+12% vs. trailing average</div>
              <svg viewBox="0 0 280 90" width="100%" height="90" style={{marginTop:10,display:"block"}} preserveAspectRatio="none">
                <defs><linearGradient id="vg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3B82F6" stopOpacity="0.5"/><stop offset="1" stopColor="#3B82F6" stopOpacity="0"/></linearGradient></defs>
                <polygon points="0,72 40,60 80,64 120,44 160,50 200,30 240,36 280,18 280,90 0,90" fill="url(#vg)"/>
                <polyline points="0,72 40,60 80,64 120,44 160,50 200,30 240,36 280,18" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="vcard">
              <div className="vh"><span className="t">Dependency health</span><span className="m">142 pkgs</span></div>
              <div className="donutrow">
                <div className="donut"><span className="dv">91%</span></div>
                <div className="leg">
                  <span className="lk"><i style={{background:"var(--ok)"}}></i>129 up to date</span>
                  <span className="lk"><i style={{background:"var(--warn)"}}></i>9 outdated</span>
                  <span className="lk"><i style={{background:"var(--bad)"}}></i>4 vulnerable</span>
                </div>
              </div>
            </div>
            <div className="vcard">
              <div className="vh"><span className="t">Opened vs. closed</span><span className="m">this sprint</span></div>
              <div className="vbars">
                {[["M",70,52],["T",55,60],["W",80,46],["T",62,72],["F",48,58],["S",20,16],["S",14,10]].map((d,i)=>(
                  <div className="bg" key={i}><i style={{height:d[1]+"%",background:"#3B82F6",opacity:.55}}></i><i style={{height:d[2]+"%",background:"#10B981"}}></i><span className="lbl">{d[0]}</span></div>
                ))}
              </div>
            </div>
            <div className="vcard wide">
              <div className="vh"><span className="t">Delivery heatmap — issues resolved per day</span><span className="m">18 weeks · Payments squad</span></div>
              <div className="heat">{heatCells.map((o,i)=>(<span key={i} style={{"--o":o}}></span>))}</div>
              <div className="heatfoot">
                <span className="lab">Apr — May — Jun — Jul — Aug</span>
                <span className="heatlegend">less <i style={{background:"rgba(59,130,246,.12)"}}></i><i style={{background:"rgba(59,130,246,.35)"}}></i><i style={{background:"rgba(59,130,246,.6)"}}></i><i style={{background:"rgba(59,130,246,.9)"}}></i> more</span>
              </div>
            </div>
          </div>
          <div className="vchips">{["Burndown","Cycle time","Cumulative flow","Risk trends","Workload balance","Lead time","Vulnerability aging","Custom views"].map((c,i)=>(<span className="vchip" key={i}>{c}</span>))}</div>
        </div>
      </section>

      {/* DATA INTEGRITY */}
      <section className="sec">
        <div className="wrap">
          <div className="frow">
            <div>
              <span className="ftag">Data integrity</span>
              <h2>Your data stays yours.</h2>
              <p className="lead">Plokr can't see anything until you connect a tool and approve exactly what it may read. Access is read-only by default, scoped to what you grant, and revocable in one click.</p>
              <div className="pillars" style={{marginTop:30}}>
                {[
                  [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>,"Authorize-first access","Plokr sees nothing until you connect a tool and approve its scopes — no data, ever, without consent."],
                  [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="2.6"/></svg>,"Read-only by default","We never write to your boards, repos, or pipelines. Plokr observes; it doesn't touch your source of truth."],
                  [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/><circle cx="9" cy="8" r="2.6" fill="currentColor"/><circle cx="15" cy="16" r="2.6" fill="currentColor"/></svg>,"Granular, revocable scopes","Grant access per project and per repo, and revoke any connection instantly from settings."],
                  [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3Z"/><path d="M9 12l2 2 4-4"/></svg>,"Encrypted & compliant","SOC 2 Type II, GDPR-ready, with data encrypted in transit and at rest."],
                ].map((p,i)=>(<div className="pillar" key={i}><span className="pi">{p[0]}</span><h4>{p[1]}</h4><p>{p[2]}</p></div>))}
              </div>
              <a className="btn btn-line" href="security.html" style={{marginTop:30}}>Read about security →</a>
            </div>
            <div className="card">
              <div className="ch"><span className="t">Authorize Plokr</span><span className="chip">read-only · OAuth</span></div>
              {[["#2A6FDB","J","Jira — Payments project","Read issues, sprints & status"],["#1F2328","G","GitHub — acme/api-gateway","Read repo metadata & manifests"],["#0B66C3","T","Trello — Roadmap board","Read cards, lists & members"]].map((s,i)=>(
                <div className="scope" key={i}>
                  <span className="si" style={{background:s[0],color:"#fff",fontFamily:"Archivo",fontWeight:700,fontSize:13}}>{s[1]}</span>
                  <span className="sn"><b>{s[2]}</b><span>{s[3]}</span></span>
                  <span className="ro">READ-ONLY</span>
                </div>
              ))}
              <div className="permfoot"><span>You control access — revoke anytime.</span><span className="stamp">✓ Authorized by you</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="sec dark" id="how">
        <div className="wrap">
          <div className="sec-head left">
            <span className="ftag">How it works</span>
            <h2 style={{marginTop:16}}>From connect to control in minutes.</h2>
            <p>Read-only OAuth, zero agents, nothing to install. Authorize your tools and Plokr starts watching immediately.</p>
          </div>
          <div className="steps">
            {[["01","Connect your stack","Authorize Jira, GitHub, Bitbucket, GitLab and Trello with read-only OAuth. Plokr never writes to your boards or repos."],["02","Plokr monitors","We sync issues and scan dependencies continuously, building a live model of progress and risk across every project."],["03","Act before it's late","Ranked alerts arrive in-app, by email, and via webhooks the moment work stalls or a package turns risky."]].map((s,i)=>(
              <div className="step" key={i}><span className="n">{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="sec" id="pricing">
        <div className="wrap">
          <div className="sec-head"><h2>Pricing built to scale with you.</h2><p>Start free, upgrade when your team grows. Per workspace.</p>
            <div className="billtoggle" style={{marginTop:22}}>
              <button className={billing==='monthly'?'on':''} onClick={()=>setBilling('monthly')}>Monthly</button>
              <button className={billing==='annual'?'on':''} onClick={()=>setBilling('annual')}>Annual <span className="save">SAVE 20%</span></button>
            </div>
          </div>
          <div className="tiers">
            {[
              {name:"Starter",monthly:"$0",annual:"$0",per:"/mo",desc:"For individuals getting started",feats:["1 Jira project","Up to 3 repos","Daily dependency scans","Email alerts"],cta:"Start free",style:"btn-line",mode:"signup"},
              {name:"Team",monthly:"$49",annual:"$39",per:"/mo",desc:"For squads shipping together",feats:["Unlimited Jira projects","Up to 25 repos","Real-time dependency scans","Email & webhook alerts","Stale & blocked detection","90-day trend history"],cta:"Start free trial",style:"btn-primary",mode:"signup",pop:true},
              {name:"Enterprise",monthly:"Custom",annual:"Custom",per:"",desc:"For orgs with compliance needs",feats:["Unlimited repos & projects","SSO / SAML & SCIM","Audit logs & RBAC","SOC 2 report & DPA","Dedicated support SLA"],cta:"Contact sales",style:"btn-line",mode:"sales"},
            ].map((t,i)=>{
              const priced = t[billing] !== "Custom" && t[billing] !== "$0";
              return (
              <div className={"tier"+(t.pop?" pop":"")} key={i}>
                {t.pop&&<span className="ribbon">Most popular</span>}
                <span className="tname">{t.name}</span>
                <div className="price">{t[billing]}<small>{t.per}</small></div>
                <div className="billnote">{priced ? (billing==='annual' ? 'billed annually · save 20%' : 'billed monthly') : '\u00A0'}</div>
                <p className="tdesc">{t.desc}</p>
                <ul>{t.feats.map((f,j)=>(<li key={j}><span className="tk">✓</span>{f}</li>))}</ul>
                <a className={"btn "+t.style} href={t.mode==='sales'?'contact.html':PLOKR_APP} onClick={t.mode==='sales'?undefined:openAuth('signup')}>{t.cta}</a>
              </div>
            );})}
          </div>
          <div style={{textAlign:"center",marginTop:30}}><a href="pricing.html" style={{color:"var(--blue-d)",fontWeight:600,fontSize:15}}>Compare all features &amp; read FAQs →</a></div>
        </div>
      </section>
    </React.Fragment>
  );
}
window.HomeContent = HomeContent;
