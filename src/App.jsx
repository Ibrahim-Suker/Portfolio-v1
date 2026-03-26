import { useState, useEffect, useRef, createContext, useContext } from "react";

/* ─── Theme Context ─────────────────────────────────────────── */
const ThemeCtx = createContext({ isDark: true, c: {}, toggle: () => {} });
const useTheme = () => useContext(ThemeCtx);

/* ─── Color Palettes ─────────────────────────────────────────── */
const DARK = {
  bg1: "#0a0a0a", bg2: "#0f0f0f", bg3: "#111111", bg4: "#141414",
  text1: "#fafaf7", text2: "#aaaaaa", text3: "#555555", text4: "#333333",
  border1: "#1a1a1a", border2: "#161616",
  accent: "#B91C1C", accentBg: "rgba(185,28,28,0.15)",
  navBg: "rgba(10,10,10,0.92)",
};
const LIGHT = {
  bg1: "#fafaf7", bg2: "#f0ede6", bg3: "#ffffff", bg4: "#e8e5de",
  text1: "#0d0d0d", text2: "#444444", text3: "#888888", text4: "#bbbbbb",
  border1: "#e0dbd2", border2: "#eae6df",
  accent: "#B91C1C", accentBg: "rgba(185,28,28,0.08)",
  navBg: "rgba(250,250,247,0.94)",
};

/* ─── Google Fonts ─────────────────────────────────────────── */
const FontLink = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=Syne:wght@400;600;700;800&display=swap');`}</style>
);

/* ─── Global Styles ─────────────────────────────────────────── */
const GlobalStyles = ({ c }) => (
  <style>{`
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.3)}}
    @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
    *{cursor:none!important;box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{background:${c.bg1};color:${c.text1};transition:background .3s,color .3s;font-family:'Syne',sans-serif}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:${c.bg1}}
    ::-webkit-scrollbar-thumb{background:${c.accent};border-radius:2px}
    ul{list-style:none;padding:0} a{text-decoration:none}
  `}</style>
);

/* ─── Data ──────────────────────────────────────────────────── */
const PROJECTS = [
  { id:"01", badge:"Graduation Project", name:"Blood Donation\nManagement System", desc:"Full-stack platform connecting blood donors with hospitals across Egypt. Owned the entire backend API and React frontend independently within a team of 7.", tech:["ASP.NET Core Web API","React","SQL Server","JWT","Maps","Email"], live:"https://blood-donation-frontend-lac.vercel.app/", front:"https://github.com/Ibrahim-Suker/Front-BloodDonation", back:"https://github.com/Ibrahim-Suker/BloodDonationSystem", color:"#B91C1C" },
  { id:"02", name:"Expense Tracker", desc:"Personal finance system with income/expense tracking across 5+ categories. Full CRUD with ~25% query performance improvement.", tech:["ASP.NET Core MVC","EF Core","SQL Server"], github:"https://github.com/Ibrahim-Suker/Expense-Tracker", color:"#1d4ed8" },
  { id:"03", name:"Blog Platform", desc:"Multi-user blog with role-based auth, 100+ users, 500+ monthly entries. 99% error-free deployment through structured validation.", tech:["ASP.NET Core MVC","Role-Based Auth"], github:"https://github.com/Ibrahim-Suker/BlogPost", color:"#0f766e" },
  { id:"04", name:"E-Commerce App", desc:"Scalable e-commerce app with 200+ products. N-Tier architecture with Repository Pattern — 30% less code duplication.", tech:["ASP.NET Core MVC","N-Tier","ASP.NET Identity"], github:"https://github.com/Ibrahim-Suker/DEPI-Ecommerce-MVC", color:"#7c3aed" },
];

const SKILLS = {
  Backend: ["C#","ASP.NET Core MVC","Web API","EF Core","JWT Auth","Role-Based Auth"],
  Frontend: ["React","JavaScript","TypeScript","Angular","Tailwind CSS","Bootstrap"],
  Database: ["SQL Server","MySQL","Stored Procedures","Oracle APEX","Query Optimization"],
  "Tools & Concepts": ["N-Tier Architecture","Repository Pattern","SOLID","Docker","Git/GitHub","Postman"],
};

const CERTS = [
  { issuer:"DEPI · MCIT",                name:"Full Stack .NET Web Developer",    date:"May 2025" },
  { issuer:"freeCodeCamp",               name:"Foundational C# with Microsoft",   date:"Dec 2024" },
  { issuer:"ITI",                        name:"Database Fundamentals",            date:"Dec 2024" },
  { issuer:"Russian Culture Center Cairo", name:"PHP Full Stack Web Developer",   date:"Jan 2025" },
  { issuer:"Orascom Construction",       name:"Oracle APEX & Database Training",  date:"Aug 2025" },
  { issuer:"DEPI · Berlitz Egypt",       name:"Business English Track — Round 2", date:"May 2025" },
];

