describe('Action on basket', () => {

    beforeEach(() => {
        cy.resetServer();
        cy.visit('/')
    })

    it('should display 3 products in my basket before ordering', ()=> {

        cy.get('app-product #addToBasketBtn-2').click()
        cy.get('app-product #addToBasketBtn-2').click()
        cy.get('app-product #addToBasketBtn-1').click()
        cy.contains('Voir mon panier').click()

        cy.get('app-basket .basket .list-group .list-group-item').should(($listgroup) => {
            expect($listgroup).to.have.length(3)
            expect($listgroup.first()).to.contain('Sweat homme')
            expect($listgroup.last()).to.contain('Tote bag')
        })
    })
})