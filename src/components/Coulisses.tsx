import type { ReactNode } from 'react'
import { Link } from '../lib/router'
import { EventLog } from './EventLog'

/** Pied de page « Coulisses du prototype » : seul endroit où le prototype s'explique. */
/** Dernière phrase de chaque « Comprendre ce cas » : une proposition, à affiner avec les équipes concernées. */
export const BINOME = 'Une piste à affiner avec les chefs de produit et le webanalyste.'

export function Coulisses({ events, hidden, minimal = false, end, children }: { events: string[]; hidden?: boolean; minimal?: boolean; end?: ReactNode; children: ReactNode }) {
  return (
    <section id="coulisses" className="coulisses" tabIndex={-1} aria-labelledby="coulisses-titre" hidden={hidden}>
      <div className="pf-container">
        <h2 id="coulisses-titre" className="coulisses__title">Coulisses du prototype</h2>
        {!minimal && <>
        <p className="coulisses__lead">
          Une proposition, conçue comme une piste à discuter avec l’équipe, en complément de{'\u00a0'}l’existant.
        </p>
        <p className="coulisses__hint">
          Retour au portfolio, réinitialisation et fermeture de ces explications : barre en haut de page.{' '}
          <Link to="/sources" className="pf-link">Sources et mentions</Link>
        </p>
        </>}

        <div className="coulisses__content">{children}</div>

        {!minimal && <section className="cr-block cr-block--wide">
          <h3>Plan d’événements de la démo</h3>
          <p>
            Événements prévus ici : {events.map((e, i) => (
              <span key={e}>{i > 0 && ', '}<code>{e}</code></span>
            ))}.
            Ce journal illustre le plan de marquage : ce ne sont <strong>pas</strong> des résultats d’expérimentation.
          </p>
          <EventLog />
        </section>}

        <p className={`coulisses__binome${minimal ? ' coulisses__binome--plain' : ''}`}>{BINOME.replace(/ (\S+)$/, '\u00a0$1')}</p>
        {end && <p className="coulisses__end">{end}</p>}
      </div>
    </section>
  )
}

export interface CroRubrics {
  constat: ReactNode
  hypothese: ReactNode
  modification: ReactNode
  kpi: ReactNode
  equipes: ReactNode
}

const LABELS: [keyof CroRubrics, string][] = [
  ['constat', '1. Besoin utilisateur'],
  ['hypothese', '2. Hypothèse à tester avec l’équipe'],
  ['modification', '3. Piste proposée'],
  ['kpi', '4. KPI et garde-fous'],
  ['equipes', '5. Équipes à associer'],
]

export function CroGrid({ rubrics }: { rubrics: CroRubrics }) {
  return (
    <div className="cr-grid">
      {LABELS.map(([key, label]) => (
        <section key={key} className="cr-block">
          <h3>{label}</h3>
          <div>{rubrics[key]}</div>
        </section>
      ))}
    </div>
  )
}

/** Bloc libre des coulisses. */
export function CrBlock({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <section className="cr-block cr-block--wide">
      <h3>{title}</h3>
      {children}
    </section>
  )
}
