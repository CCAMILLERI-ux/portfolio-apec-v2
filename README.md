# Portfolio de prototypes — Exploration UX, acquisition & conversion

**Exploration UX, acquisition & conversion — Caroline Camilleri**

> Prototype de candidature indépendant — propositions exploratoires, sans affiliation officielle à l’Apec. Aucune inscription réelle.

Portfolio de candidature au poste de Chef de projet animation web. Un seul site présente trois démonstrations courtes. L’accueil les affiche dans l’ordre Cas 01, 02, 03 ; les routes historiques sont conservées pour ne pas casser les liens déjà partagés :

| Cas | Démo | Compétences illustrées |
| --- | --- | --- |
| 02 (`#/cas-02-ab-test`) | **Présenter l’offre par situation** — anciennement « Clarifier l’offre pour faciliter le choix » : entrée par situation, cartes de services, bascule « Version actuelle / Piste exploratoire » | UX/UI, animation du site, hypothèse CRO |
| 03 (`#/cas-03-inscription`) | **Accompagner l’utilisateur à chaque étape de son inscription** — anciennement « Guider un nouvel inscrit » : accueil guidé d’« Alex » (personnage fictif), recommandations explicables, réservation simulée, « Mes services sélectionnés » | Parcours, activation, recommandation déterministe |
| 01 (`#/cas-01-seo`) | **De la recherche Google à l’utilisation des services** — anciennement « Relier une recherche à un accompagnement » : page conseil « Comment préparer un entretien de recrutement ? », maillage interne, compléments SEO, GEO et coordination multicanale | SEO éditorial, maillage, acquisition |

## SEO / GEO : quelques pistes

Route `#/plan-seo` (route historique conservée), accessible depuis l’accueil. « SEO / GEO : quelques pistes » présente mes habitudes de travail et quelques pistes pour l’illustrer, à discuter avec l’équipe — sans constat sur apec.fr ni plan d’action :

0. **Introduction** : ce que je vise dans mes projets (visibilité hors marque, trafic qualifié vers les services, conversion mesurée).
1. **Mes habitudes de travail** : comprendre les données et les usages, prioriser avec l’équipe selon la roadmap, déployer dans le CMS avec les équipes, mesurer et partager.
2. **Quatre piliers SEO / GEO** : mes repères de travail (technique et indexation, contenus et intentions, maillage et parcours, autorité et citabilité).
3. **Contenus et intentions : six situations** : besoin, exemples de recherches, questions posées aux IA, piste de contenu, services (intitulés de « Nos services »).
4. **Une piste illustrée : préparer un entretien de recrutement** : parcours (recherche → page conseil → fiche service → inscription simulée).
5. **Les indicateurs auxquels je suis attentive** : SEO, GEO et conversion, sans objectif chiffré.

Contenus centralisés dans `src/data/seoPlan.ts` ; parcours dans `src/components/SeoJourney.tsx` ; page dans `src/pages/SeoPlan.tsx`.

## Cas 3 — solutions recommandées

La colonne latérale et le bas de l’article présentent la même liste, dans le même ordre et vers les mêmes fiches : accompagnement personnalisé et atelier collectif (photos), puis simulateur d’entretien, Odiapazon et simulateur de salaire cadre (icônes). Source unique : `src/data/cas3.ts`. Lien externe : convertisseur salaire brut / net de l’Urssaf. Data Cadres, fiches métiers et fiches entreprises sont cités dans le texte ; les liens seraient ajoutés dans le CMS.

## Organisation de l’interface

- **Portfolio** (accueil, sources) : identité propre à la candidate (fond crème, Plus Jakarta Sans + Inter, accent terracotta), volontairement distincte de l’univers Apec.
- **Prototypes** : univers inspiré d’apec.fr (bleu nuit, jaune, bleu ; Montserrat), **sans aucune explication dans les écrans utilisateur**.
- **Coulisses du prototype** : masquées par défaut, affichées uniquement au clic sur « Comprendre ce cas », sous le pied de page, dans l’univers portfolio. Elles regroupent la mention d’indépendance, le retour au portfolio, la réinitialisation, la méthode (constat, hypothèse, modification, KPI et garde-fous, équipes), la provenance des informations et le journal local.
- **Barre de démo** (univers portfolio), en haut de page et hors maquette : « Retour au portfolio », nom du cas, choix de variante (cas 1 : Version actuelle / Piste 1 / Piste 2 / Piste 3), « Comprendre ce cas » (affiche ou masque les coulisses) et « Réinitialiser la démo ». Pendant et après une réservation, elle affiche « Réservation simulée… » puis « Simulation terminée — aucun rendez-vous réel n’a été réservé ».
- **Mon espace** : page d’accueil de l’espace fictif d’Alex (guidage, services sélectionnés, rendez-vous, services, conseils).

## Installation et lancement

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

`npm run build` produit un dossier `dist/` statique. Le routage par hash (`#/cas-02-ab-test`) évite toute règle de réécriture ; la base Vite est `/portfolio-apec-v2/`, l’adresse GitHub Pages de cette version. Aucun déploiement n’a été effectué.

## Publication sur GitHub Pages

