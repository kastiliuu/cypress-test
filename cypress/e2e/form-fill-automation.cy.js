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
