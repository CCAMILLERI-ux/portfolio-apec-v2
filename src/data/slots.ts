/**
 * Créneaux et sessions FICTIFS pour la réservation simulée.
 * Aucun lien avec un agenda réel, aucun nom de consultant, aucun centre réel.
 */
export interface Slot {
  id: string
  date: string // libellé lisible
  time: string
  place: string
}

const PLACES = {
  centre: 'Dans votre centre',
  distance: 'À distance, en visio',
}

export const INDIVIDUAL_SLOTS: Slot[] = [
  { id: 'i1', date: 'Mardi 1er décembre', time: '9 h 30', place: PLACES.centre },
  { id: 'i2', date: 'Mardi 1er décembre', time: '14 h 00', place: PLACES.distance },
  { id: 'i3', date: 'Jeudi 3 décembre', time: '10 h 00', place: PLACES.centre },
  { id: 'i4', date: 'Vendredi 4 décembre', time: '16 h 00', place: PLACES.distance },
]

/** Rendez-vous dont le prochain créneau est éloigné (plus de 15 jours) : créneaux fictifs plus tardifs. */
export const LATE_INDIVIDUAL_SLOTS: Slot[] = [
  { id: 'l1', date: 'Mercredi 16 décembre', time: '9 h 30', place: PLACES.centre },
  { id: 'l2', date: 'Jeudi 17 décembre', time: '14 h 00', place: PLACES.distance },
  { id: 'l3', date: 'Lundi 21 décembre', time: '10 h 00', place: PLACES.centre },
  { id: 'l4', date: 'Mardi 22 décembre', time: '16 h 00', place: PLACES.distance },
]

export const WORKSHOP_SESSIONS: Slot[] = [
  { id: 's1', date: 'Lundi 7 décembre', time: '9 h 30', place: PLACES.centre },
  { id: 's2', date: 'Mercredi 9 décembre', time: '14 h 00', place: PLACES.distance },
  { id: 's3', date: 'Mardi 15 décembre', time: '9 h 30', place: PLACES.centre },
]

/* ---------- Inscription à un atelier : sessions par région, en présentiel ou à distance ---------- */

export type WorkshopMode = 'presentiel' | 'distance'

export interface WorkshopSession extends Slot {
  /** « Inscriptions ouvertes » ou « N places disponibles ». */
  availability: string
}

export const WORKSHOP_REGIONS = ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Hauts-de-France', 'Occitanie'] as const
export type WorkshopRegion = (typeof WORKSHOP_REGIONS)[number]

/** Lieux de démonstration par région (présentiel). */
const CENTRES: Record<WorkshopRegion, [string, string]> = {
  'Île-de-France': ['Centre Apec - Paris - Gare de Lyon 75012', 'Centre Apec - Versailles 78000'],
  'Auvergne-Rhône-Alpes': ['Centre Apec - Lyon 69003', 'Centre Apec - Grenoble 38000'],
  'Hauts-de-France': ['Centre Apec - Lille 59000', 'Centre Apec - Amiens 80000'],
  Occitanie: ['Centre Apec - Toulouse 31000', 'Centre Apec - Montpellier 34000'],
}

/** Dates à venir (créneaux de démonstration). */
const DATES: [string, string, string][] = [
  ['Mardi 1er décembre 2026', '9 h 30', 'Inscriptions ouvertes'],
  ['Jeudi 10 décembre 2026', '14 h 00', '4 places disponibles'],
  ['Mardi 15 décembre 2026', '9 h 30', 'Inscriptions ouvertes'],
  ['Jeudi 7 janvier 2027', '14 h 00', '2 places disponibles'],
]

export function workshopSessions(region: WorkshopRegion, mode: WorkshopMode): WorkshopSession[] {
  const [a, b] = CENTRES[region]
  return DATES.map(([date, time, availability], i) => ({
    id: `${mode}-${region}-${i}`,
    date,
    time,
    availability,
    place: mode === 'distance' ? 'À distance' : i % 2 === 0 ? a : b,
  }))
}
