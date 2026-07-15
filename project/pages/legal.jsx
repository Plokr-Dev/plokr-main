/* Legal pages — Privacy, Terms, DPA. Rendered as <LegalContent kind="privacy|terms|dpa" /> */
function LegalContent({ kind }){
  const docs = {
    privacy: { title:"Privacy Policy", updated:"April 1, 2026", body:(
      <React.Fragment>
        <p>This Privacy Policy explains how Plokr, Inc. ("Plokr", "we") collects, uses, and protects information when you use our website and product. This is a product-design sample and not legal advice.</p>
        <h2>1. Information we collect</h2>
        <p>We collect account information you provide (such as name and work email), and operational metadata from the tools you connect — for example Jira board and issue metadata, repository names, and dependency manifests. <strong>We do not collect or store your source code.</strong></p>
        <h2>2. How we use information</h2>
        <p>We use information to operate the service: syncing your boards, scanning dependencies, generating insights and alerts, and supporting your account. We do not sell your data, and we do not use your connected data to train third-party models.</p>
        <h2>3. Authorize-first access</h2>
        <p>Plokr accesses your connected tools only after you grant explicit, scoped, read-only authorization. You can revoke access at any time, which removes our access and stored tokens.</p>
        <h2>4. Data retention</h2>
        <p>We retain operational metadata for as long as your workspace is active. On disconnection or account closure, associated data and tokens are deleted within 30 days.</p>
        <h2>5. Security</h2>
        <p>Data is encrypted in transit (TLS 1.2+) and at rest (AES-256). Access tokens are isolated per workspace. See our <a href="security.html">Security page</a> for more.</p>
        <h2>6. Your rights</h2>
        <p>Depending on your jurisdiction, you may have rights to access, correct, export, or delete your information. Contact <a href="mailto:privacy@plork.com">privacy@plork.com</a> to make a request.</p>
        <h2>7. Contact</h2>
        <p>Questions about this policy? Email <a href="mailto:privacy@plork.com">privacy@plork.com</a>.</p>
      </React.Fragment>
    )},
    terms: { title:"Terms of Service", updated:"April 1, 2026", body:(
      <React.Fragment>
        <p>These Terms govern your access to and use of Plokr. By using the service you agree to them. This is a product-design sample and not legal advice.</p>
        <h2>1. Accounts</h2>
        <p>You are responsible for your account, your workspace members, and the connections you authorize. Keep your credentials secure and ensure you have the right to connect the tools you add.</p>
        <h2>2. Acceptable use</h2>
        <p>Don't misuse the service: no attempts to disrupt it, reverse-engineer it, or access data you aren't authorized to access. Use Plokr only with tools and data you are permitted to connect.</p>
        <h2>3. Plans and billing</h2>
        <p>Paid plans are billed per workspace, monthly or annually. Plan limits and pricing may change; we'll give notice of material changes. You can upgrade, downgrade, or cancel from billing settings, with access continuing through the current period.</p>
        <h2>4. Read-only operation</h2>
        <p>Plokr operates in read-only mode against your connected tools and will not write to your boards, repositories, or pipelines.</p>
        <h2>5. Availability</h2>
        <p>We work hard to keep Plokr available and publish uptime on our status page. Enterprise plans may include a contractual SLA.</p>
        <h2>6. Liability</h2>
        <p>The service is provided "as is." To the extent permitted by law, Plokr's liability is limited as described in your order or these Terms.</p>
        <h2>7. Contact</h2>
        <p>Questions about these Terms? Email <a href="mailto:legal@plork.com">legal@plork.com</a>.</p>
      </React.Fragment>
    )},
    dpa: { title:"Data Processing Addendum", updated:"April 1, 2026", body:(
      <React.Fragment>
        <p>This Data Processing Addendum ("DPA") forms part of the agreement between Plokr and customers who are subject to applicable data protection laws. This is a product-design sample and not legal advice.</p>
        <h2>1. Roles</h2>
        <p>For data processed through the service, the customer is the data controller and Plokr is the data processor, processing data solely to provide the service per the customer's instructions.</p>
        <h2>2. Scope of processing</h2>
        <p>Plokr processes operational metadata from connected tools (board, issue, and repository metadata; dependency manifests). Plokr does not process source code and does not write to customer systems.</p>
        <h2>3. Subprocessors</h2>
        <p>We use a limited set of vetted subprocessors for hosting and infrastructure. A current list is available on request, and we provide notice of material changes.</p>
        <h2>4. Security measures</h2>
        <p>We maintain technical and organizational measures including encryption in transit and at rest, per-workspace token isolation, access controls, and audit logging. Plokr is SOC 2 Type II.</p>
        <h2>5. International transfers</h2>
        <p>Where data is transferred across regions, we rely on appropriate safeguards such as Standard Contractual Clauses.</p>
        <h2>6. Sub-processing & deletion</h2>
        <p>On termination, customer data and tokens are deleted within 30 days, subject to legal retention requirements.</p>
        <h2>7. Contact</h2>
        <p>To request a signed DPA or our subprocessor list, email <a href="mailto:security@plork.com">security@plork.com</a>.</p>
      </React.Fragment>
    )},
  };
  const d = docs[kind] || docs.privacy;
  const tabs = [["Privacy","privacy.html","privacy"],["Terms","terms.html","terms"],["DPA","dpa.html","dpa"]];
  return (
    <React.Fragment>
      <style>{`
        .mc .legaltabs{display:flex;gap:8px;margin-top:24px;}
        .mc .legaltabs a{font-size:14px;font-weight:600;color:var(--ink2);padding:8px 16px;border-radius:9px;border:1px solid var(--line);background:#fff;}
        .mc .legaltabs a.on{background:var(--navy);color:#fff;border-color:var(--navy);}
        .mc .legaltabs a:hover:not(.on){border-color:#C7D3E2;}
      `}</style>
      <header className="phero">
        <div className="wrap-xs" style={{padding:"0 56px"}}>
          <span className="eyebrow">Legal</span>
          <h1 style={{fontSize:44}}>{d.title}</h1>
          <p className="lede" style={{fontSize:16,marginTop:14}}>Last updated {d.updated}</p>
          <div className="legaltabs">{tabs.map((t,i)=>(<a key={i} href={t[1]} className={t[2]===kind?"on":""}>{t[0]}</a>))}</div>
        </div>
      </header>
      <article className="sec" style={{paddingTop:48}}>
        <div className="wrap-xs"><div className="prose">{d.body}</div></div>
      </article>
    </React.Fragment>
  );
}
window.LegalContent = LegalContent;
