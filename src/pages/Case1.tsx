import { ArrowRight, Calendar, Chat } from '../components/Icons'
import { Illustration } from '../components/Illustration'
import { ExistingCatalog } from '../components/ExistingCatalog'
import { VariantTabs } from '../components/VariantTabs'
import { nextUnseen, useSeenViews } from '../lib/seenViews'
import { ModalityChips } from '../components/Modalities'
import { ProtoLayout } from '../components/ProtoLayout'
import { ObservedServiceCard, PhotoVisual, ServiceAction, ServiceCard } from '../components/ServiceCard'
import { Picto } from '../components/Picto'
import { WORKSHOP_SESSIONS } from '../data/slots'
import { ADVICE_BY_SITUATION, IDEAL_IF } from '../data/piste2'
import { getService, pitchOf, type Service } from '../data/services'
import { ATELIER_GROUPS } from '../data/ateliers'
import { ALL_DEMO_SERVICE_IDS, FORMAT_LABEL, groupBySituation, SITUATION_ICON, SITUATIONS } from '../data/situations'
import { Link, navigate, type Route } from '../lib/router'
import { nb } from '../lib/text'

/** Valeurs du paramètre « vue » conservées (rétrocompatibilité des liens) ; seuls les noms affichés changent. */
type View = 'existant' | 'piste' | 'piste2' | 'piste3'
const VIEWS: [View, string, string][] = [
  ['existant', 'Version actuelle', 'Actuelle'],
  ['piste3', 'Variante photos', 'Photos'],
  ['piste', 'Variante tuiles', 'Tuiles'],
  ['piste2', 'Variante liste', 'Liste'],
]
const ALL = 'tous'


