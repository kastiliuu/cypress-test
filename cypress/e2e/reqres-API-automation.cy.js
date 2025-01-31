describe('Testes de API - Reqres.in (Usuários)', () => {
    const baseUrl = 'https://reqres.in/api';

    it('Deve listar usuários (GET)', () => {
        cy.request('GET', `${baseUrl}/users?page=2`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');
        });
    });

    it('Deve criar um usuário (POST)', () => {
        cy.request('POST', `${baseUrl}/users`, {
            name: 'Gabriel',
            job: 'QA Engineer'
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('name', 'Gabriel');
            expect(response.body).to.have.property('job', 'QA Engineer');
            expect(response.body).to.have.property('id'); // ID gerado dinamicamente
        });
    });

    it('Deve atualizar um usuário (PUT)', () => {
        cy.request('PUT', `${baseUrl}/users/2`, {
            name: 'Gabriel',
            job: 'Senior QA'
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', 'Gabriel');
            expect(response.body).to.have.property('job', 'Senior QA');
        });
    });

    it('Deve deletar um usuário (DELETE)', () => {
        cy.request('DELETE', `${baseUrl}/users/2`).then((response) => {
            expect(response.status).to.eq(204); // DELETE geralmente retorna status 204 (No Content)
        });
    });

    it('Deve falhar ao tentar login com credenciais inválidas (POST)', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/login`,
            body: {
                email: "email@errado.com"
            },
            failOnStatusCode: false // Para evitar erro no Cypress ao receber um status diferente de 2xx
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('error', 'Missing password');
        });
    });
});

describe('Testes Extras de API - Reqres.in', () => {
    const baseUrl = 'https://reqres.in/api';

    it('Deve retornar um único usuário (GET)', () => {
        cy.request('GET', `${baseUrl}/users/2`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.have.property('id', 2);
            expect(response.body.data).to.have.property('email');
        });
    });

    it('Deve retornar erro ao buscar um usuário inexistente (GET)', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/users/23`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('Deve retornar uma lista de recursos (GET)', () => {
        cy.request('GET', `${baseUrl}/unknown`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.be.an('array');
        });
    });

    it('Deve retornar um único recurso (GET)', () => {
        cy.request('GET', `${baseUrl}/unknown/2`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.have.property('id', 2);
        });
    });

    it('Deve retornar erro ao buscar um recurso inexistente (GET)', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/unknown/23`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('Deve fazer login com sucesso (POST)', () => {
        cy.request('POST', `${baseUrl}/login`, {
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
        });
    });

    it('Deve falhar ao tentar registrar um usuário sem senha (POST)', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/register`,
            body: {
                email: "sydney@fife.com"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('error', 'Missing password');
        });
    });

    it('Deve registrar um usuário com sucesso (POST)', () => {
        cy.request('POST', `${baseUrl}/register`, {
            email: "eve.holt@reqres.in",
            password: "pistol"
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
        });
    });

    it('Deve testar um endpoint com delay (GET)', () => {
        cy.request('GET', `${baseUrl}/users?delay=3`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.be.an('array');
        });
    });
});
