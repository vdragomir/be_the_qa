import {usersRoute} from "../helpers/routes";
import getAUserResponse from "../helpers/responses/GetAUserResponse"
import getAUserSchema from "../helpers/schemas/GetAUserSchema"

// Global variables
let userId;

describe("Create A User", () => {
  before(() => {
    const createUserPayload = {
      url: Cypress.env("BASE_API_URL") + usersRoute(),
      method: 'POST',
      body: {
        username: "Be the QA - 1 user",
        email: "betheqa@email.com",
      }
    };
    cy.request(createUserPayload).then(response => {
      userId = response.body.id;
    });
  });

it('should test that the get a user endpoint works', () => {
    cy.request((Cypress.env("BASE_API_URL") + usersRoute() + userId), {method: 'GET'}).then(response => {
      expect(response.body).excludingEvery(['id']).to.deep.equal(getAUserResponse);
      expect(response.body).to.be.jsonSchema(getAUserSchema);
      expect(response.status).to.be.equal(200);
    });
  });
});

describe("Delete a user which was just created", () => {
   before(() => {
    const updateUserPayload = {
      url: Cypress.env("BASE_API_URL") + usersRoute() + userId,
      method: 'DELETE',
    };
    cy.request(updateUserPayload);
  });

  it('should test that delete was performed correctly', () => {
    cy.request((Cypress.env("BASE_API_URL") + usersRoute()), {method: 'GET'}).then(response => {
      // a list with all the user Ids
      const idList = response.body.map(el => el.id);
      expect(idList).to.not.include(userId)
    });
  });
});