Le fichier `.github/workflows/deploy-pages.yml` construit et publie le site à chaque push sur `main`. On peut aussi le lancer à la main depuis l’onglet **Actions** → « Publier sur GitHub Pages » → **Run workflow**.

Une seule fois, dans le dépôt : **Settings → Pages → Build and deployment → Source : GitHub Actions**. Sur un compte gratuit, le dépôt doit être public.

Adresse : `https://ccamilleri-ux.github.io/portfolio-apec-v2/` (version 2). La version 1, présentée en entretien, reste en ligne sur `https://ccamilleri-ux.github.io/portfolio-apec/` : voir `ITERATIONS.md`.

Le `noindex` est porté par la balise meta de chaque page. Le `robots.txt` du dossier n’a pas d’effet sous un sous-chemin `github.io` : c’est la balise meta qui empêche l’indexation.

## Parcours de démo en cinq minutes

1. **Accueil** : trois cartes, un clic par cas.
2. **Cas 03 (≈ 2 min)** : « Me guider » → la situation est présélectionnée (modifiable) → cocher « Préparer un entretien », puis « Oui, dans les prochains jours » → les recommandations changent et s’expliquent (« Pourquoi ce service ? ») → « Commencer par ce service » → choisir un créneau fictif → récapitulatif → valider → « Simulation terminée — aucun rendez-vous réel n’a été réservé » → « Mes services sélectionnés » (retirer, modifier ses besoins, reprendre, remettre à zéro).
3. **Cas 02 (≈ 1 min 30)** : changer de situation (« Je recrute et j’ai besoin d’aide ») puis comparer « Version actuelle », « Piste 1 » (visuels illustrés), « Piste 2 » (aide au choix) et « Piste 3 » (photos, ateliers mis en avant) depuis la barre du haut.
4. **Cas 01 (≈ 1 min 30)** : lire l’introduction, suivre « simulation individuelle d’1 h » puis revenir avec la flèche du bandeau ; bouton « Comprendre ce cas » de la barre du haut pour le maillage, l’aperçu du titre, le GEO et la coordination.

La barre du haut propose « Retour au portfolio » et « Réinitialiser la démo » ; chaque fiche a une flèche de retour contextuelle (le lien d’origine est transmis par `?from=`).

## Choix techniques

- React + TypeScript + Vite, CSS simple (`src/styles.css`), sans backend, sans API ni clé.
- Contenus dans des fichiers de données typés : `src/data/services.ts`, `situations.ts`, `onboarding.ts` (règles de recommandation) et `slots.ts` (créneaux fictifs).
- Recommandation **déterministe** : chaque règle ajoute des points et une raison affichée ; départage dans un ordre fixe ; l’âge n’est ni demandé ni utilisé.
- Sauvegarde locale de démonstration (`localStorage`, préfixe `portfolio-demo:`), protégée par try/catch et effacée par « Réinitialiser la démo ».
- Plan d’événements **local** (`service_view`, `service_cta_click`, `onboarding_start`, `onboarding_step_complete`, `recommendation_view`, `booking_start`, `booking_complete_demo`), visible dans le « Journal local » de chaque panneau. Aucun analytics ni traceur externe. Ce ne sont pas des résultats d’expérimentation.
- `noindex, nofollow` sur toutes les pages (balise meta) et `robots.txt` en `Disallow: /`. Les métadonnées de partage identifient un portfolio indépendant.

## Provenance des contenus et des assets

- **Captures d’écran d’apec.fr** : références visuelles uniquement. Elles ne sont **ni versionnées ni servies**, car elles contiennent des données personnelles. Aucun nom, compte, statistique ou témoignage visible sur ces captures n’est repris.
- **Intitulés et modalités** : chaque information porte une provenance dans `services.ts` (`capture` ou `a-verifier`).
  - Observés sur les captures : « Réussir vos entretiens de recrutement », « Entretien programmé : entrainez vous avec un consultant ! » (individuel, face à face, 1 h, gratuit, cadres et jeunes diplômés), « Simulateur d’entretien », « Réussir sa candidature », « Faire de l’IA générative l’alliée de votre recherche emploi » (en groupe, en salle, 4 h, gratuit, cadres et jeunes diplômés), « Créer mon CV », « Odiapazon » (outil en ligne : formuler les questions à poser en entretien, à partir d’une analyse des cinq dimensions du travail, en 10 minutes, résultats téléchargeables).
  - **À vérifier** : tous les services des situations P2 à P6 (premier emploi, CEP, évolution interne, formation, reconversion, services recruteurs), ainsi que les durées, tarifs et publics non visibles. Ils sont affichés avec un badge « à vérifier » et des fiches d’aperçu qui renvoient vers le site officiel. La présélection est présentée comme soumise à conditions (TPE/PME notamment), sans reproduire de critères.
