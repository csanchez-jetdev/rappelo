export const pad = (n: number) => String(n).padStart(2, '0')

/** Timestamp (ms) -> "HH:MM" en heure locale. */
export function msToHHMM(ms: number): string {
  const d = new Date(ms)
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

/** "HH:MM" -> timestamp aujourd'hui. Si l'heure est dans le futur, on suppose hier. */
export function hhmmToMs(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  const d = new Date()
  d.setHours(h, m, 0, 0)
  if (d.getTime() > Date.now() + 60_000) d.setDate(d.getDate() - 1)
  return d.getTime()
}

/** Libellé d'une prise : "HH:MM" si aujourd'hui, sinon préfixé du jour ("hier 21:00"). */
export function intakeLabel(ms: number): string {
  const hint = dayHint(ms)
  return hint === 'auj.' ? msToHHMM(ms) : `${hint} ${msToHHMM(ms)}`
}

/** Indice de jour relatif : "auj." / "demain" / "hier" / date courte FR. */
export function dayHint(ms: number): string {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(ms)
  target.setHours(0, 0, 0, 0)
  const diff = Math.round((target.getTime() - today.getTime()) / 86_400_000)
  if (diff === 0) return 'auj.'
  if (diff === 1) return 'demain'
  if (diff === -1) return 'hier'
  return new Date(ms).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}
