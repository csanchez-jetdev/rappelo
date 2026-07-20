import type { Med } from '~/types'

const STORAGE_KEY = 'pills-time:meds'

const nextMs = (m: Med) => m.takenMs + m.intervalH * 3_600_000

/**
 * État des médicaments + persistance localStorage.
 * Le localStorage est client-only : on charge dans onMounted (après l'hydratation)
 * puis on enregistre le watch de persistance, ce qui garde le rendu SSR déterministe.
 */
export function useMeds() {
  const meds = ref<Med[]>([])

  onMounted(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        meds.value = JSON.parse(raw) as Med[]
      } catch {
        meds.value = []
      }
    }
    watch(
      meds,
      value => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)),
      { deep: true },
    )
  })

  function addMed(input: { name: string; takenMs: number; intervalH: number }) {
    meds.value.push({
      id: uid(),
      name: input.name.trim(),
      takenMs: input.takenMs,
      intervalH: input.intervalH,
      history: [input.takenMs],
      archivedAt: null,
    })
  }

  function reprise(id: string) {
    const med = meds.value.find(m => m.id === id)
    if (!med) return
    const at = Date.now()
    med.takenMs = at
    med.history.push(at)
  }

  // Édite l'heure de la dernière prise (corrige aussi la dernière entrée d'historique).
  function editTime(id: string, ms: number) {
    const med = meds.value.find(m => m.id === id)
    if (!med) return
    med.takenMs = ms
    if (med.history.length) med.history[med.history.length - 1] = ms
    else med.history.push(ms)
  }

  function editInterval(id: string, h: number) {
    const med = meds.value.find(m => m.id === id)
    if (med) med.intervalH = h
  }

  // Suppression définitive (perd l'historique) : réservée à la vue archives.
  function remove(id: string) {
    meds.value = meds.value.filter(m => m.id !== id)
  }

  function archive(id: string) {
    const med = meds.value.find(m => m.id === id)
    if (med) med.archivedAt = Date.now()
  }

  function unarchive(id: string) {
    const med = meds.value.find(m => m.id === id)
    if (med) med.archivedAt = null
  }

  const activeMeds = computed(() => meds.value.filter(m => !m.archivedAt))
  const archivedMeds = computed(() =>
    [...meds.value]
      .filter(m => m.archivedAt)
      .sort((a, b) => (b.archivedAt ?? 0) - (a.archivedAt ?? 0)),
  )

  // Tri : le plus proche d'être disponible (ou le plus en retard) en premier.
  const sorted = computed(() => [...activeMeds.value].sort((a, b) => nextMs(a) - nextMs(b)))

  return {
    meds,
    activeMeds,
    archivedMeds,
    sorted,
    addMed,
    reprise,
    editTime,
    editInterval,
    archive,
    unarchive,
    remove,
  }
}
