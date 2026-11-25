/**
 * Prise de rendez-vous individuel : 24 motifs, tous des entretiens individuels avec un consultant
 * (sur apec.fr, « rendez-vous » ne désigne que ce format ; les ateliers sont proposés à part).
 * - Candidats : 16 motifs, regroupés selon les 4 situations candidat de « Nos services », plus le
 *   « Rendez-vous conseil » réservé à l'encart « Je ne sais pas par où commencer ».
 * - Recruteurs : 8 motifs, situation « Je recrute et j'ai besoin d'aide ».
 *
 * Intitulés relevés sur la page « Tous nos services » d'apec.fr. Aucune durée, aucun prix ni
 * aucune modalité n'est inventé : seules indications affichées, « 45 min » pour « Réussir sa
 * candidature » et « Gratuit » pour le CEP. Les phrases « Idéal si… » sont des aides au choix
 * rédigées par la candidate, pas des informations officielles.
 *
 * Délai du prochain créneau : donnée FICTIVE de la démo. Au-delà de 15 jours, le panneau signale
 * l'atelier équivalent (même situation, même thème), qui a lieu plus tôt.
 */
import { IDEAL_IF } from './piste2'
import type { Audience, Modality, Service } from './services'

/** Les 4 situations candidat et la situation recruteur de « Nos services » (identifiants de situations.ts). */
export type RdvNeedId = 'nouvel-emploi' | 'premier-emploi' | 'evoluer' | 'reconversion' | 'recruter-aide'

export interface RdvMotif {
  serviceId: string
  /** Aide au choix (rédaction de la candidate). */
  ideal: string
  /** Seule information pratique affichée, lorsqu'elle est relevée sur apec.fr. */
  tag?: string
  /** Délai fictif avant le prochain créneau, en jours. */
  nextSlotInDays: number
  /** Atelier équivalent (même situation, même thème), proposé si le créneau est éloigné. */
  workshopId?: string
}

export interface RdvNeed {
  /** Identifiant de la situation (libellé et icône lus dans situations.ts). */
  id: RdvNeedId
  audience: Audience
  motifs: RdvMotif[]
}

/** Au-delà de ce délai (jours), le prochain créneau est considéré comme éloigné. */
export const FAR_SLOT_DAYS = 15

const TBC = (label: Modality['label']): Modality => ({ label, value: `${label} à confirmer`, provenance: 'a-verifier' })

const NOTE =
  'Fiche d’aperçu : intitulé repris de la page « Tous nos services » d’apec.fr ; le contenu du rendez-vous n’est pas détaillé dans la démo.'

/** Rendez-vous individuel déclaré pour le panneau : intitulé officiel, rien d'autre d'affirmé. */
const rdv = (
  id: string,
  officialTitle: string,
  ideal: string,
  illustration: Service['illustration'] = 'echange',
  text?: { hook: string; benefit: string },
  audience: Audience = 'candidat',
): Service => ({
  id,
  audience,
  officialTitle,
  titleProvenance: 'capture',
  hook: text?.hook ?? 'Un rendez-vous individuel avec un consultant Apec',
  benefit: text?.benefit ?? `Idéal si ${ideal}.`,
  kind: 'individuel',
  modalities: [TBC('Format'), TBC('Durée'), TBC('Tarif'), TBC('Public')],
  illustration,
  action: { kind: 'booking', label: 'Prendre rendez-vous' },
  depth: 'synthese',
  scopeNote: NOTE,
})

/** « Idéal si » propres au panneau ; ceux des services de « Nos services » viennent de piste2.ts. */
const IDEAL = {
  'potentiel-marche': 'vous voulez savoir si votre profil est recherché',
  'experience-talents': 'vous voulez valoriser votre parcours',
  'mi-carriere': 'vous cherchez un nouveau défi',
  international: 'vous visez un poste à l’étranger',
  'rendez-vous-conseil': 'vous voulez faire le point sur votre situation',
  'solution-formation': 'vous voulez structurer et financer une formation',
  'diagnostic-formation': 'vous hésitez entre plusieurs formations',
  'formation-embauche': 'un poste vous attend, avec des compétences à acquérir',
  'pret-creation': 'vous vous posez la question',
  'challenger-idee': 'vous avez un projet à confronter',
  'accompagnement-creation': 'vous vous lancez',
  'preselection-candidats': 'vous recevez beaucoup de candidatures',
  'audit-marque-employeur': 'vous voulez attirer davantage de candidats',
  'audit-sourcing': 'vous ne trouvez pas les profils recherchés',
  'audit-process-recrutement': 'vous voulez fluidifier vos recrutements',
  'formez-avant-embaucher': 'vous ne trouvez pas de candidat déjà formé',
  'immersion-recrutement': 'vous voulez préparer un recrutement à venir',
  'cep-collaborateurs': 'vos salariés s’interrogent sur leur évolution',
} as const

const R = 'recruteur' as const

