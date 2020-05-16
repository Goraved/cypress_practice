function manualRegistration() {
    var rand = Math.random().toString(36).substring(7);
    cy.get("#email_create").type(`goraved@${rand}.com`);
    cy.get("#SubmitCreate").click();
    cy.visit('http://automationpractice.com/index.php?controller=authentication&back=my-account#account-creation')
    cy.get('#id_gender1').click();
    cy.get('[name="customer_firstname"]').type("Test");
    cy.get('#customer_lastname').type("Goraved");
    cy.get('[name="passwd"]').type("123asd");
    cy.get("#days", "1").select("1");
    cy.get("#months", "1").select("1");
    cy.get("#years", "2020").select("2020");
    cy.get('[name="optin"]').click();
    cy.get("#newsletter").click();
    cy.get('[name="firstname"]').click();
    cy.get('[name="address1"]').click();
    cy.get('[name="address1"]').type("street");
    cy.get("#city").click();
    cy.get("#city").type("test");
    cy.get("#id_state", "1").select("1");
    cy.get("#postcode").click();
    cy.get("#postcode").type("11111");
    cy.get("#other").click();
    cy.get("#other").type("123");
    cy.get("#phone_mobile").click();
    cy.get("#phone_mobile").type("123");
    cy.get("#alias").click();
    cy.get("#alias").click();
    cy.get("#alias").click();
    cy.get("#submitAccount").click();
}

function apiRegistration() {
    var rand = Math.random().toString(36).substring(7);
    cy.request({
        method: 'POST',
        url: 'http://automationpractice.com/index.php?controller=authentication', // baseUrl is prepended to url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        body: {
            'id_gender': '1',
            'customer_firstname': 'Test',
            'customer_lastname': 'Goraved',
            'email': `goraved@${rand}.com`,
            'passwd': '123qwe',
            'days': '1',
            'months': '1',
            'years': '2020',
            'firstname': 'Test',
            'lastname': 'Goraved',
            'company': '',
            'address1': 'street',
            'address2': '',
            'city': 'city',
            'id_state': '1',
            'postcode': '11111',
            'id_country': '21',
            'other': '',
            'phone': '',
            'phone_mobile': '123',
            'alias': 'My+address123',
            'dni': '',
            'email_create': '1',
            'is_new_customer': '1',
             'back': 'my-account',
            'submitAccount': ''
        }
    })

    cy.visit('http://automationpractice.com/index.php')

    cy.get('.logout').click();
    cy.get(".login").click();

    cy.get('#email').type(`goraved@${rand}.com`)
    cy.get('#passwd').type('123qwe')
    cy.get('#SubmitLogin > span').click()
}

describe('Shop', () => {
    it('Order T-Shirt', () => {
        //  Cypress blocks registration flow so need to use API registration...
        apiRegistration();

        cy.visit('http://automationpractice.com/index.php')
        cy.get('li:nth-child(3) > a[title="T-shirts"]').click();
        cy.get('[itemprop="name"]').click();
        cy.get('[itemprop="name"]').click();
        cy.get('#add_to_cart').click();
        cy.get('[title="Proceed to checkout"]').click();
        cy.get('p > a.button.btn.btn-default.standard-checkout.button-medium').click();

        cy.get('#center_column > form > p > button').click();
        cy.get('[name="cgv"]').click();
        cy.get("#form > p > button").click();
        cy.get('[title="Pay by bank wire"]').click();
        cy.get("#cart_navigation > button").click();
        cy.get('[title="View my customer account"]').click();
        cy.get('[title="Orders"]').click();
        cy.get(".color-myaccount").should(($div) => {
            const text = $div.text()
        });
        cy.get('.label').invoke('text').should('contain', 'On backorder')

    })
})