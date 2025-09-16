async function loadLanguages() {
  const res = await fetch("src/languages.json");
  return await res.json();
}

function Navbar({ lang, setLang, languages }) {
  const [hidden, setHidden] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastScrollY.current && y > 80);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={hidden ? "hidden" : ""}>
        <h1>Zakaria El Ghoul Aadi</h1>
        <div className="nav-right">
          <div className="nav-links">
            <a href="index.html#intro">Intro</a>
            <a href="about.html">About</a>
            <a href="index.html#home">Projects</a>
            <a href="index.html#contact">Contact</a>
          </div>
          <select
            className="nav-lang"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            {Object.keys(languages).map((l) => (
              <option key={l} value={l}>
                {l.toUpperCase()}
              </option>
            ))}
          </select>
          <div className="burger" onClick={() => setMenuOpen((v) => !v)}>
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </nav>

      <div className={`burger-menu ${menuOpen ? "open" : ""}`}>
        <a href="index.html#intro" onClick={() => setMenuOpen(false)}>Intro</a>
        <a href="about.html" onClick={() => setMenuOpen(false)}>About</a>
        <a href="index.html#home" onClick={() => setMenuOpen(false)}>Projects</a>
        <a href="index.html#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{ marginTop: "auto" }}
        >
          {Object.keys(languages).map((l) => (
            <option key={l} value={l}>
              {l.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
    </div>
  );
}

function AboutFull({ lang, languages }) {
  React.useEffect(() => {
    const els = document.querySelectorAll(".about-text, .about-photo, .section-divider");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
          else e.target.classList.remove("visible");
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about">
      <div className="container about-inner">
        <SectionHeader
          title={languages[lang].about_full.title}
          subtitle={languages[lang].about_full.subtitle}
        />
        <div className="about-text">
          {languages[lang].about_full.text.split("\n").map((para, i) =>
            para.trim() ? <p key={i}>{para}</p> : <br key={i} />
          )}
        </div>
        <div className="about-photos-grid">
          <div className="about-photo"><img src="img/Zaka1.jpg" alt="Zakaria 1" /></div>
          <div className="about-photo"><img src="img/Zaka2.png" alt="Zakaria 2" /></div>
          <div className="about-photo"><img src="img/ZakaSkateboard.png" alt="Zakaria Skateboarding" /></div>
          <div className="about-photo"><img src="img/Zaka4.png" alt="Zakaria 4" /></div>
        </div>
      </div>
    </section>
  );
}

function Hobbies({ lang, languages }) {
  return (
    <section>
      <div className="container">
        <SectionHeader
          title={languages[lang].hobbies.title}
          subtitle={languages[lang].hobbies.subtitle}
        />
        <div className="hobbies-grid">
          {languages[lang].hobbies.items.map((h, i) => (
            <div key={i} className="hobby-card">
              <i className={h.icon}></i>
              <h3>{h.title}</h3>
              <p>{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [lang, setLang] = React.useState("nl");
  const [languages, setLanguages] = React.useState(null);

  React.useEffect(() => {
    loadLanguages().then(setLanguages);
  }, []);

  React.useEffect(() => {
    const dividers = document.querySelectorAll(".section-divider");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
          else e.target.classList.remove("visible");
        });
      },
      { threshold: 0.1 }
    );
    dividers.forEach((d) => obs.observe(d));
    return () => obs.disconnect();
  }, []);

  if (!languages) return <p>Loading...</p>;

  return (
    <>
      <Navbar lang={lang} setLang={setLang} languages={languages} />
      <div className="section-divider"></div>
      <AboutFull lang={lang} languages={languages} />
      <div className="section-divider"></div>
      <Hobbies lang={lang} languages={languages} />
      <div className="section-divider"></div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("about-root")).render(<App />);
