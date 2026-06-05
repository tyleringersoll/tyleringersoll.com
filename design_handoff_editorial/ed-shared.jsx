// Shared Editorial-Grid building blocks for all pages. Exports to window.
const EDNAV = [
  { name: "Home", url: "Home.html" },
  { name: "Resume", url: "Resume.html" },
  { name: "Music", url: "Music.html" },
  { name: "Architecture", url: "Architecture.html" },
];
const EDSOCIAL = [
  { k: "github", url: "https://github.com/tyleringersoll" },
  { k: "linkedin", url: "https://www.linkedin.com/in/tyleringersoll" },
  { k: "email", url: "mailto:tyler@ingersoll.dev" },
  { k: "strava", url: "https://www.strava.com/athletes/3303002" },
];

function EdIcon({ name, cls }) {
  return <span className={cls} dangerouslySetInnerHTML={{ __html: window.TYLER.icons[name] }} />;
}

function Masthead({ active }) {
  return (
    <header className="masthead">
      <a className="name" href="Home.html">Tyler Ingersoll</a>
      <nav>
        {EDNAV.map((n) => (
          <a key={n.name} href={n.url} className={active === n.name ? "on" : ""}>{n.name}</a>
        ))}
      </nav>
    </header>
  );
}

function Footer() {
  const legal = window.TP.footer.legal;
  return (
    <footer className="foot">
      <div className="c">
        {legal.map((l, i) => <div key={i} dangerouslySetInnerHTML={{ __html: l }} />)}
      </div>
      <div className="soc">
        {EDSOCIAL.map((s) => (
          <a key={s.k} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.k}>
            <EdIcon name={s.k} />
          </a>
        ))}
      </div>
    </footer>
  );
}

// Tech chips from a "<strong>Tech:</strong> A, B, C" line
function TechChips({ line }) {
  const raw = line.replace(/<strong>Tech:<\/strong>\s*/i, "");
  const items = raw.split(",").map((s) => s.trim()).filter(Boolean);
  return (
    <div className="chips">
      {items.map((t, i) => <span className="chip" key={i}>{t}</span>)}
    </div>
  );
}

// Renders a role/timeline content array: lead paragraphs, bullets, then tech chips.
function RoleContent({ content }) {
  const leads = [], bullets = []; let tech = null;
  content.forEach((line) => {
    if (/^<strong>Tech:/i.test(line)) tech = line;
    else if (line.trim().startsWith("\u2022")) bullets.push(line.replace(/^\s*\u2022\s*/, ""));
    else leads.push(line);
  });
  return (
    <>
      {leads.map((p, i) => <p className="lead" key={"l" + i} dangerouslySetInnerHTML={{ __html: p }} />)}
      {bullets.length > 0 && (
        <ul>{bullets.map((b, i) => <li key={"b" + i} dangerouslySetInnerHTML={{ __html: b }} />)}</ul>
      )}
      {tech && <TechChips line={tech} />}
    </>
  );
}

Object.assign(window, { EdIcon, Masthead, Footer, TechChips, RoleContent, EDNAV, EDSOCIAL });
