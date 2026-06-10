import { useState, useEffect } from 'react'
import { ArrowRight, Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react'
import Grupo from './Grupo'
import Imoveis from './Imoveis'
import heroArchitecture from './assets/hero_architecture.png'
import portfolioResidence from './assets/portfolio_residence.png'
import portfolioCorporate from './assets/portfolio_corporate.png'
import portfolioInterior from './assets/portfolio_interior.png'

/* ═══════════════════════════════════════════════
   Componente: CountUp — Contagem animada dourada
   ═══════════════════════════════════════════════ */
function CountUp({ end, duration = 2000, suffix = "", id }: { end: number; duration?: number; suffix?: string; id: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setStarted(true)
      },
      { threshold: 0.1 }
    )
    const el = document.getElementById(id)
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [id])

  useEffect(() => {
    if (!started) return
    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) window.requestAnimationFrame(step)
    }
    window.requestAnimationFrame(step)
  }, [started, end, duration])

  return (
    <span id={id} className="font-display font-extralight text-7xl md:text-[110px] lg:text-[130px] tracking-tighter text-[#C9A96E] block leading-none">
      +{count}{suffix}
    </span>
  )
}

/* ═══════════════════════════════════════════════
   App Principal
   ═══════════════════════════════════════════════ */
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredArea, setHoveredArea] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [currentPage, setCurrentPage] = useState<'grupo' | 'construcoes' | 'imoveis'>('grupo')

  // Sync routing state with URL on popstate (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      if (path === '/construcoes' || path === '/construcoes/') {
        setCurrentPage('construcoes')
      } else if (path === '/imoveis' || path === '/imoveis/') {
        setCurrentPage('imoveis')
      } else {
        setCurrentPage('grupo')
      }
    }
    window.addEventListener('popstate', handlePopState)
    handlePopState() // initial path check
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigateTo = (page: 'grupo' | 'construcoes' | 'imoveis', anchor?: string) => {
    let path = '/'
    if (page === 'construcoes') path = '/construcoes'
    else if (page === 'imoveis') path = '/imoveis'

    window.history.pushState({}, '', path)
    setCurrentPage(page)
    setMobileMenuOpen(false)

    if (page === 'construcoes') {
      if (anchor) {
        let targetAnchor = anchor
        let shouldScroll = true

        if (anchor === '#atuacao-construcao') {
          setHoveredArea(3)
          shouldScroll = false
        } else if (anchor === '#atuacao-interiores') {
          setHoveredArea(2)
          shouldScroll = false
        }

        if (shouldScroll) {
          setTimeout(() => {
            const el = document.querySelector(targetAnchor)
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' })
            }
          }, 100)
        } else {
          window.scrollTo({ top: 0 })
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      window.scrollTo({ top: 0 })
    }
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault()
    if (currentPage !== 'construcoes') {
      navigateTo('construcoes', anchor)
    } else {
      const el = document.querySelector(anchor)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Imagens das Áreas de Atuação
  const areaImages = [
    portfolioCorporate,
    heroArchitecture,
    portfolioInterior,
    portfolioResidence
  ]

  const areas = [
    { num: "01", title: "Análise e Viabilização", desc: "Estudos técnicos e financeiros para tomada de decisão segura, minimizando riscos e garantindo previsibilidade total." },
    { num: "02", title: "Projetos", desc: "Soluções arquitetônicas e executivas com foco em eficiência técnica, engenharia integrada e resultado." },
    { num: "03", title: "Interiores", desc: "Projetos funcionais que unem estética de luxo, materiais premium e identidade de marca." },
    { num: "04", title: "Construções", desc: "Execução com controle de engenharia, prazos rígidos, planejamento de caixa e acabamento especializado." }
  ]

  const methodSteps = [
    { title: "Diagnóstico", description: "Avaliação detalhada das necessidades, viabilidade técnica e condicionantes iniciais. Mapeamento completo do terreno ou imóvel para mitigar riscos antes do primeiro esboço." },
    { title: "Planejamento", description: "Cronogramas físico-financeiros rigorosos, estimativas orçamentárias detalhadas e alocação estratégica de recursos para total previsibilidade." },
    { title: "Projeto", description: "Concepção de soluções arquitetônicas, estruturais e complementares integradas. Projetos que unem estética de alto padrão à otimização real em canteiro." },
    { title: "Execução", description: "Obra sob controle técnico rigoroso, equipe de engenharia dedicada em tempo integral e processos de qualidade padronizados." },
    { title: "Entrega", description: "Verificações finais, testes de infraestrutura e entrega formal com garantias técnicas completas e documentação impecável." }
  ]

  const pillars = [
    { num: "01", title: "Precisão Técnica", desc: "Análise rigorosa de viabilidade, mapeamento de riscos e condicionantes técnicas antes do primeiro traço." },
    { num: "02", title: "Controle Total", desc: "Cronogramas detalhados, orçamentos precisos e gestão integrada do planejamento à entrega final." },
    { num: "03", title: "Design Premium", desc: "Arquitetura contemporânea e interiores de alto padrão com foco em funcionalidade e sofisticação." }
  ]

  // Intersection Observer para Scroll Reveal + Header scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('reveal-visible')
        })
      },
      { root: null, threshold: 0.08 }
    )

    const revealElements = document.querySelectorAll('.reveal-item')
    revealElements.forEach((el) => observer.observe(el))

    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
      window.removeEventListener('scroll', handleScroll)
    }
  }, [currentPage])

  const isLightHeader = scrolled && currentPage === 'imoveis'

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] font-sans antialiased flex flex-col">

      {/* ═══ HEADER ═══ */}
      {currentPage !== 'grupo' && (
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
            scrolled
              ? isLightHeader
                ? 'bg-[#F5F3EF]/90 backdrop-blur-2xl border-b border-black/[0.06] py-4'
                : 'bg-[#0A0A0A]/85 backdrop-blur-2xl border-b border-white/[0.06] py-4'
              : 'bg-transparent py-6'
          }`}
        >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigateTo('grupo'); }}
            className="flex flex-col"
          >
            <span className={`font-display font-bold text-base md:text-lg tracking-[0.2em] transition-colors duration-500 ${
              isLightHeader ? 'text-[#1A1A1A]' : 'text-white'
            }`}>
              GRUPO THREE
            </span>
            <span className={`text-[9px] uppercase tracking-[0.25em] -mt-0.5 transition-colors duration-500 ${
              isLightHeader ? 'text-black/40' : 'text-white/40'
            }`}>
              Engenharia & Inteligência
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className={`hidden md:flex items-center gap-10 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-500 ${
            isLightHeader ? 'text-black/55' : 'text-white/50'
          }`}>
            <a
              href="#diferencial"
              onClick={(e) => handleNavClick(e, '#diferencial')}
              className="hover:text-[#C9A96E] transition-colors duration-300"
            >
              Diferencial
            </a>
            <a
              href="#atuacao"
              onClick={(e) => handleNavClick(e, '#atuacao')}
              className="hover:text-[#C9A96E] transition-colors duration-300"
            >
              Atuação
            </a>
            <a
              href="#metodo"
              onClick={(e) => handleNavClick(e, '#metodo')}
              className="hover:text-[#C9A96E] transition-colors duration-300"
            >
              Método
            </a>
            <a
              href="#portfolio"
              onClick={(e) => handleNavClick(e, '#portfolio')}
              className="hover:text-[#C9A96E] transition-colors duration-300"
            >
              Portfólio
            </a>
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigateTo('grupo'); }}
              className="hover:text-[#C9A96E] transition-colors duration-300"
            >
              O Grupo
            </a>
            <a
              href="#contato"
              onClick={(e) => handleNavClick(e, '#contato')}
              className="hover:text-[#C9A96E] transition-colors duration-300"
            >
              Contato
            </a>
          </nav>

          <div className="hidden md:block">
            <a
              href="#contato"
              onClick={(e) => handleNavClick(e, '#contato')}
              className={`px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] border transition-all duration-500 ${
                isLightHeader
                  ? 'border-[#C9A96E]/60 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-white font-medium'
                  : 'border-[#C9A96E]/40 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A]'
              }`}
            >
              Solicitar análise
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-500 focus:outline-none ${
              isLightHeader ? 'text-black/70' : 'text-white/70'
            }`}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>
      )}

      {/* ═══ MOBILE DRAWER ═══ */}
      {currentPage !== 'grupo' && (
        <div
          className={`fixed inset-0 z-40 bg-[#0A0A0A] transform transition-transform duration-500 ease-out md:hidden flex flex-col justify-center px-12 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
        <nav className="flex flex-col gap-8 text-2xl font-light text-white uppercase tracking-wide">
          <a
            href="#diferencial"
            onClick={(e) => { e.preventDefault(); navigateTo('construcoes', '#diferencial'); }}
            className="hover:text-[#C9A96E] transition-colors"
          >
            Diferencial
          </a>
          <a
            href="#atuacao"
            onClick={(e) => { e.preventDefault(); navigateTo('construcoes', '#atuacao'); }}
            className="hover:text-[#C9A96E] transition-colors"
          >
            Atuação
          </a>
          <a
            href="#metodo"
            onClick={(e) => { e.preventDefault(); navigateTo('construcoes', '#metodo'); }}
            className="hover:text-[#C9A96E] transition-colors"
          >
            Método
          </a>
          <a
            href="#portfolio"
            onClick={(e) => { e.preventDefault(); navigateTo('construcoes', '#portfolio'); }}
            className="hover:text-[#C9A96E] transition-colors"
          >
            Portfólio
          </a>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigateTo('grupo'); }}
            className="hover:text-[#C9A96E] transition-colors"
          >
            O Grupo
          </a>
          <a
            href="#contato"
            onClick={(e) => { e.preventDefault(); navigateTo('construcoes', '#contato'); }}
            className="hover:text-[#C9A96E] transition-colors"
          >
            Contato
          </a>
        </nav>
        <div className="mt-16">
          <a
            href="#contato"
            onClick={(e) => { e.preventDefault(); navigateTo('construcoes', '#contato'); }}
            className="inline-block px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.15em] border border-[#C9A96E]/40 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-500"
          >
            Solicitar análise
          </a>
        </div>
      </div>
      )}

      {/* ═══ MAIN ═══ */}
      {currentPage === 'construcoes' ? (
        <main className="flex-1">

        {/* ─────────────────────────────────────
            HERO — Cinematográfico, editorial
        ───────────────────────────────────── */}
        <section className="relative h-screen w-full flex items-center overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster={heroArchitecture}
            >
              <source src="/hero_background.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
          </div>

          {/* Content — Left aligned, editorial */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="hero-content max-w-3xl flex flex-col gap-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C9A96E]">
                Grupo Three
              </span>

              <h1 className="font-display font-extralight text-[clamp(2.5rem,7vw,6.5rem)] text-white leading-[1.05] tracking-tight">
                Construímos o<br />extraordinário<span className="text-[#C9A96E]">.</span>
              </h1>

              <div className="gold-line" />

              <p className="text-white/50 text-base sm:text-lg font-light leading-relaxed max-w-xl">
                Engenharia premium do planejamento à entrega final.
              </p>

              <div className="pt-2">
                <a
                  href="#contato"
                  className="group inline-flex items-center gap-3 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.15em] border border-[#C9A96E]/50 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-500"
                >
                  <span>Solicitar análise</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 scroll-indicator">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-medium">Scroll</span>
            <ChevronDown className="w-4 h-4 text-white/30" />
          </div>
        </section>

        {/* ─────────────────────────────────────
            DIFERENCIAL — Fundo branco, 3 pilares
        ───────────────────────────────────── */}
        <section id="diferencial" className="py-32 md:py-44 bg-white">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            {/* Statement */}
            <div className="text-center flex flex-col items-center gap-6 reveal-item">
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C9A96E]">
                Diferencial
              </span>
              <h2 className="font-display font-extralight text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] tracking-tight leading-[1.1] max-w-4xl">
                Onde a engenharia encontra a inteligência construtiva<span className="text-[#C9A96E]">.</span>
              </h2>
            </div>

            {/* Divider */}
            <div className="flex justify-center my-16 md:my-20 reveal-item reveal-delay-200">
              <div className="w-px h-20 bg-[#E5E5E5]" />
            </div>

            {/* 3 Pilares */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {pillars.map((pillar, i) => (
                <div key={i} className={`flex flex-col gap-4 reveal-item reveal-delay-${(i + 3) * 100}`}>
                  <span className="font-display font-extralight text-5xl text-[#C9A96E]/30 tracking-tight">{pillar.num}</span>
                  <h3 className="font-display font-semibold text-lg text-[#1A1A1A] tracking-tight">{pillar.title}</h3>
                  <p className="text-[#8A8A8A] text-sm leading-relaxed font-light">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────
            ÁREAS DE ATUAÇÃO — Fundo escuro, split screen
        ───────────────────────────────────── */}
        <section id="atuacao" className="py-24 md:py-36 bg-[#0F0F0F] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
            <div className="flex flex-col gap-3 max-w-2xl reveal-item">
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C9A96E]">
                Áreas de Atuação
              </span>
              <h2 className="font-display font-extralight text-3xl sm:text-5xl text-white tracking-tight">
                Atuação no ciclo construtivo
              </h2>
            </div>

            {/* Split Screen */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch min-h-[500px]">

              {/* Left — Interactive List */}
              <div className="lg:col-span-7 flex flex-col justify-center divide-y divide-white/[0.06] reveal-item">
                {areas.map((area, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredArea(i)}
                    className="relative group py-8 cursor-pointer flex items-baseline gap-6 md:gap-8 px-4 transition-all duration-300 hover:bg-white/[0.02]"
                  >
                    <span className={`font-display font-extralight text-4xl md:text-5xl tracking-tight transition-colors duration-500 ${
                      hoveredArea === i ? 'text-[#C9A96E]' : 'text-white/10'
                    }`}>
                      {area.num}
                    </span>
                    <div className="flex flex-col gap-2 flex-1">
                      <h3 className={`font-display font-medium text-lg md:text-xl tracking-tight transition-all duration-300 ${
                        hoveredArea === i ? 'text-white' : 'text-white/60'
                      }`}>
                        {area.title}
                      </h3>
                      <p className={`text-sm leading-relaxed font-light transition-all duration-500 ${
                        hoveredArea === i ? 'text-white/40 max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                      }`}>
                        {area.desc}
                      </p>
                    </div>
                    {/* Gold bottom line */}
                    <div className={`absolute bottom-0 left-0 h-px bg-[#C9A96E] transition-all duration-700 ${
                      hoveredArea === i ? 'w-full' : 'w-0'
                    }`} />
                  </div>
                ))}
              </div>

              {/* Right — Dynamic Image */}
              <div className="lg:col-span-5 relative overflow-hidden bg-[#111] min-h-[350px] lg:min-h-auto reveal-item reveal-delay-200">
                {areaImages.map((imgSrc, index) => (
                  <img
                    key={index}
                    src={imgSrc}
                    alt={`Atuação ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
                      hoveredArea === index
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  />
                ))}
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/30 to-transparent pointer-events-none" />
              </div>

            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────
            MÉTODO THREE — Fundo warm, split layout
        ───────────────────────────────────── */}
        <section id="metodo" className="py-24 md:py-36 bg-[#F5F3EF]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
            <div className="flex flex-col gap-3 max-w-2xl reveal-item">
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8A8A8A]">
                Metodologia
              </span>
              <h2 className="font-display font-extralight text-3xl sm:text-5xl text-[#1A1A1A] tracking-tight">
                Método Three
              </h2>
            </div>

            {/* Split: steps on left, content on right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 reveal-item">

              {/* Left — Step selectors */}
              <div className="lg:col-span-5 flex flex-col">
                {methodSteps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    onMouseEnter={() => setActiveStep(index)}
                    className={`group text-left py-5 border-l-2 pl-6 transition-all duration-500 ${
                      activeStep === index
                        ? 'border-l-[#C9A96E]'
                        : 'border-l-[#D5D0C7] hover:border-l-[#C9A96E]/40'
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span className={`font-display font-extralight text-2xl tracking-tight transition-colors duration-500 ${
                        activeStep === index ? 'text-[#C9A96E]' : 'text-[#C5BFB3]'
                      }`}>
                        0{index + 1}
                      </span>
                      <span className={`font-display font-medium text-base tracking-tight transition-colors duration-500 ${
                        activeStep === index ? 'text-[#1A1A1A]' : 'text-[#8A8A8A]'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right — Active step content */}
              <div className="lg:col-span-7 flex items-center">
                <div className="bg-white p-8 sm:p-12 lg:p-16 w-full min-h-[220px] flex flex-col justify-center gap-5 shadow-sm border border-[#E8E4DD]">
                  {methodSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex flex-col gap-4 transition-all duration-500 ${
                        activeStep === index
                          ? 'opacity-100 translate-y-0 relative'
                          : 'opacity-0 translate-y-3 absolute pointer-events-none'
                      }`}
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C9A96E]">
                        Fase 0{index + 1}
                      </span>
                      <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#1A1A1A] tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-[#8A8A8A] text-sm sm:text-base leading-relaxed font-light max-w-xl">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────
            PORTFÓLIO — Fundo branco, editorial
        ───────────────────────────────────── */}
        <section id="portfolio" className="py-24 md:py-36 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-20">
            <div className="flex flex-col gap-3 max-w-2xl reveal-item">
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C9A96E]">
                Portfólio
              </span>
              <h2 className="font-display font-extralight text-3xl sm:text-5xl text-[#1A1A1A] tracking-tight">
                Projetos Selecionados
              </h2>
            </div>

            {/* Editorial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">

              {/* Project 01 — Horizontal */}
              <div className="md:col-span-7 group flex flex-col gap-5 reveal-item">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F3EF]">
                  <img
                    src={portfolioResidence}
                    alt="Residência de Alto Padrão"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[2000ms] ease-out"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 text-white">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C9A96E]">
                      Construção & Interiores
                    </span>
                    <h3 className="font-display font-medium text-xl mt-2">Residência Horta</h3>
                    <span className="text-xs text-white/50 font-light mt-1">Alphaville, SP</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-display font-medium text-[#1A1A1A] text-sm tracking-tight">Residência Horta</h4>
                    <p className="text-xs text-[#8A8A8A] mt-0.5">Alphaville, SP</p>
                  </div>
                  <span className="text-[10px] font-semibold text-[#C9A96E] flex items-center gap-1 uppercase tracking-wider">
                    Ver projeto <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Project 02 — Vertical, staggered */}
              <div className="md:col-span-5 md:mt-20 group flex flex-col gap-5 reveal-item reveal-delay-200">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F3EF]">
                  <img
                    src={portfolioCorporate}
                    alt="Edifício Corporativo"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[2000ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 text-white">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C9A96E]">
                      Viabilização & Execução
                    </span>
                    <h3 className="font-display font-medium text-xl mt-2">Edifício K-Tech</h3>
                    <span className="text-xs text-white/50 font-light mt-1">Jardins, SP</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-display font-medium text-[#1A1A1A] text-sm tracking-tight">Edifício K-Tech</h4>
                    <p className="text-xs text-[#8A8A8A] mt-0.5">Jardins, SP</p>
                  </div>
                  <span className="text-[10px] font-semibold text-[#C9A96E] flex items-center gap-1 uppercase tracking-wider">
                    Ver projeto <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Project 03 — Wide banner */}
              <div className="md:col-span-12 md:mt-8 group flex flex-col gap-5 reveal-item">
                <div className="relative aspect-[16/7] md:aspect-[21/9] overflow-hidden bg-[#F5F3EF]">
                  <img
                    src={portfolioInterior}
                    alt="Design de Interiores Premium"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[2000ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 text-white">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C9A96E]">
                      Projetos & Interiores
                    </span>
                    <h3 className="font-display font-medium text-xl mt-2">Apartamento Leblon</h3>
                    <span className="text-xs text-white/50 font-light mt-1">Leblon, RJ</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-display font-medium text-[#1A1A1A] text-sm tracking-tight">Apartamento Leblon</h4>
                    <p className="text-xs text-[#8A8A8A] mt-0.5">Leblon, RJ</p>
                  </div>
                  <span className="text-[10px] font-semibold text-[#C9A96E] flex items-center gap-1 uppercase tracking-wider">
                    Ver projeto <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────
            NÚMEROS — Fundo preto total, dourado
        ───────────────────────────────────── */}
        <section className="bg-black py-28 md:py-40 text-white relative overflow-hidden">
          {/* Radial gold glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A96E]/[0.03] rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0 text-center md:text-left">

              {/* Stat 01 */}
              <div className="flex flex-col gap-3 md:pr-16 reveal-item">
                <CountUp end={100} id="counter-projetos" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C9A96E]">
                  Projetos
                </span>
                <span className="text-xs text-white/30 font-light max-w-[220px] mx-auto md:mx-0">
                  Viabilizados e projetados com modelagem técnica inteligente.
                </span>
              </div>

              {/* Divider */}
              <div className="hidden md:block absolute top-1/2 left-1/3 -translate-y-1/2 w-px h-32 bg-[#C9A96E]/15" />

              {/* Stat 02 */}
              <div className="flex flex-col gap-3 md:px-16 reveal-item reveal-delay-200">
                <CountUp end={50} id="counter-obras" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C9A96E]">
                  Obras
                </span>
                <span className="text-xs text-white/30 font-light max-w-[220px] mx-auto md:mx-0">
                  Executadas sob absoluto controle de prazos e custos.
                </span>
              </div>

              {/* Divider */}
              <div className="hidden md:block absolute top-1/2 left-2/3 -translate-y-1/2 w-px h-32 bg-[#C9A96E]/15" />

              {/* Stat 03 */}
              <div className="flex flex-col gap-3 md:pl-16 reveal-item reveal-delay-400">
                <CountUp end={200} id="counter-clientes" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C9A96E]">
                  Clientes
                </span>
                <span className="text-xs text-white/30 font-light max-w-[220px] mx-auto md:mx-0">
                  Atendidos com integridade técnica e engenharia premium.
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────
            CTA / CONTATO — Impactante
        ───────────────────────────────────── */}
        <section id="contato" className="py-32 md:py-48 bg-[#0A0A0A]">
          <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-10 reveal-item">
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C9A96E]">
              Contato
            </span>
            <h2 className="font-display font-extralight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] max-w-4xl">
              Pronto para construir o extraordinário<span className="text-[#C9A96E]">?</span>
            </h2>
            <div className="pt-4">
              <a
                href="mailto:contato@grupothree.com.br"
                className="group inline-flex items-center gap-3 px-10 py-5 text-[11px] font-semibold uppercase tracking-[0.15em] border border-[#C9A96E]/50 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-500"
              >
                <span>Solicitar orçamento</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 text-xs text-white/25 font-light">
              <span>contato@grupothree.com.br</span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-white/15" />
              <span>+55 (11) 99999-9999</span>
            </div>
          </div>
        </section>
      </main>
      ) : currentPage === 'imoveis' ? (
        <main className="flex-1 pt-20">
          <Imoveis onNavigate={navigateTo} />
        </main>
      ) : (
        <main className="flex-1">
          <Grupo onNavigate={navigateTo} />
        </main>
      )}

      {/* ═══ FOOTER ═══ */}
      {currentPage !== 'grupo' && (
        <footer className="bg-[#0A0A0A] border-t border-white/[0.04] py-16 md:py-24 text-sm text-white/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Logo */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-[0.2em] text-white/80">
                GRUPO THREE
              </span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-white/25 -mt-0.5">
                Engenharia & Inteligência
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs font-light text-white/20">
              Grupo empresarial especializado em inteligência técnica, projetos, interiores e construções de alto padrão.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-4">
            <span className="font-display font-semibold text-[10px] uppercase tracking-[0.2em] text-white/50">
              Navegação
            </span>
            <ul className="flex flex-col gap-3 text-xs font-light">
              <li><a href="#diferencial" className="hover:text-[#C9A96E] transition-colors duration-300">Diferencial</a></li>
              <li><a href="#atuacao" className="hover:text-[#C9A96E] transition-colors duration-300">Áreas de Atuação</a></li>
              <li><a href="#metodo" className="hover:text-[#C9A96E] transition-colors duration-300">Método Three</a></li>
              <li><a href="#portfolio" className="hover:text-[#C9A96E] transition-colors duration-300">Portfólio</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <span className="font-display font-semibold text-[10px] uppercase tracking-[0.2em] text-white/50">
              Contato
            </span>
            <ul className="flex flex-col gap-3 text-xs font-light">
              <li>+55 (11) 4003-0000</li>
              <li>+55 (11) 99999-9999</li>
              <li>contato@grupothree.com.br</li>
            </ul>
          </div>

          {/* Presence */}
          <div className="flex flex-col gap-4">
            <span className="font-display font-semibold text-[10px] uppercase tracking-[0.2em] text-white/50">
              Presença
            </span>
            <ul className="flex flex-col gap-3 text-xs font-light">
              <li>Instagram: @grupo.three</li>
              <li>São Paulo, SP — Brasil</li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <span className="text-white/20">&copy; 2026 Grupo Three. Todos os direitos reservados.</span>
          <span className="text-[10px] text-white/10 font-light">Inteligência técnica do planejamento à execução.</span>
        </div>
      </footer>
      )}

      {/* ═══ WHATSAPP FLOATING BUTTON ═══ */}
      <div className="whatsapp-wrapper fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Tooltip */}
        <div className="whatsapp-tooltip bg-white text-[#1A1A1A] text-xs font-medium px-4 py-2.5 rounded-lg shadow-lg shadow-black/10">
          Fale conosco
        </div>
        {/* Button */}
        <a
          href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20do%20Grupo%20Three."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fale conosco pelo WhatsApp"
          className="whatsapp-btn w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/25 transition-colors duration-300"
        >
          <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
            <path d="M16.004 2.667A13.26 13.26 0 0 0 2.67 15.924a13.16 13.16 0 0 0 1.792 6.636L2.667 29.333l7.005-1.838A13.28 13.28 0 0 0 16.004 29.2 13.27 13.27 0 0 0 29.333 15.924 13.27 13.27 0 0 0 16.004 2.667Zm0 24.266a11 11 0 0 1-5.607-1.536l-.402-.239-4.166 1.093 1.112-4.062-.263-.417a10.92 10.92 0 0 1-1.68-5.848A11.01 11.01 0 0 1 16.004 4.934a11.01 11.01 0 0 1 11.062 10.99 11.02 11.02 0 0 1-11.062 11.01Zm6.047-8.237c-.332-.166-1.963-.969-2.268-1.08-.305-.11-.527-.166-.749.167s-.86 1.08-1.054 1.3-.388.25-.72.083a9.07 9.07 0 0 1-2.672-1.65 10.01 10.01 0 0 1-1.848-2.302c-.194-.333-.02-.514.145-.68.15-.148.332-.388.499-.582.166-.194.221-.333.332-.555.11-.222.055-.416-.028-.583s-.749-1.804-1.026-2.47c-.27-.649-.546-.561-.749-.572l-.638-.01a1.22 1.22 0 0 0-.887.416c-.305.333-1.164 1.138-1.164 2.775s1.192 3.22 1.358 3.442c.166.222 2.345 3.58 5.682 5.02.794.342 1.414.547 1.897.7.797.253 1.523.217 2.096.132.64-.095 1.963-.803 2.24-1.578.277-.775.277-1.44.194-1.578-.083-.139-.305-.222-.638-.389Z"/>
          </svg>
        </a>
      </div>

    </div>
  )
}

export default App
