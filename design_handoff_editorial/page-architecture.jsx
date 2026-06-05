// ARCHITECTURE — Editorial Grid
function ArchLines({ lines }) {
  return lines.map((l, i) => {
    const bullet = l.trim().startsWith("\u2022");
    const html = bullet ? l.replace(/^\s*\u2022\s*/, "") : l;
    return <p key={i} className={bullet ? "bul" : ""} dangerouslySetInnerHTML={{ __html: html }} />;
  });
}

function ArchitectureEd() {
  const A = window.TP.architecture;
  const intro = A[0];
  // sections after the intro overview line
  const sections = A.map((s, i) => {
    if (i === 0) return { ...s, heading: "Stack & Foundation", content: s.content.slice(1) };
    return s;
  });
  return (
    <div className="ed">
      <window.Masthead active="Architecture" />

      <section className="meta">
        {window.TP.pagemeta.architecture.map((m, i) => (
          <div key={i}><span className="kickmute">{m.l}</span><b>{m.v}</b></div>
        ))}
      </section>

      <section className="pagehead">
        <div className="ph-left">
          <span className="kick">How this site was built</span>
          <h1 className="ph-title">Archi<span className="o">tecture</span></h1>
          <div className="ph-intro"><p>{intro.content[0]}</p></div>
          <a className="link" href="https://github.com/tyleringersoll" target="_blank" rel="noopener noreferrer">View the source on GitHub <window.EdIcon name="arrow" /></a>
        </div>
        <div className="ph-right">
          <div className="ph-fact"><div className="v">100</div><div className="l">Lighthouse Performance</div></div>
          <div className="ph-fact"><div className="v">99%</div><div className="l">Unit Test Coverage</div></div>
        </div>
      </section>

      {sections.map((s, i) => (
        <section className="arch" key={s.id}>
          <div className="arch-l">
            <span className="aidx">{String(i + 1).padStart(2, "0")}</span>
            <h3>{s.heading}</h3>
          </div>
          <div className="arch-r">
            <ArchLines lines={s.content} />
            {s.scores && (
              <div className="scores">
                {s.scores.map((sc, j) => (
                  <div className="sc" key={j}><div className="v">{sc.value}</div><div className="l">{sc.label}</div></div>
                ))}
              </div>
            )}
            {s.optimizations && <ArchLines lines={s.optimizations} />}
          </div>
        </section>
      ))}

      <window.Footer />
    </div>
  );
}
window.ArchitectureEd = ArchitectureEd;
