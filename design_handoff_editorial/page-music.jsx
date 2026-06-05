// MUSIC — Editorial Grid
function MusicEd() {
  const M = window.TP.music;
  const ext = (url) => ({ href: url, target: "_blank", rel: "noopener noreferrer" });
  return (
    <div className="ed">
      <window.Masthead active="Music" />

      <section className="meta">
        {window.TP.pagemeta.music.map((m, i) => (
          <div key={i}><span className="kickmute">{m.l}</span><b>{m.v}</b></div>
        ))}
      </section>

      <section className="mhero">
        <div className="mh-text">
          <span className="kick">{M.hero.heading}</span>
          <h1 className="ph-title">Mu<span className="o">sic</span></h1>
          <div style={{ marginTop: 28 }}>
            {M.hero.content.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <a className="link" {...ext(M.hero.cta.url)}>{M.hero.cta.label} <window.EdIcon name="arrow" /></a>
          <div className="statrow" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {M.hero.facts.map((f, i) => (<div className="st" key={i}><div className="v">{f.v}</div><div className="l">{f.l}</div></div>))}
          </div>
        </div>
        <div className="mh-pic"><span className="tag">Home Studio</span><img src="assets/studio_kit.webp" alt="Tyler Ingersoll's hybrid drum studio" /></div>
      </section>

      <div className="shead"><span className="idx">01</span><h2>Selected Highlights</h2></div>
      <section className="simple">
        {M.highlights.content.map((p, i) => <p key={i} style={{ marginBottom: 18 }}>{p}</p>)}
        <a className="link" {...ext(M.highlights.cta.url)} style={{ marginTop: 6 }}>{M.highlights.cta.label} <window.EdIcon name="arrow" /></a>
      </section>

      <div className="shead"><span className="idx">02</span><h2>Timeline</h2><span className="right kickmute">1996 — Present</span></div>
      {M.timeline.map((t, i) => (
        <section className="entry" key={i}>
          <div className="ent-l">
            <span className="eidx">{t.years}</span>
            <div className="co">{t.heading}</div>
            <div className="yr">{t.role}</div>
          </div>
          <div className="ent-r">
            <div className="role"><window.RoleContent content={t.content} /></div>
          </div>
        </section>
      ))}

      <section className="connect">
        <div>
          <h3>{M.current.heading}</h3>
          <div className="sub" style={{ maxWidth: "48ch", lineHeight: 1.6 }}>{M.current.body}</div>
        </div>
        <a className="cbtn" {...ext(M.current.cta.url)}>{M.current.cta.label} <window.EdIcon name="arrow" /></a>
      </section>

      <window.Footer />
    </div>
  );
}
window.MusicEd = MusicEd;
