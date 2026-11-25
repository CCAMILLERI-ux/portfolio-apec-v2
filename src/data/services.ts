/**
 * Données de la démo — services représentatifs.
 *
 * Règle de provenance :
 * - "capture" : intitulé ou modalité lisible sur les captures d'apec.fr
 *   fournies comme références (consultées en novembre 2026, non versionnées).
 * - "a-verifier" : intitulé ou modalité NON contrôlé (le site public n'était
 *   pas accessible depuis l'environnement de développement). À confirmer sur
 *   apec.fr avant toute présentation comme information officielle.
 *
 * Les « accroches » et « bénéfices » sont des propositions rédactionnelles de
 * la candidate, distinctes des intitulés existants.
 */

import { ATELIER_SERVICES, ATELIER_SUMMARY } from './ateliers'
import { RDV_SERVICES, RDV_SUMMARY } from './rendezVous'

export type Provenance = 'capture' | 'a-verifier'
export type ServiceKind = 'atelier' | 'individuel' | 'outil'
export type Audience = 'candidat' | 'recruteur'
export type IllustrationKey =
  | 'groupe'
  | 'echange'
  | 'outil'
  | 'document'
  | 'boussole'
  | 'recrutement'

export interface Modality {
  label: 'Format' | 'Durée' | 'Tarif' | 'Public' | 'Résultats'
  value: string
  provenance: Provenance
}

export type ServiceAction =
  | { kind: 'booking'; label: string } // réservation simulée dans la démo
  | { kind: 'external'; label: string; url: string } // page officielle (référence ; le prototype simule l'action)

export interface Service {
  id: string
  audience: Audience
  /** Intitulé repris de la version actuelle (ou à vérifier). */
  officialTitle: string
  titleProvenance: Provenance
  /** Accroche proposée par le prototype. */
  hook: string
  /** Bénéfice formulé du point de vue de l'utilisateur. */
  benefit: string
  kind: ServiceKind
  modalities: Modality[]
  illustration: IllustrationKey
  action: ServiceAction
  /** Fiche détaillée (parcours entretien et accueil guidé) ou synthétique. */
  depth: 'detaillee' | 'synthese'
  /** Description courte observée sur apec.fr, citée telle quelle si disponible. */
  observedSummary?: string
  /** Libellé du bouton d'action observé sur la capture, pour la vue « existant ». */
  observedCta?: string
  /** Contenu de la fiche détaillée (rédaction du prototype). */
  details?: {
    points: string[]
    forWhom: string
    prepare?: string
  }
  /** Mention de périmètre affichée sur une fiche synthétique. */
  scopeNote?: string
}

export const KIND_LABEL: Record<ServiceKind, string> = {
  atelier: 'Atelier collectif',
  individuel: 'Accompagnement individuel',
  outil: 'Outil autonome',
}

export const OFFICIAL_SERVICES_URL = 'https://www.apec.fr/tous-nos-services.html'
export const OFFICIAL_TOOLS_URL = 'https://www.apec.fr/tous-nos-outils.html'
export const OFFICIAL_RECRUITER_URL = 'https://www.apec.fr/recruteur.html'
export const OFFICIAL_CANDIDATE_URL = 'https://www.apec.fr/candidat.html'

const TBC = (label: Modality['label']): Modality => ({
  label,
  value: `${label} à confirmer`,
  provenance: 'a-verifier',
})

/** Rendez-vous dont l'intitulé est relevé sur « Tous nos services » (modalités non reprises). */
const LISTED_RDV_NOTE =
  'Fiche d’aperçu : intitulé repris de la page « Tous nos services » d’apec.fr ; durée, tarif et public restent à confirmer.'

/** Services relevés sur la page « Tous nos services » : seuls l'intitulé et le format (et une durée si indiquée) sont repris. */
/** Outils relevés sur « Tous nos outils » : intitulé et phrase de présentation seulement. */
const TOOLS_NOTE =
  'Fiche d’aperçu : intitulé et présentation repris de la page « Tous nos outils » d’apec.fr ; l’outil n’est pas reproduit dans la démo.'

const LISTED_NOTE =
  'Fiche d’aperçu : intitulé et format repris de la page « Tous nos services » d’apec.fr ; inscription simulée dans le prototype.'

