/**
 * Ateliers de la vue « Nos services » filtrée sur le format atelier : les 39 ateliers de la page
 * « Tous nos services » d'apec.fr (bouton « Inscrivez-vous »), classés selon les 5 situations.
 *
 * Intitulés repris tels quels. Aucune durée ni modalité n'est inventée : seules indications
 * affichées, celles fournies pour cette version (1 h, 60 min, webinaire, présentiel ou à distance)
 * et les mentions « webatelier », « webinaire » ou « en ligne » lorsqu'elles figurent dans l'intitulé.
 * Les accroches sont des propositions rédactionnelles de la candidate.
 *
 * Statut : « present » (déjà dans le catalogue), « deplace » (anciennement rendez-vous),
 * « ajoute » (nouvel atelier déclaré ici et ajouté au catalogue).
 */
import type { Audience, Modality, Service } from './services'

export type AtelierStatus = 'present' | 'deplace' | 'ajoute'

export interface AtelierEntry {
  id: string
  status: AtelierStatus
}

export interface AtelierGroup {
  /** Identifiant de la situation (libellé et icône lus dans situations.ts). */
  situationId: string
  ateliers: AtelierEntry[]
}

const TBC = (label: Modality['label']): Modality => ({ label, value: `${label} à confirmer`, provenance: 'a-verifier' })
const known = (label: Modality['label'], value: string): Modality => ({ label, value, provenance: 'capture' })

const NOTE =
  'Fiche d’aperçu : intitulé repris de la page « Tous nos services » d’apec.fr ; inscription simulée dans le prototype.'

/** Atelier déclaré ici : intitulé officiel, accroche proposée, format et durée seulement s'ils sont connus. */
const atelier = (
  id: string,
  officialTitle: string,
  hook: string,
  opts: { format?: string; duree?: string; audience?: Audience } = {},
): Service => ({
  id,
  audience: opts.audience ?? 'candidat',
  officialTitle,
  titleProvenance: 'capture',
  hook,
  /** Pas de bénéfice rédigé : la phrase de présentation officielle reste à reprendre d'apec.fr. */
  benefit: '',
  kind: 'atelier',
  modalities: [
    known('Format', opts.format ?? 'Atelier'),
    opts.duree ? known('Durée', opts.duree) : TBC('Durée'),
    TBC('Tarif'),
    TBC('Public'),
  ],
  illustration: opts.audience === 'recruteur' ? 'recrutement' : 'groupe',
  action: { kind: 'booking', label: 'Inscrivez-vous' },
  depth: 'synthese',
  observedCta: 'Inscrivez-vous',
  scopeNote: NOTE,
})

const R = { audience: 'recruteur' as const }

