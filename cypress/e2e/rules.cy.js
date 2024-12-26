describe('rules view e2e tests', () => {
  it('view configuration rules', () => {
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/rules', {
      fixture: 'rules',
    }).as('getRules')
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/weather/configuration',
      {
        fixture: 'weather/configuration',
      },
    ).as('getWeatherConfiguration')
    // Page loading
    cy.visit('/rules')
    cy.contains('Rules')
  })

  it('Add new rule', () => {
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
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
    // Page loading
    cy.visit('/new-rule')
    cy.contains('Add rule')
  })
})
