// RESUME — Editorial Grid
function ResumeEd() {
  const TP = window.TP;
  const intro = TP.resumeIntro;
  const skillCols = [
    { h: "Languages", items: TP.skills.languages },
    { h: "Frameworks", items: TP.skills.frameworks },
    { h: "Infrastructure", items: TP.skills.infrastructure },
    { h: "Concepts", items: TP.skills.concepts },
  ];
  return (
    <div className="ed">
      <window.Masthead active="Resume" />

      <section className="meta">
        {TP.pagemeta.resume.map((m, i) => (
          <div key={i}><span className="kickmute">{m.l}</span><b>{m.v}</b></div>
        ))}
      </section>

      <section className="pagehead">
        <div className="ph-left">
          <span className="kick">Curriculum Vitae</span>
          <h1 className="ph-title">Re<span className="o">sume</span></h1>
          <div className="ph-intro"><p>{intro.body}</p></div>
          <a className="link" href={intro.cta.url}>{intro.cta.label} <window.EdIcon name="arrow" /></a>
        </div>
        <div className="ph-right">
          {intro.facts.map((f, i) => (
            <div className="ph-fact" key={i}><div className="v">{f.v}</div><div className="l">{f.l}</div></div>
          ))}
        </div>
      </section>

      <div className="shead"><span className="idx">01</span><h2>Experience</h2><span className="right kickmute">2000 — Present</span></div>
      {TP.employers.map((emp, i) => (
        <section className="entry" key={i}>
          <div className="ent-l">
            <span className="eidx">{String(i + 1).padStart(2, "0")} / EMPLOYER</span>
            <div className="co">{emp.heading}</div>
            <div className="yr">{emp.years}</div>
          </div>
          <div className="ent-r">
            {emp.roles.map((r, j) => (
              <div className="role" key={j}>
                <p className="rsub">{r.subheading}</p>
                <window.RoleContent content={r.content} />
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="shead"><span className="idx">02</span><h2>Education &amp; More</h2></div>
      <section className="entry">
        <div className="ent-l"><span className="eidx">EDU / DEGREE</span><div className="co">Education</div></div>
        <div className="ent-r"><div className="role"><p className="lead" dangerouslySetInnerHTML={{ __html: TP.education.body }} /></div></div>
      </section>
      <section className="entry">
        <div className="ent-l"><span className="eidx">ALT / PARALLEL CAREER</span><div className="co">{TP.additional.heading}</div></div>
        <div className="ent-r"><div className="role"><p className="lead" dangerouslySetInnerHTML={{ __html: TP.additional.body }} /></div></div>
      </section>

      <div className="shead"><span className="idx">03</span><h2>Technical Skills</h2></div>
      <section className="skillgrid">
        {skillCols.map((c, i) => (
          <div className="sk" key={i}>
            <div className="skh">{c.h}</div>
            <ul>{c.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
          </div>
        ))}
      </section>

      <window.Footer />
    </div>
  );
}
window.ResumeEd = ResumeEd;
