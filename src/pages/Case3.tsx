import { useState } from 'react'
import { Badge } from '../components/Badge'
import { CrBlock, CroGrid } from '../components/Coulisses'
import { External, Plus } from '../components/Icons'
import { ArticleHero, ArticleMeta, SideArticleCard } from '../components/ArticleParts'
import { PHOTOS } from '../data/photos'
import { SolutionsCards, SolutionsCompact } from '../components/Cas3Solutions'
import { CAS3_SOLUTIONS, URSSAF_BRUT_NET } from '../data/cas3'
import { PageBand } from '../components/PageBand'
import { ProtoLayout } from '../components/ProtoLayout'
import { Link } from '../lib/router'

const TOC = [
  { id: 'etapes', label: 'Les 5 étapes de préparation' },
  { id: 'questions', label: 'Exemples de questions et pistes de réponse' },
  { id: 'checklist', label: 'Checklist de la veille' },
  { id: 'accompagnement', label: 'L’Apec vous accompagne' },
]

const CHECKLIST = [
  'J’ai relu l’offre et surligné les 3 attentes principales.',
  'Je peux présenter mon parcours en 2 minutes.',
  'J’ai préparé 3 exemples concrets de réalisations.',
  'J’ai noté 2 ou 3 questions à poser au recruteur.',
  'Je connais l’heure, le lieu ou le lien de connexion, et le nom de mon interlocuteur.',
  'J’ai une fourchette de rémunération en tête.',
]

const QUESTIONS = [
  {
    q: 'Présentez-vous.',
    a: 'Un fil conducteur en trois temps : ce que vous faites aujourd’hui, une ou deux réalisations marquantes, pourquoi ce poste est la suite logique.',
  },
  {
    q: 'Pourquoi notre entreprise ?',
    a: 'Reliez un élément précis (projet, marché, valeurs affichées) à ce que vous pouvez y apporter.',
  },
  {
    q: 'Parlez-moi d’une difficulté que vous avez surmontée.',
    a: 'Situation, action, résultat : décrivez ce que vous avez fait personnellement et ce que vous en avez retenu.',
  },
  {
    q: 'Quelles sont vos prétentions salariales ?',
    a: 'Donnez une fourchette en brut annuel, préparée à partir de repères de marché (par exemple les données de rémunération publiées par l’Apec) et de votre expérience.',
    link: true,
  },
  {
    q: 'Avez-vous des questions ?',
    a: 'Oui, toujours : sur les priorités du poste, l’équipe, les critères de réussite à six mois.',
  },
]

