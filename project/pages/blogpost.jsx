/* Blog article template */
function BlogPostContent(){
  const { openAuth } = usePlokr();
  return (
    <React.Fragment>
      <style>{`
        .mc .articlehead{max-width:760px;margin:0 auto;padding:0 56px;}
        .mc .articlehead .byline{display:flex;align-items:center;gap:12px;margin-top:26px;}
        .mc .articlehead .av{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#3B82F6,#2563EB);color:#fff;font-family:"Archivo";font-weight:700;display:flex;align-items:center;justify-content:center;font-size:15px;}
        .mc .articlehead .bn{font-size:14px;font-weight:600;color:var(--ink);}
        .mc .articlehead .bm{font-size:12.5px;color:var(--muted);font-family:"JetBrains Mono";}
        .mc .herofig{max-width:960px;margin:36px auto 0;padding:0 56px;}
        .mc .herofig .img{height:340px;border-radius:16px;background:linear-gradient(135deg,var(--navy2),var(--navy));position:relative;overflow:hidden;border:1px solid var(--line);}
        .mc .herofig .img::after{content:"";position:absolute;inset:0;background:radial-gradient(420px 220px at 78% 12%,rgba(59,130,246,.42),transparent 60%);}
      `}</style>

      <header className="phero" style={{paddingBottom:38}}>
        <div className="articlehead">
          <div className="crumbs"><a href="blog.html">Blog</a><span>/</span><span style={{color:"var(--blue-d)"}}>Engineering</span></div>
          <h1 style={{fontSize:42,marginTop:18}}>Why dependency risk is a delivery problem, not just a security one</h1>
          <div className="byline"><span className="av">MO</span><div><div className="bn">Maya Okonkwo</div><div className="bm">Apr 18, 2026 · 6 min read</div></div></div>
        </div>
      </header>

      <div className="herofig"><div className="img"></div></div>

      <article className="sec" style={{paddingTop:48}}>
        <div className="wrap-xs">
          <div className="prose">
            <p>Most teams treat dependency upgrades as a security chore — something the platform team batches up once a quarter when a scanner goes red. But the cost of drifting dependencies shows up long before a CVE does, and it shows up as <strong>slower delivery</strong>.</p>
            <p>When a service is three majors behind on its core framework, every new feature pays a tax: more workarounds, more flaky tests, more "we can't use that API yet." The risk isn't only that you'll get breached. It's that you'll get slow.</p>
            <h2>Risk is about impact, not count</h2>
            <p>A dashboard that says "47 outdated packages" is useless. Two of those might be one patch behind on a dev-only linter. One might be a remotely exploitable flaw in the library that signs your auth tokens. Treating them equally is how real risk hides in plain sight.</p>
            <blockquote>The goal isn't zero outdated dependencies. It's knowing, at any moment, which one would hurt the most to ignore.</blockquote>
            <p>That's why Plokr ranks every finding by severity <em>and</em> real exploitability, then weights it by where the dependency sits in your system. A vulnerable package in your public API gateway outranks the same package buried in an internal tool.</p>
            <h2>Putting it next to delivery</h2>
            <p>Here's the part most tools miss: the same teams shipping features are the ones who have to absorb upgrades. So we put dependency health <strong>next to sprint health</strong>. When a squad's velocity dips the same week its risk score climbs, that's a conversation worth having — and now it's one screen, not two tools.</p>
            <ul>
              <li>Rank by exploitability and blast radius, not raw count</li>
              <li>Show risk next to the team that owns the code</li>
              <li>Offer the safe upgrade path, not just the warning</li>
            </ul>
            <p>None of this requires a new process. Plokr reads your manifests in read-only mode and does the ranking for you — so the next time someone asks "are we exposed?", the answer takes ten seconds, not an afternoon.</p>
          </div>

          <div className="card" style={{marginTop:40,display:"flex",alignItems:"center",gap:20,padding:"24px 26px"}}>
            <div style={{flex:1}}><h3 style={{fontFamily:"Archivo",fontSize:18,marginBottom:6}}>See your dependency risk, ranked.</h3><p style={{color:"var(--muted)",fontSize:14}}>Connect a repo and get a fixable list on your first scan.</p></div>
            <a className="btn btn-primary" href={PLOKR_APP} onClick={openAuth('signup')}>Start free trial</a>
          </div>
        </div>
      </article>
    </React.Fragment>
  );
}
window.BlogPostContent = BlogPostContent;
