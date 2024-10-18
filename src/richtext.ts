import { optimizeImage } from './images-optimization';
import { BlockTypes, LinkTypes, MarkTypes, TextTypes } from './types';
import type { MarkNode, StoryblokRichTextNode, StoryblokRichTextNodeResolver, StoryblokRichTextNodeTypes, StoryblokRichTextOptions, TextNode } from './types';
import { attrsToString, attrsToStyle, cleanObject, escapeHtml, SELF_CLOSING_TAGS } from './utils';

/**
 * Default render function that creates an HTML string for a given tag, attributes, and children.
 *
 * @template T
 * @param {string} tag
 * @param {Record<string, any>} [attrs]
 * @param {T} children
 * @return {*}  {T}
 */
function defaultRenderFn<T = string | null>(tag: string, attrs: Record<string, any> = {}, children: T): T {
  const attrsString = attrsToString(attrs);
  const tagString = attrsString ? `${tag} ${attrsString}` : tag;

  if (SELF_CLOSING_TAGS.includes(tag)) {
    return `<${tagString} />` as unknown as T;
  }
  return `<${tagString}>${Array.isArray(children) ? children.join('') : children || ''}</${tag}>` as unknown as T;
}

/**
 * Creates a rich text resolver with the given options.
 *
 * @export
 * @template T
 * @param {StoryblokRichTextOptions<T>} [options]
 * @return {*}
 */
