import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: ['.nuxt/**', '.output/**', '.data/**', '.local-tools/**', 'node_modules/**', 'test-results/**', 'playwright-report/**', 'coverage/**'],
})
