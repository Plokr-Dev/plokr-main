/* Plokr site shell — shared nav (with dropdowns), footer, auth modal.
   Exposes <SiteChrome current="..."> and usePlokr() (gives openAuth).
   Depends on window.PLOKR_STYLES (site/styles.jsx). */
const PLOKR_APP = "https://plork.com/app";
const HOME = "Plokr Homepage.html";

// icon helpers
const IcBoard = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/></svg>);
const IcDeps = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M6 8.5v3a2 2 0 0 0 2 2h3M18 8.5v3a2 2 0 0 1-2 2h-3"/></svg>);
const IcShield = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3Z"/><path d="M9 12l2 2 4-4"/></svg>);
const IcBuilding = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 8h0M15 8h0M9 12h0M15 12h0M9 16h6"/></svg>);
const IcWrite = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4l11-11a2.5 2.5 0 0 0-3.5-3.5L4 16v4Z"/><path d="M13.5 6.5l3.5 3.5"/></svg>);
const IcTag = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9Z"/><circle cx="8" cy="8" r="1.4" fill="currentColor"/></svg>);
const IcMail = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg>);

const PRODUCT_DD = [
  {href:"jira-monitoring.html", icon:<IcBoard/>, t:"Jira Monitoring", d:"Live sprint, board & issue tracking"},
  {href:"dependency-checker.html", icon:<IcDeps/>, t:"Dependency Checker", d:"Outdated & vulnerable packages, ranked"},
  {href:"security.html", icon:<IcShield/>, t:"Security & data integrity", d:"Read-only, authorize-first access"},
];
const COMPANY_DD = [
  {href:"about.html", icon:<IcBuilding/>, t:"About", d:"Who we are and why we built Plokr"},
  {href:"blog.html", icon:<IcWrite/>, t:"Blog", d:"Engineering & product writing"},
  {href:"changelog.html", icon:<IcTag/>, t:"Changelog", d:"What's new in Plokr"},
  {href:"contact.html", icon:<IcMail/>, t:"Contact", d:"Talk to us or book a demo"},
];

const PlokrCtx = React.createContext({ openAuth: () => () => {} });
function usePlokr(){ return React.useContext(PlokrCtx); }

function SiteNav({ current, openAuth }) {
  const [dd, setDd] = React.useState(null);
  const Dropdown = ({id, label, items}) => (
    <div className={"dd"+(dd===id?" open":"")} onMouseEnter={()=>setDd(id)} onMouseLeave={()=>setDd(null)}>
      <button className="ddtrigger" onClick={()=>setDd(dd===id?null:id)}>{label}
        <svg className="caret" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2 4l3.5 3.5L9 4"/></svg>
      </button>
      <div className="ddmenu">
        {items.map((it,i)=>(
          <a className="dditem" href={it.href} key={i}><span className="di">{it.icon}</span><span><b>{it.t}</b><span>{it.d}</span></span></a>
        ))}
      </div>
    </div>
  );
  return (
    <nav className="nav">
      <div className="wrap">
        <a className="logo" href={HOME}><span className="mark"></span>Plokr</a>
        <div className="navlinks">
          <Dropdown id="product" label="Product" items={PRODUCT_DD} />
          <a href="integrations.html" className={current==="integrations"?"on":""}>Integrations</a>
          <a href="pricing.html" className={current==="pricing"?"on":""}>Pricing</a>
          <a href="docs.html" className={current==="docs"?"on":""}>Docs</a>
          <Dropdown id="company" label="Company" items={COMPANY_DD} />
        </div>
        <div className="navright">
          <a className="login" href={PLOKR_APP} onClick={openAuth('login')}>Log in</a>
          <a className="btn btn-primary" href={PLOKR_APP} onClick={openAuth('signup')}>Start free trial</a>
        </div>
      </div>
    </nav>
  );
}