/* ─── Hooks ─────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useMouse() {
  const [pos, setPos]       = useState({ x: 0, y: 0 });
  const [smooth, setSmooth] = useState({ x: 0, y: 0 });
  const req = useRef(null);
  const raw = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => { raw.current = { x: e.clientX, y: e.clientY }; setPos({ x: e.clientX, y: e.clientY }); };
    window.addEventListener("mousemove", onMove);
    const loop = () => {
      cur.current.x += (raw.current.x - cur.current.x) * 0.1;
      cur.current.y += (raw.current.y - cur.current.y) * 0.1;
      setSmooth({ x: cur.current.x, y: cur.current.y });
      req.current = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(req.current); };
  }, []);
  return { pos, smooth };
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

/* ─── Icons ─────────────────────────────────────────────────── */
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

/* ─── Split Text ────────────────────────────────────────────── */
function SplitText({ text, inView, delay = 0, tag = "div", containerStyle = {} }) {
  const Tag = tag;
  return (
    <Tag style={{ display: "block", overflow: "hidden", ...containerStyle }}>
      {text.split("").map((ch, i) => (
        <span key={i} style={{
          display: "inline-block",
          transform: inView ? "translateY(0)" : "translateY(110%)",
          transition: `transform .7s cubic-bezier(0.16,1,0.3,1) ${delay + i * 0.025}s`,
          whiteSpace: ch === " " ? "pre" : "normal",
        }}>{ch}</span>
      ))}
    </Tag>
  );
}

/* ─── Reveal ────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 40 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : `translateY(${y}px)`,
      transition: `opacity .8s ease ${delay}s, transform .8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ─── Magnetic Button ───────────────────────────────────────── */
function MagBtn({ children, href, style = {}, onClick, dataCursor }) {
  const ref = useRef(null);
  const [off, setOff] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setOff({ x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35 });
  };
  const s = { display:"inline-flex", alignItems:"center", justifyContent:"center", transform:`translate(${off.x}px,${off.y}px)`, transition:"transform .3s cubic-bezier(0.16,1,0.3,1)", ...style };
  const props = { ref, onMouseMove: onMove, onMouseLeave: () => setOff({ x:0, y:0 }), onClick, "data-cursor": dataCursor };
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" {...props} style={s}>{children}</a>
    : <button {...props} style={s}>{children}</button>;
}

/* ─── Cursor ────────────────────────────────────────────────── */
function Cursor() {
  const { pos, smooth } = useMouse();
  const { c } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    const enter = (e) => { setHovered(true); setText(e.currentTarget.dataset.cursor || ""); };
    const leave = () => { setHovered(false); setText(""); };
    const els = document.querySelectorAll("[data-cursor]");
    els.forEach(el => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });
    return () => els.forEach(el => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
  });
  return (
    <>
      <div style={{ position:"fixed", left:pos.x, top:pos.y, width:8, height:8, background:c.accent, borderRadius:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:9999 }} />
      <div style={{ position:"fixed", left:smooth.x, top:smooth.y, width:hovered?80:36, height:hovered?80:36, border:`1px solid ${c.accent}`, borderRadius:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:9998, transition:"width .4s,height .4s", display:"flex", alignItems:"center", justifyContent:"center", opacity:.6 }}>
        {text && <span style={{ fontSize:".6rem", fontFamily:"'Syne',sans-serif", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:c.accent, whiteSpace:"nowrap" }}>{text}</span>}
      </div>
    </>
  );
}

/* ─── Noise ─────────────────────────────────────────────────── */
const Noise = () => (
  <div style={{ position:"fixed", inset:0, zIndex:9990, pointerEvents:"none", opacity:.025, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat:"repeat", backgroundSize:"200px" }} />
);

/* ─── Section Label ─────────────────────────────────────────── */
function SectionLabel({ label }) {
  const { c } = useTheme();
  return (
    <Reveal>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:".7rem", fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:c.accent, marginBottom:"1rem", display:"flex", alignItems:"center", gap:"1rem" }}>
        {label} <div style={{ flex:1, height:1, background:c.border1 }} />
      </div>
    </Reveal>
  );
}

