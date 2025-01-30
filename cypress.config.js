const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com", // URL base do site
    chromeWebSecurity: false, // Desativa a verificação de segurança
    video: false, // Desativa gravação de vídeo para reduzir consumo de recursos
    screenshotOnRunFailure: true, // Mantém captura de tela em caso de falha
    retries: 2, // Tenta executar novamente um teste que falhe
    defaultCommandTimeout: 10000, // Tempo limite padrão para comandos

    setupNodeEvents(on, config) {
      // Adicione event listeners aqui se necessário
      return config;
    },
  },
});