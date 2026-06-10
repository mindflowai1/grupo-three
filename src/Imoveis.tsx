import { useState, useEffect } from 'react'
import { Search, SlidersHorizontal, MapPin, Maximize, BedDouble, Car, ArrowRight, ArrowLeft } from 'lucide-react'
import heroArchitecture from './assets/hero_architecture.png'
import portfolioInterior from './assets/portfolio_interior.png'
import portfolioResidence from './assets/portfolio_residence.png'
import portfolioCorporate from './assets/portfolio_corporate.png'

interface ImoveisProps {
  onNavigate: (page: 'grupo' | 'construcoes' | 'imoveis', anchor?: string) => void
}

const PROPERTIES = [
  {
    id: 1,
    title: "Penthouse Jardins",
    type: "Penthouse",
    location: "Jardins, SP",
    price: 18500000,
    priceStr: "R$ 18.500.000",
    area: 550,
    suites: 4,
    parking: 5,
    img: portfolioInterior,
    desc: "Exclusividade suspensa nos Jardins. Vista panorâmica de 360°, acabamentos em mármore Calacatta, automação residencial completa e piscina privativa climatizada."
  },
  {
    id: 2,
    title: "Villa Alphaville",
    type: "Residência",
    location: "Alphaville, SP",
    price: 12800000,
    priceStr: "R$ 12.800.000",
    area: 850,
    suites: 5,
    parking: 6,
    img: portfolioResidence,
    desc: "Arquitetura contemporânea integrada à natureza. Amplos vãos livres, fachada imponente em concreto aparente e painéis ripados de madeira, com lazer completo."
  },
  {
    id: 3,
    title: "Cobertura Leblon",
    type: "Cobertura",
    location: "Leblon, RJ",
    price: 26000000,
    priceStr: "R$ 26.000.000",
    area: 480,
    suites: 3,
    parking: 4,
    img: heroArchitecture,
    desc: "Sofisticação à beira-mar no quadrilátero mais cobiçado do Leblon. Terraço gourmet amplo com deck e jacuzzi voltados para o Morro Dois Irmãos."
  },
  {
    id: 4,
    title: "Mansão Quinta da Baroneza",
    type: "Residência",
    location: "Bragança Paulista, SP",
    price: 22000000,
    priceStr: "R$ 22.000.000",
    area: 1400,
    suites: 5,
    parking: 8,
    img: portfolioResidence,
    desc: "O refúgio definitivo de campo. Projeto integrado com piscina de borda infinita, SPA privativo, área gourmet de alta gastronomia e paisagismo assinado."
  },
  {
    id: 5,
    title: "Penthouse Leblon",
    type: "Penthouse",
    location: "Leblon, RJ",
    price: 32000000,
    priceStr: "R$ 32.000.000",
    area: 620,
    suites: 4,
    parking: 6,
    img: portfolioInterior,
    desc: "Penthouse duplex com vista deslumbrante para a praia do Leblon. Elevador privativo, acabamentos importados de altíssimo padrão e terraço com piscina privativa."
  },
  {
    id: 6,
    title: "Edifício K-Tech Penthouse",
    type: "Penthouse",
    location: "Jardins, SP",
    price: 15200000,
    priceStr: "R$ 15.200.000",
    area: 510,
    suites: 4,
    parking: 5,
    img: portfolioCorporate,
    desc: "Design minimalista e tecnologia construtiva integrada. Conforto térmico e acústico absoluto, pé-direito duplo no living e segurança patrimonial avançada."
  }
]

