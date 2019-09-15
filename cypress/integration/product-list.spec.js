describe('Retry End 2 End test', () => {

    beforeEach(() => {
        cy.resetServer();
        cy.visit('/')
    })

    function addToteBag() {
        cy.get('app-product h3')
        .contains('TOTE BAG')
        .parent()
        .within(() => {
            cy.get('button').click()
        })
    }

    describe('Products list', () => {
        it('should display 4 products with plenty of stock', ()=> {
            cy.get('app-product .product-item').should('length', 4)
            cy.get('.product-item > .thumbnail').should('not.have.class', 'last')
        })
    
        it('should be ordered alphabetically', ()=> {
            cy.get('.product-item h3').first().contains('SWEAT HOMME')
            cy.get('.product-item h3').last().contains('TOTE BAG')
        })
    
        it('should have an empty basket', ()=> {
            cy.get('#basketTotal').should('contain', '0,00\u00a0€')// attention au &nbsp; !
        })
    })
    
    describe('Adding a product to basket', () => {

        it('should update basket total accordingly', () => {
            addToteBag();
            
            cy.get('#basketTotal').should('contain','12,50\u00a0€')
        })

        it('should indicate if last item', () => {
            addToteBag();
            
            cy.get('app-product h3')
            .contains('TOTE BAG')
            .parent()
            .parent()
            .should('have.class', 'last');
        })

        it('should not display out of stock item', () => {
            addToteBag();
            addToteBag();
            
            cy.get('app-product h3')
            .contains('TOTE BAG')
            .should('not.exist')
        })

        it('should display 1 line per item in basket', () => {
            addToteBag();
            addToteBag();

            cy.get('#goBasket').click();

            cy.get('.list-group-item')
            .should('have.length', 2)
            .each(($el, index, $list) => {
                cy.wrap($el).should('contain', 'Tote bag');
            });
            
        })
    })
})