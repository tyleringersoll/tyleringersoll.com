// HOME — Editorial Grid
function HomeEd() {
  const T = window.TYLER;
  const eng = T.engineering, mus = T.music;
  return (
    <div className="ed">
      <window.Masthead active="Home" />

      <section className="hero">
        <div className="meta">
          <div><span className="kickmute">Discipline</span><b>Frontend Engineering</b></div>
          <div><span className="kickmute">Also</span><b>Drummer / Session</b></div>
          <div><span className="kickmute">Based</span><b>Kennett Square, PA</b></div>
        </div>
        <div className="heroband">
          <div className="heroL">
            <span className="kick">Portfolio — Est. 2000</span>
            <h1 className="bigname">Tyler<span className="l2">Ingersoll</span></h1>
            <div className="roleline"><span className="dot"></span>Frontend Engineer<span>+</span>Drummer<span>·</span>Three decades on both</div>
            <div className="introbox">
              {T.hero.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          <div className="heroR">
            <div className="portrait">
              <img src="assets/profile_glitch_subtle.webp" alt="Tyler Ingersoll" />
              <div className="cap">Fig. 01 — At the kit</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="shead"><span className="idx">01</span><h2>Engineering</h2><span className="right kickmute">Vue · Angular · TypeScript</span></div>
        <div className="eng">
          <div className="body">
            <p>{eng.body}</p>
            <a className="link" href="Resume.html">{eng.cta} <window.EdIcon name="arrow" /></a>
          </div>
          <div>
            {eng.competencies.map((c, i) => (
              <div className="comprow" key={i}>
                <span className="n mono">{String(i + 1).padStart(2, "0")}</span>
                <window.EdIcon name={c.icon} /><span className="lbl">{c.label}</span>
              </div>
            ))}
            <a className="callout" href="https://ingersoll.dev" target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none" }}>
              <span className="l">{eng.projectsLabel}</span>
              <p>{eng.projects.text}</p>
              <span style={{ fontFamily: "'Spline Sans Mono',monospace", fontSize: 12, color: "var(--amber)" }}>↗ {eng.projects.ctaText}</span>
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="shead"><span className="idx">02</span><h2>Music</h2><span className="right kickmute">Session · Touring · Studio</span></div>
        <div className="music">
          <div className="pic"><span className="tag">Home Studio</span><img src="assets/studio_kit.webp" alt="Studio kit" /></div>
          <div className="txt">
            <p>{mus.body}</p>
            <a className="link" href="Music.html">{mus.cta} <window.EdIcon name="arrow" /></a>
            <div className="statrow">
              {mus.stats.map((s, i) => (<div className="st" key={i}><div className="v">{s.v}</div><div className="l">{s.l}</div></div>))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="shead"><span className="idx">03</span><h2>Beyond Work</h2></div>
        <div className="beyond">
          {T.beyond.cards.map((c, i) => (
            <div className="bcol" key={i}>
              <span className="num">0{i + 1} / 04</span>
              <window.EdIcon name={c.icon} />
              <h4>{c.label}</h4>
              <div className="sub">{c.sub}</div>
              <p className="det">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="connect">
        <div>
          <h3>Get in touch</h3>
          <div className="sub">{T.connect.subtext}</div>
        </div>
        <a className="cbtn" href="mailto:tyler@ingersoll.dev">Get in touch <window.EdIcon name="arrow" /></a>
      </section>

      <window.Footer />
    </div>
  );
}
window.HomeEd = HomeEd;
