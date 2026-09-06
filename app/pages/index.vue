<script setup lang="ts">
useHead({
  title: 'Aide-mémoire de prise de médicaments',
  meta: [{
    name: 'description',
    content: 'Rappelo calcule le temps restant avant la prochaine prise autorisée de tes '
      + 'médicaments. Sans compte, sans serveur : tout reste dans ton navigateur.',
  }],
})

const etapes = [
  'Tu notes le médicament, l\'heure de la dernière prise et l\'intervalle minimal entre deux prises.',
  'Un anneau affiche le temps restant avant la prochaine prise autorisée, ou le statut « Prêt ».',
  'Tu appuies sur « J\'ai repris » à chaque prise. Le décompte repart seul.',
]
</script>

<template>
  <div class="flex min-h-screen justify-center bg-bg px-4 py-7 font-sans text-ink">
    <div class="w-full max-w-[520px]">
      <header class="mb-[18px]">
        <h1 class="m-0 text-[22px] font-bold">Rappelo</h1>
        <p class="mt-1 text-[13px] text-sub">
          Savoir quand tu peux reprendre un médicament, sans compter les heures de tête.
        </p>
      </header>

      <div class="rounded-2xl bg-card p-[18px] shadow-panel">
        <div class="mb-3 text-[13px] font-bold uppercase tracking-[0.04em] text-sub">
          Le principe
        </div>

        <ol class="m-0 flex list-none flex-col gap-2.5 p-0">
          <li v-for="(etape, i) in etapes" :key="i" class="flex gap-2.5 text-[14px] leading-relaxed">
            <span
              class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-field text-[11px] font-bold text-sub"
            >{{ i + 1 }}</span>
            <span>{{ etape }}</span>
          </li>
        </ol>

        <p class="mt-3 border-t border-line pt-3 text-[13px] leading-relaxed text-sub">
          Aucun compte, aucune inscription. La liste de tes médicaments est enregistrée dans ce
          navigateur et ne part sur aucun serveur.
        </p>

        <NuxtLink
          to="/app"
          class="mt-4 block w-full rounded-xl bg-ready py-3 text-center text-[15px] font-bold text-white"
        >
          Ouvrir l'aide-mémoire
        </NuxtLink>
      </div>

      <!-- L'avertissement est une section à part, pas une note en pied de page :
           c'est la seule chose de cette page qu'il ne faut pas rater. -->
      <section class="mt-3 rounded-2xl border border-wait/30 bg-wait/5 p-[18px]">
        <div class="mb-2 text-[13px] font-bold uppercase tracking-[0.04em] text-wait">
          À lire avant d'utiliser Rappelo
        </div>

        <p class="m-0 text-[14px] font-bold leading-relaxed">
          Rappelo n'est pas un dispositif médical et ne remplace ni une notice, ni un avis médical.
        </p>

        <ul class="mt-2.5 flex list-disc flex-col gap-1.5 pl-5 text-[13px] leading-relaxed text-sub">
          <li>
            C'est un minuteur, rien de plus. Il ignore ton dosage, tes autres traitements, ton poids,
            ton âge, tes allergies et tes contre-indications.
          </li>
          <li>
            L'intervalle affiché est celui que tu as saisi toi-même. Une saisie erronée donne un
            décompte erroné, et Rappelo n'a aucun moyen de s'en apercevoir.
          </li>
          <li>
            Un décompte terminé signifie « l'intervalle que tu as noté est écoulé », jamais « tu peux
            reprendre une dose ». Respecte la posologie de la notice et la dose maximale sur 24 h.
          </li>
          <li>
            Rien ne garantit que l'application soit disponible, exacte, ou qu'une notification
            arrive : ne lui confie aucun traitement dont l'oubli ou le doublon serait grave.
          </li>
          <li>
            En cas de doute, de surdosage ou d'effet inattendu, appelle le 15 ou ton centre
            antipoison, et parle à ton médecin ou à ton pharmacien.
          </li>
        </ul>

        <p class="mt-2.5 text-[13px] leading-relaxed text-sub">
          Le logiciel est fourni « en l'état », sans aucune garantie. En l'utilisant, tu acceptes
          d'en être seul responsable : ni l'auteur ni ce site ne peuvent être tenus responsables
          d'un dommage lié à son usage, à son indisponibilité ou à une information erronée.
        </p>
      </section>

      <!-- Deux lignes plutôt qu'une suite de séparateurs : dans une colonne de
           520 px, le retour à la ligne laissait un « · » orphelin en fin de ligne. -->
      <footer class="mt-4 text-center text-xs leading-relaxed text-sub">
        <p class="m-0">
          <a
            href="https://github.com/csanchez-jetdev/rappelo"
            target="_blank"
            rel="noopener"
            class="font-semibold underline-offset-2 hover:underline"
          >Code source sur GitHub</a>
          <span aria-hidden="true"> · </span>Licence MIT
        </p>
        <p class="m-0">Fréquentation mesurée sans cookie ni adresse IP</p>
      </footer>
    </div>
  </div>
</template>
