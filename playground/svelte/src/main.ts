import './app.css'
import App from './App.svelte'
import { storyblokInit, apiPlugin } from "@storyblok/svelte";
import IFrameEmbed from './IFrameEmbed.svelte'

storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_TOKEN,
  // bridge: false,
  use: [apiPlugin],
  components: {
    'iframe-embed': IFrameEmbed,
  }
});

const app = new App({
  target: document.getElementById('app')!,
})

export default app
