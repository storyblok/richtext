import { describe, expect, it } from 'vitest'
import { RichTextResolver } from './richtext'

import type { Node } from './richtext/types'

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
    expect(html).toBe('<p>Hello, world!</p>')
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
    expect(html).toBe('<h1>Headline 1</h1>')
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
    expect(html).toBe('<p><em><strong>Bold and italic</strong></em></p>')
  })
})
