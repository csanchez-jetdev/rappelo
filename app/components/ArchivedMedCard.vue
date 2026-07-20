<script setup lang="ts">
import type { Med } from '~/types'

const props = defineProps<{
  med: Med
}>()

const emit = defineEmits<{
  unarchive: [id: string]
  delete: [id: string]
}>()

const lastTakenMs = computed(() => [...props.med.history].sort((a, b) => b - a)[0] ?? props.med.takenMs)

function onDelete() {
  if (confirm(`Supprimer définitivement « ${props.med.name || 'ce médicament'} » et son historique ?`)) {
    emit('delete', props.med.id)
  }
}
</script>

<template>
  <div class="flex flex-col gap-3 rounded-2xl border-l-4 border-line bg-field p-4">
    <div class="flex items-center gap-4">
      <div class="min-w-0 flex-1">
        <div class="truncate text-base font-bold text-ink">
          {{ med.name || 'Médicament' }}
        </div>
        <div class="mt-0.5 text-[13px] text-sub">
          Intervalle {{ med.intervalH }} h · Dernière prise {{ intakeLabel(lastTakenMs) }}
          · Archivé {{ intakeLabel(med.archivedAt ?? Date.now()) }}
        </div>
      </div>

      <div class="flex shrink-0 flex-col gap-1.5">
        <button
          type="button"
          class="cursor-pointer whitespace-nowrap rounded-[10px] bg-ready px-3 py-2 text-[13px] font-semibold text-white"
          @click="emit('unarchive', med.id)"
        >
          Réactiver
        </button>
        <button
          type="button"
          class="cursor-pointer rounded-[10px] border border-line bg-white px-3 py-1.5 text-[13px] text-sub"
          @click="onDelete"
        >
          Supprimer
        </button>
      </div>
    </div>

    <IntakeHistory :history="med.history" class="border-t border-line pt-3" />
  </div>
</template>
