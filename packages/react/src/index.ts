import React from 'react'
import { StoryblokComponent } from '@storyblok/react'
import type { Node, SbRichtextOptions } from '@storyblok/richtext'
import { BlockTypes, RichTextResolver } from '@storyblok/richtext'
import SbRichText from './SbRichText'

function componentResolver(node: Node<React.ReactElement>) {
  // Convert this to use React.createElement or JSX
  // Example with JSX:
  return React.createElement(StoryblokComponent, { blok: node?.attrs?.body[0], id: node.attrs?.id })
}

export function useSbRichtextResolver(options: SbRichtextOptions<React.ReactElement>) {
  const mergedOptions = {
    renderFn: React.createElement,
    resolvers: {
      [BlockTypes.COMPONENT]: componentResolver,
      ...options.resolvers,
    },
  }
  return RichTextResolver(mergedOptions)
}

export { SbRichText }
