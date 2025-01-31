describe('Testes de API - SWAPI (Star Wars API)', () => {
    const baseUrl = 'https://swapi.dev/api';

    it('Deve listar pessoas (GET /people)', () => {
        cy.request('GET', `${baseUrl}/people/`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('count');
            expect(response.body.results).to.be.an('array');
        });
    });

    it('Deve retornar detalhes de um personagem específico (GET /people/1)', () => {
        cy.request('GET', `${baseUrl}/people/1/`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', 'Luke Skywalker');
            expect(response.body).to.have.property('height');
            expect(response.body).to.have.property('mass');
        });
    });

    it('Deve retornar erro ao buscar um personagem inexistente (GET /people/999)', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/people/999/`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('Deve listar planetas (GET /planets)', () => {
        cy.request('GET', `${baseUrl}/planets/`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.results).to.be.an('array');
        });
    });

    it('Deve retornar detalhes de um planeta específico (GET /planets/1)', () => {
        cy.request('GET', `${baseUrl}/planets/1/`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', 'Tatooine');
        });
    });

    it('Deve listar naves espaciais (GET /starships)', () => {
        cy.request('GET', `${baseUrl}/starships/`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.results).to.be.an('array');
        });
    });

    it('Deve retornar detalhes de uma nave específica (GET /starships/9)', () => {
        cy.request('GET', `${baseUrl}/starships/9/`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', 'Death Star');
        });
    });

    it('Deve listar filmes (GET /films)', () => {
        cy.request('GET', `${baseUrl}/films/`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.results).to.be.an('array');
        });
    });

    it('Deve retornar detalhes de um filme específico (GET /films/1)', () => {
        cy.request('GET', `${baseUrl}/films/1/`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('title', 'A New Hope');
        });
    });

    it('Deve listar espécies (GET /species)', () => {
        cy.request('GET', `${baseUrl}/species/`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.results).to.be.an('array');
        });
    });

    it('Deve retornar detalhes de uma espécie específica (GET /species/1)', () => {
        cy.request('GET', `${baseUrl}/species/1/`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', 'Human');
        });
    });

    it('Deve listar veículos (GET /vehicles)', () => {
        cy.request('GET', `${baseUrl}/vehicles/`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.results).to.be.an('array');
        });
    });

    it('Deve retornar detalhes de um veículo específico (GET /vehicles/4)', () => {
        cy.request('GET', `${baseUrl}/vehicles/4/`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', 'Sand Crawler');
        });
    });
});
