const selectors = require('../support/selectors'); // Certifique-se de ajustar o caminho

describe('Testes de checkout e validação de produtos', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');

    // Realiza o login
    cy.xpath(selectors.usernameInput).type('standard_user'); // Username
    cy.get(selectors.passwordInput).type('secret_sauce'); // Senha
    cy.get(selectors.loginButton).click(); // Clica no botão de login

    // Verifica se o login foi bem-sucedido
    cy.contains(selectors.productText).should('be.visible'); // Verifica a presença do texto "Products"
  });

  it('Deve adicionar vários itens ao carrinho', () => {
    cy.xpath(selectors.addToCartButton('sauce-labs-backpack')).click();
    cy.xpath(selectors.addToCartButton('sauce-labs-bike-light')).click();
    cy.xpath(selectors.addToCartButton('sauce-labs-bolt-t-shirt')).click();

    // Verifica se o carrinho tem 3 itens
    cy.xpath(`${selectors.cartBadge}[contains(.,'3')]`).should('be.visible');
  });

  it('Deve acessar o carrinho e verificar os itens adicionados', () => {
    cy.xpath(selectors.addToCartButton('sauce-labs-backpack')).click();
    cy.xpath(selectors.addToCartButton('sauce-labs-bike-light')).click();

    cy.xpath(selectors.cartLink).click();

    cy.contains('Your Cart').should('be.visible');
    cy.contains(selectors.backpackProduct).should('be.visible');
    cy.contains('Sauce Labs Bike Light').should('be.visible');
  });

  it('Deve realizar o checkout com sucesso', () => {
    cy.xpath(selectors.addToCartButton('sauce-labs-backpack')).click();

    cy.xpath(selectors.cartLink).click();

    cy.xpath(selectors.checkoutButton).click();

    cy.get('#first-name').type('Test');
    cy.get('#last-name').type('User');
    cy.get('#postal-code').type('12345');

    cy.xpath(selectors.continueCheckoutButton).click();

    cy.contains('Checkout: Overview').should('be.visible');
    cy.contains(selectors.backpackProduct).should('be.visible');

    cy.xpath(selectors.finishCheckoutButton).click();

    cy.contains('Thank you for your order!').should('be.visible');
  });
});
