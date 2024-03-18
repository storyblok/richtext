/* eslint-disable ts/no-use-before-define */
import { BlockTypes, MarkTypes, TextTypes } from './types'
import type { Node, NodeTypes, RichtextData, TextNode } from './types'

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

export function RitchText() {
  // Creates an HTML string for a given tag, attributes, and children
  const nodeResolver = (tag: string) =>
    (node: Node) =>
    `<${tag} ${attrsToString(node.attrs)}>${node.children?.join('')}</${tag}>`

  const headingResolver = (node: Node) => `<h${node.attrs?.level} ${attrsToString(node.attrs)}>${node.children?.join('')}</h${node.attrs?.level}>`

  // Mark resolver for text formatting
  const markResolver = (tag: string) => (text: string, attrs: Record<string, string> = {}) =>
    `<${tag} ${attrsToString(attrs)}>${text}</${tag}>`

  // Resolver for plain text nodes
  const textResolver = (node: TextNode): string => {
    return renderTextWithMarks(escapeHtml(node.text || ''), node.marks)
  }

  const resolvers = new Map<string, (node: Node) => string>([
    [BlockTypes.DOCUMENT, ({ children }) => `<div>${children?.join('')}</div>`],
    [BlockTypes.HEADING, headingResolver],
    [BlockTypes.PARAGRAPH, nodeResolver('p')],
    [TextTypes.TEXT, textResolver],
    [MarkTypes.BOLD, markResolver('strong')],
    [MarkTypes.ITALIC, markResolver('em')],
    [MarkTypes.UNDERLINE, markResolver('u')],
    [MarkTypes.STRIKE, markResolver('s')],
    [MarkTypes.CODE, markResolver('code')],
    [MarkTypes.SUPERSCRIPT, markResolver('sup')],
    [MarkTypes.SUBSCRIPT, markResolver('sub')],
    [MarkTypes.HIGHLIGHT, markResolver('mark')],
  ])

  // Combines text and its marks into a styled HTML string
  const renderTextWithMarks = (text: string, marks: Node[] = []) => {
    return marks.reduceRight((acc, mark) => {
      const resolver = resolvers.get(mark.type)
      return resolver ? resolver(acc) : acc // Apply the mark using its resolver
    }, text)
  }

  function renderNode(node: RichtextData): string {
    const resolver = resolvers.get(node.type)
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
      children: children as Node[], // Fix: Update the type of 'children' to Node[]
      type: node.type as NodeTypes,
    })
  }

  function render(node: RichtextData): string {
    if (!node) {
      console.warn(`No content to render,
      The render method must receive an Object with a "content" field that is an array of nodes`)

      return ''
    }
    return Array.isArray(node) ? node.map(renderNode).join('') : renderNode(node)
  }

  return {
    render,
  }
}
