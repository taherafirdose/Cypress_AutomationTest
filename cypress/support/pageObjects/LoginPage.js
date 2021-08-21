
class LoginPage{
    
    clickLogin(){
        return cy.get(".ico-login");
    }
    
    verifyHeader(){
        return cy.get(".header-links li a");
    }

    verifyEmailTextBox(){
      return cy.get('#Email')
    }

    password(){
        return cy.get('#Password')
      }    
    verifyErrorOnEmail(){
        return cy.get('#Email-error')
      }

      submitButton(){
        return cy.get('button[type="submit"]:nth-child(1)')
      }

      loginError(){
        return cy.get('div.message-error.validation-summary-errors:nth-child(1)')
      }

      verifyFooter(){
        return cy.get(".footer-upper div div strong");
    }
    
    verifyForgotPassword(){
        return cy.get(".forgot-password");
    }

    verifyRememberMe(){
        return cy.get("[type='checkbox']");
    }


    
    

      
      
      
    
}
    
    export default LoginPage;