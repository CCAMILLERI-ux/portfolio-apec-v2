import { useId, useRef, useState, type KeyboardEvent } from 'react'

const STORAGE_KEY = 'portfolio-demo:cas02-onglet-utilise'

function readUsed(): boolean {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function writeUsed() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* stockage indisponible : l'aide disparaît quand même pour la page en cours */
  }
}

/**
 * Sélecteur des présentations du cas 02 (barre de démo, hors maquette) : onglets accessibles
 * (role="tablist", flèches, Début, Fin), aide affichée jusqu'au premier changement d'onglet
 * (mémorisé pour la session), pulsation légère des onglets inactifs à l'ouverture
 * (2 cycles, désactivée si l'utilisateur préfère moins d'animations).
 */
export function VariantTabs<T extends string>({
  options,
  value,
  onChange,
  note,
}: {
  options: [T, string][]
  value: T
  onChange: (v: T) => void
  /** Mention permanente sous les onglets. */
  note?: string
}) {
  const [used, setUsed] = useState(readUsed)
  const helpId = useId()
  const noteId = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (v: T) => {
    if (v !== value) {
      if (!used) {
        setUsed(true)
        writeUsed()
      }
      onChange(v)
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = options.length - 1
    const next = e.key === 'ArrowRight' ? (i === last ? 0 : i + 1)
      : e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : -1
    if (next < 0) return
    e.preventDefault()
    refs.current[next]?.focus()
    select(options[next][0])
  }

  const describedBy = [used ? null : helpId, note ? noteId : null].filter(Boolean).join(' ') || undefined

  return (
    <div className="vtabs">
      <div className="vtabs__row">
        <p className="vtabs__label" aria-hidden="true">Comparez les 4 présentations{' '}:</p>
        <div className={`vtabs__list${used ? '' : ' is-fresh'}`} role="tablist" aria-label="Présentations à comparer">
          {options.map(([v, label], i) => {
            const selected = v === value
            return (
              <button
                key={v}
                ref={(el) => { refs.current[i] = el }}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="contenu"
                aria-describedby={describedBy}
                tabIndex={selected ? 0 : -1}
                className={`vtabs__tab${selected ? ' is-active' : ''}`}
                onClick={() => select(v)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
      {!used && <p id={helpId} className="vtabs__help">Cliquez sur un onglet pour changer de{' '}présentation.</p>}
      {note && <p id={noteId} className="vtabs__note">{note}</p>}
    </div>
  )
}
