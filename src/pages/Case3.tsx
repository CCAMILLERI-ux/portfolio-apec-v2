import { useEffect, useState } from 'react'
import { Badge } from '../components/Badge'
import { CrBlock, CroGrid } from '../components/Coulisses'
import { ArrowRight, External, Plus } from '../components/Icons'
import { ArticleHero, ArticleMeta, SideArticleCard } from '../components/ArticleParts'
import { PHOTOS } from '../data/photos'
import { SolutionsCards } from '../components/Cas3Solutions'
import { CAS3_SOLUTIONS, URSSAF_BRUT_NET } from '../data/cas3'
import { PageBand } from '../components/PageBand'
import { ProtoLayout } from '../components/ProtoLayout'
import { Link } from '../lib/router'
import { ARTICLE_PATH, articleJsonLd, DATE_MODIFIED, FAQ, SEO_DESC, SEO_TITLE, SOURCES } from '../data/conseilEntretien'

const TOC = [
  { id: 'etapes', label: 'Les 5 étapes de préparation' },
  { id: 'types', label: 'Les différents types d’entretien' },
  { id: 'questions', label: 'Exemples de questions et pistes de réponse' },
  { id: 'remuneration', label: 'Parler rémunération' },
  { id: 'questions-recruteur', label: 'Les questions à poser au recruteur' },
  { id: 'apres', label: 'Après l’entretien' },
  { id: 'checklist', label: 'Checklist de la veille' },
  { id: 'faq', label: 'Questions fréquentes' },
  { id: 'accompagnement', label: 'L’Apec vous accompagne' },
  { id: 'sources', label: 'Sources' },
]

const CHECKLIST = [
  'J’ai relu l’offre et surligné les 3 attentes principales.',
  'Je peux présenter mon parcours en 2 minutes.',
  'J’ai préparé 3 exemples concrets de réalisations.',
  'J’ai noté 2 ou 3 questions à poser au recruteur.',
  'Je connais l’heure, le lieu ou le lien de connexion, et le nom de mon interlocuteur.',
  'J’ai une fourchette de rémunération en tête.',
]

const QUESTIONS = [
  {
    q: 'Présentez-vous.',
    a: 'Un fil conducteur en trois temps : ce que vous faites aujourd’hui, une ou deux réalisations marquantes, pourquoi ce poste est la suite logique.',
  },
  {
    q: 'Pourquoi notre entreprise ?',
    a: 'Reliez un élément précis (projet, marché, valeurs affichées) à ce que vous pouvez y apporter.',
  },
  {
    q: 'Parlez-moi d’une difficulté que vous avez surmontée.',
    a: 'Appliquez la méthode « Situation, action, résultat » : décrivez ce que vous avez fait personnellement et ce que vous en avez retenu.',
  },
  {
    q: 'Quelles sont vos prétentions salariales ?',
    a: 'Donnez une fourchette en brut annuel, préparée à partir de repères de marché et de votre expérience.',
    link: true,
  },
  {
    q: 'Avez-vous des questions ?',
    a: 'Oui, toujours : sur les priorités du poste, l’équipe, les critères de réussite à six mois.',
  },
]

/** Formats d'entretien : un conseil court pour chacun. */
const TYPES: [string, string][] = [
  ['Présélection téléphonique', 'Gardez l’offre sous les yeux et préparez un pitch de deux minutes : votre parcours et ce que vous apportez au poste.'],
  ['Entretien en visio', 'Testez la connexion, le son et la caméra la veille ; regardez la caméra quand vous répondez.'],
  ['Entretien avec le manager', 'Préparez des exemples concrets reliés aux missions et aux résultats attendus du poste.'],
  ['Entretien avec plusieurs interlocuteurs', 'Adressez-vous à chacun et adaptez vos exemples à son rôle (RH, manager, futur collègue).'],
  ['Mise en situation', 'Reformulez la consigne, annoncez votre démarche, puis expliquez votre raisonnement autant que le résultat.'],
]

/** Sommaire de l'article : une ancre par H2. */
function TocList() {
  return (
    <ol>
      {TOC.map((t) => (
        <li key={t.id}>
          <Link to={ARTICLE_PATH} anchor={t.id}>{t.label}</Link>
        </li>
      ))}
    </ol>
  )
}

