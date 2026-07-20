<script setup lang="ts">
const props = defineProps<{
  history: number[]
}>()

// Plus récente en tête. Affichage limité aux dernières.
const MAX_SHOWN = 6
const intakes = computed(() => [...props.history].sort((a, b) => b - a))
const shownIntakes = computed(() => intakes.value.slice(0, MAX_SHOWN))
const extraCount = computed(() => Math.max(0, intakes.value.length - MAX_SHOWN))
</script>

<template>
  <div v-if="intakes.length" class="flex flex-wrap items-center gap-1.5">
    <span class="mr-0.5 text-xs font-semibold uppercase tracking-[0.04em] text-sub">
      Prises
    </span>
    <span
      v-for="(ms, i) in shownIntakes"
      :key="ms"
      class="rounded-full bg-field px-2 py-0.5 text-xs tabular-nums text-ink"
      :class="i === 0 ? 'font-semibold' : ''"
    >
      {{ intakeLabel(ms) }}
    </span>
    <span v-if="extraCount" class="text-xs text-sub">+{{ extraCount }}</span>
  </div>
</template>
