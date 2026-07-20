<script setup lang="ts">
const PRESETS = [
  { label: '4 h', h: 4 },
  { label: '6 h', h: 6 },
  { label: '8 h', h: 8 },
  { label: '12 h', h: 12 },
  { label: '24 h', h: 24 },
]

const emit = defineEmits<{
  add: [payload: { name: string; takenMs: number; intervalH: number }]
}>()

const name = ref('')
const time = ref('')
const interval = ref<number | ''>(6)

// Heure de prise par défaut = maintenant. Renseignée après l'hydratation (SSR-safe).
onMounted(() => {
  if (!time.value) time.value = msToHHMM(Date.now())
})

function submit() {
  if (!interval.value) return
  emit('add', {
    name: name.value.trim(),
    takenMs: time.value ? hhmmToMs(time.value) : Date.now(),
    intervalH: Number(interval.value),
  })
  name.value = ''
  time.value = msToHHMM(Date.now())
  interval.value = 6
}
</script>

<template>
  <div class="rounded-2xl bg-card p-[18px] shadow-panel">
    <div class="mb-3 text-[13px] font-bold uppercase tracking-[0.04em] text-sub">
      Ajouter un médicament
    </div>

    <input
      v-model="name"
      placeholder="Nom (ex. Advil 400)"
      class="mb-2.5 box-border w-full rounded-[10px] border border-line bg-field px-3 py-2.5 text-[15px] text-ink outline-none"
    >

    <div class="mb-2.5 flex flex-wrap gap-2.5">
      <div class="min-w-[130px] flex-1">
        <label class="mb-1 block text-xs text-sub">Heure de prise</label>
        <div class="flex gap-1.5">
          <input
            v-model="time"
            type="time"
            class="box-border flex-1 rounded-[10px] border border-line bg-field px-3 py-2.5 text-[15px] text-ink outline-none"
          >
          <button
            type="button"
            title="Maintenant"
            class="cursor-pointer rounded-[10px] border border-line bg-white px-3 text-[13px] font-semibold text-ink"
            @click="time = msToHHMM(Date.now())"
          >
            ⟳
          </button>
        </div>
      </div>

      <div class="min-w-[110px]">
        <label class="mb-1 block text-xs text-sub">Intervalle</label>
        <div class="flex items-center gap-1">
          <input
            v-model.number="interval"
            type="number" min="0" step="0.5"
            class="box-border w-[70px] rounded-[10px] border border-line bg-field px-3 py-2.5 text-[15px] text-ink outline-none"
          >
          <span class="text-[13px] text-sub">h</span>
        </div>
      </div>
    </div>

    <div class="mb-3 flex flex-wrap gap-1.5">
      <button
        v-for="p in PRESETS"
        :key="p.h"
        type="button"
        class="cursor-pointer rounded-[9px] border px-3 py-1.5 text-[13px] font-semibold"
        :class="Number(interval) === p.h ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink'"
        @click="interval = p.h"
      >
        {{ p.label }}
      </button>
    </div>

    <button
      type="button"
      class="w-full cursor-pointer rounded-xl bg-ready py-3 text-[15px] font-bold text-white"
      @click="submit"
    >
      Ajouter
    </button>
  </div>
</template>
