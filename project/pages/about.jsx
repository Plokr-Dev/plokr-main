/* About / Company page */
function AboutContent(){
  const { openAuth } = usePlokr();
  const values = [
    ["Signal over noise","Most tools bury the one thing you need under a hundred you don't. We design for the alert that actually changes your day."],
    ["Earn trust, read-only","We hold ourselves to the standard our customers hold their own infra. Least privilege, authorize-first, nothing hidden."],
    ["Built by people who shipped","We've run the on-call rotations and missed the deadlines. Plokr is the tool we wished we had."],
    ["Calm by default","Software for engineering leaders shouldn't add anxiety. Plokr is quiet until something needs you."],
  ];
  return (
    <React.Fragment>
      <header className="phero">
        <div className="wrap">
          <span className="eyebrow">About Plokr</span>
          <h1>We build the layer that keeps engineering in sync.</h1>
          <p className="lede">Plokr started with a simple frustration: the status of a team's work lived in a dozen tabs, and the risk hiding in its dependencies lived in none of them. We set out to put both in one calm, trustworthy view.</p>
        </div>
      </header>

      <section className="sec">
        <div className="wrap-sm">
          <div className="prose">
            <p>Engineering teams don't lack data — they're drowning in it. Jira knows what's in flight. GitHub, Bitbucket and GitLab know what's deployed and what's vulnerable. Trello holds the roadmap. But no one place answers the question every engineering leader actually asks: <strong>are we on track, and is anything about to break?</strong></p>
            <p>Plokr is that place. We connect to the tools you already use — strictly read-only — and turn their raw activity into a live picture of progress and risk. Stale tickets surface. Blocked work gets flagged. Vulnerable packages get ranked. And none of it requires you to change how your team works.</p>
            <h2>Our principles</h2>
            <p>We believe observability tools should be <strong>calm</strong>, <strong>honest about what they touch</strong>, and <strong>useful from the first connection</strong>. Those beliefs shape every decision we make — from our read-only-by-default architecture to the way we rank a single alert above a wall of them.</p>
          </div>
        </div>
      </section>

      <section className="sec soft">
        <div className="wrap">
          <div className="sec-head"><span className="ftag">What we value</span><h2 style={{marginTop:16}}>How we think about the product.</h2></div>
          <div className="grid2">
            {values.map((v,i)=>(<div className="feat-card" key={i}><h3>{v[0]}</h3><p>{v[1]}</p></div>))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="grid4" style={{textAlign:"center"}}>
            {[["200+","teams on Plokr"],["14k","repos monitored"],["1.2M","issues synced / wk"],["99.95%","uptime"]].map((m,i)=>(
              <div key={i}><div style={{fontFamily:"Archivo",fontWeight:800,fontSize:44,letterSpacing:"-.02em"}}>{m[0]}</div><div style={{fontSize:14,color:"var(--muted)",marginTop:4}}>{m[1]}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec ctaband" style={{paddingTop:0}}><div className="wrap"><div className="box">
        <h2>Come build with us — or just try it.</h2>
        <p>We're a small team obsessed with making engineering legible. Reach out, or spin up a workspace.</p>
        <div className="cta"><a className="btn btn-primary btn-lg" href={PLOKR_APP} onClick={openAuth('signup')} style={{background:"#fff",color:"#0C1A2B"}}>Start free trial</a><a className="btn btn-line btn-lg" href="contact.html">Get in touch</a></div>
      </div></div></section>
    </React.Fragment>
  );
}
window.AboutContent = AboutContent;
