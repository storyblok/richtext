import { defineConfig } from 'astro/config';
import storyblok from "@storyblok/astro";
import { loadEnv } from "vite";
const { VITE_STORYBLOK_TOKEN } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://astro.build/config
export default defineConfig({
  integrations: [
    storyblok({
      accessToken: VITE_STORYBLOK_TOKEN,
      components: {
        page: 'storyblok/Page',
        'iframe-embed': 'storyblok/IFrameEmbed',
      }
    }),
  ],
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
});
