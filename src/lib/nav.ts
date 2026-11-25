/** Retour contextuel : chaque lien du maillage transmet sa page source (?from=). */
export interface BackTarget {
  to: string
  label: string
  anchor?: string
}

const ORIGINS: Record<string, BackTarget> = {
  'cas-1': { to: '/cas-02-ab-test', label: 'Choisir un service' },
  'cas-3': { to: '/cas-01-seo', label: 'Conseil : préparer un entretien de recrutement' },
  'cas-1-seo': { to: '/cas-01-seo', label: 'Conseil : préparer un entretien de recrutement', anchor: 'accompagnement' },
  'cas-3-accompagnement': { to: '/cas-01-seo', label: 'Conseil : préparer un entretien de recrutement', anchor: 'accompagnement' },
  remuneration: { to: '/conseil/remuneration', label: 'Aborder la rémunération en entretien' },
  etapes: { to: '/cas-03-inscription/services-selectionnes', label: 'Mes services sélectionnés' },
  espace: { to: '/espace', label: 'Mon espace' },
  'plan-seo': { to: '/plan-seo', label: 'SEO / GEO\u00a0: quelques pistes', anchor: 'parcours' },
}

export function backFor(from: string | null): BackTarget {
  return (from && ORIGINS[from]) || ORIGINS['cas-1']
}

/** Libellé du cas pour la barre de démo, selon la page d'origine. */
export function caseLabelFor(from: string): string {
  if (from.startsWith('cas-3') || from === 'cas-1-seo' || from === 'remuneration') return 'Cas 01 · De la recherche en ligne aux services'
  if (from === 'etapes' || from === 'espace') return 'Cas 03 · Un parcours guidé vers les services'
  if (from === 'plan-seo') return 'SEO / GEO\u00a0: quelques pistes'
  return 'Cas 02 · Présenter l’offre par situation'
}

export function safeFrom(from: string | null): string {
  return from && ORIGINS[from] ? from : 'cas-1'
}
