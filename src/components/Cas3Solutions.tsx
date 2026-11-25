import {
  CAS3_BEFORE_LINK,
  CAS3_NEEDS,
  CAS3_PROFILE_LINKS,
  CAS3_SOLUTIONS,
  CAS3_SOLUTIONS_INTRO,
  CAS3_SOLUTIONS_TITLE,
  solutionHref,
  type Solution,
} from '../data/cas3'
import { Link } from '../lib/router'
import { nb } from '../lib/text'
import { track } from '../lib/storage'
import { getService } from '../data/services'
import { ArrowRight, Calculator, Chat, Plus, Questions } from './Icons'
import { ModalityChips } from './Modalities'
import { PhotoVisual } from './ServiceCard'

const ICONS = { chat: Chat, questions: Questions, calculator: Calculator }

function Visual({ s, size }: { s: Solution; size: 'sm' | 'lg' }) {
  if (s.photo) {
    return (
      <img
        src={s.photo.file}
        alt={s.photo.alt}
        loading="lazy"
        decoding="async"
        width={960}
        height={600}
        className={`sol-photo sol-photo--${size}`}
      />
    )
  }
  const Icon = ICONS[s.icon ?? 'chat']
  return (
    <span className={`sol-icon sol-icon--${size}`} aria-hidden="true">
      <Icon size={size === 'sm' ? 26 : 34} />
    </span>
  )
}

/**
 * Carte d'accompagnement humain, en deux designs :
 * - « atelier » : carte simple (photo avec liseré bleu, titre, intitulé, phrase, un bouton) ;
 * - « entretien » : langage de la fiche « Entretien programmé » observée (accroche, puces « + »,
 *   boutons « En savoir plus » / « Prenez rendez-vous »).
 */