/** Raccourcis de la colonne vers les groupes du bloc de services, en fin d'article. */
const HELP_LINKS = [
  { label: 'M’entraîner à l’entretien', anchor: 'besoin-entrainer' },
  { label: 'Préparer ma rémunération', anchor: 'besoin-salaire' },
  { label: 'Préparer mes questions', anchor: 'besoin-questions' },
]

/** Lien vers une source de la section « Sources » (ancre interne). */
function Src({ id, children }: { id: string; children: React.ReactNode }) {
  return <Link to={ARTICLE_PATH} anchor={id} className="src-ref">{children}</Link>
}

/** Lien vers la fiche d'un service du prototype, avec le nom du service comme ancre. */
function Svc({ id, children }: { id: string; children: React.ReactNode }) {
  return <Link to={`/service/${id}?from=cas-3`}>{children}</Link>
}

/** Temps de lecture estimé (environ 200 mots par minute), arrondi à la minute supérieure. */
const READING_MINUTES = 8

export function Case3({ path }: { path: string }) {
  const [checked, setChecked] = useState<number[]>([])
  const toggle = (i: number) =>
    setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]))
  useArticleSeo()

  return (
    <ProtoLayout
      path={path}
      caseLabel="Cas 01 · De la recherche en ligne aux services"
      events={['service_view', 'service_cta_click', 'booking_start', 'booking_complete_demo']}
      coulisses={<Case3Coulisses />}
    >
      <PageBand
        kicker="Conseils · Entretiens de recrutement"
        title="Comment préparer un entretien de recrutement ?"
        titleIsHeading={false}
      />

      <div className="container overlap">
        <div className="article-layout">
          <article className="sheet article" aria-labelledby="titre-conseil">
            <h1 id="titre-conseil" tabIndex={-1}>Comment préparer un entretien de recrutement ?</h1>
            <ArticleHero photo={PHOTOS.entretienCandidate} rubric="Conseils" tagSide="right" />
            <ArticleMeta label="Mis à jour le" date="25/11/2026" dateTime={DATE_MODIFIED} title="Comment préparer un entretien de recrutement ?" />
            <p className="a-byline">
              <span>Rédaction : équipe éditoriale (fictive)</span>
              <span>Relu par un consultant Apec (fictif)</span>
              <span>Lecture : {READING_MINUTES} min</span>
            </p>

            <p className="article__intro">
              Pour préparer un entretien de recrutement, concentrez-vous sur cinq points : analyser l’offre,
              vous renseigner sur l’entreprise, construire votre présentation et vos exemples, vous entraîner
              à voix haute, puis régler la logistique et vos questions. Comptez quelques heures réparties sur
              plusieurs jours plutôt qu’une seule soirée.
            </p>

            <section className="enbref" aria-labelledby="en-bref">
              <h2 id="en-bref" className="enbref__title">En bref</h2>
              <ul>
                <li>Préparer un entretien, c’est : analyser l’offre, préparer 3 exemples concrets, s’entraîner à voix haute, préparer ses questions et sa fourchette de rémunération.</li>
                <li>Structurez chaque exemple avec la méthode « Situation, action, résultat ».</li>
                <li>Un recrutement de cadre dure en moyenne 12 semaines, et 69 % des entreprises commencent par une présélection téléphonique <Src id="source-simulateur">(source : Apec)</Src>.</li>
                <li>Pour le salaire, partez d’un repère de marché : 54 k€ brut annuel médian pour les cadres du privé en juin 2026 <Src id="source-remuneration">(source : Apec)</Src>.</li>
              </ul>
            </section>

            <section aria-labelledby="contexte">
              <h2 id="contexte">Le contexte</h2>
              <p>
                Fin 2026, seules 6 % des entreprises prévoient de recruter des cadres, un point bas. Dans le même
                temps, 14 % des cadres envisagent de changer d’entreprise dans les trois mois, et 38 % dans
                l’année <Src id="source-barometre-t4">(source : Baromètre Apec, 4ᵉ trimestre 2026)</Src>.
              </p>
              <p>
                Moins de recrutements, plus de candidats : chaque entretien compte. Une bonne préparation fait
                la différence.
              </p>
            </section>

            {/* Mobile et tablette : sommaire en haut de l'article, replié par défaut (la colonne de droite est masquée). */}
            <details className="toc toc--inline">
              <summary className="toc__title">Sommaire</summary>
              <nav aria-label="Sommaire">
                <TocList />
              </nav>
            </details>

            <section aria-labelledby="etapes">
              <h2 id="etapes" tabIndex={-1}>Les 5 étapes de préparation</h2>

              <h3>1. Décrypter l’offre</h3>
              <p>
                Repérez les trois attentes qui reviennent le plus dans l’annonce (compétences, contexte,
                résultats attendus). Pour chacune, notez une expérience qui y répond. C’est la base de tout
                l’entretien. Les <Svc id="fiches-metiers">Fiches métiers cadres</Svc> aident à situer les missions
                et les compétences habituellement attendues pour ce type de poste.
              </p>

              <h3>2. Comprendre l’entreprise</h3>
              <p>
                Site, actualités récentes, rapports publics, fiches entreprises, profils des futurs collègues :
                cherchez ce qui explique pourquoi le poste est ouvert maintenant. Une question informée sur ce contexte vaut
                mieux qu’une liste de chiffres récités.
              </p>

              <h3>3. Préparer votre présentation et vos exemples</h3>
              <p>
                Construisez une présentation de deux minutes et trois exemples concrets. Pour chacun, appliquez
                la méthode « Situation, action, résultat » :
              </p>
              <ul className="sar">
                <li><strong>Situation :</strong> le contexte et l’enjeu, en une ou deux phrases.</li>
                <li><strong>Action :</strong> ce que vous avez fait personnellement, et comment.</li>
                <li><strong>Résultat :</strong> ce que cela a changé, mesuré si possible, et ce que vous en avez retenu.</li>
              </ul>
              <p>
                Avec un parcours long, choisissez les réalisations les plus proches du poste plutôt que de
                tout raconter.
              </p>

              <h3>4. S’entraîner à voix haute</h3>
              <p>
                Formuler ses réponses à voix haute révèle ce qui reste flou. Vous pouvez commencer seul avec
                le <Svc id="simulateur-entretien">simulateur d’entretien en ligne, pour vous entraîner en autonomie</Svc>.
                Si vous préférez apprendre avec d’autres, l’
                <Svc id="atelier-entretiens">atelier collectif « Réussir vos entretiens de recrutement »</Svc>{' '}
                passe en revue les différents types d’entretien.
              </p>
              <p className="callout">
                <strong>Votre entretien est déjà fixé ?</strong>{' '}
                <Svc id="entretien-programme">Répétez-le lors d’une simulation individuelle avec un consultant</Svc>,
                adaptée au poste visé.
              </p>

              <h3>5. Régler la logistique et vos questions</h3>
              <p>
                Vérifiez le format (sur place, visio, téléphone), le nom de votre interlocuteur et la durée
                prévue. Préparez deux ou trois questions sur les priorités du poste. Pensez aussi à la
                rémunération : <Link to="/conseil/remuneration">quelques repères pour aborder le salaire sereinement</Link>.
              </p>
            </section>

            <section aria-labelledby="types">
              <h2 id="types" tabIndex={-1}>Les différents types d’entretien</h2>
              <p>
                Un même recrutement enchaîne souvent plusieurs formats. Chacun se prépare un peu différemment.
              </p>
              <div className="table-scroll table-scroll--plain">
                <table className="data-table article-table">
                  <caption className="visually-hidden">Types d’entretien et conseil pour chacun</caption>
                  <thead><tr><th scope="col">Format</th><th scope="col">Notre conseil</th></tr></thead>
                  <tbody>
                    {TYPES.map(([t, c]) => (
                      <tr key={t}><th scope="row">{t}</th><td>{c}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Pour vous exercer à chacun de ces formats, l’atelier{' '}
                <Svc id="atelier-entretiens">Réussir vos entretiens de recrutement</Svc>{' '}
                les passe en revue en groupe.
              </p>
            </section>

            <section aria-labelledby="questions">
              <h2 id="questions" tabIndex={-1}>Exemples de questions et pistes de réponse</h2>
              <dl className="qa">
                {QUESTIONS.map((x) => (
                  <div key={x.q} className="qa__item">
                    <dt>« {x.q} »</dt>
                    <dd>
                      {x.a}
                      {x.link && (
                        <>
                          {' '}<Link to={ARTICLE_PATH} anchor="remuneration">Voir nos repères de rémunération</Link>. Pour
                          traduire un montant brut en net, utilisez le{' '}
                          <a href={URSSAF_BRUT_NET} target="_blank" rel="noopener noreferrer">
                            convertisseur salaire brut / net de <span className="nowrap">l’Urssaf{'\u00a0'}<External size={14} /></span>
                            <span className="visually-hidden"> (site externe, nouvel onglet)</span>
                          </a>.
                        </>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="remuneration">
              <h2 id="remuneration" tabIndex={-1}>Parler rémunération</h2>
              <ul className="facts">
                <li>
                  <strong>Un repère de marché.</strong> En juin 2026, la rémunération annuelle brute médiane des
                  cadres du privé est de 54 k€ (fixe + variable), dont 52 k€ de fixe. Huit cadres sur dix
                  perçoivent entre 38 k€ et 93 k€ <Src id="source-remuneration">(source : Baromètre 2026 de la rémunération des cadres)</Src>.
                  Ce repère se précise ensuite selon le poste, la région et l’expérience, avec le{' '}
                  <Svc id="simulateur-salaire">Simulateur de salaire cadre</Svc>.
                </li>
                <li>
                  <strong>Premier réflexe : regarder l’offre.</strong> 68 % des offres d’emploi cadres sur apec.fr
                  affichent un salaire <Src id="source-remuneration">(source : Apec)</Src>.
                </li>
                <li>
                  <strong>Un moment légitime pour en parler.</strong> 61 % des cadres ayant changé d’entreprise sans
                  passer par le chômage ont été augmentés <Src id="source-remuneration">(source : Apec)</Src>.
                </li>
              </ul>
              <p>
                Pour préparer vos prétentions et vous exercer à les formuler, l’atelier{' '}
                <Svc id="atelier-remuneration">Parler rémunération en entretiens</Svc> vous accompagne. Voir aussi{' '}
                <Link to="/conseil/remuneration">trois repères pour aborder le salaire en entretien</Link>.
              </p>
            </section>

            <section aria-labelledby="questions-recruteur">
              <h2 id="questions-recruteur" tabIndex={-1}>Les questions à poser au recruteur</h2>
              <p>
                Les cadres attendent des processus de recrutement plus resserrés, un déroulé plus lisible et des
                informations plus pertinentes sur le poste <Src id="source-attentes">(source : Apec, 2024)</Src>.
                Vos questions sont l’occasion d’obtenir ces informations :
              </p>
              <ul>
                <li>Quelles sont les priorités du poste pour les six premiers mois ?</li>
                <li>Comment l’équipe est-elle organisée, et avec qui travaillerai-je au quotidien ?</li>
                <li>Comment la réussite sera-t-elle mesurée ?</li>
                <li>Quelles sont les prochaines étapes du recrutement, et dans quels délais ?</li>
              </ul>
              <p>
                Pour formuler les questions qui comptent pour vous, à partir de vos attentes sur le travail,
                utilisez <Svc id="odiapazon">Odiapazon</Svc>.
              </p>
            </section>

            <section aria-labelledby="apres">
              <h2 id="apres" tabIndex={-1}>Après l’entretien</h2>
              <ul>
                <li><strong>Remercier.</strong> Un court message le jour même ou le lendemain, qui rappelle un point fort de l’échange.</li>
                <li><strong>Relancer au bon moment.</strong> Attendez la date annoncée par le recruteur, puis relancez une fois, poliment, si elle est dépassée.</li>
                <li><strong>Garder le rythme en tête.</strong> Un recrutement de cadre dure en moyenne 12 semaines <Src id="source-simulateur">(source : Apec)</Src> : continuez vos autres démarches en parallèle.</li>
              </ul>
            </section>

            <section aria-labelledby="checklist">
              <h2 id="checklist" tabIndex={-1}>Checklist de la veille</h2>
              <fieldset className="checklist">
                <legend className="visually-hidden">Checklist de préparation (non enregistrée)</legend>
                {CHECKLIST.map((item, i) => (
                  <label key={item} className={`checklist__item${checked.includes(i) ? ' is-selected' : ''}`}>
                    <input type="checkbox" checked={checked.includes(i)} onChange={() => toggle(i)} />
                    <span>{item}</span>
                  </label>
                ))}
              </fieldset>
              <p className="muted small" aria-live="polite">
                {checked.length} point{checked.length > 1 ? 's' : ''} sur {CHECKLIST.length}
              </p>
            </section>

            <section aria-labelledby="faq">
              <h2 id="faq" tabIndex={-1}>Questions fréquentes</h2>
              <div className="faq">
                {FAQ.map((f) => (
                  <div key={f.q} className="faq__item">
                    <h3 className="faq__q">{f.q}</h3>
                    <p className="faq__a">
                      {f.a.map((seg, i) => typeof seg === 'string'
                        ? <span key={i}>{seg}</span>
                        : <Link key={i} to={seg.to} anchor={seg.anchor}>{seg.label}</Link>)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <SolutionsCards />

            <section className="sources" aria-labelledby="sources">
              <h2 id="sources" tabIndex={-1}>Sources</h2>
              <ol className="sources__list">
                {SOURCES.map((s) => (
                  <li key={s.id} id={s.id} tabIndex={-1}>
                    <p className="sources__ref">
                      {s.url ? (
                        <a href={s.url} target="_blank" rel="noopener noreferrer">
                          {s.publisher}, « {s.label} »<span className="visually-hidden"> (site externe, nouvel onglet)</span>
                        </a>
                      ) : (
                        <>{s.publisher}, « {s.label} »</>
                      )}
                      {s.url && <> <External size={14} /></>}, {s.date}.
                    </p>
                    <p className="sources__detail"><strong>Méthodologie :</strong> {s.method}</p>
                    <p className="sources__detail"><strong>Repris dans l’article :</strong> {s.cites}</p>
                  </li>
                ))}
              </ol>
            </section>
          </article>

          <aside className="sidebar sidebar--article" aria-label="Pour aller plus loin">
            {/* Ordinateur : sommaire et raccourcis vers les services, visibles au défilement. Les services ne sont présentés qu'en fin d'article. */}
            <div className="side-sticky">
              <nav className="toc toc--side" aria-label="Sommaire">
                <p className="toc__title" aria-hidden="true">Sommaire</p>
                <TocList />
              </nav>
              <section className="side-help" aria-labelledby="side-help-titre">
                <h2 id="side-help-titre" className="side-help__title">Besoin d’aide pour vous préparer{'\u00a0'}?</h2>
                <ul>
                  {HELP_LINKS.map((h) => (
                    <li key={h.anchor}>
                      <Link to={ARTICLE_PATH} anchor={h.anchor} className="side-help__link">
                        {h.label} <ArrowRight size={16} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            <h2 className="sidebar__heading">Sur le même sujet</h2>
            <SideArticleCard
              to="/conseil/remuneration"
              photo={PHOTOS.conversation}
              title="Aborder la rémunération en entretien : trois repères"
              date="19/11/2026"
              rubric="Repères"
            />
            <SideArticleCard
              photo={PHOTOS.posteDeTravail}
              title="Entretien en visio : les bons réflexes"
              date="12/11/2026"
              rubric="Conseils"
            />
            <SideArticleCard
              photo={PHOTOS.relectureEcran}
              title="Après l’entretien : comment relancer un recruteur"
              date="05/11/2026"
              rubric="Conseils"
            />
          </aside>
        </div>

      </div>
    </ProtoLayout>
  )
}

/** Métadonnées et données structurées de l'article (titre, description, JSON-LD), retirées en quittant la page. */
function useArticleSeo() {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previous = meta?.content
    if (meta) meta.content = SEO_DESC
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'jsonld-article'
    script.textContent = JSON.stringify(articleJsonLd())
    document.head.appendChild(script)
    return () => {
      if (meta && previous !== undefined) meta.content = previous
      script.remove()
    }
  }, [])
}


const LINK_MAP = [
  ['Conseil — étape 1', 'Fiches métiers cadres', '« Fiches métiers cadres »', 'Situer le poste'],
  ['Conseil — types d’entretien', 'Atelier « Réussir vos entretiens »', '« Réussir vos entretiens de recrutement »', 'S’exercer à chaque format'],
  ['Conseil — Parler rémunération', 'Simulateur de salaire cadre', '« Simulateur de salaire cadre »', 'Affiner le repère médian'],
  ['Conseil — Parler rémunération', 'Atelier « Parler rémunération en entretiens »', '« Parler rémunération en entretiens »', 'Préparer ses prétentions'],
  ['Conseil — questions au recruteur', 'Odiapazon', '« Odiapazon »', 'Formuler ses questions'],
  ['Conseil — questions fréquentes', 'Simulateur de salaire cadre, Odiapazon, Nos services', 'Noms des services', 'Réponses courtes'],
  ['Conseil — préparer un entretien', 'Simulateur d’entretien', '« simulateur d’entretien en ligne, pour vous entraîner en autonomie »', 'S’entraîner seul'],
  ['Conseil — préparer un entretien', 'Atelier « Réussir vos entretiens »', '« atelier collectif Réussir vos entretiens de recrutement »', 'Se préparer en groupe'],
  ['Conseil — préparer un entretien', 'Entretien programmé (simulation)', '« Répétez-le lors d’une simulation individuelle avec un consultant »', 'Entretien déjà fixé'],
  ['Conseil — préparer un entretien', 'Repères rémunération', '« quelques repères pour aborder le salaire »', 'Question fréquente'],
  ['Conseil — questions (salaire)', 'Convertisseur Urssaf (externe)', '« convertisseur salaire brut / net de l’Urssaf »', 'Passer du brut au net'],
  ['Colonne — « Besoin d’aide pour vous préparer ? »', 'Bloc de services (fin d’article)', '« M’entraîner à l’entretien », « Préparer ma rémunération », « Préparer mes questions »', 'Raccourcis vers chaque groupe'],
  ...CAS3_SOLUTIONS.map((s) => ['Conseil — bloc final', s.official, s.format === 'humain' ? `« ${s.cta} : ${s.official} »` : `« ${s.cta} »`, s.focus ?? s.title]),
  ['Conseil — « Selon votre profil »', 'Jeunes diplômés : gagnez en confiance, même sans expérience', '« Jeunes diplômés : gagnez en confiance, même sans expérience »', 'Profil : peu d’expérience'],
  ['Conseil — « Selon votre profil »', 'Valoriser les atouts de son expérience senior', '« Valoriser les atouts de son expérience senior »', 'Profil : expérience senior'],
  ['Conseil — « Pas encore d’entretien ? »', 'Réussir sa candidature', '« Réussir sa candidature »', 'En amont de l’entretien'],
  ['Fiche « Jeunes diplômés »', 'Aborder la rémunération pour un 1er emploi', '« Aborder la rémunération pour un 1er emploi »', 'Premier salaire'],
  ['Fiche atelier', 'Conseil — étapes', '« Lire nos conseils pour préparer votre séance »', 'Préparer la séance'],
  ['Repères rémunération', 'Conseil — questions', '« les autres questions fréquentes »', 'Retour au besoin principal'],
]

export function Case3Coulisses() {
  return (
    <>
      <h3 className="coulisses__case">Cas 01 — De la recherche en ligne aux services</h3>
      <p className="cr-lead">
        Un contenu daté, sourcé et structuré (réponse directe, questions fréquentes, données structurées), pour être
        utile aux lecteurs et repris par les moteurs comme par les{'\u00a0'}IA.
      </p>
      <CrBlock title="Statut de la page">
        <p>
          Page conseil originale, rédigée pour ce portfolio. Seuls des chiffres publiés par l’Apec sont cités, chacun
          relié à sa source (section « Sources » en fin d’article). Rédaction et relecture sont attribuées à des
          personnages fictifs. Les services mentionnés renvoient aux fiches du prototype, rédigées à partir des pages
          d’apec.fr. La page « rémunération » est un contenu connexe court, utile au{'\u00a0'}lecteur.
        </p>
        <p>
          Données structurées (JSON-LD)<span>{'\u00a0'}</span>: Article (dates de publication et de mise à jour), fil
          d’Ariane et FAQPage, avec les mêmes questions-réponses que la section visible. La page reste non indexée
          (portfolio)<span>{'\u00a0'}</span>; sur apec.fr, l’éditeur serait{'\u00a0'}l’Apec.
        </p>
      </CrBlock>
      <CrBlock title="Services proposés : ordre et provenance">
        <p>
          Les services sont regroupés par besoin (s’entraîner, parler salaire, préparer ses questions) pour garder
          un choix simple{'\u00a0'}; les services selon le profil et en amont de l’entretien sont proposés en
          liens internes.
        </p>
        <p>
          Les services sont présentés une seule fois, en fin d’article, quand le lecteur est prêt à agir{'\u00a0'}; la colonne
          de droite propose un sommaire et des raccourcis vers ces{'\u00a0'}services. Dans
          chaque groupe, les accompagnements humains (photos), puis les outils en autonomie (icônes). Le simulateur d’entretien prépare
          les <strong>réponses</strong> ; Odiapazon aide à formuler les <strong>questions</strong> à poser au recruteur, à partir d’une
          analyse des cinq dimensions du{'\u00a0'}travail.
        </p>
        <ul>
          <li>Descriptions fidèles aux pages d’apec.fr : « Entretien programmé » est une simulation pour un entretien prévu, pas un coaching général ; l’atelier porte sur les différents types d’entretien.</li>
          <li>« Simulateur de salaire cadre » : intitulé provisoire, à confirmer avec les équipes.</li>
          <li>Ateliers « Parler rémunération en entretiens », « Jeunes diplômés{'\u00a0'}: gagnez en confiance, même sans expérience », « Aborder la rémunération pour un 1er emploi », « Valoriser les atouts de son expérience senior » : intitulés et format repris de la page « Tous nos services » d’apec.fr ; inscription simulée dans le prototype. « Réussir sa candidature » renvoie à la fiche existante du prototype, complétée par la durée relevée sur cette page (45{'\u00a0'}minutes).</li>
          <li>Outils : « Accéder à l’outil » ouvre la fiche du prototype ; l’outil lui-même n’est pas reproduit (« Lancer l’outil » le signale dans la barre de démo). L’accès réel serait à préciser dans une vraie mise en œuvre.</li>
          <li>Data Cadres, fiches métiers et fiches entreprises sont cités dans le texte ; les liens seraient ajoutés dans le CMS.</li>
          <li>Lien externe : convertisseur salaire brut / net de l’Urssaf.</li>
          <li>Photos Unsplash (licence Unsplash) : situations illustratives, pas de vrais consultants Apec.</li>
        </ul>
      </CrBlock>
      <CroGrid
        rubrics={{
        constat: (
          <p>
            Une personne qui tape « comment préparer un entretien » cherche d’abord une réponse, pas un
            service. Les contenus et les services de l’Apec peuvent ensuite prolonger cette réponse, au moment
            où elle en a{'\u00a0'}besoin.
          </p>
        ),
        hypothese: (
          <p>
            Si la page répond directement au besoin puis propose, au bon endroit du texte, l’accompagnement
            qui correspond à la situation (seul, en groupe, entretien fixé), alors davantage de lecteurs
            pourraient utiliser un service. Hypothèse à tester avec{'\u00a0'}l’équipe.
          </p>
        ),
        modification: (
          <ul>
            <li>Introduction qui répond en quelques lignes, puis sommaire.</li>
            <li>Liens intégrés au texte, avec ancres descriptives et différenciées selon la situation.</li>
            <li>Bloc final en trois besoins, puis deux lignes de liens internes.</li>
            <li>Contenu connexe court (rémunération), utile au lecteur.</li>
          </ul>
        ),
        kpi: (
          <>
            <p><strong>KPI principal :</strong> conversions issues des entrées SEO / GEO (inscription à un atelier, rendez-vous réservé, usage d’un outil), pas seulement les visites.</p>
            <p><strong>Indicateurs de suivi :</strong> impressions, clics et CTR (Search Console), clics sur les liens contextuels.</p>
            <p><strong>Qualité :</strong> présence effective, satisfaction. <strong>Garde-fous :</strong> accessibilité, temps de chargement.</p>
          </>
        ),
        equipes: (
          <ul>
            <li>Rédaction / experts métier : exactitude des conseils, date de mise à jour.</li>
            <li>Équipes produit : maillage interne et gabarits dans le CMS.</li>
            <li>SEO / GEO et webanalyste : suivi Search Console et attribution des conversions.</li>
            <li>Juridique / conformité : mentions sur les services et leurs conditions.</li>
          </ul>
        ),
      }}
      />
      <section className="cr-block cr-block--wide">
        <h3>Persona et intention de recherche</h3>
        <p>
          P1, cadre en recherche active, souvent juste après une convocation ou en anticipation.
          Intention informationnelle avec un prolongement pratique possible.
        </p>
        <h4>Requêtes envisagées <Badge tone="warn">Volumes à confirmer</Badge></h4>
        <ul className="inline-list">
          <li>comment préparer un entretien de recrutement</li>
          <li>préparer un entretien d’embauche cadre</li>
          <li>questions entretien d’embauche</li>
          <li>s’entraîner entretien d’embauche</li>
        </ul>
        <p className="muted small">Aucun volume de recherche ni classement : à évaluer avec les outils SEO / GEO de{'\u00a0'}l’équipe.</p>
      </section>

      <section className="cr-block cr-block--wide">
        <h3>Aperçu pédagogique du titre et de la description</h3>
        <p className="muted small">Illustration de la longueur et du ton visés — pas un résultat de moteur réel, aucune promesse de classement.</p>
        <div className="serp-preview" aria-label="Aperçu pédagogique">
          <p className="serp-preview__url">exemple.fr › conseils › entretien</p>
          <p className="serp-preview__title">{SEO_TITLE}</p>
          <p className="serp-preview__desc">{SEO_DESC}</p>
        </div>
        <p className="muted small">
          Titre : {SEO_TITLE.length} caractères · Description : {SEO_DESC.length} caractères (ordres de
          grandeur usuels, la troncature dépend de l’affichage).
        </p>
      </section>

      <section className="cr-block cr-block--wide">
        <h3>Structure de la page</h3>
        <ul className="outline">
          <li>H1 — Comment préparer un entretien de recrutement ?
            <ul>
              <li>Dates, rédaction, relecture, temps de lecture · Introduction (réponse directe)</li>
              <li>H2 — En bref (4 puces) · H2 — Le contexte · Sommaire</li>
              <li>H2 — Les 5 étapes (5 × H3, méthode « Situation, action, résultat »)</li>
              <li>H2 — Les différents types d’entretien (tableau)</li>
              <li>H2 — Exemples de questions</li>
              <li>H2 — Parler rémunération · H2 — Les questions à poser au recruteur · H2 — Après l’entretien</li>
              <li>H2 — Checklist · H2 — Questions fréquentes (6 × H3)</li>
              <li>H2 — L’Apec vous accompagne pour préparer vos entretiens (3 × H3, un par besoin)</li>
              <li>H2 — Sources (référence, date, méthodologie)</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="cr-block cr-block--wide">
        <h3>Carte du maillage interne</h3>
        <div className="table-scroll">
          <table className="data-table">
            <caption className="visually-hidden">Liens internes : source, destination, ancre, intention</caption>
            <thead>
              <tr><th scope="col">Page source</th><th scope="col">Destination</th><th scope="col">Ancre</th><th scope="col">Intention</th></tr>
            </thead>
            <tbody>
              {LINK_MAP.map((r) => (
                <tr key={r.join()}>{r.map((c) => <td key={c}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <strong>Conversion visée :</strong> service utilisé, inscription ou réservation finalisée — la visite
          d’une fiche n’est qu’une étape.
        </p>
      </section>

      <section className="cr-block cr-block--wide">
        <h3>Complément : visibilité dans les IA (GEO)</h3>
        <ul className="plus-list">
          <li><Plus size={16} className="plus" /> Réponse claire dès l’introduction, reformulable telle quelle.</li>
          <li><Plus size={16} className="plus" /> Expertise identifiable : auteur ou équipe, date de mise à jour.</li>
          <li><Plus size={16} className="plus" /> Sources et dates vérifiées ; données originales (études de l’organisation) lorsqu’elles existent.</li>
          <li><Plus size={16} className="plus" /> Contenu textuel accessible, structuré, sans information enfermée dans une image.</li>
        </ul>
        <p className="muted">
          L’accessibilité aux robots et l’indexation sont nécessaires pour certains systèmes, mais ne
          garantissent aucune citation. Aucun score ni résultat d’assistant n’est présenté ici.
        </p>
      </section>

      <section className="cr-block cr-block--wide">
        <h3>Complément : coordination multicanale <Badge tone="warn">Organisation à confirmer</Badge></h3>
        <div className="table-scroll">
          <table className="data-table">
            <caption className="visually-hidden">Coordination des canaux autour du thème entretien</caption>
            <thead>
              <tr><th scope="col">Canal</th><th scope="col">Message</th><th scope="col">Destination</th><th scope="col">Contributeur à mobiliser</th><th scope="col">Marquage</th></tr>
            </thead>
            <tbody>
              <tr><td>SEO / GEO</td><td>La méthode en 5 étapes</td><td>Page conseil</td><td>Rédaction, SEO / GEO</td><td>— (organique)</td></tr>
              <tr><td>SEA</td><td>S’entraîner avant un entretien</td><td>Page conseil, ancre accompagnement</td><td>Équipe acquisition</td><td><code>utm_source</code>, <code>utm_campaign</code></td></tr>
              <tr><td>CRM</td><td>Un entretien prévu ? Préparez-le</td><td>Fiche simulation individuelle</td><td>Marketing relationnel</td><td><code>utm_medium=email</code></td></tr>
              <tr><td>Réseaux sociaux</td><td>3 questions à préparer</td><td>Page conseil, section questions</td><td>Communication</td><td><code>utm_medium=social</code></td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
