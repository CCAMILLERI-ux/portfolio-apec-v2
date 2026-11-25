import { ArrowRight, External, Search } from '../components/Icons'
import { Illustration } from '../components/Illustration'
import { ModalityChips, Modalities } from '../components/Modalities'
import { PortfolioLayout } from '../components/PortfolioLayout'
import { KindTag } from '../components/ServiceCard'
import {
  getService,
  OFFICIAL_CANDIDATE_URL,
  OFFICIAL_RECRUITER_URL,
  OFFICIAL_SERVICES_URL,
  OFFICIAL_TOOLS_URL,
  SERVICES,
} from '../data/services'
import { Link } from '../lib/router'

const N = ' '

const STEPS = [
  { title: 'Design system', text: `Partir des composants, couleurs et règles existants pour rester cohérent avec le${N}site.` },
  { title: 'Maquettes Figma des variantes', text: `Décliner rapidement les variantes à comparer à partir des composants du design${N}system.` },
  { title: 'A/B test et mesure', text: `Tester les variantes auprès d’un vrai public et mesurer l’effet sur les${N}conversions.` },
  { title: 'Déploiement dans le CMS', text: `Intégrer et mettre en ligne la variante retenue, en cohérence avec le${N}site.` },
]

const TOKENS = [
  ['--brand-navy', '#252555', 'Texte principal, en‑tête, pied de page, bandeaux'],
  ['--brand-yellow', '#FFC400', 'Boutons, aplats de visuels, pictogrammes sur bleu nuit'],
  ['--brand-blue', '#026096', 'Bleu secondaire : cartes, bandeaux, liens'],
  ['--brand-blue-hover', '#024D78', 'Survol et état actif des éléments bleus'],
  ['--brand-blue-tint', '#EBF2F7', 'Fonds clairs teintés'],
  ['--brand-blue-soft', '#8DB7D0', 'Accent clair des illustrations'],
  ['--surface-white', '#FFFFFF', 'Fond'],
  ['--surface-muted', '#F5F5FA', 'Fonds secondaires'],
  ['--border-neutral', '#D1D3DB', 'Bordures'],
  ['--text-secondary-a11y', '#5F6673', 'Texte secondaire'],
]

const A11Y = [
  { title: 'Contrastes', text: `Bleu nuit sur jaune ≈${N}8,9:1, blanc sur bleu ≈${N}6,7:1. Le jaune n’est jamais une couleur de texte sur fond blanc, le texte secondaire est foncé pour rester${N}lisible.` },
  { title: 'Focus clavier visible', text: `Chaque élément interactif affiche un contour net au clavier, adapté à la couleur de son${N}fond.` },
  { title: 'Erreur non portée par la seule couleur', text: `Un message explicite et un pictogramme accompagnent toujours la bordure${N}rouge.` },
  { title: 'Sélection lisible', text: `Une option choisie se repère par sa bordure, son fond et son liseré, pas uniquement par sa${N}couleur.` },
]

const OFFICIAL = [
  { label: 'Espace candidat', url: OFFICIAL_CANDIDATE_URL },
  { label: 'Espace recruteur', url: OFFICIAL_RECRUITER_URL },
  { label: 'Tous nos services', url: OFFICIAL_SERVICES_URL },
  { label: 'Tous nos outils', url: OFFICIAL_TOOLS_URL },
]