- **Textes** : accroches, bénéfices, page conseil et repères rémunération sont des rédactions originales. Seuls les intitulés et descriptions courtes observés sont cités.
- **Visuels** : illustrations et pictogrammes SVG dessinés pour le prototype ; aucun logo de l’Apec, aucun témoignage.
- **Photographies** (piste 3 du cas 1, carte atelier du cas 3) : 16 photos Unsplash, licence Unsplash (https://unsplash.com/license), dans `public/photos/`. Identifiants d’origine et textes alternatifs dans `src/data/photos.ts` et sur la page « Design system ». Elles ne représentent ni des salariés, ni des consultants, ni des usagers de l’Apec ; crédits sur la page « Design system ».
- **Polices** (SIL Open Font License, servies localement) : Montserrat pour les prototypes, substitution provisoire car la police exacte d’apec.fr n’est pas confirmée ; Plus Jakarta Sans et Inter pour le portfolio.

## Design : ce qui est estimé, ce qui est contrôlé

- **Estimé d’après les captures** : palette (`--brand-navy #252555`, `--brand-yellow #FFC400`, `--brand-blue #026096` (prélevé sur la capture de référence des cartes « Nos consultantes et nos consultants »), etc.), typographie, bandeau bleu nuit avec flèche de retour jaune, carte blanche qui chevauche le bandeau, colonne latérale « Nos services » (carte bleue) / « Nos outils » (carte bleu nuit, pictogramme jaune), bloc modalités 2×2, puces « + » jaunes, bandeau bleu d’appel à l’action, visuels sur aplat jaune avec étiquette carrée (motif « Repères »).
- **Éléments graphiques proposés à partir de ce langage** : visuels de services en aplats jaune / bleu / bleu nuit selon le type d’aide, étiquette carrée « Atelier / Rendez-vous / Outil », tuiles de situation sur bandeau bleu nuit (jaune quand sélectionnée), tuiles d’accompagnement colorées, pastilles de modalités.
- **Modalités** : seules celles qui figurent sur apec.fr sont affichées à l’utilisateur ; les autres sont listées « à confirmer » dans les coulisses.
- **Proposé (non observé)** : états survol, focus, sélection, désactivé et erreur, badges, étapes de progression, récapitulatif. Le mini-kit est visible sur la page « Design system ».
- **Contrôlé** : ratios de contraste calculés (formule WCAG) : bleu nuit sur jaune 8,9:1, bleu nuit sur blanc 14,2:1, blanc sur bleu 6,3:1. Le gris secondaire est foncé à `#5F6673`, car `#6B7280` ne donne que 4,45:1 sur `#F5F5FA`.

## Tests exécutés

- `npm ci` et `npm run build` (TypeScript + Vite) : OK. `npx oxlint src` : seuls restent des avertissements « fast refresh » sans effet sur le build.
- Contrôle automatique : aucun mot d’explication (« simulée », « fictif », « prototype », « démo », « à vérifier », « hypothèse », « persona »…) dans le contenu principal des 10 écrans de prototype ; coulisses et barre présentes sur chacun.
- Script Playwright de bout en bout (hors dépôt), sur le build de prévisualisation, à 1280 px, 640 px et 375 px :
  - les trois cas sont accessibles depuis l’accueil ;
  - le parcours du cas 2 est complet : erreurs de validation, recommandations différentes selon les réponses, mention de simulation avant et après validation, persistance après rechargement, retrait d’une recommandation, remise à zéro ;
  - au cas 1 : changement de situation et même périmètre de services entre « existant » et « piste » ;
  - au cas 3 : chaque lien du maillage mène à la bonne page, avec retour possible ; le sommaire fait défiler ;
  - les 32 liens internes ont été parcourus, sans lien mort ; les liens externes pointent uniquement vers apec.fr ;
  - aucune erreur ni avertissement console, aucune requête en échec, aucune balise `<img>` ;
  - aucun débordement horizontal à 375 px et 640 px ;
  - navigation clavier : bouton atteint, focus visible, radios aux flèches.
- Revue visuelle des captures desktop et mobile.

## Limites et points à vérifier

- Les intitulés et modalités marqués « provisoires » restent à confirmer avec les équipes de l’Apec, de même que l’alignement sur la charte officielle.
- Aucun audit d’accessibilité complet (lecteur d’écran, RGAA) : seuls des contrôles de base ont été faits. Aucune conformité n’est revendiquée.
- Les requêtes SEO sont des hypothèses sans volume ; l’aperçu du titre est pédagogique.
- La bascule de comparaison n’est pas un test A/B. Un vrai test demande une répartition aléatoire stable, un public défini, une instrumentation, un échantillon et une durée adaptés, à fixer avec le webanalyste.
- Le prototype n’est relié à aucun outil (AB Tasty, Piano, Google Analytics, Jahia…) : il illustre une méthode.

## Contrôle des liens vers un consultant

`npm run check:links` (lancé aussi par `npm run build`, donc à chaque mise en ligne) vérifie que tout lien générique vers un consultant (« Échanger avec un consultant », « Prendre rendez-vous avec un consultant », « Vous hésitez ? », « Aucune suggestion ne vous convient ? »…) mène à la réservation du Rendez-vous conseil (`/reserver/rendez-vous-conseil`). Le build échoue sinon, en particulier pour un lien générique vers `/reserver/cep`. `node scripts/check-consultant-links.mjs --list` liste tous les liens vers `/reserver/` et `/service/` avec leur cible.
