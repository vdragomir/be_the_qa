import {usersRoute} from "../helpers/routes";

describe("Get Users", () => {
  it('should test the get users endpoint',  () => {
    cy.request(Cypress.env("BASE_API_URL") + usersRoute(), {method: 'GET'}).then(response => {
      expect(response.status).to.equal(200);
    });
  });
});
