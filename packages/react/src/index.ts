import React from 'react'
import { StoryblokComponent } from '@storyblok/react'
import type { StoryblokRichTextNode, StoryblokRichTextOptions } from '@storyblok/richtext'
import { BlockTypes, richTextResolver } from '@storyblok/richtext'
import StoryblokRichText from './StoryblokRichText'

function componentResolver(node: StoryblokRichTextNode<React.ReactElement>) {
  // Convert this to use React.createElement or JSX
  // Example with JSX:
  return React.createElement(StoryblokComponent, { blok: node?.attrs?.body[0], id: node.attrs?.id })
}

export function useStoryblokRichTextResolver(options: StoryblokRichTextOptions<React.ReactElement>) {
  const mergedOptions = {
    renderFn: React.createElement,
    resolvers: {
      [BlockTypes.COMPONENT]: componentResolver,
      ...options.resolvers,
    },
  }
  return richTextResolver(mergedOptions)
}

export { StoryblokRichText }
