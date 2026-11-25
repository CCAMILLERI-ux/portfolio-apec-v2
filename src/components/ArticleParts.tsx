import { useState } from 'react'
import type { Photo } from '../data/photos'
import { Link } from '../lib/router'
import { ArrowCircle, ArrowRight, Share } from './Icons'

/**
 * Éléments du gabarit « article » observé sur apec.fr (captures, rubrique « Vie pro et carrière ») :
 * étiquette de rubrique, visuel principal photographique, ligne de publication avec « Partager »,
 * carte « Sur le même sujet ». Reconstruction pour le prototype, sans logo ni photo de l'Apec.
 */

/** Étiquette carrée de rubrique : partie violette avec pictogramme, bandeau bleu nuit avec libellé. */
export function RubricTag({ label, size = 'lg', side = 'left' }: { label: string; size?: 'lg' | 'sm'; side?: 'left' | 'right' }) {
  return (
    <span className={`rubric-tag rubric-tag--${size}${side === 'right' ? ' rubric-tag--right' : ''}`}>
      <span className="rubric-tag__top"><ArrowCircle size={size === 'lg' ? 52 : 24} /></span>
      <span className="rubric-tag__label">{label}</span>
    </span>
  )
}

export function ArticleHero({ photo, rubric, tagSide = 'left' }: { photo: Photo; rubric: string; tagSide?: 'left' | 'right' }) {
  return (
    <div className="a-hero">
      <img src={photo.file} alt={photo.alt} width={960} height={600} className="a-hero__img" />
      <RubricTag label={rubric} side={tagSide} />
    </div>
  )
}

/** « Publié le … » (ou « Mis à jour le … ») + bouton « Partager » (partage natif ou copie du lien). */
export function ArticleMeta({ date, title, label = 'Publié le', dateTime }: { date: string; title: string; label?: string; dateTime?: string }) {
  const [status, setStatus] = useState('')
  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setStatus('Lien de la page copié.')
    } catch {
      setStatus('Copie impossible : utilisez l’adresse de la page.')
    }
    window.setTimeout(() => setStatus(''), 4000)
  }
  return (
    <div className="a-meta">
      <p className="a-meta__date">{label} {dateTime ? <time dateTime={dateTime}>{date}</time> : date}</p>
      <button type="button" className="a-share" onClick={share}>
        <span className="a-share__label">Partager</span>
        <span className="a-share__icon" aria-hidden="true"><Share size={20} /></span>
      </button>
      <span className="a-meta__status" role="status" aria-live="polite">{status}</span>
    </div>
  )
}

/** Carte article de la colonne « Sur le même sujet ». */
export function SideArticleCard({ to, photo, title, date, rubric }: { to?: string; photo: Photo; title: string; date: string; rubric: string }) {
  return (
    <article className="a-card">
      <div className="a-card__visual">
        <img src={photo.file} alt="" width={960} height={600} loading="lazy" className="a-card__img" />
        <RubricTag label={rubric} size="sm" />
      </div>
      <h3 className="a-card__title">
        {to ? <Link to={to} className="a-card__link">{title}</Link> : title}
      </h3>
      <p className="a-card__meta">
        <span>Article · Publié le {date}</span>
        {to && <span className="a-card__more" aria-hidden="true">Voir <ArrowRight size={18} /></span>}
      </p>
    </article>
  )
}
