import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { lightGreen } from 'kolorist'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'

import pkg from './package.json'

// eslint-disable-next-line no-console
console.log(`${lightGreen('Storyblok React Richtext')} v${pkg.version}`)

// https://vitejs.dev/config
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${
      pkg.version
    }\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'StoryblokRichtext',
      fileName: format => `storyblok-richtext-react.${format}.js`,
    },
  },
})