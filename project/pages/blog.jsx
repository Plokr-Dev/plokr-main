/* Blog index page */
function BlogContent(){
  const featured = ["Engineering","Why dependency risk is a delivery problem, not just a security one","Outdated and vulnerable packages don't just create CVEs — they quietly slow every team that depends on them. Here's how we think about ranking risk by impact.","Maya Okonkwo","Apr 18, 2026","6 min"];
  const posts = [
    ["Product","Introducing delivery heatmaps","See throughput patterns across squads at a glance — and spot the weeks that quietly slipped.","Jordan Lee","Apr 9, 2026","4 min"],
    ["Engineering","Reading Jira without slowing Jira down","How Plokr syncs boards in real time using read-only APIs and incremental updates.","Sam Alvarez","Mar 28, 2026","7 min"],
    ["Security","Authorize-first: our take on least privilege","Why we built Plokr to see nothing until you explicitly grant scoped, read-only access.","Riya Kapoor","Mar 14, 2026","5 min"],
    ["Product","Ranking alerts so the right one wins","Forty findings help no one. A look at how we score severity by real exploitability.","Maya Okonkwo","Feb 27, 2026","5 min"],
    ["Culture","What we learned running 200 on-call rotations","Lessons from the trenches that shaped how Plokr surfaces blockers and stale work.","Jordan Lee","Feb 12, 2026","8 min"],
    ["Engineering","Trend models that predict a sprint miss","The lightweight forecasting behind Plokr's at-risk sprint flags.","Sam Alvarez","Jan 30, 2026","6 min"],
  ];
  return (
    <React.Fragment>
      <header className="phero">
        <div className="wrap">
          <span className="eyebrow">Blog</span>
          <h1>Writing from the Plokr team.</h1>
          <p className="lede">Notes on engineering observability, dependency risk, and building calm tools for teams that ship.</p>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <a className="feat-post" href="blog-post.html">
            <div className="thumb"></div>
            <div className="pc">
              <span className="cat">{featured[0]}</span>
              <h2>{featured[1]}</h2>
              <p>{featured[2]}</p>
              <div className="meta" style={{marginTop:18,fontSize:12.5,color:"var(--muted)"}}>{featured[3]} · {featured[4]} · {featured[5]} read</div>
            </div>
          </a>
          <div className="bloglist">
            {posts.map((p,i)=>(
              <a className="post" href="blog-post.html" key={i}>
                <div className="thumb"></div>
                <div className="pc">
                  <span className="cat">{p[0]}</span>
                  <h3>{p[1]}</h3>
                  <p>{p[2]}</p>
                  <div className="meta">{p[3]} · {p[4]} · {p[5]}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
window.BlogContent = BlogContent;
