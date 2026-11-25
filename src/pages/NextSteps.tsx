import { useRef, useState } from 'react'
import { Case2Coulisses, CASE2_EVENTS } from '../components/Case2Coulisses'
import { isBookable, ProgramAction, selectionCounts, selectionSummary } from '../components/ProgramAction'
import { ArrowLeft, ArrowRight } from '../components/Icons'
import { PageBand } from '../components/PageBand'
import { ProtoLayout } from '../components/ProtoLayout'
import { KindTag, KIND_TONE } from '../components/ServiceCard'
import { getService } from '../data/services'
import { INITIAL_ONBOARDING, useBookings, useOnboarding } from '../lib/demoState'
import { Link, navigate } from '../lib/router'
import { nb } from '../lib/text'

/** « Mes services sélectionnés » (cas 03) : à réserver, réservés, outils à utiliser. */
export function NextSteps({ path }: { path: string }) {
  const [state, setState] = useOnboarding()
  const [bookings] = useBookings()
  const [status, setStatus] = useState('')
  const summaryRef = useRef<HTMLParagraphElement>(null)

  // La sélection composée dans le parcours guidé ; les services retirés restent rétablissables.
  const kept = state.program
  const removed = state.removed.filter((id) => !kept.includes(id))
  const hasBooking = kept.some((id) => bookings[id])
  const counts = selectionCounts(kept, bookings, getService)

  const services = kept.map(getService).filter((s) => !!s)
  const groups = [
    { id: 'a-reserver', title: 'À réserver', items: services.filter((s) => isBookable(s) && !bookings[s.id]) },
    { id: 'reserves', title: 'Réservés', items: services.filter((s) => isBookable(s) && bookings[s.id]) },
    { id: 'outils', title: 'Outils à utiliser', items: services.filter((s) => !isBookable(s)) },
  ].filter((g) => g.items.length > 0)

  const remove = (id: string) => {
    setState((s) => ({ ...s, program: s.program.filter((x) => x !== id), removed: [...s.removed.filter((x) => x !== id), id] }))
    setStatus(`${getService(id)?.officialTitle} retiré de votre sélection.`)
    summaryRef.current?.focus()
  }
  const restore = (id: string) => {
    setState((s) => ({ ...s, program: [...s.program, id], removed: s.removed.filter((x) => x !== id) }))
    setStatus(`${getService(id)?.officialTitle} rétabli dans votre sélection.`)
  }

  return (
    <ProtoLayout
      path={path}
      caseLabel="Cas 03 · Un parcours guidé vers les services"
      events={CASE2_EVENTS}
      barNotice={hasBooking ? 'Démonstration : aucune inscription réelle.' : undefined}
      onReset={() => setState(INITIAL_ONBOARDING)}
      coulisses={<Case2Coulisses />}
    >
      <PageBand back={{ to: '/espace', label: 'Mon espace' }} title="Mes services sélectionnés" />
      <div className="container overlap">
        <div className="sheet sheet--narrow">
          <p className="visually-hidden" role="status" aria-live="polite">{status}</p>

          {kept.length === 0 ? (
            <div className="empty">
              <p>Vous n’avez pas encore sélectionné de{' '}service.</p>
              <button type="button" className="btn btn--primary" onClick={() => {
                setState((s) => ({ ...s, step: s.answers.needs.length ? 'needs' : 'welcome' }))
                navigate('/cas-03-inscription')
              }}>
                Me guider
              </button>
            </div>
          ) : (
            <>
              <p ref={summaryRef} tabIndex={-1} className="sel-summary" aria-live="polite">
                <strong>{kept.length}{' '}service{kept.length > 1 ? 's' : ''} sélectionné{kept.length > 1 ? 's' : ''}.</strong>{' '}
                {selectionSummary(counts)}
              </p>
              {groups.map((g) => (
                <section key={g.id} className="sel-group" aria-labelledby={`sel-${g.id}`}>
                  <h2 id={`sel-${g.id}`} className="sel-group__title">
                    {g.title} <span className="sel-group__count">({g.items.length})</span>
                  </h2>
                  <ul className="next-list">
                    {g.items.map((s) => (
                      <li key={s.id} id={`row-${s.id}`} tabIndex={-1} className={`next-item next-item--${KIND_TONE[s.kind]}`}>
                        <div className="next-item__tag"><KindTag kind={s.kind} /></div>
                        <div className="next-item__main">
                          <h3 className="next-item__title">{nb(s.officialTitle)}</h3>
                          <p className="muted">{nb(s.hook)}</p>
                          <div className="next-item__actions">
                            {/* Même logique que l'écran Confirmation : la date si réservé, sinon l'action du service. */}
                            <ProgramAction service={s} slot={bookings[s.id]} from="etapes" />
                            <Link to={`/service/${s.id}?from=etapes`} className="link-arrow">
                              En savoir plus<span className="visually-hidden"> : {s.officialTitle}</span> <ArrowRight size={16} />
                            </Link>
                            <button type="button" className="btn btn--link btn--sm" onClick={() => remove(s.id)}>
                              Retirer<span className="visually-hidden"> {s.officialTitle}</span>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </>
          )}

          {removed.length > 0 && (
            <div className="removed">
              <h2 className="h3-like">Retirés</h2>
              <ul>
                {removed.map((id) => (
                  <li key={id}>
                    {getService(id)?.officialTitle}{' '}
                    <button type="button" className="btn btn--link btn--sm" onClick={() => restore(id)}>
                      Rétablir<span className="visually-hidden"> {getService(id)?.officialTitle}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="step__actions step__actions--wrap">
            <button type="button" className="btn btn--outline" onClick={() => {
              setState((s) => ({ ...s, step: 'needs' }))
              navigate('/cas-03-inscription')
            }}>
              Modifier mes besoins
            </button>
            {state.recs.length > 0 && (
              <button type="button" className="btn btn--outline" onClick={() => {
                setState((s) => ({ ...s, step: 'results' }))
                navigate('/cas-03-inscription')
              }}>
                Reprendre le guidage
              </button>
            )}
            <Link to="/cas-02-ab-test" className="link-arrow">Voir tous nos services <ArrowRight size={18} /></Link>
          </div>
          <div className="step__actions step__actions--back">
            <Link to="/espace" className="btn btn--outline"><ArrowLeft size={18} /> Retour à mon espace</Link>
          </div>
        </div>
      </div>
    </ProtoLayout>
  )
}
