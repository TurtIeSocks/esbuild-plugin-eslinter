/* eslint-disable no-console */
import path from 'path'
import { build } from 'esbuild'
import { eslintPlugin } from '../dist/index'

build({
  entryPoints: [path.resolve(__dirname, '../src/index.ts')],
  platform: 'node',
  target: 'es2020',
  plugins: [eslintPlugin({ persistLintIssues: true })],
  logLevel: 'info',
})
  .catch((e) => console.log('Test Failed', e))
  .then(() => console.log('Test Passed'))
