export function retry(cb: () => Cypress.Chainable<boolean>, maxAttempts = 5) {
  if (maxAttempts > 0) {
    cb().then((isDone: boolean) => {
      if (!isDone) {
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000);
        retry(cb, maxAttempts - 1);
      } else {
        cy.log('retry condition passed, found expected elements');
      }
    });
  } else {
    throw new Error('cypress failed to run a successful retry block');
  }
}
