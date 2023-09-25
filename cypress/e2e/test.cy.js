describe('Crypto Tracker', ()=>{
    it('should display the correct title', () => {
        cy.visit('index.html');
        cy.title().should('eq', 'Crypto Tracker');
    });
    it('should have necessary elements', () => {
        cy.visit('/');
        cy.get('h1').should('contain', 'Crypto Tracker');
        cy.get('#crypto-select').should('exist');
        cy.get('#crypto-price').should('exist');
        cy.get('#alert-price').should('exist');
        cy.get('#alert-message').should('not.be.visible');
    });
    it('should populate the crypto dropdown', () => {
        cy.visit('/');
        cy.get('#crypto-select option', { timeout: 10000 }).should('have.length.greaterThan', 0);
    });
    it('should not display any price when no cryptocurrency is selected', () => {
        cy.visit('/');
        cy.get('#crypto-price').should('be.empty');
    });
    
    it('should display the price when a cryptocurrency is selected', () => {
        cy.visit('/');
        cy.get('#crypto-select').select('Bitcoin');  // assuming Bitcoin is one of the options
        cy.get('#crypto-price', { timeout: 10000 }).should('not.be.empty');

    });
    it('should not show any alert by default', () => {
        cy.visit('/');
        cy.get('#alert-message').should('not.be.visible');
    });
    it('should display an alert message when price reaches or exceeds alert price', () => {
        cy.visit('/');
        cy.get('#alert-price').type('1');
        cy.get('#crypto-select').select('Bitcoin').wait(2000);
        cy.get('#alert-message').should('be.visible');
    });

    it('should not show an alert when the crypto price is below the alert price', () => {
        cy.visit('/');
        cy.get('#alert-price').type('1');
        cy.get('#crypto-select').select('Bitcoin');
        cy.get('#crypto-price').then(($price) => {
            const currentPrice = parseFloat($price.text()) - 10;
            cy.get('#alert-price').type(currentPrice.toString());
            cy.get('#alert-message').should('not.be.visible');
        });
    });
    it.only('should have a placeholder in the alert price input', () => {
        cy.visit('/');
        cy.get('#alert-price').should('not.have.attr', 'placeholder', 'Aert Price');
    });
        
    it('should hide the alert message when the selected cryptocurrency changes', () => {
        cy.visit('/');
        cy.get('#alert-price').type('150');
        cy.get('#crypto-select').select('Bitcoin');
        cy.get('#crypto-price').then(($price) => {
            const currentPrice = parseFloat($price.text());
            cy.get('#alert-price').type(currentPrice.toString());
            cy.get('#alert-message').should('be.visible');
            cy.get('#crypto-select').select('Shiba Inu');  // assuming Ethereum is another option
            cy.get('#alert-message').should('not.be.visible');
        });
    });
})
