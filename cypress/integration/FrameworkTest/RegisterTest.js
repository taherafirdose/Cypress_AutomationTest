import RegisterPage from '../../support/pageObjects/RegisterPage';

describe("This is my RegisterPage Test", () => {

    let testdata;

    before(function () {
        cy.visit(Cypress.env("url"));
        // runs once before all tests in the block
        cy.fixture('example.json').then(function (data) {
            testdata = data
            return testdata
        })

    })


    it("RegisterPage Test", () => {

        const registerPage = new RegisterPage()

        //select female checkbox
        registerPage.clickRegister().click();
        cy.wait(2000)

        cy.get(".forcheckbox").contains(testdata.gender).click()

        //dateofbirth

        //cy.get("select[name='DateOfBirthDay']").select('1').should('have.value', '1') - 
        //can use above statement as well if there are multple dropdowns and you want to select only one

        //below is used to loop through all dropdowns and select value
        registerPage.selectDateOfBirth().each((e1, index, $list) => {
            let header = e1.text()

            switch (header) {
                case "Day":
                    cy.get("select[name='DateOfBirthDay']").select('1').should('have.value', '1')
                    break;

                case "Month":
                    cy.get("select[name='DateOfBirthMonth']").select('March').should('have.value', '3')
                    break;

                case "Year":
                    cy.get("select[name='DateOfBirthYear']").select('2000').should('have.value', '2000')
                    break;

                default:
                    let text = "No value found";
            }


        })









    })

})