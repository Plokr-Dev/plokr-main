/* Direction A — "Clarity"
   Light, calm, by-the-book developer-tool SaaS.
   Type: Space Grotesk (display) + IBM Plex Sans (body) + IBM Plex Mono (code)
   Color: cool near-white surfaces, ink navy text, single confident blue accent. */
const APP_URL = "https://plork.com/app";
const TRIAL_URL = "https://plork.com/app?signup=1";

function ClarityHome() {
  return (
    <div className="clr">
      <style>{`
        .clr{--bg:#FBFCFD;--surface:#FFFFFF;--line:#E6EAF0;--line2:#EEF1F6;--ink:#0F1623;--ink2:#27303F;--muted:#5A6577;--blue:#2A6FDB;--blue-d:#1F57B0;--blue-soft:#EAF1FC;--ok:#1F8A5B;--warn:#B5740B;--bad:#C8362B;
          width:1440px;background:var(--bg);color:var(--ink);font-family:"IBM Plex Sans",sans-serif;font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased;}
        .clr *{box-sizing:border-box;margin:0;padding:0;}
        .clr h1,.clr h2,.clr h3,.clr h4{font-family:"Space Grotesk",sans-serif;letter-spacing:-0.02em;line-height:1.04;color:var(--ink);font-weight:600;}
        .clr a{color:inherit;text-decoration:none;}
        .clr .mono{font-family:"IBM Plex Mono",monospace;}
        .clr .wrap{max-width:1200px;margin:0 auto;padding:0 56px;}
        /* nav */
        .clr nav{position:sticky;top:0;z-index:20;height:70px;display:flex;align-items:center;border-bottom:1px solid var(--line);background:rgba(251,252,253,.85);backdrop-filter:blur(8px);}
        .clr nav .wrap{display:flex;align-items:center;gap:40px;width:100%;}
        .clr .logo{display:flex;align-items:center;gap:10px;font-family:"Space Grotesk",sans-serif;font-weight:600;font-size:21px;letter-spacing:-.02em;}
        .clr .logo .mark{width:26px;height:26px;border-radius:7px;background:var(--blue);position:relative;}
        .clr .logo .mark::after{content:"";position:absolute;inset:7px 7px auto auto;width:8px;height:8px;border-radius:2px;background:#fff;top:7px;right:7px;}
        .clr .navlinks{display:flex;gap:30px;font-size:15px;color:var(--muted);font-weight:500;}
        .clr .navlinks a:hover{color:var(--ink);}
        .clr .navright{margin-left:auto;display:flex;align-items:center;gap:14px;}
        .clr .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:42px;padding:0 20px;border-radius:9px;font-weight:600;font-size:15px;font-family:"IBM Plex Sans",sans-serif;cursor:pointer;border:1px solid transparent;transition:.15s;white-space:nowrap;}
        .clr .btn-ghost{color:var(--ink2);}
        .clr .btn-ghost:hover{color:var(--blue);}
        .clr .btn-line{border-color:var(--line);background:var(--surface);color:var(--ink);}
        .clr .btn-line:hover{border-color:#C9D3E0;}
        .clr .btn-primary{background:var(--blue);color:#fff;box-shadow:0 1px 2px rgba(42,111,219,.35);}
        .clr .btn-primary:hover{background:var(--blue-d);}
        .clr .btn-lg{height:50px;padding:0 26px;font-size:16px;border-radius:11px;}
        /* hero */
        .clr .hero{text-align:center;padding:88px 0 56px;}
        .clr .eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--blue-d);background:var(--blue-soft);border:1px solid #D6E4FA;padding:6px 14px;border-radius:999px;letter-spacing:.01em;white-space:nowrap;}
        .clr .hero h1{font-size:64px;margin:26px auto 0;max-width:880px;}
        .clr .hero p.sub{font-size:20px;color:var(--muted);max-width:640px;margin:24px auto 0;line-height:1.5;}
        .clr .hero .cta{display:flex;gap:14px;justify-content:center;margin-top:34px;}
        .clr .hero .micro{margin-top:16px;font-size:13.5px;color:var(--muted);}
        /* product frame */
        .clr .shot{margin:60px auto 0;max-width:1080px;border:1px solid var(--line);border-radius:16px;background:var(--surface);box-shadow:0 30px 60px -28px rgba(15,22,35,.28),0 8px 20px -12px rgba(15,22,35,.12);overflow:hidden;}
        .clr .shot .bar{height:44px;display:flex;align-items:center;gap:7px;padding:0 16px;border-bottom:1px solid var(--line2);background:#FCFDFE;}
        .clr .dot{width:11px;height:11px;border-radius:50%;}
        .clr .shot .tabs{margin-left:18px;display:flex;gap:6px;font-size:12.5px;color:var(--muted);}
        .clr .shot .tabs span{padding:3px 10px;border-radius:6px;}
        .clr .shot .tabs .on{background:var(--blue-soft);color:var(--blue-d);font-weight:600;}
        .clr .dash{display:grid;grid-template-columns:1.55fr 1fr;gap:0;}
        .clr .dash .col{padding:24px 26px;}
        .clr .dash .col+.col{border-left:1px solid var(--line2);}
        .clr .panelhead{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
        .clr .panelhead h4{font-size:15px;}
        .clr .chip{font-family:"IBM Plex Mono",monospace;font-size:11px;padding:3px 8px;border-radius:6px;border:1px solid var(--line);color:var(--muted);}
        /* issue rows */
        .clr .issue{display:flex;align-items:center;gap:12px;padding:11px 0;border-top:1px solid var(--line2);}
        .clr .issue:first-of-type{border-top:0;}
        .clr .key{font-family:"IBM Plex Mono",monospace;font-size:12px;color:var(--muted);width:64px;flex:none;}
        .clr .ititle{font-size:13.5px;color:var(--ink2);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500;}
        .clr .pill{font-size:11px;font-weight:600;padding:3px 9px;border-radius:999px;white-space:nowrap;font-family:"IBM Plex Sans";}
        .clr .pill.todo{background:#EEF1F6;color:#55606F;}
        .clr .pill.prog{background:#E7F0FC;color:var(--blue-d);}
        .clr .pill.block{background:#FBE9E7;color:var(--bad);}
        .clr .pill.done{background:#E5F4EC;color:var(--ok);}
        .clr .ava{width:24px;height:24px;border-radius:50%;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;color:#fff;flex:none;font-family:"IBM Plex Sans";}
        /* right column widgets */
        .clr .stat{margin-bottom:18px;}
        .clr .stat .lab{font-size:12px;color:var(--muted);margin-bottom:6px;display:flex;justify-content:space-between;}
        .clr .bar2{height:8px;border-radius:999px;background:#EEF1F6;overflow:hidden;}
        .clr .bar2 i{display:block;height:100%;border-radius:999px;background:var(--blue);}
        .clr .alert{display:flex;gap:10px;align-items:flex-start;padding:11px 12px;border-radius:9px;background:#FEF6EC;border:1px solid #F6E2C2;font-size:12.5px;color:#6E4B12;margin-top:10px;}
        .clr .alert.bad{background:#FBECEA;border-color:#F2CDC8;color:#7A2C24;}
        .clr .alert b{font-weight:600;}
        /* logos strip */
        .clr .logos{padding:40px 0 8px;text-align:center;}
        .clr .logos p{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:600;}
        .clr .logorow{display:flex;justify-content:center;align-items:center;gap:18px;flex-wrap:wrap;margin-top:22px;}
        .clr .lgo{display:flex;align-items:center;gap:9px;font-family:"Space Grotesk";font-weight:600;font-size:17px;color:var(--ink2);border:1px solid var(--line);background:var(--surface);padding:10px 16px;border-radius:10px;}
        .clr .lgo .sq{width:18px;height:18px;border-radius:5px;}
        /* feature sections */
        .clr section.feat{padding:96px 0;}
        .clr .feat .row{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
        .clr .feat .row.rev{direction:rtl;}
        .clr .feat .row.rev>*{direction:ltr;}
        .clr .ftag{font-family:"IBM Plex Mono";font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--blue);}
        .clr .feat h2{font-size:40px;margin:14px 0 18px;}
        .clr .feat p.lead{font-size:17.5px;color:var(--muted);line-height:1.6;}
        .clr .checklist{margin-top:24px;display:flex;flex-direction:column;gap:13px;}
        .clr .checklist li{list-style:none;display:flex;gap:11px;font-size:15px;color:var(--ink2);align-items:flex-start;}
        .clr .checklist .tick{width:20px;height:20px;border-radius:50%;background:var(--blue-soft);color:var(--blue-d);display:flex;align-items:center;justify-content:center;flex:none;font-size:12px;font-weight:700;margin-top:1px;}
        /* dependency card */
        .clr .depcard{border:1px solid var(--line);border-radius:14px;background:var(--surface);box-shadow:0 20px 44px -26px rgba(15,22,35,.25);overflow:hidden;}
        .clr .depcard .dhead{padding:16px 20px;border-bottom:1px solid var(--line2);display:flex;align-items:center;gap:10px;}
        .clr .repo{font-family:"IBM Plex Mono";font-size:13px;font-weight:600;}
        .clr .depcard .summary{margin-left:auto;display:flex;gap:7px;}
        .clr .deprow{display:flex;align-items:center;gap:14px;padding:13px 20px;border-top:1px solid var(--line2);font-size:13px;}
        .clr .deprow .pkg{font-family:"IBM Plex Mono";font-weight:600;color:var(--ink2);flex:1;}
        .clr .deprow .ver{font-family:"IBM Plex Mono";font-size:12px;color:var(--muted);}
        .clr .tag{font-size:11px;font-weight:600;padding:3px 9px;border-radius:6px;white-space:nowrap;}
        .clr .tag.ok{background:#E5F4EC;color:var(--ok);}
        .clr .tag.out{background:#FEF6EC;color:var(--warn);}
        .clr .tag.vuln{background:#FBECEA;color:var(--bad);}
        /* how it works */
        .clr .how{padding:96px 0;background:#F4F7FB;border-top:1px solid var(--line);border-bottom:1px solid var(--line);}
        .clr .how .head{text-align:center;max-width:680px;margin:0 auto 56px;}
        .clr .how h2{font-size:40px;}
        .clr .how .head p{color:var(--muted);font-size:18px;margin-top:14px;}
        .clr .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
        .clr .step{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:28px;}
        .clr .step .n{width:36px;height:36px;border-radius:10px;background:var(--ink);color:#fff;font-family:"Space Grotesk";font-weight:600;display:flex;align-items:center;justify-content:center;font-size:16px;}
        .clr .step h3{font-size:21px;margin:18px 0 9px;}
        .clr .step p{font-size:14.5px;color:var(--muted);line-height:1.55;}
        /* pricing */
        .clr .pricing{padding:96px 0;}
        .clr .pricing .head{text-align:center;max-width:680px;margin:0 auto 52px;}
        .clr .pricing h2{font-size:40px;}
        .clr .pricing .head p{color:var(--muted);font-size:18px;margin-top:14px;}
        .clr .tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-items:start;}
        .clr .tier{border:1px solid var(--line);border-radius:16px;background:var(--surface);padding:30px;display:flex;flex-direction:column;}
        .clr .tier.pop{border-color:var(--blue);box-shadow:0 24px 50px -28px rgba(42,111,219,.5);position:relative;}
        .clr .tier.pop .ribbon{position:absolute;top:-12px;left:30px;background:var(--blue);color:#fff;font-size:11px;font-weight:700;letter-spacing:.04em;padding:5px 12px;border-radius:999px;text-transform:uppercase;}
        .clr .tier .tname{font-family:"Space Grotesk";font-weight:600;font-size:19px;}
        .clr .tier .price{font-family:"Space Grotesk";font-weight:600;font-size:46px;margin:16px 0 2px;letter-spacing:-.03em;}
        .clr .tier .price small{font-size:15px;color:var(--muted);font-family:"IBM Plex Sans";font-weight:500;letter-spacing:0;}
        .clr .tier .tdesc{font-size:14px;color:var(--muted);min-height:42px;}
        .clr .tier ul{list-style:none;margin:22px 0 26px;display:flex;flex-direction:column;gap:12px;}
        .clr .tier li{font-size:14px;color:var(--ink2);display:flex;gap:10px;align-items:flex-start;}
        .clr .tier li .tk{color:var(--blue);font-weight:700;flex:none;}
        .clr .tier .btn{width:100%;}
        /* cta band */
        .clr .ctaband{padding:86px 0;}
        .clr .ctaband .box{background:var(--ink);border-radius:22px;padding:64px;text-align:center;color:#fff;position:relative;overflow:hidden;}
        .clr .ctaband .box::before{content:"";position:absolute;inset:0;background:radial-gradient(700px 300px at 80% -10%,rgba(42,111,219,.5),transparent 60%);}
        .clr .ctaband h2{font-size:42px;color:#fff;position:relative;}
        .clr .ctaband p{color:rgba(255,255,255,.7);font-size:18px;margin:16px auto 30px;max-width:520px;position:relative;}
        .clr .ctaband .cta{display:flex;gap:14px;justify-content:center;position:relative;}
        .clr .ctaband .btn-line{background:transparent;color:#fff;border-color:rgba(255,255,255,.3);}
        .clr .ctaband .btn-line:hover{border-color:#fff;}
        /* footer */
        .clr footer{border-top:1px solid var(--line);padding:60px 0 50px;}
        .clr footer .grid{display:grid;grid-template-columns:1.6fr repeat(4,1fr);gap:32px;}
        .clr footer .fdesc{font-size:14px;color:var(--muted);margin-top:16px;max-width:260px;line-height:1.55;}
        .clr footer h5{font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink);margin-bottom:16px;font-family:"IBM Plex Sans";font-weight:600;}
        .clr footer .fcol a{display:block;font-size:14px;color:var(--muted);margin-bottom:11px;}
        .clr footer .fcol a:hover{color:var(--blue);}
        .clr footer .legal{margin-top:48px;padding-top:24px;border-top:1px solid var(--line);display:flex;justify-content:space-between;font-size:13px;color:var(--muted);}
      `}</style>

      {/* NAV */}
      <nav>
        <div className="wrap">
          <a className="logo" href="#"><span className="mark"></span>Plokr</a>
          <div className="navlinks">
            <a href="#">Product</a>
            <a href="#">How it works</a>
            <a href="#">Integrations</a>
            <a href="#">Pricing</a>
            <a href="#">Docs</a>
          </div>
          <div className="navright">
            <a className="btn btn-ghost" href={APP_URL}>Log in</a>
            <a className="btn btn-primary" href={TRIAL_URL}>Start free trial</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <span className="eyebrow">● Live across Jira, GitHub &amp; Bitbucket</span>
          <h1>Keep every sprint and dependency in sync.</h1>
          <p className="sub">Plokr watches your Jira boards and audits dependencies across GitHub and Bitbucket — so nothing stalls, breaks, or ships behind schedule.</p>
          <div className="cta">
            <a className="btn btn-primary btn-lg" href={TRIAL_URL}>Start free trial</a>
            <a className="btn btn-line btn-lg" href={APP_URL}>Log in to Plokr</a>
          </div>
          <p className="micro">Free for 14 days · No credit card · Connect in under 5 minutes</p>

          {/* product shot */}
          <div className="shot">
            <div className="bar">
              <span className="dot" style={{background:"#ED6A5E"}}></span>
              <span className="dot" style={{background:"#F4BF50"}}></span>
              <span className="dot" style={{background:"#61C554"}}></span>
              <div className="tabs"><span className="on">Overview</span><span>Boards</span><span>Dependencies</span><span>Alerts</span></div>
            </div>
            <div className="dash">
              <div className="col">
                <div className="panelhead"><h4>Sprint 24 · Payments squad</h4><span className="chip">12 active</span></div>
                {[
                  ["PAY-318","Reconcile Stripe webhook retries","prog","In Progress","#2A6FDB","ML"],
                  ["PAY-322","Idempotency keys for refunds","block","Blocked","#C8362B","RK"],
                  ["PAY-310","Migrate ledger to decimal","prog","In Progress","#1F8A5B","JD"],
                  ["PAY-301","Add 3DS fallback flow","todo","To Do","#7A6FF0","SA"],
                  ["PAY-298","Payout schedule audit log","done","Done","#1F8A5B","TM"],
                ].map((r,i)=>(
                  <div className="issue" key={i}>
                    <span className="key mono">{r[0]}</span>
                    <span className="ititle">{r[1]}</span>
                    <span className={"pill "+r[2]}>{r[3]}</span>
                    <span className="ava" style={{background:r[4]}}>{r[5]}</span>
                  </div>
                ))}
              </div>
              <div className="col">
                <div className="panelhead"><h4>Health</h4></div>
                <div className="stat"><div className="lab"><span>Sprint progress</span><span>62%</span></div><div className="bar2"><i style={{width:"62%"}}></i></div></div>
                <div className="stat"><div className="lab"><span>Dependency health</span><span>91%</span></div><div className="bar2"><i style={{width:"91%",background:"#1F8A5B"}}></i></div></div>
                <div className="alert"><span>⚠</span><span><b>3 issues stale &gt; 5 days.</b> PAY-322 blocked since Mon.</span></div>
                <div className="alert bad"><span>✕</span><span><b>1 vulnerable package</b> in <span className="mono">api-gateway</span>.</span></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* LOGOS */}
      <div className="logos">
        <div className="wrap">
          <p>Connects with the tools your team already runs on</p>
          <div className="logorow">
            <span className="lgo"><span className="sq" style={{background:"#2A6FDB"}}></span>Jira</span>
            <span className="lgo"><span className="sq" style={{background:"#1F2328"}}></span>GitHub</span>
            <span className="lgo"><span className="sq" style={{background:"#1F57B0"}}></span>Bitbucket</span>
            <span className="lgo"><span className="sq" style={{background:"#5A6577"}}></span>GitLab</span>
            <span className="lgo"><span className="sq" style={{background:"#7A6FF0"}}></span>Slack</span>
          </div>
        </div>
      </div>

      {/* FEATURE 1 — Jira monitoring */}
      <section className="feat">
        <div className="wrap">
          <div className="row">
            <div>
              <span className="ftag">Jira monitoring</span>
              <h2>See what's really moving — and what's stuck.</h2>
              <p className="lead">Plokr syncs your boards in real time and surfaces the issues that need attention: stale tickets, blocked work, slipping sprints, and unbalanced load across the team.</p>
              <ul className="checklist">
                {[
                  "Live sprint burndown and progress without opening Jira",
                  "Automatic flags for stale, blocked, and at-risk issues",
                  "Workload view across assignees, squads, and epics",
                  "Trend history so you can spot slippage early",
                ].map((t,i)=>(<li key={i}><span className="tick">✓</span>{t}</li>))}
              </ul>
            </div>
            <div className="depcard">
              <div className="dhead"><span className="dot" style={{background:"#2A6FDB",width:14,height:14}}></span><span className="repo">Sprint 24 · at a glance</span><span className="chip" style={{marginLeft:"auto"}}>updated 2m ago</span></div>
              {[
                ["Issues in progress","8","ok","on track"],
                ["Blocked","2","vuln","needs attention"],
                ["Stale > 5 days","3","out","review"],
                ["Closed this sprint","17","ok","+4 vs avg"],
              ].map((r,i)=>(
                <div className="deprow" key={i}>
                  <span className="pkg">{r[0]}</span>
                  <span className="ver" style={{fontSize:18,color:"#0F1623"}}>{r[1]}</span>
                  <span className={"tag "+r[2]}>{r[3]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 2 — Dependency checker */}
      <section className="feat" style={{paddingTop:0}}>
        <div className="wrap">
          <div className="row rev">
            <div>
              <span className="ftag">Dependency checker</span>
              <h2>Know exactly what's outdated or vulnerable.</h2>
              <p className="lead">Connect GitHub and Bitbucket and Plokr continuously audits every repo's dependencies — flagging outdated versions and known vulnerabilities before they reach production.</p>
              <ul className="checklist">
                {[
                  "Continuous scanning across GitHub and Bitbucket repos",
                  "Severity-ranked vulnerability alerts with CVE links",
                  "Outdated-package detection with safe upgrade paths",
                  "One dashboard for every service and library",
                ].map((t,i)=>(<li key={i}><span className="tick">✓</span>{t}</li>))}
              </ul>
            </div>
            <div className="depcard">
              <div className="dhead"><span className="dot" style={{background:"#1F2328",width:14,height:14}}></span><span className="repo">acme/api-gateway</span>
                <span className="summary"><span className="tag out">4 outdated</span><span className="tag vuln">1 vuln</span></span></div>
              {[
                ["express","4.18.2 → 4.21.1","out","outdated"],
                ["jsonwebtoken","8.5.1 → 9.0.2","vuln","CVE-2022-23529"],
                ["pg","8.11.3","ok","up to date"],
                ["lodash","4.17.21","ok","up to date"],
                ["axios","1.4.0 → 1.7.7","out","outdated"],
              ].map((r,i)=>(
                <div className="deprow" key={i}>
                  <span className="pkg">{r[0]}</span>
                  <span className="ver">{r[1]}</span>
                  <span className={"tag "+r[2]}>{r[3]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <div className="wrap">
          <div className="head">
            <h2>Connected in three steps.</h2>
            <p>No agents, no config files. Authorize your tools and Plokr starts watching.</p>
          </div>
          <div className="steps">
            {[
              ["1","Connect your stack","Authorize Jira, GitHub, and Bitbucket with OAuth. Read-only by default — Plokr never writes to your repos or boards."],
              ["2","Plokr monitors","We sync issues and scan dependencies continuously, building a live picture of progress and risk across every project."],
              ["3","Act before it's late","Get ranked alerts in-app and in Slack the moment something stalls, slips, or becomes vulnerable."],
            ].map((s,i)=>(
              <div className="step" key={i}><span className="n">{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing">
        <div className="wrap">
          <div className="head"><h2>Simple pricing that scales.</h2><p>Start free, upgrade when your team grows. Prices shown per workspace.</p></div>
          <div className="tiers">
            {[
              {name:"Starter",price:"$0",per:"/mo",desc:"For individuals getting started",feats:["1 Jira project","Up to 3 repos","Weekly dependency scans","Email alerts"],cta:"Start free",style:"btn-line",href:TRIAL_URL},
              {name:"Team",price:"$49",per:"/mo",desc:"For squads shipping together",feats:["Unlimited Jira projects","Up to 25 repos","Hourly dependency scans","Slack + email alerts","Stale & blocked detection","30-day trend history"],cta:"Start free trial",style:"btn-primary",href:TRIAL_URL,pop:true},
              {name:"Enterprise",price:"Custom",per:"",desc:"For orgs with compliance needs",feats:["Unlimited repos & projects","Real-time scanning","SSO / SAML & SCIM","Audit logs & RBAC","Dedicated support SLA"],cta:"Contact sales",style:"btn-line",href:"#"},
            ].map((t,i)=>(
              <div className={"tier"+(t.pop?" pop":"")} key={i}>
                {t.pop&&<span className="ribbon">Most popular</span>}
                <span className="tname">{t.name}</span>
                <div className="price">{t.price}<small>{t.per}</small></div>
                <p className="tdesc">{t.desc}</p>
                <ul>{t.feats.map((f,j)=>(<li key={j}><span className="tk">✓</span>{f}</li>))}</ul>
                <a className={"btn "+t.style} href={t.href} style={{marginTop:"auto"}}>{t.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="ctaband">
        <div className="wrap">
          <div className="box">
            <h2>Stop chasing status. Start seeing it.</h2>
            <p>Connect Plokr to your Jira and repos in minutes and get a live picture of progress and risk across your whole team.</p>
            <div className="cta">
              <a className="btn btn-primary btn-lg" href={TRIAL_URL} style={{background:"#fff",color:"#0F1623"}}>Start free trial</a>
              <a className="btn btn-line btn-lg" href={APP_URL}>Log in</a>
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
          <div className="legal"><span>© 2026 Plokr, Inc.</span><span>Built for engineering teams that ship.</span></div>
        </div>
      </footer>
    </div>
  );
}
window.ClarityHome = ClarityHome;
