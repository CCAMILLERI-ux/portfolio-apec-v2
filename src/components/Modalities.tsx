import type { Modality } from '../data/services'
import { Clock, Download, Gift, People, Target } from './Icons'

const ICON: Record<Modality['label'], typeof Clock> = { Format: People, Durée: Clock, Tarif: Gift, Public: Target, Résultats: Download }

/** Modalités vérifiées uniquement : rien d'inventé n'est affiché à l'utilisateur. */
export function verified(items: Modality[]) {
  return items.filter((m) => m.provenance === 'capture')
}

/** Bloc modalités 2×2, d'après le motif observé sur les fiches. */
export function Modalities({ items }: { items: Modality[] }) {
  const shown = verified(items)
  if (shown.length === 0) return null
  return (
    <dl className="modalities">
      {shown.map((m) => {
        const Icon = ICON[m.label]
        return (
          <div key={m.label} className="modalities__item">
            <Icon size={26} className="modalities__icon" />
            <dt className="visually-hidden">{m.label}</dt>
            <dd>{m.value}</dd>
          </div>
        )
      })}
    </dl>
  )
}

/** Variante en pastilles pour les cartes. */
export function ModalityChips({ items }: { items: Modality[] }) {
  const shown = verified(items)
  if (shown.length === 0) return null
  return (
    <ul className="chips" aria-label="Modalités">
      {shown.map((m) => {
        const Icon = ICON[m.label]
        return (
          <li key={m.label} className="chip">
            <Icon size={16} /> <span className="visually-hidden">{m.label}{'\u00a0'}: </span>{m.value}
          </li>
        )
      })}
    </ul>
  )
}
