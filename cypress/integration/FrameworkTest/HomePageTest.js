import HomePage from '../../support/pageObjects/HomePage';

describe("This is my homePage Test", () => {
    Cypress.config('pageLoadTimeout', 100000);
    let testdata;

    before(function () {
        cy.visit(Cypress.env("url"));
        // runs once before all tests in the block
    
    })

    it("HomePage Test", () => {


        const homePage = new HomePage();
        homePage.categoryIsDisplayed().should('have.class', 'menu-toggle')
        cy.title().should('eq', 'nopCommerce demo store')
        //verify all the elements of headings
        let headerLinks = ['Register', 'Log in', 'Wishlist', 'Shopping cart']
        let actualHeaders = [];
        cy.get(".header-links > ul > li").should(($li) => {
            //expect($li).to.have.length(3) // This will fail as we got four headings
            expect($li).to.have.length(4) 
            expect($li.eq(0)).to.contain('Register')
            expect($li.eq(1)).to.contain('Log in')
            expect($li.eq(2)).to.contain('Wishlist')
            // expect($lis.eq(2)).to.contain('Write JavaScript')
          })
        homePage.verifyHeaderLinks().each((e1, index, $list) => {
            var getHeaders = e1.text();
            var getHeaders = getHeaders.split("(")
            let newHeader = getHeaders[0];

            if (headerLinks.includes(newHeader)) {
                cy.log("The header link contains corrects data " + newHeader)
            }

            else {

                cy.log("Incorrect data " + newHeader)
            }


        })

        //verify  search box on homepage

        homePage.verifySearchBox().should("have.attr", 'placeholder','Search store');
        
        homePage.verifySearchBox().type("App")
        cy.wait(2000)
        cy.get('#ui-id-1 li a').each(($el, index, $list) => {
            // $el is a wrapped jQuery element
            let newText= $el.text()
            cy.log(newText)
        
            if (newText.includes('Apple iCam')){
                cy.wait(2000)
                cy.wrap($el).click()
                //cy.find('span').click()
                cy.get('.product-name h1').contains('Apple iCam')
            
            }
          })
        





    })

})