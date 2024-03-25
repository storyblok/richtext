import { BlockTypes, LinkTypes, MarkTypes, TextTypes } from './types'
import type { MarkNode, Node, NodeResolver, NodeTypes, SbRichtextOptions, TextNode } from './types'

// Converts attributes object to a string of HTML attributes
const attrsToString = (attrs: Record<string, string> = {}) => Object.keys(attrs)
  .map(key => `${key}="${attrs[key]}"`)
  .join(' ')

function escapeHtml(unsafeText: string): string {
  return unsafeText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const defaultRenderFn = (tag: string, attrs: Record<string, string> = {}, children: string) =>
  `<${tag} ${attrsToString(attrs)}>${Array.isArray(children) ? children.join('') : children || ''}</${tag}>`

export function RitchText(options: SbRichtextOptions) {
  // Creates an HTML string for a given tag, attributes, and children
  const { renderFn = defaultRenderFn, resolvers = {} } = options
  const nodeResolver = (tag: string): NodeResolver => (node: Node) => renderFn(tag, node.attrs, node.children || null)

  const headingResolver: NodeResolver = (node: Node) => renderFn(`h${node.attrs?.level}`, node.attrs, node.children)

  const emojiResolver: NodeResolver = (node: Node) => renderFn('span', {
    'data-type': 'emoji',
    'data-name': node.attrs?.name,
    'emoji': node.attrs?.emoji,
  }, renderFn('img', {
    src: node.attrs?.fallbackImage,
    alt: node.attrs?.alt,
    style: 'width: 1.25em; height: 1.25em; vertical-align: text-top',
    draggable: 'false',
    loading: 'lazy',
  }, ''))

  const codeBlockResolver: NodeResolver = (node: Node) => {
    return renderFn('pre', node.attrs, renderFn('code', {}, node.children))
  }

  // Mark resolver for text formatting
  const markResolver = (tag: string): NodeResolver => ({ text, attrs }) =>
    renderFn(tag, attrs, text as string)

  // Resolver for plain text nodes
  const textResolver: NodeResolver = (node: Node) => {
    const { marks, ...rest } = node as TextNode
    if ('text' in node) {
      // Now TypeScript knows that 'node' is a TextNode, so 'marks' can be accessed

      return marks
        ? marks.reduce(
          (text: string, mark: MarkNode) => render({ ...mark, text }),
          render(rest),
        )
        : escapeHtml(rest.text)
    }
    else {
      return ''
    }
  }

  // Resolver for link nodes

  const linkResolver: NodeResolver = (node: Node) => {
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

    return renderFn('a', { ...node.attrs, targetAttr, href }, node.text as string)
  }

  const mergedResolvers = new Map<NodeTypes, NodeResolver>([
    [BlockTypes.DOCUMENT, nodeResolver('div')],
    [BlockTypes.HEADING, headingResolver],
    [BlockTypes.PARAGRAPH, nodeResolver('p')],
    [BlockTypes.UL_LIST, nodeResolver('ul')],
    [BlockTypes.OL_LIST, nodeResolver('ol')],
    [BlockTypes.LIST_ITEM, nodeResolver('li')],
    [BlockTypes.IMAGE, nodeResolver('img')],
    [BlockTypes.EMOJI, emojiResolver],
    [BlockTypes.CODE_BLOCK, codeBlockResolver],
    [TextTypes.TEXT, textResolver],
    [MarkTypes.LINK, linkResolver],
    [MarkTypes.ANCHOR, linkResolver],
    [MarkTypes.STYLED, markResolver('span')],
    [MarkTypes.BOLD, markResolver('strong')],
    [MarkTypes.ITALIC, markResolver('em')],
    [MarkTypes.UNDERLINE, markResolver('u')],
    [MarkTypes.STRIKE, markResolver('s')],
    [MarkTypes.CODE, markResolver('code')],
    [MarkTypes.SUPERSCRIPT, markResolver('sup')],
    [MarkTypes.SUBSCRIPT, markResolver('sub')],
    [MarkTypes.HIGHLIGHT, markResolver('mark')],
    ...(Object.entries(resolvers).map(([type, resolver]) => [type as NodeTypes, resolver])) as Array<[NodeTypes, NodeResolver]>,
  ])

  function renderNode(node: Node): string {
    const resolver = mergedResolvers.get(node.type)
    if (!resolver) {
      console.error('<Storyblok>', `No resolver found for node type ${node.type}`)
      return ''
    }

    if (node.type === 'text') {
      return resolver(node as Node)
    }

    const children = node.content ? node.content.map(render) : undefined

    return resolver({
      ...node,
      children: children as unknown as Node[], // Fix: Update the type of 'children' to Node[]
    })
  }

  function render(node: Node): string {
    return Array.isArray(node) ? node.map(renderNode) : renderNode(node)
  }

  return {
    render,
  }
}