export function DesignSystem() {
  const sample = getService('entretien-programme')!
  const existing = SERVICES.filter((s) => s.titleProvenance === 'capture')

  return (
    <PortfolioLayout>
      <section className="pf-hero pf-hero--compact">
        <div className="pf-container">
          <p className="pf-kicker">Méthode</p>
          <h1 className="pf-hero__title" tabIndex={-1}>Design system &amp; prototypage</h1>
          <p className="pf-hero__lead">
            Partir d’un design system pour maquetter vite, tester des variantes et déployer des évolutions{N}cohérentes.
          </p>
        </div>
      </section>

      <div className="pf-container pf-section ds-page">
        <section aria-labelledby="facon">
          <h2 id="facon">Mes habitudes de travail</h2>
          <ol className="ds-flow">
            {STEPS.map((s, i) => (
              <li key={s.title} className="ds-flow__step">
                <span className="ds-flow__n" aria-hidden="true">{i + 1}</span>
                <h3 className="ds-flow__title">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="experience" className="ds-xp">
          <h2 id="experience">Mon expérience</h2>
          <p>
            J’ai créé le design system d’un écosystème de 7{N}sites et je l’utilise au quotidien dans Figma pour décliner
            les évolutions, harmoniser les interfaces et maquetter rapidement les variantes à{N}tester.
          </p>
        </section>

        <section aria-labelledby="kit">
          <h2 id="kit">Le design system de ces prototypes</h2>
          <p className="ds-lead">
            Pour ce portfolio, j’ai prototypé directement à partir de ce mini design system, construit en relevant les
            styles d’apec.fr, avec l’aide de l’IA{N}: le code des prototypes a été produit avec Claude{N}Code, à partir de
            mes choix de conception, de mes contenus et de mes relectures. Démonstration des fondations et des{N}composants.
          </p>
        </section>
      </div>

      <div className="proto kit-frame">
        <div className="container">
          <h3>Couleurs</h3>
          <ul className="swatches">
            {TOKENS.map(([name, hex, use]) => (
              <li key={name}>
                <span className="swatch" style={{ background: hex }} aria-hidden="true" />
                <span><code>{name}</code> {hex}<br /><span className="muted small">{use.replace(/ (\S+)$/, `${N}$1`)}</span></span>
              </li>
            ))}
          </ul>

          <h3>Typographie</h3>
          <div className="ds-type">
            <p className="ds-type__h1">Titre de page — Montserrat 600</p>
            <p className="ds-type__h2">Titre de section — Montserrat 600</p>
            <p className="ds-type__body">Texte courant — Montserrat 400, 16{N}px, interligne 1,5. Une hiérarchie nette entre titres, texte et mentions{N}secondaires.</p>
            <p className="ds-type__meta">Texte secondaire — 14{N}px, gris foncé</p>
          </div>

          <h3>Éléments graphiques</h3>
          <div className="kit-row kit-row--top">
            <div className="kit-visual">
              <Illustration name="groupe" tone="yellow" className="svc-visual__img" />
              <KindTag kind="atelier" />
            </div>
            <div className="kit-visual">
              <Illustration name="echange" tone="blue" className="svc-visual__img" />
              <KindTag kind="individuel" />
            </div>
            <div className="kit-visual">
              <Illustration name="outil" tone="navy" className="svc-visual__img" />
              <KindTag kind="outil" />
            </div>
          </div>
          <div className="kit-navy">
            <label className="sit-tile is-selected"><Search size={34} className="sit-tile__icon" /><span className="sit-tile__label">Tuile sélectionnée</span></label>
            <label className="sit-tile"><Search size={34} className="sit-tile__icon" /><span className="sit-tile__label">Tuile au repos</span></label>
          </div>

          <h3>Boutons et états</h3>
          <div className="kit-row">
            <button type="button" className="btn btn--primary">Principal</button>
            <button type="button" className="btn btn--outline">Secondaire</button>
            <button type="button" className="btn btn--primary" disabled>Désactivé</button>
            <Link to="/design-system" anchor="kit" className="link-arrow">Lien avec flèche <ArrowRight size={18} /></Link>
          </div>

          <h3>Choix, sélection et erreur</h3>
          <div className="kit-grid">
            <label className="choice choice--tile is-selected">
              <input type="radio" name="kit-demo" defaultChecked />
              <span className="choice__body"><span className="choice__title">Option sélectionnée</span></span>
            </label>
            <label className="choice choice--tile">
              <input type="radio" name="kit-demo" />
              <span className="choice__body"><span className="choice__title">Option non sélectionnée</span></span>
            </label>
          </div>
          <div className="field">
            <label htmlFor="kit-field">Champ en erreur (exemple)</label>
            <input id="kit-field" className="input is-invalid" aria-invalid="true" aria-describedby="kit-field-err" defaultValue="" />
            <p id="kit-field-err" className="field-error">Message d’erreur explicite, non porté par la seule couleur.</p>
          </div>

          <h3>Modalités</h3>
          <Modalities items={sample.modalities} />
          <ModalityChips items={sample.modalities} />
        </div>
      </div>

      <div className="pf-container pf-section ds-page">
        <section aria-labelledby="a11y">
          <h2 id="a11y">L’accessibilité comme choix de conception</h2>
          <ul className="ds-a11y">
            {A11Y.map((a) => (
              <li key={a.title}>
                <h3 className="ds-a11y__title">{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <aside className="ds-sources" aria-labelledby="sources">
          <h2 id="sources" className="ds-sources__title">Sources et mentions</h2>
          <p><strong>Services repris d’apec.fr{N}:</strong> {existing.map((s) => s.officialTitle).join(' · ')}.</p>
          <ul className="ds-sources__links">
            {OFFICIAL.map((o) => (
              <li key={o.url}>
                <a href={o.url} target="_blank" rel="noopener noreferrer">
                  {o.label} <External size={14} /><span className="visually-hidden"> (apec.fr, nouvel onglet)</span>
                </a>
              </li>
            ))}
          </ul>
          <p>
            Polices Montserrat, Inter et Plus Jakarta Sans sous SIL Open Font License. Photographies Unsplash, sous{' '}
            <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">
              licence Unsplash<span className="visually-hidden"> (site externe, nouvel onglet)</span>
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
