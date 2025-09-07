describe('today page e2e tests', () => {
  it('today page no outfits today', () => {
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/weather?place=home',
      {
        fixture: 'weather',
      },
    ).as('getWeather')
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/places', {
      fixture: 'places/only_one',
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
      'https://garments.localhost.pomerium.io/api/outfits/today',
      {
        fixture: 'outfits/today_empty',
      },
    ).as('getTodayOutfits')
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/outfits/new?place=home&activity=casual',
      {
        fixture: 'outfits/new',
      },
    ).as('getNewOutfit')
    cy.intercept(
      'POST',
      'https://garments.localhost.pomerium.io/api/outfits/1/reject/1',
      {
        fixture: 'outfits/reject',
      },
    ).as('rejectOutfitGarment')
    cy.intercept(
      'POST',
      'https://garments.localhost.pomerium.io/api/outfits/1/wear',
      {
        fixture: 'outfits/new',
      },
    ).as('wearOutfit')

    // Page loading
    cy.visit('/')
    cy.contains('Today')

    // Asking for a new outfit
    cy.get('select[id="activity"]').select(1)
    cy.contains('Everyday pants')
    cy.contains('Everyday socks')
    // Reject garment id 1
    cy.get('button[name="reject-1"]').click()

    cy.contains('Different socks')

    // Wear the outfit
    cy.contains('Wear')
    cy.get('button[name="wear-outfit"]').click()
  })

  it('today page outfits today', () => {
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/weather?place=home',
      {
        fixture: 'weather',
      },
    ).as('getWeather')
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/places', {
      fixture: 'places/only_one',
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
      'https://garments.localhost.pomerium.io/api/outfits/today',
      {
        fixture: 'outfits/today',
      },
    ).as('getTodayOutfits')

    // Page loading
    cy.visit('/')
    cy.contains('Today')
  })

  it('when only one place is returned, it will be preselected', () => {
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/places', {
      fixture: 'places/only_one',
    }).as('getPlaces')
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/weather?place=home',
      {
        fixture: 'weather',
      },
    ).as('getWeather')
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/outfits/today',
      {
        fixture: 'outfits/today_empty',
      },
    ).as('getTodayOutfits')
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
    cy.visit('/')

    // The only place is preselected
    cy.get('select[id="place"]').should('have.value', 'home')
  })
})
