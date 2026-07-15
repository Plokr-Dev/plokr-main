/* Plokr shared design system — scope class .mc
   Type: Archivo (display) · Hanken Grotesk (body) · JetBrains Mono (code)
   Color: deep navy + electric blue, light enterprise surfaces. */
window.PLOKR_STYLES = `
.mc{--navy:#0A1626;--navy2:#0E1F35;--navy3:#13263F;--ink:#0C1A2B;--ink2:#33455B;--muted:#62748B;--bg:#F6F8FB;--bg2:#EEF3FA;--surface:#FFFFFF;--line:#E4EAF1;--blue:#3B82F6;--blue-l:#60A5FA;--blue-d:#2563EB;--cyan:#38BDF8;--ok:#10B981;--warn:#F59E0B;--bad:#EF4444;
  background:var(--bg);color:var(--ink);font-family:"Hanken Grotesk",sans-serif;font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased;}
.mc *{box-sizing:border-box;margin:0;padding:0;}
.mc [id]{scroll-margin-top:88px;}
.mc h1,.mc h2,.mc h3,.mc h4,.mc h5{font-family:"Archivo",sans-serif;font-weight:700;letter-spacing:-0.02em;line-height:1.04;color:var(--ink);}
.mc a{color:inherit;text-decoration:none;}
.mc .mono{font-family:"JetBrains Mono",monospace;}
.mc .wrap{max-width:1240px;margin:0 auto;padding:0 56px;}
.mc .wrap-sm{max-width:960px;margin:0 auto;padding:0 56px;}
.mc .wrap-xs{max-width:760px;margin:0 auto;padding:0 56px;}

/* buttons */
.mc .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:44px;padding:0 22px;border-radius:8px;font-weight:600;font-size:15px;font-family:"Hanken Grotesk";cursor:pointer;border:1px solid transparent;transition:.15s;white-space:nowrap;}
.mc .btn-primary{background:var(--blue);color:#fff;}
.mc .btn-primary:hover{background:var(--blue-d);}
.mc .btn-line{border-color:var(--line);background:var(--surface);color:var(--ink);}
.mc .btn-line:hover{border-color:#C7D3E2;}
.mc .btn-ghost{color:var(--ink2);background:transparent;}
.mc .btn-ghost:hover{color:var(--blue-d);}
.mc .btn-lg{height:52px;padding:0 28px;font-size:16px;}

/* NAV */
.mc .nav{position:sticky;top:0;z-index:200;height:72px;display:flex;align-items:center;background:rgba(10,22,38,.86);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.08);}
.mc .nav .wrap{display:flex;align-items:center;gap:38px;width:100%;}
.mc .logo{display:flex;align-items:center;gap:10px;font-family:"Bricolage Grotesque";font-weight:800;font-size:23px;color:#fff;letter-spacing:-.03em;}
.mc .logo .mark{width:15px;height:26px;background:var(--blue);border-radius:3px;transform:skewX(-10deg);flex:none;}
.mc .navlinks{display:flex;gap:28px;align-items:center;font-size:15px;color:rgba(255,255,255,.68);font-weight:500;}
.mc .navlinks a,.mc .navlinks .ddtrigger{color:rgba(255,255,255,.68);cursor:pointer;display:flex;align-items:center;gap:6px;transition:.15s;background:none;border:none;font-family:"Hanken Grotesk";font-size:15px;font-weight:500;}
.mc .navlinks a:hover,.mc .navlinks .ddtrigger:hover,.mc .navlinks a.on{color:#fff;}
.mc .navlinks .ddtrigger .caret{width:9px;height:9px;opacity:.7;transition:transform .18s;}
.mc .dd{position:relative;}
.mc .dd.open .caret{transform:rotate(180deg);}
.mc .ddmenu{position:absolute;top:calc(100% + 14px);left:-14px;background:#fff;border:1px solid var(--line);border-radius:14px;box-shadow:0 24px 60px -18px rgba(8,18,32,.4);padding:10px;min-width:320px;display:none;}
.mc .dd.open .ddmenu{display:block;animation:mcdd .16s ease;}
@keyframes mcdd{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
.mc .dditem{display:flex;gap:12px;align-items:flex-start;padding:11px 12px;border-radius:10px;transition:.12s;}
.mc .dditem:hover{background:var(--bg);}
.mc .dditem .di{width:34px;height:34px;border-radius:9px;background:#EAF1FE;color:var(--blue-d);display:flex;align-items:center;justify-content:center;flex:none;}
.mc .dditem .di svg{width:18px;height:18px;}
.mc .dditem b{font-family:"Archivo";font-size:14px;font-weight:600;color:var(--ink);display:block;}
.mc .dditem span{font-size:12.5px;color:var(--muted);line-height:1.4;}
.mc .navright{margin-left:auto;display:flex;align-items:center;gap:14px;}
.mc .navright .login{color:rgba(255,255,255,.85);font-weight:600;font-size:15px;white-space:nowrap;}
.mc .navright .login:hover{color:#fff;}

/* page hero (inner pages, light) */
.mc .phero{background:var(--bg);border-bottom:1px solid var(--line);padding:64px 0 60px;position:relative;overflow:hidden;}
.mc .phero.dark{background:var(--navy);border-bottom:0;color:#fff;}
.mc .phero.dark::before{content:"";position:absolute;inset:0;background:radial-gradient(820px 420px at 80% -10%,rgba(59,130,246,.22),transparent 60%);}
.mc .phero .wrap{position:relative;}
.mc .crumbs{font-family:"JetBrains Mono";font-size:12px;color:var(--muted);display:flex;gap:8px;align-items:center;margin-bottom:20px;}
.mc .phero.dark .crumbs{color:rgba(255,255,255,.5);}
.mc .crumbs a:hover{color:var(--blue-d);}
.mc .eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:"JetBrains Mono";font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--blue-d);background:#EAF1FE;padding:6px 12px;border-radius:7px;white-space:nowrap;}
.mc .phero.dark .eyebrow{background:rgba(59,130,246,.14);color:var(--blue-l);}
.mc .phero h1{font-size:52px;font-weight:800;margin:20px 0 0;max-width:780px;}
.mc .phero.dark h1{color:#fff;}
.mc .phero h1 em{font-style:normal;color:var(--blue-d);}
.mc .phero.dark h1 em{color:var(--cyan);}
.mc .phero p.lede{font-size:20px;color:var(--muted);max-width:620px;margin:22px 0 0;line-height:1.5;}
.mc .phero.dark p.lede{color:rgba(255,255,255,.72);}
.mc .phero .cta{display:flex;gap:14px;margin-top:30px;}

/* generic sections */
.mc .sec{padding:96px 0;}
.mc .sec.tight{padding:72px 0;}
.mc .sec.alt{background:var(--surface);border-top:1px solid var(--line);border-bottom:1px solid var(--line);}
.mc .sec.soft{background:var(--bg2);}
.mc .sec.dark{background:var(--navy);color:#fff;position:relative;overflow:hidden;}
.mc .sec.dark h2,.mc .sec.dark h3{color:#fff;}
.mc .sec-head{max-width:680px;margin:0 auto 52px;text-align:center;}
.mc .sec-head.left{margin-left:0;text-align:left;}
.mc .sec-head h2{font-size:40px;}
.mc .sec.dark .sec-head h2{color:#fff;}
.mc .sec-head p{color:var(--muted);font-size:18px;margin-top:14px;line-height:1.55;}
.mc .sec.dark .sec-head p{color:rgba(255,255,255,.66);}
.mc .ftag{font-family:"JetBrains Mono";font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--blue-d);background:#EAF1FE;padding:5px 11px;border-radius:6px;display:inline-block;white-space:nowrap;}
.mc .sec.dark .ftag{background:rgba(59,130,246,.14);color:var(--blue-l);}

/* grids */
.mc .grid2{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
.mc .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.mc .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.mc .frow{display:grid;grid-template-columns:1fr 1.05fr;gap:60px;align-items:center;}
.mc .frow.rev{direction:rtl;}
.mc .frow.rev>*{direction:ltr;}
.mc .frow h2{font-size:40px;margin:16px 0 18px;}
.mc .frow p.lead{font-size:18px;color:var(--muted);line-height:1.6;}

/* checklist */
.mc .checklist{margin-top:26px;display:flex;flex-direction:column;gap:14px;}
.mc .checklist li{list-style:none;display:flex;gap:12px;font-size:15.5px;color:var(--ink2);align-items:flex-start;}
.mc .checklist .tick{width:22px;height:22px;border-radius:6px;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:center;flex:none;font-size:12px;font-weight:700;margin-top:1px;}

/* cards */
.mc .card{background:var(--surface);border:1px solid var(--line);border-radius:14px;box-shadow:0 24px 50px -30px rgba(12,26,43,.3);overflow:hidden;}
.mc .card .ch{padding:16px 20px;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:10px;}
.mc .card .ch .t{font-family:"Archivo";font-weight:700;font-size:15px;}
.mc .card .ch .chip{margin-left:auto;font-family:"JetBrains Mono";font-size:11px;color:var(--muted);border:1px solid var(--line);padding:3px 8px;border-radius:6px;}
.mc .feat-card{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:26px;}
.mc .feat-card .ic{width:44px;height:44px;border-radius:11px;background:#EAF1FE;color:var(--blue-d);display:flex;align-items:center;justify-content:center;}
.mc .feat-card .ic svg{width:22px;height:22px;}
.mc .feat-card h3{font-size:19px;margin:18px 0 9px;}
.mc .feat-card p{font-size:14.5px;color:var(--muted);line-height:1.55;}

/* tags / pills */
.mc .tag{font-size:11px;font-weight:700;padding:3px 9px;border-radius:5px;white-space:nowrap;font-family:"Hanken Grotesk";}
.mc .tag.ok{background:#E6F7F1;color:#0A7553;}
.mc .tag.out{background:#FEF3DC;color:#9A6A05;}
.mc .tag.vuln{background:#FDE9E9;color:#C03434;}
.mc .pill{font-size:11px;font-weight:700;padding:3px 9px;border-radius:999px;white-space:nowrap;}
.mc .pill.prog{background:#EAF1FE;color:var(--blue-d);}
.mc .pill.block{background:#FDE9E9;color:#C03434;}
.mc .pill.todo{background:#EEF1F6;color:#55606F;}
.mc .drow{display:flex;align-items:center;gap:14px;padding:13px 20px;border-top:1px solid var(--line);font-size:13.5px;}
.mc .drow:first-of-type{border-top:0;}
.mc .drow .pkg{font-family:"JetBrains Mono";font-weight:600;color:var(--ink);flex:1;}
.mc .drow .ver{font-family:"JetBrains Mono";font-size:12px;color:var(--muted);}
.mc .ava{width:24px;height:24px;border-radius:50%;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;color:#fff;flex:none;}

/* steps */
.mc .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.mc .step{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:28px;}
.mc .sec.dark .step{background:var(--navy2);border-color:rgba(255,255,255,.09);}
.mc .step .n{font-family:"JetBrains Mono";font-size:13px;color:var(--blue-d);font-weight:700;}
.mc .sec.dark .step .n{color:var(--cyan);}
.mc .step h3{font-size:20px;margin:14px 0 10px;}
.mc .step p{font-size:14.5px;color:var(--muted);line-height:1.55;}
.mc .sec.dark .step p{color:rgba(255,255,255,.6);}

/* pillars */
.mc .pillars{display:grid;grid-template-columns:1fr 1fr;gap:24px 26px;}
.mc .pillar .pi{width:40px;height:40px;border-radius:11px;background:#EAF1FE;color:var(--blue-d);display:flex;align-items:center;justify-content:center;}
.mc .pillar .pi svg{width:20px;height:20px;}
.mc .pillar h4{font-family:"Archivo";font-size:16px;margin:13px 0 6px;}
.mc .pillar p{font-size:13.5px;color:var(--muted);line-height:1.5;}

/* logos strip */
.mc .logos{background:var(--surface);border-bottom:1px solid var(--line);padding:30px 0;}
.mc .logos .wrap{display:flex;align-items:center;gap:32px;}
.mc .logos p{font-size:13px;color:var(--muted);font-weight:600;white-space:nowrap;}
.mc .logorow{display:flex;gap:26px;flex-wrap:nowrap;margin-left:auto;}
.mc .lgo{display:flex;align-items:center;gap:8px;font-family:"Archivo";font-weight:700;font-size:15.5px;color:var(--ink2);white-space:nowrap;}
.mc .lgo .sq{width:18px;height:18px;border-radius:5px;flex:none;}

/* pricing */
.mc .billtoggle{display:inline-flex;background:#EAEFF6;border-radius:11px;padding:4px;gap:4px;}
.mc .billtoggle button{border:none;background:transparent;font-family:"Hanken Grotesk";font-weight:600;font-size:14px;color:var(--muted);padding:9px 20px;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:8px;transition:.15s;}
.mc .billtoggle button.on{background:#fff;color:var(--ink);box-shadow:0 1px 3px rgba(12,26,43,.12);}
.mc .billtoggle .save{font-family:"JetBrains Mono";font-size:10.5px;font-weight:700;color:#0A7553;background:#E6F7F1;padding:2px 7px;border-radius:5px;}
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
.mc .tier .billnote{font-family:"JetBrains Mono";font-size:11px;color:var(--muted);margin-top:-2px;min-height:14px;}
.mc .tier.pop .billnote{color:rgba(255,255,255,.5);}
.mc .tier .tdesc{font-size:14px;color:var(--muted);min-height:42px;}
.mc .tier ul{list-style:none;margin:22px 0 26px;display:flex;flex-direction:column;gap:12px;}
.mc .tier li{font-size:14px;color:var(--ink2);display:flex;gap:10px;align-items:flex-start;}
.mc .tier li .tk{color:var(--blue);font-weight:700;flex:none;}
.mc .tier.pop li .tk{color:var(--cyan);}
.mc .tier .btn{width:100%;margin-top:auto;}
.mc .tier.pop .btn-line{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.2);color:#fff;}

/* comparison table */
.mc .ctable{width:100%;border-collapse:collapse;background:var(--surface);border:1px solid var(--line);border-radius:14px;overflow:hidden;}
.mc .ctable th,.mc .ctable td{padding:15px 20px;text-align:left;border-top:1px solid var(--line);font-size:14px;}
.mc .ctable thead th{background:var(--bg);font-family:"Archivo";font-weight:700;font-size:14px;border-top:0;}
.mc .ctable td.c,.mc .ctable th.c{text-align:center;}
.mc .ctable .yes{color:var(--ok);font-weight:700;}
.mc .ctable .no{color:#C3CCD8;}
.mc .ctable .grp td{background:var(--bg);font-family:"Archivo";font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.04em;color:var(--ink2);}

/* FAQ accordion */
.mc .faq{max-width:820px;margin:0 auto;border-top:1px solid var(--line);}
.mc .faq .qa{border-bottom:1px solid var(--line);}
.mc .faq .q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:24px 4px;background:none;border:none;cursor:pointer;text-align:left;font-family:"Archivo";font-weight:600;font-size:18px;color:var(--ink);}
.mc .faq .q .pm{flex:none;width:24px;height:24px;color:var(--blue-d);transition:transform .2s;}
.mc .faq .qa.open .q .pm{transform:rotate(45deg);}
.mc .faq .a{max-height:0;overflow:hidden;transition:max-height .25s ease,padding .25s ease;}
.mc .faq .qa.open .a{max-height:340px;padding:0 4px 24px;}
.mc .faq .a p{color:var(--muted);font-size:15.5px;line-height:1.6;}

/* prose (legal / docs / article) */
.mc .prose{font-size:16.5px;color:var(--ink2);line-height:1.7;}
.mc .prose h2{font-size:27px;margin:42px 0 14px;}
.mc .prose h3{font-size:20px;margin:30px 0 10px;}
.mc .prose p{margin:0 0 16px;}
.mc .prose ul,.mc .prose ol{margin:0 0 18px;padding-left:22px;}
.mc .prose li{margin:0 0 9px;}
.mc .prose a{color:var(--blue-d);font-weight:600;}
.mc .prose a:hover{text-decoration:underline;}
.mc .prose strong{color:var(--ink);font-weight:600;}
.mc .prose code{font-family:"JetBrains Mono";font-size:13.5px;background:var(--bg2);padding:2px 6px;border-radius:5px;color:var(--ink);}
.mc .prose blockquote{border-left:3px solid var(--blue);padding:4px 0 4px 20px;margin:0 0 18px;color:var(--ink2);font-style:italic;}

/* docs layout */
.mc .docs{display:grid;grid-template-columns:248px 1fr;gap:48px;}
.mc .docnav{position:sticky;top:104px;align-self:start;}
.mc .docnav .grp{font-family:"Archivo";font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--ink2);margin:22px 0 10px;}
.mc .docnav .grp:first-child{margin-top:0;}
.mc .docnav a{display:block;font-size:14px;color:var(--muted);padding:6px 12px;border-radius:8px;border-left:2px solid transparent;}
.mc .docnav a:hover{color:var(--ink);background:var(--bg2);}
.mc .docnav a.on{color:var(--blue-d);border-left-color:var(--blue);font-weight:600;background:#EAF1FE;}
.mc .doccard{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:24px;display:block;transition:.15s;}
.mc .doccard:hover{border-color:#C7D3E2;box-shadow:0 14px 30px -22px rgba(12,26,43,.4);}
.mc .doccard .di{width:38px;height:38px;border-radius:10px;background:#EAF1FE;color:var(--blue-d);display:flex;align-items:center;justify-content:center;}
.mc .doccard .di svg{width:19px;height:19px;}
.mc .doccard h3{font-size:17px;margin:14px 0 7px;}
.mc .doccard p{font-size:14px;color:var(--muted);line-height:1.5;}

/* blog */
.mc .bloglist{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;}
.mc .post{display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--line);border-radius:14px;overflow:hidden;transition:.15s;}
.mc .post:hover{border-color:#C7D3E2;box-shadow:0 18px 40px -26px rgba(12,26,43,.45);transform:translateY(-2px);}
.mc .post .thumb{height:170px;background:linear-gradient(135deg,var(--navy2),var(--navy));position:relative;overflow:hidden;}
.mc .post .thumb::after{content:"";position:absolute;inset:0;background:radial-gradient(300px 160px at 80% 10%,rgba(59,130,246,.4),transparent 60%);}
.mc .post .pc{padding:22px;display:flex;flex-direction:column;flex:1;}
.mc .post .cat{font-family:"JetBrains Mono";font-size:11px;font-weight:600;color:var(--blue-d);text-transform:uppercase;letter-spacing:.04em;}
.mc .post h3{font-size:19px;margin:10px 0 9px;line-height:1.2;}
.mc .post p{font-size:14px;color:var(--muted);line-height:1.5;flex:1;}
.mc .post .meta{margin-top:16px;font-size:12.5px;color:var(--muted);display:flex;gap:10px;align-items:center;}
.mc .feat-post{display:grid;grid-template-columns:1.1fr 1fr;gap:0;background:var(--surface);border:1px solid var(--line);border-radius:16px;overflow:hidden;margin-bottom:40px;}
.mc .feat-post .thumb{min-height:320px;}
.mc .feat-post .pc{padding:40px;display:flex;flex-direction:column;justify-content:center;}
.mc .feat-post h2{font-size:30px;margin:12px 0 14px;}
.mc .feat-post p{font-size:16px;color:var(--muted);line-height:1.55;}

/* changelog */
.mc .clog{max-width:820px;margin:0 auto;}
.mc .clentry{display:grid;grid-template-columns:180px 1fr;gap:34px;padding:36px 0;border-top:1px solid var(--line);}
.mc .clentry:first-child{border-top:0;}
.mc .clmeta .date{font-family:"JetBrains Mono";font-size:13px;color:var(--muted);}
.mc .clmeta .ver{display:inline-block;margin-top:8px;font-family:"Archivo";font-weight:700;font-size:13px;color:var(--blue-d);background:#EAF1FE;padding:3px 10px;border-radius:6px;}
.mc .clbody h3{font-size:22px;margin-bottom:14px;}
.mc .clbody .ci{display:flex;gap:11px;align-items:flex-start;margin-bottom:11px;font-size:14.5px;color:var(--ink2);line-height:1.5;}
.mc .clbody .ci .lab{flex:none;font-family:"JetBrains Mono";font-size:10px;font-weight:700;padding:3px 7px;border-radius:5px;text-transform:uppercase;margin-top:2px;}
.mc .clbody .lab.new{background:#E6F7F1;color:#0A7553;}
.mc .clbody .lab.imp{background:#EAF1FE;color:var(--blue-d);}
.mc .clbody .lab.fix{background:#FEF3DC;color:#9A6A05;}

/* form */
.mc .field{height:48px;border:1px solid var(--line);border-radius:11px;padding:0 14px;font-size:14.5px;font-family:"Hanken Grotesk";width:100%;color:var(--ink);box-sizing:border-box;background:#fff;}
.mc textarea.field{height:auto;padding:13px 14px;resize:vertical;min-height:120px;line-height:1.5;}
.mc .field::placeholder{color:#9AA7B6;}
.mc .field:focus{outline:none;border-color:var(--blue);box-shadow:0 0 0 3px rgba(59,130,246,.15);}
.mc .flabel{font-size:13px;font-weight:600;color:var(--ink2);margin-bottom:7px;display:block;}
.mc .fgroup{margin-bottom:18px;}

/* cta band */
.mc .ctaband .box{background:var(--navy);border-radius:22px;padding:60px;text-align:center;color:#fff;position:relative;overflow:hidden;}
.mc .ctaband .box::before{content:"";position:absolute;inset:0;background:radial-gradient(700px 320px at 80% -10%,rgba(59,130,246,.45),transparent 60%);}
.mc .ctaband h2{font-size:38px;color:#fff;position:relative;}
.mc .ctaband p{color:rgba(255,255,255,.7);font-size:18px;margin:16px auto 30px;max-width:520px;position:relative;}
.mc .ctaband .cta{display:flex;gap:14px;justify-content:center;position:relative;}
.mc .ctaband .btn-line{background:rgba(255,255,255,.07);color:#fff;border-color:rgba(255,255,255,.24);}
.mc .ctaband .btn-line:hover{background:rgba(255,255,255,.14);}

/* footer */
.mc footer{background:var(--navy);color:#fff;padding:64px 0 50px;}
.mc footer .grid{display:grid;grid-template-columns:1.6fr repeat(4,1fr);gap:32px;}
.mc footer .fdesc{font-size:14px;color:rgba(255,255,255,.55);margin-top:16px;max-width:260px;line-height:1.55;}
.mc footer h5{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:rgba(255,255,255,.5);margin-bottom:16px;font-weight:700;font-family:"Archivo";}
.mc footer .fcol a{display:block;font-size:14px;color:rgba(255,255,255,.8);margin-bottom:11px;}
.mc footer .fcol a:hover{color:var(--cyan);}
.mc footer .legal{margin-top:46px;padding-top:24px;border-top:1px solid rgba(255,255,255,.12);display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,.5);}

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
`;
