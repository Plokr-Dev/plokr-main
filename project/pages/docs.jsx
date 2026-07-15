/* Docs landing / overview page */
function DocsContent(){
  const nav = [
    ["Get started",[["Introduction",true],["Quickstart",false],["Core concepts",false]]],
    ["Connect tools",[["Jira & Trello",false],["GitHub",false],["Bitbucket",false],["GitLab",false]]],
    ["Monitoring",[["Sprint health",false],["Stale & blocked",false],["Dependency scans",false],["Alerts & webhooks",false]]],
    ["Platform",[["Roles & access",false],["API reference",false],["Security",false]]],
  ];
  const cards = [
    [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8Z"/></svg>,"Quickstart","Connect your first tool and see insights in under five minutes."],
    [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg>,"Connect Jira & Trello","Authorize boards, choose projects, and configure sync frequency."],
    [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M6 8.4v3a2 2 0 0 0 2 2h2.5M18 8.4v3a2 2 0 0 1-2 2h-2.5"/></svg>,"Dependency scanning","How scans run, what's read, and how findings are ranked."],
    [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/></svg>,"Alerts & webhooks","Set policies and route alerts to email and outbound webhooks."],
    [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>,"Roles & access","Invite teammates and manage role-based permissions."],
    [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>,"API reference","Authenticate and pull your Plokr data programmatically."],
  ];
  return (
    <React.Fragment>
      <style>{`
        .mc .docsearch{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:0 16px;height:52px;max-width:520px;margin-top:24px;box-shadow:0 14px 30px -24px rgba(12,26,43,.4);}
        .mc .docsearch svg{width:18px;height:18px;color:var(--muted);}
        .mc .docsearch input{border:none;outline:none;flex:1;font-size:15px;font-family:"Hanken Grotesk";color:var(--ink);background:transparent;}
        .mc .docsearch .kbd{font-family:"JetBrains Mono";font-size:11px;color:var(--muted);border:1px solid var(--line);border-radius:5px;padding:2px 7px;}
      `}</style>

      <header className="phero">
        <div className="wrap">
          <span className="eyebrow">Documentation</span>
          <h1>Everything you need to run Plokr.</h1>
          <p className="lede">Guides, concepts, and an API reference — from your first connection to advanced policies.</p>
          <div className="docsearch"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg><input placeholder="Search the docs…" /><span className="kbd">⌘K</span></div>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="docs">
            <aside className="docnav">
              {nav.map((g,i)=>(
                <div key={i}><div className="grp">{g[0]}</div>{g[1].map((l,j)=>(<a className={l[1]?"on":""} href="#" key={j}>{l[0]}</a>))}</div>
              ))}
            </aside>
            <div>
              <h2 style={{fontSize:24,marginBottom:6}}>Popular topics</h2>
              <p style={{color:"var(--muted)",fontSize:15,marginBottom:26}}>Jump into the most-read guides, or browse the sidebar.</p>
              <div className="grid3">
                {cards.map((c,i)=>(
                  <a className="doccard" href="#" key={i}><span className="di">{c[0]}</span><h3>{c[1]}</h3><p>{c[2]}</p></a>
                ))}
              </div>
              <div className="card" style={{marginTop:26,display:"flex",alignItems:"center",gap:20,padding:"24px 26px"}}>
                <div style={{flex:1}}>
                  <h3 style={{fontFamily:"Archivo",fontSize:18,marginBottom:6}}>Prefer to learn by doing?</h3>
                  <p style={{color:"var(--muted)",fontSize:14}}>Spin up a workspace and follow the in-app quickstart checklist.</p>
                </div>
                <a className="btn btn-primary" href={PLOKR_APP}>Open the app</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
window.DocsContent = DocsContent;
