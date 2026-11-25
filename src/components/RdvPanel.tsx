import { useEffect, useRef, useState } from 'react'
import { getService } from '../data/services'
import { ateliersHref } from '../data/ateliers'
import { FAR_SLOT_DAYS, RDV_NEEDS, RDV_START, RDV_START_ID, type RdvMotif, type RdvNeed, type RdvNeedId } from '../data/rendezVous'
import { SITUATION_ICON, SITUATIONS } from '../data/situations'
import { navigate, useRoute } from '../lib/router'
import { track } from '../lib/storage'
import { nb } from '../lib/text'
import { ArrowRight, Close } from './Icons'

/** Intitulé de la situation, lu dans situations.ts (même vocabulaire que « Nos services »). */
const labelOf = (id: RdvNeedId) => SITUATIONS.find((s) => s.id === id)!.label
const START_LABEL = 'Je ne sais pas par où commencer'

/** Lien vers les ateliers : vue « Tous » du cas 02 filtrée sur le format Atelier, variante photos. */
const WORKSHOPS = ateliersHref()
const RECRUITERS_LABEL = 'Pour les recruteurs'
const CANDIDATE_NEEDS = RDV_NEEDS.filter((n) => n.audience === 'candidat')
const RECRUITER_NEEDS = RDV_NEEDS.filter((n) => n.audience === 'recruteur')

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Panneau « Prendre un rendez-vous individuel » : 24 motifs officiels de rendez-vous individuels
 * (16 candidats, 8 recruteurs), regroupés selon les situations de « Nos services ».
 * Les ateliers ne sont pas des rendez-vous : ils sont seulement signalés, en complément.
 * Fenêtre modale accessible : focus sur le titre à l'ouverture, piégé dans le panneau,
 * rendu au bouton d'origine à la fermeture, fermeture avec Échap.
 */
export function RdvPanel({ onClose }: { onClose: (restoreFocus?: boolean) => void }) {
  const route = useRoute()
  // Ouvert depuis « Nos services » avec une situation choisie : même situation présélectionnée.
  const fromServices = route.path === '/cas-02-ab-test' ? route.query.get('situation') : null
  const initial = RDV_NEEDS.find((n) => n.id === fromServices)?.id ?? RDV_NEEDS[0].id
  const [need, setNeed] = useState<RdvNeedId>(initial)
  const [showAll, setShowAll] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const toggled = useRef(false)
  // Ouverture : focus sur le premier séparateur ; fermeture : focus rendu au bouton.
  useEffect(() => {
    if (!toggled.current) { toggled.current = true; return }
    if (showAll) document.getElementById(`rdv-g-${RDV_NEEDS[0].id}`)?.focus()
    else toggleRef.current?.focus()
  }, [showAll])
  const panelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const current = RDV_NEEDS.find((n) => n.id === need)!

  useEffect(() => {
    titleRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose() }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || active === titleRef.current)) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus() }
      else if (!panelRef.current.contains(active)) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const choose = (serviceId: string) => {
    track('booking_start', `${serviceId} (panneau rendez-vous)`)
    onClose(false)
    navigate(`/reserver/${serviceId}?from=espace`)
  }

  /** Atelier équivalent, proposé sous un motif dont le prochain créneau est éloigné. */
  const openWorkshop = (serviceId: string) => {
    track('service_cta_click', `${serviceId} (atelier plus tôt, panneau rendez-vous)`)
    onClose(false)
    navigate(ateliersHref(serviceId))
  }

  const start = getService(RDV_START_ID)!

  return (
    <div className="rdv-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div ref={panelRef} className="rdv" role="dialog" aria-modal="true" aria-labelledby="rdv-titre">
        <div className="rdv__head">
          <h2 id="rdv-titre" ref={titleRef} tabIndex={-1} className="rdv__title">Prendre un <span className="nowrap">rendez-vous</span> individuel</h2>
          <button type="button" className="rdv__close" onClick={() => onClose()}>
            <Close size={20} /> <span>Fermer</span>
          </button>
        </div>
        <div className="rdv__body">
          <p className="rdv__lead">Un échange en tête-à-tête avec un consultant Apec, sur le sujet de votre{' '}choix.</p>

          {/* Vue par défaut (situations, porte d'entrée, motifs filtrés) et vue complète s'excluent : aucun motif en double. */}
          {!showAll && (
            <>
          <fieldset className="rdv-needs">
            <legend className="rdv__step">1. Quel est votre besoin{' '}?</legend>
            <div className="rdv-needs__wrap">
            <div className="rdv-needs__grid">
              {CANDIDATE_NEEDS.map((n) => <NeedTile key={n.id} need={n} selected={need === n.id} onSelect={setNeed} />)}
            </div>
            <p className="rdv-audience" aria-hidden="true">{RECRUITERS_LABEL}</p>
            <div className="rdv-needs__grid rdv-needs__grid--recruiter">
              {RECRUITER_NEEDS.map((n) => <NeedTile key={n.id} need={n} selected={need === n.id} onSelect={setNeed} recruiter />)}
            </div>
            </div>
          </fieldset>

          {current.audience === 'candidat' && <div className="rdv-start">
            <p className="rdv-start__title">{START_LABEL}</p>
            <p className="rdv-start__text">Un consultant fait le point avec vous et vous oriente vers le bon{' '}accompagnement.</p>
            <button type="button" className="btn btn--primary btn--sm" onClick={() => choose(RDV_START_ID)}>
              Choisir le {start.officialTitle.toLowerCase()}
            </button>
          </div>}

          <section className="rdv-step" aria-labelledby="rdv-etape-2">
            <h3 id="rdv-etape-2" className="rdv__step">2. Choisissez votre rendez-vous</h3>
            <p className="visually-hidden" role="status" aria-live="polite">
              {`${current.motifs.length} motifs de rendez-vous pour : ${labelOf(current.id)}.`}
            </p>
            <MotifList motifs={current.motifs} onChoose={choose} onWorkshop={openWorkshop} />
          </section>

            </>
          )}

          <div className="rdv-more">
            <button ref={toggleRef} type="button" className="rdv-more__toggle" aria-expanded={showAll} aria-controls="rdv-tous" onClick={() => setShowAll((v) => !v)}>
              {showAll ? 'Masquer les motifs de rendez-vous' : 'Voir tous les motifs de rendez-vous'}
              <ArrowRight size={18} className={`rdv-more__chev${showAll ? ' is-open' : ''}`} />
            </button>
            <div id="rdv-tous" hidden={!showAll}>
              {showAll && CANDIDATE_NEEDS.map((n) => (
                <section key={n.id} className="rdv-group" aria-labelledby={`rdv-g-${n.id}`}>
                  <h3 id={`rdv-g-${n.id}`} className="rdv-group__title" tabIndex={-1}>{labelOf(n.id)}</h3>
                  <MotifList motifs={n.motifs} onChoose={choose} onWorkshop={openWorkshop} level={4} />
                </section>
              ))}
              {showAll && <section className="rdv-group" aria-labelledby="rdv-g-debut">
                <h3 id="rdv-g-debut" className="rdv-group__title">{START_LABEL}</h3>
                <MotifList motifs={[RDV_START]} onChoose={choose} onWorkshop={openWorkshop} level={4} />
              </section>}
              {showAll && <p className="rdv-audience rdv-audience--sep">{RECRUITERS_LABEL}</p>}
              {showAll && RECRUITER_NEEDS.map((n) => (
                <section key={n.id} className="rdv-group" aria-labelledby={`rdv-g-${n.id}`}>
                  <h3 id={`rdv-g-${n.id}`} className="rdv-group__title" tabIndex={-1}>{labelOf(n.id)}</h3>
                  <MotifList motifs={n.motifs} onChoose={choose} onWorkshop={openWorkshop} level={4} />
                </section>
              ))}
            </div>
          </div>

          <p className="rdv-workshops">
            Vous préférez échanger en groupe{' '}?{' '}
            <a href={`#${WORKSHOPS}`} onClick={() => onClose(false)}>Découvrir les ateliers</a>
          </p>
        </div>
      </div>
    </div>
  )
}

