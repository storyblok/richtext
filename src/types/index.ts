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

export interface SbRichTextDocumentNode {
  type: string,
  content?: SbRichTextDocumentNode[]
  attrs?: Record<string, any>
  text?: string
  marks?: SbRichTextDocumentNode[]
}

export type SbRichTextNodeTypes = BlockTypes | MarkTypes | TextTypes

export interface SbRichTextNode<T = string> {
  type: SbRichTextNodeTypes
  content: SbRichTextNode<T>[]
  children?: T
  attrs?: Record<string, any>
  text?: string
}

export interface LinkNode<T = string> extends SbRichTextNode<T> {
  type: MarkTypes.LINK | MarkTypes.ANCHOR
  linktype: LinkTypes.ASSET | LinkTypes.EMAIL | LinkTypes.STORY | LinkTypes.URL
  attrs: Record<string, any>
}

export interface MarkNode<T = string> extends SbRichTextNode<T> {
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

export interface TextNode<T = string> extends SbRichTextNode<T> {
  type: TextTypes.TEXT
  text: string
  marks?: MarkNode<T>[]
}

/**
 * Represents a resolver function for a Storyblok rich text node.
 * @template T - The type of the resolved value.
 * @param node - The rich text node to resolve.
 * @returns The resolved value of type T.
 */
export type SbRichTextNodeResolver<T = string> = (node: SbRichTextNode<T> | TextNode<T> | MarkNode<T> | LinkNode<T>) => T

/**
 * Represents the configuration options for optimizing images in rich text content.
 */
export interface SbRichTextImageOptimizationOptions {
  /**
   * CSS class to be applied to the image.
   */
  class: string;

  /**
   * Width of the image in pixels.
   */
  width: number;

  /**
   * Height of the image in pixels.
   */
  height: number;

  /**
   * Loading strategy for the image. 'lazy' loads the image when it enters the viewport. 'eager' loads the image immediately.
   */
  loading: 'lazy' | 'eager';

  /**
   * Optional filters that can be applied to the image to adjust its appearance.
   * 
   * @example
   * 
   * ```typescript
   * const filters: Partial<SbRichTextImageOptimizationOptions['filters']> = {
   *   blur: 5,
   *   brightness: 150,
   *   grayscale: true
   * }
   * ```
   */
  filters: Partial<{
    blur: number;
    brightness: number;
    fill: 'transparent';
    format: 'webp' | 'png' | 'jpg';
    grayscale: boolean;
    quality: number;
    rotate: 0 | 90 | 180 | 270;
  }>;

  /**
   * Defines a set of source set values that tell the browser different image sizes to load based on screen conditions.
   * The entries can be just the width in pixels or a tuple of width and pixel density.
   * 
   * @example
   * 
   * ```typescript
   * const srcset: (number | [number, number])[] = [
   *   320,
   *   [640, 2]
   * ]
   * ```
   */
  srcset: (number | [number, number])[];

  /**
   * A list of sizes that correspond to different viewport widths, instructing the browser on which srcset source to use.
   * 
   * @example
   * 
   * ```typescript
   * const sizes: string[] = [
   *   '(max-width: 320px) 280px',
   *   '(max-width: 480px) 440px',
   *   '800px'
   * ]
   * ```
   */
  sizes: string[];
}


/**
 * Resolvers for Storyblok RichText nodes.
 * 
 * @template T - The type of the resolved value.
 */
export type SbRichTextResolvers<T = string> = Partial<Record<SbRichTextNodeTypes, SbRichTextNodeResolver<T>>>


/**
 * Represents the options for rendering rich text.
 */
export interface SbRichTextOptions<T = string, S = (tag: string, attrs: Record<string, any>, text: string) => T> {
  /**
   * Defines the function that will be used to render the final HTML string (vanilla) or Framework component (React, Vue).
   * 
   * @example 
   * 
   * ```typescript
   * const renderFn = (tag: string, attrs: Record<string, any>, text: string) => {
   *  return `<${tag} ${Object.keys(attrs).map(key => `${key}="${attrs[key]}"`).join(' ')}>${text}</${tag}>`
   * }
   * 
   * const options: SbRichTextOptions = {
   *  renderFn
   * }
   * ```
   */
  renderFn?: S;
  
  /**
   * Defines the function that will be used to render HTML text.
   *  
   * @example
   * 
   * ```typescript
   * import { h, createTextVNode } from 'vue'
   * 
   * const options: SbRichTextOptions = {
   *  renderFn: h,
   *  textFn: createTextVNode
   * }
   * ```
   */
  textFn?: Function;
  
  /**
   * Defines the resolvers for each type of node.
   *  
   * @example
   * 
   * ```typescript
   * const options: SbRichTextOptions = {
   *  resolvers: {
   *    [MarkTypes.LINK]: (node: SbRichTextNode) => {
   *      return `<a href="${node.attrs.href}">${node.text}</a>`
   *    }
   *  }
   * }
   * ```
   */
  resolvers?: SbRichTextResolvers<T>;
  
  /**
   * Defines opt-out image optimization options.
   *  
   * @example
   * 
   * ```typescript
   * const options: SbRichTextOptions = {
   *  optimizeImages: true
   * }
   * ```
   * 
   * @example
   * 
   * ```typescript
   * const options: SbRichTextOptions = {
   *    optimizeImages: {
   *    class: 'my-image',
   *    width: 800,
   *    height: 600,
   *    loading: 'lazy',
   * }
   * ```
   */
  optimizeImages?: boolean | Partial<SbRichTextImageOptimizationOptions>;
}
