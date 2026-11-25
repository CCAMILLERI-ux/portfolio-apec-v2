import { nb } from '../lib/text'
import { useEffect, useId, useRef, useState } from 'react'
import { KIND_LABEL, type Service } from '../data/services'
import { FAR_SLOT_DAYS, nextSlotInDays } from '../data/rendezVous'
import { INDIVIDUAL_SLOTS, LATE_INDIVIDUAL_SLOTS, WORKSHOP_SESSIONS, type Slot } from '../data/slots'
import { track } from '../lib/storage'
import { Calendar, Check, Pin } from './Icons'

export interface BookingResult {
  serviceId: string
  slot: Slot
}

/**
 * Réservation simulée en trois temps : choix du créneau → récapitulatif → validation.
 */
export function Booking({
  service,
  onComplete,
  onCancel,
  cancelLabel = 'Annuler',
}: {
  service: Service
  onComplete: (r: BookingResult) => void
  onCancel: () => void
  cancelLabel?: string
}) {
  const isWorkshop = service.kind === 'atelier'
  const far = (nextSlotInDays(service.id) ?? 0) > FAR_SLOT_DAYS
  const slots = isWorkshop ? WORKSHOP_SESSIONS : far ? LATE_INDIVIDUAL_SLOTS : INDIVIDUAL_SLOTS
  const [selected, setSelected] = useState<string | null>(null)
  const [step, setStep] = useState<'choose' | 'recap'>('choose')
  const [error, setError] = useState('')
  const groupId = useId()
  const recapRef = useRef<HTMLHeadingElement>(null)
  const chooseRef = useRef<HTMLHeadingElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    track('booking_start', service.id)
  }, [service.id])

  useEffect(() => {
    if (step === 'recap') recapRef.current?.focus()
  }, [step])

  const slot = slots.find((s) => s.id === selected)
  const noun = isWorkshop ? 'session' : 'créneau'

  if (step === 'recap' && slot) {
    return (
      <section className="booking" aria-labelledby={`${groupId}-recap`}>
        <h2 id={`${groupId}-recap`} ref={recapRef} tabIndex={-1} className="booking__title">
          Récapitulatif
        </h2>
        <dl className="recap">
          <div><dt>Service</dt><dd>{nb(service.officialTitle)}</dd></div>
          <div><dt>Type</dt><dd>{KIND_LABEL[service.kind]}</dd></div>
          <div><dt>{isWorkshop ? 'Session' : 'Rendez-vous'}</dt><dd>{slot.date} à {slot.time}</dd></div>
          <div><dt>Lieu</dt><dd>{slot.place}</dd></div>
        </dl>
        <div className="booking__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => {
              track('booking_complete_demo', service.id)
              onComplete({ serviceId: service.id, slot })
            }}
          >
            <Check size={18} /> Valider la réservation
          </button>
          <button type="button" className="btn btn--outline" onClick={() => setStep('choose')}>
            Modifier le {noun}
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="booking" aria-labelledby={`${groupId}-choose`}>
      <h2 id={`${groupId}-choose`} ref={chooseRef} tabIndex={-1} className="booking__title">
        {isWorkshop ? 'Choisissez une session' : 'Choisissez un créneau'}
      </h2>
      <p className="muted">{nb(service.officialTitle)}</p>
      <fieldset className="slots" aria-describedby={error ? `${groupId}-err` : undefined}>
        <legend>
          {isWorkshop ? 'Sessions' : 'Créneaux'} disponibles
        </legend>
        <div className="slots__grid">
          {slots.map((s) => (
            <label key={s.id} className={`choice choice--slot${selected === s.id ? ' is-selected' : ''}`}>
              <input
                type="radio"
                name={`${groupId}-slot`}
                value={s.id}
                checked={selected === s.id}
                onChange={() => {
                  setSelected(s.id)
                  setError('')
                }}
              />
              <span className="choice__body">
                <span className="choice__title"><Calendar size={18} /> {s.date} — {s.time}</span>
                <span className="choice__meta"><Pin size={16} /> {s.place}</span>
              </span>
            </label>
          ))}
        </div>
        {error && (
          <p id={`${groupId}-err`} className="field-error" role="alert">
            {error}
          </p>
        )}
      </fieldset>
      <div className="booking__actions">
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => {
            if (!selected) {
              setError(`Choisissez un ${noun} pour continuer.`)
              return
            }
            setStep('recap')
          }}
        >
          Voir le récapitulatif
        </button>
        <button type="button" className="btn btn--outline" onClick={onCancel}>
          {cancelLabel}
        </button>
      </div>
    </section>
  )
}
