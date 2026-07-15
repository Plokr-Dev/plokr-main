/* Dependency Checker feature page */
function DepsContent(){
  const { openAuth } = usePlokr();
  const repos = [
    ["acme/api-gateway","main","2 outdated","1 vuln","vuln"],
    ["acme/ledger-svc","main","0 outdated","0 vuln","ok"],
    ["acme/web-dashboard","main","5 outdated","0 vuln","out"],
    ["acme/payments-sdk","main","1 outdated","1 vuln","vuln"],
  ];
  const feats = [
    ["Continuous scanning","Every push and on a schedule, Plokr re-scans manifests and lockfiles across all your repos — GitHub, Bitbucket and GitLab."],
    ["Severity-ranked CVEs","Vulnerabilities are ranked by severity and exploitability with linked CVE detail, so you fix what actually matters first."],
    ["Outdated detection","Track packages drifting behind latest, with safe-upgrade suggestions and breaking-change warnings."],
    ["One-click PR drafts","Generate upgrade pull requests with changelog context, ready for your team to review and merge."],
    ["Org-wide risk view","A single dashboard ranks every service and library by risk — no more spreadsheets of dependencies."],
    ["Policy & alerts","Set thresholds and get notified by email or webhook the moment a repo breaches policy."],
  ];
  const ecosystems = ["npm","pnpm","yarn","pip / PyPI","Poetry","Maven","Gradle","Go modules","Cargo","Composer","RubyGems","NuGet"];
  return (
    <React.Fragment>
      <style>{`
        .mc .dhero .wrap{display:grid;grid-template-columns:1fr 1.02fr;gap:54px;align-items:center;}
        .mc .reporow{display:flex;align-items:center;gap:12px;padding:14px 18px;border-top:1px solid rgba(255,255,255,.07);}
        .mc .reporow:first-of-type{border-top:0;}
        .mc .reporow .rn{font-family:"JetBrains Mono";font-size:13px;color:#fff;font-weight:600;flex:1;}
        .mc .reporow .br{font-family:"JetBrains Mono";font-size:11px;color:rgba(255,255,255,.4);}
        .mc .reporow .cnt{font-size:11.5px;color:rgba(255,255,255,.55);}
        .mc .rdot{width:9px;height:9px;border-radius:50%;flex:none;}
        .mc .ecos{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;}
        .mc .eco{font-family:"JetBrains Mono";font-size:13px;color:var(--ink2);border:1px solid var(--line);background:#fff;padding:9px 15px;border-radius:9px;}
        .mc .cve{background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:16px 18px;}
        .mc .cve .cid{font-family:"JetBrains Mono";font-size:12px;color:var(--bad);font-weight:600;}
        .mc .sevbar{height:6px;border-radius:4px;background:#EEF1F6;overflow:hidden;margin:10px 0;}
        .mc .sevbar i{display:block;height:100%;background:var(--bad);}
      `}</style>

      <header className="phero dark dhero">
        <div className="wrap">
          <div>
            <div className="crumbs"><a href="Plokr Homepage.html">Home</a><span>/</span><span>Product</span><span>/</span><span style={{color:"#fff"}}>Dependency Checker</span></div>
            <span className="eyebrow">Dependency Checker</span>
            <h1>Outdated and vulnerable, <em>caught early</em>.</h1>
            <p className="lede">Connect GitHub, Bitbucket and GitLab and Plokr audits every repo's dependencies around the clock — ranking risk so your team fixes what matters first.</p>
            <div className="cta">
              <a className="btn btn-primary btn-lg" href={PLOKR_APP} onClick={openAuth('signup')}>Start free trial</a>
              <a className="btn btn-line btn-lg" href="contact.html" style={{background:"rgba(255,255,255,.06)",borderColor:"rgba(255,255,255,.22)",color:"#fff"}}>Book a demo</a>
            </div>
          </div>
          <div className="card" style={{background:"var(--navy2)",borderColor:"rgba(255,255,255,.1)"}}>
            <div className="ch" style={{borderColor:"rgba(255,255,255,.08)"}}><span className="t" style={{color:"#fff"}}>Dependency risk · acme org</span><span className="chip" style={{color:"rgba(255,255,255,.5)",borderColor:"rgba(255,255,255,.14)"}}>14 repos</span></div>
            {repos.map((r,i)=>(
              <div className="reporow" key={i}>
                <span className="rdot" style={{background:r[4]==="vuln"?"#EF4444":r[4]==="out"?"#F59E0B":"#10B981"}}></span>
                <span className="rn">{r[0]}</span>
                <span className="br">{r[1]}</span>
                <span className="cnt">{r[2]}</span>
                <span className={"tag "+(r[4])} >{r[3]}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><span className="ftag">Capabilities</span><h2 style={{marginTop:16}}>From noisy alerts to a ranked, fixable list.</h2></div>
          <div className="grid3">
            {feats.map((f,i)=>(
              <div className="feat-card" key={i}>
                <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M6 8.4v3a2 2 0 0 0 2 2h2.5M18 8.4v3a2 2 0 0 1-2 2h-2.5"/></svg></span>
                <h3>{f[0]}</h3><p>{f[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec soft">
        <div className="wrap">
          <div className="frow rev">
            <div>
              <span className="ftag">Severity-ranked</span>
              <h2>Fix the one that matters, not all forty.</h2>
              <p className="lead">Plokr ranks every finding by severity and real exploitability, links the CVE, and shows the exact safe version to move to — so triage takes minutes, not afternoons.</p>
              <ul className="checklist">
                {["CVSS severity with exploit-maturity context","Direct CVE & advisory links","Safe upgrade target with breaking-change notes","One-click PR draft with changelog"].map((t,i)=>(<li key={i}><span className="tick">✓</span>{t}</li>))}
              </ul>
            </div>
            <div className="card">
              <div className="ch"><span className="t mono" style={{fontFamily:"JetBrains Mono",fontSize:14}}>jsonwebtoken</span><span className="chip">acme/api-gateway</span></div>
              <div style={{padding:"20px"}}>
                <div className="cve">
                  <div className="cid">CVE-2022-23529 · HIGH (7.6)</div>
                  <div className="sevbar"><i style={{width:"76%"}}></i></div>
                  <div style={{fontSize:13.5,color:"var(--ink2)",lineHeight:1.5}}>Improper key-type verification can allow JWT signature bypass. Affects 8.x and below.</div>
                </div>
                <div className="drow" style={{padding:"16px 2px 0",borderTop:0}}>
                  <span className="ver">8.5.1</span><span style={{color:"var(--muted)"}}>→</span><span className="ver" style={{color:"var(--ok)"}}>9.0.2</span>
                  <a className="btn btn-primary" href={PLOKR_APP} onClick={openAuth('signup')} style={{marginLeft:"auto",height:38,padding:"0 16px",fontSize:13.5}}>Draft PR</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><span className="ftag">Ecosystems</span><h2 style={{marginTop:16}}>Scans the package managers your repos actually use.</h2><p>Across GitHub, Bitbucket and GitLab — public and private.</p></div>
          <div className="ecos">{ecosystems.map((e,i)=>(<span className="eco" key={i}>{e}</span>))}</div>
        </div>
      </section>

      <section className="sec ctaband"><div className="wrap"><div className="box">
        <h2>See your dependency risk in 5 minutes.</h2>
        <p>Connect a repo and Plokr returns a ranked, fixable list on your first scan.</p>
        <div className="cta"><a className="btn btn-primary btn-lg" href={PLOKR_APP} onClick={openAuth('signup')} style={{background:"#fff",color:"#0C1A2B"}}>Start free trial</a><a className="btn btn-line btn-lg" href="integrations.html">View integrations</a></div>
      </div></div></section>
    </React.Fragment>
  );
}
window.DepsContent = DepsContent;
