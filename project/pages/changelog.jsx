/* Changelog page */
function ChangelogContent(){
  const entries = [
    ["Apr 22, 2026","v2.8",[
      ["new","Delivery heatmaps — visualize issues resolved per day across 18 weeks, per squad."],
      ["imp","Velocity charts now show an at-risk marker when scope grows mid-sprint."],
      ["fix","Resolved a sync delay for Jira projects with 5,000+ issues."],
    ]],
    ["Apr 8, 2026","v2.7",[
      ["new","Trello boards can now be monitored alongside Jira."],
      ["new","Outbound webhooks for alert delivery, with per-policy routing."],
      ["imp","Dependency scans now surface safe-upgrade targets inline."],
    ]],
    ["Mar 24, 2026","v2.6",[
      ["new","One-click PR drafts for dependency upgrades on GitHub and GitLab."],
      ["imp","Severity ranking now factors in exploit maturity."],
      ["fix","Fixed duplicate alerts when a CVE affected multiple manifests."],
    ]],
    ["Mar 6, 2026","v2.5",[
      ["new","Cross-project rollups for leadership overviews."],
      ["imp","Faster initial scan — first results in under 60 seconds for most repos."],
      ["fix","Corrected timezone handling in weekly email digests."],
    ]],
    ["Feb 18, 2026","v2.4",[
      ["new","GitLab integration (SaaS and self-managed)."],
      ["imp","Granular, per-repo revocation in connection settings."],
    ]],
  ];
  return (
    <React.Fragment>
      <header className="phero">
        <div className="wrap">
          <span className="eyebrow">Changelog</span>
          <h1>What's new in Plokr.</h1>
          <p className="lede">Every meaningful change, shipped continuously. Subscribe via the webhook or check back here.</p>
        </div>
      </header>

      <section className="sec">
        <div className="clog">
          {entries.map((e,i)=>(
            <div className="clentry" key={i}>
              <div className="clmeta"><div className="date">{e[0]}</div><span className="ver">{e[1]}</span></div>
              <div className="clbody">
                {e[2].map((c,j)=>(
                  <div className="ci" key={j}><span className={"lab "+c[0]}>{c[0]==="new"?"New":c[0]==="imp"?"Improved":"Fixed"}</span><span>{c[1]}</span></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </React.Fragment>
  );
}
window.ChangelogContent = ChangelogContent;
