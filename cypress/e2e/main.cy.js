describe('e2e tests', () => {
  it('welcome page', () => {
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/places', {
      fixture: 'places/all',
    }).as('getPlaces')
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/activities',
      {
        fixture: 'activities/all',
      },
    ).as('getActivities')
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/garment_types',
      {
        fixture: 'garment_types/all',
      },
    ).as('getGarmentTypes')
    cy.visit('/')
    cy.contains('Welcome to the garments app')
  })

  it('create a new garment without picture', () => {
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/places', {
      fixture: 'places/all',
    }).as('getPlaces')
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/activities',
      {
        fixture: 'activities/all',
      },
    ).as('getActivities')
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/garment_types',
      {
        fixture: 'garment_types/all',
      },
    ).as('getGarmentTypes')
    cy.intercept(
      'POST',
      'https://garments.localhost.pomerium.io/api/garments',
      {
        statusCode: 201,
        delay: 5000,
      },
    ).as('createNewGarment')
    cy.visit('/new')
    cy.get('input[name="name"]').type('My new garment')
    cy.get('select[id="garment_type"]').select(1)
    cy.get('select[id="place"]').select(1)
    cy.get('select[id="activity"]').select(1)
    cy.get('input[name="color"]').type('Blue')
    cy.get('input[name="status"]').type('Ok')
    cy.get('input[name="wear-to-wash"]').clear().type(2)
    cy.get('button[type="submit"]').click()
  })
})
