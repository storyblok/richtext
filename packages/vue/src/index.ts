import type { VNode } from 'vue'
import { createTextVNode, h } from 'vue'
import { RouterLink } from 'vue-router'

import type { SbRichTextNode, SbRichTextNodeResolver, SbRichTextOptions } from '@storyblok/richtext'
import { BlockTypes, MarkTypes, richTextResolver } from '@storyblok/richtext'
import { StoryblokComponent } from '@storyblok/vue'
import SbRichText from './components/SbRichText.vue'

const componentResolver: SbRichTextNodeResolver<VNode> = (node: SbRichTextNode<VNode>): VNode => {
  return h(StoryblokComponent, {
    blok: node?.attrs?.body[0],
    id: node.attrs?.id,
  }, node.children)
}

export function useSbRichtextResolver(options: SbRichTextOptions<VNode>) {
  const mergedOptions: SbRichTextOptions<VNode> = {
    renderFn: h,
    textFn: createTextVNode,
    resolvers: {
      [MarkTypes.LINK]: (node: SbRichTextNode<VNode>) => {
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

export { SbRichText }
