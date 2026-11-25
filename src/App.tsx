import { useEffect, useRef } from 'react'
import { navigate, useRoute, type Route } from './lib/router'
import { BookingPage } from './pages/BookingPage'
import { Case1 } from './pages/Case1'
import { Case2 } from './pages/Case2'
import { Case3 } from './pages/Case3'
import { Espace } from './pages/Espace'
import { Home } from './pages/Home'
import { SeoPlan } from './pages/SeoPlan'
import { NextSteps } from './pages/NextSteps'
import { NotFound } from './pages/NotFound'
import { Remuneration } from './pages/Remuneration'
import { ServicePage } from './pages/ServicePage'
import { DesignSystem } from './pages/DesignSystem'

const TITLES: Record<string, string> = {
  '/': 'Accueil',
  '/cas-02-ab-test': 'Cas 02 — Présenter l’offre par situation',
  '/cas-03-inscription': 'Cas 03 — Un parcours guidé vers les services',
  '/cas-03-inscription/services-selectionnes': 'Cas 03 — Mes services sélectionnés',
  '/espace': 'Cas 03 — Mon espace',
  '/cas-01-seo': 'Cas 01 — De la recherche en ligne aux services',
  '/conseil/remuneration': 'Cas 01 — Aborder la rémunération',
  '/design-system': 'Design system & prototypage',
  '/plan-seo': 'SEO / GEO : quelques pistes',
}

const LEGACY: Record<string, string> = {
  '/cas-1': '/cas-02-ab-test',
  '/cas-2': '/cas-03-inscription',
  '/cas-2/prochaines-etapes': '/cas-03-inscription/services-selectionnes',
  '/cas-03-inscription/prochaines-etapes': '/cas-03-inscription/services-selectionnes',
  '/cas-3': '/cas-01-seo',
  '/sources': '/design-system',
}

function legacyTarget(route: Route): string | null {
  const to = LEGACY[route.path]
  if (!to) return null
  const q = route.query.toString()
  return `${to}${q ? `?${q}` : ''}${route.anchor ? `#${route.anchor}` : ''}`
}

export default function App() {
  const route = useRoute()
  const { path, anchor } = route
  const firstLoad = useRef(true)
  const prevPath = useRef<string | null>(null)

  // Défilement et focus à chaque changement de page ou d'ancre.
  useEffect(() => {
    const section = path.startsWith('/service/') ? 'Fiche service' : path.startsWith('/reserver/') ? 'Réservation' : TITLES[path] ?? 'Page'
    // Le nom de la candidate n'apparaît que sur les pages du portfolio, jamais sur les écrans du prototype.
    const portfolio = path === '/' || path === '/plan-seo' || path === '/design-system'
    document.title = portfolio ? `${section} · Portfolio de Caroline Camilleri` : `${section} · Portfolio de candidature`

    const isFirst = firstLoad.current
    firstLoad.current = false
    // Même page, ancre retirée : on ne remonte pas en haut (les modules gèrent leur propre défilement).
    const samePage = prevPath.current === path
    prevPath.current = path
    if (samePage && !anchor) return
    requestAnimationFrame(() => {
      if (anchor) {
        const el = document.getElementById(anchor)
        if (el) {
          el.scrollIntoView({ block: 'start' })
          if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
          el.focus({ preventScroll: true })
          return
        }
      }
      window.scrollTo(0, 0)
      if (!isFirst) document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
    })
  }, [path, anchor])

  // Anciennes adresses (avant la renumérotation des cas) : redirection sans casser les liens partagés.
  const legacy = legacyTarget(route)
  useEffect(() => {
    if (legacy) navigate(legacy, { replace: true })
  }, [legacy])
  if (legacy) return null

  let page: React.ReactNode
  const service = path.match(/^\/service\/([\w-]+)$/)
  const booking = path.match(/^\/reserver\/([\w-]+)$/)
  if (path === '/') page = <Home />
  else if (path === '/cas-02-ab-test') page = <Case1 route={route} />
  else if (path === '/espace') page = <Espace path={path} />
  else if (path === '/cas-03-inscription') page = <Case2 path={path} />
  else if (path === '/cas-03-inscription/services-selectionnes') page = <NextSteps path={path} />
  else if (path === '/cas-01-seo') page = <Case3 path={path} />
  else if (path === '/conseil/remuneration') page = <Remuneration path={path} />
  else if (path === '/design-system') page = <DesignSystem />
  else if (path === '/plan-seo') page = <SeoPlan route={route} />
  else if (service) page = <ServicePage key={service[1]} id={service[1]} route={route} />
  else if (booking) page = <BookingPage key={booking[1]} id={booking[1]} route={route} />
  else page = <NotFound />

  return page
}
