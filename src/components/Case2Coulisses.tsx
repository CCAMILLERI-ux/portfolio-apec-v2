import { CrBlock, CroGrid } from './Coulisses'

export const CASE2_EVENTS = [
  'onboarding_start',
  'onboarding_step_complete',
  'recommendation_view',
  'service_cta_click',
  'booking_start',
  'booking_complete_demo',
]

export function Case2Coulisses() {
  return (
    <>
      <h3 className="coulisses__case">Cas 03 — Un parcours guidé vers les services</h3>
      <CrBlock title="Scénario et cadre de la démo">
        <ul>
          <li>
            Scénario fictif : <strong>Alex</strong>, cadre expérimenté, vient de créer son compte pour chercher un
            emploi. Il connaît peu les ateliers, outils et accompagnements.
          </li>
          <li>La situation et les besoins sont pré-remplis d’après ce scénario ; tout est modifiable.</li>
          <li>L’âge n’est ni demandé ni utilisé : les recommandations reposent uniquement sur les réponses.</li>
          <li>« Mes services sélectionnés » utilise une sauvegarde locale de démonstration, effacée par « Réinitialiser la démo » (barre du haut). « Mon espace » est la page d’accueil de l’espace de démonstration.</li>
        </ul>
      </CrBlock>
      <CrBlock title="Mon espace">
        <p>
          L’espace candidat est reproduit tel qu’il existe. Seul ajout{'\u00a0'}: un encart mis en avant (étiquette « Nouveau »),
          en tête de la carte « Ma relation avec l’Apec »{'\u00a0'}: il ouvre le parcours guidé, puis donne accès aux services{'\u00a0'}sélectionnés.
        </p>
      </CrBlock>
      <CrBlock title="Prise de rendez-vous">
        <p>
          Prise de rendez-vous{'\u00a0'}: 24 motifs officiels de rendez-vous individuels (16 pour les candidats, 8 pour les
          recruteurs), regroupés selon les situations de « Nos services », avec une porte d’entrée pour les candidats qui ne
          savent pas par où commencer. Le panneau ne contient que des rendez-vous individuels{'\u00a0'}: quand le prochain
          créneau est éloigné, une ligne discrète signale l’atelier sur le même sujet, qui a lieu plus tôt, et un lien
          mène aux ateliers pour ceux qui préfèrent le collectif. L’offre complète reste accessible en un{'\u00a0'}clic.
        </p>
      </CrBlock>
      <CrBlock title="Direction graphique">
        <p>
          De grandes icônes pour décider vite, des photos pour les services, où une personne accompagne, des
          illustrations pour l’accueil et le suivi. Hypothèse à tester avec l’équipe : des recommandations plus humaines
          pourraient augmenter le taux d’inscriptions{'\u00a0'}finalisées.
        </p>
      </CrBlock>
      <CroGrid
        rubrics={{
          constat: (
            <p>
              Après la création d’un compte, une personne qui découvre l’offre de l’Apec cherche par où commencer. Un
              guidage court peut l’aider à trouver une première action utile, en complément des accès{'\u00a0'}existants.
            </p>
          ),
          hypothese: (
            <p>
              Si l’on propose, sans l’imposer, un guidage court qui aboutit à une première action concrète, alors
              davantage de nouveaux inscrits pourraient utiliser un service. Hypothèse à tester avec{'\u00a0'}l’équipe.
            </p>
          ),
          modification: (
            <ul>
              <li>Choix entre « Me guider » et « Explorer librement ».</li>
              <li>Trois questions, puis des recommandations, chacune justifiée.</li>
              <li>Règles déterministes lisibles (pas d’IA).</li>
              <li>Le candidat compose sa sélection{'\u00a0'}: trois suggestions mises en avant, les autres services pertinents accessibles, plusieurs choix possibles.</li>
              <li>Aide humaine en alternative (Rendez-vous conseil), page « Mes services sélectionnés » (à réserver, réservés, outils à utiliser).</li>
            </ul>
          ),
          kpi: (
            <>
              <p><strong>KPI principal :</strong> part des nouveaux inscrits réalisant une première action utile après l’accueil.</p>
              <p><strong>Secondaire :</strong> progression dans le guidage.</p>
              <p><strong>Qualité :</strong> présence effective, satisfaction, adéquation du service.</p>
              <p><strong>Garde-fous :</strong> abandon du guidage, accès direct aux services, accessibilité.</p>
            </>
          ),
          equipes: (
            <ul>
              <li>Produit et DSI : déclenchement après inscription, stockage des préférences, RGPD.</li>
              <li>Consultants et équipes métier : pertinence des règles.</li>
              <li>Marketing relationnel (CRM) : cohérence avec les emails de bienvenue.</li>
              <li>Webanalyste : définition de la « première action utile » et marquage.</li>
            </ul>
          ),
        }}
      />
      <CrBlock title="Règles de recommandation">
        <table className="data-table">
          <caption className="visually-hidden">Règles de recommandation</caption>
          <thead><tr><th scope="col">Si…</th><th scope="col">Alors on propose</th></tr></thead>
          <tbody>
            <tr><td>« Préparer un entretien » et entretien déjà programmé</td><td>Simulation individuelle avec un consultant</td></tr>
            <tr><td>« Préparer un entretien », pas encore d’entretien</td><td>Atelier entretiens (+ simulateur en complément)</td></tr>
            <tr><td>« Préparer un entretien »</td><td>Odiapazon (questions à poser), puis atelier « Parler rémunération en entretiens » et simulateur de salaire</td></tr>
            <tr><td>« Actualiser mon CV » ou « Valoriser mon expérience »</td><td>Conseil sur la candidature (+ outil CV)</td></tr>
            <tr><td>« Valoriser mon expérience »</td><td>Rendez-vous « Faire de son expérience un atout - Expérience et talents »</td></tr>
            <tr><td>« Identifier mes possibilités », ou évolution / changement de voie</td><td>Conseil en évolution professionnelle</td></tr>
          </tbody>
        </table>
        <p>Trois suggestions mises en avant, les autres dans «{'\u00a0'}Également utiles pour vous{'\u00a0'}». Départage dans un ordre fixe : les mêmes réponses donnent toujours le même{'\u00a0'}résultat.</p>
      </CrBlock>
    </>
  )
}
