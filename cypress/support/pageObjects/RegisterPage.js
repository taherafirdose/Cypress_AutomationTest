class RegisterPage{

    selectRadioOption(){
        return cy.get('[type="radio"]');
    }

    clickRegister(){
        return cy.get('.ico-register');
    }

    selectDateOfBirth(){
        return cy.get('.date-picker-wrapper select option:nth-child(1)');
    }
    



}

export default RegisterPage;