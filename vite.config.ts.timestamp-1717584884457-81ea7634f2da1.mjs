// vite.config.ts
import { defineConfig } from "file:///Users/alvarosabu/Projects/storyblok/storyblok-richtext/node_modules/.pnpm/vite@5.2.11_@types+node@20.12.12/node_modules/vite/dist/node/index.js";
import { lightGreen } from "file:///Users/alvarosabu/Projects/storyblok/storyblok-richtext/node_modules/.pnpm/kolorist@1.8.0/node_modules/kolorist/dist/esm/index.mjs";
import banner from "file:///Users/alvarosabu/Projects/storyblok/storyblok-richtext/node_modules/.pnpm/vite-plugin-banner@0.7.1/node_modules/vite-plugin-banner/dist/index.mjs";
import dts from "file:///Users/alvarosabu/Projects/storyblok/storyblok-richtext/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.12.12_typescript@5.4.5_vite@5.2.11/node_modules/vite-plugin-dts/dist/index.mjs";

// package.json
var package_default = {
  name: "@storyblok/richtext",
  type: "module",
  version: "0.0.0",
  packageManager: "pnpm@8.10.2",
  description: "Storyblok RichText Resolver",
  author: "Alvaro Saburido <hola@alvarosaburido.dev> (https://github.com/alvarosabu/)",
  license: "MIT",
  keywords: [
    "storyblok",
    "richtext",
    "resolver"
  ],
  sideEffects: false,
  exports: {
    ".": {
      types: "./dist/index.d.ts",
      import: "./dist/storyblok-richtext.es.js",
      require: "./dist/storyblok-richtext.umd.js"
    }
  },
  main: "./dist/storyblok-richtext.es.js",
  module: "./dist/storyblok-richtext.js",
  types: "./dist/index.d.ts",
  files: [
    "*.d.ts",
    "dist"
  ],
  publishConfig: {
    access: "public"
  },
  scripts: {
    dev: "vite",
    build: "tsc && vite build",
    "build:packages": "pnpm -r --filter='./packages/*' run build",
    preview: "vite preview",
    lint: "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:packages": "pnpm -r --parallel --filter='./packages/*' run lint",
    "lint:packages:fix": "pnpm -r --parallel --filter='./packages/*' run lint:fix",
    test: "vitest",
    "test:ci": "vitest run",
    "test:ui": "vitest --ui",
    coverage: "vitest run --coverage",
    playground: "cd playground && npm run dev",
    "playground:vue": "cd playground/vue && npm run dev",
    "playground:react": "cd playground/react && npm run dev",
    "playground:all": "pnpm -r --parallel --filter='./playground/*' run dev",
    release: "release-it",
    "release:dry": "release-it --dry-run"
  },
  devDependencies: {
    "@commitlint/cli": "^19.3.0",
    "@commitlint/config-conventional": "^19.2.2",
    "@storyblok/vue": "^8.0.8",
    "@vitejs/plugin-basic-ssl": "^1.1.0",
    "@vitest/coverage-v8": "^1.6.0",
    "@vitest/ui": "^1.6.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-vue": "^9.26.0",
    kolorist: "^1.8.0",
    "lint-staged": "^15.2.4",
    pathe: "^1.1.2",
    prettier: "^3.2.5",
    "release-it": "^17.3.0",
    typescript: "^5.4.5",
    vite: "^5.2.11",
    "vite-plugin-banner": "^0.7.1",
    "vite-plugin-dts": "^3.9.1",
    "vite-plugin-inspect": "^0.8.4",
    "vite-plugin-qrcode": "^0.2.3",
    vitest: "^1.6.0",
    vue: "^3.4.27"
  },
  "lint-staged": {
    "*.{vue,js,css,ts}": [
      "prettier --write",
      "eslint"
    ],
    "*.md": [
      "prettier --write"
    ]
  },
  commitlint: {
    extends: [
      "@commitlint/config-conventional"
    ]
  },
  eslintConfig: {
    root: true,
    parser: "vue-eslint-parser",
    env: {
      node: true,
      "vue/setup-compiler-macros": true
    },
    extends: [
      "plugin:vue/vue3-essential",
      "eslint:recommended",
      "prettier"
    ],
    parserOptions: {
      parser: "@typescript-eslint/parser",
      sourceType: "module"
    },
    ignorePatterns: "dist/",
    rules: {
      "vue/multi-word-component-names": 0
    }
  },
  prettier: {
    trailingComma: "es5",
    tabWidth: 2,
    semi: true,
    singleQuote: false
  },
  dependencies: {
    consola: "^3.2.3"
  }
};

