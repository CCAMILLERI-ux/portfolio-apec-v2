import { ArrowRight } from '../components/Icons'
import { ArticleHero, ArticleMeta } from '../components/ArticleParts'
import { PHOTOS } from '../data/photos'
import { PageBand } from '../components/PageBand'
import { ProtoLayout } from '../components/ProtoLayout'
import { Link } from '../lib/router'
import { Case3Coulisses } from './Case3'

/** Contenu connexe court, clairement identifié — pas une page de remplissage. */
export function Remuneration({ path }: { path: string }) {
  return (
    <ProtoLayout path={path} caseLabel="Cas 01 · De la recherche en ligne aux services" events={['service_view', 'service_cta_click']} coulisses={<Case3Coulisses />}
      coulissesEnd={<Link to="/plan-seo" className="pf-link">Pour aller plus loin{'\u00a0'}: ma démarche SEO /{'\u00a0'}GEO</Link>}>
      <PageBand
        back={{ to: '/cas-01-seo', label: 'Conseil : préparer un entretien de recrutement' }}
        title="Aborder la rémunération en entretien"
        titleIsHeading={false}
      />
      <div className="container overlap">
        <article className="sheet article sheet--narrow" aria-labelledby="titre-remu">
          <h1 id="titre-remu" tabIndex={-1}>Aborder la rémunération en entretien : trois repères</h1>
          <ArticleHero photo={PHOTOS.conversation} rubric="Repères" />
          <ArticleMeta date="19/11/2026" title="Aborder la rémunération en entretien : trois repères" />
          <p className="article__intro">
            La question du salaire arrive souvent en fin d’entretien. La préparer à l’avance permet d’y
            répondre calmement, avec une fourchette argumentée plutôt qu’un chiffre improvisé.
          </p>
          <h2>1. Préparer une fourchette</h2>
          <p>
            Croisez plusieurs repères : grilles publiées dans votre secteur, offres comparables, niveau de
            responsabilité du poste et votre rémunération actuelle. Retenez un plancher et une cible.
          </p>
          <h2>2. Formuler votre réponse</h2>
          <p>
            Annoncez la fourchette puis reliez-la à ce que vous apportez au poste. Pensez aussi aux éléments
            hors salaire fixe : variable, télétravail, formation.
          </p>
          <h2>3. S’exercer avant le jour J</h2>
          <p>
            Cette question se prépare avec les autres : retrouvez{' '}
            <Link to="/cas-01-seo" anchor="questions">les autres questions fréquentes d’un entretien de recrutement</Link>, ou{' '}
            <Link to="/service/atelier-entretiens?from=remuneration">exercez-vous à la question du salaire en atelier collectif</Link>.
          </p>
          <p className="muted small">Les repères de rémunération dépendent du métier, du secteur et de la région.</p>
          <Link to="/cas-01-seo" className="link-arrow">
            Revenir au conseil complet sur la préparation d’entretien <ArrowRight size={18} />
          </Link>
        </article>
      </div>
    </ProtoLayout>
  )
}
