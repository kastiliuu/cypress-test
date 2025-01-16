const selectors = require('../support/selectors');

describe('Testes de checkout e validação de produtos', () => {
  beforeEach(() => {
    // Executa o login antes de cada teste
    cy.visit('https://www.saucedemo.com/');

    // Realiza o login
    cy.xpath(selectors.usernameInput).type('standard_user'); // Username
    cy.get(selectors.passwordInput).type('secret_sauce'); // Senha
    cy.get(selectors.loginButton).click(); // Clica no botão de login

    // Verifica se o login foi bem-sucedido e a página de produtos foi carregada
    cy.contains(selectors.productText).should('be.visible'); // Verifica a presença do texto "Products"
  });

  it('Deve adicionar vários itens ao carrinho', () => {
    // Adiciona produtos ao carrinho
    cy.xpath("//button[contains(@data-test,'add-to-cart-sauce-labs-backpack')]").click();
    cy.xpath("//button[contains(@data-test,'add-to-cart-sauce-labs-bike-light')]").click();
    cy.xpath("//button[contains(@data-test,'add-to-cart-sauce-labs-bolt-t-shirt')]").click();

    // Verifica se o carrinho tem 3 itens
    cy.xpath(`${selectors.cartBadge}[contains(.,'3')]`).should('be.visible');
  });

  it('Deve acessar o carrinho e verificar os itens adicionados', () => {
    // Adiciona produtos ao carrinho
    cy.xpath("//button[contains(@data-test,'add-to-cart-sauce-labs-backpack')]").click();
    cy.xpath("//button[contains(@data-test,'add-to-cart-sauce-labs-bike-light')]").click();

    // Acessa o carrinho
    cy.xpath(selectors.cartLink).click();

    // Verifica os itens no carrinho
    cy.contains('Your Cart').should('be.visible');
    cy.contains('Sauce Labs Backpack').should('be.visible');
    cy.contains('Sauce Labs Bike Light').should('be.visible');
  });

  it('Deve realizar o checkout com sucesso', () => {
    // Adiciona um item ao carrinho
    cy.xpath("//button[contains(@data-test,'add-to-cart-sauce-labs-backpack')]").click();

    // Acessa o carrinho
    cy.xpath(selectors.cartLink).click();

    // Clica no botão de checkout
    cy.xpath("//button[contains(@data-test,'checkout')]").click();

    // Preenche o formulário de checkout
    cy.get('#first-name').type('Test');
    cy.get('#last-name').type('User');
    cy.get('#postal-code').type('12345');

    // Continua o checkout
    cy.xpath("//input[contains(@data-test,'continue')]").click();

    // Verifica se o resumo do pedido está visível
    cy.contains('Checkout: Overview').should('be.visible');
    cy.contains('Sauce Labs Backpack').should('be.visible');

    // Finaliza o pedido
    cy.xpath("//button[contains(@data-test,'finish')]").click();

    // Verifica a mensagem de sucesso
    cy.contains('Thank you for your order!').should('be.visible');
  });
});
