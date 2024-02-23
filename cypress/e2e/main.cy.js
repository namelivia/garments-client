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
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/garments/random?place=home&garment_type=pants&activity=casual',
      {
        fixture: 'garments/random',
      },
    ).as('getRandomGarment')

    // Page loading
    cy.visit('/')
    cy.contains('Welcome to the garments app')

    // Asking for a random garment
    cy.get('select[id="garment_type"]').select(1)
    cy.get('select[id="place"]').select(1)
    cy.get('select[id="activity"]').select(1)
    cy.contains('Everyday pants')
    cy.contains('Wear it')
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

    // Filling the form
    cy.get('input[name="name"]').type('My new garment')
    cy.get('select[id="garment_type"]').select(1)
    cy.get('select[id="place"]').select(1)
    cy.get('select[id="activity"]').select(1)
    cy.get('input[name="color"]').type('Blue')
    cy.get('input[name="status"]').type('Ok')
    cy.get('input[name="wear-to-wash"]').clear().type(2)
    cy.get('button[type="submit"]').click()
  })

  it('view filtered garment list', () => {
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
      'GET',
      'https://garments.localhost.pomerium.io/api/garments?place=home&garment_type=pants&activity=casual',
      {
        fixture: 'garments/filtered',
      },
    ).as('getFilteredGarments')

    // Aksing for a list of filtered garments
    cy.visit('/list')
    cy.get('select[id="garment_type"]').select(1)
    cy.get('select[id="place"]').select(1)
    cy.get('select[id="activity"]').select(1)
    cy.contains('Everyday pants')
    cy.contains('Wear it')
    cy.contains('Wash it')
    cy.contains('Details')
    cy.contains('Everyday jeans')
  })

  it('view garment detail', () => {
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/garments/1',
      {
        fixture: 'garments/detail',
      },
    ).as('getGarment')
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/garments/1/journal',
      {
        fixture: 'garments/journal',
      },
    ).as('getGarmentJournal')
    cy.visit('/garment/1')

    // Garment details are displayed
    cy.contains('Id: 1')
    cy.contains('Name: Everyday pants')
    cy.contains('Color: brown')
    cy.contains('Status: Ok')
    cy.contains('Place: home')
    cy.contains('Activity: casual')

    // Journal messages are displayed
    cy.contains('11/2/2022, 9:12:23 PM')
    cy.contains('Pants bought in the shop')
    cy.contains('11/3/2022, 9:12:23 PM')
    cy.contains('Pants borrowed from a friend')

    // Add new entry to the journal
    cy.get('input[name="message"]').type('Pants returned by a friend')
    cy.get('button[type="submit"]').click()
    cy.intercept(
      'POST',
      'https://garments.localhost.pomerium.io/api/garments/1/journal',
      {
        statusCode: 201,
        delay: 5000,
      },
    ).as('addNewJournalEntry')
  })

  it('view washing garments', () => {
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/garments/washing',
      {
        fixture: 'garments/washing',
      },
    ).as('getWashingGarments')

    // The list of washing garments is displayed
    cy.visit('/washing')
    cy.contains('Some pants to wash')
    cy.contains('Some jeans to wash')
    cy.contains('Wash it')
  })

  it('view thrown away garments', () => {
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/garments/thrown_away',
      {
        fixture: 'garments/thrown_away',
      },
    ).as('getThrownAwayGarments')
    // The list of thrown away garments is displayed
    cy.visit('/thrown_away')
  })

  it('send garment to wash', () => {
    cy.intercept('GET', 'https://garments.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/garments/1',
      {
        fixture: 'garments/detail',
      },
    ).as('getGarment')
    cy.intercept(
      'GET',
      'https://garments.localhost.pomerium.io/api/garments/1/journal',
      {
        fixture: 'garments/journal',
      },
    ).as('getGarmentJournal')
    cy.intercept(
      'POST',
      'https://garments.localhost.pomerium.io/api/garments/1/send_to_wash',
      {
        statusCode: 200,
        delay: 5000,
      },
    ).as('sendToWash')

    cy.visit('/garment/1')
    cy.get('button[name="send-to-wash"]').click()
  })
})
