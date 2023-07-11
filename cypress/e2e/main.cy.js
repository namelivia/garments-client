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
})
