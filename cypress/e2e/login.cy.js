describe('Login com sucesso', () => {
  it('Deve realizar login com o usuário standard_user', () => {
    // Visita a página de login
    cy.visit('https://www.saucedemo.com/');
    
    // Preenche o formulário de login com o usuário e a senha
    cy.xpath("//input[contains(@placeholder,'Username')]").type('standard_user');  // Username
    cy.get('#password').type('secret_sauce');    // Senha
    cy.get('#login-button').click();             // Clica no botão de login
  });
});
