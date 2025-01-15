const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',  // URL base do site
    chromeWebSecurity: false,              // Desativa a verificação de segurança
    setupNodeEvents(on, config) {
      // Aqui você pode adicionar seus event listeners caso precise
    },
  },
});
