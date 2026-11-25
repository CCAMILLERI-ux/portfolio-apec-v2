import { useCallback, useEffect, useState } from 'react'

/** Présentations du cas 02 déjà consultées, mémorisées pour la session (effacées par « Réinitialiser la démo »). */
export const SEEN_KEY = 'portfolio-demo:cas02-vues'

function read(): string[] {
  try {
    const raw = window.sessionStorage.getItem(SEEN_KEY)
    const list = raw ? JSON.parse(raw) : []
    return Array.isArray(list) ? list.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

function write(list: string[]) {
  try {
    window.sessionStorage.setItem(SEEN_KEY, JSON.stringify(list))
  } catch {
    /* stockage indisponible : la progression reste valable pour la page en cours */
  }
}

/**
 * La présentation affichée est toujours comptée comme vue. `markSeen` est appelé au changement
 * d'onglet ; `reset` repart d'une seule présentation vue (« Réinitialiser la démo »).
 */
export function useSeenViews(current: string) {
  const [stored, setStored] = useState<string[]>(read)
  const seen = stored.includes(current) ? stored : [...stored, current]
  // Synchronisation avec le stockage de session (système externe), sans changer l'état React.
  useEffect(() => { write(seen) }, [seen.join('|')]) // eslint-disable-line react-hooks/exhaustive-deps
  const markSeen = useCallback((next: string) => {
    setStored((s) => [...new Set([...s, current, next])])
  }, [current])
  const reset = useCallback((start: string) => {
    write([start])
    setStored([start])
  }, [])
  return { seen, markSeen, reset }
}

/** Prochaine présentation non vue, dans l'ordre des onglets, en partant de l'onglet affiché. */
export function nextUnseen<T extends string>(order: T[], current: T, seen: string[]): T | undefined {
  const i = order.indexOf(current)
  for (let k = 1; k <= order.length; k++) {
    const v = order[(i + k) % order.length]
    if (!seen.includes(v)) return v
  }
  return undefined
}
