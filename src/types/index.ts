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

export enum ComponentTypes {
  COMPONENT = 'blok',
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

export type NodeTypes = BlockTypes | MarkTypes | TextTypes | ComponentTypes

export interface Node<T = string> {
  type: NodeTypes
  content: Node[]
  children?: T
  attrs?: Record<string, any>
  text?: string
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

export type NodeResolver<T = string> = (node: Node<T> | TextNode<T> | MarkNode<T>) => T

export interface SbRichtextOptions<T = string, S = (tag: string, attrs: Record<string, any>, text: string) => T> {
  renderFn: S
  resolvers?: Array<[NodeTypes, NodeResolver<T>]>
}
