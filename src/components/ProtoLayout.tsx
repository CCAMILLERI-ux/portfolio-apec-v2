import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { Link, useRoute } from '../lib/router'
import { resetAll } from '../lib/storage'
import { Coulisses } from './Coulisses'
import { RdvPanel } from './RdvPanel'
import { ArrowLeft, ArrowRight, Calendar, Close, Grid, Info, Menu, Reset, User } from './Icons'

const PROTO_NAV = [
  { to: '/espace', label: 'Mon espace' },
  { to: '/cas-02-ab-test', label: 'Nos services' },
]

interface Props {
  path: string
  /** Nom du cas affiché dans la barre de démo (hors maquette). */
  caseLabel: string
  children: ReactNode
  /** Explications du prototype : section « Coulisses », en bas de page. */
  coulisses: ReactNode
  /** Texte court seul (sans plan d'événements ni mode d'emploi). */
  coulissesMinimal?: boolean
  events: string[]
  /** Commande de démo (ex. choix de la variante), dans la barre du haut. */
  barControl?: ReactNode
  /** Rappel contextuel (ex. réservation simulée), dans la barre du haut. */
  barNotice?: string
  onReset?: () => void
  /** Bloc d'introduction compact, hors maquette, sous la barre de démo. */
  intro?: { kicker: string; title: string; text: string; note?: string }
}

/**
 * Habillage des prototypes.
 * - En haut, HORS maquette : barre de démo (retour portfolio, cas, variante, réinitialiser, explications).
 * - Au centre : la maquette utilisateur, inspirée d'apec.fr, sans aucune explication.
 * - En bas : « Coulisses du prototype » (méthode, provenance, journal).
 */
