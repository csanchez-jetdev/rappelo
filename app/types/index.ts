export interface Med {
  id: string
  name: string
  /** Timestamp (ms) de la dernière prise. */
  takenMs: number
  /** Intervalle minimal entre deux prises, en heures. */
  intervalH: number
  /** Horodatages (ms) des prises, dans l'ordre chronologique. */
  history: number[]
  /** Timestamp (ms) d'archivage, ou null si actif. */
  archivedAt: number | null
}
