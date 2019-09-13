describe('Retry End 2 End test', function () {

    beforeEach(() => {
        cy.visit('http://localhost:4209')
    })

    it('should display 4 products with plenty of stock', ()=> {
        cy.get('app-product .product-item').should('length', 4)
        cy.get('.product-item > .thumbnail').should('not.have.class', 'last')
    })

    it('should be ordered alphabetically', ()=> {
        cy.get('.product-item h3').first().contains('SWEAT HOMME')
        cy.get('.product-item h3').last().contains('TOTE BAG')
    })

    it('should have an empty basket', ()=> {
        cy.get('header p').first().contains(`Votre panier s'élève à 0,00\u00a0€`)// attention au &nbsp; !
    })

})