/** Ateliers ajoutés au catalogue (29) et atelier déplacé des rendez-vous (« Comment valoriser votre doctorat ? »). */
export const ATELIER_SERVICES: Service[] = [
  // Je cherche un nouvel emploi
  atelier('convaincre-cv', 'Convaincre avec vos CV, lettre et Profil Apec', 'Des candidatures qui donnent envie de vous rencontrer', { format: 'En présentiel ou à distance' }),
  atelier('personal-branding', 'Faire son profil réseaux sociaux - Débuter avec le personal branding', 'Soignez votre profil sur les réseaux sociaux'),
  atelier('oser-reseau', 'Oser faire du réseau', 'Faites du réseau un réflexe'),
  atelier('explorer-marche', 'Explorer votre marché pour décider et agir efficacement', 'Repérez où vos compétences sont recherchées'),
  atelier('changer-travail', 'Changer de travail, comment faire ?', 'Les étapes pour changer de travail', { duree: '1 h' }),
  atelier('chomage-un-an', 'Retrouver un emploi après un an de chômage', 'Relancez votre recherche, pas à pas'),
  atelier('travailler-etranger', 'Travailler à l’étranger, les bons réflexes', 'Préparez une recherche d’emploi à l’étranger'),
  // Je prépare mon premier emploi
  atelier('objectif-premier-emploi', 'Objectif premier emploi', 'Organisez votre recherche de premier emploi'),
  atelier('premier-emploi-atelier', 'Premier emploi', 'Les repères pour décrocher un premier poste'),
  atelier('stage-alternance', 'Objectif Stage et Alternance', 'Trouvez votre stage ou votre alternance'),
  atelier('doctorat', 'Comment valoriser votre doctorat ?', 'Présentez votre doctorat aux recruteurs'),
  // Je souhaite évoluer dans ma carrière
  atelier('devenir-manager', 'Devenir manager : les questions à se poser', 'Faites le point avant de devenir manager'),
  atelier('competences', 'Identifier, formaliser & développer vos compétences pour évoluer', 'Mettez des mots sur vos compétences'),
  atelier('remuneration-transparence', 'Parler rémunération en toute transparence', 'Abordez la rémunération avec votre employeur'),
  atelier('motivation', 'Développer votre motivation professionnelle', 'Retrouvez ce qui vous motive au travail'),
  atelier('derniere-partie-carriere', 'Comment bien préparer sa dernière partie de carrière ?', 'Anticipez la suite de votre parcours'),
  atelier('autres-formes-emploi', 'Oser explorer d’autres formes d’emploi', 'Découvrez d’autres façons de travailler'),
  // Je réfléchis à une reconversion
  atelier('demission-reconversion', 'Démission pour reconversion - Comprendre le dispositif avant de s’engager', 'Comprenez le dispositif avant de vous engager', { format: 'Webinaire', duree: '1 h' }),
  atelier('immersion-entreprise', 'Donnez un tournant à votre carrière, grâce à l’immersion en entreprise', 'Découvrez un métier en entreprise'),
  atelier('durables-candidat', 'Agir pour des métiers et des entreprises plus durables - Atelier Candidat', 'Orientez votre parcours vers des métiers durables'),
  // Je recrute et j'ai besoin d'aide
  atelier('cvtheques', 'Rechercher des profils dans les CVthèques et les réseaux sociaux professionnels, les incontournables', 'Trouvez des profils dans les CVthèques et sur les réseaux', R),
  atelier('entretien-recrutement-webatelier', 'Entretien de recrutement, les incontournables - webatelier', 'Les bases d’un entretien de recrutement', { ...R, format: 'Webatelier' }),
  atelier('marque-employeur', 'Marque employeur, les incontournables - webatelier', 'Les bases d’une marque employeur', { ...R, format: 'Webatelier' }),
  atelier('integrer-recrues', 'Intégrer les nouvelles recrues, les incontournables - webatelier', 'Réussissez l’intégration de vos recrues', { ...R, format: 'Webatelier' }),
  atelier('ia-recrutements', 'Commencez à intégrer l’IA dans vos recrutements', 'Premiers pas avec l’IA dans vos recrutements', R),
  atelier('transparence-remunerations', 'Transparence des rémunérations : anticipez, sécurisez, valorisez !', 'Préparez-vous à la transparence des rémunérations', R),
  atelier('durables-recruteur', 'Agir pour des métiers et des entreprises plus durables - Atelier recruteur', 'Faites évoluer vos métiers vers plus de durabilité', R),
  atelier('experience-avenir', 'L’expérience a de l’avenir', 'Valorisez l’expérience dans vos recrutements', R),
  atelier('entretien-parcours', 'Mener un entretien de parcours professionnel, les incontournables', 'Les bases de l’entretien de parcours professionnel', R),
  atelier('entretien-parcours-webinaire', 'L’entretien de parcours professionnel : transformez vos usages - Webinaire', 'Faites évoluer vos entretiens de parcours', { ...R, format: 'Webinaire' }),
]

const p = (id: string): AtelierEntry => ({ id, status: 'present' })
const a = (id: string): AtelierEntry => ({ id, status: 'ajoute' })

/** Classement par situation (ordre de la page « Tous nos services »). */
export const ATELIER_GROUPS: AtelierGroup[] = [
  {
    situationId: 'nouvel-emploi',
    ateliers: [a('convaincre-cv'), p('atelier-entretiens'), p('atelier-remuneration'), a('personal-branding'), a('oser-reseau'), p('atelier-iag'), a('explorer-marche'), a('changer-travail'), a('chomage-un-an'), p('experience-senior'), a('travailler-etranger')],
  },
  {
    situationId: 'premier-emploi',
    ateliers: [a('objectif-premier-emploi'), a('premier-emploi-atelier'), p('jeunes-diplomes-confiance'), p('remuneration-premier-emploi'), a('stage-alternance'), { id: 'doctorat', status: 'deplace' }],
  },
  {
    situationId: 'evoluer',
    ateliers: [p('evolution-interne'), a('devenir-manager'), a('competences'), a('remuneration-transparence'), a('motivation'), a('derniere-partie-carriere'), a('autres-formes-emploi')],
  },
  {
    situationId: 'reconversion',
    ateliers: [p('reconversion'), a('demission-reconversion'), a('immersion-entreprise'), a('durables-candidat')],
  },
  {
    situationId: 'recruter-aide',
    ateliers: [p('offre-attractive'), a('cvtheques'), a('entretien-recrutement-webatelier'), a('marque-employeur'), a('integrer-recrues'), a('ia-recrutements'), a('transparence-remunerations'), a('durables-recruteur'), a('experience-avenir'), a('entretien-parcours'), a('entretien-parcours-webinaire')],
  },
]

export const ATELIER_COUNT = ATELIER_GROUPS.reduce((n, g) => n + g.ateliers.length, 0)
