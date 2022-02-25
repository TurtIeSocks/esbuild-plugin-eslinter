# esbuild-plugin-eslinter

[![npm version](https://badge.fury.io/js/esbuild-plugin-eslinter.svg)](https://badge.fury.io/js/esbuild-plugin-eslinter)

## Description

[esbuild](https://github.com/evanw/esbuild) plugin for integrating your ESLint rules into your build process. Automatically marks node_modules as external to avoid linting them and caches results each build to drastically decrease watch build time.

## Installing

```markdown
// with npm
npm i -D esbuild-plugin-eslinter

// with yarn
yarn add -D esbuild-plugin-eslinter
```

## PreReqs

1. Install peer dependencies (`yarn add -D eslint esbuild`)
2. Create your `.eslintrc` file (`yarn eslint --init`)

## Example

```ts
import { build } from "esbuild"
import { eslintPlugin } from "esbuild-plugin-eslinter"

build({
  entryPoints: ["src/components/index.tsx"],
  bundle: true
  outfile: "dist/bundle.js",
  target: "es2020",
  plugins: [eslintPlugin()],
}).then(() => {
  console.log("Build Complete")
})
```

## Development Notes

- Build with project with `yarn build`
- "Test" the project with `yarn test` (runs a test esbuild in the console)
