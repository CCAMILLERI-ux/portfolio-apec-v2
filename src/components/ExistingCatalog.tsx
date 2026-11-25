import { useId, useState } from 'react'
import { SERVICES, type Service } from '../data/services'
import { Link } from '../lib/router'
import { track } from '../lib/storage'
import { nb } from '../lib/text'
import { Search } from './Icons'
import { serviceActionLabel, serviceActionTarget } from './ServiceCard'

/** Recherche sans tenir compte des accents ni de la casse. */
const fold = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/**
 * « Version actuelle » du cas 02 : reproduction de la présentation de la page « Tous nos services »
 * d'apec.fr — bandeau avec recherche, onglet « Tous nos services », cartes sur deux colonnes par ordre
 * alphabétique (intitulé, phrase de présentation, « En savoir plus » et action). Les outils sont sur
 * une autre page d'apec.fr (« Tous nos outils ») : ils n'apparaissent pas ici.
 */
export function ExistingCatalog({ onlyWorkshops }: { onlyWorkshops: boolean }) {
  const [query, setQuery] = useState('')
  const inputId = useId()
  const all = SERVICES.filter((s) => s.kind !== 'outil' && (!onlyWorkshops || s.kind === 'atelier'))
    .sort((a, b) => a.officialTitle.localeCompare(b.officialTitle, 'fr', { sensitivity: 'base' }))
  const q = fold(query.trim())
  const list = q ? all.filter((s) => fold(`${s.officialTitle} ${s.observedSummary ?? ''}`).includes(q)) : all
  const tab = onlyWorkshops ? 'Ateliers' : 'Tous nos services'

  return (
    <>
      <div className="cat-band">
        <div className="container">
          <h1 className="cat-band__title" tabIndex={-1}>
            <Search size={40} className="cat-band__icon" /> Tous les services Apec
          </h1>
          <form className="cat-search" role="search" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor={inputId} className="visually-hidden">Rechercher un service</label>
            <input id={inputId} type="search" className="cat-search__input" placeholder="Rechercher un service"
              value={query} onChange={(e) => setQuery(e.target.value)} />
            <button type="submit" className="btn btn--primary cat-search__btn">Rechercher <Search size={18} /></button>
          </form>
        </div>
      </div>

      <div className="container cat-body">
        <h2 className="cat-tab">{tab} <span className="cat-tab__count">({list.length})</span></h2>
        <p className="visually-hidden" role="status" aria-live="polite">{q ? `${list.length} résultats pour « ${query.trim()} ».` : ''}</p>
        {list.length === 0 ? (
          <p className="cat-empty">Aucun service ne correspond à votre recherche.</p>
        ) : (
          <ul className="cat-grid">
            {list.map((s) => <li key={s.id}><CatalogCard service={s} anchor={onlyWorkshops ? `atelier-${s.id}` : undefined} /></li>)}
          </ul>
        )}
      </div>
    </>
  )
}

function CatalogCard({ service, anchor }: { service: Service; anchor?: string }) {
  return (
    <article id={anchor} tabIndex={anchor ? -1 : undefined} className="cat-card">
      <h3 className="cat-card__title">{nb(service.officialTitle)}</h3>
      {service.observedSummary && <p className="cat-card__text">{nb(service.observedSummary)}</p>}
      <div className="cat-card__actions">
        <Link to={`/service/${service.id}?from=cas-1`} className="btn cat-card__more">
          En savoir plus<span className="visually-hidden"> : {service.officialTitle}</span>
        </Link>
        <Link to={serviceActionTarget(service, 'cas-1')} className="btn btn--primary"
          onClick={() => track('service_cta_click', `${service.id} (version actuelle)`)}>
          {serviceActionLabel(service)}<span className="visually-hidden"> : {service.officialTitle}</span>
        </Link>
      </div>
    </article>
  )
}
