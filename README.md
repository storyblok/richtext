# Storyblok Richtext Resolver PoC

This is a proof of concept for a custom resolver for the Storyblok Richtext field. It is based on the [Storyblok Richtext Resolver](https://www.storyblok.com/docs/guide/rich-text-field) documentation.

- [Proposal and PoC definition](https://www.notion.so/storyblok/RichText-d6334cacdd1946148a3992bcfca851a1?pvs=4)
- [Results of PoC](https://www.notion.so/storyblok/RichText-d6334cacdd1946148a3992bcfca851a1?pvs=4#37503f50422d41e29760fc5fc0dd91e2)

## Usage

### Basic

```ts
import { RichTextResolver } from '@storyblok/richtext'

const { render } = RichTextResolver()

const html = render(doc)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  ${html}
  </div>
`
```

### Overwrite resolvers

To overwrite an existing resolver, you can pass a property called resolvers available on the `RichTextResolver` options.

```ts
import { MarkTypes, RichTextResolver } from '@storyblok/richtext'

const html = RichTextResolver({
  resolvers: {
    [MarkTypes.LINK]: (node) => {
      return `<button href="${node.attrs?.href}" target="${node.attrs?.target}">${node.children}</button>`
    },
  },
}).render(doc)
```

### Typing with Generics

It is possible to ensure correct typing support in a framework-agnostic way by using [Typescript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

- Vanilla `string`
- Vue `VNode`
- React `React.ReactElement`

This way the `@storyblok/richtext` is ignorant of framework specific types, avoiding having to import them and having `vue` `react` etc as dependencies.

```ts
// Vanilla
const options: SbRichtextOptions<string> = {
  resolvers: {
    [MarkTypes.LINK]: (node: Node<string>) => {
      return `<button href="${node.attrs?.href}" target="${node.attrs?.target}">${node.children}</button>`
    },
  },
}

const html = RichTextResolver<string>(options).render(doc)
```

```ts
// Vue
const options: SbRichtextOptions<VNode> = {
  renderFn: h,
}
const root = () => RichTextResolver<VNode>(options).render(doc)
```

## Setup

```
pnpm install
```

This command will install the dependencies for the workspace, including the dependencies for the playgrounds under `/playground` and different framework wrappers `/packages`

### Run Playground

To run the vanilla Typescript playground:

```bash
pnpm run playground
```

Vue playground:

```bash
pnpm run playground:vue
```

React playground:

```bash
pnpm run playground:react
```

Alternatively you can run the following command to run all the playgrounds:

```bash
pnpm run playground:all
```

### Build

To build the core package:

```bash
pnpm run build
```

To build the wrappers under `/packages`:

```bash
pnpm run build:packages
```

### Lint

To lint the core package:

```bash
pnpm run lint
```

To lint the wrappers under `/packages`:

```bash
pnpm run lint:packages
```

Alternatively, you can run the following command to fix the linting issues:

```bash
pnpm run lint:fix
```

### Test

To run the tests for the core package:

```bash
pnpm run test
```

## License

[MIT](/LICENSE)
