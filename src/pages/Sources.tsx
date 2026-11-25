import { ArrowRight, External } from '../components/Icons'
import { PortfolioLayout } from '../components/PortfolioLayout'
import { SOURCES } from '../data/conseilEntretien'
import {
  OFFICIAL_CANDIDATE_URL,
  OFFICIAL_RECRUITER_URL,
  OFFICIAL_SERVICES_URL,
  OFFICIAL_TOOLS_URL,
} from '../data/services'
import { Link } from '../lib/router'

const N = ' '

const OFFICIAL = [
  { label: 'Espace candidat', url: OFFICIAL_CANDIDATE_URL },
  { label: 'Espace recruteur', url: OFFICIAL_RECRUITER_URL },
  { label: 'Tous nos services', url: OFFICIAL_SERVICES_URL },
  { label: 'Tous nos outils', url: OFFICIAL_TOOLS_URL },
]

/** Sources et mentions (anciennement « Design system & prototypage », #/design-system redirige ici). */
export function Sources() {
  const studies = SOURCES.filter((s) => s.publisher === 'Apec')

  return (
    <PortfolioLayout>
      <section className="pf-hero pf-hero--compact">
        <div className="pf-container">
          <h1 className="pf-hero__title" tabIndex={-1}>Sources et mentions</h1>
          <p className="pf-hero__lead">
            Les prototypes de ce portfolio s’appuient sur un mini design system, construit à partir des styles d’apec.fr.
            Le code a été généré avec l’aide de l’IA (Claude{N}Code), à partir de choix de conception et de contenus définis
            en amont, puis{N}relus.
          </p>
        </div>
      </section>

      <div className="pf-container pf-section ds-page">
        <aside className="ds-sources" aria-labelledby="sources">
          <h2 id="sources" className="ds-sources__title">Sources</h2>
          <p><strong>Services de l’Apec{N}:</strong> intitulés et descriptions repris des pages officielles d’apec.fr, sans reproduire les{N}outils.</p>
          <ul className="ds-sources__links">
            {OFFICIAL.map((o) => (
              <li key={o.url}>
                <a href={o.url} target="_blank" rel="noopener noreferrer">
                  {o.label} <External size={14} /><span className="visually-hidden"> (apec.fr, nouvel onglet)</span>
                </a>
              </li>
            ))}
          </ul>
          <p><strong>Études de l’Apec citées (cas{N}01){N}:</strong></p>
          <ul className="ds-sources__studies">
            {studies.map((s) => (
              <li key={s.id}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    «{N}{s.label.replace(' 4e ', ' 4ᵉ ')}{N}»<span className="visually-hidden"> (site externe, nouvel onglet)</span>
                  </a>
                ) : <>«{N}{s.label}{N}»</>}
                , {s.date}.
              </li>
            ))}
          </ul>
          <p>
            Polices Montserrat, Inter et Plus Jakarta Sans sous SIL Open Font License. Photographies Unsplash, sous{' '}
            <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">
              licence{N}Unsplash<span className="visually-hidden"> (site externe, nouvel onglet)</span>
            </a>.
          </p>
          <p className="ds-sources__note">
            Portfolio de candidature indépendant, sans affiliation officielle à l’Apec{N}: aucune inscription réelle,
            aucune donnée collectée, pages non{N}indexées.
          </p>
        </aside>
        <Link to="/" className="pf-link">Revenir à l’accueil <ArrowRight size={16} /></Link>
      </div>
    </PortfolioLayout>
  )
}