export const SERVICES: Service[] = [
  /* ---------------- Parcours entretien (fiches détaillées) ---------------- */
  {
    id: 'atelier-entretiens',
    audience: 'candidat',
    officialTitle: 'Réussir vos entretiens de recrutement',
    titleProvenance: 'capture',
    hook: 'Préparez chaque type d’entretien en groupe',
    benefit:
      'Comprendre les attentes des recruteurs et s’exercer avec d’autres cadres, guidé par un consultant.',
    kind: 'atelier',
    modalities: [
      { label: 'Format', value: 'Atelier collectif', provenance: 'capture' },
      TBC('Durée'),
      TBC('Tarif'),
      TBC('Public'),
    ],
    illustration: 'groupe',
    action: { kind: 'booking', label: 'Voir les sessions' },
    depth: 'detaillee',
    observedSummary:
      'Un atelier pour maîtriser chaque type d’entretien d’embauche et les transformer en opportunités concrètes !',
    observedCta: 'Inscrivez-vous',
    details: {
      points: [
        'Repérer les différents formats d’entretien (téléphonique, visio, jury, entretien technique).',
        'Structurer une présentation de son parcours et de ses réalisations.',
        'S’exercer aux questions fréquentes et recevoir des retours du groupe.',
      ],
      forWhom:
        'Les personnes qui veulent se préparer en amont, sans attendre d’avoir un entretien programmé.',
      prepare:
        'Venir avec une ou deux offres qui vous intéressent et la version actuelle de votre CV.',
    },
  },
  {
    id: 'entretien-programme',
    audience: 'candidat',
    officialTitle: 'Entretien programmé : entrainez vous avec un consultant !',
    titleProvenance: 'capture',
    hook: 'Un entretien prévu ? Répétez-le avec un consultant',
    benefit:
      'Une simulation sur mesure, adaptée au poste visé, suivie d’un retour personnalisé et d’un plan d’action.',
    kind: 'individuel',
    modalities: [
      { label: 'Format', value: 'Individuel, en face à face', provenance: 'capture' },
      TBC('Durée'), // aucune durée indiquée par l'Apec
      { label: 'Tarif', value: 'Service gratuit', provenance: 'capture' },
      { label: 'Public', value: 'Cadres et jeunes diplômés', provenance: 'capture' },
    ],
    illustration: 'echange',
    action: { kind: 'booking', label: 'Découvrir le rendez-vous' },
    depth: 'detaillee',
    observedSummary:
      'Préparez-vous sereinement pour votre entretien d’embauche avec une simulation sur-mesure et le feedback d’un professionnel !',
    observedCta: 'Prenez rendez-vous',
    details: {
      points: [
        'Simulation personnalisée : un cadre réaliste, adapté à votre profil et au poste visé.',
        'Retour d’un professionnel : vos atouts et les points à travailler.',
        'Plan d’action concret pour les jours qui précèdent l’entretien.',
      ],
      forWhom:
        'Les cadres en recherche active qui ont un entretien prévu dans les jours à venir, quel que soit leur niveau d’expérience.',
      prepare:
        'Avoir sous la main l’offre d’emploi, le nom de l’entreprise et le format annoncé de l’entretien.',
    },
  },
  {
    id: 'simulateur-entretien',
    audience: 'candidat',
    officialTitle: 'Simulateur d’entretien',
    titleProvenance: 'capture',
    hook: 'Entraînez-vous seul, à votre rythme',
    benefit:
      'Vivre l’entretien des deux côtés pour anticiper les questions, à tout moment et sans rendez-vous.',
    kind: 'outil',
    modalities: [
      { label: 'Format', value: 'Outil en ligne', provenance: 'capture' },
      TBC('Durée'),
      TBC('Tarif'),
      TBC('Public'),
    ],
    illustration: 'outil',
    action: {
      kind: 'external',
      label: 'Trouver l’outil sur apec.fr',
      url: OFFICIAL_TOOLS_URL,
    },
    depth: 'detaillee',
    observedSummary:
      'Un outil pratique pour s’entraîner avant un rdv. Vivez l’entretien de recrutement des 2 côtés pour mieux répondre le jour J.',
    observedCta: 'Démarrez',
    details: {
      points: [
        'S’entraîner en autonomie, avant un atelier ou une simulation individuelle.',
        'Se mettre aussi à la place du recruteur pour mieux comprendre ses attentes.',
      ],
      forWhom: 'Les personnes qui préfèrent commencer seules ou s’entraîner plusieurs fois.',
    },
    scopeNote:
      'L’outil n’est pas reproduit dans la démo : « Lancer l’outil » le signale dans la barre de démo.',
  },
  {
    id: 'candidature',
    audience: 'candidat',
    officialTitle: 'Réussir sa candidature',
    titleProvenance: 'capture',
    hook: 'Faites relire votre CV avant de postuler',
    benefit:
      'Des conseils personnalisés sur votre CV pour mettre en avant votre expérience face à une offre.',
    kind: 'individuel',
    modalities: [
      { label: 'Format', value: 'Conseil individuel sur votre CV', provenance: 'capture' },
      { label: 'Durée', value: '45 minutes', provenance: 'capture' },
      TBC('Tarif'),
      TBC('Public'),
    ],
    illustration: 'document',
    action: { kind: 'booking', label: 'Découvrir le rendez-vous' },
    depth: 'detaillee',
    observedSummary:
      'Avant de postuler, envoyez-nous votre CV et bénéficiez de conseils personnalisés.',
    observedCta: 'Prenez rendez-vous',
    details: {
      points: [
        'Faire ressortir les réalisations les plus utiles pour le poste visé.',
        'Adapter le CV à une offre précise.',
        'Repartir avec des pistes de reformulation.',
      ],
      forWhom:
        'Les cadres qui veulent actualiser un CV ou valoriser un parcours riche avant de postuler.',
      prepare: 'Préparer votre CV actuel et une offre qui vous intéresse.',
    },
  },
  {
    id: 'atelier-iag',
    audience: 'candidat',
    officialTitle: 'Faire de l’IA générative l’alliée de votre recherche emploi',
    titleProvenance: 'capture',
    hook: 'Utilisez l’IA générative avec méthode et recul',
    benefit:
      'Apprendre à rédiger des consignes utiles et à garder un regard critique sur les résultats, pour vos candidatures.',
    kind: 'atelier',
    modalities: [
      { label: 'Format', value: 'En groupe, en salle', provenance: 'capture' },
      { label: 'Durée', value: '4 h', provenance: 'capture' },
      { label: 'Tarif', value: 'Service gratuit', provenance: 'capture' },
      { label: 'Public', value: 'Cadres et jeunes diplômés', provenance: 'capture' },
    ],
    illustration: 'groupe',
    action: { kind: 'booking', label: 'Voir les sessions' },
    depth: 'detaillee',
    observedSummary:
      'Améliorer votre recherche d’emploi avec l’aide de l’intelligence artificielle générative',
    observedCta: 'Inscrivez-vous',
    details: {
      points: [
        'Utiliser l’IA générative en sécurité pour gagner en efficacité sur ses candidatures.',
        'Rédiger des consignes (prompts) en connaissant les limites et les risques.',
        'Gagner en autonomie, quel que soit son niveau de départ.',
      ],
      forWhom:
        'Tous niveaux de familiarité avec l’IA générative, du curieux débutant à l’utilisateur intermédiaire.',
    },
  },
  {
    id: 'creer-cv',
    audience: 'candidat',
    officialTitle: 'Créer mon CV',
    titleProvenance: 'capture',
    hook: 'Mettez votre CV à jour en autonomie',
    benefit: 'Un outil pour structurer ou actualiser votre CV quand vous le souhaitez.',
    kind: 'outil',
    modalities: [
      { label: 'Format', value: 'Outil en ligne', provenance: 'capture' },
      TBC('Durée'),
      TBC('Tarif'),
      TBC('Public'),
    ],
    illustration: 'document',
    action: {
      kind: 'external',
      label: 'Trouver l’outil sur apec.fr',
      url: OFFICIAL_TOOLS_URL,
    },
    depth: 'synthese',
    scopeNote:
      'L’outil n’est pas reproduit dans la démo : « Lancer l’outil » le signale dans la barre de démo.',
  },

  {
    id: 'odiapazon',
    audience: 'candidat',
    officialTitle: 'Odiapazon',
    titleProvenance: 'capture',
    hook: 'Formulez les questions qui comptent pour vous',
    benefit:
      'En 10 minutes, un formulaire en ligne analyse vos attentes sur les cinq dimensions du travail. Vous téléchargez vos résultats et des suggestions de questions à approfondir lors de votre prochain entretien.',
    kind: 'outil',
    modalities: [
      { label: 'Format', value: 'Outil en ligne (formulaire)', provenance: 'capture' },
      { label: 'Durée', value: '10 minutes', provenance: 'capture' },
      { label: 'Résultats', value: 'Résultats téléchargeables', provenance: 'capture' },
      TBC('Tarif'),
      TBC('Public'),
    ],
    illustration: 'outil',
    action: { kind: 'external', label: 'Trouver l’outil sur apec.fr', url: OFFICIAL_TOOLS_URL },
    depth: 'synthese',
    observedCta: 'Commencez',
    scopeNote:
      'L’outil n’est pas reproduit dans la démo : « Lancer l’outil » le signale dans la barre de démo. L’accès réel (lien direct, compte Apec éventuel) serait précisé lors de la mise en œuvre.',
  },
  {
    id: 'simulateur-salaire',
    audience: 'candidat',
    officialTitle: 'Simulateur de salaire cadre',
    titleProvenance: 'a-verifier',
    hook: 'Situez votre rémunération par rapport au marché',
    benefit: 'Disposer de repères de marché pour préparer ses prétentions salariales.',
    kind: 'outil',
    modalities: [TBC('Format'), TBC('Durée'), TBC('Tarif'), TBC('Public')],
    illustration: 'outil',
    action: { kind: 'external', label: 'Trouver l’outil sur apec.fr', url: OFFICIAL_TOOLS_URL },
    depth: 'synthese',
    scopeNote:
      'Fiche d’aperçu : intitulé provisoire ; lien direct et conditions d’accès (compte Apec éventuel) à confirmer avec les équipes. L’outil n’est pas reproduit dans la démo.',
  },

  /* ---------------- Cas 01 : services liés à l'entretien (intitulés relevés sur « Tous nos services ») ---------------- */
  {
    id: 'atelier-remuneration',
    audience: 'candidat',
    officialTitle: 'Parler rémunération en entretiens',
    titleProvenance: 'capture',
    hook: 'Préparez vos prétentions salariales pour l’entretien',
    benefit: 'Arriver en entretien avec une position claire sur la rémunération.',
    kind: 'atelier',
    modalities: [{ label: 'Format', value: 'Atelier', provenance: 'capture' }, TBC('Durée'), TBC('Tarif'), TBC('Public')],
    illustration: 'groupe',
    action: { kind: 'external', label: 'Voir l’atelier sur apec.fr', url: OFFICIAL_SERVICES_URL },
    depth: 'synthese',
    scopeNote: LISTED_NOTE,
  },
  {
    id: 'jeunes-diplomes-confiance',
    audience: 'candidat',
    officialTitle: 'Jeunes diplômés : gagnez en confiance, même sans expérience',
    titleProvenance: 'capture',
    hook: 'Présentez vos atouts, même avec peu d’expérience',
    benefit: 'Mettre en valeur ce que vous apportez au poste, même en début de parcours.',
    kind: 'atelier',
    modalities: [{ label: 'Format', value: 'Atelier', provenance: 'capture' }, TBC('Durée'), TBC('Tarif'), TBC('Public')],
    illustration: 'groupe',
    action: { kind: 'external', label: 'Voir l’atelier sur apec.fr', url: OFFICIAL_SERVICES_URL },
    depth: 'synthese',
    scopeNote: LISTED_NOTE,
  },
  {
    id: 'remuneration-premier-emploi',
    audience: 'candidat',
    officialTitle: 'Aborder la rémunération pour un 1er emploi',
    titleProvenance: 'capture',
    hook: 'Discutez et négociez votre salaire de premier emploi',
    benefit: 'Aborder la question du salaire sereinement, dès le premier poste.',
    kind: 'atelier',
    modalities: [{ label: 'Format', value: 'Atelier', provenance: 'capture' }, TBC('Durée'), TBC('Tarif'), TBC('Public')],
    illustration: 'groupe',
    action: { kind: 'external', label: 'Voir l’atelier sur apec.fr', url: OFFICIAL_SERVICES_URL },
    depth: 'synthese',
    scopeNote: LISTED_NOTE,
  },
  {
    id: 'experience-senior',
    audience: 'candidat',
    officialTitle: 'Valoriser les atouts de son expérience senior',
    titleProvenance: 'capture',
    hook: 'Faites de votre expérience un atout',
    benefit: 'Montrer au recruteur ce que votre parcours apporte au poste visé.',
    kind: 'atelier',
    modalities: [{ label: 'Format', value: 'Atelier', provenance: 'capture' }, TBC('Durée'), TBC('Tarif'), TBC('Public')],
    illustration: 'groupe',
    action: { kind: 'external', label: 'Voir l’atelier sur apec.fr', url: OFFICIAL_SERVICES_URL },
    depth: 'synthese',
    scopeNote: LISTED_NOTE,
  },

  /* ---------------- Fiches synthétiques (intitulés à vérifier) ---------------- */
  {
    id: 'cep',
    audience: 'candidat',
    officialTitle: 'Conseil en évolution professionnelle',
    titleProvenance: 'capture',
    hook: 'Faites le point avec un consultant sur votre projet',
    benefit:
      'Prendre du recul sur son parcours, clarifier ses options et construire un projet, en poste ou en transition.',
    kind: 'individuel',
    modalities: [
      { label: 'Format', value: 'Accompagnement individuel', provenance: 'a-verifier' },
      TBC('Durée'),
      { label: 'Tarif', value: 'Gratuit', provenance: 'capture' },
      TBC('Public'),
    ],
    illustration: 'boussole',
    action: { kind: 'booking', label: 'Découvrir le rendez-vous' },
    depth: 'synthese',
    scopeNote:
      'Fiche d’aperçu : intitulé et gratuité repris de la page « Tous nos services » d’apec.fr ; les autres modalités restent à confirmer.',
  },
  {
    id: 'cles-emploi',
    audience: 'candidat',
    officialTitle: 'Clés d’Emploi',
    titleProvenance: 'capture',
    hook: 'Préparez votre entrée dans la vie professionnelle',
    benefit: 'Clarifier son projet et cibler ses premières candidatures après les études.',
    kind: 'individuel',
    modalities: [TBC('Format'), TBC('Durée'), TBC('Tarif'), TBC('Public')],
    illustration: 'boussole',
    action: { kind: 'booking', label: 'Découvrir le rendez-vous' },
    depth: 'synthese',
    scopeNote: LISTED_RDV_NOTE,
  },
  {
    id: 'quel-job',
    audience: 'candidat',
    officialTitle: 'Quel job avec mon diplôme ?',
    titleProvenance: 'capture',
    hook: 'Spécial 1er emploi',
    benefit: 'Découvrez les métiers accessibles avec votre diplôme.',
    kind: 'outil',
    modalities: [TBC('Format'), TBC('Durée'), TBC('Tarif'), TBC('Public')],
    illustration: 'outil',
    action: { kind: 'external', label: 'Trouver l’outil sur apec.fr', url: OFFICIAL_TOOLS_URL },
    depth: 'synthese',
    scopeNote: TOOLS_NOTE,
  },
  {
    id: 'evolution-interne',
    audience: 'candidat',
    officialTitle: 'Evoluer en interne : mode d’emploi',
    titleProvenance: 'capture',
    hook: 'Préparez une évolution dans votre entreprise',
    benefit: 'Un atelier pour comprendre comment évoluer au sein de votre entreprise.',
    kind: 'atelier',
    modalities: [
      { label: 'Format', value: 'Atelier', provenance: 'capture' },
      { label: 'Durée', value: '60 min', provenance: 'capture' },
      TBC('Tarif'),
      TBC('Public'),
    ],
    illustration: 'groupe',
    action: { kind: 'external', label: 'Voir l’atelier sur apec.fr', url: OFFICIAL_SERVICES_URL },
    depth: 'synthese',
    scopeNote: LISTED_NOTE,
  },
  {
    id: 'trajectoires',
    audience: 'candidat',
    officialTitle: 'Trajectoires',
    titleProvenance: 'capture',
    hook: 'Identifiez les évolutions professionnelles possibles',
    benefit: 'Explorez les évolutions professionnelles possibles à partir de votre métier actuel.',
    kind: 'outil',
    modalities: [TBC('Format'), TBC('Durée'), TBC('Tarif'), TBC('Public')],
    illustration: 'outil',
    action: { kind: 'external', label: 'Trouver l’outil sur apec.fr', url: OFFICIAL_TOOLS_URL },
    depth: 'synthese',
    scopeNote: TOOLS_NOTE,
  },
  {
    id: 'reconversion',
    audience: 'candidat',
    officialTitle: 'Reconversion, comment faire ?',
    titleProvenance: 'capture',
    hook: 'Un webinaire pour préparer votre reconversion',
    benefit: 'Une heure pour comprendre comment mener une reconversion professionnelle.',
    kind: 'atelier',
    modalities: [
      { label: 'Format', value: 'Webinaire', provenance: 'capture' },
      { label: 'Durée', value: '1 h', provenance: 'capture' },
      TBC('Tarif'),
      TBC('Public'),
    ],
    illustration: 'groupe',
    action: { kind: 'external', label: 'Voir le webinaire sur apec.fr', url: OFFICIAL_SERVICES_URL },
    depth: 'synthese',
    scopeNote: LISTED_NOTE,
  },
  {
    id: 'fiches-metiers',
    audience: 'candidat',
    officialTitle: 'Fiches métiers cadres',
    titleProvenance: 'capture',
    hook: 'Des centaines de métiers à découvrir',
    benefit: 'Parcourez des fiches pour découvrir des métiers cadres avant de vous décider.',
    kind: 'outil',
    modalities: [TBC('Format'), TBC('Durée'), TBC('Tarif'), TBC('Public')],
    illustration: 'outil',
    action: { kind: 'external', label: 'Trouver l’outil sur apec.fr', url: OFFICIAL_TOOLS_URL },
    depth: 'synthese',
    scopeNote: TOOLS_NOTE,
  },
  {
    id: 'conseil-recrutement',
    audience: 'recruteur',
    officialTitle: 'Rencontrer un consultant',
    titleProvenance: 'capture',
    hook: 'Faites-vous aider pour cadrer un recrutement',
    benefit: 'Un échange avec un consultant pour définir le poste, le profil recherché et la démarche.',
    kind: 'individuel',
    modalities: [TBC('Format'), TBC('Durée'), TBC('Tarif'), TBC('Public')],
    illustration: 'recrutement',
    action: { kind: 'external', label: 'Voir le service sur apec.fr', url: OFFICIAL_SERVICES_URL },
    depth: 'synthese',
    scopeNote: LISTED_RDV_NOTE,
  },
  {
    id: 'offre-attractive',
    audience: 'recruteur',
    officialTitle: 'Rédiger une offre d’emploi attractive, les incontournables',
    titleProvenance: 'capture',
    hook: 'Les incontournables d’une offre attractive',
    benefit: 'Un atelier pour rédiger une offre d’emploi qui donne envie aux candidats de postuler.',
    kind: 'atelier',
    modalities: [{ label: 'Format', value: 'Atelier', provenance: 'capture' }, TBC('Durée'), TBC('Tarif'), TBC('Public')],
    illustration: 'recrutement',
    action: { kind: 'external', label: 'Voir l’atelier sur apec.fr', url: OFFICIAL_SERVICES_URL },
    depth: 'synthese',
    scopeNote: LISTED_NOTE,
  },
  {
    id: 'osim',
    audience: 'recruteur',
    officialTitle: 'Osim',
    titleProvenance: 'capture',
    hook: 'Créez vos mises en situation professionnelle',
    benefit: 'Un outil en ligne pour créer des mises en situation professionnelle pour vos recrutements.',
    kind: 'outil',
    modalities: [TBC('Format'), TBC('Durée'), TBC('Tarif'), TBC('Public')],
    illustration: 'recrutement',
    action: { kind: 'external', label: 'Trouver l’outil sur apec.fr', url: OFFICIAL_TOOLS_URL },
    depth: 'synthese',
    scopeNote: TOOLS_NOTE,
  },
]

// Rendez-vous individuels du panneau « Prendre un rendez-vous individuel » (src/data/rendezVous.ts).
SERVICES.push(...RDV_SERVICES)
// Ateliers de la vue « Nos services » filtrée sur le format atelier (src/data/ateliers.ts).
SERVICES.push(...ATELIER_SERVICES)
// Phrase officielle de chaque atelier (page « Tous nos services »).
for (const s of SERVICES) if (ATELIER_SUMMARY[s.id]) s.observedSummary = ATELIER_SUMMARY[s.id]
// Phrase officielle de chaque rendez-vous (même page).
for (const s of SERVICES) if (RDV_SUMMARY[s.id]) s.observedSummary = RDV_SUMMARY[s.id]

export const SERVICE_BY_ID: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.id, s]),
)

/** Phrase sous l'accroche : bénéfice rédigé, sinon phrase de présentation officielle (ateliers). */
export function pitchOf(s: Service): string {
  return s.benefit || s.observedSummary || ''
}

export function getService(id: string): Service | undefined {
  return SERVICE_BY_ID[id]
}
