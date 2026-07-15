/* Contact / Demo request page */
function ContactContent(){
  const [sent, setSent] = React.useState(false);
  const channels = [
    [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg>,"Talk to sales","Plans, procurement, and security reviews.","sales@plork.com"],
    [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/></svg>,"Get support","Questions about your workspace or setup.","support@plork.com"],
    [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3Z"/><path d="M9 12l2 2 4-4"/></svg>,"Security & compliance","Request our SOC 2 report and DPA.","security@plork.com"],
  ];
  return (
    <React.Fragment>
      <style>{`
        .mc .contact-grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:48px;align-items:start;}
        .mc .chan{display:flex;gap:14px;align-items:flex-start;padding:20px 0;border-top:1px solid var(--line);}
        .mc .chan:first-child{border-top:0;padding-top:0;}
        .mc .chan .ci{width:42px;height:42px;border-radius:11px;background:#EAF1FE;color:var(--blue-d);display:flex;align-items:center;justify-content:center;flex:none;}
        .mc .chan .ci svg{width:21px;height:21px;}
        .mc .chan h4{font-family:"Archivo";font-size:16px;margin-bottom:4px;}
        .mc .chan p{font-size:13.5px;color:var(--muted);margin-bottom:5px;}
        .mc .chan a{font-size:13.5px;color:var(--blue-d);font-weight:600;font-family:"JetBrains Mono";}
        .mc .formcard{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:32px;box-shadow:0 24px 50px -32px rgba(12,26,43,.3);}
        .mc .frow2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        .mc .thanks{text-align:center;padding:40px 10px;}
        .mc .thanks .ok{width:56px;height:56px;border-radius:50%;background:#E6F7F1;color:#0A7553;display:flex;align-items:center;justify-content:center;font-size:28px;margin:0 auto 18px;}
        .mc .thanks h3{font-size:22px;margin-bottom:8px;}
        .mc .thanks p{color:var(--muted);font-size:15px;}
      `}</style>

      <header className="phero">
        <div className="wrap">
          <span className="eyebrow">Contact</span>
          <h1>Talk to us, or see Plokr live.</h1>
          <p className="lede">Book a walkthrough tailored to your stack, or reach the right team directly. We usually reply within one business day.</p>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="contact-grid">
            <div>
              <h3 style={{fontFamily:"Archivo",fontSize:18,marginBottom:8}}>Reach us directly</h3>
              {channels.map((c,i)=>(
                <div className="chan" key={i}><span className="ci">{c[0]}</span><div><h4>{c[1]}</h4><p>{c[2]}</p><a href={"mailto:"+c[3]}>{c[3]}</a></div></div>
              ))}
            </div>
            <div className="formcard">
              {sent ? (
                <div className="thanks">
                  <div className="ok">✓</div>
                  <h3>Thanks — we'll be in touch.</h3>
                  <p>A member of our team will reach out within one business day to set up your demo.</p>
                </div>
              ) : (
                <React.Fragment>
                  <h3 style={{fontFamily:"Archivo",fontSize:20,marginBottom:6}}>Request a demo</h3>
                  <p style={{color:"var(--muted)",fontSize:14,marginBottom:22}}>Tell us a little about your team and we'll tailor the walkthrough.</p>
                  <div className="frow2">
                    <div className="fgroup"><label className="flabel">First name</label><input className="field" placeholder="Alex" /></div>
                    <div className="fgroup"><label className="flabel">Last name</label><input className="field" placeholder="Rivera" /></div>
                  </div>
                  <div className="fgroup"><label className="flabel">Work email</label><input className="field" type="email" placeholder="alex@company.com" /></div>
                  <div className="frow2">
                    <div className="fgroup"><label className="flabel">Company</label><input className="field" placeholder="Acme Inc." /></div>
                    <div className="fgroup"><label className="flabel">Team size</label>
                      <select className="field"><option>1–10 engineers</option><option>11–50 engineers</option><option>51–200 engineers</option><option>200+ engineers</option></select>
                    </div>
                  </div>
                  <div className="fgroup"><label className="flabel">What would you like to see?</label><textarea className="field" placeholder="We use Jira + GitHub and want to get ahead of dependency risk…"></textarea></div>
                  <button className="btn btn-primary" style={{width:"100%",height:50}} onClick={()=>setSent(true)}>Request demo</button>
                  <p style={{textAlign:"center",fontSize:12,color:"var(--muted)",marginTop:14,fontFamily:"JetBrains Mono"}}>No spam · we only use this to contact you about Plokr</p>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
window.ContactContent = ContactContent;
