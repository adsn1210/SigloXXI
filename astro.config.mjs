// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: netlify({
    // el middleware del gate de cuenta atrás debe correr también sobre páginas
    // estáticas prerenderizadas, no solo sobre rutas server-rendered
    edgeMiddleware: true
  })
});