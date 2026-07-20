<script setup lang="ts">
import type { Med } from '~/types'

const props = defineProps<{
  med: Med
  now: number
}>()

const emit = defineEmits<{
  reprise: [id: string]
  editTime: [id: string, ms: number]
  editInterval: [id: string, h: number]
  archive: [id: string]
}>()

// Géométrie de l'anneau
const size = 72
const stroke = 8
const r = (size - stroke) / 2
const circ = 2 * Math.PI * r

const totalMs = computed(() => (Number(props.med.intervalH) || 0) * 3_600_000)
const nextMs = computed(() => props.med.takenMs + totalMs.value)
const remaining = computed(() => nextMs.value - props.now)
const ready = computed(() => remaining.value <= 0)
const progress = computed(() =>
  totalMs.value > 0
    ? Math.min(1, Math.max(0, (props.now - props.med.takenMs) / totalMs.value))
    : 0,
)
const accent = computed(() => (ready.value ? 'var(--color-ready)' : 'var(--color-wait)'))

const abs = computed(() => Math.abs(remaining.value))
const hh = computed(() => Math.floor(abs.value / 3_600_000))
const mm = computed(() => Math.floor((abs.value % 3_600_000) / 60_000))

function onTimeChange(e: Event) {
  const v = (e.target as HTMLInputElement).value
  if (v) emit('editTime', props.med.id, hhmmToMs(v))
}

function onIntervalChange(e: Event) {
  const v = (e.target as HTMLInputElement).value
  if (v !== '') emit('editInterval', props.med.id, Number(v))
}
</script>

<template>
  <div
    class="flex flex-col gap-3 rounded-2xl border-l-4 bg-card p-4 shadow-card"
    :style="{ borderLeftColor: accent }"
  >
    <div class="flex items-center gap-4">
      <!-- Anneau compact -->
      <div class="relative shrink-0" :style="{ width: `${size}px`, height: `${size}px` }">
        <svg :width="size" :height="size" class="-rotate-90">
          <circle
            :cx="size / 2" :cy="size / 2" :r="r"
            fill="none" stroke="var(--color-rail)" :stroke-width="stroke"
          />
          <circle
            :cx="size / 2" :cy="size / 2" :r="r"
            fill="none" :stroke="accent" :stroke-width="stroke" stroke-linecap="round"
            :stroke-dasharray="circ" :stroke-dashoffset="circ * (1 - progress)"
            class="transition-[stroke-dashoffset,stroke] duration-500 ease-linear"
          />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span v-if="ready" class="text-[13px] font-bold text-ready">Prêt</span>
          <span v-else class="text-base font-bold tabular-nums">
            <template v-if="hh > 0">{{ hh }}h{{ pad(mm) }}</template>
            <template v-else>{{ pad(mm) }}m</template>
          </span>
        </div>
      </div>

      <!-- Infos -->
      <div class="min-w-0 flex-1">
        <div class="truncate text-base font-bold text-ink">
          {{ med.name || 'Médicament' }}
        </div>
        <div class="mt-0.5 text-[13px] text-sub">
          {{
            ready
              ? `Reprise possible depuis ${msToHHMM(nextMs)}`
              : `Prochaine à ${msToHHMM(nextMs)} (${dayHint(nextMs)})`
          }}
        </div>

        <div class="mt-2.5 flex flex-wrap items-center gap-2">
          <input
            type="time"
            :value="msToHHMM(med.takenMs)"
            class="rounded-lg border border-line bg-field px-2 py-[5px] text-[13px] text-ink"
            @change="onTimeChange"
          >
          <div class="flex items-center gap-1">
            <input
              type="number" min="0" step="0.5"
              :value="med.intervalH"
              class="w-14 rounded-lg border border-line bg-field px-2 py-[5px] text-[13px] text-ink"
              @change="onIntervalChange"
            >
            <span class="text-xs text-sub">h</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex shrink-0 flex-col gap-1.5">
        <button
          type="button"
          class="cursor-pointer whitespace-nowrap rounded-[10px] px-3 py-2 text-[13px] font-semibold text-white"
          :style="{ backgroundColor: accent }"
          @click="emit('reprise', med.id)"
        >
          J'ai repris
        </button>
        <button
          type="button"
          class="cursor-pointer rounded-[10px] border border-line bg-white px-3 py-1.5 text-[13px] text-sub"
          @click="emit('archive', med.id)"
        >
          Archiver
        </button>
      </div>
    </div>

    <IntakeHistory :history="med.history" class="border-t border-line pt-3" />
  </div>
</template>
