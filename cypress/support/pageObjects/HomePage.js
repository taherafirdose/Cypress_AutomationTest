class HomePage{
categoryIsDisplayed(){
    return cy.get(".menu-toggle");
}

verifyHeaderLinks(){
    return cy.get(".header-links ul li");
}
verifySearchBox(){
    return cy.get(".search-box-text.ui-autocomplete-input");
}



clickOnSearch(){
    return cy.get("[type='submit']");
}
   

}

export default HomePage;