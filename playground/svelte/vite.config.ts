import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'pathe'

import { qrcode } from 'vite-plugin-qrcode'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    basicSsl(),
    svelte(),
    qrcode(), // only applies in dev mode
  ],
  resolve: {
    alias: {
      '@storyblok/richtext': resolve(__dirname, '../../src/index.ts'),
    },
  },
})
