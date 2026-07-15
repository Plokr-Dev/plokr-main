/* Pricing page — tiers, comparison table, FAQ */
function PricingContent(){
  const { openAuth } = usePlokr();
  const [billing, setBilling] = React.useState('monthly');
  const [open, setOpen] = React.useState(0);
  const tiers = [
    {name:"Starter",monthly:"$0",annual:"$0",per:"/mo",desc:"For individuals getting started",feats:["1 Jira project","Up to 3 repos","Daily dependency scans","Email alerts","7-day trend history"],cta:"Start free",style:"btn-line",mode:"signup"},
    {name:"Team",monthly:"$49",annual:"$39",per:"/mo",desc:"For squads shipping together",feats:["Unlimited Jira & Trello boards","Up to 25 repos","Real-time dependency scans","Email & webhook alerts","Stale & blocked detection","90-day trend history"],cta:"Start free trial",style:"btn-primary",mode:"signup",pop:true},
    {name:"Enterprise",monthly:"Custom",annual:"Custom",per:"",desc:"For orgs with compliance needs",feats:["Unlimited repos & projects","SSO / SAML & SCIM","Audit logs & RBAC","SOC 2 report & DPA","Dedicated support SLA"],cta:"Contact sales",style:"btn-line",mode:"sales"},
  ];
  const groups = [
    ["Monitoring",[
      ["Jira & Trello boards","1 project","Unlimited","Unlimited"],
      ["Repos monitored","3","25","Unlimited"],
      ["Dependency scan frequency","Daily","Real-time","Real-time"],
      ["Stale & blocked detection","no","yes","yes"],
      ["Trend history","7 days","90 days","Unlimited"],
    ]],
    ["Alerts",[
      ["Email digests","yes","yes","yes"],
      ["Outbound webhooks","no","yes","yes"],
      ["Custom alert policies","no","yes","yes"],
    ]],
    ["Security & admin",[
      ["SSO / SAML & SCIM","no","no","yes"],
      ["Audit logs","no","no","yes"],
      ["Role-based access","no","Basic","Advanced"],
      ["SOC 2 report & DPA","no","no","yes"],
    ]],
    ["Support",[
      ["Community support","yes","yes","yes"],
      ["Priority support","no","yes","yes"],
      ["Dedicated SLA & CSM","no","no","yes"],
    ]],
  ];
  const cell = (v) => v==="yes" ? <span className="yes">✓</span> : v==="no" ? <span className="no">—</span> : v;
  const faqs = [
    ["Is there really a free plan?","Yes. Starter is free forever for individuals — one Jira project, up to three repos, and daily dependency scans. No credit card required to start."],
    ["How does the 14-day trial work?","Team features unlock instantly when you start a trial. After 14 days you can pick a plan or stay on Starter — we never auto-charge a card you didn't enter."],
    ["Can pricing and limits change later?","Plans, prices, and limits are managed centrally and update instantly across the product — so we can adjust packaging without you reinstalling anything."],
    ["What counts as a repo?","Any connected source repository on GitHub, Bitbucket, or GitLab that Plokr scans for dependencies. Boards in Jira and Trello are counted separately and are unlimited on Team and above."],
    ["Do you store our source code?","No. Plokr reads manifests, lockfiles, and board metadata in read-only mode — it never clones or stores your source code. See the Security page for details."],
    ["How is annual billing discounted?","Annual plans are billed once per year at a 20% discount versus paying monthly. You can switch between monthly and annual at any time."],
    ["Can I cancel anytime?","Yes. Downgrade or cancel from billing settings whenever you like — you keep access through the end of the current period."],
  ];
  return (
    <React.Fragment>
      <header className="phero">
        <div className="wrap" style={{textAlign:"center"}}>
          <span className="eyebrow" style={{margin:"0 auto"}}>Pricing</span>
          <h1 style={{margin:"20px auto 0"}}>Pricing that scales with your team.</h1>
          <p className="lede" style={{margin:"22px auto 0"}}>Start free, upgrade when you grow. Per workspace, no per-seat surprises.</p>
          <div className="billtoggle" style={{marginTop:26}}>
            <button className={billing==='monthly'?'on':''} onClick={()=>setBilling('monthly')}>Monthly</button>
            <button className={billing==='annual'?'on':''} onClick={()=>setBilling('annual')}>Annual <span className="save">SAVE 20%</span></button>
          </div>
        </div>
      </header>

      <section className="sec" style={{paddingTop:56}}>
        <div className="wrap">
          <div className="tiers">
            {tiers.map((t,i)=>{
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
        </div>
      </section>

      <section className="sec soft">
        <div className="wrap">
          <div className="sec-head"><h2>Compare every feature.</h2></div>
          <table className="ctable">
            <thead><tr><th style={{width:"40%"}}>Feature</th><th className="c">Starter</th><th className="c">Team</th><th className="c">Enterprise</th></tr></thead>
            <tbody>
              {groups.map((g,gi)=>(
                <React.Fragment key={gi}>
                  <tr className="grp"><td colSpan="4">{g[0]}</td></tr>
                  {g[1].map((r,ri)=>(
                    <tr key={ri}><td>{r[0]}</td><td className="c">{cell(r[1])}</td><td className="c">{cell(r[2])}</td><td className="c">{cell(r[3])}</td></tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><span className="ftag">FAQ</span><h2 style={{marginTop:16}}>Questions, answered.</h2></div>
          <div className="faq">
            {faqs.map((f,i)=>(
              <div className={"qa"+(open===i?" open":"")} key={i}>
                <button className="q" onClick={()=>setOpen(open===i?-1:i)}>
                  {f[0]}
                  <svg className="pm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                </button>
                <div className="a"><p>{f[1]}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec ctaband" style={{paddingTop:0}}><div className="wrap"><div className="box">
        <h2>Start free. Upgrade when you're ready.</h2>
        <p>No credit card to begin, and your data stays read-only from the first connection.</p>
        <div className="cta"><a className="btn btn-primary btn-lg" href={PLOKR_APP} onClick={openAuth('signup')} style={{background:"#fff",color:"#0C1A2B"}}>Start free trial</a><a className="btn btn-line btn-lg" href="contact.html">Talk to sales</a></div>
      </div></div></section>
    </React.Fragment>
  );
}
window.PricingContent = PricingContent;
