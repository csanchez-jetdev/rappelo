<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

// error.vue sert toutes les erreurs, pas seulement les 404 : annoncer « cette
// page n'existe pas » devant une 500 serait faux.
const introuvable = computed(() => props.error?.statusCode === 404)

// clearError et non un NuxtLink : l'état d'erreur survit à une navigation
// ordinaire, et le bouton ne ferait rien d'autre que changer l'URL.
const retour = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-bg px-4 py-7 font-sans text-ink">
    <div class="w-full max-w-[520px]">
      <div class="rounded-2xl bg-card p-[18px] shadow-panel">
        <div class="mb-3 text-[13px] font-bold uppercase tracking-[0.04em] text-sub">
          Erreur {{ error?.statusCode ?? 404 }}
        </div>

        <h1 class="m-0 text-[22px] font-bold">
          {{ introuvable ? "Cette page n'existe pas" : "Quelque chose s'est mal passé" }}
        </h1>

        <p class="mt-1 text-[13px] text-sub">
          {{
            introuvable
              ? "Le lien est peut-être incomplet, ou la page a été retirée."
              : "Réessaie dans un instant."
          }}
          Tes médicaments sont enregistrés dans ce navigateur, ils n'ont rien perdu.
        </p>

        <button
          type="button"
          class="mt-4 w-full cursor-pointer rounded-xl bg-ready py-3 text-[15px] font-bold text-white"
          @click="retour"
        >
          Retour à mes médicaments
        </button>
      </div>
    </div>
  </div>
</template>