/** Les rendez-vous déclarés pour le panneau (changement-poste est aussi affiché sur « Nos services »). */
export const RDV_SERVICES: Service[] = [
  rdv('potentiel-marche', 'Votre Potentiel Marché', IDEAL['potentiel-marche'], 'boussole'),
  rdv('experience-talents', 'Faire de son expérience un atout - Expérience et talents', IDEAL['experience-talents']),
  // Aussi affiché sur « Nos services » (situation « évoluer ») : accroche propre.
  rdv('changement-poste', 'Concrétiser son changement de poste', IDEAL_IF['changement-poste'], 'boussole', {
    hook: 'Concrétisez votre changement de poste',
    benefit: 'Un rendez-vous individuel avec un consultant pour passer de l’opportunité au nouveau poste.',
  }),
  rdv('mi-carriere', 'Evoluer à mi-carrière', IDEAL['mi-carriere'], 'boussole'),
  rdv('international', 'Rendez-vous conseil international', IDEAL.international, 'boussole'),
  rdv('rendez-vous-conseil', 'Rendez-vous conseil', IDEAL['rendez-vous-conseil']),
  rdv('solution-formation', 'Solution Formation', IDEAL['solution-formation'], 'document'),
  rdv('diagnostic-formation', 'Diagnostic Formation', IDEAL['diagnostic-formation'], 'document'),
  rdv('formation-embauche', 'Une prise de poste efficace avec une formation avant l’embauche', IDEAL['formation-embauche'], 'document'),
  rdv('pret-creation', 'Etes-vous prêt pour la création d’entreprise ?', IDEAL['pret-creation'], 'boussole'),
  rdv('challenger-idee', 'Créer son entreprise : challenger son idée', IDEAL['challenger-idee'], 'boussole'),
  rdv('accompagnement-creation', 'Etre accompagné dans sa création d’entreprise', IDEAL['accompagnement-creation'], 'boussole'),
  // Recruteurs (« Rencontrer un consultant » est déjà au catalogue : conseil-recrutement).
  rdv('preselection-candidats', 'Déléguer la présélection de ses candidats', IDEAL['preselection-candidats'], 'recrutement', undefined, R),
  rdv('audit-marque-employeur', 'Faire un audit de sa marque employeur', IDEAL['audit-marque-employeur'], 'recrutement', undefined, R),
  rdv('audit-sourcing', 'Faire un audit de son sourcing de candidats', IDEAL['audit-sourcing'], 'recrutement', undefined, R),
  rdv('audit-process-recrutement', 'Faire un audit de votre process de recrutement', IDEAL['audit-process-recrutement'], 'recrutement', undefined, R),
  rdv('formez-avant-embaucher', 'Formez avant d’embaucher', IDEAL['formez-avant-embaucher'], 'recrutement', undefined, R),
  rdv('immersion-recrutement', 'L’immersion professionnelle, une solution pour anticiper vos recrutements ?', IDEAL['immersion-recrutement'], 'recrutement', undefined, R),
  rdv('cep-collaborateurs', 'Faire accompagner vos collaborateurs avec le Conseil en Evolution Professionnelle', IDEAL['cep-collaborateurs'], 'recrutement', undefined, R),
]

/** Un seul « Idéal si » par service : celui de « Nos services » s'il existe, sinon celui du panneau. */
const m = (serviceId: string, nextSlotInDays: number, opts: { tag?: string; workshopId?: string } = {}): RdvMotif => ({
  serviceId,
  ideal: IDEAL_IF[serviceId] ?? IDEAL[serviceId as keyof typeof IDEAL],
  nextSlotInDays,
  ...opts,
})

/** Le premier motif de chaque situation est le rendez-vous mis en avant sur « Nos services ». */
export const RDV_NEEDS: RdvNeed[] = [
  {
    id: 'nouvel-emploi',
    audience: 'candidat',
    motifs: [
      m('candidature', 21, { tag: '45 min', workshopId: 'convaincre-cv' }),
      m('entretien-programme', 4),
      m('potentiel-marche', 24, { workshopId: 'explorer-marche' }),
      m('experience-talents', 8),
      m('formation-embauche', 6),
    ],
  },
  { id: 'premier-emploi', audience: 'candidat', motifs: [m('cles-emploi', 18, { workshopId: 'objectif-premier-emploi' })] },
  {
    id: 'evoluer',
    audience: 'candidat',
    motifs: [m('changement-poste', 20, { workshopId: 'evolution-interne' }), m('mi-carriere', 7), m('international', 9)],
  },
  {
    id: 'reconversion',
    audience: 'candidat',
    motifs: [
      m('cep', 28, { tag: 'Gratuit', workshopId: 'reconversion' }),
      m('diagnostic-formation', 6),
      m('solution-formation', 8),
      m('pret-creation', 5),
      m('challenger-idee', 10),
      m('accompagnement-creation', 12),
    ],
  },
  {
    id: 'recruter-aide',
    audience: 'recruteur',
    motifs: [
      m('conseil-recrutement', 5),
      m('preselection-candidats', 7),
      m('audit-marque-employeur', 26, { workshopId: 'marque-employeur' }),
      m('audit-sourcing', 22, { workshopId: 'cvtheques' }),
      m('audit-process-recrutement', 9),
      m('formez-avant-embaucher', 6),
      m('immersion-recrutement', 11),
      m('cep-collaborateurs', 8),
    ],
  },
]

/** Porte d'entrée « Je ne sais pas par où commencer » (candidats, hors tuiles). */
export const RDV_START: RdvMotif = m('rendez-vous-conseil', 3)

/** Total affiché dans « Voir tous les motifs » : motifs des situations + Rendez-vous conseil (24). */
export const RDV_COUNT = RDV_NEEDS.reduce((n, g) => n + g.motifs.length, 0) + 1

/** Porte d'entrée pour les candidats qui ne savent pas par où commencer. */
export const RDV_START_ID = RDV_START.serviceId

/** Délai fictif du prochain créneau d'un rendez-vous (réservation simulée). */
export function nextSlotInDays(serviceId: string): number | undefined {
  if (serviceId === RDV_START_ID) return RDV_START.nextSlotInDays
  for (const n of RDV_NEEDS) {
    const mo = n.motifs.find((x) => x.serviceId === serviceId)
    if (mo) return mo.nextSlotInDays
  }
  return undefined
}
