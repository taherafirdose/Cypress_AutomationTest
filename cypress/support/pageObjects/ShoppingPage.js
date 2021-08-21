class ShoppingPage{

    validateCartMessage(){
        return cy.get('.content');
    }

    validateCartLink(){
        return cy.get('p a');
    }

    clickOnCart(){
        return cy.get('flyout-cart');
    }

    prodAmount(){
        return cy.get('tr td:nth-child(6)');
    }

    checkoutButton(){
        return cy.get('#checkout:nth-child(1)');
    }
    acceptCheckBox(){
        return cy.get('#termsofservice');
    }

    enterCity(){
        return cy.get('#BillingNewAddress_City');
    }

    enterAddress(){
        return cy.get('#BillingNewAddress_Address1');
    }

    enterzipCode(){
        return cy.get('#BillingNewAddress_ZipPostalCode');
    }

    enterPhoneNumber(){
        return cy.get('#BillingNewAddress_PhoneNumber');
    }

    clickOnContinueOnAddress(){
        return cy.get('#billing-buttons-container > .new-address-next-step-button');
    }

    clickOnContinueOnShipping(){
        return cy.get('#shipping-method-buttons-container > .button-1');
    }

    clickOnContinueOnPayment(){
        return cy.get('#payment-method-buttons-container > .button-1');
    }

    clickOnContinueOnConfirmatiOnPayment(){
        return cy.get('#payment-info-buttons-container > .button-1');
    }

    clickOnBack(){
        return cy.get('#confirm-order-buttons-container > .back-link > a');
    }

    
    clickOnConfirm(){
        return cy.get('#confirm-order-buttons-container > .button-1');
    }

    confirmTopMessage(){
        return cy.get('.page-title h1');
    }

    confirmBottomMessage(){
        return cy.get('.section > .title > strong');
    }

    clickOnAddress(){
        return cy.get('.my-account > .list > :nth-child(3) > a');
    }

    clickOnMyAccount(){
        return cy.get('ico-account');
    }

    clickOnMyAddress(){
        return cy.get('li.customer-addresses.active');
    }

    deleteAddress(){
        return cy.get('.button-2.delete-address-button');
    }

    orderNumber(){
        return cy.get('.order-number');
    }

    
    clickOnOrders(){
        return cy.get('.customer-orders.active');
    }
    
    orderList(){
        return cy.get('.section.order-item div.title strong');
    }
    
    
    
  


    
    


    
    
   


   

    
   
    
    
    
    
   
    



}

export default ShoppingPage;