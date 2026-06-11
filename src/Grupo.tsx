import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import heroArchitecture from './assets/hero_architecture.png'
import portfolioInterior from './assets/portfolio_interior.png'
import portfolioResidence from './assets/portfolio_residence.png'

interface GrupoProps {
  onNavigate: (page: 'grupo' | 'construcoes' | 'imoveis', anchor?: string) => void
}

export default function Grupo({ onNavigate }: GrupoProps) {
  const [mounted, setMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
    // Small delay to trigger smooth entrance animation
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const pillars = [
    {
      num: "01",
      area: "Construção",
      sub: "Engenharia de Alta Performance",
      desc: "Execução técnica com controle rigoroso de qualidade, planejamento de fluxo de caixa e prazos inflexíveis. Construímos residências e edifícios de alto padrão com previsibilidade total e acabamento artesanal.",
      tags: ["Engenharia", "Previsibilidade", "Alto Padrão"],
      img: portfolioResidence,
      anchor: "#atuacao-construcao"
    },
    {
      num: "02",
      area: "Design de Interiores",
      sub: "Curadoria Autoral & Sofisticação",
      desc: "Projetos de interiores sob medida que expressam a identidade dos clientes através de uma cuidadosa seleção de materiais nobres, iluminação cênica e marcenaria autoral de alto luxo.",
      tags: ["Design Autoral", "Curadoria", "Experiência Sensorial"],
      img: portfolioInterior,
      anchor: "#atuacao-interiores"
    },
    {
      num: "03",
      area: "Imóveis",
      sub: "Boutique Real Estate",
      desc: "Assessoria especializada para aquisição e venda de propriedades de altíssimo padrão. Selecionadas sob critérios rigorosos de arquitetura e confidencialidade.",
      tags: ["Exclusividade", "Curadoria", "Confidencialidade"],
      img: heroArchitecture,
      anchor: "imoveis"
    }
  ]

  return (
    <div className={`w-full bg-[#0A0A0A] transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${
      mounted ? 'opacity-100 filter blur-0' : 'opacity-0 filter blur-lg'
    }`}>
      {/* Container Principal: Full height no desktop, auto no mobile */}
      <div className="min-h-screen md:h-screen flex flex-col md:flex-row w-full overflow-hidden">
        
        {/* LADO ESQUERDO: Manifesto / Info (Fixo no desktop) */}
        <div className="w-full md:w-[35%] lg:w-[30%] p-8 sm:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-white/[0.04] bg-[#0A0A0A] z-10 shrink-0 md:overflow-y-auto">
          <div className="flex flex-col justify-between min-h-full gap-8">
            <div className="flex flex-col gap-6">
            <div className="flex justify-center w-full mb-2">
              <img
                src="/logo three.png"
                alt="Logo Grupo Three"
                className="h-20 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <h2 className="font-display font-extralight text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              A sinergia do ciclo construtivo completo<span className="text-[#C9A96E]">.</span>
            </h2>
            <div className="w-12 h-px bg-[#C9A96E]/40 my-2" />
            <p className="text-white/50 text-sm leading-relaxed font-light">
              O Grupo Three consolidou-se unindo engenharia de precisão, arquitetura autoral de interiores e inteligência imobiliária sob uma única marca.
            </p>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              Eliminamos a fragmentação tradicional do mercado de luxo. Nossos clientes encontram planejamento, projeto, execução técnica e curadoria imobiliária em um ecossistema perfeitamente integrado e de alta performance.
            </p>
          </div>

          {/* Lista de Valores */}
          <div className="my-10 flex flex-col gap-4 text-xs font-light">
            <div className="flex flex-col gap-1 border-l border-[#C9A96E]/30 pl-3">
              <span className="font-semibold text-white/80">Sinergia Plena</span>
              <span className="text-white/40">Integração absoluta que anula ruídos de comunicação entre projeto e canteiro de obras.</span>
            </div>
            <div className="flex flex-col gap-1 border-l border-[#C9A96E]/30 pl-3">
              <span className="font-semibold text-white/80">Inteligência Técnica</span>
              <span className="text-white/40">Engenharia analítica com orçamentos reais e cronogramas físico-financeiros impecáveis.</span>
            </div>
          </div>

          {/* Botão de retorno e Copyright */}
          <div className="flex flex-col gap-6 pt-4 border-t border-white/[0.04]">
            <button
              onClick={() => onNavigate('construcoes')}
              className="group inline-flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9A96E] hover:text-white transition-colors duration-300 self-start"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Voltar ao início</span>
            </button>
            <span className="text-[10px] text-white/15 font-light">
              © 2026 Grupo Three. Todos os direitos reservados.
            </span>
          </div>
          </div>
        </div>

        {/* LADO DIREITO: Painéis Acordeão (Desktop) / Cards Empilhados (Mobile) */}
        <div className="w-full md:w-[65%] lg:w-[70%] flex flex-col md:flex-row h-full">
          {pillars.map((pillar, i) => {
            const isHovered = hoveredIndex === i
            const hasHoveredOther = hoveredIndex !== null && !isHovered

            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  if (pillar.anchor === 'imoveis') {
                    onNavigate('imoveis')
                  } else {
                    onNavigate('construcoes', pillar.anchor)
                  }
                }}
                className={`relative overflow-hidden w-full md:h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] border-b md:border-b-0 md:border-r border-white/[0.04] group cursor-pointer ${
                  // Controle de largura no desktop via flex
                  hoveredIndex === null
                    ? 'md:flex-1' 
                    : isHovered 
                      ? 'md:flex-[1.8]' 
                      : 'md:flex-[0.6]'
                } ${
                  // Altura fixa no mobile para cada área
                  'h-[280px] sm:h-[350px] md:h-full'
                }`}
              >
                {/* Imagem de Fundo com overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={pillar.img}
                    alt={pillar.area}
                    className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isHovered ? 'scale-105 filter-none' : 'grayscale-[20%] group-hover:scale-102'
                    }`}
                  />
                  {/* Overlay gradiente escuro dinâmico */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40 transition-opacity duration-700 ${
                    isHovered ? 'opacity-85' : hasHoveredOther ? 'opacity-90' : 'opacity-75'
                  }`} />
                </div>

                {/* Conteúdo do Card */}
                <div className="absolute inset-0 p-8 sm:p-10 lg:p-12 flex flex-col justify-between z-10 select-none overflow-y-auto">
                  
                  {/* Topo: Número grande com marcação */}
                  <div className="flex justify-between items-start">
                    <span className={`font-display font-extralight text-5xl sm:text-6xl tracking-tighter transition-colors duration-500 ${
                      isHovered ? 'text-[#C9A96E]' : 'text-white/20'
                    }`}>
                      {pillar.num}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (pillar.anchor === 'imoveis') {
                          onNavigate('imoveis')
                        } else {
                          onNavigate('construcoes', pillar.anchor)
                        }
                      }}
                      className={`p-2.5 rounded-full border border-white/10 hover:border-[#C9A96E] hover:bg-[#C9A96E] text-white hover:text-black transition-all duration-500 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 ${
                        isHovered ? '!opacity-100 !translate-y-0' : ''
                      }`}
                      aria-label={`Ver detalhes de ${pillar.area}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Base: Textos e Tags */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C9A96E]">
                      Área {pillar.num}
                    </span>
                    <h3 className="font-display font-light text-2xl sm:text-3xl text-white tracking-tight">
                      {pillar.area}
                    </h3>
                    <p className="text-xs text-white/50 font-medium tracking-wide">
                      {pillar.sub}
                    </p>

                    {/* Descrição expandida no hover (Desktop) ou sempre visível (Mobile) */}
                    <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:max-h-0 md:opacity-0 md:overflow-hidden ${
                      isHovered ? 'md:max-h-[160px] md:opacity-100 md:mt-4' : ''
                    } ${
                      // Sempre visível no mobile (onde não há hover)
                      'max-h-[160px] opacity-100 mt-3 md:mt-0'
                    }`}>
                      <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed max-w-md">
                        {pillar.desc}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {pillar.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-semibold bg-white/[0.05] border border-white/[0.06] text-[#C9A96E] rounded-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Linha de progresso inferior dourada */}
                <div className={`absolute bottom-0 left-0 h-1 bg-[#C9A96E] transition-all duration-700 ${
                  isHovered ? 'w-full' : 'w-0'
                }`} />
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
