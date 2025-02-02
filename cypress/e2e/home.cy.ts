// Home page tests
describe("Home page tests", () => {
    beforeEach(() => {
        cy.visit("/home")
    })

    it("should have title 'E-commerce demo'", () => {
        cy.title().should('eq', 'E-commerce demo');
    })

    it('should display suggested products', () => {
        cy.get('.p-carousel-item').should('have.length.gte', 1); // gte = greater or equal
    });

    it('should redirect to product details page on clicking', () => {
        cy.get('div.p-carousel-item:nth-child(5) > div:nth-child(1) > app-suggested-product:nth-child(1) > div:nth-child(1)').should('exist').click()
        // Assuming that `redirect` method sets window.location.href to the product details URL
        cy.window().its('location.href').should('contain', '/product/');
    });

    it("should allow user to see home page products", () => {
        cy.get("h2").should("contain.text", "Macbook Air M1").should('be.visible');
        cy.get("h2").should("contain.text", "iPad Pro M2").should('be.visible');
        cy.get("h2").should("contain.text", "iPhone 14 Pro Max").should('be.visible');
    })

    it("should fill in form data", () => {
        cy.get("input[name='name']").type("Te");
        cy.get("input[name='surname']").type("Sting");
        cy.get("input[name='email']").type("testing777@gmail.com");
        cy.get('p-button[label="Sign Up"]').click();
    })
})

// Footer tests
describe('Footer menu tests', () => {
    beforeEach(() => {
        cy.visit('/home')
    })

    it('should display the Flying Carp label', () => {
        cy.get('body > app-root > app-footer > div > div:nth-child(1) > span')
            .should('have.text', 'Flying Carp e-commerce. 2025')
    })

    it('should navigate to Home page', () => {
        cy.get('app-footer a:nth-child(1) > span').click()
        cy.url().should('include', '/home')
    })

    it('should navigate to Products page', () => {
        cy.get('app-footer a:nth-child(2) > span').click()
        cy.url().should('include', '/products/search')
    })

    it('should navigate to Categories page', () => {
        cy.get('app-footer a:nth-child(3) > span').click()
        cy.url().should('include', '/categories')
    })

    it('should have visible LinkedIn icon', () => {
        cy.get('.pi-linkedin').should('exist')
    })

    it('should have visible GitHub icon', () => {
        cy.get('.pi-github').should('exist')
    })
})

// Header tests
describe('Header menu tests', () => {
    beforeEach(() => {
        cy.visit('/home')
    })

    it("should navigate to Home page on clicking Home link", () => {
        cy.get(".header li").contains("Homepage").click();
        cy.url().should("include", "/home");
    });

    it("should navigate to Products page on clicking Products link", () => {
        cy.get(".header li").contains("Products").click();
        cy.url().should("include", "/products/search");
    });

    it("should navigate to Categories page on clicking Categories link", () => {
        cy.get(".header li").contains("Categories").click();
        cy.url().should("include", "/categories");
    });

    it("should navigate to Wishlist page on clicking Wishlist link", () => {
        cy.get(".header li").contains("Wishlist").click();
        cy.url().should("include", "/wishlist");
    });

    it("should navigate to Cart page on clicking Cart link", () => {
        cy.get(".header li").contains("Cart").click();
        cy.url().should("include", "/cart");
    });
})