function SiteFooter() {
  const cols = [
    ["Product",[["Jira Monitoring","jira-monitoring.html"],["Dependency Checker","dependency-checker.html"],["Integrations","integrations.html"],["Pricing","pricing.html"],["Security","security.html"]]],
    ["Company",[["About","about.html"],["Blog","blog.html"],["Changelog","changelog.html"],["Contact","contact.html"]]],
    ["Resources",[["Docs","docs.html"],["Status","#"],["API reference","docs.html"],["Community","#"]]],
    ["Legal",[["Privacy","privacy.html"],["Terms","terms.html"],["DPA","dpa.html"],["Security","security.html"]]],
  ];
  return (
    <footer>
      <div className="wrap">
        <div className="grid">
          <div>
            <a className="logo" href={HOME}><span className="mark"></span>Plokr</a>
            <p className="fdesc">Mission control for engineering — real-time Jira monitoring and dependency health across GitHub, Bitbucket, GitLab and Trello.</p>
          </div>
          {cols.map((c,i)=>(
            <div className="fcol" key={i}><h5>{c[0]}</h5>{c[1].map((l,j)=>(<a href={l[1]} key={j}>{l[0]}</a>))}</div>
          ))}
        </div>
        <div className="legal"><span>© 2026 Plokr, Inc.</span><span>SOC 2 Type II · GDPR ready</span></div>
      </div>
    </footer>
  );
}

function AuthModal({ mode, setMode }) {
  const [redirecting, setRedirecting] = React.useState(false);
  const go = () => { setRedirecting(true); setTimeout(()=>{ window.open(PLOKR_APP,'_blank'); setRedirecting(false); setMode(null); }, 1200); };
  if(!mode) return null;
  return (
    <div className="ovl" onClick={()=>!redirecting && setMode(null)}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        {!redirecting && <button className="close" onClick={()=>setMode(null)}>×</button>}
        {redirecting ? (
          <div className="redir">
            <div className="spinner"></div>
            <div className="rt">Redirecting you securely…</div>
            <div className="rs">Taking you to <b>plork.com/app</b> to {mode==='signup'?'create your workspace':'sign in'}.</div>
          </div>
        ) : (
          <React.Fragment>
            <div className="mtop">
              <span className="mlogo"><span className="mark"></span>Plokr</span>
              <h3>{mode==='signup' ? 'Start your free trial' : 'Welcome back'}</h3>
              <p className="msub">{mode==='signup' ? 'Connect your tools and see progress in minutes. No credit card required.' : 'Sign in to your Plokr workspace to continue.'}</p>
            </div>
            <div className="body">
              {[["#2563EB","Continue with Atlassian"],["#1F2328","Continue with GitHub"],["#EA4335","Continue with Google"]].map((p,i)=>(
                <button className="prov" key={i} onClick={go}><span className="sq" style={{background:p[0]}}></span>{p[1]}<span className="ar">→</span></button>
              ))}
              <div className="divider">or with email</div>
              <input className="field" type="email" placeholder="you@company.com" onKeyDown={(e)=>{if(e.key==='Enter')go();}} />
              <button className="cont" onClick={go}>{mode==='signup' ? 'Create workspace' : 'Continue'}</button>
            </div>
            <div className="foot">
              <div className="lockline">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
                Read-only access · you authorize every connection
              </div>
              <div className="switch">
                {mode==='signup'
                  ? <span>Already have an account? <a onClick={()=>setMode('login')}>Log in</a></span>
                  : <span>New to Plokr? <a onClick={()=>setMode('signup')}>Start free trial</a></span>}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

function SiteChrome({ current, children }) {
  const [authMode, setAuthMode] = React.useState(null);
  const openAuth = (m) => (e) => { if(e) e.preventDefault(); setAuthMode(m); };
  return (
    <PlokrCtx.Provider value={{ openAuth }}>
      <div className="mc">
        <style>{window.PLOKR_STYLES}</style>
        <SiteNav current={current} openAuth={openAuth} />
        {children}
        <SiteFooter />
        <AuthModal mode={authMode} setMode={setAuthMode} />
      </div>
    </PlokrCtx.Provider>
  );
}

Object.assign(window, { SiteChrome, usePlokr, PlokrCtx, PLOKR_APP });