export default function Imoveis({ onNavigate }: ImoveisProps) {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('Todos')
  const [selectedLocation, setSelectedLocation] = useState('Todos')
  const [selectedPriceRange, setSelectedPriceRange] = useState('Todos')
  const [filteredProperties, setFilteredProperties] = useState(PROPERTIES)

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // Processamento de Filtros
  const handleFilter = () => {
    let result = PROPERTIES

    // Filtro por termo de busca
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase()
      result = result.filter(p => 
        p.title.toLowerCase().includes(term) || 
        p.location.toLowerCase().includes(term) ||
        p.desc.toLowerCase().includes(term)
      )
    }

    // Filtro por tipo
    if (selectedType !== 'Todos') {
      result = result.filter(p => p.type === selectedType)
    }

    // Filtro por localização
    if (selectedLocation !== 'Todos') {
      result = result.filter(p => p.location.includes(selectedLocation))
    }

    // Filtro por faixa de preço
    if (selectedPriceRange !== 'Todos') {
      if (selectedPriceRange === 'ate-15m') {
        result = result.filter(p => p.price <= 15000000)
      } else if (selectedPriceRange === '15m-25m') {
        result = result.filter(p => p.price > 15000000 && p.price <= 25000000)
      } else if (selectedPriceRange === 'acima-25m') {
        result = result.filter(p => p.price > 25000000)
      }
    }

    setFilteredProperties(result)
  }

  // Executa o filtro automaticamente ao mudar seleções
  useEffect(() => {
    handleFilter()
  }, [searchTerm, selectedType, selectedLocation, selectedPriceRange])

  return (
    <div className={`w-full bg-[#F5F3EF] text-[#1A1A1A] transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${
      mounted ? 'opacity-100 filter blur-0' : 'opacity-0 filter blur-lg'
    }`}>
      
      {/* 1. HERO BANNER — Metade de cima (50vh) */}
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroArchitecture}
            alt="Boutique Real Estate Banner"
            className="w-full h-full object-cover scale-102"
          />
          {/* Overlay escurecido médio para manter a leitura do texto branco */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl flex flex-col items-center">
          <button
            onClick={() => onNavigate('grupo')}
            className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9A96E] hover:text-white transition-colors duration-300 mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Voltar ao Portal</span>
          </button>
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C9A96E] block mb-2">
            Private Curation
          </span>
          <h1 className="font-display font-extralight text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
            Boutique Real Estate<span className="text-[#C9A96E]">.</span>
          </h1>
          <div className="w-16 h-px bg-[#C9A96E]/45 my-3" />
          <p className="text-white/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Propriedades residenciais extraordinárias selecionadas sob critérios rigorosos de arquitetura, localização e privacidade.
          </p>
        </div>
      </section>

      {/* 2. BARRA DE BUSCA E FILTROS — Ao Centro (Fundo Branco no Tema Claro) */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 -mt-10">
        <div className="bg-white border border-[#EBE8E1] p-6 md:p-8 shadow-xl flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-[#EBE8E1] pb-3 text-[#1A1A1A]">
            <SlidersHorizontal className="w-4 h-4 text-[#C9A96E]" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1A1A1A]/80">Filtrar propriedades</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            {/* Input Pesquisa */}
            <div className="md:col-span-4 flex flex-col gap-2">
              <label htmlFor="search-input" className="text-[10px] uppercase tracking-wider text-black/40 font-medium">Buscar palavra-chave</label>
              <div className="relative">
                <input
                  id="search-input"
                  type="text"
                  placeholder="Ex: Penthouse, Jardins, piscina..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#F5F3EF] border border-[#EBE8E1] text-sm text-[#1A1A1A] px-4 py-3 pl-10 focus:outline-none focus:border-[#C9A96E] transition-all font-light placeholder-black/30"
                />
                <Search className="w-4 h-4 text-black/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Filtro de Tipo */}
            <div className="md:col-span-3 flex flex-col gap-2">
              <label htmlFor="type-select" className="text-[10px] uppercase tracking-wider text-black/40 font-medium">Tipo</label>
              <select
                id="type-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#F5F3EF] border border-[#EBE8E1] text-sm text-[#1A1A1A] px-4 py-3 focus:outline-none focus:border-[#C9A96E] transition-all font-light"
              >
                <option value="Todos">Todos os tipos</option>
                <option value="Penthouse">Penthouses</option>
                <option value="Cobertura">Coberturas</option>
                <option value="Residência">Residências de Luxo</option>
              </select>
            </div>

            {/* Filtro de Localização */}
            <div className="md:col-span-3 flex flex-col gap-2">
              <label htmlFor="location-select" className="text-[10px] uppercase tracking-wider text-black/40 font-medium">Localização</label>
              <select
                id="location-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-[#F5F3EF] border border-[#EBE8E1] text-sm text-[#1A1A1A] px-4 py-3 focus:outline-none focus:border-[#C9A96E] transition-all font-light"
              >
                <option value="Todos">Todas as regiões</option>
                <option value="Jardins">Jardins, SP</option>
                <option value="Alphaville">Alphaville, SP</option>
                <option value="Leblon">Leblon, RJ</option>
                <option value="Quinta da Baroneza">Baroneza, SP</option>
              </select>
            </div>

            {/* Filtro de Preço */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <label htmlFor="price-select" className="text-[10px] uppercase tracking-wider text-black/40 font-medium">Preço</label>
              <select
                id="price-select"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full bg-[#F5F3EF] border border-[#EBE8E1] text-sm text-[#1A1A1A] px-4 py-3 focus:outline-none focus:border-[#C9A96E] transition-all font-light"
              >
                <option value="Todos">Qualquer valor</option>
                <option value="ate-15m">Até R$ 15M</option>
                <option value="15m-25m">R$ 15M - R$ 25M</option>
                <option value="acima-25m">Acima de R$ 25M</option>
              </select>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CATÁLOGO DE IMÓVEIS — Linhas de 3 com Cartões Brancos Pop em Fundo Creme */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="flex justify-between items-baseline mb-12 border-b border-[#EBE8E1] pb-6">
          <h2 className="font-display font-light text-xl sm:text-2xl text-[#1A1A1A] tracking-tight">
            Coleção Selecionada ({filteredProperties.length})
          </h2>
          <span className="text-[10px] text-black/30 uppercase tracking-widest font-medium">Curadoria Grupo Three</span>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-black/10 bg-white/50">
            <p className="text-black/40 text-sm font-light">Nenhum imóvel corresponde aos filtros selecionados.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedType('Todos')
                setSelectedLocation('Todos')
                setSelectedPriceRange('Todos')
              }}
              className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#C9A96E] hover:text-[#1A1A1A] transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="group flex flex-col bg-white border border-[#EBE8E1] hover:border-[#C9A96E]/40 hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                {/* Imagem do Imóvel */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5 shrink-0">
                  <img
                    src={property.img}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms] ease-out grayscale-[10%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 px-2.5 py-1 text-[9px] uppercase tracking-wider font-semibold bg-white border border-[#EBE8E1] text-[#1A1A1A] rounded-sm">
                    {property.type}
                  </span>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-2">
                    {/* Localização */}
                    <div className="flex items-center gap-1.5 text-black/40 text-[10px] uppercase tracking-wider font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" />
                      <span>{property.location}</span>
                    </div>
                    {/* Título */}
                    <h3 className="font-display font-medium text-lg sm:text-xl text-[#1A1A1A] tracking-tight mt-1 group-hover:text-[#C9A96E] transition-colors duration-300">
                      {property.title}
                    </h3>
                    {/* Descrição */}
                    <p className="text-black/50 text-xs sm:text-sm font-light leading-relaxed mt-2 line-clamp-3">
                      {property.desc}
                    </p>
                  </div>

                  {/* Informações Técnicas & Preço */}
                  <div className="flex flex-col gap-4 pt-4 border-t border-[#F5F3EF]">
                    {/* Ícones de ficha técnica */}
                    <div className="flex justify-between items-center text-xs text-[#8A8A8A] font-light">
                      <div className="flex items-center gap-1">
                        <Maximize className="w-3.5 h-3.5 text-[#C9A96E]" />
                        <span>{property.area} m²</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BedDouble className="w-3.5 h-3.5 text-[#C9A96E]" />
                        <span>{property.suites} Suítes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Car className="w-3.5 h-3.5 text-[#C9A96E]" />
                        <span>{property.parking} Vagas</span>
                      </div>
                    </div>

                    {/* Preço e Botão */}
                    <div className="flex justify-between items-center mt-2 pt-2">
                      <span className="font-display font-semibold text-lg sm:text-xl text-[#C9A96E]">
                        {property.priceStr}
                      </span>
                      <a
                        href={`https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20a%20apresenta%C3%A7%C3%A3o%20do%20im%C3%B3vel%3A%20${encodeURIComponent(property.title)}%20(${encodeURIComponent(property.location)})%20anunciado%20no%20site%20do%20Grupo%20Three.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A] hover:text-[#C9A96E] transition-colors duration-300"
                      >
                        <span>Solicitar</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. AVISO DE PRIVATE BROKERAGE — Lighter Rodapé */}
      <section className="bg-[#EBE8E1] py-20 text-center relative overflow-hidden border-t border-[#EBE8E1]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A96E]/[0.05] rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center gap-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C9A96E]">
            Private Brokerage
          </span>
          <h2 className="font-display font-extralight text-2xl sm:text-3xl text-[#1A1A1A] tracking-tight">
            Transações Off-Market & Confidenciais
          </h2>
          <p className="text-black/50 text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
            Nem todas as nossas propriedades extraordinárias são expostas publicamente. Atuamos com assessoria privada exclusiva para aquisição de ativos imobiliários de alta relevância sob absoluto sigilo comercial.
          </p>
          <a
            href="mailto:contato@grupothree.com.br?subject=Private Brokerage - Grupo Three"
            className="mt-6 inline-block px-8 py-3.5 text-[10px] font-bold uppercase tracking-wider border border-[#C9A96E]/50 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-white transition-all duration-500"
          >
            Acessar portfólio restrito
          </a>
        </div>
      </section>

    </div>
  )
}
