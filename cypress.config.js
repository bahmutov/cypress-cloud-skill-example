const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // Cypress cloud project id
  projectId: 'pcgkb1',
  e2e: {
    // baseUrl, etc
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
    },
  },
})
