// Script Cypress para automação no site ToolsQA
import { faker } from '@faker-js/faker';
require('cypress-xpath');
require('cypress-file-upload'); // Para o upload de arquivos

describe('Automação do Formulário ToolsQA Practice Form', () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const phoneNumber = faker.phone.number('##########').replace(/\D/g, '').slice(0, 10);
  const address = faker.address.streetAddress();

  before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => false);
    cy.visit('https://demoqa.com/automation-practice-form', { failOnStatusCode: false });
  });

  it('Preenche o formulário de prática', () => {
    cy.xpath("//input[contains(@placeholder,'First Name')]").type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('input[name="gender"][value="Male"]').check({ force: true });
    cy.get('#userNumber').type(phoneNumber);
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select('January');
    cy.get('.react-datepicker__year-select').select('1990');
    cy.get('.react-datepicker__day--015').click();
    cy.get('.subjects-auto-complete__value-container').type('Maths{enter}');
    cy.get('input[type="checkbox"][id="hobbies-checkbox-1"]').check({ force: true });
    const filePath = 'sample.jpg';
    cy.get('#uploadPicture').attachFile(filePath);
    cy.get('#currentAddress').type(address);
    cy.get('#state').click();
    cy.get('.css-26l3qy-menu').contains('NCR').click();
    cy.get('#city').click();
    cy.get('.css-26l3qy-menu').contains('Delhi').click();
    cy.get('#submit').click();
    cy.get('.modal-content').should('be.visible');
    cy.get('.table-responsive').within(() => {
      cy.contains('td', `${firstName} ${lastName}`).should('be.visible');
      cy.contains('td', email).should('be.visible');
    });
    cy.get('#closeLargeModal').scrollIntoView().click({ force: true });
  });
});

describe('Automação do Formulário ToolsQA Text Box', () => {
  const fullName = faker.name.fullName();
  const email = faker.internet.email();
  const currentAddress = faker.address.streetAddress();
  const permanentAddress = faker.address.secondaryAddress();

  before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => false);
    cy.visit('https://demoqa.com/text-box', { failOnStatusCode: false });
  });

  it('Preenche o formulário Text Box', () => {
    cy.get('#userName').type(fullName);
    cy.get('#userEmail').type(email);
    cy.get('#currentAddress').type(currentAddress);
    cy.get('#permanentAddress').type(permanentAddress);
    cy.get('#submit').click();
    cy.get('#output').should('be.visible');
    cy.get('#name').should('contain', fullName);
    cy.get('#email').should('contain', email);
    cy.get('.border > #currentAddress').should('contain', currentAddress);
    cy.get('.border > #permanentAddress').should('contain', permanentAddress);
  });
});

describe('Testando a página de Checkboxes', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => false);
    cy.visit('https://demoqa.com/checkbox', { failOnStatusCode: false });
  });

  it('Verifica se a árvore de checkboxes está visível', () => {
    cy.get('.rct-collapse-btn').should('be.visible');
    cy.get('.rct-checkbox').should('be.visible');
  });

  it('Seleciona e desmarca o checkbox "Home"', () => {
    cy.get('.rct-node').contains('Home').parent().find('.rct-collapse-btn').click();
    cy.get('#tree-node-home').check({ force: true }).should('be.checked');
    cy.get('#tree-node-home').uncheck({ force: true }).should('not.be.checked');
  });

  it('Seleciona todos os checkboxes no nível "Desktop"', () => {
    cy.get('.rct-node').contains('Home').parent().find('.rct-collapse-btn').click();
    cy.get('.rct-node').contains('Desktop').parent().find('.rct-collapse-btn').click();
    cy.get('.rct-node').contains('Desktop').parent().find('input[type="checkbox"]').check({ force: true }).should('be.checked');
  });

  it('Verifica o comportamento do checkbox "Notes"', () => {
    cy.get('.rct-node').contains('Home').parent().find('.rct-collapse-btn').click();
    cy.get('.rct-node').contains('Desktop').parent().find('.rct-collapse-btn').click();
    cy.get('.rct-node').contains('Notes').scrollIntoView().should('be.visible');
    cy.get('.rct-node').contains('Notes').parent().find('input[type="checkbox"]').check({ force: true }).should('be.checked');
    cy.get('.rct-node').contains('Notes').parent().find('input[type="checkbox"]').uncheck({ force: true }).should('not.be.checked');
  });

  it('Verifica se a seleção de "Home" propaga para os filhos', () => {
    // Expande o nó "Home"
    cy.get('.rct-node').contains('Home').parent().find('.rct-collapse-btn').click();
  
    // Marca o checkbox "Home"
    cy.get('.rct-node').contains('Home').parent().find('input[type="checkbox"]').check({ force: true });
  
    // Expande o nó "Desktop" dentro de "Home"
    cy.get('.rct-node').contains('Desktop').parent().find('.rct-collapse-btn').click();
  
    // Verifica se os filhos do nó "Home" estão marcados
    cy.get('.rct-node').contains('Desktop').parent().find('input[type="checkbox"]').should('be.checked');
    cy.get('.rct-node').contains('Notes').parent().find('input[type="checkbox"]').should('be.checked');
  });
});

