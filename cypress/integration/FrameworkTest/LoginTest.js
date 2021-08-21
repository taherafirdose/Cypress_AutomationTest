import HomePage from '../../support/pageObjects/HomePage';
import LoginPage from '../../support/pageObjects/LoginPage';

describe("This is my LoginPage Test", () => {
    Cypress.config('pageLoadTimeout', 100000);
    let testdata;

    before(function () {
        cy.visit(Cypress.env("url"));
        
    })

    it("LoginPage Test", () => {
        const homePage = new HomePage();
        const loginPage = new LoginPage();


        loginPage.verifyHeader().each(($el, index, $list) => {
            // $el is a wrapped jQuery element
            let newText = $el.text()
            cy.log(newText)


            if (newText.includes('Log in')) {
                
                cy.wrap($el).click()
                cy.url().should('include', 'login')
            
            }
          
        })

            //Verify textbox email, for empty, different errors
           
          loginPage.verifyEmailTextBox().should("be.empty");
          
        loginPage.submitButton().click()
      loginPage.verifyErrorOnEmail().should("have.text","Please enter your email")

      loginPage.verifyEmailTextBox().type("abc");
      loginPage.verifyErrorOnEmail().should("have.text","Wrong email")
      loginPage.verifyEmailTextBox().should("have.value", "abc")
      loginPage.verifyEmailTextBox().clear()
      loginPage.verifyEmailTextBox().type("abc@gmail.com");
      loginPage.submitButton().click();
      loginPage.loginError().contains('Login was unsuccessful. Please correct the errors and try again.')
     loginPage.loginError().first().should("have.text","Login was unsuccessful. Please correct the errors and try again.No customer account found\n");
    
//verify the footer got 4 sections

loginPage.verifyFooter().its('length').should('eq', 5)

   //verify Remenber me checkbox

   loginPage.verifyRememberMe().check().should('be.checked')

    //verify forgot password opens forgotpassword page

    
        loginPage.verifyForgotPassword().find('a').should('have.attr','href','/passwordrecovery')
        loginPage.verifyForgotPassword().click()
        cy.url().should('include','passwordrecovery')

       
        
       
    })
})