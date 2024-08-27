import type { VNode } from 'vue'
import { createTextVNode, h } from 'vue'
import { RouterLink } from 'vue-router'

import type { StoryblokRichTextNode, StoryblokRichTextNodeResolver, StoryblokRichTextOptions } from '@storyblok/richtext'
import { BlockTypes, MarkTypes, richTextResolver } from '@storyblok/richtext'
import { StoryblokComponent } from '@storyblok/vue'
import StoryblokRichText from './components/StoryblokRichText.vue'

const componentResolver: StoryblokRichTextNodeResolver<VNode> = (node: StoryblokRichTextNode<VNode>): VNode => {
  return h(StoryblokComponent, {
    blok: node?.attrs?.body[0],
    id: node.attrs?.id,
  }, node.children)
}

export function useStoryblokRichtextResolver(options: StoryblokRichTextOptions<VNode>) {
  const mergedOptions: StoryblokRichTextOptions<VNode> = {
    renderFn: h,
    textFn: createTextVNode,
    resolvers: {
      [MarkTypes.LINK]: (node: StoryblokRichTextNode<VNode>) => {
        return node.attrs?.linktype === 'STORY'
          ? h(RouterLink, {
            to: node.attrs?.href,
            target: node.attrs?.target,
          }, node.text)
          : h('a', {
            href: node.attrs?.href,
            target: node.attrs?.target,
          }, node.text)
      },
      [BlockTypes.COMPONENT]: componentResolver,
      ...options.resolvers,
    },
  }
  return richTextResolver<VNode>(mergedOptions)
}

export { StoryblokRichText }
