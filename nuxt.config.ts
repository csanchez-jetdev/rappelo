// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

// Mesure d'audience. L'identifiant n'est pas codé en dur : ainsi une instance
// auto-hébergée par quelqu'un d'autre n'envoie pas son trafic sur ce compte-ci.
// Sans identifiant — développement, fork — aucun script n'est injecté et rien
// n'est mesuré. infra/deploy.sh fournit les deux valeurs au build.
const RYBBIT_SITE_ID = process.env.NUXT_PUBLIC_RYBBIT_SITE_ID ?? '';
const RYBBIT_HOST = (process.env.NUXT_PUBLIC_RYBBIT_HOST || 'https://app.rybbit.io').replace(/\/$/, '');

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  app: {
    head: {
      // Indispensable aux lecteurs d'écran : sans lui, une synthèse vocale lit
      // le français avec la prononciation de la langue par défaut du système.
      htmlAttrs: { lang: 'fr' },
      titleTemplate: '%s · Rappelo',
      link: [
        // Le SVG passe en premier : les navigateurs qui le comprennent le
        // préfèrent, et il reste net à toutes les tailles. Le .ico, généré
        // depuis le même SVG, sert de repli.
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      script: RYBBIT_SITE_ID
        ? [{
            src: `${RYBBIT_HOST}/api/script.js`,
            defer: true,
            'data-site-id': RYBBIT_SITE_ID,
          }]
        : [],
    },
  },
  vite: {
      plugins: [
        tailwindcss(),
      ],
    },
});
