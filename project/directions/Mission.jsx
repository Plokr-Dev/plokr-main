/* Direction B — "Mission Control"
   Enterprise, dashboard-forward, confident. Dark navy hero, light body.
   Type: Archivo (display) + Hanken Grotesk (body) + JetBrains Mono (code)
   Color: deep navy + electric blue, generous data UI. */
const MC_APP = "https://plork.com/app";
const MC_TRIAL = "https://plork.com/app?signup=1";

function MissionHome() {
  // deterministic activity heatmap: 7 rows (days) x 18 cols (weeks), column-major
  const heatCells = Array.from({length:7*18}, (_,i)=>{
    const day=i%7, wk=Math.floor(i/7);
    let v=(Math.sin(wk*0.6+1)+1)/2*0.55 + 0.12 + ((i*37)%5)/14;
    if(day===5) v*=0.5; if(day===6) v*=0.35;            // quieter weekends
    return Math.max(0.06, Math.min(1, v));
  });
  const [authMode, setAuthMode] = React.useState(null);   // null | 'login' | 'signup'
  const [billing, setBilling] = React.useState('monthly'); // 'monthly' | 'annual'
  const [redirecting, setRedirecting] = React.useState(false);
  const openAuth = (mode) => (e) => { if(e) e.preventDefault(); setRedirecting(false); setAuthMode(mode); };
  const goToApp = () => {
    setRedirecting(true);
    setTimeout(() => { window.open(MC_APP, '_blank'); setRedirecting(false); setAuthMode(null); }, 1200);
  };
  return (
    <div className="mc">
      <style>{`
        .mc{--navy:#0A1626;--navy2:#0E1F35;--navy3:#13263F;--ink:#0C1A2B;--ink2:#33455B;--muted:#62748B;--bg:#F6F8FB;--surface:#FFFFFF;--line:#E4EAF1;--blue:#3B82F6;--blue-l:#60A5FA;--blue-d:#2563EB;--cyan:#38BDF8;--ok:#10B981;--warn:#F59E0B;--bad:#EF4444;
          width:1440px;background:var(--bg);color:var(--ink);font-family:"Hanken Grotesk",sans-serif;font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased;}
        .mc *{box-sizing:border-box;margin:0;padding:0;}
        .mc [id]{scroll-margin-top:90px;}
        .mc h1,.mc h2,.mc h3,.mc h4{font-family:"Archivo",sans-serif;font-weight:700;letter-spacing:-0.02em;line-height:1.02;}
        .mc a{color:inherit;text-decoration:none;}
        .mc .mono{font-family:"JetBrains Mono",monospace;}
        .mc .wrap{max-width:1240px;margin:0 auto;padding:0 56px;}
        .mc .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:44px;padding:0 22px;border-radius:8px;font-weight:600;font-size:15px;font-family:"Hanken Grotesk";cursor:pointer;border:1px solid transparent;transition:.15s;white-space:nowrap;}
        .mc .btn-primary{background:var(--blue);color:#fff;}
        .mc .btn-primary:hover{background:var(--blue-d);}
        .mc .btn-line{border-color:var(--line);background:var(--surface);color:var(--ink);}
        .mc .btn-line:hover{border-color:#C7D3E2;}
        .mc .btn-lg{height:52px;padding:0 28px;font-size:16px;}
        /* nav (dark, over hero) */
        .mc .top{background:var(--navy);}
        .mc nav{height:74px;display:flex;align-items:center;}
        .mc nav .wrap{display:flex;align-items:center;gap:42px;width:100%;}
        .mc .logo{display:flex;align-items:center;gap:10px;font-family:"Bricolage Grotesque";font-weight:800;font-size:23px;color:#fff;letter-spacing:-.03em;}
        .mc .logo .mark{width:15px;height:26px;background:var(--blue);border-radius:3px;transform:skewX(-10deg);flex:none;}
        .mc .navlinks{display:flex;gap:30px;font-size:15px;color:rgba(255,255,255,.66);font-weight:500;}
        .mc .navlinks a:hover{color:#fff;}
        .mc .navright{margin-left:auto;display:flex;align-items:center;gap:14px;}
        .mc .navright .login{color:rgba(255,255,255,.85);font-weight:600;font-size:15px;white-space:nowrap;}
        .mc .navright .login:hover{color:#fff;}
        /* hero */
        .mc .hero{background:var(--navy);color:#fff;position:relative;overflow:hidden;padding:64px 0 96px;}
        .mc .hero::before{content:"";position:absolute;inset:0;background:radial-gradient(900px 460px at 78% 8%,rgba(59,130,246,.30),transparent 58%),radial-gradient(620px 420px at 6% 92%,rgba(56,189,248,.14),transparent 60%);}
        .mc .hero .wrap{position:relative;display:grid;grid-template-columns:1fr 1.04fr;gap:54px;align-items:center;}
        .mc .eyebrow{display:inline-flex;align-items:center;gap:9px;font-size:12.5px;font-weight:600;color:var(--blue-l);background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.32);padding:7px 14px;border-radius:999px;font-family:"JetBrains Mono";letter-spacing:.01em;white-space:nowrap;}
        .mc .hero h1{font-size:58px;margin:24px 0 0;color:#fff;font-weight:800;}
        .mc .hero h1 em{font-style:normal;color:var(--cyan);}
        .mc .hero p.sub{font-size:19px;color:rgba(255,255,255,.72);margin-top:22px;max-width:520px;line-height:1.55;}
        .mc .hero .cta{display:flex;gap:14px;margin-top:32px;}
        .mc .hero .btn-line{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.22);color:#fff;}
        .mc .hero .btn-line:hover{background:rgba(255,255,255,.12);}
        .mc .hero .trust{margin-top:28px;display:flex;gap:24px;align-items:center;color:rgba(255,255,255,.5);font-size:13px;}
        .mc .hero .trust b{color:#fff;font-family:"Archivo";}
        /* dashboard card in hero */
        .mc .panel{background:var(--navy2);border:1px solid rgba(255,255,255,.10);border-radius:16px;box-shadow:0 40px 90px -30px rgba(0,0,0,.6);overflow:hidden;}
        .mc .panel .ph{height:46px;display:flex;align-items:center;gap:8px;padding:0 16px;border-bottom:1px solid rgba(255,255,255,.08);}
        .mc .panel .ph .t{color:rgba(255,255,255,.9);font-weight:600;font-size:13.5px;font-family:"Archivo";}
        .mc .panel .ph .live{margin-left:auto;font-family:"JetBrains Mono";font-size:11px;color:var(--ok);display:flex;align-items:center;gap:6px;}
        .mc .panel .ph .live::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--ok);box-shadow:0 0 0 3px rgba(16,185,129,.2);}
        .mc .pgrid{padding:16px;display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .mc .kpi{background:var(--navy3);border:1px solid rgba(255,255,255,.06);border-radius:11px;padding:14px;}
        .mc .kpi .lab{font-size:11px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.06em;font-weight:600;}
        .mc .kpi .num{font-family:"Archivo";font-weight:800;font-size:30px;color:#fff;margin-top:6px;line-height:1;}
        .mc .kpi .num small{font-size:13px;color:var(--ok);font-weight:600;margin-left:6px;}
        .mc .kpi .num small.bad{color:var(--bad);}
        .mc .spark{display:flex;align-items:flex-end;gap:3px;height:26px;margin-top:10px;}
        .mc .spark i{flex:1;background:var(--blue);border-radius:2px;opacity:.55;}
        .mc .feed{padding:0 16px 16px;}
        .mc .feed .fr{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid rgba(255,255,255,.06);font-size:12.5px;}
        .mc .feed .fr .ic{width:22px;height:22px;border-radius:6px;flex:none;display:flex;align-items:center;justify-content:center;font-size:11px;}
        .mc .feed .fr .tx{color:rgba(255,255,255,.82);flex:1;}
        .mc .feed .fr .tm{color:rgba(255,255,255,.4);font-family:"JetBrains Mono";font-size:10.5px;}
        /* logos */
        .mc .logos{background:var(--surface);border-bottom:1px solid var(--line);padding:34px 0;}
        .mc .logos .wrap{display:flex;align-items:center;gap:32px;}
        .mc .logos p{font-size:13px;color:var(--muted);font-weight:600;white-space:nowrap;}
        .mc .logorow{display:flex;gap:26px;flex-wrap:nowrap;margin-left:auto;}
        .mc .lgo{display:flex;align-items:center;gap:8px;font-family:"Archivo";font-weight:700;font-size:15.5px;color:var(--ink2);white-space:nowrap;}
        .mc .lgo .sq{width:18px;height:18px;border-radius:5px;}
        /* section */
        .mc section.feat{padding:100px 0;}
        .mc .feat .row{display:grid;grid-template-columns:1fr 1.05fr;gap:60px;align-items:center;}
        .mc .feat .row.rev{direction:rtl;}
        .mc .feat .row.rev>*{direction:ltr;}
        .mc .ftag{font-family:"JetBrains Mono";font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--blue-d);background:#EAF1FE;padding:5px 11px;border-radius:6px;display:inline-block;white-space:nowrap;}
        .mc .feat h2{font-size:42px;margin:16px 0 18px;color:var(--ink);}
        .mc .feat p.lead{font-size:18px;color:var(--muted);line-height:1.6;}
        .mc .checklist{margin-top:26px;display:flex;flex-direction:column;gap:14px;}
        .mc .checklist li{list-style:none;display:flex;gap:12px;font-size:15.5px;color:var(--ink2);align-items:flex-start;}
        .mc .checklist .tick{width:22px;height:22px;border-radius:6px;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:center;flex:none;font-size:12px;font-weight:700;margin-top:1px;}
        /* light data card */
        .mc .card{background:var(--surface);border:1px solid var(--line);border-radius:14px;box-shadow:0 24px 50px -30px rgba(12,26,43,.3);overflow:hidden;}
        .mc .card .ch{padding:16px 20px;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:10px;}
        .mc .card .ch .t{font-family:"Archivo";font-weight:700;font-size:15px;}
        .mc .card .ch .chip{margin-left:auto;font-family:"JetBrains Mono";font-size:11px;color:var(--muted);border:1px solid var(--line);padding:3px 8px;border-radius:6px;}
        .mc .drow{display:flex;align-items:center;gap:14px;padding:13px 20px;border-top:1px solid var(--line);font-size:13.5px;}
        .mc .drow:first-of-type{border-top:0;}
        .mc .drow .pkg{font-family:"JetBrains Mono";font-weight:600;color:var(--ink);flex:1;}
        .mc .drow .ver{font-family:"JetBrains Mono";font-size:12px;color:var(--muted);}
        .mc .tag{font-size:11px;font-weight:700;padding:3px 9px;border-radius:5px;white-space:nowrap;font-family:"Hanken Grotesk";}
        .mc .tag.ok{background:#E6F7F1;color:#0A7553;}
        .mc .tag.out{background:#FEF3DC;color:#9A6A05;}
        .mc .tag.vuln{background:#FDE9E9;color:#C03434;}
        .mc .ava{width:24px;height:24px;border-radius:50%;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;color:#fff;flex:none;}
        .mc .pill{font-size:11px;font-weight:700;padding:3px 9px;border-radius:999px;white-space:nowrap;}
        .mc .pill.prog{background:#EAF1FE;color:var(--blue-d);}
        .mc .pill.block{background:#FDE9E9;color:#C03434;}
        .mc .pill.todo{background:#EEF1F6;color:#55606F;}
        /* how */
        .mc .how{background:var(--navy);color:#fff;padding:100px 0;}
        .mc .how .head{max-width:700px;margin-bottom:54px;}
        .mc .how .ftag{background:rgba(59,130,246,.14);color:var(--blue-l);}
        .mc .how h2{font-size:42px;color:#fff;margin-top:16px;}
        .mc .how .head p{color:rgba(255,255,255,.66);font-size:18px;margin-top:14px;}
        .mc .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
        .mc .step{background:var(--navy2);border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:28px;}
        .mc .step .n{font-family:"JetBrains Mono";font-size:13px;color:var(--cyan);font-weight:700;}
        .mc .step h3{font-size:21px;margin:14px 0 10px;color:#fff;}
        .mc .step p{font-size:14.5px;color:rgba(255,255,255,.6);line-height:1.55;}
        /* pricing */
        .mc .pricing{padding:100px 0;}
        .mc .pricing .head{text-align:center;max-width:680px;margin:0 auto 54px;}
        .mc .pricing h2{font-size:42px;color:var(--ink);}
        .mc .pricing .head p{color:var(--muted);font-size:18px;margin-top:14px;}
        .mc .tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;align-items:start;}
        .mc .tier{border:1px solid var(--line);border-radius:16px;background:var(--surface);padding:30px;display:flex;flex-direction:column;}
        .mc .tier.pop{background:var(--navy);border-color:var(--navy);color:#fff;box-shadow:0 30px 60px -28px rgba(10,22,38,.6);position:relative;}
        .mc .tier.pop .tname,.mc .tier.pop .price{color:#fff;}
        .mc .tier.pop .tdesc{color:rgba(255,255,255,.6);}
        .mc .tier.pop li{color:rgba(255,255,255,.85);}
        .mc .tier.pop .ribbon{position:absolute;top:-12px;left:30px;background:var(--cyan);color:var(--navy);font-size:11px;font-weight:800;letter-spacing:.04em;padding:5px 12px;border-radius:999px;text-transform:uppercase;font-family:"Archivo";}
        .mc .tier .tname{font-family:"Archivo";font-weight:700;font-size:19px;}
        .mc .tier .price{font-family:"Archivo";font-weight:800;font-size:46px;margin:16px 0 2px;letter-spacing:-.03em;}
        .mc .tier .price small{font-size:15px;color:var(--muted);font-family:"Hanken Grotesk";font-weight:500;}
        .mc .tier.pop .price small{color:rgba(255,255,255,.55);}
        .mc .tier .tdesc{font-size:14px;color:var(--muted);min-height:42px;}
        .mc .tier ul{list-style:none;margin:22px 0 26px;display:flex;flex-direction:column;gap:12px;}
        .mc .tier li{font-size:14px;color:var(--ink2);display:flex;gap:10px;align-items:flex-start;}
        .mc .tier li .tk{color:var(--blue);font-weight:700;flex:none;}
        .mc .tier.pop li .tk{color:var(--cyan);}
        .mc .tier .btn{width:100%;margin-top:auto;}
        .mc .tier.pop .btn-line{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.2);color:#fff;}
        /* viz showcase (navy) */
        .mc .viz{background:var(--navy);color:#fff;padding:100px 0;position:relative;overflow:hidden;}
        .mc .viz::before{content:"";position:absolute;inset:0;background:radial-gradient(820px 420px at 50% -12%,rgba(59,130,246,.20),transparent 62%);}
        .mc .viz .wrap{position:relative;}
        .mc .viz .head{text-align:center;max-width:700px;margin:0 auto 48px;}
        .mc .viz .ftag{background:rgba(59,130,246,.14);color:var(--blue-l);}
        .mc .viz h2{font-size:42px;color:#fff;margin-top:16px;}
        .mc .viz .head p{color:rgba(255,255,255,.66);font-size:18px;margin-top:14px;}
        .mc .vizgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        .mc .vcard{background:var(--navy2);border:1px solid rgba(255,255,255,.10);border-radius:14px;padding:20px;position:relative;}
        .mc .vcard .vh{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
        .mc .vcard .vh .t{font-family:"Archivo";font-weight:700;font-size:14px;color:#fff;}
        .mc .vcard .vh .m{font-family:"JetBrains Mono";font-size:11px;color:rgba(255,255,255,.45);}
        .mc .vcard .big{font-family:"Archivo";font-weight:800;font-size:32px;line-height:1;color:#fff;}
        .mc .vcard .sub{font-size:12.5px;color:rgba(255,255,255,.5);margin-top:5px;}
        .mc .wide{grid-column:1 / -1;}
        .mc .donutrow{display:flex;align-items:center;gap:20px;}
        .mc .donut{width:104px;height:104px;border-radius:50%;background:conic-gradient(var(--ok) 0 91%,rgba(255,255,255,.12) 91% 100%);display:flex;align-items:center;justify-content:center;position:relative;flex:none;}
        .mc .donut::after{content:"";position:absolute;width:72px;height:72px;border-radius:50%;background:var(--navy2);}
        .mc .donut .dv{position:relative;font-family:"Archivo";font-weight:800;font-size:21px;color:#fff;}
        .mc .leg{display:flex;flex-direction:column;gap:9px;font-size:12.5px;color:rgba(255,255,255,.7);}
        .mc .leg .lk{display:flex;align-items:center;gap:8px;}
        .mc .leg .lk i{width:10px;height:10px;border-radius:3px;flex:none;}
        .mc .vbars{display:flex;align-items:stretch;gap:9px;height:108px;margin-top:8px;}
        .mc .vbars .bg{flex:1;height:100%;display:flex;flex-direction:column;justify-content:flex-end;gap:3px;}
        .mc .vbars i{display:block;border-radius:3px 3px 0 0;}
        .mc .vbars .lbl{font-family:"JetBrains Mono";font-size:9.5px;color:rgba(255,255,255,.4);text-align:center;margin-top:6px;}
        .mc .heat{display:grid;grid-template-rows:repeat(7,1fr);grid-auto-flow:column;gap:4px;margin-top:6px;}
        .mc .heat span{aspect-ratio:1;border-radius:3px;background:rgba(59,130,246,var(--o,.2));}
        .mc .heatfoot{display:flex;align-items:center;justify-content:space-between;margin-top:12px;}
        .mc .heatfoot .lab{font-family:"JetBrains Mono";font-size:11px;color:rgba(255,255,255,.4);}
        .mc .heatlegend{display:flex;align-items:center;gap:6px;font-size:11px;color:rgba(255,255,255,.5);}
        .mc .heatlegend i{width:12px;height:12px;border-radius:3px;}
        .mc .vchips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:32px;}
        .mc .vchip{font-family:"JetBrains Mono";font-size:12px;color:rgba(255,255,255,.72);border:1px solid rgba(255,255,255,.18);padding:6px 13px;border-radius:999px;}
        /* data integrity (light) */
        .mc .trust2{padding:100px 0;background:var(--bg);}
        .mc .trust2 .row{display:grid;grid-template-columns:1.04fr .96fr;gap:60px;align-items:center;}
        .mc .trust2 h2{font-size:42px;margin:16px 0 18px;color:var(--ink);}
        .mc .trust2 p.lead{font-size:18px;color:var(--muted);line-height:1.6;}
        .mc .pillars{margin-top:30px;display:grid;grid-template-columns:1fr 1fr;gap:24px 26px;}
        .mc .pillar .pi{width:40px;height:40px;border-radius:11px;background:#EAF1FE;color:var(--blue-d);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:700;}
        .mc .pillar .pi svg{width:20px;height:20px;}
        .mc .pillar h4{font-family:"Archivo";font-size:16px;margin:13px 0 6px;color:var(--ink);}
        .mc .pillar p{font-size:13.5px;color:var(--muted);line-height:1.5;}
        .mc .scope{display:flex;align-items:center;gap:13px;padding:15px 20px;border-top:1px solid var(--line);}
        .mc .scope:first-of-type{border-top:0;}
        .mc .scope .si{width:32px;height:32px;border-radius:8px;background:#F1F4F9;display:flex;align-items:center;justify-content:center;font-size:14px;flex:none;}
        .mc .scope .sn{flex:1;}
        .mc .scope .sn b{font-size:13.5px;font-family:"Archivo";font-weight:600;display:block;color:var(--ink);}
        .mc .scope .sn span{font-size:12px;color:var(--muted);}
        .mc .ro{font-family:"JetBrains Mono";font-size:10.5px;font-weight:600;color:#0A7553;background:#E6F7F1;padding:4px 9px;border-radius:6px;white-space:nowrap;}
        .mc .permfoot{padding:15px 20px;border-top:1px solid var(--line);display:flex;align-items:center;gap:9px;font-size:12.5px;color:var(--ink2);background:#FBFCFE;}
        .mc .permfoot .stamp{margin-left:auto;font-family:"JetBrains Mono";font-size:11px;color:var(--ok);font-weight:600;}
        /* pricing toggle */
        .mc .billtoggle{display:inline-flex;background:#EAEFF6;border-radius:11px;padding:4px;gap:4px;margin:22px auto 0;}
        .mc .billtoggle button{border:none;background:transparent;font-family:"Hanken Grotesk";font-weight:600;font-size:14px;color:var(--muted);padding:9px 20px;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:8px;transition:.15s;}
        .mc .billtoggle button.on{background:#fff;color:var(--ink);box-shadow:0 1px 3px rgba(12,26,43,.12);}
        .mc .billtoggle .save{font-family:"JetBrains Mono";font-size:10.5px;font-weight:700;color:#0A7553;background:#E6F7F1;padding:2px 7px;border-radius:5px;}
        .mc .tier .billnote{font-family:"JetBrains Mono";font-size:11px;color:var(--muted);margin-top:-2px;min-height:14px;}
        .mc .tier.pop .billnote{color:rgba(255,255,255,.5);}
        /* auth modal */
        .mc .ovl{position:fixed;inset:0;background:rgba(8,18,32,.62);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:24px;animation:mcfade .18s ease;}
        @keyframes mcfade{from{opacity:0}to{opacity:1}}
        .mc .modal{position:relative;width:432px;max-width:100%;background:#fff;border-radius:20px;box-shadow:0 40px 110px -20px rgba(0,0,0,.55);overflow:hidden;animation:mcpop .22s cubic-bezier(.2,.9,.3,1.1);}
        @keyframes mcpop{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}
        .mc .modal .close{position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:9px;border:none;background:#F1F4F9;color:var(--ink2);font-size:18px;line-height:1;cursor:pointer;transition:.15s;}
        .mc .modal .close:hover{background:#E4EAF1;}
        .mc .modal .mtop{padding:34px 34px 0;text-align:center;}
        .mc .modal .mlogo{display:inline-flex;align-items:center;gap:9px;font-family:"Bricolage Grotesque";font-weight:800;font-size:21px;color:var(--ink);letter-spacing:-.03em;}
        .mc .modal .mlogo .mark{width:13px;height:23px;background:var(--blue);border-radius:3px;transform:skewX(-10deg);}
        .mc .modal h3{font-family:"Archivo";font-weight:700;font-size:23px;margin:20px 0 6px;color:var(--ink);letter-spacing:-.01em;}
        .mc .modal p.msub{font-size:14px;color:var(--muted);line-height:1.5;}
        .mc .modal .body{padding:22px 34px 6px;display:flex;flex-direction:column;gap:10px;}
        .mc .prov{display:flex;align-items:center;gap:12px;height:48px;border:1px solid var(--line);border-radius:11px;padding:0 16px;font-weight:600;font-size:14.5px;cursor:pointer;background:#fff;transition:.15s;font-family:"Hanken Grotesk";color:var(--ink);text-align:left;}
        .mc .prov:hover{border-color:#C7D3E2;background:#FAFBFD;}
        .mc .prov .sq{width:20px;height:20px;border-radius:5px;flex:none;}
        .mc .prov .ar{margin-left:auto;color:var(--muted);font-size:15px;}
        .mc .divider{display:flex;align-items:center;gap:12px;color:var(--muted);font-size:12px;margin:4px 0;font-weight:500;}
        .mc .divider::before,.mc .divider::after{content:"";height:1px;background:var(--line);flex:1;}
        .mc .field{height:48px;border:1px solid var(--line);border-radius:11px;padding:0 14px;font-size:14.5px;font-family:"Hanken Grotesk";width:100%;color:var(--ink);box-sizing:border-box;}
        .mc .field::placeholder{color:#9AA7B6;}
        .mc .field:focus{outline:none;border-color:var(--blue);box-shadow:0 0 0 3px rgba(59,130,246,.15);}
        .mc .cont{height:48px;background:var(--blue);color:#fff;border:none;border-radius:11px;font-weight:600;font-size:15px;cursor:pointer;font-family:"Hanken Grotesk";transition:.15s;}
        .mc .cont:hover{background:var(--blue-d);}
        .mc .modal .foot{padding:16px 34px 28px;text-align:center;}
        .mc .modal .lockline{display:flex;align-items:center;justify-content:center;gap:7px;color:var(--ink2);font-family:"JetBrains Mono";font-size:11px;margin-bottom:10px;}
        .mc .modal .lockline svg{width:13px;height:13px;}
        .mc .modal .switch{font-size:13px;color:var(--muted);}
        .mc .modal .switch a{color:var(--blue-d);font-weight:600;cursor:pointer;}
        .mc .modal .switch a:hover{text-decoration:underline;}
        .mc .redir{padding:52px 34px 56px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px;}
        .mc .spinner{width:42px;height:42px;border-radius:50%;border:3.5px solid #E4EAF1;border-top-color:var(--blue);animation:mcspin .8s linear infinite;}
        @keyframes mcspin{to{transform:rotate(360deg)}}
        .mc .redir .rt{font-family:"Archivo";font-weight:700;font-size:18px;color:var(--ink);}
        .mc .redir .rs{font-size:13.5px;color:var(--muted);}
        .mc .redir .rs b{font-family:"JetBrains Mono";color:var(--ink2);font-weight:600;}
        /* footer */
        .mc footer{background:var(--navy);color:#fff;padding:64px 0 50px;}
        .mc footer .grid{display:grid;grid-template-columns:1.6fr repeat(4,1fr);gap:32px;}
        .mc footer .fdesc{font-size:14px;color:rgba(255,255,255,.55);margin-top:16px;max-width:260px;line-height:1.55;}
        .mc footer h5{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:rgba(255,255,255,.5);margin-bottom:16px;font-weight:700;font-family:"Archivo";}
        .mc footer .fcol a{display:block;font-size:14px;color:rgba(255,255,255,.8);margin-bottom:11px;}
        .mc footer .fcol a:hover{color:var(--cyan);}
        .mc footer .legal{margin-top:46px;padding-top:24px;border-top:1px solid rgba(255,255,255,.12);display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,.5);}
      `}</style>

      {/* NAV + HERO (shared dark) */}
      <div className="top">
        <nav>
          <div className="wrap">
            <a className="logo" href="#"><span className="mark"></span>Plokr</a>
            <div className="navlinks">
              <a href="#platform">Platform</a><a href="#how">How it works</a><a href="#integrations">Integrations</a><a href="#pricing">Pricing</a><a href="#insights">Insights</a>
            </div>
            <div className="navright">
              <a className="login" href={MC_APP} onClick={openAuth('login')}>Log in</a>
              <a className="btn btn-primary" href={MC_TRIAL} onClick={openAuth('signup')}>Start free trial</a>
            </div>
          </div>
        </nav>
        <header className="hero">
          <div className="wrap">
            <div>
              <span className="eyebrow">▮ MISSION CONTROL FOR ENGINEERING</span>
              <h1>One view for every <em>sprint</em> and <em>dependency</em>.</h1>
              <p className="sub">Plokr gives engineering leaders real-time visibility into Jira progress and dependency health across every repo — so blockers and vulnerabilities surface before they cost a release.</p>
              <div className="cta">
                <a className="btn btn-primary btn-lg" href={MC_TRIAL} onClick={openAuth('signup')}>Start free trial</a>
                <a className="btn btn-line btn-lg" href={MC_APP} onClick={openAuth('login')}>Log in to Plokr</a>
              </div>
              <div className="trust"><span><b>200+</b> teams</span><span><b>14k</b> repos monitored</span><span><b>SOC 2</b> Type II</span></div>
            </div>
            <div className="panel">
              <div className="ph"><span className="t">Engineering Overview</span><span className="live">LIVE</span></div>
              <div className="pgrid">
                <div className="kpi"><div className="lab">Sprint progress</div><div className="num">62%<small>+8%</small></div>
                  <div className="spark">{[40,55,48,70,62,80,72,90].map((h,i)=>(<i key={i} style={{height:h+"%"}}></i>))}</div></div>
                <div className="kpi"><div className="lab">Dependency health</div><div className="num">91%<small>good</small></div>
                  <div className="spark">{[88,90,86,91,89,93,91,91].map((h,i)=>(<i key={i} style={{height:h+"%",background:"#10B981"}}></i>))}</div></div>
                <div className="kpi"><div className="lab">Blocked issues</div><div className="num">2<small className="bad">+1</small></div></div>
                <div className="kpi"><div className="lab">Vulnerabilities</div><div className="num">1<small className="bad">high</small></div></div>
              </div>
              <div className="feed">
                {[
                  ["#FDE9E9","✕","jsonwebtoken flagged — CVE-2022-23529","2m"],
                  ["#FEF3DC","!","PAY-322 blocked for 3 days","18m"],
                  ["#E6F7F1","✓","Sprint 24 burndown on track","1h"],
                  ["#EAF1FE","↑","express 4.21.1 available in api-gateway","2h"],
                ].map((r,i)=>(
                  <div className="fr" key={i}><span className="ic" style={{background:r[0]}}>{r[1]}</span><span className="tx">{r[2]}</span><span className="tm">{r[3]}</span></div>
                ))}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* LOGOS */}
      <div className="logos" id="integrations">
        <div className="wrap">
          <p>Plugs into your existing stack</p>
          <div className="logorow">
            <span className="lgo"><span className="sq" style={{background:"#2A6FDB"}}></span>Jira</span>
            <span className="lgo"><span className="sq" style={{background:"#1F2328"}}></span>GitHub</span>
            <span className="lgo"><span className="sq" style={{background:"#2563EB"}}></span>Bitbucket</span>
            <span className="lgo"><span className="sq" style={{background:"#62748B"}}></span>GitLab</span>
            <span className="lgo"><span className="sq" style={{background:"#0B66C3"}}></span>Trello</span>
          </div>
        </div>
      </div>

      {/* FEATURE 1 — Jira */}
      <section className="feat" id="platform">
        <div className="wrap">
          <div className="row">
            <div>
              <span className="ftag">Jira monitoring</span>
              <h2>Real-time command of every board.</h2>
              <p className="lead">Plokr syncs your Jira projects continuously and turns raw tickets into signal: what's moving, what's stuck, and where a sprint is about to slip.</p>
              <ul className="checklist">
                {["Live burndown and sprint progress, no Jira tab required","Automatic detection of stale, blocked, and at-risk issues","Workload balance across assignees, squads, and epics","Trend history to catch slippage weeks before the deadline"].map((t,i)=>(<li key={i}><span className="tick">✓</span>{t}</li>))}
              </ul>
            </div>
            <div className="card">
              <div className="ch"><span className="t">Sprint 24 · Payments squad</span><span className="chip">updated 2m ago</span></div>
              {[
                ["PAY-318","Reconcile Stripe webhook retries","prog","In Progress","#3B82F6","ML"],
                ["PAY-322","Idempotency keys for refunds","block","Blocked","#EF4444","RK"],
                ["PAY-310","Migrate ledger to decimal","prog","In Progress","#10B981","JD"],
                ["PAY-301","Add 3DS fallback flow","todo","To Do","#7C3AED","SA"],
              ].map((r,i)=>(
                <div className="drow" key={i}>
                  <span className="ver" style={{width:60,flex:"none"}}>{r[0]}</span>
                  <span className="pkg" style={{fontFamily:"Hanken Grotesk",fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r[1]}</span>
                  <span className={"pill "+r[2]}>{r[3]}</span>
                  <span className="ava" style={{background:r[4]}}>{r[5]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 2 — Dependencies */}
      <section className="feat" style={{paddingTop:0}}>
        <div className="wrap">
          <div className="row rev">
            <div>
              <span className="ftag">Dependency checker</span>
              <h2>Outdated and vulnerable, caught early.</h2>
              <p className="lead">Connect GitHub and Bitbucket and Plokr audits every repo's dependencies around the clock — ranking risk so your team fixes what matters first.</p>
              <ul className="checklist">
                {["Continuous scanning across all GitHub & Bitbucket repos","Severity-ranked CVE alerts with safe upgrade guidance","Outdated-package tracking with one-click PR drafts","A single risk dashboard for every service and library"].map((t,i)=>(<li key={i}><span className="tick">✓</span>{t}</li>))}
              </ul>
            </div>
            <div className="card">
              <div className="ch"><span className="t mono" style={{fontFamily:"JetBrains Mono",fontSize:14}}>acme/api-gateway</span><span className="chip">main · scanned 4m ago</span></div>
              {[
                ["jsonwebtoken","8.5.1 → 9.0.2","vuln","CVE · high"],
                ["express","4.18.2 → 4.21.1","out","outdated"],
                ["axios","1.4.0 → 1.7.7","out","outdated"],
                ["pg","8.11.3","ok","up to date"],
                ["zod","3.23.8","ok","up to date"],
              ].map((r,i)=>(
                <div className="drow" key={i}>
                  <span className="pkg">{r[0]}</span>
                  <span className="ver">{r[1]}</span>
                  <span className={"tag "+r[2]}>{r[3]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISUALIZE — charts, heatmaps & more */}
      <section className="viz" id="insights">
        <div className="wrap">
          <div className="head">
            <span className="ftag">Dashboards &amp; insights</span>
            <h2>See progress the way you think about it.</h2>
            <p>Velocity charts, dependency health, delivery heatmaps and more — Plokr turns raw activity across Jira and your repos into views your whole team can read at a glance.</p>
          </div>
          <div className="vizgrid">
            {/* velocity area chart */}
            <div className="vcard">
              <div className="vh"><span className="t">Sprint velocity</span><span className="m">last 8</span></div>
              <div className="big">38 <span style={{fontSize:14,color:"var(--ok)",fontWeight:600}}>pts/sprint</span></div>
              <div className="sub">+12% vs. trailing average</div>
              <svg viewBox="0 0 280 90" width="100%" height="90" style={{marginTop:10,display:"block"}} preserveAspectRatio="none">
                <defs><linearGradient id="vg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3B82F6" stopOpacity="0.5"/><stop offset="1" stopColor="#3B82F6" stopOpacity="0"/></linearGradient></defs>
                <polygon points="0,72 40,60 80,64 120,44 160,50 200,30 240,36 280,18 280,90 0,90" fill="url(#vg)"/>
                <polyline points="0,72 40,60 80,64 120,44 160,50 200,30 240,36 280,18" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </div>
            {/* dependency health donut */}
            <div className="vcard">
              <div className="vh"><span className="t">Dependency health</span><span className="m">142 pkgs</span></div>
              <div className="donutrow">
                <div className="donut"><span className="dv">91%</span></div>
                <div className="leg">
                  <span className="lk"><i style={{background:"var(--ok)"}}></i>129 up to date</span>
                  <span className="lk"><i style={{background:"var(--warn)"}}></i>9 outdated</span>
                  <span className="lk"><i style={{background:"var(--bad)"}}></i>4 vulnerable</span>
                </div>
              </div>
            </div>
            {/* throughput bars */}
            <div className="vcard">
              <div className="vh"><span className="t">Opened vs. closed</span><span className="m">this sprint</span></div>
              <div className="vbars">
                {[["M",70,52],["T",55,60],["W",80,46],["T",62,72],["F",48,58],["S",20,16],["S",14,10]].map((d,i)=>(
                  <div className="bg" key={i}>
                    <i style={{height:d[1]+"%",background:"#3B82F6",opacity:.55}}></i>
                    <i style={{height:d[2]+"%",background:"#10B981"}}></i>
                    <span className="lbl">{d[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* delivery heatmap (wide) */}
            <div className="vcard wide">
              <div className="vh"><span className="t">Delivery heatmap — issues resolved per day</span><span className="m">18 weeks · Payments squad</span></div>
              <div className="heat">
                {heatCells.map((o,i)=>(<span key={i} style={{"--o":o}}></span>))}
              </div>
              <div className="heatfoot">
                <span className="lab">Apr — May — Jun — Jul — Aug</span>
                <span className="heatlegend">less <i style={{background:"rgba(59,130,246,.12)"}}></i><i style={{background:"rgba(59,130,246,.35)"}}></i><i style={{background:"rgba(59,130,246,.6)"}}></i><i style={{background:"rgba(59,130,246,.9)"}}></i> more</span>
              </div>
            </div>
          </div>
          <div className="vchips">
            {["Burndown","Cycle time","Cumulative flow","Risk trends","Workload balance","Lead time","Vulnerability aging","Custom views"].map((c,i)=>(<span className="vchip" key={i}>{c}</span>))}
          </div>
        </div>
      </section>

      {/* DATA INTEGRITY */}
      <section className="trust2">
        <div className="wrap">
          <div className="row">
            <div>
              <span className="ftag">Data integrity</span>
              <h2>Your data stays yours.</h2>
              <p className="lead">Plokr can't see anything until you connect a tool and approve exactly what it may read. Access is read-only by default, scoped to what you grant, and revocable in one click.</p>
              <div className="pillars">
                {[
                  [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>,"Authorize-first access","Plokr sees nothing until you connect a tool and explicitly approve its scopes — no data, ever, without your consent."],
                  [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="2.6"/></svg>,"Read-only by default","We never write to your boards, repos, or pipelines. Plokr observes; it doesn't touch your source of truth."],
                  [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/><circle cx="9" cy="8" r="2.6" fill="currentColor"/><circle cx="15" cy="16" r="2.6" fill="currentColor"/></svg>,"Granular, revocable scopes","Grant access per project and per repo, and revoke any connection instantly from your workspace settings."],
                  [<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3Z"/><path d="M9 12l2 2 4-4"/></svg>,"Encrypted & compliant","SOC 2 Type II, GDPR-ready, with data encrypted in transit and at rest. Tokens are isolated per workspace."],
                ].map((p,i)=>(
                  <div className="pillar" key={i}><span className="pi">{p[0]}</span><h4>{p[1]}</h4><p>{p[2]}</p></div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="ch"><span className="t">Authorize Plokr</span><span className="chip">read-only · OAuth</span></div>
              {[
                ["#2A6FDB","J","Jira — Payments project","Read issues, sprints & status"],
                ["#1F2328","G","GitHub — acme/api-gateway","Read repo metadata & manifests"],
                ["#2563EB","B","Bitbucket — acme/ledger","Read repo metadata & manifests"],
              ].map((s,i)=>(
                <div className="scope" key={i}>
                  <span className="si" style={{background:s[0],color:"#fff",fontFamily:"Archivo",fontWeight:700,fontSize:13}}>{s[1]}</span>
                  <span className="sn"><b>{s[2]}</b><span>{s[3]}</span></span>
                  <span className="ro">READ-ONLY</span>
                </div>
              ))}
              <div className="permfoot"><span>You control access — revoke anytime.</span><span className="stamp">✓ Authorized by you</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="how" id="how">
        <div className="wrap">
          <div className="head">
            <span className="ftag">How it works</span>
            <h2>From connect to control in minutes.</h2>
            <p>Read-only OAuth, zero agents, nothing to install. Authorize your tools and Plokr starts watching immediately.</p>
          </div>
          <div className="steps">
            {[
              ["01","Connect your stack","Authorize Jira, GitHub, and Bitbucket with read-only OAuth. Plokr never writes to your boards or repos."],
              ["02","Plokr monitors","We sync issues and scan dependencies continuously, building a live model of progress and risk across every project."],
              ["03","Act before it's late","Ranked alerts arrive in-app, by email, and via webhooks the moment work stalls or a package turns risky."],
            ].map((s,i)=>(
              <div className="step" key={i}><span className="n">{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="pricing">
        <div className="wrap">
          <div className="head"><h2>Pricing built to scale with you.</h2><p>Start free, upgrade when your team grows. Per workspace.</p>
            <div className="billtoggle">
              <button className={billing==='monthly'?'on':''} onClick={()=>setBilling('monthly')}>Monthly</button>
              <button className={billing==='annual'?'on':''} onClick={()=>setBilling('annual')}>Annual <span className="save">SAVE 20%</span></button>
            </div>
          </div>
          <div className="tiers">
            {[
              {name:"Starter",monthly:"$0",annual:"$0",per:"/mo",desc:"For individuals getting started",feats:["1 Jira project","Up to 3 repos","Daily dependency scans","Email alerts"],cta:"Start free",style:"btn-line",mode:"signup"},
              {name:"Team",monthly:"$49",annual:"$39",per:"/mo",desc:"For squads shipping together",feats:["Unlimited Jira projects","Up to 25 repos","Real-time dependency scans","Email & webhook alerts","Stale & blocked detection","90-day trend history"],cta:"Start free trial",style:"btn-primary",mode:"signup",pop:true},
              {name:"Enterprise",monthly:"Custom",annual:"Custom",per:"",desc:"For orgs with compliance needs",feats:["Unlimited repos & projects","SSO / SAML & SCIM","Audit logs & RBAC","SOC 2 report & DPA","Dedicated support SLA"],cta:"Contact sales",style:"btn-line",mode:"sales"},
            ].map((t,i)=>{
              const priced = t[billing] !== "Custom" && t[billing] !== "$0";
              return (
              <div className={"tier"+(t.pop?" pop":"")} key={i}>
                {t.pop&&<span className="ribbon">Most popular</span>}
                <span className="tname">{t.name}</span>
                <div className="price">{t[billing]}<small>{t.per}</small></div>
                <div className="billnote">{priced ? (billing==='annual' ? 'billed annually · save 20%' : 'billed monthly') : '\u00A0'}</div>
                <p className="tdesc">{t.desc}</p>
                <ul>{t.feats.map((f,j)=>(<li key={j}><span className="tk">✓</span>{f}</li>))}</ul>
                <a className={"btn "+t.style} href={t.mode==='sales'?'mailto:sales@plork.com':MC_TRIAL}
                   onClick={t.mode==='sales'?undefined:openAuth('signup')}>{t.cta}</a>
              </div>
            );})}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="grid">
            <div>
              <a className="logo" href="#"><span className="mark"></span>Plokr</a>
              <p className="fdesc">Mission control for engineering — real-time Jira monitoring and dependency health across GitHub and Bitbucket.</p>
            </div>
            {[
              ["Platform",["Overview","Jira monitoring","Dependency checker","Integrations","Pricing"]],
              ["Company",["About","Careers","Blog","Contact"]],
              ["Resources",["Docs","Changelog","Status","Security"]],
              ["Legal",["Privacy","Terms","DPA","SOC 2"]],
            ].map((c,i)=>(
              <div className="fcol" key={i}><h5>{c[0]}</h5>{c[1].map((l,j)=>(<a href="#" key={j}>{l}</a>))}</div>
            ))}
          </div>
          <div className="legal"><span>© 2026 Plokr, Inc.</span><span>SOC 2 Type II · GDPR ready</span></div>
        </div>
      </footer>

      {/* AUTH MODAL */}
      {authMode && (
        <div className="ovl" onClick={()=>!redirecting && setAuthMode(null)}>
          <div className="modal" onClick={(e)=>e.stopPropagation()}>
            {!redirecting && <button className="close" onClick={()=>setAuthMode(null)}>×</button>}
            {redirecting ? (
              <div className="redir">
                <div className="spinner"></div>
                <div className="rt">Redirecting you securely…</div>
                <div className="rs">Taking you to <b>plork.com/app</b> to {authMode==='signup'?'create your workspace':'sign in'}.</div>
              </div>
            ) : (
              <React.Fragment>
                <div className="mtop">
                  <span className="mlogo"><span className="mark"></span>Plokr</span>
                  <h3>{authMode==='signup' ? 'Start your free trial' : 'Welcome back'}</h3>
                  <p className="msub">{authMode==='signup' ? 'Connect your tools and see progress in minutes. No credit card required.' : 'Sign in to your Plokr workspace to continue.'}</p>
                </div>
                <div className="body">
                  {[
                    ["#2563EB","Continue with Atlassian"],
                    ["#1F2328","Continue with GitHub"],
                    ["#EA4335","Continue with Google"],
                  ].map((p,i)=>(
                    <button className="prov" key={i} onClick={goToApp}><span className="sq" style={{background:p[0]}}></span>{p[1]}<span className="ar">→</span></button>
                  ))}
                  <div className="divider">or with email</div>
                  <input className="field" type="email" placeholder="you@company.com" onKeyDown={(e)=>{if(e.key==='Enter')goToApp();}} />
                  <button className="cont" onClick={goToApp}>{authMode==='signup' ? 'Create workspace' : 'Continue'}</button>
                </div>
                <div className="foot">
                  <div className="lockline">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
                    Read-only access · you authorize every connection
                  </div>
                  <div className="switch">
                    {authMode==='signup'
                      ? <span>Already have an account? <a onClick={()=>setAuthMode('login')}>Log in</a></span>
                      : <span>New to Plokr? <a onClick={()=>setAuthMode('signup')}>Start free trial</a></span>}
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
window.MissionHome = MissionHome;
