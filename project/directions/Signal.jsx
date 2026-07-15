/* Direction C — "Signal"
   Editorial, high-contrast, big expressive type. Confident but warm.
   Type: Bricolage Grotesque (display) + Figtree (body) + JetBrains Mono (code)
   Color: warm paper, true-black ink, sparing electric blue, black contrast sections. */
const SG_APP = "https://plork.com/app";
const SG_TRIAL = "https://plork.com/app?signup=1";

function SignalHome() {
  return (
    <div className="sg">
      <style>{`
        .sg{--paper:#F7F5F1;--paper2:#EFEDE7;--ink:#121110;--ink2:#3A3833;--muted:#6E6A62;--line:#DEDAD1;--blue:#2A6FDB;--blue-d:#1F57B0;--ok:#1B7A4B;--warn:#9A6A05;--bad:#C0392B;
          width:1440px;background:var(--paper);color:var(--ink);font-family:"Figtree",sans-serif;font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased;}
        .sg *{box-sizing:border-box;margin:0;padding:0;}
        .sg h1,.sg h2,.sg h3,.sg h4{font-family:"Bricolage Grotesque",sans-serif;font-weight:700;letter-spacing:-0.025em;line-height:.98;}
        .sg a{color:inherit;text-decoration:none;}
        .sg .mono{font-family:"JetBrains Mono",monospace;}
        .sg .wrap{max-width:1280px;margin:0 auto;padding:0 60px;}
        .sg .btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;height:46px;padding:0 24px;border-radius:999px;font-weight:600;font-size:15px;font-family:"Figtree";cursor:pointer;border:1.5px solid transparent;transition:.15s;white-space:nowrap;}
        .sg .btn-dark{background:var(--ink);color:var(--paper);}
        .sg .btn-dark:hover{background:#2C2A26;}
        .sg .btn-blue{background:var(--blue);color:#fff;}
        .sg .btn-blue:hover{background:var(--blue-d);}
        .sg .btn-line{border-color:var(--ink);color:var(--ink);background:transparent;}
        .sg .btn-line:hover{background:var(--ink);color:var(--paper);}
        .sg .btn-lg{height:54px;padding:0 30px;font-size:16px;}
        /* nav */
        .sg nav{position:sticky;top:0;z-index:20;height:76px;display:flex;align-items:center;background:rgba(247,245,241,.86);backdrop-filter:blur(8px);border-bottom:1px solid var(--line);}
        .sg nav .wrap{display:flex;align-items:center;gap:44px;width:100%;}
        .sg .logo{display:flex;align-items:center;gap:10px;font-family:"Bricolage Grotesque";font-weight:800;font-size:24px;letter-spacing:-.03em;}
        .sg .logo .mark{width:14px;height:24px;background:var(--blue);border-radius:3px;transform:skewX(-10deg);}
        .sg .navlinks{display:flex;gap:32px;font-size:15px;color:var(--ink2);font-weight:500;}
        .sg .navlinks a:hover{color:var(--blue);}
        .sg .navright{margin-left:auto;display:flex;align-items:center;gap:16px;}
        .sg .navright .login{font-weight:600;font-size:15px;}
        .sg .navright .login:hover{color:var(--blue);}
        /* hero — asymmetric editorial */
        .sg .hero{padding:80px 0 70px;position:relative;}
        .sg .hero .wrap{display:grid;grid-template-columns:1.18fr .82fr;gap:48px;align-items:end;}
        .sg .kicker{font-family:"JetBrains Mono";font-size:13px;font-weight:600;letter-spacing:.04em;color:var(--blue);text-transform:uppercase;display:flex;align-items:center;gap:10px;}
        .sg .kicker::before{content:"";width:32px;height:2px;background:var(--blue);}
        .sg .hero h1{font-size:92px;margin:26px 0 0;letter-spacing:-.035em;}
        .sg .hero h1 .u{position:relative;white-space:nowrap;}
        .sg .hero h1 .u::after{content:"";position:absolute;left:0;right:0;bottom:.08em;height:.09em;background:var(--blue);border-radius:2px;}
        .sg .hero p.sub{font-size:20px;color:var(--ink2);margin-top:0;line-height:1.5;}
        .sg .hero .cta{display:flex;gap:14px;margin-top:26px;}
        .sg .hero .micro{margin-top:18px;font-family:"JetBrains Mono";font-size:12.5px;color:var(--muted);}
        /* floating product card */
        .sg .float{margin-top:64px;position:relative;}
        .sg .card{background:#fff;border:1.5px solid var(--ink);border-radius:18px;box-shadow:10px 12px 0 var(--ink);overflow:hidden;}
        .sg .card .ch{height:50px;display:flex;align-items:center;gap:9px;padding:0 18px;border-bottom:1.5px solid var(--ink);background:var(--paper2);}
        .sg .card .ch .t{font-family:"Bricolage Grotesque";font-weight:700;font-size:15px;}
        .sg .card .ch .chip{margin-left:auto;font-family:"JetBrains Mono";font-size:11px;color:var(--muted);}
        .sg .drow{display:flex;align-items:center;gap:14px;padding:14px 18px;border-top:1px solid var(--line);font-size:13.5px;}
        .sg .drow:first-of-type{border-top:0;}
        .sg .drow .pkg{font-family:"JetBrains Mono";font-weight:600;color:var(--ink);flex:1;}
        .sg .drow .ver{font-family:"JetBrains Mono";font-size:12px;color:var(--muted);}
        .sg .tag{font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;white-space:nowrap;font-family:"Figtree";}
        .sg .tag.ok{background:#E3F2E9;color:var(--ok);}
        .sg .tag.out{background:#FBEFD6;color:var(--warn);}
        .sg .tag.vuln{background:#F8E1DD;color:var(--bad);}
        .sg .pill{font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;white-space:nowrap;}
        .sg .pill.prog{background:#E3ECFB;color:var(--blue-d);}
        .sg .pill.block{background:#F8E1DD;color:var(--bad);}
        .sg .pill.todo{background:var(--paper2);color:#55504A;}
        .sg .ava{width:25px;height:25px;border-radius:50%;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;color:#fff;flex:none;}
        /* marquee logos */
        .sg .logos{border-top:1.5px solid var(--ink);border-bottom:1.5px solid var(--ink);padding:24px 0;background:var(--ink);color:var(--paper);overflow:hidden;}
        .sg .logos .row{display:flex;align-items:center;gap:54px;justify-content:center;flex-wrap:wrap;}
        .sg .logos .lab{font-family:"JetBrains Mono";font-size:12px;color:rgba(247,245,241,.5);letter-spacing:.04em;}
        .sg .lgo{display:flex;align-items:center;gap:10px;font-family:"Bricolage Grotesque";font-weight:700;font-size:20px;color:var(--paper);}
        .sg .lgo .sq{width:18px;height:18px;border-radius:5px;}
        /* feature */
        .sg section.feat{padding:104px 0;}
        .sg .feat .lead-row{display:grid;grid-template-columns:.9fr 1.1fr;gap:60px;align-items:center;}
        .sg .feat .lead-row.rev{direction:rtl;}
        .sg .feat .lead-row.rev>*{direction:ltr;}
        .sg .ftag{font-family:"JetBrains Mono";font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--blue);}
        .sg .feat h2{font-size:54px;margin:14px 0 20px;letter-spacing:-.03em;}
        .sg .feat p.lead{font-size:18.5px;color:var(--ink2);line-height:1.55;}
        .sg .checklist{margin-top:26px;display:flex;flex-direction:column;gap:14px;}
        .sg .checklist li{list-style:none;display:flex;gap:13px;font-size:16px;color:var(--ink2);align-items:flex-start;}
        .sg .checklist .tick{font-family:"JetBrains Mono";color:var(--blue);font-weight:700;flex:none;margin-top:1px;}
        /* how — black slab */
        .sg .how{background:var(--ink);color:var(--paper);padding:104px 0;}
        .sg .how h2{font-size:54px;color:var(--paper);max-width:760px;}
        .sg .how .head .ftag{color:#8FB6F2;}
        .sg .how .head p{color:rgba(247,245,241,.6);font-size:18px;margin-top:16px;max-width:560px;}
        .sg .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:56px;border-top:1px solid rgba(247,245,241,.18);}
        .sg .step{padding:34px 30px 34px 0;border-right:1px solid rgba(247,245,241,.14);}
        .sg .step:last-child{border-right:0;padding-right:0;}
        .sg .step:not(:first-child){padding-left:30px;}
        .sg .step .n{font-family:"Bricolage Grotesque";font-weight:800;font-size:44px;color:var(--blue);opacity:.9;line-height:1;}
        .sg .step h3{font-size:24px;margin:18px 0 11px;color:var(--paper);}
        .sg .step p{font-size:15px;color:rgba(247,245,241,.62);line-height:1.55;}
        /* pricing */
        .sg .pricing{padding:104px 0;}
        .sg .pricing .head{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:52px;gap:30px;}
        .sg .pricing h2{font-size:54px;letter-spacing:-.03em;}
        .sg .pricing .head p{color:var(--muted);font-size:17px;max-width:340px;text-align:right;}
        .sg .tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1.5px solid var(--ink);border-radius:18px;overflow:hidden;}
        .sg .tier{padding:34px 30px;border-right:1.5px solid var(--ink);display:flex;flex-direction:column;background:#fff;}
        .sg .tier:last-child{border-right:0;}
        .sg .tier.pop{background:var(--ink);color:var(--paper);}
        .sg .tier.pop .tname,.sg .tier.pop .price{color:var(--paper);}
        .sg .tier.pop .tdesc{color:rgba(247,245,241,.6);}
        .sg .tier.pop li{color:rgba(247,245,241,.85);}
        .sg .tier .toprow{display:flex;align-items:center;gap:10px;}
        .sg .tier .tname{font-family:"Bricolage Grotesque";font-weight:700;font-size:20px;}
        .sg .tier .ribbon{font-family:"JetBrains Mono";font-size:10.5px;font-weight:700;letter-spacing:.05em;color:var(--ink);background:#8FB6F2;padding:3px 9px;border-radius:999px;text-transform:uppercase;}
        .sg .tier .price{font-family:"Bricolage Grotesque";font-weight:800;font-size:52px;margin:18px 0 2px;letter-spacing:-.04em;}
        .sg .tier .price small{font-size:15px;color:var(--muted);font-family:"Figtree";font-weight:500;}
        .sg .tier.pop .price small{color:rgba(247,245,241,.55);}
        .sg .tier .tdesc{font-size:14px;color:var(--muted);min-height:42px;}
        .sg .tier ul{list-style:none;margin:22px 0 26px;display:flex;flex-direction:column;gap:12px;}
        .sg .tier li{font-size:14px;color:var(--ink2);display:flex;gap:10px;align-items:flex-start;}
        .sg .tier li .tk{font-family:"JetBrains Mono";color:var(--blue);font-weight:700;flex:none;}
        .sg .tier.pop li .tk{color:#8FB6F2;}
        .sg .tier .btn{width:100%;margin-top:auto;}
        .sg .tier.pop .btn-line{border-color:var(--paper);color:var(--paper);}
        .sg .tier.pop .btn-line:hover{background:var(--paper);color:var(--ink);}
        /* cta */
        .sg .ctaband{padding:40px 0 110px;}
        .sg .ctaband .box{border:1.5px solid var(--ink);border-radius:22px;padding:70px 60px;display:flex;align-items:center;justify-content:space-between;gap:40px;box-shadow:10px 12px 0 var(--blue);}
        .sg .ctaband h2{font-size:52px;letter-spacing:-.03em;max-width:620px;}
        .sg .ctaband .cta{display:flex;flex-direction:column;gap:12px;flex:none;}
        /* footer */
        .sg footer{border-top:1.5px solid var(--ink);padding:60px 0 50px;}
        .sg footer .grid{display:grid;grid-template-columns:1.7fr repeat(4,1fr);gap:32px;}
        .sg footer .fdesc{font-size:14px;color:var(--muted);margin-top:16px;max-width:280px;line-height:1.55;}
        .sg footer h5{font-family:"JetBrains Mono";font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:var(--ink);margin-bottom:16px;font-weight:600;}
        .sg footer .fcol a{display:block;font-size:14px;color:var(--muted);margin-bottom:11px;}
        .sg footer .fcol a:hover{color:var(--blue);}
        .sg footer .legal{margin-top:48px;padding-top:24px;border-top:1px solid var(--line);display:flex;justify-content:space-between;font-size:13px;color:var(--muted);font-family:"JetBrains Mono";}
      `}</style>

      {/* NAV */}
      <nav>
        <div className="wrap">
          <a className="logo" href="#"><span className="mark"></span>Plokr</a>
          <div className="navlinks"><a href="#">Product</a><a href="#">How it works</a><a href="#">Integrations</a><a href="#">Pricing</a><a href="#">Docs</a></div>
          <div className="navright">
            <a className="login" href={SG_APP}>Log in</a>
            <a className="btn btn-blue" href={SG_TRIAL}>Start free trial</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <div>
            <span className="kicker">Jira · GitHub · Bitbucket</span>
            <h1>Ship without <span className="u">surprises</span>.</h1>
          </div>
          <div>
            <p className="sub">Plokr watches your Jira boards and audits dependencies across every repo — so stalled work and risky packages surface before they become a problem.</p>
            <div className="cta">
              <a className="btn btn-blue btn-lg" href={SG_TRIAL}>Start free trial</a>
              <a className="btn btn-line btn-lg" href={SG_APP}>Log in</a>
            </div>
            <p className="micro">// 14-day trial · no card · connect in &lt;5 min</p>
          </div>
        </div>
        <div className="wrap float">
          <div className="card">
            <div className="ch"><span className="t">Plokr — Overview</span><span className="chip">acme-workspace · live</span></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
              <div style={{borderRight:"1px solid var(--line)"}}>
                <div style={{padding:"13px 18px",fontFamily:"JetBrains Mono",fontSize:12,color:"var(--muted)",borderBottom:"1px solid var(--line)"}}>SPRINT 24 · PAYMENTS</div>
                {[
                  ["PAY-318","Stripe webhook retries","prog","In Progress","#2A6FDB","ML"],
                  ["PAY-322","Refund idempotency keys","block","Blocked","#C0392B","RK"],
                  ["PAY-310","Ledger → decimal","prog","In Progress","#1B7A4B","JD"],
                ].map((r,i)=>(
                  <div className="drow" key={i}>
                    <span className="ver" style={{width:58,flex:"none"}}>{r[0]}</span>
                    <span className="pkg" style={{fontFamily:"Figtree",fontWeight:600,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r[1]}</span>
                    <span className={"pill "+r[2]}>{r[3]}</span>
                    <span className="ava" style={{background:r[4]}}>{r[5]}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{padding:"13px 18px",fontFamily:"JetBrains Mono",fontSize:12,color:"var(--muted)",borderBottom:"1px solid var(--line)"}}>acme/api-gateway</div>
                {[
                  ["jsonwebtoken","8.5.1→9.0.2","vuln","CVE high"],
                  ["express","4.18→4.21","out","outdated"],
                  ["pg","8.11.3","ok","current"],
                ].map((r,i)=>(
                  <div className="drow" key={i}>
                    <span className="pkg" style={{fontSize:13}}>{r[0]}</span>
                    <span className="ver">{r[1]}</span>
                    <span className={"tag "+r[2]}>{r[3]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* LOGOS (dark marquee) */}
      <div className="logos">
        <div className="row">
          <span className="lab">CONNECTS WITH</span>
          <span className="lgo"><span className="sq" style={{background:"#4C9AFF"}}></span>Jira</span>
          <span className="lgo"><span className="sq" style={{background:"#fff"}}></span>GitHub</span>
          <span className="lgo"><span className="sq" style={{background:"#4C9AFF"}}></span>Bitbucket</span>
          <span className="lgo"><span className="sq" style={{background:"#FC6D26"}}></span>GitLab</span>
          <span className="lgo"><span className="sq" style={{background:"#8E7AF0"}}></span>Slack</span>
        </div>
      </div>

      {/* FEATURE 1 — Jira */}
      <section className="feat">
        <div className="wrap">
          <div className="lead-row">
            <div>
              <span className="ftag">Jira monitoring</span>
              <h2>What's moving. What's stuck.</h2>
              <p className="lead">Plokr syncs your boards in real time and cuts through the noise — surfacing stale tickets, blocked work, and sprints about to slip.</p>
              <ul className="checklist">
                {["Live burndown without opening Jira","Auto-flags for stale, blocked & at-risk issues","Workload balance across the whole team","Trend history to catch slippage early"].map((t,i)=>(<li key={i}><span className="tick">→</span>{t}</li>))}
              </ul>
            </div>
            <div className="card" style={{boxShadow:"8px 10px 0 var(--ink)"}}>
              <div className="ch"><span className="t">Sprint 24 · Payments squad</span><span className="chip">updated 2m ago</span></div>
              {[
                ["PAY-318","Reconcile Stripe webhook retries","prog","In Progress","#2A6FDB","ML"],
                ["PAY-322","Idempotency keys for refunds","block","Blocked","#C0392B","RK"],
                ["PAY-310","Migrate ledger to decimal","prog","In Progress","#1B7A4B","JD"],
                ["PAY-301","Add 3DS fallback flow","todo","To Do","#8E7AF0","SA"],
                ["PAY-298","Payout schedule audit log","prog","In Progress","#2A6FDB","TM"],
              ].map((r,i)=>(
                <div className="drow" key={i}>
                  <span className="ver" style={{width:60,flex:"none"}}>{r[0]}</span>
                  <span className="pkg" style={{fontFamily:"Figtree",fontWeight:600,fontSize:13.5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r[1]}</span>
                  <span className={"pill "+r[2]}>{r[3]}</span>
                  <span className="ava" style={{background:r[4]}}>{r[5]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 2 — Dependencies */}
      <section className="feat" style={{paddingTop:0}}>
        <div className="wrap">
          <div className="lead-row rev">
            <div>
              <span className="ftag">Dependency checker</span>
              <h2>Outdated. Vulnerable. Flagged.</h2>
              <p className="lead">Connect GitHub and Bitbucket and Plokr audits every repo continuously — ranking risk so your team fixes what actually matters first.</p>
              <ul className="checklist">
                {["Continuous scans across GitHub & Bitbucket","Severity-ranked CVE alerts with upgrade paths","Outdated-package detection, one dashboard","PR-ready fixes your team can merge fast"].map((t,i)=>(<li key={i}><span className="tick">→</span>{t}</li>))}
              </ul>
            </div>
            <div className="card" style={{boxShadow:"8px 10px 0 var(--ink)"}}>
              <div className="ch"><span className="t mono" style={{fontFamily:"JetBrains Mono",fontSize:14}}>acme/api-gateway</span><span className="chip">main · 4m ago</span></div>
              {[
                ["jsonwebtoken","8.5.1 → 9.0.2","vuln","CVE · high"],
                ["express","4.18.2 → 4.21.1","out","outdated"],
                ["axios","1.4.0 → 1.7.7","out","outdated"],
                ["pg","8.11.3","ok","up to date"],
                ["zod","3.23.8","ok","up to date"],
              ].map((r,i)=>(
                <div className="drow" key={i}>
                  <span className="pkg">{r[0]}</span>
                  <span className="ver">{r[1]}</span>
                  <span className={"tag "+r[2]}>{r[3]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW — black slab */}
      <section className="how">
        <div className="wrap">
          <div className="head">
            <span className="ftag">How it works</span>
            <h2>Three steps. No agents.</h2>
            <p>Authorize your tools with read-only OAuth and Plokr starts watching immediately. Nothing to install.</p>
          </div>
          <div className="steps">
            {[
              ["1","Connect","Authorize Jira, GitHub & Bitbucket. Read-only — Plokr never writes to your boards or repos."],
              ["2","Monitor","We sync issues and scan dependencies around the clock, building a live picture of risk."],
              ["3","Act","Ranked alerts hit your inbox and Slack the moment work stalls or a package turns risky."],
            ].map((s,i)=>(
              <div className="step" key={i}><span className="n">{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing">
        <div className="wrap">
          <div className="head"><h2>Pricing.</h2><p>Start free, upgrade as your team grows. Per workspace, billed monthly.</p></div>
          <div className="tiers">
            {[
              {name:"Starter",price:"$0",per:"/mo",desc:"For individuals getting started",feats:["1 Jira project","Up to 3 repos","Weekly dependency scans","Email alerts"],cta:"Start free",style:"btn-line",href:SG_TRIAL},
              {name:"Team",price:"$49",per:"/mo",desc:"For squads shipping together",feats:["Unlimited Jira projects","Up to 25 repos","Hourly dependency scans","Slack + email alerts","Stale & blocked detection","90-day trend history"],cta:"Start free trial",style:"btn-blue",href:SG_TRIAL,pop:true},
              {name:"Enterprise",price:"Custom",per:"",desc:"For orgs with compliance needs",feats:["Unlimited repos & projects","SSO / SAML & SCIM","Audit logs & RBAC","SOC 2 report & DPA","Dedicated SLA"],cta:"Contact sales",style:"btn-line",href:"#"},
            ].map((t,i)=>(
              <div className={"tier"+(t.pop?" pop":"")} key={i}>
                <div className="toprow"><span className="tname">{t.name}</span>{t.pop&&<span className="ribbon">Popular</span>}</div>
                <div className="price">{t.price}<small>{t.per}</small></div>
                <p className="tdesc">{t.desc}</p>
                <ul>{t.feats.map((f,j)=>(<li key={j}><span className="tk">→</span>{f}</li>))}</ul>
                <a className={"btn "+t.style} href={t.href}>{t.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ctaband">
        <div className="wrap">
          <div className="box">
            <h2>Stop chasing status. Start seeing it.</h2>
            <div className="cta">
              <a className="btn btn-blue btn-lg" href={SG_TRIAL}>Start free trial</a>
              <a className="btn btn-line btn-lg" href={SG_APP}>Log in to Plokr</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="grid">
            <div>
              <a className="logo" href="#"><span className="mark"></span>Plokr</a>
              <p className="fdesc">Real-time visibility into your Jira boards and dependency health across GitHub and Bitbucket.</p>
            </div>
            {[
              ["Product",["Overview","Jira monitoring","Dependency checker","Integrations","Pricing"]],
              ["Company",["About","Careers","Blog","Contact"]],
              ["Resources",["Docs","Changelog","Status","Security"]],
              ["Legal",["Privacy","Terms","DPA","Cookies"]],
            ].map((c,i)=>(
              <div className="fcol" key={i}><h5>{c[0]}</h5>{c[1].map((l,j)=>(<a href="#" key={j}>{l}</a>))}</div>
            ))}
          </div>
          <div className="legal"><span>© 2026 Plokr, Inc.</span><span>// built for teams that ship</span></div>
        </div>
      </footer>
    </div>
  );
}
window.SignalHome = SignalHome;
