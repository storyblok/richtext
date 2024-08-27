import React from 'react'

import { forwardRef } from 'react'
import { convertAttributesInElement } from './utils'
import { useStoryblokRichTextResolver } from '.'
import { StoryblokRichTextNode, StoryblokRichTextResolvers } from '@storyblok/richtext'

interface StoryblokRichTextProps {
  doc:  StoryblokRichTextNode<React.ReactElement> // Try to avoid 'any' by specifying a more accurate type
  resolvers?: StoryblokRichTextResolvers<React.ReactElement> // Same here for resolvers
}

// If you're forwarding a ref to StoryblokRichText
const StoryblokRichText = forwardRef<HTMLDivElement, StoryblokRichTextProps>(({ doc, resolvers }, ref) => {
  // Assuming useStoryblokRichTextResolver is a hook you've created
  const { render } = useStoryblokRichTextResolver({
    resolvers,
  })

  /* const Root = () => render(doc) */
  const html = render(doc)
  const formattedHtml = convertAttributesInElement(html)

  // If you're forwarding a ref, make sure to attach the ref to a DOM element.
  // For example, wrapping <Root /> in a div and attaching the ref to it:
  return <div ref={ref}>{formattedHtml}</div>
})

export default StoryblokRichText
