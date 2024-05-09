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
})
