/**
 * Horloge réactive. Reste à 0 côté serveur / à l'hydratation, puis tick côté client.
 */
export function useNow(intervalMs = 1000) {
  const now = ref(0)
  let timer: ReturnType<typeof setInterval> | undefined

  onMounted(() => {
    now.value = Date.now()
    timer = setInterval(() => {
      now.value = Date.now()
    }, intervalMs)
  })

  onBeforeUnmount(() => {
    if (timer) clearInterval(timer)
  })

  return now
}