function HumanCard({ s, detailed, headingLevel }: { s: Solution; detailed: boolean; headingLevel: 'h3' | 'h4' | 'p' }) {
  const service = getService(s.serviceId)!
  const Title = headingLevel
  const click = (where: string) => () => track('service_cta_click', `${s.serviceId} (cas 01, ${where})`)
  if (s.design === 'atelier') {
    // Design « atelier » : carte simple — photo avec liseré bleu, titre, intitulé, phrase, un bouton.
    return (
      <div className={`acard${detailed ? ' acard--lg' : ''}`}>
        {s.photo && (
          <img src={s.photo.file} alt={s.photo.alt} loading="lazy" decoding="async" width={960} height={600} className="acard__photo" />
        )}
        <div className="acard__body">
          <Title className="acard__title">{s.title}</Title>
          <p className="acard__official">{nb(s.official)}</p>
          <p className="acard__text">{nb(s.description)}</p>
          {s.primary && (
            <Link to={s.primary.href} className="btn btn--primary acard__cta" onClick={click('action principale')}>
              {s.primary.label}<span className="visually-hidden">{'\u00a0'}: {nb(s.official)}</span>
            </Link>
          )}
        </div>
      </div>
    )
  }
  return (
    <div className={`hcard hcard--${s.design}${detailed ? ' hcard--lg' : ''}`}>
      <PhotoVisual service={service} className="hcard__photo" />
      <div className="hcard__body">
        <p className="hcard__kicker">{s.title}</p>
        <Title className="hcard__title">{nb(s.official)}</Title>
        <p className="hcard__text">{nb(s.description)}</p>
        {s.design === 'entretien' && <ModalityChips items={service.modalities} />}
        {detailed && s.points && (
          <ul className="plus-list hcard__points">
            {s.points.map(([b, t]) => (
              <li key={b}><Plus size={18} className="plus" /> <span><strong>{b}{'\u00a0'}:</strong> {t}</span></li>
            ))}
          </ul>
        )}
        <div className="hcard__actions">
          {s.design === 'entretien' && s.secondary && (
            <Link to={s.secondary.href} className="btn btn--outline hcard__more" onClick={click('en savoir plus')}>
              {s.secondary.label}<span className="visually-hidden">{'\u00a0'}: {nb(s.official)}</span>
            </Link>
          )}
          {s.primary && (
            <Link to={s.primary.href} className="btn btn--primary" onClick={click('action principale')}>
              {s.primary.label}<span className="visually-hidden">{'\u00a0'}: {nb(s.official)}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

/** Solutions d'un besoin, dans l'ordre des données (humain puis outil). */
const byNeed = (need: Solution['need']) => CAS3_SOLUTIONS.filter((s) => s.need === need)

/** Lien interne vers une fiche service : le texte du lien est l'intitulé du service. */
function ServiceLink({ id, where }: { id: string; where: string }) {
  const service = getService(id)!
  return (
    <Link to={`/service/${id}?from=cas-3`} onClick={() => track('service_cta_click', `${id} (cas 01, ${where})`)}>
      {nb(service.officialTitle)}
    </Link>
  )
}

/**
 * Version compacte, pour la colonne latérale, d'après les codes observés sur les articles apec.fr :
 * cartouches blancs par besoin, cartes de service avec photo, cartes bleu nuit d'outil
 * avec pictogramme filaire jaune. Mêmes groupes, même ordre qu'en bas d'article.
 */
export function SolutionsCompact() {
  return (
    <section className="sol-side" aria-labelledby="sol-side-title">
      <div className="sol-side__head">
        <p id="sol-side-title" className="sol-side__title">{nb(CAS3_SOLUTIONS_TITLE)}</p>
        <p className="sol-side__intro">{nb(CAS3_SOLUTIONS_INTRO)}</p>
      </div>

      {CAS3_NEEDS.map((n) => (
        <div key={n.id}>
          <h3 className="sidebar__heading sol-side__box">{n.title}</h3>
          <ul className="sol-side__list sol-side__list--mixed">
            {byNeed(n.id).map((s) => {
              if (s.format === 'humain') return <li key={s.id}><HumanCard s={s} detailed={false} headingLevel="p" /></li>
              const Icon = ICONS[s.icon ?? 'chat']
              return (
                <li key={s.id} className="sol-side-card sol-side-card--tool">
                  <Icon size={32} className="sol-side-card__icon" />
                  <p className="sol-side-card__title">{s.title}</p>
                  {s.focus && <p className="sol-focus">{s.focus}</p>}
                  <p className="sol-side-card__text">{nb(s.description)}</p>
                  <Link
                    to={solutionHref(s)}
                    className="link-arrow link-arrow--light sol-side-card__link"
                    onClick={() => track('service_cta_click', `${s.serviceId} (cas 01, colonne)`)}
                  >
                    {s.cta} <ArrowRight size={18} />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </section>
  )
}

/** Carte d'outil en autonomie ; « en ligne » quand elle est seule sur sa rangée. */
function ToolCard({ s, row }: { s: Solution; row: boolean }) {
  return (
    <li className={`sol-card sol-card--tool${row ? ' sol-card--row' : ''}`}>
      <Visual s={s} size="lg" />
      <div className="sol-card__main">
        <h4 className="sol-card__title">{s.title}</h4>
        {s.focus && <p className="sol-focus">{s.focus}</p>}
        <p>{nb(s.description)}</p>
      </div>
      <Link
        to={solutionHref(s)}
        className="btn btn--outline btn--sm"
        onClick={() => track('service_cta_click', `${s.serviceId} (cas 01, bas d’article)`)}
      >
        {s.cta}
      </Link>
    </li>
  )
}

/** Version détaillée, en bas de l'article : trois besoins, puis liens selon le profil. */
export function SolutionsCards() {
  return (
    <section aria-labelledby="accompagnement" className="sol-block">
      <h2 id="accompagnement" tabIndex={-1}>{nb(CAS3_SOLUTIONS_TITLE)}</h2>
      <p className="sol-block__intro">{nb(CAS3_SOLUTIONS_INTRO)}</p>

      {CAS3_NEEDS.map((n) => {
        const items = byNeed(n.id)
        return (
          <section key={n.id} className="sol-need" aria-labelledby={`besoin-${n.id}`}>
            <h3 id={`besoin-${n.id}`} className="sol-block__label">{n.title}</h3>
            <ul className="sol-grid sol-grid--need">
              {items.map((s, i) => {
                const row = items.length % 2 === 1 && i === items.length - 1
                return s.format === 'humain'
                  ? <li key={s.id}><HumanCard s={s} detailed headingLevel="h4" /></li>
                  : <ToolCard key={s.id} s={s} row={row} />
              })}
            </ul>
          </section>
        )
      })}

      <div className="sol-more">
        <p className="sol-more__label"><strong>Selon votre profil{'\u00a0'}:</strong></p>
        <ul className="sol-more__links">
          {CAS3_PROFILE_LINKS.map((id) => (
            <li key={id}><ServiceLink id={id} where="selon le profil" /></li>
          ))}
        </ul>
        <p>
          <strong>Pas encore d’entretien{'\u00a0'}?</strong> <ServiceLink id={CAS3_BEFORE_LINK} where="en amont" />
        </p>
      </div>

      {/* Porte de sortie : en dernier, après les groupes de services et les liens internes. */}
      <p className="help-after">
        <Link to="/reserver/rendez-vous-conseil?from=cas-1-seo" className="help-link">
          <Chat size={22} /> Vous hésitez{'\u00a0'}? <strong>Échanger avec un consultant</strong>
        </Link>
      </p>
    </section>
  )
}