/* ─── Nav ───────────────────────────────────────────────────── */
function Nav({ scrollY }) {
  const { isDark, c, toggle } = useTheme();
  const w   = useWindowWidth();
  const isMobile  = w < 640;
  const isTablet  = w < 960;
  const solid = scrollY > 60;
  const links = ["about","projects","experience","skills","contact"];

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", padding:`${isMobile?"1rem":"1.4rem"} 5vw`, background:solid?c.navBg:"transparent", backdropFilter:solid?"blur(16px)":"none", borderBottom:solid?`1px solid ${c.border1}`:"none", transition:"all .4s ease" }}>

      <a href="#hero" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:isMobile?"1.15rem":"1.4rem", fontWeight:600, color:c.text1, textDecoration:"none", fontStyle:"italic" }}>
        Ibrahim <span style={{ color:c.accent, fontStyle:"normal" }}>Ahmed</span>
      </a>

      <div style={{ display:"flex", alignItems:"center", gap:isMobile?"0.8rem":"2rem" }}>

        {/* Links — hidden on tablet & mobile */}
        {!isTablet && (
          <div style={{ display:"flex", gap:"2.2rem" }}>
            {links.map(l => (
              <a key={l} href={`#${l}`} style={{ fontFamily:"'Syne',sans-serif", fontSize:".72rem", fontWeight:600, letterSpacing:".12em", textTransform:"uppercase", color:c.text3, textDecoration:"none", transition:"color .2s" }}
                onMouseEnter={e=>e.target.style.color=c.text1}
                onMouseLeave={e=>e.target.style.color=c.text3}>{l}</a>
            ))}
          </div>
        )}

        {/* ☀️ / 🌙 Theme toggle */}
        <button onClick={toggle}
          style={{ background:"none", border:`1px solid ${c.border1}`, borderRadius:"2px", padding:".42rem .55rem", color:c.text2, cursor:"none", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s", flexShrink:0 }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=c.accent;e.currentTarget.style.color=c.accent;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=c.border1;e.currentTarget.style.color=c.text2;}}>
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Hire Me — hidden on small mobile */}
        {!isMobile && (
          <MagBtn href="mailto:ibrahimsukeroo@gmail.com"
            style={{ fontFamily:"'Syne',sans-serif", fontSize:".72rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", background:c.accent, color:"#fff", padding:".6rem 1.4rem", borderRadius:"2px", textDecoration:"none", border:"none" }}>
            Hire Me →
          </MagBtn>
        )}
      </div>
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────────── */
function Hero() {
  const { c } = useTheme();
  const { smooth } = useMouse();
  const w        = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w < 960;
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 200); }, []);

  const px = isMobile ? 0 : (smooth.x / window.innerWidth  - .5) * 30;
  const py = isMobile ? 0 : (smooth.y / window.innerHeight - .5) * 20;

  return (
    <section id="hero" style={{ minHeight:"100vh", background:"#0a0a0a", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:`0 5vw ${isMobile?"5vh":"6vh"}`, position:"relative", overflow:"hidden" }}>

      {/* Orbs */}
      {!isMobile && (
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", top:"20%", left:"10%", width:500, height:500, background:"radial-gradient(circle,rgba(185,28,28,0.15) 0%,transparent 70%)", transform:`translate(${px*1.5}px,${py*1.5}px)`, transition:"transform .1s linear", borderRadius:"50%", filter:"blur(40px)" }} />
          <div style={{ position:"absolute", top:"50%", right:"15%", width:400, height:400, background:"radial-gradient(circle,rgba(185,28,28,0.08) 0%,transparent 70%)", transform:`translate(${-px}px,${-py}px)`, transition:"transform .1s linear", borderRadius:"50%", filter:"blur(60px)" }} />
        </div>
      )}

      {/* BG IA */}
      <div style={{ position:"absolute", top:"45%", left:"50%", transform:`translate(-50%,-50%) translate(${px*.5}px,${py*.5}px)`, fontFamily:"'Cormorant Garamond',serif", fontSize:isMobile?"50vw":"28vw", fontWeight:700, color:"transparent", WebkitTextStroke:"1px rgba(255,255,255,0.04)", whiteSpace:"nowrap", pointerEvents:"none", letterSpacing:"-2vw", transition:"transform .1s linear" }}>IA</div>

      {/* Badge row */}
      {!isMobile && (
        <div style={{ position:"absolute", top:"42%", left:"5vw", right:"5vw", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:".6rem", fontFamily:"'Syne',sans-serif", fontSize:".7rem", fontWeight:600, letterSpacing:".12em", textTransform:"uppercase", color:"#555" }}>
            <span style={{ width:6, height:6, background:c.accent, borderRadius:"50%", animation:"pulse 2s infinite" }} />
            Software Engineer · Cairo, Egypt
          </div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:".7rem", color:"#555", letterSpacing:".08em", textTransform:"uppercase" }}>ASP.NET · React · SQL Server</div>
        </div>
      )}

      {/* Bottom */}
      <div style={{ borderTop:"1px solid #1a1a1a", paddingTop:"2rem", marginTop:"auto", position:"relative", zIndex:1 }}>
        <div style={{ display:"flex", flexDirection:isMobile||isTablet?"column":"row", justifyContent:"space-between", alignItems:isMobile||isTablet?"flex-start":"flex-end", paddingTop:"2.5rem", gap:isMobile?"1.5rem":"0" }}>

          <div>
            <SplitText text="Ibrahim" inView={mounted} delay={0.3} tag="div"
              containerStyle={{ fontFamily:"'Cormorant Garamond',serif", fontSize:isMobile?"clamp(3.5rem,18vw,5.5rem)":"clamp(5rem,13vw,15rem)", fontWeight:300, lineHeight:.9, letterSpacing:"-3px", color:"#fafaf7" }} />
            <SplitText text="Ahmed." inView={mounted} delay={0.4} tag="div"
              containerStyle={{ fontFamily:"'Cormorant Garamond',serif", fontSize:isMobile?"clamp(3.5rem,18vw,5.5rem)":"clamp(5rem,13vw,15rem)", fontWeight:300, lineHeight:.9, letterSpacing:"-3px", color:c.accent, fontStyle:"italic" }} />
          </div>

          <div style={{ display:"flex", flexDirection:"column", alignItems:isMobile||isTablet?"flex-start":"flex-end", gap:"1.5rem", maxWidth:isMobile?"100%":340, paddingBottom:".5rem", opacity:mounted?1:0, transform:mounted?"none":"translateY(20px)", transition:"all .8s ease 1s" }}>
            {isMobile && (
              <div style={{ display:"flex", alignItems:"center", gap:".6rem", fontFamily:"'Syne',sans-serif", fontSize:".65rem", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"#555" }}>
                <span style={{ width:5, height:5, background:c.accent, borderRadius:"50%", animation:"pulse 2s infinite" }} />
                Software Engineer · Cairo, Egypt
              </div>
            )}
            <p style={{ fontFamily:"'Syne',sans-serif", fontSize:".78rem", fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", color:"#444", textAlign:isMobile||isTablet?"left":"right", lineHeight:1.8, margin:0 }}>
              Full Stack .NET Developer<br />Building scalable web apps<br />that clients rely on.
            </p>
            <a href="#projects" style={{ fontFamily:"'Syne',sans-serif", fontSize:".75rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#fafaf7", textDecoration:"none", borderBottom:"1px solid #333", paddingBottom:3, transition:"all .2s" }}
              onMouseEnter={e=>{e.target.style.color=c.accent;e.target.style.borderColor=c.accent;}}
              onMouseLeave={e=>{e.target.style.color="#fafaf7";e.target.style.borderColor="#333";}}>
              View My Work ↓
            </a>
            {!isMobile && (
              <div style={{ display:"flex", alignItems:"center", gap:".8rem", fontFamily:"'Syne',sans-serif", fontSize:".65rem", letterSpacing:".15em", textTransform:"uppercase", color:"#333" }}>
                <div style={{ width:40, height:1, background:"#333" }} />Scroll to explore
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Marquee ───────────────────────────────────────────────── */
function Marquee() {
  const items = ["ASP.NET Core","·","React","·","SQL Server","·","Entity Framework","·","REST APIs","·","JWT Auth","·","Docker","·","Clean Architecture","·"];
  const doubled = [...items,...items];
  return (
    <div style={{ background:"#0d0d0d", borderTop:"1px solid #1a1a1a", borderBottom:"1px solid #1a1a1a", padding:"1rem 0", overflow:"hidden" }}>
      <div style={{ display:"flex", whiteSpace:"nowrap", animation:"marquee 25s linear infinite" }}>
        {doubled.map((item,i) => (
          <span key={i} style={{ fontFamily:item==="·"?"'Cormorant Garamond',serif":"'Syne',sans-serif", fontSize:".9rem", fontStyle:item==="·"?"italic":"normal", color:item==="·"?"#252525":"#303030", padding:"0 1.5rem", fontWeight:600, letterSpacing:".04em" }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── About ─────────────────────────────────────────────────── */
function About() {
  const { c } = useTheme();
  const w = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w < 960;
  const facts = [
    ["Based In","Cairo, Egypt"],["Education","B.Sc. Computer Science '26"],
    ["GPA","3.2 / 4.0"],["Internship","6-Month DEPI · MCIT"],
    ["Certifications","6 Professional Certs"],["Languages","Arabic · English"],
  ];
  return (
    <section id="about" style={{ background:c.bg2, padding:`${isMobile?"5rem":"8rem"} 5vw`, borderTop:`1px solid ${c.border2}`, transition:"background .3s" }}>
      <div style={{ maxWidth:1300, margin:"0 auto" }}>
        <SectionLabel label="About Me" />
        <div style={{ display:"grid", gridTemplateColumns:isMobile||isTablet?"1fr":"1fr 1.8fr", gap:isMobile?"3rem":"8rem", alignItems:"start", marginTop:"1rem" }}>
          <div>
            <Reveal delay={0.1}><div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:isMobile?"5rem":"7rem", fontWeight:300, color:c.border1, lineHeight:1, letterSpacing:"-5px", marginBottom:"2rem" }}>01</div></Reveal>
            <div style={{ display:"flex", flexDirection:"column" }}>
              {facts.map(([label,val],i) => (
                <Reveal key={i} delay={0.1+i*.06}>
                  <div style={{ display:"flex", flexDirection:"column", padding:".9rem 0", borderBottom:`1px solid ${c.border1}` }}>
                    <span style={{ fontFamily:"'Syne',sans-serif", fontSize:".65rem", fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", color:c.text3, marginBottom:".3rem" }}>{label}</span>
                    <span style={{ fontFamily:"'Syne',sans-serif", fontSize:".9rem", fontWeight:500, color:c.text2 }}>{val}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <Reveal delay={0.15}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.6rem,2.5vw,2.4rem)", fontWeight:300, lineHeight:1.5, letterSpacing:"-.5px", color:c.text1, marginBottom:"2.5rem" }}>
                I build <em style={{ fontStyle:"italic", color:c.accent }}>reliable, scalable</em> web applications — from database schema to polished frontend.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:".95rem", color:c.text3, lineHeight:1.9, fontWeight:400, marginBottom:"2.5rem" }}>
                <p style={{ marginBottom:"1rem" }}>Final-year Computer Science student with real-world development experience — 6-month .NET internship and multiple full-stack projects delivered from scratch.</p>
                <p style={{ marginBottom:"1rem" }}>My approach centers on clean architecture, proper separation of concerns, and code that's easy to maintain and scale.</p>
                <p>Whether it's a RESTful API, a React frontend, or a full-stack system — I focus on software that works reliably in production.</p>
              </div>
            </Reveal>
            <Reveal delay={0.35}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem" }}>
                {["Clean Code","N-Tier Architecture","Repository Pattern","SOLID Principles","RESTful APIs","Database Design"].map((t,i) => (
                  <span key={i} style={{ fontFamily:"'Syne',sans-serif", fontSize:".72rem", fontWeight:600, letterSpacing:".06em", padding:".4rem 1rem", border:`1px solid ${c.border1}`, color:c.text3, borderRadius:"100px", transition:"all .2s" }}
                    onMouseEnter={e=>{e.target.style.borderColor=c.accent;e.target.style.color=c.accent;}}
                    onMouseLeave={e=>{e.target.style.borderColor=c.border1;e.target.style.color=c.text3;}}>{t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Projects ──────────────────────────────────────────────── */
function Projects() {
  const { c } = useTheme();
  const w = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w < 960;
  const [active, setActive] = useState(0);
  const proj = PROJECTS[active];
  const lnk = (strong) => ({ fontFamily:"'Syne',sans-serif", fontSize:".75rem", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:c.text1, textDecoration:"none", borderBottom:`1px solid ${strong?c.text1:c.border1}`, paddingBottom:2, transition:"all .2s" });

  return (
    <section id="projects" style={{ background:c.bg1, padding:`${isMobile?"5rem":"8rem"} 5vw`, borderTop:`1px solid ${c.border2}`, transition:"background .3s" }}>
      <div style={{ maxWidth:1300, margin:"0 auto" }}>
        <SectionLabel label="Projects" />
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.5rem,5vw,5rem)", fontWeight:300, letterSpacing:"-2px", color:c.text1, marginBottom:"4rem", lineHeight:1.1 }}>
            Work that <em style={{ color:c.accent }}>speaks</em><br />for itself.
          </h2>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:isMobile||isTablet?"1fr":"1fr 1.4fr", gap:"3rem", alignItems:"start" }}>
          <div>
            {PROJECTS.map((p,i) => (
              <Reveal key={i} delay={i*.08}>
                <div data-cursor="VIEW" onClick={()=>setActive(i)}
                  style={{ display:"flex", alignItems:"center", gap:"1.5rem", padding:"1.5rem 0", borderBottom:`1px solid ${c.border2}`, cursor:"none", transition:"all .3s", borderLeft:i===active?`3px solid ${c.accent}`:"3px solid transparent", paddingLeft:i===active?"1.2rem":0 }}>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", fontWeight:300, color:i===active?c.accent:c.text4 }}>{p.id}</span>
                  <div>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1rem", fontWeight:700, color:i===active?c.text1:c.text3, transition:"color .3s", whiteSpace:"nowrap" }}>{p.name.replace("\n"," ")}</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:".3rem", marginTop:".4rem" }}>
                      {p.tech.slice(0,2).map((t,j) => <span key={j} style={{ fontFamily:"'Syne',sans-serif", fontSize:".65rem", color:c.text4, fontWeight:600 }}>{t}{j<1?" ·":""}</span>)}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ position:isMobile||isTablet?"static":"sticky", top:"8rem" }}>
            <Reveal>
              <div key={active} style={{ background:c.bg3, border:`1px solid ${c.border1}`, padding:isMobile?"2rem":"3rem", borderTop:`3px solid ${proj.color}`, animation:"fadeIn .4s ease", transition:"background .3s" }}>
                {proj.badge && <div style={{ display:"inline-block", fontFamily:"'Syne',sans-serif", fontSize:".65rem", fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", color:c.accent, border:`1px solid ${c.accent}`, padding:".25rem .7rem", borderRadius:"2px", marginBottom:"1.5rem" }}>★ {proj.badge}</div>}
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2.2rem", fontWeight:600, letterSpacing:"-1px", color:c.text1, marginBottom:"1rem", lineHeight:1.15, whiteSpace:"pre-line" }}>{proj.name}</h3>
                <p style={{ fontFamily:"'Syne',sans-serif", fontSize:".88rem", color:c.text3, lineHeight:1.8, marginBottom:"2rem" }}>{proj.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:".5rem", marginBottom:"2rem" }}>
                  {proj.tech.map((t,i) => <span key={i} style={{ fontFamily:"'Syne',sans-serif", fontSize:".7rem", fontWeight:600, padding:".3rem .8rem", background:c.border1, color:c.text2, borderRadius:"2px" }}>{t}</span>)}
                </div>
                <div style={{ display:"flex", gap:"1.5rem", flexWrap:"wrap" }}>
                  {proj.live   && <a href={proj.live}   target="_blank" rel="noopener noreferrer" style={lnk(true)}  onMouseEnter={e=>{e.target.style.color=c.accent;e.target.style.borderColor=c.accent;}} onMouseLeave={e=>{e.target.style.color=c.text1;e.target.style.borderColor=c.text1;}}>Live Demo ↗</a>}
                  {proj.front  && <a href={proj.front}  target="_blank" rel="noopener noreferrer" style={lnk(false)} onMouseEnter={e=>{e.target.style.color=c.accent;e.target.style.borderColor=c.accent;}} onMouseLeave={e=>{e.target.style.color=c.text1;e.target.style.borderColor=c.border1;}}>Frontend ↗</a>}
                  {proj.back   && <a href={proj.back}   target="_blank" rel="noopener noreferrer" style={lnk(false)} onMouseEnter={e=>{e.target.style.color=c.accent;e.target.style.borderColor=c.accent;}} onMouseLeave={e=>{e.target.style.color=c.text1;e.target.style.borderColor=c.border1;}}>Backend ↗</a>}
                  {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" style={lnk(false)} onMouseEnter={e=>{e.target.style.color=c.accent;e.target.style.borderColor=c.accent;}} onMouseLeave={e=>{e.target.style.color=c.text1;e.target.style.borderColor=c.border1;}}>GitHub ↗</a>}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Experience ────────────────────────────────────────────── */
function Experience() {
  const { c } = useTheme();
  const w = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w < 960;
  const exp = [
    { date:"Nov 2024 — May 2025", role:".NET Developer Intern", org:"Digital Egypt Pioneers Initiative (DEPI) · MCIT", bullets:[
      "Completed a 6-month certified Full Stack .NET Web Developer program.",
      "Built and integrated 5+ web applications using C#, ASP.NET Core MVC, and Web API.",
      "Worked with SQL Server, Docker, Git/GitHub, and applied OOP and clean code principles.",
      "Reduced repetitive development tasks by ~20% through Prompt Engineering techniques.",
    ]},
    { date:"August 2025", role:"IT Trainee — Oracle APEX & Database", org:"Orascom Construction PLC · 2-Week Program", bullets:[
      "Completed intensive Oracle APEX and relational database fundamentals training.",
      "Designed and executed a relational mini-project using Oracle SQL Developer.",
      "Collaborated with cross-functional IT teams on application and operations workflows.",
    ]},
  ];
  return (
    <section id="experience" style={{ background:c.bg2, padding:`${isMobile?"5rem":"8rem"} 5vw`, borderTop:`1px solid ${c.border2}`, transition:"background .3s" }}>
      <div style={{ maxWidth:1300, margin:"0 auto" }}>
        <SectionLabel label="Experience" />
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.5rem,5vw,5rem)", fontWeight:300, letterSpacing:"-2px", color:c.text1, marginBottom:"4rem", lineHeight:1.1 }}>
            Where I've <em style={{ color:c.accent }}>learned</em><br />and built.
          </h2>
        </Reveal>
        {exp.map((e,i) => (
          <Reveal key={i} delay={i*.1}>
            {/* ✅ Single style prop — no duplicate */}
            <div
              onMouseEnter={ev=>{ if(!isMobile) ev.currentTarget.style.paddingLeft="1rem"; }}
              onMouseLeave={ev=>{ if(!isMobile) ev.currentTarget.style.paddingLeft="0"; }}
              style={{ display:"grid", gridTemplateColumns:isMobile||isTablet?"1fr":"200px 1fr", gap:isMobile?"0.8rem":"5rem", padding:`${isMobile?"2rem":"3.5rem"} 0`, borderBottom:`1px solid ${c.border2}`, ...(i===0?{borderTop:`1px solid ${c.border2}`}:{}), transition:"padding .3s ease" }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:".75rem", fontWeight:600, letterSpacing:".08em", color:c.text3, paddingTop:".2rem", marginBottom:isMobile?".4rem":0 }}>{e.date}</div>
              <div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:isMobile?"1.5rem":"1.8rem", fontWeight:600, letterSpacing:"-.5px", color:c.text1, marginBottom:".3rem" }}>{e.role}</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:".8rem", color:c.accent, fontWeight:600, letterSpacing:".05em", marginBottom:"1.2rem" }}>{e.org}</div>
                <ul style={{ display:"flex", flexDirection:"column", gap:".55rem" }}>
                  {e.bullets.map((b,j) => (
                    <li key={j} style={{ fontFamily:"'Syne',sans-serif", fontSize:".87rem", color:c.text3, lineHeight:1.65, paddingLeft:"1.2rem", position:"relative" }}>
                      <span style={{ position:"absolute", left:0, color:c.border1, fontSize:".8rem" }}>↳</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Skills ────────────────────────────────────────────────── */
function Skills() {
  const { c } = useTheme();
  const w = useWindowWidth();
  const isMobile = w < 640;
  const hot = ["C#","ASP.NET Core MVC","Web API","EF Core","React","JavaScript","SQL Server","N-Tier Architecture","Repository Pattern"];
  return (
    <section id="skills" style={{ background:c.bg1, padding:`${isMobile?"5rem":"8rem"} 5vw`, borderTop:`1px solid ${c.border2}`, transition:"background .3s" }}>
      <div style={{ maxWidth:1300, margin:"0 auto" }}>
        <SectionLabel label="Skills" />
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.5rem,5vw,5rem)", fontWeight:300, letterSpacing:"-2px", color:c.text1, marginBottom:"4rem", lineHeight:1.1 }}>
            Tools I <em style={{ color:c.accent }}>master</em><br />to get things done.
          </h2>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(2,1fr)", gap:"3rem" }}>
          {Object.entries(SKILLS).map(([group,tags],gi) => (
            <Reveal key={gi} delay={gi*.1}>
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:".68rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:c.text1, marginBottom:"1.2rem", paddingBottom:".6rem", borderBottom:`1px solid ${c.text1}` }}>{group}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:".5rem" }}>
                  {tags.map((t,i) => {
                    const isHot = hot.includes(t);
                    return (
                      <span key={i} style={{ fontFamily:"'Syne',sans-serif", fontSize:".76rem", fontWeight:500, padding:".4rem .9rem", border:`1px solid ${isHot?c.accent:c.border1}`, color:isHot?c.text1:c.text3, borderRadius:"2px", background:isHot?c.accentBg:"transparent", transition:"all .2s" }}
                        onMouseEnter={e=>{e.target.style.borderColor=c.accent;e.target.style.color=c.text1;e.target.style.background=c.accentBg;}}
                        onMouseLeave={e=>{ if(!isHot){e.target.style.borderColor=c.border1;e.target.style.color=c.text3;e.target.style.background="transparent";} }}>{t}</span>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Certs ─────────────────────────────────────────────────── */
function Certs() {
  const { c } = useTheme();
  const w = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w < 960;
  return (
    <section style={{ background:c.bg2, padding:`${isMobile?"5rem":"8rem"} 5vw`, borderTop:`1px solid ${c.border2}`, transition:"background .3s" }}>
      <div style={{ maxWidth:1300, margin:"0 auto" }}>
        <SectionLabel label="Certifications" />
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.5rem,5vw,5rem)", fontWeight:300, letterSpacing:"-2px", color:c.text1, marginBottom:"4rem", lineHeight:1.1 }}>
            Credentials that <em style={{ color:c.accent }}>validate</em><br />the work.
          </h2>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":isTablet?"repeat(2,1fr)":"repeat(3,1fr)", gap:"1px", background:c.border2 }}>
          {CERTS.map((cert,i) => (
            <Reveal key={i} delay={i*.07}>
              <div style={{ background:c.bg2, padding:"2.2rem", transition:"background .2s" }}
                onMouseEnter={e=>e.currentTarget.style.background=c.bg3}
                onMouseLeave={e=>e.currentTarget.style.background=c.bg2}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:".65rem", fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", color:c.accent, marginBottom:".8rem" }}>{cert.issuer}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.15rem", fontWeight:400, color:c.text1, lineHeight:1.3, marginBottom:".6rem" }}>{cert.name}</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:".72rem", color:c.text3, fontWeight:500 }}>{cert.date}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ───────────────────────────────────────────────── */
function Contact() {
  const { c } = useTheme();
  const w = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w < 960;
  return (
    <section id="contact" style={{ background:c.bg1, padding:`${isMobile?"5rem":"8rem"} 5vw`, borderTop:`1px solid ${c.border2}`, transition:"background .3s" }}>
      <div style={{ maxWidth:1300, margin:"0 auto" }}>
        <SectionLabel label="Contact" />
        <div style={{ display:"grid", gridTemplateColumns:isMobile||isTablet?"1fr":"1fr 1fr", gap:isMobile?"3rem":"8rem", alignItems:"start", marginTop:"2rem" }}>
          <div>
            <Reveal delay={0.1}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,3.5vw,3.8rem)", fontWeight:300, letterSpacing:"-1.5px", color:c.text1, lineHeight:1.2, marginBottom:"3rem" }}>
                Have a project<br />in mind? Let's<br /><em style={{ color:c.accent }}>build something</em><br />great together.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a href="mailto:ibrahimsukeroo@gmail.com"
                style={{ display:"block", fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1rem,1.8vw,1.6rem)", fontWeight:600, color:c.text1, textDecoration:"none", letterSpacing:"-.5px", borderBottom:`1px solid ${c.border1}`, paddingBottom:".8rem", marginBottom:"2rem", transition:"all .2s", wordBreak:"break-all" }}
                onMouseEnter={e=>{e.target.style.color=c.accent;e.target.style.borderColor=c.accent;}}
                onMouseLeave={e=>{e.target.style.color=c.text1;e.target.style.borderColor=c.border1;}}>
                ibrahimsukeroo@gmail.com
              </a>
            </Reveal>
            <Reveal delay={0.3}>
              <div style={{ display:"flex", flexDirection:"column", gap:".7rem" }}>
                {[["Phone","+20 103 042 5144"],["Location","Cairo, Egypt"],["Status","Open to opportunities"]].map(([label,val]) => (
                  <div key={label} style={{ display:"flex", alignItems:"center", gap:"1rem", fontFamily:"'Syne',sans-serif", fontSize:".85rem", color:c.text3 }}>
                    <span style={{ fontWeight:700, color:c.text1, minWidth:80 }}>{label}</span>{val}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.2}>
              <div style={{ display:"flex", flexDirection:"column" }}>
                {[
                  { name:"GitHub",       sub:"github.com/Ibrahim-Suker",        href:"https://github.com/Ibrahim-Suker" },
                  { name:"LinkedIn",     sub:"linkedin.com/in/ibrahim-ahmed-oo", href:"https://linkedin.com/in/ibrahim-ahmed-oo" },
                  { name:"Live Project", sub:"Blood Donation System",            href:"https://blood-donation-frontend-lac.vercel.app/" },
                  { name:"Download CV",  sub:"PDF Resume",                       href:"/Ibrahim_Ahmed_CV_Internship.pdf" },
                ].map((link,i) => (
                  <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" data-cursor="OPEN"
                    style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.5rem 0", borderBottom:`1px solid ${c.border2}`, textDecoration:"none", color:c.text1, transition:"padding .25s ease" }}
                    onMouseEnter={e=>e.currentTarget.style.paddingLeft="1rem"}
                    onMouseLeave={e=>e.currentTarget.style.paddingLeft="0"}>
                    <div>
                      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1rem", fontWeight:600 }}>{link.name}</div>
                      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:".75rem", color:c.text3, marginTop:".2rem" }}>{link.sub}</div>
                    </div>
                    <span style={{ fontSize:"1.2rem", color:c.text3 }}>↗</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────── */
function Footer() {
  const { c } = useTheme();
  return (
    <footer style={{ background:c.bg2, padding:"1.8rem 5vw", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:".5rem", borderTop:`1px solid ${c.border1}`, transition:"background .3s" }}>
      <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", fontStyle:"italic", color:c.text3 }}>Ibrahim Ahmed</span>
      <span style={{ fontFamily:"'Syne',sans-serif", fontSize:".72rem", color:c.text3, letterSpacing:".05em" }}>© 2026 · Built with precision</span>
    </footer>
  );
}

/* ─── App ───────────────────────────────────────────────────── */
export default function App() {
  const scrollY = useScrollY();
  const [isDark, setIsDark] = useState(true);
  const c = isDark ? DARK : LIGHT;
  const toggle = () => setIsDark(p => !p);

  return (
    <ThemeCtx.Provider value={{ isDark, c, toggle }}>
      <FontLink />
      <GlobalStyles c={c} />
      <Noise />
      <Cursor />
      <Nav scrollY={scrollY} />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Certs />
      <Contact />
      <Footer />
    </ThemeCtx.Provider>
  );
}