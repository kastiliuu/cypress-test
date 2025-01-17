const selectors = require('../support/selectors');

describe('Testes de navegação e cancelamento', () => {
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

  it('Deve voltar para a tela de produtos ao clicar no botão "Back to products"', () => {
    // Clica no produto "Sauce Labs Backpack" utilizando o nome do produto
    cy.xpath("//div[@class='inventory_item_name '][contains(.,'Sauce Labs Backpack')]")
      .click();

    // Verifica se está na página de detalhes do produto
    cy.contains('Sauce Labs Backpack').should('be.visible'); 

    // Verifica e clica no botão "Back to products"
    cy.xpath("//button[@class='btn btn_secondary back btn_large inventory_details_back_button'][contains(.,'Back to products')]")
      .should('be.visible') // Verifica se o botão está visível
      .wait(1000)  // Aguarda 1 segundo para o botão se tornar clicável
      .click();

    // Verifica se voltou para a tela de produtos
    cy.contains('Products').should('be.visible');
  });

  it('Deve voltar para a tela de produtos ao clicar no botão de voltar do carrinho', () => {
    // Acessa o carrinho
    cy.xpath(selectors.cartLink).click();

    // Verifica se está na página do carrinho
    cy.contains('Your Cart').should('be.visible');

    // Clica no botão de voltar "Continue Shopping"
    cy.xpath("//button[@class='btn btn_secondary back btn_medium'][contains(.,'Continue Shopping')]")
      .should('be.visible') // Verifica se o botão está visível
      .click();

    // Verifica se a página de produtos foi carregada novamente
    cy.contains('Products').should('be.visible');
  });

  it('Deve cancelar o checkout e voltar para a tela de produtos', () => {
    // Acessa o carrinho
    cy.xpath(selectors.cartLink).click();

    // Clica no botão de checkout
    cy.xpath(selectors.checkoutButton).click();

    // Preenche o formulário de checkout
    cy.get('#first-name').type('Test');
    cy.get('#last-name').type('User');
    cy.get('#postal-code').type('12345');

    // Clica no botão de cancelamento
    cy.xpath(selectors.cancelCheckoutButton)
      .should('be.visible') // Verifica se o botão de cancelamento está visível
      .click();

    // Verifica se voltou para a página do carrinho
    cy.contains('Your Cart').should('be.visible');
  });
});