export function Case1({ route }: { route: Route }) {
  const rawView = route.query.get('vue')
  const formatAtelier = route.query.get('format') === 'atelier'
  /** Sans paramètre « vue » : la Version actuelle. Les liens qui précisent une variante (vue=…) sont inchangés. */
  const view: View =
    rawView === 'existant' || rawView === 'piste' || rawView === 'piste2' || rawView === 'piste3' ? rawView : 'existant'
  const situationId = route.query.get('situation') ?? SITUATIONS[0].id
  const situation = SITUATIONS.find((s) => s.id === situationId)
  const isAll = situationId === ALL || !situation
  const current = isAll ? ALL : situationId

  const ids = isAll ? ALL_DEMO_SERVICE_IDS : situation.serviceIds
  const services = ids.map(getService).filter(Boolean) as Service[]
  const advice = ADVICE_BY_SITUATION[current] ?? []

  /**
   * Filtre par format (lien « Découvrir les ateliers » du panneau de rendez-vous) : TOUS les ateliers,
   * classés par situation (la sélection courte de 3 services par situation reste la vue par défaut).
   */
  const onlyWorkshops = formatAtelier
  const update = (next: { vue?: View; situation?: string }) => {
    const q = new URLSearchParams({ situation: next.situation ?? current, vue: next.vue ?? view, ...(onlyWorkshops ? { format: 'atelier' } : {}) })
    navigate(`/cas-02-ab-test?${q.toString()}`, { replace: true })
  }
  const resultLabel = isAll ? 'Tous nos services' : situation.label
  const groups = onlyWorkshops
    ? ATELIER_GROUPS.filter((g) => isAll || g.situationId === current).map((g) => ({
        situation: SITUATIONS.find((s) => s.id === g.situationId)!,
        serviceIds: g.ateliers.map((x) => x.id),
      }))
    : groupBySituation((id) => getService(id)!.kind)
  const grouped = isAll || onlyWorkshops
  const shownCount = grouped ? groups.reduce((n, g) => n + g.serviceIds.length, 0) : services.length

  /** Rendu d'une liste de services dans la variante affichée. */
  const renderVariant = (
    list: Service[],
    level: 3 | 4,
    withHelp = false,
  ) => {
    // Étiquette de format visible sur chaque carte, dans toutes les vues.
    const meta = (sv: Service) => <FormatMeta service={sv} />
    // Vue Ateliers : chaque carte porte une ancre (lien « Un atelier sur ce sujet a lieu plus tôt »).
    const anchor = (sv: Service) => (onlyWorkshops ? `atelier-${sv.id}` : undefined)
    if (view === 'existant') {
      return (
        <div className="observed-band">
          <div className="observed-grid">
            {list.map((s) => <ObservedServiceCard key={s.id} id={anchor(s)} service={s} from="cas-1" level={level} meta={meta?.(s)} />)}
          </div>
        </div>
      )
    }
    if (view === 'piste') {
      return (
        <div className="svc-grid">
          {list.map((s) => <ServiceCard key={s.id} id={anchor(s)} service={s} from="cas-1" level={level} meta={meta?.(s)} />)}
        </div>
      )
    }
    if (view === 'piste3') return <Piste3 services={list} level={level} meta={meta} grouped={level === 4} anchor={anchor} />
    return (
      <ul className="dlist" aria-label="Services, avec la situation où chacun est le plus utile">
        {list.map((s) => <DecisionRow key={s.id} id={anchor(s)} service={s} level={level} />)}
        {withHelp && <HelpRow level={level} />}
      </ul>
    )
  }

  // Progression : présentations vues pendant la session et prochaine à voir.
  const ORDER = VIEWS.map(([v]) => v)
  const { seen, markSeen, reset: resetSeen } = useSeenViews(view)
  const next = nextUnseen(ORDER, view, seen)
  const nextLabel = next ? VIEWS.find(([v]) => v === next)![1].replace(/ /g, '\u00a0') : ''
  const goNext = () => {
    if (!next) return
    markSeen(next)
    update({ vue: next })
    window.scrollTo({ top: 0 })
    document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
  }

  const variantSwitch = (
    <VariantTabs
      options={VIEWS.map(([v, label]) => [v, label] as [View, string])}
      value={view}
      onChange={(v) => { markSeen(v); update({ vue: v }) }}
      seen={seen}
      next={next}
    />
  )



  return (
    <ProtoLayout
      path={route.path}
      caseLabel="Cas 02 · Présenter l’offre par situation"
      barControl={variantSwitch}
      barControlBelow
      events={['service_view', 'service_cta_click', 'booking_start', 'booking_complete_demo']}
      onReset={() => { navigate('/cas-02-ab-test', { replace: true }); resetSeen('existant') }}
      coulisses={<Case1Coulisses />}
      coulissesMinimal
    >
      {view === 'existant' ? (
        <ExistingCatalog key={String(onlyWorkshops)} onlyWorkshops={onlyWorkshops} />
      ) : (
      <>
      <div className="band band--tall">
        <div className="container">
          <p className="band__kicker">Nos services</p>
          <h1 className="band__title band__title--xl" tabIndex={-1}>Des services pour chaque étape de votre{'\u00a0'}carrière</h1>
          <fieldset className="sit-grid">
            <legend className="sit-legend">Où en êtes-vous{'\u00a0'}?</legend>
            {SITUATIONS.map((s) => {
              const Icon = SITUATION_ICON[s.id]
              return (
                <label key={s.id} className={`sit-tile${current === s.id ? ' is-selected' : ''}`}>
                  <input type="radio" name="situation" value={s.id} checked={current === s.id}
                    onChange={() => update({ situation: s.id })} className="visually-hidden" />
                  <Icon size={34} className="sit-tile__icon" />
                  <span className="sit-tile__label">{s.label}</span>
                </label>
              )
            })}
            <label className={`sit-tile sit-tile--all${current === ALL ? ' is-selected' : ''}`}>
              <input type="radio" name="situation" value={ALL} checked={current === ALL}
                onChange={() => update({ situation: ALL })} className="visually-hidden" />
              <ArrowRight size={34} className="sit-tile__icon" />
              <span className="sit-tile__label">Voir tous nos services</span>
            </label>
          </fieldset>
        </div>
      </div>

      <div className="container section">
        <p className="visually-hidden" role="status" aria-live="polite">
          {onlyWorkshops
            ? `${shownCount} ateliers affichés${isAll ? '' : ` pour : ${resultLabel}`}.`
            : `${shownCount} services affichés pour : ${resultLabel}.`}
        </p>
        <div className="results-head">
          <h2 className="results-title">
            {onlyWorkshops
              ? <>Ateliers <span className="results-count">({shownCount})</span></>
              : isAll ? resultLabel : <>Pour vous : <span className="results-title__sit">{resultLabel}</span></>}
          </h2>
        </div>

        {onlyWorkshops && (
          <p className="grp-filter">
            {!isAll && <>Situation{'\u00a0'}: <strong>{nb(resultLabel)}</strong> · </>}
            <Link to={`/cas-02-ab-test?${new URLSearchParams({ situation: current, vue: view })}`} className="grp-filter__reset">Voir tous les{"\u00a0"}formats</Link>
          </p>
        )}
        {isAll && (
          <nav className="grp-nav" aria-label="Aller à une situation">
            <ul>
              {groups.map((g) => {
                const Icon = SITUATION_ICON[g.situation.id]
                return (
                  <li key={g.situation.id}>
                    <a href={`#/cas-02-ab-test?${new URLSearchParams({ situation: ALL, vue: view, ...(onlyWorkshops ? { format: 'atelier' } : {}) })}#grp-${g.situation.id}`} className="grp-nav__link">
                      <Icon size={18} /> {g.situation.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        )}

        {onlyWorkshops
          ? groups.map((g) => {
              const Icon = SITUATION_ICON[g.situation.id]
              const recruiter = g.situation.id === 'recruter-aide'
              return (
                <section key={g.situation.id} className={`grp${recruiter ? ' grp--recruiter' : ''}`} aria-labelledby={`grp-${g.situation.id}`}>
                  {recruiter && <p className="grp__audience">Pour les recruteurs</p>}
                  <h3 id={`grp-${g.situation.id}`} className="grp__title" tabIndex={-1}>
                    <Icon size={28} className="grp__icon" /> {nb(g.situation.label)}
                    <span className="grp__count">{g.serviceIds.length}<span className="visually-hidden"> ateliers</span></span>
                  </h3>
                  {renderVariant(g.serviceIds.map(getService).filter(Boolean) as Service[], 4)}
                </section>
              )
            })
          : isAll
          ? groups.map((g) => {
              const Icon = SITUATION_ICON[g.situation.id]
              const recruiter = g.situation.id === 'recruter-aide'
              const list = g.serviceIds.map(getService).filter(Boolean) as Service[]
              return (
                <section key={g.situation.id} className={`grp${recruiter ? ' grp--recruiter' : ''}`} aria-labelledby={`grp-${g.situation.id}`}>
                  {recruiter && <p className="grp__audience">Pour les recruteurs</p>}
                  <h3 id={`grp-${g.situation.id}`} className="grp__title" tabIndex={-1}>
                    <Icon size={28} className="grp__icon" /> {nb(g.situation.label)}
                  </h3>
                  {renderVariant(list, 4)}
                </section>
              )
            })
          : renderVariant(services, 3, view === 'piste2')}

        {/* Porte de sortie, après les services (la piste 2 a déjà sa ligne « Aucun ne vous correspond vraiment ? »). */}
        {(onlyWorkshops || view === 'piste' || view === 'piste3') && (
          <p className="help-after">
            <Link to="/reserver/rendez-vous-conseil?from=cas-1" className="help-link">
              <Chat size={22} /> Vous hésitez{'\u00a0'}? <strong>Échanger avec un consultant</strong>
            </Link>
          </p>
        )}

        {!onlyWorkshops && view === 'piste2' && (
          <>
            {isAll && (
              <ul className="dlist dlist--help" aria-label="Aide d’un consultant">
                <HelpRow level={3} />
              </ul>
            )}

            {advice.length > 0 && (
              <section className="advice" aria-labelledby="nos-conseils">
                <h2 id="nos-conseils" className="advice__title">Nos conseils</h2>
                <p className="advice__sub">Pour bien utiliser ces services</p>
                <ul className="advice__grid">
                  {advice.map((a, i) => (
                    <li key={a.to}>
                      <Link to={a.to} className="advice-card">
                        <span className="advice-card__visual">
                          <Illustration name={i === 0 ? 'conseil' : 'document'} tone={i === 0 ? 'yellow' : 'blue'} className="advice-card__img" />
                          <span className="advice-card__tag">{a.kicker}</span>
                        </span>
                        <span className="advice-card__title">{a.title}</span>
                        <span className="advice-card__excerpt">{nb(a.excerpt)}</span>
                        <ArrowRight size={22} className="advice-card__arrow" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
      </>
      )}
      {/* Incitation à comparer : tant qu'il reste des présentations à voir, au-dessus du pied de page. */}
      {next && (
        <div className="next-variant">
          <div className="container">
            <button type="button" className="next-variant__btn" onClick={goNext}>
              Présentation suivante{'\u00a0'}: {nextLabel} <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </ProtoLayout>
  )
}

/**
 * Variante liste — ligne de la liste de décision : pictogramme, accroche en titre, « Idéal si »,
 * format, puis le bouton d'action principal (seul élément cliquable de la ligne).
 */
function DecisionRow({ service, level, id }: { service: Service; level: 3 | 4; id?: string }) {
  const H = `h${level}` as 'h3' | 'h4'
  return (
    <li id={id} tabIndex={id ? -1 : undefined} className="drow">
      <span className="drow__icon"><Picto kind={service.kind} size={36} /></span>
      <div className="drow__main">
        <H className="drow__title">{nb(service.hook)}</H>
        {IDEAL_IF[service.id]
          ? <p className="drow__ideal"><strong>Idéal si</strong> {nb(IDEAL_IF[service.id])}</p>
          : service.observedSummary && <p className="drow__ideal">{nb(service.observedSummary)}</p>}
      </div>
      <div className="drow__foot">
        <p className="drow__format"><span className="visually-hidden">Format{'\u00a0'}: </span>{FORMAT_LABEL[service.kind]}</p>
        <div className="drow__action">
          <ServiceAction service={service} from="cas-1" className="btn btn--primary btn--sm" />
        </div>
      </div>
    </li>
  )
}

/** Dernière ligne : l'aide d'un consultant, au même format, sur fond bleu nuit. */
function HelpRow({ level }: { level: 3 | 4 }) {
  const H = `h${level}` as 'h3' | 'h4'
  return (
    <li className="drow drow--help">
      <span className="drow__icon"><Picto kind="aide" size={36} /></span>
      <div className="drow__main">
        <H className="drow__title">Aucun ne vous correspond vraiment{'\u00a0'}?</H>
        <p className="drow__ideal"><strong>Idéal si</strong> vous hésitez ou votre situation est{'\u00a0'}particulière</p>
      </div>
      <div className="drow__foot">
        <p className="drow__format"><span className="visually-hidden">Format{'\u00a0'}: </span>Avec un consultant</p>
        <div className="drow__action">
          <Link to="/reserver/rendez-vous-conseil?from=cas-1" className="btn btn--primary btn--sm">Échanger avec un consultant</Link>
        </div>
      </div>
    </li>
  )
}

/** Étiquette de format (rendez-vous individuel, atelier, outil en ligne), visible sur chaque carte. */
function FormatMeta({ service }: { service: Service }) {
  return (
    <p className="grp-meta">
      <span className="grp-format">{FORMAT_LABEL[service.kind]}</span>
    </p>
  )
}

/** Piste 3 : de l'humain. Photos à la place des pictogrammes ; ordre rendez-vous, atelier, outil. */
function Piste3({ services, level = 3, meta, grouped = false, anchor = () => undefined }: { services: Service[]; level?: 3 | 4; meta: (s: Service) => React.ReactNode; grouped?: boolean; anchor?: (s: Service) => string | undefined }) {
  const H = `h${level}` as 'h3' | 'h4'
  const card = (s: Service) => (
    <article key={s.id} id={anchor(s)} tabIndex={anchor(s) ? -1 : undefined} className={`svc svc--${s.kind}`}>
      <PhotoVisual service={s} />
      <div className="svc__body">
        <p className="svc__official">{nb(s.officialTitle)}</p>
        {meta(s)}
        <H className="svc__title">{nb(s.hook)}</H>
        <p className="svc__benefit">{nb(pitchOf(s))}</p>
        <ModalityChips items={s.modalities.filter((m) => m.label !== 'Format')} />
        <div className="svc__actions">
          <ServiceAction service={s} from="cas-1" />
          <Link to={`/service/${s.id}?from=cas-1`} className="link-arrow">
            En savoir plus<span className="visually-hidden"> : {s.officialTitle}</span> <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  )
  // Vue « Tous » : trois cartes côte à côte par situation.
  if (grouped) return <div className="svc-grid">{services.map(card)}</div>
  // Situation choisie : l'atelier garde sa grande carte photo, à sa place (entre le rendez-vous et l'outil).
  const segments: (Service | Service[])[] = []
  for (const s of services) {
    const last = segments[segments.length - 1]
    if (s.kind === 'atelier') segments.push(s)
    else if (Array.isArray(last)) last.push(s)
    else segments.push([s])
  }
  return (
    <>
      {segments.map((seg) => Array.isArray(seg) ? (
        <div key={seg[0].id} className={`svc-grid${seg.length === 1 ? ' svc-grid--solo' : seg.length === 2 ? ' svc-grid--duo' : ''}`}>
          {seg.map(card)}
        </div>
      ) : (
        <article key={seg.id} className="workshop">
          <PhotoVisual service={seg} className="workshop__photo" />
          <div className="workshop__body">
            <p className="svc__official">{nb(seg.officialTitle)}</p>
            {meta(seg)}
            <H className="workshop__title">{nb(seg.hook)}</H>
            <p>{nb(seg.benefit)}</p>
            <ModalityChips items={seg.modalities.filter((m) => m.label !== 'Format')} />
            {seg.kind === 'atelier' && (
              <div className="workshop__sessions">
                <p className="workshop__sessions-title"><Calendar size={18} /> Prochaines sessions</p>
                <ul>
                  {WORKSHOP_SESSIONS.map((slot) => (
                    <li key={slot.id}><strong>{slot.date}</strong> · {slot.time} · {slot.place}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="svc__actions">
              <ServiceAction service={seg} from="cas-1" />
              <Link to={`/service/${seg.id}?from=cas-1`} className="link-arrow">
                En savoir plus<span className="visually-hidden"> : {seg.officialTitle}</span> <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </>
  )
}

/** « Comprendre ce cas » : texte court, sans jargon (la phrase de fin est ajoutée par Coulisses). */
function Case1Coulisses() {
  return (
    <div className="cr-plain">
      <p>L’Apec propose de nombreux services{'\u00a0'}: rendez-vous, ateliers et{'\u00a0'}outils.</p>
      <p>L’idée{'\u00a0'}: les présenter selon la situation de chacun, pour aider à trouver le bon service plus{'\u00a0'}vite.</p>
      <p>Ce qui est comparé{'\u00a0'}: la version actuelle et trois présentations (photos, tuiles, liste d’aide au{'\u00a0'}choix).</p>
      <p>Ce qu’on observerait{'\u00a0'}: les clics vers un service, puis les inscriptions et rendez-vous{'\u00a0'}confirmés.</p>
      <p>À tester aussi{'\u00a0'}: l’entrée «{'\u00a0'}Nos services{'\u00a0'}» dans l’en‑tête, et le bouton <span className="nowrap">«{'\u00a0'}Prendre rendez-vous{'\u00a0'}»</span>, qui ouvre un panneau{'\u00a0'}latéral.</p>
    </div>
  )
}
