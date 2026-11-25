import type { ReactNode } from 'react'
import { KIND_LABEL, pitchOf, type Service, type ServiceKind } from '../data/services'
import { Link } from '../lib/router'
import { track } from '../lib/storage'
import { ArrowRight, Chat, Group, Laptop } from './Icons'
import { Illustration, type Tone } from './Illustration'
import { ModalityChips } from './Modalities'
import { SERVICE_PHOTO } from '../data/photos'
import { ATELIER_THEME } from '../data/ateliers'
import { ThemeIcon } from './ThemeIcon'
import { nb } from '../lib/text'

export const KIND_TONE: Record<ServiceKind, Tone> = { atelier: 'yellow', individuel: 'blue', outil: 'navy' }
export const KIND_SHORT: Record<ServiceKind, string> = { atelier: 'Atelier', individuel: 'Rendez-vous', outil: 'Outil' }
const KIND_ICON = { atelier: Group, individuel: Chat, outil: Laptop }

/** Étiquette carrée, d'après le motif « Repères » observé sur les visuels. */
export function KindTag({ kind }: { kind: ServiceKind }) {
  const Icon = KIND_ICON[kind]
  return (
    <span className="kind-tag">
      <Icon size={26} className="kind-tag__icon" />
      <span className="kind-tag__label">{KIND_SHORT[kind]}</span>
      <span className="visually-hidden"> — {KIND_LABEL[kind]}</span>
    </span>
  )
}

export function ServiceVisual({ service, children }: { service: Service; children?: ReactNode }) {
  // Ateliers : tuile bleue et icône au trait du thème, dans le style des tuiles d'apec.fr.
  if (service.kind === 'atelier') {
    return (
      <div className="svc-visual svc-visual--theme">
        <ThemeIcon theme={ATELIER_THEME[service.id] ?? 'groupe'} className="svc-visual__icon" />
        <KindTag kind={service.kind} />
        {children}
      </div>
    )
  }
  return (
    <div className="svc-visual">
      <Illustration name={service.illustration} tone={KIND_TONE[service.kind]} className="svc-visual__img" />
      <KindTag kind={service.kind} />
      {children}
    </div>
  )
}

/** Visuel photographique (piste 3) : photo, étiquette carrée et liseré de couleur du type d'aide. */
export function PhotoVisual({ service, className = '' }: { service: Service; className?: string }) {
  const photo = SERVICE_PHOTO[service.id]
  if (!photo) return <ServiceVisual service={service} />
  return (
    <div className={`photo-visual photo-visual--${KIND_TONE[service.kind]} ${className}`}>
      <img src={photo.file} alt={photo.alt} loading="lazy" decoding="async" width={960} height={600} className="photo-visual__img" />
      <KindTag kind={service.kind} />
    </div>
  )
}

/**
 * Action principale d'un service dans le prototype, toujours simulée (aucun lien vers apec.fr),
 * avec le vocabulaire du site : atelier « Inscrivez-vous » (choix d'une session), rendez-vous
 * « Prenez rendez-vous » (choix d'un créneau), outil « Accéder à l'outil » (fiche de l'outil).
 */
export function serviceActionLabel(s: Service) {
  return s.kind === 'atelier' ? 'Inscrivez-vous' : s.kind === 'individuel' ? 'Prenez rendez-vous' : 'Accéder à l’outil'
}

export function serviceActionTarget(s: Service, from: string) {
  return s.kind === 'outil' ? `/service/${s.id}?from=${from}` : `/reserver/${s.id}?from=${from}`
}

export function ServiceAction({ service, from, className = 'btn btn--primary' }: { service: Service; from: string; className?: string }) {
  return (
    <Link className={className} to={serviceActionTarget(service, from)} onClick={() => track('service_cta_click', service.id)}>
      {serviceActionLabel(service)}
      <span className="visually-hidden"> — {service.officialTitle}</span>
    </Link>
  )
}

/** Carte « piste exploratoire ». */
export function ServiceCard({ service, from, meta, level = 3, id }: { service: Service; from: string; meta?: ReactNode; level?: 3 | 4; id?: string }) {
  const H = `h${level}` as 'h3' | 'h4'
  return (
    <article id={id} tabIndex={id ? -1 : undefined} className={`svc svc--${service.kind}`}>
      <ServiceVisual service={service} />
      <div className="svc__body">
        <p className="svc__official">{nb(service.officialTitle)}</p>
        {meta}
        <H className="svc__title">{nb(service.hook)}</H>
        <p className="svc__benefit">{nb(pitchOf(service))}</p>
        {/* Le format est déjà donné par l'étiquette (meta) : pas de pastille en double. */}
        <ModalityChips items={meta ? service.modalities.filter((m) => m.label !== 'Format') : service.modalities} />
        <div className="svc__actions">
          <ServiceAction service={service} from={from} />
          <Link to={`/service/${service.id}?from=${from}`} className="link-arrow">
            En savoir plus<span className="visually-hidden"> : {service.officialTitle}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  )
}

/**
 * Carte « version actuelle » : reconstruction du motif vu sur les captures
 * (pictogramme, intitulé, description courte, « En savoir plus » + action).
 */
export function ObservedServiceCard({ service, from, meta, level = 3, id }: { service: Service; from: string; meta?: ReactNode; level?: 3 | 4; id?: string }) {
  const H = `h${level}` as 'h3' | 'h4'
  return (
    <article id={id} tabIndex={id ? -1 : undefined} className="observed-card">
      <svg className="observed-card__icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M30 8a16 16 0 1 0 10 28" fill="none" stroke="var(--brand-navy)" strokeWidth="3" strokeLinecap="round" />
        <path d="M22 14a10 10 0 1 1 10 18" fill="none" stroke="var(--brand-yellow)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {meta}
      <H className="observed-card__title">{nb(service.officialTitle)}</H>
      {service.observedSummary && <p className="observed-card__text">{nb(service.observedSummary)}</p>}
      <div className="observed-card__actions">
        <Link to={`/service/${service.id}?from=${from}`} className="btn btn--outline btn--sm">
          En savoir plus<span className="visually-hidden"> : {service.officialTitle}</span>
        </Link>
        {service.observedCta ? (
          <Link
            to={serviceActionTarget(service, from)}
            className="btn btn--primary btn--sm"
            onClick={() => track('service_cta_click', `${service.id} (vue existante)`)}
          >
            {service.observedCta}<span className="visually-hidden"> : {service.officialTitle}</span>
          </Link>
        ) : (
          <ServiceAction service={service} from={from} className="btn btn--primary btn--sm" />
        )}
      </div>
    </article>
  )
}
