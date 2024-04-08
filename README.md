# Storyblok Richtext Resolver PoC

This is a proof of concept for a custom resolver for the Storyblok Richtext field. It is based on the [Storyblok Richtext Resolver](https://www.storyblok.com/docs/guide/rich-text-field) documentation.

- [Proposal and PoC definition](https://www.notion.so/storyblok/RichText-d6334cacdd1946148a3992bcfca851a1?pvs=4)

### Setup

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
