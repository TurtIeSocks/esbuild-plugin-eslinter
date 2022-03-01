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
    build.onLoad({ filter: /\.(jsx?|tsx?)$/ }, async ({ path }) => {
      const isNodeModule = /node_modules/.test(path)

      const input = isNodeModule ? 0 : await fs.readFile(path, 'utf8')
      let value = cache.get(path)

      if (!value || value.input !== input) {
        const contents = isNodeModule ? [] : await linter.lintFiles(path)
        value = { input, output: { contents } }
        cache.set(path, value)

        if (contents[0]?.messages?.length) {
          return { warnings: [{ text: formatter.format(contents) as string }] }
        }
      }
      return null
    })
  },
})