/** Liste compacte des motifs (format de ligne de la piste 2 du cas 02). */
function MotifList({ motifs, onChoose, onWorkshop, level = 4 }: { motifs: RdvMotif[]; onChoose: (id: string) => void; onWorkshop: (id: string) => void; level?: 4 | 5 }) {
  const H = `h${level}` as 'h4' | 'h5'
  return (
    <ul className="dlist rdv-list">
      {motifs.map((mo) => {
        const s = getService(mo.serviceId)!
        return (
          <li key={mo.serviceId} className="drow rdv-row">
            <div className="drow__main">
              <H className="drow__title">{nb(s.officialTitle)}</H>
              <p className="drow__ideal"><strong>Idéal si</strong> {nb(mo.ideal)}</p>
              {mo.workshopId && mo.nextSlotInDays > FAR_SLOT_DAYS && (
                <p className="rdv-row__workshop">
                  <a href={`#${ateliersHref(mo.workshopId)}`} onClick={(e) => { e.preventDefault(); onWorkshop(mo.workshopId!) }}>
                    Un atelier sur ce sujet a lieu plus{'\u00a0'}tôt
                    <span className="visually-hidden"> : {getService(mo.workshopId)!.officialTitle}</span>
                  </a>
                </p>
              )}
            </div>
            <div className="drow__foot">
              {mo.tag && <p className="drow__format">{mo.tag}</p>}
              <div className="drow__action">
                <button type="button" className="btn btn--primary btn--sm" onClick={() => onChoose(mo.serviceId)} aria-label={`Choisir : ${s.officialTitle}`}>
                  Choisir
                </button>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

/** Tuile de situation du panneau (même composant visuel que « Nos services »). */
function NeedTile({ need, selected, onSelect, recruiter = false }: { need: RdvNeed; selected: boolean; onSelect: (id: RdvNeedId) => void; recruiter?: boolean }) {
  const Icon = SITUATION_ICON[need.id]
  return (
    <label className={`sit-tile rdv-tile${recruiter ? ' rdv-tile--recruiter' : ''}${selected ? ' is-selected' : ''}`}>
      <input type="radio" name="rdv-besoin" value={need.id} checked={selected} onChange={() => onSelect(need.id)} className="visually-hidden" />
      <Icon size={30} className="sit-tile__icon" />
      <span className="sit-tile__label">{nb(labelOf(need.id))}{recruiter && <span className="visually-hidden"> ({RECRUITERS_LABEL.toLowerCase()})</span>}</span>
    </label>
  )
}