// vite.config.ts
console.log(`${lightGreen("Storyblok Richtext")} v${package_default.version}`);
var vite_config_default = defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true
    }),
    banner({
      content: `/**
 * name: ${package_default.name}
 * (c) ${(/* @__PURE__ */ new Date()).getFullYear()}
 * description: ${package_default.description}
 * author: ${package_default.author}
 */`
    })
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "StoryblokRichtext",
      fileName: (format) => `storyblok-richtext.${format}.js`
    }
  },
  test: {
    coverage: {
      exclude: ["playground/**", "packages/**", "src/index.ts"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2FsdmFyb3NhYnUvUHJvamVjdHMvc3RvcnlibG9rL3N0b3J5Ymxvay1yaWNodGV4dFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FsdmFyb3NhYnUvUHJvamVjdHMvc3RvcnlibG9rL3N0b3J5Ymxvay1yaWNodGV4dC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWx2YXJvc2FidS9Qcm9qZWN0cy9zdG9yeWJsb2svc3RvcnlibG9rLXJpY2h0ZXh0L3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgbGlnaHRHcmVlbiB9IGZyb20gJ2tvbG9yaXN0J1xuaW1wb3J0IGJhbm5lciBmcm9tICd2aXRlLXBsdWdpbi1iYW5uZXInXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcblxuaW1wb3J0IHBrZyBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbmNvbnNvbGUubG9nKGAke2xpZ2h0R3JlZW4oJ1N0b3J5YmxvayBSaWNodGV4dCcpfSB2JHtwa2cudmVyc2lvbn1gKVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgZHRzKHtcbiAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXG4gICAgfSksXG4gICAgYmFubmVyKHtcbiAgICAgIGNvbnRlbnQ6IGAvKipcXG4gKiBuYW1lOiAke3BrZy5uYW1lfVxcbiAqIChjKSAke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX1cXG4gKiBkZXNjcmlwdGlvbjogJHtwa2cuZGVzY3JpcHRpb259XFxuICogYXV0aG9yOiAke3BrZy5hdXRob3J9XFxuICovYCxcbiAgICB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiAnc3JjL2luZGV4LnRzJyxcbiAgICAgIG5hbWU6ICdTdG9yeWJsb2tSaWNodGV4dCcsXG4gICAgICBmaWxlTmFtZTogZm9ybWF0ID0+IGBzdG9yeWJsb2stcmljaHRleHQuJHtmb3JtYXR9LmpzYCxcbiAgICB9LFxuICB9LFxuICB0ZXN0OiB7XG4gICAgY292ZXJhZ2U6IHtcbiAgICAgIGV4Y2x1ZGU6IFsncGxheWdyb3VuZC8qKicsICdwYWNrYWdlcy8qKicsICdzcmMvaW5kZXgudHMnXVxuICAgIH1cbiAgfVxufSlcbiIsICJ7XG4gIFwibmFtZVwiOiBcIkBzdG9yeWJsb2svcmljaHRleHRcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4wXCIsXG4gIFwicGFja2FnZU1hbmFnZXJcIjogXCJwbnBtQDguMTAuMlwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiU3RvcnlibG9rIFJpY2hUZXh0IFJlc29sdmVyXCIsXG4gIFwiYXV0aG9yXCI6IFwiQWx2YXJvIFNhYnVyaWRvIDxob2xhQGFsdmFyb3NhYnVyaWRvLmRldj4gKGh0dHBzOi8vZ2l0aHViLmNvbS9hbHZhcm9zYWJ1LylcIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwic3RvcnlibG9rXCIsXG4gICAgXCJyaWNodGV4dFwiLFxuICAgIFwicmVzb2x2ZXJcIlxuICBdLFxuICBcInNpZGVFZmZlY3RzXCI6IGZhbHNlLFxuICBcImV4cG9ydHNcIjoge1xuICAgIFwiLlwiOiB7XG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L2luZGV4LmQudHNcIixcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L3N0b3J5Ymxvay1yaWNodGV4dC5lcy5qc1wiLFxuICAgICAgXCJyZXF1aXJlXCI6IFwiLi9kaXN0L3N0b3J5Ymxvay1yaWNodGV4dC51bWQuanNcIlxuICAgIH1cbiAgfSxcbiAgXCJtYWluXCI6IFwiLi9kaXN0L3N0b3J5Ymxvay1yaWNodGV4dC5lcy5qc1wiLFxuICBcIm1vZHVsZVwiOiBcIi4vZGlzdC9zdG9yeWJsb2stcmljaHRleHQuanNcIixcbiAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9pbmRleC5kLnRzXCIsXG4gIFwiZmlsZXNcIjogW1xuICAgIFwiKi5kLnRzXCIsXG4gICAgXCJkaXN0XCJcbiAgXSxcbiAgXCJwdWJsaXNoQ29uZmlnXCI6IHtcbiAgICBcImFjY2Vzc1wiOiBcInB1YmxpY1wiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJidWlsZFwiOiBcInRzYyAmJiB2aXRlIGJ1aWxkXCIsXG4gICAgXCJidWlsZDpwYWNrYWdlc1wiOiBcInBucG0gLXIgLS1maWx0ZXI9Jy4vcGFja2FnZXMvKicgcnVuIGJ1aWxkXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC5cIixcbiAgICBcImxpbnQ6Zml4XCI6IFwiZXNsaW50IC4gLS1maXhcIixcbiAgICBcImxpbnQ6cGFja2FnZXNcIjogXCJwbnBtIC1yIC0tcGFyYWxsZWwgLS1maWx0ZXI9Jy4vcGFja2FnZXMvKicgcnVuIGxpbnRcIixcbiAgICBcImxpbnQ6cGFja2FnZXM6Zml4XCI6IFwicG5wbSAtciAtLXBhcmFsbGVsIC0tZmlsdGVyPScuL3BhY2thZ2VzLyonIHJ1biBsaW50OmZpeFwiLFxuICAgIFwidGVzdFwiOiBcInZpdGVzdFwiLFxuICAgIFwidGVzdDpjaVwiOiBcInZpdGVzdCBydW5cIixcbiAgICBcInRlc3Q6dWlcIjogXCJ2aXRlc3QgLS11aVwiLFxuICAgIFwiY292ZXJhZ2VcIjogXCJ2aXRlc3QgcnVuIC0tY292ZXJhZ2VcIixcbiAgICBcInBsYXlncm91bmRcIjogXCJjZCBwbGF5Z3JvdW5kICYmIG5wbSBydW4gZGV2XCIsXG4gICAgXCJwbGF5Z3JvdW5kOnZ1ZVwiOiBcImNkIHBsYXlncm91bmQvdnVlICYmIG5wbSBydW4gZGV2XCIsXG4gICAgXCJwbGF5Z3JvdW5kOnJlYWN0XCI6IFwiY2QgcGxheWdyb3VuZC9yZWFjdCAmJiBucG0gcnVuIGRldlwiLFxuICAgIFwicGxheWdyb3VuZDphbGxcIjogXCJwbnBtIC1yIC0tcGFyYWxsZWwgLS1maWx0ZXI9Jy4vcGxheWdyb3VuZC8qJyBydW4gZGV2XCIsXG4gICAgXCJyZWxlYXNlXCI6IFwicmVsZWFzZS1pdFwiLFxuICAgIFwicmVsZWFzZTpkcnlcIjogXCJyZWxlYXNlLWl0IC0tZHJ5LXJ1blwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBjb21taXRsaW50L2NsaVwiOiBcIl4xOS4zLjBcIixcbiAgICBcIkBjb21taXRsaW50L2NvbmZpZy1jb252ZW50aW9uYWxcIjogXCJeMTkuMi4yXCIsXG4gICAgXCJAc3RvcnlibG9rL3Z1ZVwiOiBcIl44LjAuOFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tYmFzaWMtc3NsXCI6IFwiXjEuMS4wXCIsXG4gICAgXCJAdml0ZXN0L2NvdmVyYWdlLXY4XCI6IFwiXjEuNi4wXCIsXG4gICAgXCJAdml0ZXN0L3VpXCI6IFwiXjEuNi4wXCIsXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjkuMS4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXZ1ZVwiOiBcIl45LjI2LjBcIixcbiAgICBcImtvbG9yaXN0XCI6IFwiXjEuOC4wXCIsXG4gICAgXCJsaW50LXN0YWdlZFwiOiBcIl4xNS4yLjRcIixcbiAgICBcInBhdGhlXCI6IFwiXjEuMS4yXCIsXG4gICAgXCJwcmV0dGllclwiOiBcIl4zLjIuNVwiLFxuICAgIFwicmVsZWFzZS1pdFwiOiBcIl4xNy4zLjBcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS40LjVcIixcbiAgICBcInZpdGVcIjogXCJeNS4yLjExXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1iYW5uZXJcIjogXCJeMC43LjFcIixcbiAgICBcInZpdGUtcGx1Z2luLWR0c1wiOiBcIl4zLjkuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4taW5zcGVjdFwiOiBcIl4wLjguNFwiLFxuICAgIFwidml0ZS1wbHVnaW4tcXJjb2RlXCI6IFwiXjAuMi4zXCIsXG4gICAgXCJ2aXRlc3RcIjogXCJeMS42LjBcIixcbiAgICBcInZ1ZVwiOiBcIl4zLjQuMjdcIlxuICB9LFxuICBcImxpbnQtc3RhZ2VkXCI6IHtcbiAgICBcIioue3Z1ZSxqcyxjc3MsdHN9XCI6IFtcbiAgICAgIFwicHJldHRpZXIgLS13cml0ZVwiLFxuICAgICAgXCJlc2xpbnRcIlxuICAgIF0sXG4gICAgXCIqLm1kXCI6IFtcbiAgICAgIFwicHJldHRpZXIgLS13cml0ZVwiXG4gICAgXVxuICB9LFxuICBcImNvbW1pdGxpbnRcIjoge1xuICAgIFwiZXh0ZW5kc1wiOiBbXG4gICAgICBcIkBjb21taXRsaW50L2NvbmZpZy1jb252ZW50aW9uYWxcIlxuICAgIF1cbiAgfSxcbiAgXCJlc2xpbnRDb25maWdcIjoge1xuICAgIFwicm9vdFwiOiB0cnVlLFxuICAgIFwicGFyc2VyXCI6IFwidnVlLWVzbGludC1wYXJzZXJcIixcbiAgICBcImVudlwiOiB7XG4gICAgICBcIm5vZGVcIjogdHJ1ZSxcbiAgICAgIFwidnVlL3NldHVwLWNvbXBpbGVyLW1hY3Jvc1wiOiB0cnVlXG4gICAgfSxcbiAgICBcImV4dGVuZHNcIjogW1xuICAgICAgXCJwbHVnaW46dnVlL3Z1ZTMtZXNzZW50aWFsXCIsXG4gICAgICBcImVzbGludDpyZWNvbW1lbmRlZFwiLFxuICAgICAgXCJwcmV0dGllclwiXG4gICAgXSxcbiAgICBcInBhcnNlck9wdGlvbnNcIjoge1xuICAgICAgXCJwYXJzZXJcIjogXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCIsXG4gICAgICBcInNvdXJjZVR5cGVcIjogXCJtb2R1bGVcIlxuICAgIH0sXG4gICAgXCJpZ25vcmVQYXR0ZXJuc1wiOiBcImRpc3QvXCIsXG4gICAgXCJydWxlc1wiOiB7XG4gICAgICBcInZ1ZS9tdWx0aS13b3JkLWNvbXBvbmVudC1uYW1lc1wiOiAwXG4gICAgfVxuICB9LFxuICBcInByZXR0aWVyXCI6IHtcbiAgICBcInRyYWlsaW5nQ29tbWFcIjogXCJlczVcIixcbiAgICBcInRhYldpZHRoXCI6IDIsXG4gICAgXCJzZW1pXCI6IHRydWUsXG4gICAgXCJzaW5nbGVRdW90ZVwiOiBmYWxzZVxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJjb25zb2xhXCI6IFwiXjMuMi4zXCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFNBQVM7OztBQ0xoQjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsZ0JBQWtCO0FBQUEsRUFDbEIsYUFBZTtBQUFBLEVBQ2YsUUFBVTtBQUFBLEVBQ1YsU0FBVztBQUFBLEVBQ1gsVUFBWTtBQUFBLElBQ1Y7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGFBQWU7QUFBQSxFQUNmLFNBQVc7QUFBQSxJQUNULEtBQUs7QUFBQSxNQUNILE9BQVM7QUFBQSxNQUNULFFBQVU7QUFBQSxNQUNWLFNBQVc7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBUTtBQUFBLEVBQ1IsUUFBVTtBQUFBLEVBQ1YsT0FBUztBQUFBLEVBQ1QsT0FBUztBQUFBLElBQ1A7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0EsZUFBaUI7QUFBQSxJQUNmLFFBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQSxTQUFXO0FBQUEsSUFDVCxLQUFPO0FBQUEsSUFDUCxPQUFTO0FBQUEsSUFDVCxrQkFBa0I7QUFBQSxJQUNsQixTQUFXO0FBQUEsSUFDWCxNQUFRO0FBQUEsSUFDUixZQUFZO0FBQUEsSUFDWixpQkFBaUI7QUFBQSxJQUNqQixxQkFBcUI7QUFBQSxJQUNyQixNQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsSUFDWCxVQUFZO0FBQUEsSUFDWixZQUFjO0FBQUEsSUFDZCxrQkFBa0I7QUFBQSxJQUNsQixvQkFBb0I7QUFBQSxJQUNwQixrQkFBa0I7QUFBQSxJQUNsQixTQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsRUFDakI7QUFBQSxFQUNBLGlCQUFtQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLG1DQUFtQztBQUFBLElBQ25DLGtCQUFrQjtBQUFBLElBQ2xCLDRCQUE0QjtBQUFBLElBQzVCLHVCQUF1QjtBQUFBLElBQ3ZCLGNBQWM7QUFBQSxJQUNkLDBCQUEwQjtBQUFBLElBQzFCLHFCQUFxQjtBQUFBLElBQ3JCLFVBQVk7QUFBQSxJQUNaLGVBQWU7QUFBQSxJQUNmLE9BQVM7QUFBQSxJQUNULFVBQVk7QUFBQSxJQUNaLGNBQWM7QUFBQSxJQUNkLFlBQWM7QUFBQSxJQUNkLE1BQVE7QUFBQSxJQUNSLHNCQUFzQjtBQUFBLElBQ3RCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHNCQUFzQjtBQUFBLElBQ3RCLFFBQVU7QUFBQSxJQUNWLEtBQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxlQUFlO0FBQUEsSUFDYixxQkFBcUI7QUFBQSxNQUNuQjtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxZQUFjO0FBQUEsSUFDWixTQUFXO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFnQjtBQUFBLElBQ2QsTUFBUTtBQUFBLElBQ1IsUUFBVTtBQUFBLElBQ1YsS0FBTztBQUFBLE1BQ0wsTUFBUTtBQUFBLE1BQ1IsNkJBQTZCO0FBQUEsSUFDL0I7QUFBQSxJQUNBLFNBQVc7QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxlQUFpQjtBQUFBLE1BQ2YsUUFBVTtBQUFBLE1BQ1YsWUFBYztBQUFBLElBQ2hCO0FBQUEsSUFDQSxnQkFBa0I7QUFBQSxJQUNsQixPQUFTO0FBQUEsTUFDUCxrQ0FBa0M7QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFVBQVk7QUFBQSxJQUNWLGVBQWlCO0FBQUEsSUFDakIsVUFBWTtBQUFBLElBQ1osTUFBUTtBQUFBLElBQ1IsYUFBZTtBQUFBLEVBQ2pCO0FBQUEsRUFDQSxjQUFnQjtBQUFBLElBQ2QsU0FBVztBQUFBLEVBQ2I7QUFDRjs7O0FENUdBLFFBQVEsSUFBSSxHQUFHLFdBQVcsb0JBQW9CLENBQUMsS0FBSyxnQkFBSSxPQUFPLEVBQUU7QUFFakUsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0Ysa0JBQWtCO0FBQUEsSUFDcEIsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLE1BQ0wsU0FBUztBQUFBLFdBQWlCLGdCQUFJLElBQUk7QUFBQSxVQUFZLG9CQUFJLEtBQUssR0FBRSxZQUFZLENBQUM7QUFBQSxrQkFBcUIsZ0JBQUksV0FBVztBQUFBLGFBQWdCLGdCQUFJLE1BQU07QUFBQTtBQUFBLElBQ3RJLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixVQUFVLFlBQVUsc0JBQXNCLE1BQU07QUFBQSxJQUNsRDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFVBQVU7QUFBQSxNQUNSLFNBQVMsQ0FBQyxpQkFBaUIsZUFBZSxjQUFjO0FBQUEsSUFDMUQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
