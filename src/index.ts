import { promises as fs } from 'fs'
import { Plugin, PluginBuild } from 'esbuild'
import { ESLint } from 'eslint'

export const eslintPlugin = (): Plugin => ({
  name: 'ESLint',
  async setup(build: PluginBuild) {
    const linter = new ESLint()
    const formatter = await linter.loadFormatter()
    // https://esbuild.github.io/plugins/#caching-your-plugin
    const cache = new Map()
    // https://github.com/evanw/esbuild/issues/619
    build.onResolve({ filter: /^[^./]|^\.[^./]|^\.\.[^/]/ }, (args) => ({
      path: args.path,
      external: true,
    }))
    build.onLoad({ filter: /\.(jsx?|tsx?)$/ }, async (args) => {
      const input = await fs.readFile(args.path, 'utf8')
      const key = args.path
      let value = cache.get(key)

      if (!value || value.input !== input) {
        const contents = await linter.lintFiles(args.path)
        value = { input, output: { contents } }
        cache.set(key, value)

        if (contents[0]?.messages?.length) {
          return { warnings: [{ text: formatter.format(contents) as string }] }
        }
      }
      return null
    })
  },
})
