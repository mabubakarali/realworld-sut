describe('Home page smoke tests', () => {
  it('loads the home page without crashing', () => {
    cy.visit('/');

    // Navbar brand
    cy.contains('conduit', { matchCase: false }).should('be.visible');

    // Global Feed tab text present
    cy.contains('Global Feed').should('be.visible');
  });

  it('displays either articles or the empty-feed message', () => {
    cy.visit('/');

    // Either at least one article preview...
    cy.get('div.article-preview').then(($previews) => {
      if ($previews.length > 0) {
        cy.wrap($previews.first()).should('be.visible');
      } else {
        // ...or the "No articles are here... yet." message
        cy.contains('No articles are here... yet.').should('be.visible');
      }
    });
  });
});
