import { BlockTypes, LinkTypes, MarkTypes, TextTypes } from './types'
import type { MarkNode, Node, NodeResolver, NodeTypes, SbRichtextOptions, TextNode } from './types'

// Converts attributes object to a string of HTML attributes
const attrsToString = (attrs: Record<string, string> = {}) => Object.keys(attrs)
  .map(key => `${key}="${attrs[key]}"`)
  .join(' ')

const attrsToStyle = (attrs: Record<string, string> = {}) => Object.keys(attrs)
  .map(key => `${key}: ${attrs[key]}`)
  .join('; ')

function escapeHtml(unsafeText: string): string {
  return unsafeText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function defaultRenderFn<T = string | null>(tag: string, attrs: Record<string, any> = {}, children: T): T {
  const attrsString = attrsToString(attrs)
  const tagString = attrsString ? `${tag} ${attrsString}` : tag
  return `<${tagString}>${Array.isArray(children) ? children.join('') : children || ''}</${tag}>` as unknown as T
}

export function RichTextResolver<T = string>(options: SbRichtextOptions) {
  // Creates an HTML string for a given tag, attributes, and children
  const { renderFn = defaultRenderFn, resolvers = {} } = options
  const nodeResolver = (tag: string): NodeResolver<T> => (node: Node<T>): T => renderFn(tag, node.attrs || {}, node.children || null as any) as T

  const headingResolver: NodeResolver<T> = (node: Node<T>): T => {
    const { level, ...rest } = node.attrs || {}
    return renderFn(`h${level}`, rest || {}, node.children as any) as T
  }

  const emojiResolver: NodeResolver<T> = (node: Node<T>) => renderFn('span', {
    'data-type': 'emoji',
    'data-name': node.attrs?.name,
    'emoji': node.attrs?.emoji,
  }, renderFn('img', {
    src: node.attrs?.fallbackImage,
    alt: node.attrs?.alt,
    style: 'width: 1.25em; height: 1.25em; vertical-align: text-top',
    draggable: 'false',
    loading: 'lazy',
  }, '')) as T

  const codeBlockResolver: NodeResolver<T> = (node: Node<T>): T => {
    return renderFn('pre', node.attrs || {}, renderFn('code', {}, node.children || '' as any)) as T
  }

  // Mark resolver for text formatting
  const markResolver = (tag: string, styled = false): NodeResolver<T> => ({ text, attrs }): T => {
    return renderFn(tag, styled
      ? {
          style: attrsToStyle(attrs),
        }
      : attrs || {}, text as string) as T
  }

  const renderToT = (node: any): T => {
    // Implementation that ensures the return type is T
    // This might involve checking the type of T and handling accordingly
    return render(node) as unknown as T
  }

  // Resolver for plain text nodes
  const textResolver: NodeResolver<T> = (node: Node<T>): T => {
    const { marks, ...rest } = node as TextNode<T>
    if ('text' in node) {
      // Now TypeScript knows that 'node' is a TextNode, so 'marks' can be accessed

      return marks
        ? marks.reduce(
          (text: T, mark: MarkNode<T>) => renderToT({ ...mark, text }) as T, // Fix: Ensure render function returns a string
          renderToT({ ...rest, children: rest.children as T }) as T, // Fix: Cast children to string
        )
        : escapeHtml(rest.text) as T // Fix: Ensure escapeHtml returns a string
    }
    else {
      return '' as T // Fix: Ensure empty string is of type string
    }
  }

  // Resolver for link nodes

  const linkResolver: NodeResolver<T> = (node: Node<T>) => {
    let href = ''
    const targetAttr = node.attrs?.target ? ` target="${node.attrs.target}"` : ''

    switch (node.attrs?.linktype) {
      case LinkTypes.ASSET:
      case LinkTypes.URL:
        href = node.attrs?.href
        break
      case LinkTypes.EMAIL:
        href = `mailto:${node.attrs?.href}`
        break
      case LinkTypes.STORY:
        // Assuming you are not using Vue Router in a vanilla implementation.
        // Directly link to the story URL.
        href = node.attrs?.href
        break
      default:
        // Optional: Handle default case or log an error.
        break
    }

    return renderFn('a', { ...node.attrs, targetAttr, href }, node.text as string) as T
  }

  // Placeholder default compoment resolver
  const componentResolver: NodeResolver<T> = (node: Node<T>): T => {
    console.warn('[SbRichtText] - BLOK resolver is not available for vanilla usage')
    return renderFn('span', {
      blok: node?.attrs?.body[0],
      id: node.attrs?.id,
      style: 'display: none',
    }, '') as T
  }

  const mergedResolvers = new Map<NodeTypes, NodeResolver<T>>([
    [BlockTypes.DOCUMENT, nodeResolver('div')],
    [BlockTypes.HEADING, headingResolver],
    [BlockTypes.PARAGRAPH, nodeResolver('p')],
    [BlockTypes.UL_LIST, nodeResolver('ul')],
    [BlockTypes.OL_LIST, nodeResolver('ol')],
    [BlockTypes.LIST_ITEM, nodeResolver('li')],
    [BlockTypes.IMAGE, nodeResolver('img')],
    [BlockTypes.EMOJI, emojiResolver],
    [BlockTypes.CODE_BLOCK, codeBlockResolver],
    [BlockTypes.HR, nodeResolver('hr')],
    [BlockTypes.BR, nodeResolver('br')],
    [BlockTypes.QUOTE, nodeResolver('blockquote')],
    [BlockTypes.COMPONENT, componentResolver],
    [TextTypes.TEXT, textResolver],
    [MarkTypes.LINK, linkResolver],
    [MarkTypes.ANCHOR, linkResolver],
    [MarkTypes.STYLED, markResolver('span')],
    [MarkTypes.BOLD, markResolver('strong')],
    [MarkTypes.TEXT_STYLE, markResolver('span', true)],
    [MarkTypes.ITALIC, markResolver('em')],
    [MarkTypes.UNDERLINE, markResolver('u')],
    [MarkTypes.STRIKE, markResolver('s')],
    [MarkTypes.CODE, markResolver('code')],
    [MarkTypes.SUPERSCRIPT, markResolver('sup')],
    [MarkTypes.SUBSCRIPT, markResolver('sub')],
    [MarkTypes.HIGHLIGHT, markResolver('mark')],
    ...(Object.entries(resolvers).map(([type, resolver]) => [type as NodeTypes, resolver])) as unknown as Array<[NodeTypes, NodeResolver<T>]>,
  ])

  function renderNode(node: Node): T {
    const resolver = mergedResolvers.get(node.type)
    if (!resolver) {
      console.error('<Storyblok>', `No resolver found for node type ${node.type}`)
      return '' as unknown as T
    }

    if (node.type === 'text') {
      return resolver(node as Node<T>) // Fix: Update the type of 'node' to Node<string>
    }

    const children = node.content ? node.content.map(render) : undefined

    return resolver({
      ...node,
      children: children as T, // Fix: Update the type of 'children' to Node[]
    })
  }

  function render(node: Node): T {
    return Array.isArray(node) ? node.map(renderNode) as T : renderNode(node) as T
  }

  return {
    render,
  }
}
