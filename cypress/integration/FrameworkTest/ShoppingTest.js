import LoginPage from '../../support/pageObjects/LoginPage';
import HomePage from '../../support/pageObjects/HomePage';
import ShoppingPage from '../../support/pageObjects/ShoppingPage';

describe("This is my Shopping Test", () => {

    let testdata;

    before(function () {
        cy.visit(Cypress.env("url"));
        // runs once before all tests in the block
        cy.fixture('example.json').then(function (data) {
            testdata = data
            return testdata

            Cypress.on("uncaught:exception", (err, runnable) => {
                return false;
            });
        })

    })


    it("Shopping Test", () => {

        const loginPage = new LoginPage();
        const homePage = new HomePage();
        const shoppingPage = new ShoppingPage();
        loginPage.clickLogin().click()
        loginPage.verifyEmailTextBox().type(testdata.email)
        loginPage.password().type(testdata.password)
        loginPage.submitButton().click()

        // //verify title of the page

        cy.title().should('eq', 'nopCommerce demo store')

        //verify the default value select in drop down on top left is US dollar

        cy.get('select#customerCurrency option:selected').should('have.text', 'US Dollar')

        //verify the alert
        homePage.clickOnSearch().click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Please enter some search keyword');
        }
        )


        // click on add to Cart
        homePage.verifySearchBox().type(testdata.searchProduct)
        homePage.clickOnSearch().click()


        testdata.productName.forEach(function (element) {

            cy.selectProduct(element)
        })

        //verify the message that product is added to cart
        shoppingPage.validateCartMessage().then(function (element) {
            const ele = element.text();
            expect(ele.includes('The product has been added to your shopping cart')).to.be.true // this returns true
        })

        //verify there shopping cart is a link
        shoppingPage.validateCartLink().should('have.attr', 'href', '/cart')

        shoppingPage.validateCartLink().click()
        //verify its on the shopping cart page

        cy.url().should('eq', 'https://demo.nopcommerce.com/cart')
        var sum = parseInt(0);

        shoppingPage.prodAmount().each((e1, index, $list) => {

            const amount = e1.text();

            var res = amount.split("$");
            res = parseFloat(res[1].trim())
            cy.log("The total is " + res)
            sum += Number(res)
            cy.log("The newest total is " + sum)
        })
            .then(function () {
                cy.log(sum)
            })


        cy.get('.cart-total-right span strong').then(function (element) {
            const total = element.text();
            cy.log(" the total new is " + total)
            var res = total.split("$")
            var totalAmount = res[1].trim()
            cy.log("The final amount is" + totalAmount)

            //   expect(totalAmount).to.be.equal(sum)

        })


        ///Static dropdown

        cy.get('select#checkout_attribute_1').select('Yes [+$10.00]').should('have.value', '2').and('to.be')

        // element is visible
        cy.get('.button-2.continue-shopping-button').should('be.visible');



        shoppingPage.acceptCheckBox().click();

        shoppingPage.checkoutButton().click();

        cy.get('select#BillingNewAddress_CountryId').select('India').should('have.value', '133')
        shoppingPage.enterCity().type(testdata.city)
        shoppingPage.enterAddress().type(testdata.address)
        shoppingPage.enterzipCode().type(testdata.pinCode)
        shoppingPage.enterPhoneNumber().type(testdata.phoneNumber)
        shoppingPage.clickOnContinueOnAddress().click()
        shoppingPage.clickOnContinueOnShipping().click()
        shoppingPage.clickOnContinueOnPayment().click()
        shoppingPage.clickOnContinueOnConfirmatiOnPayment().click()
        //   shoppingPage.clickOnBack().click()
        //    cy.url().should('eq','https://demo.nopcommerce.com/onepagecheckout#opc-payment_method')
        //    shoppingPage.clickOnContinueOnPayment().click()
        //    shoppingPage.clickOnContinueOnConfirmatiOnPayment().click()
        shoppingPage.clickOnConfirm().click()

        shoppingPage.confirmTopMessage().should('have.text', 'Thank you')
        shoppingPage.confirmBottomMessage().should('have.text', 'Your order has been successfully processed!')
        //I am fetching the order number after is created so that i Can validate in orders page
        let orderNumber;
        cy.get('.order-number').find('strong').then(str => {
            var temp = str.text()
            cy.log(temp)
            orderNumber = temp.split(" ")
            orderNumber = orderNumber[2]
            cy.log(orderNumber)

        }
        )
        //validating the order number created exist in order page

        cy.get('.list:nth-child(1) li:nth-child(3)').click({ force: true });
        cy.wait(2000)
        cy.get('.order-list div.title strong').should(($strong) => {

            expect($strong.eq(0)).to.contain(orderNumber)
        })

        //Deleting the address so that the flow of adding address works
        cy.get('.ico-account').click();
        shoppingPage.clickOnAddress().click();
        shoppingPage.deleteAddress().click()



    })
})

