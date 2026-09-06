<script setup lang="ts">
useHead({ title: 'Mes médicaments' })

const { activeMeds, archivedMeds, sorted, addMed, reprise, editTime, editInterval, archive, unarchive, remove } =
  useMeds()
const now = useNow()

const readyCount = computed(
  () => sorted.value.filter(m => m.takenMs + m.intervalH * 3_600_000 <= now.value).length,
)

const statusMessage = computed(() => {
  if (activeMeds.value.length === 0) return 'Ajoute un médicament pour suivre la prochaine prise.'
  const c = readyCount.value
  if (c > 0) return `${c} médicament${c > 1 ? 's' : ''} peu${c > 1 ? 'vent' : 't'} être repris`
  return "Aucun médicament disponible pour l'instant"
})

const showArchived = ref(false)
</script>

<template>
  <div class="flex min-h-screen justify-center bg-bg px-4 py-7 font-sans text-ink">
    <div class="w-full max-w-[520px]">
      <NuxtLink
        to="/"
        class="mb-3 inline-block text-[13px] font-semibold text-sub underline-offset-2 hover:underline"
      >&larr; Accueil</NuxtLink>

      <header class="mb-[18px]">
        <h1 class="m-0 text-[22px] font-bold">Mes médicaments</h1>
        <p class="mt-1 text-[13px] text-sub">{{ statusMessage }}</p>
      </header>

      <div class="mb-4 flex flex-col gap-3">
        <MedCard
          v-for="med in sorted"
          :key="med.id"
          :med="med"
          :now="now"
          @reprise="reprise"
          @edit-time="editTime"
          @edit-interval="editInterval"
          @archive="archive"
        />
      </div>

      <AddMedForm @add="addMed" />

      <div v-if="archivedMeds.length" class="mt-4">
        <button
          type="button"
          class="cursor-pointer text-[13px] font-semibold text-sub underline-offset-2 hover:underline"
          @click="showArchived = !showArchived"
        >
          {{ showArchived ? 'Masquer' : 'Voir' }} les médicaments archivés ({{ archivedMeds.length }})
        </button>

        <div v-if="showArchived" class="mt-3 flex flex-col gap-3">
          <ArchivedMedCard
            v-for="med in archivedMeds"
            :key="med.id"
            :med="med"
            @unarchive="unarchive"
            @delete="remove"
          />
        </div>
      </div>

      <p class="mt-4 text-center text-xs leading-relaxed text-sub">
        Simple aide-mémoire, pas un dispositif médical. Respecte la posologie de la notice ou
        l'avis de ton médecin ou pharmacien, et ne dépasse pas la dose maximale par 24 h.
        <NuxtLink to="/" class="font-semibold underline-offset-2 hover:underline">
          Lire l'avertissement complet
        </NuxtLink>.
      </p>
    </div>
  </div>
</template>
