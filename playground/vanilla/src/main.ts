import './style.css'
import { MarkTypes, RichTextResolver } from '@storyblok/richtext'
import StoryblokClient from 'storyblok-js-client'

// Storyblok

const client = new StoryblokClient({
  accessToken: import.meta.env.VITE_STORYBLOK_TOKEN,
})

const story = await client.get('cdn/stories/home', {
  version: 'draft',
})

const doc = story.data.story.content.richtext


const html = RichTextResolver({
  resolvers: {
    [MarkTypes.LINK]: (node) => {
      return `<button href="${node?.attrs?.href}">${node.text}</button>`
    }
  }
}).render(doc)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  ${html}
  </div>
`