export function Case3({ path }: { path: string }) {
  const [checked, setChecked] = useState<number[]>([])
  const toggle = (i: number) =>
    setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]))

  return (
    <ProtoLayout
      path={path}
      caseLabel="Cas 01 · De la recherche en ligne aux services"
      events={['service_view', 'service_cta_click', 'booking_start', 'booking_complete_demo']}
      coulisses={<Case3Coulisses />}
    >
      <PageBand
        kicker="Conseils · Entretiens de recrutement"
        title="Comment préparer un entretien de recrutement ?"
        titleIsHeading={false}
      />

      <div className="container overlap">
        <div className="article-layout">
          <article className="sheet article" aria-labelledby="titre-conseil">
            <h1 id="titre-conseil" tabIndex={-1}>Comment préparer un entretien de recrutement ?</h1>
            <ArticleHero photo={PHOTOS.entretienCandidate} rubric="Conseils" tagSide="right" />
            <ArticleMeta date="19/11/2026" title="Comment préparer un entretien de recrutement ?" />

            <p className="article__intro">
              Pour préparer un entretien de recrutement, concentrez-vous sur cinq points : analyser l’offre,
              vous renseigner sur l’entreprise, construire votre présentation et vos exemples, vous entraîner
              à voix haute, puis régler la logistique et vos questions. Comptez quelques heures réparties sur
              plusieurs jours plutôt qu’une seule soirée.
            </p>

            <nav className="toc" aria-labelledby="sommaire">
              <h2 id="sommaire" className="toc__title">Sommaire</h2>
              <ol>
                {TOC.map((t) => (
                  <li key={t.id}>
                    <Link to="/cas-01-seo" anchor={t.id}>{t.label}</Link>
                  </li>
                ))}
              </ol>
            </nav>

            <section aria-labelledby="etapes">
              <h2 id="etapes" tabIndex={-1}>Les 5 étapes de préparation</h2>

              <h3>1. Décrypter l’offre</h3>
              <p>
                Repérez les trois attentes qui reviennent le plus dans l’annonce (compétences, contexte,
                résultats attendus). Pour chacune, notez une expérience qui y répond. C’est la base de tout
                l’entretien. Les fiches métiers cadres de l’Apec aident à situer les missions et les compétences
                habituellement attendues pour ce type de poste.
              </p>

              <h3>2. Comprendre l’entreprise</h3>
              <p>
                Site, actualités récentes, rapports publics, fiches entreprises, profils des futurs collègues :
                cherchez ce qui explique pourquoi le poste est ouvert maintenant. Une question informée sur ce contexte vaut
                mieux qu’une liste de chiffres récités.
              </p>

              <h3>3. Préparer votre présentation et vos exemples</h3>
              <p>
                Construisez une présentation de deux minutes et trois exemples concrets, structurés en
                situation, action, résultat. Avec un parcours long, choisissez les réalisations les plus
                proches du poste plutôt que de tout raconter.
              </p>

              <h3>4. S’entraîner à voix haute</h3>
              <p>
                Formuler ses réponses à voix haute révèle ce qui reste flou. Vous pouvez commencer seul avec
                le <Link to="/service/simulateur-entretien?from=cas-3">simulateur d’entretien en ligne, pour vous entraîner en autonomie</Link>.
                Si vous préférez apprendre avec d’autres, l’
                <Link to="/service/atelier-entretiens?from=cas-3">atelier collectif « Réussir vos entretiens de recrutement »</Link>{' '}
                passe en revue les différents types d’entretien.
              </p>
              <p className="callout">
                <strong>Votre entretien est déjà fixé ?</strong>{' '}
                <Link to="/service/entretien-programme?from=cas-3">Répétez-le lors d’une simulation individuelle avec un{'\u00a0'}consultant</Link>,
                adaptée au poste visé.
              </p>

              <h3>5. Régler la logistique et vos questions</h3>
              <p>
                Vérifiez le format (sur place, visio, téléphone), le nom de votre interlocuteur et la durée
                prévue. Préparez deux ou trois questions sur les priorités du poste. Pensez aussi à la
                rémunération : <Link to="/conseil/remuneration">quelques repères pour aborder le salaire sereinement</Link>.
              </p>
            </section>

            <section aria-labelledby="questions">
              <h2 id="questions" tabIndex={-1}>Exemples de questions et pistes de réponse</h2>
              <dl className="qa">
                {QUESTIONS.map((x) => (
                  <div key={x.q} className="qa__item">
                    <dt>« {x.q} »</dt>
                    <dd>
                      {x.a}
                      {x.link && (
                        <>
                          {' '}<Link to="/conseil/remuneration">Voir comment préparer votre fourchette</Link>. Pour
                          traduire un montant brut en net, utilisez le{' '}
                          <a href={URSSAF_BRUT_NET} target="_blank" rel="noopener noreferrer">
                            convertisseur salaire brut / net de l’Urssaf<span className="visually-hidden"> (site externe, nouvel onglet)</span>
                          </a>{' '}
                          <External size={14} />.
                        </>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
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

            <SolutionsCards />

          </article>

          <aside className="sidebar" aria-label="Pour aller plus loin">
            <SolutionsCompact />
            <h2 className="sidebar__heading">Sur le même sujet</h2>
            <SideArticleCard
              to="/conseil/remuneration"
              photo={PHOTOS.conversation}
              title="Aborder la rémunération en entretien : trois repères"
              date="19/11/2026"
              rubric="Repères"
            />
          </aside>
        </div>

      </div>
    </ProtoLayout>
  )
}

const SEO_TITLE = 'Comment préparer un entretien de recrutement ? 5 étapes'
const SEO_DESC =
  'Analyser l’offre, préparer vos exemples, vous entraîner : la méthode en 5 étapes, des exemples de questions et une checklist pour la veille de l’entretien.'

const LINK_MAP = [
  ['Conseil — préparer un entretien', 'Simulateur d’entretien', '« simulateur d’entretien en ligne, pour vous entraîner en autonomie »', 'S’entraîner seul'],
  ['Conseil — préparer un entretien', 'Atelier « Réussir vos entretiens »', '« atelier collectif Réussir vos entretiens de recrutement »', 'Se préparer en groupe'],
  ['Conseil — préparer un entretien', 'Entretien programmé (simulation)', '« Répétez-le lors d’une simulation individuelle avec un consultant »', 'Entretien déjà fixé'],
  ['Conseil — préparer un entretien', 'Repères rémunération', '« quelques repères pour aborder le salaire »', 'Question fréquente'],
  ['Conseil — questions (salaire)', 'Convertisseur Urssaf (externe)', '« convertisseur salaire brut / net de l’Urssaf »', 'Passer du brut au net'],
  ...CAS3_SOLUTIONS.map((s) => ['Conseil — bloc final et colonne', s.official, s.format === 'humain' ? `« ${s.cta} : ${s.official} »` : `« ${s.cta} »`, s.focus ?? s.title]),
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
      <CrBlock title="Statut de la page">
        <p>
          Page conseil originale, rédigée pour ce portfolio, sans statistique citée. Les services mentionnés renvoient aux
          fiches du prototype, rédigées à partir des pages d’apec.fr. La page « rémunération » est un contenu
          connexe court, utile au{'\u00a0'}lecteur.
        </p>
      </CrBlock>
      <CrBlock title="Services proposés : ordre et provenance">
        <p>
          Les services sont regroupés par besoin (s’entraîner, parler salaire, préparer ses questions) pour garder
          un choix simple{'\u00a0'}; les services selon le profil et en amont de l’entretien sont proposés en
          liens internes.
        </p>
        <p>
          Mêmes groupes, même ordre et mêmes destinations dans la colonne et en bas d’article{'\u00a0'}: dans
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
              <li>Introduction (réponse directe) · Sommaire</li>
              <li>H2 — Les 5 étapes (5 × H3)</li>
              <li>H2 — Exemples de questions</li>
              <li>H2 — Checklist</li>
              <li>H2 — L’Apec vous accompagne pour préparer vos entretiens (3 × H3, un par besoin)</li>
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
