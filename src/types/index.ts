export enum BlockTypes {
  DOCUMENT = 'doc',
  HEADING = 'heading',
  PARAGRAPH = 'paragraph',
  QUOTE = 'blockquote',
  OL_LIST = 'ordered_list',
  UL_LIST = 'bullet_list',
  LIST_ITEM = 'list_item',
  CODE_BLOCK = 'code_block',
  HR = 'horizontal_rule',
  BR = 'hard_break',
  IMAGE = 'image',
  EMOJI = 'emoji',
  COMPONENT = 'blok',
}

export enum MarkTypes {
  BOLD = 'bold',
  STRONG = 'strong',
  STRIKE = 'strike',
  UNDERLINE = 'underline',
  ITALIC = 'italic',
  CODE = 'code',
  LINK = 'link',
  ANCHOR = 'anchor',
  STYLED = 'styled',
  SUPERSCRIPT = 'superscript',
  SUBSCRIPT = 'subscript',
  TEXT_STYLE = 'textStyle',
  HIGHLIGHT = 'highlight',
}

export enum TextTypes {
  TEXT = 'text',
}

export enum LinkTargets {
  SELF = '_self',
  BLANK = '_blank',
}

export enum LinkTypes {
  URL = 'url',
  STORY = 'story',
  ASSET = 'asset',
  EMAIL = 'email',
}

export type NodeTypes = BlockTypes | MarkTypes | TextTypes

export interface Node<T = string> {
  type: NodeTypes
  content: Node<T>[]
  children?: T
  attrs?: Record<string, any>
  text?: string
}

export interface LinkNode<T = string> extends Node<T> {
  type: MarkTypes.LINK | MarkTypes.ANCHOR
  linktype: LinkTypes.ASSET | LinkTypes.EMAIL | LinkTypes.STORY | LinkTypes.URL
  attrs: Record<string, any>
}

export interface MarkNode<T = string> extends Node<T> {
  type: MarkTypes.BOLD |
    MarkTypes.ITALIC |
    MarkTypes.UNDERLINE |
    MarkTypes.STRIKE |
    MarkTypes.CODE |
    MarkTypes.LINK |
    MarkTypes.ANCHOR |
    MarkTypes.STYLED |
    MarkTypes.SUPERSCRIPT |
    MarkTypes.SUBSCRIPT |
    MarkTypes.TEXT_STYLE |
    MarkTypes.HIGHLIGHT
  attrs?: Record<string, any>
  linkType: LinkTypes
}

export interface TextNode<T = string> extends Node<T> {
  type: TextTypes.TEXT
  text: string
  marks?: MarkNode<T>[]
}

export type NodeResolver<T = string> = (node: Node<T> | TextNode<T> | MarkNode<T> | LinkNode<T>) => T

export interface ImageOptimizationOptions {
  class: string
  width: number
  height: number
  loading: 'lazy' | 'eager'
  filters: Partial<{
    blur: number
    brightness: number
    fill: 'transparent'
    format: 'webp' | 'png' | 'jpg'
    grayscale: boolean
    quality: number
    rotate: 0 | 90 | 180 | 270
  }>
  srcset:(number | [number, number])[]
  sizes: string[]
}

export interface SbRichtextOptions<T = string, S = (tag: string, attrs: Record<string, any>, text: string) => T> {
  renderFn?: S
  textFn?: Function
  resolvers?: Partial<Record<NodeTypes, NodeResolver<T>>>
  optimizeImages?: boolean | Partial<ImageOptimizationOptions>
}
