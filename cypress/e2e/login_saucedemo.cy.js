const selectors = require('../support/selectors');

describe('Testes de login e validação de produtos', () => {
  beforeEach(() => {
    // Executa o login antes de cada teste
    cy.visit('https://www.saucedemo.com/');

    // Preenche o formulário de login com o usuário e a senha
    cy.xpath(selectors.usernameInput).type('standard_user'); // Username
    cy.get(selectors.passwordInput).type('secret_sauce'); // Senha
    cy.get(selectors.loginButton).click(); // Clica no botão de login

    // Verifica se o login foi bem-sucedido e a página de produtos foi carregada
    cy.contains(selectors.productText).should('be.visible'); // Verifica a presença do texto "Products"
  });

  it('Deve verificar se o produto "Sauce Labs Backpack" está presente na tela', () => {
    cy.contains(selectors.backpackProduct).should('be.visible');
  });

  it('Deve adicionar o produto "Sauce Labs Backpack" ao carrinho', () => {
    cy.xpath(selectors.addToCartButton).click();
    cy.xpath("//button[contains(@data-test,'remove-sauce-labs-backpack')]").should('be.visible');
  });

  it('Deve verificar que há um item no carrinho após adicionar o produto', () => {
    cy.xpath(selectors.addToCartButton).click();
    cy.xpath(`${selectors.cartBadge}[contains(.,'1')]`).should('be.visible');
  });

  it('Deve acessar o carrinho de compras pelo ícone', () => {
    cy.xpath(selectors.addToCartButton).click();
    cy.xpath(selectors.cartLink).click();
    cy.contains('Your Cart').should('be.visible');
  });

  it('Deve verificar se o carrinho contém o item "Sauce Labs Backpack" e se o preço está correto', () => {
    cy.xpath(selectors.addToCartButton).click();
    cy.xpath(selectors.cartLink).click();
    cy.contains('Your Cart').should('be.visible');
    cy.contains(selectors.backpackProduct).should('be.visible');
    cy.xpath(selectors.inventoryItemPrice)
      .should('be.visible')
      .invoke('text')
      .then((priceText) => {
        const price = parseFloat(priceText.replace('$', ''));
        expect(price).to.be.within(20.99, 49.99);
      });
  });

  it('Deve remover o item do carrinho', () => {
    cy.xpath(selectors.addToCartButton).click();
    cy.xpath(selectors.cartLink).click();
    cy.contains('Your Cart').should('be.visible');
    cy.xpath(selectors.removeButtonInCart).click();
    cy.xpath(selectors.cartBadge).should('not.exist');
    cy.contains(selectors.backpackProduct).should('not.exist');
  });
});
