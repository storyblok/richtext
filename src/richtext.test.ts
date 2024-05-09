import { describe, expect, it } from 'vitest'
import { RichTextResolver } from './richtext'

import type { Node } from './types'

describe('richtext', () => {
  it('should render a paragraph', async () => {
    const { render } = RichTextResolver({})
    const paragraph = {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hello, world!',
        },
      ],
    }
    const html = render(paragraph as Node<string>)
    expect(html).toBe('<p key="p-2">Hello, world!</p>')
  })

  it('should render a heading 1', async () => {
    const { render } = RichTextResolver({})
    const heading = {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          text: 'Headline 1',
          type: 'text',
        },
      ],
    }
    const html = render(heading as Node<string>)
    expect(html).toBe('<h1 key="h1-2">Headline 1</h1>')
  })

  it('should render an unordered list', async () => {
    const { render } = RichTextResolver({})
    const list = {
      type: 'bullet_list',
      content: [
        {
          type: 'list_item',
          content: [
            {
              type: 'text',
              text: 'Item 1',
            },
          ],
        },
        {
          type: 'list_item',
          content: [
            {
              type: 'text',
              text: 'Item 2',
            },
          ],
        },
      ],
    }
    const html = render(list as Node<string>)
    expect(html).toBe('<ul key="ul-5"><li key="li-3">Item 1</li><li key="li-5">Item 2</li></ul>')
  })

  it('should render an ordered list', async () => {
    const { render } = RichTextResolver({})
    const list = {
      type: 'ordered_list',
      attrs: { order: 1 },
      content: [
        {
          type: 'list_item',
          content: [
            {
              type: 'text',
              text: 'Item 1',
            },
          ],
        },
        {
          type: 'list_item',
          content: [
            {
              type: 'text',
              text: 'Item 2',
            },
          ],
        },
      ],
    }
    const html = render(list as Node<string>)
    expect(html).toBe('<ol order="1" key="ol-5"><li key="li-3">Item 1</li><li key="li-5">Item 2</li></ol>')
  })

  it('should render an image with attrs', async () => {
    const { render } = RichTextResolver({})
    const image = {
      type: 'image',
      attrs: {
        src: 'https://example.com/image.jpg',
        alt: 'An image',
      },
    }
    const html = render(image as Node<string>)
    expect(html).toBe('<img src="https://example.com/image.jpg" alt="An image" key="img-1"></img>')
  })

  it('should render an emoji', async () => {
    const { render } = RichTextResolver({})
    const emoji = {
      type: 'emoji',
      attrs: {
        emoji: '🚀',
      },
    }
    const html = render(emoji as Node<string>)
    expect(html).toBe('<span data-type="emoji" data-name="undefined" emoji="🚀" key="emoji-1"><img src="undefined" alt="undefined" style="width: 1.25em; height: 1.25em; vertical-align: text-top" draggable="false" loading="lazy"></img></span>')
  })

  it('should render a code block', async () => {
    const { render } = RichTextResolver({})
    const code = {
      type: 'code_block',
      content: [
        {
          text: 'console.log("Hello, world!")',
          type: 'text',
        },
      ],
    }
    const html = render(code as Node<string>)
    expect(html).toBe('<pre key="code-2"><code key="code-2">console.log(&quot;Hello, world!&quot;)</code></pre>')
  })

  it('should render a horizontal rule', async () => {
    const { render } = RichTextResolver({})
    const hr = {
      type: 'horizontal_rule',
    }
    const html = render(hr as Node<string>)
    expect(html).toBe('<hr key="hr-1"></hr>')
  })

  it('should render a break', async () => {
    const { render } = RichTextResolver({})
    const br = {
      type: 'hard_break',
    }
    const html = render(br as Node<string>)
    expect(html).toBe('<br key="br-1"></br>')
  })

  it('should render a quote' , async () => {
    const { render } = RichTextResolver({})
    const quote = {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Quote',
            },
          ],
        },
      ],
    }
    const html = render(quote as Node<string>)
    expect(html).toBe('<blockquote key="blockquote-3"><p key="p-3">Quote</p></blockquote>')
  })

  it('should render text with marks', async () => {
    const { render } = RichTextResolver({})
    const text = {
      type: 'paragraph',
      content: [
        {
          text: 'Bold and italic',
          type: 'text',
          marks: [{ type: 'bold' }, { type: 'italic' }],
        },
      ],
    }
    const html = render(text as Node<string>)
    expect(html).toBe('<p key="p-5"><em key="em-5"><strong key="strong-4">Bold and italic</strong></em></p>')
  })

  it('should render text with styled marks', async () => {
    const { render } = RichTextResolver({})
    const text = {
      type: 'paragraph',
      content: [
        {
          text: 'Bold and italic',
          type: 'text',
          marks: [{ type: 'styled', attrs: { color: 'red' } }, { type: 'styled', attrs: { color: 'blue' } }],
        },
      ],
    }
    const html = render(text as Node<string>)
    // Update the expected HTML to reflect the styles
    expect(html).toBe('<p key="p-5"><span style="color: blue" key="span-5"><span style="color: red" key="span-4">Bold and italic</span></span></p>')
  })

  it('should render an external link', async () => {
    const { render } = RichTextResolver({})
    const link = {
      text: 'External link',
      type: 'text',
      marks: [
        {
          type: 'link',
          attrs: {
            href: 'https://alvarosaburido.dev',
            target: '_blank',
            linktype: 'url',
          },
        },
      ],
    }
    const html = render(link as Node<string>)
    expect(html).toBe('<a target="_blank" href="https://alvarosaburido.dev" key="a-3">External link</a>')
  })

  it('should render an anchor link', async () => {
    const { render } = RichTextResolver({})
    const link = {
      text: 'Anchor link',
      type: 'text',
      marks: [
        {
          type: 'link',
          attrs: {
            href: 'https://alvarosaburido.dev',
            target: '_self',
            anchor: 'anchor',
          },
        },
      ],
    }
    const html = render(link as Node<string>)
    expect(html).toBe('<a target="_self" href="#anchor" key="a-3">Anchor link</a>')
  })

  it('should render an email link', async () => {
    const { render } = RichTextResolver({})
    const link = {
      text: 'hola@alvarosaburido.dev',
      type: 'text',
      marks: [
        {
          type: 'link',
          attrs: {
            href: 'hola@alvarosaburido.dev',
            linktype: 'email',
          },
        },
      ],
    }
    const html = render(link as Node<string>)
    expect(html).toBe('<a href="mailto:hola@alvarosaburido.dev" key="a-3">hola@alvarosaburido.dev</a>')
  })

  it('should render an internal link', async () => {
    const { render } = RichTextResolver({})
    const link = {
      text: 'Internal Link',
      type: 'text',
      marks: [
        {
          type: 'link',
          attrs: {
            href: '/',
            uuid: '2bbf3ee7-acbe-401c-ade5-cf33e6e0babb',
            anchor: null,
            target: '_blank',
            linktype: 'story',
          },
        },
      ],
    }
    const html = render(link as Node<string>)
    expect(html).toBe('<a uuid="2bbf3ee7-acbe-401c-ade5-cf33e6e0babb" target="_blank" href="/" key="a-3">Internal Link</a>')
  })

  it('should render an asset link', async () => {
    const { render } = RichTextResolver({})
    const link = {
      text: 'Asset link',
      type: 'text',
      marks: [
        {
          type: 'link',
          attrs: {
            href: 'https://a.storyblok.com/f/67536/400x303/ccbe9ca7b3/nuxt-logo.png',
            linktype: 'asset',
          },
        },
      ],
    }
    const html = render(link as Node<string>)
    expect(html).toBe('<a href="https://a.storyblok.com/f/67536/400x303/ccbe9ca7b3/nuxt-logo.png" key="a-3">Asset link</a>')
  })

  it('should render a bold text', async () => {
    const { render } = RichTextResolver({})
    const bold = {
      text: 'Bold',
      type: 'text',
      marks: [{ type: 'bold' }],
    }
    const html = render(bold as Node<string>)
    expect(html).toBe('<strong key="strong-3">Bold</strong>')
  })

  it('should render an italic text', async () => {
    const { render } = RichTextResolver({})
    const italic = {
      text: 'Italic',
      type: 'text',
      marks: [{ type: 'italic' }],
    }
    const html = render(italic as Node<string>)
    expect(html).toBe('<em key="em-3">Italic</em>')
  })

  it('should render a underline text', async () => {
    const { render } = RichTextResolver({})
    const underline = {
      text: 'Underline',
      type: 'text',
      marks: [{ type: 'underline' }],
    }
    const html = render(underline as Node<string>)
    expect(html).toBe('<u key="u-3">Underline</u>')
  })

  it('should render a strike text', async () => {
    const { render } = RichTextResolver({})
    const strike = {
      text: 'Strike',
      type: 'text',
      marks: [{ type: 'strike' }],
    }
    const html = render(strike as Node<string>)
    expect(html).toBe('<s key="s-3">Strike</s>')
  })

  it('should render a code text', async () => {
    const { render } = RichTextResolver({})
    const code = {
      text: 'Code',
      type: 'text',
      marks: [{ type: 'code' }],
    }
    const html = render(code as Node<string>)
    expect(html).toBe('<code key="code-3">Code</code>')
  })

  it('should renser a superscript text', async () => {
    const { render } = RichTextResolver({})
    const superscript = {
      text: 'Superscript',
      type: 'text',
      marks: [{ type: 'superscript' }],
    }
    const html = render(superscript as Node<string>)
    expect(html).toBe('<sup key="sup-3">Superscript</sup>')
  })

  it('should render a subscript text', async () => {
    const { render } = RichTextResolver({})
    const subscript = {
      text: 'Subscript',
      type: 'text',
      marks: [{ type: 'subscript' }],
    }
    const html = render(subscript as Node<string>)
    expect(html).toBe('<sub key="sub-3">Subscript</sub>')
  })

  it('should render a highlight text', async () => {
    const { render } = RichTextResolver({})
    const highlight = {
      text: 'Highlight',
      type: 'text',
      marks: [{ type: 'highlight' }],
    }
    const html = render(highlight as Node<string>)
    expect(html).toBe('<mark key="mark-3">Highlight</mark>')
  })
})