export function richTextResolver<T>(options: StoryblokRichTextOptions<T> = {}) {
  // Creates an HTML string for a given tag, attributes, and children
  let currentKey = 0;
  const {
    renderFn = defaultRenderFn,
    textFn = escapeHtml,
    resolvers = {},
    optimizeImages = false,
  } = options;

  const nodeResolver = (tag: string): StoryblokRichTextNodeResolver<T> =>
    (node: StoryblokRichTextNode<T>): T =>
      renderFn(tag, {
        ...node.attrs,
        key: `${tag}-${currentKey}`,
      }, node.children || null as any) as T;

  const imageResolver: StoryblokRichTextNodeResolver<T> = (node: StoryblokRichTextNode<T>) => {
    const { src, alt, title, srcset, sizes } = node.attrs || {};
    let finalSrc = src;
    let finalAttrs = {};

    if (optimizeImages) {
      const { src: optimizedSrc, attrs: optimizedAttrs } = optimizeImage(src, optimizeImages);
      finalSrc = optimizedSrc;
      finalAttrs = optimizedAttrs;
    }
    const imgAttrs = {
      src: finalSrc,
      alt,
      title,
      srcset,
      sizes,
      key: `img-${currentKey}`,
      ...finalAttrs,
    };

    return renderFn('img', cleanObject(imgAttrs), '') as T;
  };
  const headingResolver: StoryblokRichTextNodeResolver<T> = (node: StoryblokRichTextNode<T>): T => {
    const { level, ...rest } = node.attrs || {};
    return renderFn(`h${level}`, {
      ...rest,
      key: `h${level}-${currentKey}`,
    }, node.children as any) as T;
  };

  const emojiResolver: StoryblokRichTextNodeResolver<T> = (node: StoryblokRichTextNode<T>) =>
    renderFn('span', {
      'data-type': 'emoji',
      'data-name': node.attrs?.name,
      'emoji': node.attrs?.emoji,
      'key': `emoji-${currentKey}`,
    }, renderFn('img', {
      src: node.attrs?.fallbackImage,
      alt: node.attrs?.alt,
      style: 'width: 1.25em; height: 1.25em; vertical-align: text-top',
      draggable: 'false',
      loading: 'lazy',
    }, '' as any)) as T;

  const codeBlockResolver: StoryblokRichTextNodeResolver<T> = (node: StoryblokRichTextNode<T>): T => {
    return renderFn('pre', {
      ...node.attrs,
      key: `code-${currentKey}`,
    }, renderFn('code', { key: `code-${currentKey}` }, node.children || '' as any)) as T;
  };

  // Mark resolver for text formatting
  const markResolver = (tag: string, styled = false): StoryblokRichTextNodeResolver<T> => ({ text, attrs }): T => {
    return renderFn(tag, styled
      ? {
          style: attrsToStyle(attrs),
          key: `${tag}-${currentKey}`,
        }
      : { ...attrs, key: `${tag}-${currentKey}` }, text as any) as T;
  };

  const renderToT = (node: any): T => {
    // Implementation that ensures the return type is T
    // This might involve checking the type of T and handling accordingly
    return render(node) as unknown as T;
  };

  // Resolver for plain text nodes
  const textResolver: StoryblokRichTextNodeResolver<T> = (node: StoryblokRichTextNode<T>): T => {
    const { marks, ...rest } = node as TextNode<T>;
    if ('text' in node) {
      // Now TypeScript knows that 'node' is a TextNode, so 'marks' can be accessed

      return marks
        ? marks.reduce(
          (text: T, mark: MarkNode<T>) => renderToT({ ...mark, text }) as T, // Fix: Ensure render function returns a string
          renderToT({ ...rest, children: rest.children as T }) as T, // Fix: Cast children to string
        )
        : textFn(rest.text) as T; // Fix: Ensure escapeHtml returns a string
    }
    else {
      return '' as T; // Fix: Ensure empty string is of type string
    }
  };

  // Resolver for link nodes

  const linkResolver: StoryblokRichTextNodeResolver<T> = (node: StoryblokRichTextNode<T>) => {
    const { linktype, href, anchor, ...rest } = node.attrs || {};

    let finalHref = '';
    switch (linktype) {
      case LinkTypes.ASSET:
      case LinkTypes.URL:
        finalHref = href;
        break;
      case LinkTypes.EMAIL:
        finalHref = `mailto:${href}`;
        break;
      case LinkTypes.STORY:
        // Assuming you are not using Vue Router in a vanilla implementation.
        // Directly link to the story URL.
        finalHref = href;
        break;
      default:
        // Optional: Handle default case or log an error.
        break;
    }
    if (anchor) {
      finalHref = `${finalHref}#${anchor}`;
    }
    return renderFn('a', { ...rest, href: finalHref, key: `a-${currentKey}` }, node.text as any) as T;
  };

  const componentResolver: StoryblokRichTextNodeResolver<T> = (node: StoryblokRichTextNode<T>): T => {
    console.warn('[StoryblokRichtText] - BLOK resolver is not available for vanilla usage');
    return renderFn('span', {
      blok: node?.attrs?.body[0],
      id: node.attrs?.id,
      key: `component-${currentKey}`,
      style: 'display: none',
    }, '') as T;
  };

  const mergedResolvers = new Map<StoryblokRichTextNodeTypes, StoryblokRichTextNodeResolver<T>>([
    [BlockTypes.DOCUMENT, nodeResolver('div')],
    [BlockTypes.HEADING, headingResolver],
    [BlockTypes.PARAGRAPH, nodeResolver('p')],
    [BlockTypes.UL_LIST, nodeResolver('ul')],
    [BlockTypes.OL_LIST, nodeResolver('ol')],
    [BlockTypes.LIST_ITEM, nodeResolver('li')],
    [BlockTypes.IMAGE, imageResolver],
    [BlockTypes.EMOJI, emojiResolver],
    [BlockTypes.CODE_BLOCK, codeBlockResolver],
    [BlockTypes.HR, nodeResolver('hr')],
    [BlockTypes.BR, nodeResolver('br')],
    [BlockTypes.QUOTE, nodeResolver('blockquote')],
    [BlockTypes.COMPONENT, componentResolver],
    [TextTypes.TEXT, textResolver],
    [MarkTypes.LINK, linkResolver],
    [MarkTypes.ANCHOR, linkResolver],
    [MarkTypes.STYLED, markResolver('span', true)],
    [MarkTypes.BOLD, markResolver('strong')],
    [MarkTypes.TEXT_STYLE, markResolver('span', true)],
    [MarkTypes.ITALIC, markResolver('em')],
    [MarkTypes.UNDERLINE, markResolver('u')],
    [MarkTypes.STRIKE, markResolver('s')],
    [MarkTypes.CODE, markResolver('code')],
    [MarkTypes.SUPERSCRIPT, markResolver('sup')],
    [MarkTypes.SUBSCRIPT, markResolver('sub')],
    [MarkTypes.HIGHLIGHT, markResolver('mark')],
    ...(Object.entries(resolvers).map(([type, resolver]) => [type as StoryblokRichTextNodeTypes, resolver])) as unknown as Array<[StoryblokRichTextNodeTypes, StoryblokRichTextNodeResolver<T>]>,
  ]);

  function renderNode(node: StoryblokRichTextNode<T>): T {
    currentKey += 1;
    const resolver = mergedResolvers.get(node.type);
    if (!resolver) {
      console.error('<Storyblok>', `No resolver found for node type ${node.type}`);
      return '' as unknown as T;
    }

    if (node.type === 'text') {
      return resolver(node as StoryblokRichTextNode<T>); // Fix: Update the type of 'node' to Node<string>
    }

    const children = node.content ? node.content.map(render) : undefined;

    return resolver({
      ...node,
      children: children as T, // Fix: Update the type of 'children' to Node[]
    });
  }

  /**
   * Renders a rich text node coming from Storyblok.
   *
   * @param {StoryblokRichTextNode<T>} node
   * @return {*}  {T}
   *
   * @example
   *
   * ```typescript
   * import StoryblokClient from 'storyblok-js-client'
   * import { richTextResolver } from '@storyblok/richtext'
   *
   * const storyblok = new StoryblokClient({
   *  accessToken:  import.meta.env.VITE_STORYBLOK_TOKEN,
   * })
   *
   * const story = await client.get('cdn/stories/home', {
   *  version: 'draft',
   * })
   *
   * const html = richTextResolver().render(story.data.story.content.richtext)
   * ```
   *
   */
  function render(node: StoryblokRichTextNode<T>): T {
    return Array.isArray(node) ? node.map(renderNode) as T : renderNode(node) as T;
  }

  return {
    render,
  };
}
