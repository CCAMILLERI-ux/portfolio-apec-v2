/**
 * Sauvegarde locale de démonstration uniquement (localStorage).
 * Aucune donnée personnelle, aucun envoi réseau. Tout accès est protégé :
 * la démo fonctionne aussi si le stockage est indisponible.
 */
const PREFIX = 'portfolio-demo:'

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function save<T>(key: string, value: T) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* stockage indisponible : la démo continue en mémoire */
  }
}

export function resetAll() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k))
    // Progressions mémorisées pour la session (ex. présentations vues du cas 02).
    Object.keys(sessionStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => sessionStorage.removeItem(k))
  } catch {
    /* rien à faire */
  }
  window.dispatchEvent(new Event('portfolio-demo-reset'))
}

/* ---------- Plan d'événements de démonstration (local) ---------- */

export type DemoEventName =
  | 'service_view'
  | 'service_cta_click'
  | 'onboarding_start'
  | 'onboarding_step_complete'
  | 'recommendation_view'
  | 'booking_start'
  | 'booking_complete_demo'

export interface DemoEvent {
  name: DemoEventName
  detail?: string
  at: string
}

const EVENTS_KEY = 'events'

export function track(name: DemoEventName, detail?: string) {
  const list = load<DemoEvent[]>(EVENTS_KEY, [])
  list.push({ name, detail, at: new Date().toISOString() })
  save(EVENTS_KEY, list.slice(-40))
  window.dispatchEvent(new Event('portfolio-demo-event'))
}

export function readEvents(): DemoEvent[] {
  return load<DemoEvent[]>(EVENTS_KEY, [])
}
