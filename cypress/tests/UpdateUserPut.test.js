import {usersRoute} from "../helpers/routes";
import getAUserResponsePut from "../helpers/responses/GetAUserResponsePut"
import getAUserResponse from "../helpers/responses/GetAUserResponse"
import getAUserSchema from "../helpers/schemas/GetAUserSchema"
import getAUserSchemaPut from "../helpers/schemas/GetAUserSchemaPut"
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

describe("Update user using PUT", () => {
  before(() => {
    const updateUserPayload = {
      url: Cypress.env("BASE_API_URL") + usersRoute() + userId,
      method: 'PUT',
      body: {
        id: userId,
        username: "just_testing_update",
      }
    };
    cy.request(updateUserPayload);
  });

  it('should test that the update was performed correctly', () => {
    cy.request((Cypress.env("BASE_API_URL") + usersRoute() + userId), {method: 'GET'}).then(response => {
      expect(response.body).excludingEvery(['id']).to.deep.equal(getAUserResponsePut);
      expect(response.body).to.be.jsonSchema(getAUserSchemaPut);
      expect(response.status).to.be.equal(200);
    });
  });
});
