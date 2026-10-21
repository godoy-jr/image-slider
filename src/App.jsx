import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const slides = [
  { image: '/images/panda-montanhas.png' }, { image: '/images/panda-bambu.png' }, { image: '/images/panda-riacho.png' }, { image: '/images/urso.png' },
  { image: '/images/urso-floresta.jpg', credit: { author: 'Charles J. Sharp', source: 'https://commons.wikimedia.org/wiki/File:Eurasian_brown_bear_(Ursus_arctos_arctos)_female_1.jpg', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' } },
  { image: '/images/urso-cantabria.jpg', credit: { author: 'neusitas', source: 'https://commons.wikimedia.org/wiki/File:Cantabrian_brown_bear.jpg', license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/' } }, { image: '/images/leao.png' },
  { image: '/images/leao-serengeti.jpg', credit: { author: 'Giles Laurent', source: 'https://commons.wikimedia.org/wiki/File:002_Male_Lion_prowling_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' } },
  { image: '/images/leao-familia.jpg', credit: { author: 'Charles J. Sharp', source: 'https://commons.wikimedia.org/wiki/File:Lion_(Panthera_leo)_male_and_cub_Etosha.jpg', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' } }, { image: '/images/girafa.png' },
  { image: '/images/girafa-kruger-1.jpg', credit: { author: 'Dietmar Rabich', source: 'https://commons.wikimedia.org/wiki/File:Kruger_National_Park_(ZA),_Giraffe_--_2024_--_0064.jpg', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' } },
  { image: '/images/girafa-kruger-2.jpg', credit: { author: 'Dietmar Rabich', source: 'https://commons.wikimedia.org/wiki/File:Kruger_National_Park_(ZA),_Giraffe_--_2024_--_0130.jpg', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' } }, { image: '/images/cachorro.png' },
  { image: '/images/cachorro-watson.jpg', credit: { author: 'Pete Markham', source: 'https://commons.wikimedia.org/wiki/File:A_Portrait_-_Watson_the_Golden_-_Sit_-_Flickr_-_pmarkham.jpg', license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/' } },
  { image: '/images/cachorro-golden.jpg', credit: { author: 'Dietmar Rabich', source: 'https://commons.wikimedia.org/wiki/File:D%C3%BClmen,_Hausd%C3%BClmen,_Golden_Retriever_--_2022_--_5767.jpg', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' } },
]

function App() {
  const { t, i18n } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('animal-theme')
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const translatedSlides = t('slides', { returnObjects: true })
  const showPrevious = () => setCurrentSlide((current) => (current - 1 + slides.length) % slides.length)
  const showNext = () => setCurrentSlide((current) => (current + 1) % slides.length)

  useEffect(() => {
    if (isPaused) return undefined
    const timer = window.setInterval(showNext, 5000)
    return () => window.clearInterval(timer)
  }, [isPaused])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    localStorage.setItem('animal-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const changeLanguage = (event) => {
    const language = event.target.value
    i18n.changeLanguage(language)
    localStorage.setItem('animal-language', language)
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : language
  }

  return (
    <main className="min-h-screen bg-[#f3f7f4] px-4 py-8 text-[#10271d] transition-colors duration-300 dark:bg-[#07120d] dark:text-white sm:px-8 lg:py-12">
      <section className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center gap-4">
            <img src="/animal-avatar.svg" alt={t('brand')} className="size-14 shrink-0 sm:size-16" />
            <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.32em] text-emerald-700 dark:text-emerald-300">{t('brand')}</p><h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">{t('heading')}</h1></div>
          </div>
          <div className="flex items-center justify-between gap-3 lg:justify-end">
            <p className="hidden max-w-xs text-right text-sm leading-6 text-[#486054] dark:text-white/60 md:block">{t('intro')}</p>
            <div className="flex shrink-0 items-center gap-2">
              <label className="sr-only" htmlFor="language">{t('language')}</label>
              <select id="language" value={i18n.resolvedLanguage} onChange={changeLanguage} className="rounded-full border border-emerald-900/15 bg-white px-3 py-2 text-sm font-semibold shadow-sm outline-none transition focus:ring-2 focus:ring-emerald-500 dark:border-white/15 dark:bg-white/10 dark:text-white">
                <option value="pt">PT</option><option value="en">EN</option><option value="es">ES</option>
              </select>
              <button type="button" onClick={() => setIsDark((value) => !value)} className="grid size-10 place-items-center rounded-full border border-emerald-900/15 bg-white text-lg shadow-sm transition hover:scale-105 dark:border-white/15 dark:bg-white/10" aria-label={isDark ? t('themeLight') : t('themeDark')} title={isDark ? t('themeLight') : t('themeDark')}><span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span></button>
            </div>
          </div>
        </header>

        <div className="relative isolate aspect-[4/5] overflow-hidden rounded-[2rem] bg-black shadow-2xl shadow-emerald-950/20 sm:aspect-[16/10] lg:aspect-[16/8]" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocus={() => setIsPaused(true)} onBlur={() => setIsPaused(false)} onKeyDown={(event) => { if (event.key === 'ArrowLeft') showPrevious(); if (event.key === 'ArrowRight') showNext() }} tabIndex="0" aria-label={t('galleryLabel')}>
          {slides.map((slide, index) => {
            const [eyebrow, title, description] = translatedSlides[index]
            return <article key={slide.image} className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'z-10 opacity-100' : 'opacity-0'}`} aria-hidden={index !== currentSlide} inert={index !== currentSlide}>
              <img src={slide.image} alt={`${title}: ${description}`} className="h-full w-full object-cover" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/20" />
              <div className="absolute inset-x-0 bottom-0 max-w-3xl p-6 text-white sm:p-10 lg:p-14"><p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-emerald-300">{eyebrow}</p><h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">{title}</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">{description}</p>
                {slide.credit && <p className="mt-3 text-xs text-white/60">{t('photoBy')} <a href={slide.credit.source} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white">{slide.credit.author}</a>{' · '}<a href={slide.credit.licenseUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white">{slide.credit.license}</a></p>}
              </div>
            </article>
          })}
          <button type="button" onClick={showPrevious} className="absolute left-4 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/30 text-2xl text-white backdrop-blur-md transition hover:scale-105 hover:bg-white hover:text-black sm:left-7 sm:size-13" aria-label={t('previous')}>‹</button>
          <button type="button" onClick={showNext} className="absolute right-4 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/30 text-2xl text-white backdrop-blur-md transition hover:scale-105 hover:bg-white hover:text-black sm:right-7 sm:size-13" aria-label={t('next')}>›</button>
          <div className="absolute bottom-6 right-6 z-20 flex gap-2 sm:bottom-10 sm:right-10">{slides.map((slide, index) => <button key={slide.image} type="button" onClick={() => setCurrentSlide(index)} className={`h-2 rounded-full transition-all ${index === currentSlide ? 'w-9 bg-emerald-300' : 'w-2 bg-white/50 hover:bg-white'}`} aria-label={t('openImage', { number: index + 1 })} aria-current={index === currentSlide ? 'true' : undefined} />)}</div>
          <div className="absolute right-6 top-6 z-20 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs tracking-widest text-white/75 backdrop-blur-md sm:right-8 sm:top-8">{String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</div>
        </div>
      </section>
      <footer className="mx-auto mt-8 flex max-w-7xl items-center gap-3 border-t border-emerald-950/10 pt-5 text-sm text-[#486054] dark:border-white/10 dark:text-white/60"><img src="/animal-avatar.svg" alt={t('brand')} className="size-10 shrink-0" /><span>{t('footer')}</span></footer>
    </main>
  )
}

export default App
