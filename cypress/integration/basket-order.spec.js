describe('Action on basket', () => {

    beforeEach(() => {
        cy.resetServer();
        cy.visit('/')
    })

    it('should display 3 products in my basket before ordering', () => {
        cy.clickOnProduct('SWEAT HOMME')
        cy.clickOnProduct('SWEAT HOMME')
        cy.clickOnProduct('TOTE BAG')

        cy.contains('Voir mon panier').click()

        cy.get('app-basket .basket .list-group .list-group-item').should(($listgroup) => {
            expect($listgroup).to.have.length(3)
            expect($listgroup.first()).to.contain('Sweat homme')
            expect($listgroup.last()).to.contain('Tote bag')
        })
    })


    describe('Filling order form', () => {

        function fillForm() {
            cy.get('#goBasket').click();

            cy.get('#submitOrderBtn').should('be.disabled');

            cy.get('#name').type('LEEEEERRROOOOOOYYYY JEEEEEEENNNNNKIIIIIIINNNNNSSSS{selectall}{del}Mr Tester')
            cy.get('#name').should('not.have.class', 'has-error');

            cy.get('#submitOrderBtn').should('be.disabled');

            cy.get('#address').type('123 Success Road')
            cy.get('#address').should('not.have.class', 'has-error');

            cy.get('#formateur').select('david');

            cy.get('#creditCard').type('123-456');
        }

        it('should activate submit button only if everything is valid', () => {
            cy.clickOnProduct('TOTE BAG');
            fillForm();

            cy.get('#submitOrderBtn').should('not.be.disabled');
        })


        it('should confirm order', () => {
            cy.clickOnProduct('TOTE BAG');
            fillForm();

            cy.get('#submitOrderBtn').click();

            cy.url().should('eq', 'http://localhost:4209/confirmation')

            cy.get('h1').should('contain', 'Commande confirmée')
        })

        it('should make ordered items out of stock and reset basket', () => {
            cy.clickOnProduct('TOTE BAG');
            cy.clickOnProduct('TOTE BAG');
            fillForm();

            cy.get('#submitOrderBtn').click();

            cy.get('#backBtn').click();

            cy.get('app-product h3')
                .contains('TOTE BAG')
                .should('not.exist')

            cy.get('#basketTotal').should('contain', '0,00\u00a0€')
        })
    })
})