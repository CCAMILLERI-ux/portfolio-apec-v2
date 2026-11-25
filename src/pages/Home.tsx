import { ArrowRight } from '../components/Icons'
import { Illustration, type Tone } from '../components/Illustration'
import { PortfolioLayout } from '../components/PortfolioLayout'
import { Link } from '../lib/router'

const LINKEDIN = 'https://www.linkedin.com/in/caroline-camilleri-pro/'

type Scene = 'conseil' | 'boussole' | 'echange' | 'document'

/** Les trois réalisations : une couleur du design system par carte. */
const WORKS: {
  n: string
  to: string
  mission: string
  title: string
  text: string
  cta: string
  color: 'navy' | 'yellow' | 'blue' | 'tint'
  scene: Scene
  tone: Tone
}[] = [
  {
    n: '01',
    to: '/cas-01-seo',
    mission: 'Acquisition',
    title: 'De la recherche en ligne aux services',
    text: 'Être trouvé sur les moteurs de recherche et cité par les IA, puis guider vers le bon service.',
    cta: 'Explorer la démo',
    color: 'navy',
    scene: 'conseil',
    tone: 'navy',
  },
  {
    n: '02',
    to: '/cas-02-ab-test',
    mission: 'Performance &\u00a0conversion',
    title: 'Présenter l’offre par situation',
    text: 'La version actuelle et trois variantes par situation, comparées par A/B test, avec « Nos services » dans l’en‑tête et un rendez‑vous en quelques clics.',
    cta: 'Explorer la démo',
    color: 'yellow',
    scene: 'boussole',
    tone: 'yellow',
  },
  {
    n: '03',
    to: '/cas-03-inscription',
    mission: 'Performance &\u00a0conversion · Animation',
    title: 'Un parcours guidé vers les services',
    text: 'Trois questions pour orienter un nouvel inscrit vers les services faits pour lui, jusqu’à sa première inscription.',
    cta: 'Explorer la démo',
    color: 'blue',
    scene: 'echange',
    tone: 'blue',
  },
]

/** Résultats de la candidate (sans nom d'employeur). */
const RESULTS = [
  { figure: '83\u00a0%', text: 'conformité SEO technique des sites\u00a0pilotés' },
  { figure: '×\u00a02', text: 'conversion d’un tunnel de création de compte, grâce à l’UX et aux A/B\u00a0tests' },
  { figure: '17\u00a0000', text: 'contacts B2B par an après la refonte d’un moteur de\u00a0recherche' },
  { figure: '7\u00a0sites', text: 'et plus de 25 services pilotés avec la DSI et 6\u00a0agences' },
]

export function Home() {
  return (
    <PortfolioLayout isHome>
      <section className="pf-container pf-hero2" aria-labelledby="accroche">
        <p className="pf-hero2__kicker">Candidature · Chef de projet Animation{' '}Web</p>
        <h1 id="accroche" className="pf-hero2__h1" tabIndex={-1}>
          Rendre apec.fr toujours plus fluide, utile et{' '}performant
        </h1>
        <p className="pf-hero2__text">
          Trois réalisations autour des missions du poste{'\u00a0'}: acquisition SEO{'\u00a0'}/{'\u00a0'}GEO, performance et conversion,
          animation du{'\u00a0'}site.
        </p>
      </section>

      <section className="pf-container pf-real" aria-labelledby="realisations">
        <h2 id="realisations" className="pf-real__title" tabIndex={-1}>Réalisations</h2>
        <ol className="pf-real__grid">
          {WORKS.map((w) => (
            <li key={w.n} className={`pf-rcard pf-rcard--${w.color}`}>
              <Illustration name={w.scene} tone={w.tone} className="pf-rcard__illu" />
              <p className="pf-rcard__meta">
                <span className="pf-rcard__num" aria-hidden="true">{w.n}</span>
                <span className="pf-rcard__mission"><span className="visually-hidden">Mission{' '}: </span>{w.mission}</span>
              </p>
              <h3 className="pf-rcard__title">{w.title}</h3>
              <p className="pf-rcard__text">{w.text}</p>
              <div className="pf-rcard__foot">
                <Link to={w.to} className="pf-rcard__btn">
                  {w.cta}<span className="visually-hidden"> — réalisation {w.n}{' '}: {w.title}</span> <ArrowRight size={16} />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="pf-container pf-about" aria-labelledby="a-propos">
        <h2 id="a-propos" className="pf-about__title" tabIndex={-1}>À propos de moi</h2>
        <p className="pf-about__text">
          Cheffe de projet digital, j’anime et je fais évoluer des sites et services web{'\u00a0'}: roadmap d’animation,
          SEO{'\u00a0'}/{'\u00a0'}GEO, parcours utilisateurs, A/B{'\u00a0'}tests et mises en ligne dans le CMS. J’aime proposer des pistes,
          les tester et les faire évoluer en lien avec les équipes produit, du marketing relationnel, de la DSI et de
          la{'\u00a0'}communication.
        </p>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="pf-about__btn">
          Voir mon profil LinkedIn<span className="visually-hidden"> (nouvel onglet)</span> <ArrowRight size={16} />
        </a>
      </section>

      <section className="pf-proof2" aria-labelledby="resultats">
        <div className="pf-container">
          <h2 id="resultats" className="pf-proof2__title">Quelques résultats obtenus</h2>
          <ul className="pf-proof2__list">
            {RESULTS.map((r) => (
              <li key={r.figure}>
                <span className="pf-proof2__figure">{r.figure}</span>
                <span className="pf-proof2__text">{r.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PortfolioLayout>
  )
}
