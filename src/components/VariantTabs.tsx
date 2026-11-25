import { useId, useRef, type KeyboardEvent } from 'react'
import { Check } from './Icons'

/** Flèche vers le haut (vers les onglets), décorative. */
function ArrowUp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  )
}

/**
 * Sélecteur des présentations du cas 02 (barre de démo, hors maquette) : onglets accessibles
 * (role="tablist", flèches, Début, Fin), coche sur les présentations déjà vues, pulsation de la
 * prochaine présentation à voir (sauf animations réduites), bandeau d'appel permanent avec compteur.
 */
export function VariantTabs<T extends string>({
  options,
  value,
  onChange,
  seen,
  next,
}: {
  options: [T, string][]
  value: T
  onChange: (v: T) => void
  /** Présentations déjà consultées pendant la session. */
  seen: string[]
  /** Prochaine présentation à voir (aucune quand les 4 ont été vues). */
  next?: T
}) {
  const bannerId = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const total = options.length
  const count = options.filter(([v]) => seen.includes(v)).length
  const done = count >= total

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = options.length - 1
    const to = e.key === 'ArrowRight' ? (i === last ? 0 : i + 1)
      : e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : -1
    if (to < 0) return
    e.preventDefault()
    refs.current[to]?.focus()
    onChange(options[to][0])
  }

  return (
    <div className="vtabs">
      <div className="vtabs__row">
        <p className="vtabs__label" aria-hidden="true">Comparez les 4 présentations{' '}:</p>
        <div className="vtabs__list" role="tablist" aria-label="Présentations à comparer">
          {options.map(([v, label], i) => {
            const selected = v === value
            const wasSeen = seen.includes(v)
            return (
              <button
                key={v}
                ref={(el) => { refs.current[i] = el }}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="contenu"
                aria-describedby={bannerId}
                tabIndex={selected ? 0 : -1}
                className={`vtabs__tab${selected ? ' is-active' : ''}${wasSeen ? ' is-seen' : ''}${v === next ? ' is-next' : ''}`}
                onClick={() => onChange(v)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                {wasSeen && <Check size={14} className="vtabs__check" />}
                {label}
                {wasSeen && !selected && <span className="visually-hidden"> (déjà vue)</span>}
              </button>
            )
          })}
        </div>
      </div>
      <div id={bannerId} className={`vtabs__banner${done ? ' is-done' : ''}`}>
        <span className="vtabs__banner-icon">{done ? <Check size={20} /> : <ArrowUp />}</span>
        <p className="vtabs__banner-text">
          {done ? (
            <><strong>Vous avez vu les 4 présentations.</strong> Laquelle vous aide le plus à{' '}choisir{' '}?</>
          ) : (
            <><strong>À découvrir{' '}: 4 présentations de la même page.</strong> Cliquez sur chaque onglet pour les{' '}comparer.</>
          )}
        </p>
        <p className="vtabs__count" role="status" aria-live="polite">
          Vu{' '}: {count}{' '}/{' '}{total}
        </p>
      </div>
    </div>
  )
}
