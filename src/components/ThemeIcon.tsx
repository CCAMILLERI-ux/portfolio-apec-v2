import type { AtelierTheme } from '../data/ateliers'

/**
 * Icônes au trait des thèmes d'ateliers (variante tuiles), dans le style des tuiles d'apec.fr :
 * trait blanc et trait jaune sur fond bleu. Dessinées pour le prototype. Décoratives.
 */
const W = 'ti-w'
const Y = 'ti-y'

const ICONS: Record<AtelierTheme, React.ReactNode> = {
  candidature: (
    <>
      <path className={W} d="M26 12h32l14 14v58H26z" />
      <path className={W} d="M58 12v14h14" />
      <path className={Y} d="M36 46h26M36 56h26M36 66h16" />
    </>
  ),
  entretien: (
    <>
      <path className={W} d="M12 18h46v30H34l-10 9v-9H12z" />
      <path className={Y} d="M42 44h42v28h-8v10l-11-10H42z" />
    </>
  ),
  remuneration: (
    <>
      <circle className={W} cx="48" cy="48" r="32" />
      <path className={Y} d="M60 34a16 16 0 1 0 0 28M30 44h24M30 53h24" />
    </>
  ),
  reseau: (
    <>
      <path className={W} d="M44 29 27 62M52 29l17 33M31 70h34" />
      <circle className={Y} cx="48" cy="22" r="8" />
      <circle className={Y} cx="22" cy="70" r="8" />
      <circle className={Y} cx="74" cy="70" r="8" />
    </>
  ),
  ia: (
    <>
      <rect className={W} x="26" y="26" width="44" height="44" rx="4" />
      <path className={W} d="M38 16v10M48 16v10M58 16v10M38 70v10M48 70v10M58 70v10M16 38h10M16 58h10M70 38h10M70 58h10" />
      <path className={Y} d="m48 34 4 10 10 4-10 4-4 10-4-10-10-4 10-4z" />
    </>
  ),
  marche: (
    <>
      <circle className={W} cx="44" cy="52" r="30" />
      <circle className={W} cx="44" cy="52" r="16" />
      <path className={Y} d="M44 52 76 20M64 20h12v12" />
    </>
  ),
  mobilite: (
    <>
      <path className={Y} d="m24 22 22 13-22 13M24 48l22 13-22 13" />
      <path className={W} d="m46 22 22 13-22 13M46 48l22 13-22 13" />
    </>
  ),
  rebond: (
    <>
      <path className={W} d="M78 48a30 30 0 1 1-9-21" />
      <path className={W} d="M70 14v14H56" />
      <path className={Y} d="M48 66V36M37 47l11-11 11 11" />
    </>
  ),
  experience: (
    <>
      <circle className={W} cx="48" cy="38" r="22" />
      <path className={Y} d="m48 26 4 8 9 1-6 6 2 9-9-4-9 4 2-9-6-6 9-1z" />
      <path className={W} d="m36 57-8 27 12-5 6 9M60 57l8 27-12-5-6 9" />
    </>
  ),
  international: (
    <>
      <circle className={W} cx="48" cy="48" r="32" />
      <path className={W} d="M48 16c-14 16-14 48 0 64M48 16c14 16 14 48 0 64" />
      <path className={Y} d="M18 38h60M18 58h60" />
    </>
  ),
  diplome: (
    <>
      <path className={W} d="m10 38 38-18 38 18-38 18z" />
      <path className={Y} d="M26 46v18c0 6 10 11 22 11s22-5 22-11V46" />
      <path className={W} d="M86 38v20" />
    </>
  ),
  manager: (
    <>
      <circle className={Y} cx="48" cy="28" r="10" />
      <path className={Y} d="M30 62c0-12 8-19 18-19s18 7 18 19" />
      <circle className={W} cx="18" cy="52" r="7" />
      <circle className={W} cx="78" cy="52" r="7" />
      <path className={W} d="M6 78c0-9 5-14 12-14s12 5 12 14M66 78c0-9 5-14 12-14s12 5 12 14" />
    </>
  ),
  competences: (
    <>
      <path className={W} d="M36 58c-7-5-12-12-12-21a24 24 0 0 1 48 0c0 9-5 16-12 21v8H36z" />
      <path className={Y} d="M38 76h20M42 84h12M48 28v14M41 35h14" />
    </>
  ),
  motivation: (
    <>
      <path className={Y} d="M48 12c4 14 24 22 24 44a24 24 0 0 1-48 0c0-11 6-17 11-23 2 8 6 12 11 13-2-14 2-25 2-34z" />
      <path className={W} d="M48 54c4 6 9 9 9 16a9 9 0 0 1-18 0c0-7 5-10 9-16z" />
    </>
  ),
  carriere: (
    <>
      <path className={W} d="M26 12h44M26 84h44M32 12c0 20 16 26 16 36S32 64 32 84M64 12c0 20-16 26-16 36s16 16 16 36" />
      <path className={Y} d="M39 76h18l-9-11z" />
    </>
  ),
  reconversion: (
    <>
      <path className={W} d="M48 12v74M34 86h28" />
      <path className={Y} d="M48 20h28l8 9-8 9H48z" />
      <path className={W} d="M48 46H20l-8 9 8 9h28z" />
    </>
  ),
  immersion: (
    <>
      <path className={W} d="M22 84V20h34v64M56 40h20v44M12 84h74" />
      <path className={Y} d="M32 32h4M44 32h4M32 46h4M44 46h4M32 60h4M44 60h4M64 54h4M64 68h4" />
    </>
  ),
  durable: (
    <>
      <path className={Y} d="M20 76c0-36 24-56 60-58 0 36-22 58-60 58z" />
      <path className={W} d="m20 76 42-42M42 54h-12M52 44V32" />
    </>
  ),
  attractivite: (
    <>
      <path className={W} d="M14 40v18h14l32 18V22L28 40z" />
      <path className={Y} d="M70 38c4 5 4 17 0 22M79 30c9 9 9 29 0 38" />
    </>
  ),
  integration: (
    <>
      <path className={W} d="M50 14h28v68H50" />
      <path className={Y} d="M12 48h44M42 34l14 14-14 14" />
    </>
  ),
  cle: (
    <>
      <circle className={W} cx="32" cy="38" r="18" />
      <circle className={Y} cx="32" cy="38" r="6" />
      <path className={W} d="m45 51 35 33M64 68l9-9M73 77l9-9" />
    </>
  ),
  boussole: (
    <>
      <circle className={W} cx="48" cy="48" r="32" />
      <path className={Y} d="m60 36-8 16-16 8 8-16z" />
      <path className={W} d="M48 16v8M48 72v8M16 48h8M72 48h8" />
    </>
  ),
  formation: (
    <>
      <path className={W} d="M48 26c-8-6-20-8-34-6v54c14-2 26 0 34 6 8-6 20-8 34-6V20c-14-2-26 0-34 6z" />
      <path className={Y} d="M48 26v54M24 36h14M24 48h14M58 36h14M58 48h14" />
    </>
  ),
  creation: (
    <>
      <path className={W} d="M48 12c12 10 16 24 14 40H34c-2-16 2-30 14-40z" />
      <path className={W} d="M34 52 24 64h12M62 52l10 12H60" />
      <circle className={Y} cx="48" cy="34" r="6" />
      <path className={Y} d="M42 62c0 8 6 16 6 20 0-4 6-12 6-20" />
    </>
  ),
  audit: (
    <>
      <path className={W} d="M18 12h34l12 12v20M18 12v70h26" />
      <path className={W} d="M28 32h22M28 44h16" />
      <circle className={Y} cx="60" cy="62" r="14" />
      <path className={Y} d="m70 72 12 12" />
    </>
  ),
  filtre: (
    <>
      <path className={W} d="M14 18h68L56 48v26l-16 8V48z" />
      <path className={Y} d="M26 30h44" />
      <circle className={Y} cx="74" cy="74" r="8" />
    </>
  ),
  question: (
    <>
      <path className={W} d="M14 16h68v46H46l-16 14V62H14z" />
      <path className={Y} d="M40 32a8 8 0 1 1 12 7c-3 2-4 4-4 7M48 54v1" />
    </>
  ),
  fiches: (
    <>
      <rect className={W} x="14" y="24" width="44" height="56" rx="3" />
      <path className={W} d="M30 24V16h44v56h-16" />
      <path className={Y} d="M24 40h24M24 52h24M24 64h14" />
    </>
  ),
  ecran: (
    <>
      <rect className={W} x="16" y="18" width="64" height="44" rx="3" />
      <path className={W} d="M8 74h80M38 62l-4 12M58 62l4 12" />
      <path className={Y} d="m42 32 14 8-14 8z" />
    </>
  ),
  groupe: (
    <>
      <circle className={Y} cx="48" cy="30" r="10" />
      <path className={Y} d="M30 66c0-12 8-19 18-19s18 7 18 19" />
      <circle className={W} cx="20" cy="40" r="8" />
      <circle className={W} cx="76" cy="40" r="8" />
      <path className={W} d="M6 70c0-10 6-16 14-16s14 6 14 16M62 70c0-10 6-16 14-16s14 6 14 16" />
    </>
  ),
}

export function ThemeIcon({ theme, size = 88, className = '' }: { theme: AtelierTheme; size?: number; className?: string }) {
  return (
    <svg className={`theme-icon ${className}`} width={size} height={size} viewBox="0 0 96 96" aria-hidden="true" focusable="false">
      {ICONS[theme]}
    </svg>
  )
}
