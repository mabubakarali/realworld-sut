// Core end-to-end flows:
// - Register new user
// - Login
// - Create article
// - Add comment

const uniqueSuffix = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`;

describe('Core user flows', () => {
  it('registers a new user and logs in', () => {
    const suffix = uniqueSuffix();
    const username = `sqe_user_${suffix}`;
    const email = `sqe_user_${suffix}@example.com`;
    const password = 'Password123!';

    cy.visit('/');

    // Go to sign up
    cy.contains('Sign up').click();

    // Fill registration form
    cy.get('input[placeholder="Username"]').type(username);
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.contains('Sign up').click();

    // After successful registration, username should appear in navbar
    cy.contains(username).should('be.visible');

    // Log out
    cy.contains('Settings').click();
    cy.contains('Or click here to logout.').click();

    // Now login again with same credentials
    cy.contains('Sign in').click();
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.contains('Sign in').click();

    cy.contains(username).should('be.visible');
  });

  it('creates a new article and adds a comment', () => {
    // Assume user is already logged in from previous test when running in same run
    const articleSuffix = uniqueSuffix();
    const title = `SQE Test Article ${articleSuffix}`;
    const description = 'SQE automated test article description';
    const body = 'This article was created by an automated Cypress test.';
    const tag = 'sqe';

    cy.visit('/');

    // Ensure we are logged in; if not, test will fail clearly here
    cy.contains('New Article').click();

    // Fill article form
    cy.get('input[placeholder="Article Title"]').type(title);
    cy.get('input[placeholder="What\'s this article about?"]').type(description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(body);
    cy.get('input[placeholder="Enter tags"]').type(`${tag}{enter}`);

    cy.contains('Publish Article').click();

    // Verify article page
    cy.contains(title).should('be.visible');
    cy.contains(body).should('be.visible');

    // Add a comment
    const commentText = `SQE comment ${articleSuffix}`;
    cy.get('textarea[placeholder="Write a comment..."]').type(commentText);
    cy.contains('Post Comment').click();

    cy.contains(commentText).should('be.visible');
  });
});
