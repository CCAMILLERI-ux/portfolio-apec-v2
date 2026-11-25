import { Link } from '../lib/router'

/** Pied de page commun au portfolio et aux prototypes (seule mention de non-affiliation, avec la page Sources). */
export function PortfolioFooter() {
  return (
    <footer className="pf-footer">
      <div className="pf-container">
        <p className="pf-footer__line">
          Portfolio de candidature exploratoire, indépendant et sans affiliation à{' '}l’Apec ·{' '}
          <Link to="/sources">Sources et mentions</Link> · Version{' '}2
        </p>
      </div>
    </footer>
  )
}
