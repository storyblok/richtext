import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'pathe'

import { qrcode } from 'vite-plugin-qrcode'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qrcode(), // only applies in dev mode
  ],
  resolve: {
    alias: {
      '@storyblok/richtext-resolver': resolve(__dirname, '../../src/index.ts'),
    },
  },
})