describe('Automação da tela Radio Button - ToolsQA', () => {
    beforeEach(() => {
      // Ignorar erros de exceção não capturados
      Cypress.on('uncaught:exception', (err, runnable) => false);
  
      // Visitar a página de Radio Button
      cy.visit('https://demoqa.com/radio-button', { failOnStatusCode: false });
    });
  
    it('Verifica a visibilidade dos botões de rádio', () => {
      // Verifica se os rótulos associados estão visíveis
      cy.get('label[for="yesRadio"]').should('be.visible');
      cy.get('label[for="impressiveRadio"]').should('be.visible');
      cy.get('label[for="noRadio"]').should('be.visible');
      
      // Verifica se o botão "No" está desabilitado
      cy.get('input#noRadio').should('be.disabled');
    });
  
    it('Seleciona o botão de rádio "Yes"', () => {
      // Clica no rótulo associado ao botão "Yes"
      cy.get('label[for="yesRadio"]').click();
      // Verifica a mensagem de confirmação
      cy.get('.mt-3').should('contain', 'Yes');
    });
  
    it('Seleciona o botão de rádio "Impressive"', () => {
      // Clica no rótulo associado ao botão "Impressive"
      cy.get('label[for="impressiveRadio"]').click();
      // Verifica a mensagem de confirmação
      cy.get('.mt-3').should('contain', 'Impressive');
    });
  
    it('Verifica que o botão de rádio "No" está desabilitado', () => {
      // Verifica que o botão "No" está presente, mas desabilitado
      cy.get('input#noRadio').should('be.disabled');
      cy.get('label[for="noRadio"]').should('be.visible');
    });
  });
/// <reference types="cypress" />

describe("Web Tables - DemoQA", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false; // Ignora erros da aplicação para não falhar o teste
  });

  const url = "https://demoqa.com/webtables";

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it("Deve verificar se a tabela está visível", () => {
    cy.get(".rt-table").should("be.visible");
  });

  it("Deve adicionar um novo usuário e verificar na tabela", () => {
    cy.get("#addNewRecordButton").click(); // Clica para adicionar um novo usuário
    
    cy.get("#firstName").type("Gabriel");
    cy.get("#lastName").type("Sebastião");
    cy.get("#userEmail").type("gabriel@example.com");
    cy.get("#age").type("30");
    cy.get("#salary").type("5000");
    cy.get("#department").type("QA");
    
    cy.get("#submit").click(); // Confirma a adição
  
    cy.wait(2000); // Aguarda atualização da tabela
  
    // Busca o nome na tabela usando XPath
    cy.xpath("//div[@class='rt-td'][contains(.,'Gabriel')]")
      .scrollIntoView()
      .should("be.visible");
  });

  it("Deve excluir um usuário da tabela", () => {
    cy.get('[title="Delete"]').first().click();
    
    cy.get(".rt-tbody").should("not.contain", "Gabriel");
  });

  it("Deve buscar um usuário na tabela", () => {
    cy.get("#searchBox").type("Cierra");
    cy.get(".rt-tbody").should("contain", "Cierra");
  });
});
describe('Testes na tela de Links - DemoQA', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/links'); // Acessa a página de Links antes de cada teste
  });

  it('Deve verificar se os links principais estão visíveis', () => {
    cy.get('#simpleLink').should('be.visible'); // Verifica o link externo
    cy.get('#dynamicLink').should('be.visible'); // Verifica o link dinâmico
  });

  it('Deve verificar se os links internos retornam status 200', () => {
    cy.request('https://demoqa.com').its('status').should('eq', 200);
  });

  it('Deve clicar em um link interno e validar a resposta da API', () => {
    cy.intercept('GET', '**/created').as('createdRequest');
    cy.get('#created').click();
    cy.wait('@createdRequest').its('response.statusCode').should('eq', 201);
  });

  it('Deve validar o funcionamento do link externo', () => {
    cy.get('#simpleLink').should('have.attr', 'href', 'https://demoqa.com');
  });
});
