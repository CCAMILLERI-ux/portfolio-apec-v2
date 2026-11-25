/**
 * Cas 01 — article « Comment préparer un entretien de recrutement ? » : sources, questions fréquentes,
 * métadonnées et données structurées (JSON-LD).
 *
 * Règle : seuls les chiffres listés dans SOURCES sont cités dans l'article, chacun avec sa source.
 * Aucun autre chiffre n'est avancé. Rédaction et relecture : personnages fictifs du prototype.
 */

export const ARTICLE_PATH = '/cas-01-seo'
export const ARTICLE_URL = 'https://ccamilleri-ux.github.io/portfolio-apec-v2/#/cas-01-seo'
export const ARTICLE_H1 = 'Comment préparer un entretien de recrutement ?'
export const SEO_TITLE = 'Préparer un entretien de recrutement : méthode, questions, salaire'
export const SEO_DESC =
  'La méthode en 5 étapes, les types d’entretien, les questions à poser et des repères de rémunération sourcés pour préparer un entretien de recrutement cadre.'
export const DATE_PUBLISHED = '2026-11-19'
export const DATE_MODIFIED = '2026-11-25'
export const AUTHOR = 'Équipe éditoriale (fictive)'
export const REVIEWER = 'Consultant Apec (fictif)'

export interface Source {
  id: string
  label: string
  publisher: string
  date: string
  method: string
  url?: string
  /** Chiffres ou constats cités dans l'article. */
  cites: string
}

export const SOURCES: Source[] = [
  {
    id: 'source-simulateur',
    label: 'Simulateur : s’entraîner à l’entretien de recrutement',
    publisher: 'Apec, apec.fr',
    date: 'page consultée en novembre 2026',
    method: 'Page de présentation de l’outil.',
    url: 'https://www.apec.fr/tous-nos-outils/fiche-outils/simulateur--sentrainer-a-lentretien-de-recrutement.html',
    cites: '69 % des entreprises commencent par une présélection téléphonique ; 12 semaines de durée moyenne d’un recrutement de cadre.',
  },
  {
    id: 'source-barometre-t4',
    label: 'Baromètre Apec – 4e trimestre 2026',
    publisher: 'Apec',
    date: 'novembre 2026',
    method: 'Enquêtes réalisées du 1ᵉʳ au 15 septembre 2026 auprès de 2 000 cadres et 1 000 entreprises.',
    url: 'https://corporate.apec.fr/home/nos-etudes/toutes-nos-etudes/barometre-apec-4e-trimestre-2026.html',
    cites: '6 % des entreprises prévoient de recruter des cadres au 4ᵉ trimestre 2026 ; 14 % des cadres envisagent de changer d’entreprise dans les trois mois, 38 % dans l’année.',
  },
  {
    id: 'source-remuneration',
    label: 'Baromètre 2026 de la rémunération des cadres',
    publisher: 'Apec',
    date: 'novembre 2026',
    method: 'Enquête de juin 2026 auprès de 19 000 cadres du secteur privé.',
    url: 'https://corporate.apec.fr/home/nos-etudes/toutes-nos-etudes/barometre-2026-de-la-remuneration-des-cadres.html',
    cites: 'Rémunération annuelle brute médiane de 54 k€ (fixe + variable), dont 52 k€ de fixe ; huit cadres sur dix entre 38 k€ et 93 k€ ; 68 % des offres cadres sur apec.fr avec un salaire affiché ; 61 % des cadres ayant changé d’entreprise sans passer par le chômage augmentés.',
  },
  {
    id: 'source-attentes',
    label: 'Attentes des cadres en matière de recrutement',
    publisher: 'Apec',
    date: '2024',
    method: 'Étude Apec ; aucun chiffre n’en est repris dans l’article.',
    cites: 'Attentes des cadres : processus resserrés, déroulé plus lisible, informations plus pertinentes sur le poste.',
  },
  {
    id: 'source-pratiques',
    label: 'Pratiques de recrutement des cadres',
    publisher: 'Apec',
    date: 'étude Apec',
    method: 'Aucun chiffre n’en est repris dans l’article.',
    cites: 'Recul de la lettre de motivation au profit de la présélection téléphonique.',
  },
]

/** Segment de réponse : texte, ou lien interne du prototype. */
export type Segment = string | { to: string; label: string; anchor?: string }

export interface Faq {
  q: string
  a: Segment[]
}

export const FAQ: Faq[] = [
  {
    q: 'Combien de temps dure un recrutement de cadre ?',
    a: [
      'En moyenne 12 semaines. Prévoyez plusieurs étapes, poursuivez vos autres démarches en parallèle et relancez si le délai annoncé est dépassé.',
    ],
  },
  {
    q: 'Faut-il encore une lettre de motivation ?',
    a: [
      'Elle est progressivement remplacée par la présélection téléphonique, par laquelle commencent 69 % des entreprises. Préparez surtout votre pitch : deux minutes pour présenter votre parcours et ce que vous apportez au poste.',
    ],
  },
  {
    q: 'Comment répondre à la question du salaire ?',
    a: [
      'Donnez une fourchette en brut annuel. Repère de départ : en juin 2026, la rémunération brute médiane des cadres du privé est de 54 k€ (fixe + variable). Affinez-la selon le poste, la région et l’expérience avec le ',
      { to: '/service/simulateur-salaire?from=cas-3', label: 'Simulateur de salaire cadre' },
      '.',
    ],
  },
  {
    q: 'Quelles questions poser au recruteur ?',
    a: [
      'Des questions sur les priorités du poste, l’équipe, les critères de réussite et les prochaines étapes du recrutement. Pour les formuler à partir de vos propres attentes, utilisez ',
      { to: '/service/odiapazon?from=cas-3', label: 'Odiapazon' },
      '.',
    ],
  },
  {
    q: 'Comment se préparer à un entretien en visio ?',
    a: [
      'Testez la connexion, le son et la caméra la veille, choisissez un fond neutre et un lieu calme, et regardez la caméra quand vous répondez. Gardez l’offre et vos notes à portée de main.',
    ],
  },
  {
    q: 'Le marché de l’emploi des cadres est-il favorable en ce moment ?',
    a: [
      'Fin 2026, seules 6 % des entreprises prévoient de recruter des cadres, tandis que 14 % des cadres envisagent de changer d’entreprise dans les trois mois. Chaque entretien compte : les ',
      { to: '/cas-02-ab-test', label: 'services d’accompagnement de l’Apec' },
      ' aident à s’y préparer.',
    ],
  },
]

export const faqText = (f: Faq) => f.a.map((s) => (typeof s === 'string' ? s : s.label)).join('')

/** Données structurées : Article, fil d'Ariane et questions fréquentes (mêmes textes que la page). */
export function articleJsonLd() {
  const clean = (t: string) => t.replace(/ /g, ' ')
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: clean(ARTICLE_H1),
      description: SEO_DESC,
      author: { '@type': 'Organization', name: AUTHOR },
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
      publisher: { '@type': 'Organization', name: 'Portfolio de candidature (prototype indépendant, sans affiliation à l’Apec)' },
      mainEntityOfPage: ARTICLE_URL,
      inLanguage: 'fr-FR',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Conseils', item: ARTICLE_URL.replace('/cas-01-seo', '/') },
        { '@type': 'ListItem', position: 2, name: 'Entretiens de recrutement', item: ARTICLE_URL },
        { '@type': 'ListItem', position: 3, name: clean(ARTICLE_H1) },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: clean(f.q),
        acceptedAnswer: { '@type': 'Answer', text: clean(faqText(f)) },
      })),
    },
  ]
}
