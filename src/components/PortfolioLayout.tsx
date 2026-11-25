import type { ReactNode } from 'react'
import { Link } from '../lib/router'

/** Habillage du portfolio : couleurs et typographie du design system Apec, sans les éléments propres au prototype. */
export function PortfolioLayout({ children, isHome = false }: { children: ReactNode; isHome?: boolean }) {
  return (
    <div className="pf">
      <a className="skip-link" href="#contenu" onClick={(e) => {
        e.preventDefault()
        document.getElementById('contenu')?.focus()
      }}>
        Aller au contenu
      </a>
      <header className="pf-header">
        <div className="pf-container pf-header__inner">
          <Link to="/" className="pf-id" aria-current={isHome ? 'page' : undefined}>
            <span className="pf-id__name">Caroline Camilleri</span>
            <span className="pf-id__role">Cheffe de projet Animation Web</span>
          </Link>
          <nav aria-label="Portfolio">
            <ul className="pf-nav">
              <li><Link to="/" anchor="realisations">Réalisations</Link></li>
              <li><Link to="/design-system">Design system</Link></li>
              <li><Link to="/" anchor="a-propos">À propos</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main id="contenu" tabIndex={-1}>{children}</main>
      <footer className="pf-footer">
        <div className="pf-container">
          <p className="pf-footer__line">
            Portfolio de candidature indépendant, sans affiliation à{'\u00a0'}l’Apec ·{' '}
            <Link to="/design-system" anchor="sources">Sources et mentions</Link> · Version 2
          </p>
        </div>
      </footer>
    </div>
  )
}