export function ProtoLayout({ path, caseLabel, children, coulisses, coulissesMinimal = false, events, barControl, barNotice, onReset, intro }: Props) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('')

  // Hauteurs des éléments collants (barre de démo, introduction) : exposées en variables CSS
  // pour empiler l'introduction sous la barre et décaler les ancres d'autant.
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = document.documentElement
    const update = () => root.style.setProperty('--sticky-h', `${barRef.current?.offsetHeight ?? 0}px`)
    update()
    const ro = new ResizeObserver(update)
    if (barRef.current) ro.observe(barRef.current)
    return () => {
      ro.disconnect()
      root.style.setProperty('--sticky-h', '0px')
    }
  }, [])

  // Les coulisses ne sont affichées qu'à la demande ; à l'ouverture, on y descend.
  const [explain, setExplain] = useState(false)
  const [rdvOpen, setRdvOpen] = useState(false)
  // « Nos services » : vue Tous, en conservant la variante affichée (vue) si elle est dans l'adresse.
  const route = useRoute()
  const vue = route.query.get('vue')
  const servicesHref = `/cas-02-ab-test?${new URLSearchParams({ situation: 'tous', ...(vue ? { vue } : {}) })}`
  const rdvBtn = useRef<HTMLButtonElement>(null)
  /** Élément qui a ouvert le panneau (bouton de l'en-tête ou lien d'une page) : le focus y revient. */
  const rdvTrigger = useRef<HTMLElement | null>(null)
  const closeRdv = useCallback((restoreFocus = true) => {
    setRdvOpen(false)
    if (restoreFocus) window.setTimeout(() => (rdvTrigger.current ?? rdvBtn.current)?.focus(), 0)
  }, [])
  // Une page peut ouvrir le panneau (ex. « Mon espace ») : window.dispatchEvent(new Event('open-rdv-panel')).
  useEffect(() => {
    const open = () => {
      rdvTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      setRdvOpen(true)
    }
    window.addEventListener('open-rdv-panel', open)
    return () => window.removeEventListener('open-rdv-panel', open)
  }, [])
  const toggleExplain = () => {
    if (explain) {
      setExplain(false)
      return
    }
    flushSync(() => setExplain(true))
    const el = document.getElementById('coulisses')
    el?.scrollIntoView({ block: 'start' })
    el?.focus({ preventScroll: true })
  }

  return (
    <div className="proto">
      <a className="skip-link" href="#contenu" onClick={(e) => {
        e.preventDefault()
        document.getElementById('contenu')?.focus()
      }}>
        Aller à la maquette
      </a>

      <div className="demo-bar" ref={barRef} role="region" aria-label="Commandes de la démo (hors maquette)">
        <div className={`demo-bar__inner${barControl ? ' demo-bar__inner--control' : ''}`}>
          <span className="demo-bar__left">
            <Link to="/" className="demo-bar__btn demo-bar__btn--back">
              <ArrowLeft size={16} /> <span className="visually-hidden">Retour au </span>Portfolio
            </Link>
            <span className="demo-bar__case">{caseLabel}</span>
          </span>
          {barControl}
          <span className="demo-bar__actions">
            <button
              type="button"
              className={`demo-bar__btn${explain ? ' is-active' : ''}`}
              aria-expanded={explain}
              aria-controls="coulisses"
              title={explain ? 'Masquer les explications' : 'Comprendre ce cas'}
              onClick={toggleExplain}
            >
              <Info size={16} />
              <span className="demo-bar__lbl">{explain ? 'Masquer les explications' : 'Comprendre ce cas'}</span>
            </button>
            <button
              type="button"
              className="demo-bar__btn"
              title="Réinitialiser la démo"
              onClick={() => {
                resetAll()
                onReset?.()
                setStatus('Démo réinitialisée.')
                window.setTimeout(() => setStatus(''), 4000)
              }}
            >
              <Reset size={16} />
              <span className="demo-bar__lbl">Réinitialiser<span className="demo-bar__hide-md"> la démo</span></span>
            </button>
          </span>
          {intro && (
            <div className="demo-bar__intro" role="note">
              <span className="demo-bar__kicker">{intro.kicker}</span>
              <h2 className="demo-bar__title">{intro.title}</h2>
              <span className="demo-bar__text">{intro.text}</span>
              {intro.note && <span className="demo-bar__note">{intro.note}</span>}
            </div>
          )}
          {(barNotice || status) && (
            <span className="demo-bar__notice" role="status">{status || barNotice}</span>
          )}
        </div>
      </div>

      <div className="maquette">
        <header className="proto-header">
          <div className="container proto-header__inner">
            <button
              type="button"
              className="proto-menu-btn"
              aria-expanded={open}
              aria-controls="proto-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <Close /> : <Menu />} <span>Menu</span>
            </button>
            <span className="proto-header__right">
              <Link
                to={servicesHref}
                className="proto-account"
                aria-label="Nos services"
                aria-current={path === '/cas-02-ab-test' ? 'page' : undefined}
              >
                <Grid size={22} /> <span>Nos services</span>
              </Link>
              <button
                ref={rdvBtn}
                type="button"
                className="proto-account proto-account--btn"
                aria-haspopup="dialog"
                aria-expanded={rdvOpen}
                onClick={() => { rdvTrigger.current = rdvBtn.current; setRdvOpen(true) }}
                aria-label="Prendre rendez-vous"
              >
                <Calendar size={22} /> <span>Prendre rendez-vous</span>
              </button>
              <Link to="/espace" className="proto-account" aria-label="Mon espace" aria-current={path === '/espace' ? 'page' : undefined}>
                <User size={22} /> <span>Mon espace</span>
              </Link>
            </span>
          </div>
          <nav id="proto-menu" className={`proto-menu${open ? ' is-open' : ''}`} aria-label="Menu">
            <ul className="container">
              {PROTO_NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} aria-current={path === n.to ? 'page' : undefined} onClick={() => setOpen(false)}>
                    {n.label} <ArrowRight size={18} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main id="contenu" tabIndex={-1}>{children}</main>

        <footer className="proto-footer">
          <div className="container">
            <ul className="proto-footer__links">
              <li><Link to="/espace">Mon espace</Link></li>
              <li><Link to="/cas-02-ab-test">Nos services</Link></li>
            </ul>
          </div>
        </footer>
      </div>

      <Coulisses events={events} hidden={!explain} minimal={coulissesMinimal}>{coulisses}</Coulisses>
      {rdvOpen && <RdvPanel onClose={closeRdv} />}
    </div>
  )
}
