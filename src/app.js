async function loadLanguages() {
  const res = await fetch("src/languages.json")
  return await res.json()
}

function Navbar({ lang, setLang, languages }) {
  const [hidden, setHidden] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const lastScrollY = React.useRef(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setHidden(currentScrollY > lastScrollY.current && currentScrollY > 80)
      lastScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
          <select className="nav-lang" value={lang} onChange={e => setLang(e.target.value)}>
            {Object.keys(languages).map(l => (
              <option key={l} value={l}>{l.toUpperCase()}</option>
            ))}
          </select>
          <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </nav>
      <div className={`burger-menu ${menuOpen ? "open" : ""}`}>
        <a href="index.html#intro" onClick={() => setMenuOpen(false)}>Intro</a>
        <a href="about.html" onClick={() => setMenuOpen(false)}>About</a>
        <a href="index.html#home" onClick={() => setMenuOpen(false)}>Projects</a>
        <a href="index.html#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        <select value={lang} onChange={e => setLang(e.target.value)}>
          {Object.keys(languages).map(l => (
            <option key={l} value={l}>{l.toUpperCase()}</option>
          ))}
        </select>
      </div>
    </>
  )
}

function Intro({ lang, languages }) {
  return (
    <section id="intro" className="intro-section">
      <div className="container intro-content">
        <h1>{languages[lang].intro.title}</h1>
        <p>{languages[lang].intro.subtitle}</p>
        <a href="#about"><button className="btn intro-btn">{languages[lang].intro.button}</button></a>
      </div>
    </section>
  )
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
    </div>
  )
}

function AboutMe({ lang, languages }) {
  React.useEffect(() => {
    const elems = document.querySelectorAll('.about-text, .about-photo')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
        else entry.target.classList.remove('visible')
      })
    }, { threshold: 0.2 })
    elems.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about">
      <div className="container about-inner">
        <SectionHeader title={languages[lang].about.title} subtitle={languages[lang].about.subtitle} />
        <div className="about-content">
          <div className="about-text fade-up">
            <p>{languages[lang].about.text}</p>
            <a href="about.html"><button className="btn">{languages[lang].about.button}</button></a>
          </div>
          <div className="about-photos fade-up">
            <div className="about-photo"><img src="img/Zaka2.png" alt="Zakaria 2" /></div>
            <div className="about-photo"><img src="img/ZakaSkateboard.png" alt="Zakaria" /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroCarousel({ slides }) {
  const [current, setCurrent] = React.useState(0)
  React.useEffect(() => {
    const interval = setInterval(() => setCurrent(prev => (prev + 1) % slides.length), 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section id="home">
      {slides.map((slide, i) => (
        <div key={i} className={`carousel-slide ${i === current ? "active" : ""}`}>
          <img src={slide.img} alt={slide.title} />
          <div className="carousel-overlay">
            <div className="carousel-content">
              <h1>{slide.title}</h1>
              <p>{slide.desc}</p>
              <button className="btn">COMING SOON</button>
            </div>
          </div>
        </div>
      ))}
      <button className="arrow-btn" style={{ left: "1rem" }} onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="arrow-btn" style={{ right: "1rem" }} onClick={() => setCurrent((current + 1) % slides.length)}>
        <i className="fas fa-chevron-right"></i>
      </button>
      <div style={{ position: "absolute", bottom: "1rem", width: "100%", display: "flex", justifyContent: "center" }}>
        {slides.map((_, i) => (
          <span key={i} className={`carousel-dot ${i === current ? "active" : ""}`} onClick={() => setCurrent(i)}></span>
        ))}
      </div>
    </section>
  )
}

function Projects({ lang, languages }) {
  const projects = languages[lang].projects.items

  React.useEffect(() => {
    const animated = document.querySelectorAll('.card, .section-divider')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
        else entry.target.classList.remove('visible')
      })
    }, { threshold: 0.2 })
    animated.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects">
      <div className="container">
        <SectionHeader title={languages[lang].projects.title} subtitle={languages[lang].projects.subtitle} />
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={i} className="card">
              <a href={p.link}><img src={p.img} alt={p.title} className="card-img" /></a>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <button className="btn">{languages[lang].projects.button}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({ lang, languages }) {
  return (
    <section id="contact">
      <div className="container contact-inner">
        <SectionHeader title={languages[lang].contact.title} subtitle={languages[lang].contact.subtitle} />
        <p>{languages[lang].contact.text}</p>
        <div className="socials">
          <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-github"></i></a>
          <a href="#" className="social-icon"><i className="fas fa-envelope"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [lang, setLang] = React.useState("en")
  const [languages, setLanguages] = React.useState(null)

  React.useEffect(() => { loadLanguages().then(setLanguages) }, [])

  if (!languages) return <p>Loading...</p>

  return (
    <>
      <Navbar lang={lang} setLang={setLang} languages={languages} />
      <Intro lang={lang} languages={languages} />
      <div className="section-divider"></div>
      <AboutMe lang={lang} languages={languages} />
      <div className="section-divider"></div>
      <HeroCarousel slides={languages[lang].heroSlides} />
      <div className="section-divider"></div>
      <Projects lang={lang} languages={languages} />
      <div className="section-divider"></div>
      <Contact lang={lang} languages={languages} />
    </>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
