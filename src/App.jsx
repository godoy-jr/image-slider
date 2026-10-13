import { useEffect, useState } from 'react'

const slides = [
  { image: '/images/panda-montanhas.png', eyebrow: 'Vida selvagem', title: 'Panda gigante', description: 'Entre montanhas cobertas de névoa, o panda encontra tranquilidade em seu habitat natural.' },
  { image: '/images/panda-bambu.png', eyebrow: 'Floresta de bambu', title: 'Caminho dourado', description: 'A luz do fim da tarde atravessa o bambuzal enquanto o panda explora a floresta.' },
  { image: '/images/panda-riacho.png', eyebrow: 'Natureza preservada', title: 'Pausa junto ao riacho', description: 'Água cristalina, montanhas e bambu formam o cenário perfeito para uma refeição tranquila.' },
  { image: '/images/urso.png', eyebrow: 'Floresta selvagem', title: 'Urso-pardo', description: 'Entre o rio e as montanhas, o urso percorre uma paisagem de natureza intocada.' },
  { image: '/images/leao.png', eyebrow: 'Rei da savana', title: 'Leão africano', description: 'Sob a sombra de uma acácia, o leão observa o horizonte iluminado pelo pôr do sol.' },
  { image: '/images/girafa.png', eyebrow: 'Horizonte africano', title: 'Girafa', description: 'Elegante e tranquila, a girafa atravessa a savana aos primeiros raios do dia.' },
  { image: '/images/cachorro.png', eyebrow: 'Alegria ao ar livre', title: 'Golden retriever', description: 'Um passeio cheio de energia entre flores, montanhas e o céu azul.' },
]

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const showPrevious = () => setCurrentSlide((current) => (current - 1 + slides.length) % slides.length)
  const showNext = () => setCurrentSlide((current) => (current + 1) % slides.length)

  useEffect(() => {
    if (isPaused) return undefined
    const timer = window.setInterval(showNext, 5000)
    return () => window.clearInterval(timer)
  }, [isPaused])

  return (
    <main className="min-h-screen bg-[#07120d] px-4 py-8 text-white sm:px-8 lg:py-12">
      <section className="mx-auto max-w-7xl">
        <header className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.32em] text-emerald-300">Image Slider</p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">O incrível mundo dos animais</h1>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-6 text-white/60 md:block">Galeria criada com React, Tailwind CSS e imagens geradas por inteligência artificial.</p>
        </header>

        <div
          className="relative isolate aspect-[4/5] overflow-hidden rounded-[2rem] bg-black shadow-2xl shadow-emerald-950/50 sm:aspect-[16/10] lg:aspect-[16/8]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') showPrevious()
            if (event.key === 'ArrowRight') showNext()
          }}
          tabIndex="0"
          aria-label="Galeria de imagens de animais"
        >
          {slides.map((slide, index) => (
            <article key={slide.image} className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'z-10 opacity-100' : 'opacity-0'}`} aria-hidden={index !== currentSlide}>
              <img src={slide.image} alt={`${slide.title}: ${slide.description}`} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/20" />
              <div className="absolute inset-x-0 bottom-0 max-w-3xl p-6 sm:p-10 lg:p-14">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-emerald-300">{slide.eyebrow}</p>
                <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">{slide.title}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">{slide.description}</p>
              </div>
            </article>
          ))}

          <button type="button" onClick={showPrevious} className="absolute left-4 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/30 text-2xl backdrop-blur-md transition hover:scale-105 hover:bg-white hover:text-black sm:left-7 sm:size-13" aria-label="Imagem anterior">‹</button>
          <button type="button" onClick={showNext} className="absolute right-4 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/30 text-2xl backdrop-blur-md transition hover:scale-105 hover:bg-white hover:text-black sm:right-7 sm:size-13" aria-label="Próxima imagem">›</button>

          <div className="absolute bottom-6 right-6 z-20 flex gap-2 sm:bottom-10 sm:right-10">
            {slides.map((slide, index) => (
              <button key={slide.image} type="button" onClick={() => setCurrentSlide(index)} className={`h-2 rounded-full transition-all ${index === currentSlide ? 'w-9 bg-emerald-300' : 'w-2 bg-white/50 hover:bg-white'}`} aria-label={`Abrir imagem ${index + 1}`} aria-current={index === currentSlide ? 'true' : undefined} />
            ))}
          </div>

          <div className="absolute right-6 top-6 z-20 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs tracking-widest text-white/75 backdrop-blur-md sm:right-8 sm:top-8">{String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</div>
        </div>
      </section>
    </main>
  )
}

export default App
