import { useEffect, useState } from 'react'
import { Badge } from '../components/Badge'
import { CrBlock } from '../components/Coulisses'
import { ArrowRight, Laptop, Plus } from '../components/Icons'
import { Modalities } from '../components/Modalities'
import { PageBand } from '../components/PageBand'
import { ProtoLayout } from '../components/ProtoLayout'
import { ServiceAction, ServiceVisual } from '../components/ServiceCard'
import { getService, KIND_LABEL, type Service } from '../data/services'
import { backFor, caseLabelFor, safeFrom } from '../lib/nav'
import { Link, type Route } from '../lib/router'
import { track } from '../lib/storage'
import { nb } from '../lib/text'
import { NotFound } from './NotFound'

/** Liens contextuels de la colonne latérale — différents selon le service. */
const RELATED: Record<string, { to: string; anchor?: string; label: string; text: string; tone: 'blue' | 'navy' }[]> = {
  'atelier-entretiens': [
    { to: '/cas-01-seo', anchor: 'etapes', label: 'Lire nos conseils pour préparer votre séance', text: 'Arriver à l’atelier avec vos exemples déjà repérés.', tone: 'blue' },
  ],
  'entretien-programme': [
    { to: '/service/simulateur-entretien?from=cas-3', label: 'S’entraîner seul avant le rendez-vous', text: 'Le simulateur d’entretien, en autonomie.', tone: 'navy' },
    { to: '/cas-01-seo', anchor: 'checklist', label: 'Checklist de la veille de l’entretien', text: 'Les points à contrôler avant le jour J.', tone: 'blue' },
  ],
  'simulateur-entretien': [
    { to: '/service/entretien-programme?from=cas-3', label: 'Un entretien fixé ? Répétez-le avec un consultant', text: 'Simulation individuelle avec un consultant.', tone: 'blue' },
  ],
  'jeunes-diplomes-confiance': [
    { to: '/service/remuneration-premier-emploi?from=cas-3', label: 'Aborder la rémunération pour un 1er emploi', text: 'Un atelier pour discuter et négocier son salaire de premier emploi.', tone: 'blue' },
  ],
  candidature: [
    { to: '/cas-01-seo', anchor: 'etapes', label: 'Préparer ensuite l’entretien en 5 étapes', text: 'Conseil complet, utile avant même d’être convoqué.', tone: 'blue' },
  ],
}

export function ServicePage({ id, route }: { id: string; route: Route }) {
  const service = getService(id)
  const from = safeFrom(route.query.get('from'))
  const back = backFor(from)

  // Outil : « Lancer l'outil » affiche dans la barre de démo que l'outil n'est pas reproduit.
  const [toolLaunched, setToolLaunched] = useState(false)
  useEffect(() => setToolLaunched(false), [id])

  useEffect(() => {
    if (service) track('service_view', service.id)
  }, [service])

  if (!service) return <NotFound />
  const related = RELATED[service.id] ?? []
  const isTool = service.kind === 'outil'

  return (
    <ProtoLayout
      path={route.path}
      caseLabel={caseLabelFor(from)}
      events={['service_view', 'service_cta_click', 'booking_start', 'booking_complete_demo']}
      coulisses={<ServiceCoulisses service={service} />}
      barNotice={toolLaunched ? 'Démonstration\u00a0: outil non reproduit.' : undefined}
    >
      <PageBand back={back} title={service.officialTitle} titleIsHeading={false} />
      <div className="container overlap">
        <div className="article-layout">
          <article className="sheet" aria-labelledby="titre-service">
            <h1 id="titre-service" tabIndex={-1} className="service-title">{service.officialTitle}</h1>
            <Modalities items={service.modalities} />
            {service.observedSummary && <p className="small">{nb(service.observedSummary)}</p>}
            <p className="service-hook"><strong>{service.hook}.</strong>{service.benefit && service.benefit !== service.hook && <> {nb(service.benefit)}</>}</p>
            {service.details && (
              <ul className="plus-list">
                {service.details.points.map((p) => <li key={p}><Plus size={18} className="plus" /> {nb(p)}</li>)}
              </ul>
            )}
            <div className="service-actions">
              {isTool ? (
                <button type="button" className="btn btn--primary" onClick={() => { track('service_cta_click', `${service.id} (lancer l’outil)`); setToolLaunched(true) }}>
                  Lancer l’outil<span className="visually-hidden"> — {service.officialTitle}</span>
                </button>
              ) : (
                <ServiceAction service={service} from={from} />
              )}
            </div>
            {service.details && (
              <>
                <hr className="sep" />
                <h2>À qui s’adresse ce service ?</h2>
                <p>{nb(service.details.forWhom)}</p>
                {service.details.prepare && (
                  <>
                    <h2>Comment s’y préparer ?</h2>
                    <p>{nb(service.details.prepare)}</p>
                  </>
                )}
              </>
            )}
          </article>

          <aside className="sidebar" aria-label="Pour aller plus loin">
            <ServiceVisual service={service} />
            {related.map((r) => (
              <div key={r.label} className={`side-card side-card--${r.tone}`}>
                {r.tone === 'navy' && <Laptop size={36} className="side-card__icon" />}
                <h2 className="side-card__title">{r.label}</h2>
                <p>{r.text}</p>
                <Link to={r.to} anchor={r.anchor} className="link-arrow link-arrow--light">
                  En savoir plus<span className="visually-hidden"> : {r.label}</span> <ArrowRight size={18} />
                </Link>
              </div>
            ))}
            <div className="side-card">
              <h2 className="side-card__title side-card__title--dark">Pas sûr que ce soit le bon service ?</h2>
              <Link to="/cas-02-ab-test" className="link-arrow">Comparer nos services <ArrowRight size={18} /></Link>
            </div>
          </aside>
        </div>
      </div>
    </ProtoLayout>
  )
}

function ServiceCoulisses({ service }: { service: Service }) {
  const missing = service.modalities.filter((m) => m.provenance === 'a-verifier').map((m) => m.label.toLowerCase())
  return (
    <>
      <h3 className="coulisses__case">Fiche service — {service.officialTitle}</h3>
      <CrBlock title="Sources de cette fiche">
        <ul>
          <li>
            Intitulé :{' '}
            {service.titleProvenance === 'capture'
              ? <Badge tone="ok">repris d’apec.fr</Badge>
              : <Badge tone="warn">provisoire, à confirmer</Badge>}
          </li>
          <li>Type d’aide affiché : {KIND_LABEL[service.kind]}.</li>
          <li>
            {missing.length
              ? <>Modalités à confirmer, donc <strong>non affichées</strong> : {missing.join(', ')}.</>
              : 'Modalités reprises d’apec.fr.'}
          </li>
          <li>Accroche, bénéfice et textes de la fiche : rédaction proposée. Seuls l’intitulé et la description courte d’apec.fr sont cités.</li>
          {service.scopeNote && <li>{service.scopeNote}</li>}
          {service.depth === 'synthese' && <li>Fiche d’aperçu : le service n’est pas détaillé dans la démo.</li>}
          <li>Visuel : illustration dessinée pour le prototype, aucune photographie ni personne réelle.</li>
        </ul>
      </CrBlock>
    </>
  )
}
