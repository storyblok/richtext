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

export interface Node {
  type: NodeTypes
  content: Node[]
  children?: Node[]
  attrs?: Record<string, any>
  text?: string
}

export interface MarkNode extends Node {
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
}

export interface TextNode extends Node {
  type: TextTypes.TEXT
  text: string
  marks?: MarkNode[]
}

export type NodeResolver = (node: Node | TextNode | MarkNode) => string

export interface SbRichtextOptions {
  renderFn: (tag: string, attrs: Record<string, any>, text: string) => string
  resolvers?: Array<[NodeTypes, NodeResolver]>
}
