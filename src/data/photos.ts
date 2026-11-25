/**
 * Photographies de la piste 3 (cas 1) et de la carte atelier du cas 3.
 *
 * Provenance : Unsplash (https://unsplash.com), licence Unsplash — usage gratuit,
 * commercial ou non, sans autorisation requise (https://unsplash.com/license).
 * Fichiers téléchargés depuis le CDN public images.unsplash.com, recadrés en
 * 960 × 600, sans métadonnées EXIF/XMP. Identifiant d'origine conservé ci-dessous ;
 * le nom du photographe est à confirmer sur la page de chaque photo.
 *
 * Ces photos illustrent des situations : elles ne représentent ni des salariés,
 * ni des consultants, ni des usagers de l'Apec.
 */
import { ATELIER_GROUPS } from './ateliers'

export interface Photo {
  file: string
  alt: string
  unsplashId: string
}

const P = (file: string, unsplashId: string, alt: string): Photo => ({
  file: `photos/${file}.jpg`,
  unsplashId,
  alt,
})

export const PHOTOS = {
  atelierPostIt: P('atelier-post-it', '1552664730-d307ca884978', 'Une animatrice présente des idées sur un mur de post-it à un petit groupe assis autour d’une table.'),
  atelierOrdinateurs: P('atelier-ordinateurs', '1542744173-8e7e53415bb0', 'Un groupe travaille sur des ordinateurs portables autour d’une grande table, un intervenant au fond de la salle.'),
  entretienCandidate: P('entretien-candidate', '1573497620053-ea5300f94f21', 'Une candidate s’exprime face à une recruteuse, assises autour d’une petite table près d’une fenêtre.'),
  entretienRecrutement: P('entretien-recrutement', '1521791136064-7986c2920216', 'Poignée de main entre deux personnes en chemise, dans un bureau.'),
  entretienFaceAFace: P('entretien-face-a-face', '1551836022-d5d88e9218df', 'Deux femmes échangent de part et d’autre d’une table de réunion, l’une prend des notes.'),
  relectureEcran: P('relecture-ecran', '1531482615713-2afd69097998', 'Deux personnes relisent ensemble un document à l’écran d’un ordinateur.'),
  conversation: P('conversation', '1517245386807-bb43f82c33c4', 'Gros plan sur les mains de deux personnes en discussion, devant un ordinateur portable.'),
  posteDeTravail: P('poste-de-travail', '1499750310107-5fef28a66643', 'Un ordinateur portable, un carnet et une tasse sur un bureau en bois.'),
  jeunesDiplomes: P('jeunes-diplomes', '1523240795612-9a054b0db644', 'Trois jeunes adultes rient ensemble devant un ordinateur dans une bibliothèque.'),
  equipeJeune: P('equipe-jeune', '1525130413817-d45c1d127c42', 'Trois jeunes professionnels discutent autour d’un ordinateur portable.'),
  collegues: P('collegues', '1600880292203-757bb62b4baf', 'Deux collègues se tapent dans la main au-dessus d’un bureau.'),
  formationSalle: P('formation-salle', '1521737604893-d14cc237f11d', 'Plusieurs personnes travaillent sur ordinateur dans une salle lumineuse.'),
  cadreSouriante: P('cadre-souriante', '1573497019940-1c28c88b4f3e', 'Portrait d’une femme souriante, cheveux bouclés, dans un environnement de bureau.'),
  reunionTable: P('reunion-table', '1517048676732-d65bc937f952', 'Des personnes prennent des notes autour d’une table de réunion.'),
  bureauEquipe: P('bureau-equipe', '1556761175-b413da4baf72', 'Une équipe échange dans un open space, autour d’écrans.'),
  travailEquipe: P('travail-equipe', '1522071820081-009f0129c71c', 'Une équipe travaille sur des ordinateurs portables autour d’une table.'),
} satisfies Record<string, Photo>

/** Photo associée à chaque service dans la piste 3. */
export const SERVICE_PHOTO: Record<string, Photo> = {
  // Je cherche un nouvel emploi
  candidature: PHOTOS.relectureEcran,
  'atelier-entretiens': PHOTOS.atelierPostIt,
  'simulateur-entretien': PHOTOS.entretienCandidate,
  // Je prépare mon premier emploi
  'cles-emploi': PHOTOS.jeunesDiplomes,
  'jeunes-diplomes-confiance': PHOTOS.equipeJeune,
  'quel-job': PHOTOS.formationSalle,
  // Je souhaite évoluer dans ma carrière
  'changement-poste': PHOTOS.entretienFaceAFace,
  'evolution-interne': PHOTOS.collegues,
  trajectoires: PHOTOS.posteDeTravail,
  // Je réfléchis à une reconversion
  cep: PHOTOS.conversation,
  reconversion: PHOTOS.cadreSouriante,
  'fiches-metiers': PHOTOS.atelierOrdinateurs,
  // Je recrute et j'ai besoin d'aide
  'conseil-recrutement': PHOTOS.reunionTable,
  'offre-attractive': PHOTOS.bureauEquipe,
  osim: PHOTOS.travailEquipe,
  // Autres pages (cas 01 et cas 03)
  'entretien-programme': PHOTOS.entretienRecrutement,
  'atelier-iag': PHOTOS.atelierOrdinateurs,
  'creer-cv': PHOTOS.posteDeTravail,
  'atelier-remuneration': PHOTOS.reunionTable,
}

/**
 * Ateliers de la vue « Ateliers » sans photo attribuée : photos de groupe en rotation,
 * jamais la même que la carte précédente (aucune nouvelle photo ajoutée).
 */
const WORKSHOP_ROTATION: Photo[] = [
  PHOTOS.formationSalle, PHOTOS.atelierPostIt, PHOTOS.travailEquipe, PHOTOS.reunionTable,
  PHOTOS.atelierOrdinateurs, PHOTOS.bureauEquipe, PHOTOS.equipeJeune, PHOTOS.collegues, PHOTOS.conversation,
]
{
  let i = 0
  for (const g of ATELIER_GROUPS) {
    let prev: Photo | undefined
    for (const { id } of g.ateliers) {
      if (!SERVICE_PHOTO[id]) {
        let p = WORKSHOP_ROTATION[i++ % WORKSHOP_ROTATION.length]
        if (p === prev) p = WORKSHOP_ROTATION[i++ % WORKSHOP_ROTATION.length]
        SERVICE_PHOTO[id] = p
      }
      prev = SERVICE_PHOTO[id]
    }
  }
}

export const ALL_PHOTOS: Photo[] = Object.values(PHOTOS)
