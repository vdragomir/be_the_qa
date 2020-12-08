import {usersRoute} from "../helpers/routes";
import getAllUsersResponse from "../helpers/responses/GetAllUsersResponse"
import getAllUsersSchema from "../helpers/schemas/GetAllUsersSchema"
import getAUserResponse from "../helpers/responses/GetAUserResponse"
import getAUserSchema from "../helpers/schemas/GetAUserSchema"

describe("Get All Users", () => {
  it('should test that the Get all users endpoint works as expected', () => {
    const createUserPayload = {
      url: Cypress.env("BASE_API_URL") + usersRoute(),
      method: 'POST',
      body: {
        username: "Be the QA",
        email: "betheqa@email.com"
      }
    };

    cy.request(createUserPayload).then(response => {
      cy.request((Cypress.env("BASE_API_URL") + usersRoute()), {method: 'GET'}).then(response => {
        expect(response.body).to.deep.equal(getAllUsersResponse);
        expect(response.body).to.be.jsonSchema(getAllUsersSchema);
        expect(response.status).to.be.equal(200);
      });
    });
  });
});

describe("Get A User", () => {
  let userId;

  before(() => {
    const createUserPayload = {
      url: Cypress.env("BASE_API_URL") + usersRoute(),
      method: 'POST',
      body: {
        username: "Be the QA - 1 user",
        email: "betheqa@email.com"
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

describe.skip("Assertion types in Cypress", () => {
  // with expect()
  it('should test that the Get all users endpoint works as expected', () => {
    cy.request((Cypress.env("BASE_API_URL") + usersRoute()), {method: 'GET'}).then(response => {
      expect(response.body).to.deep.equal(getAllUsersResponse);
    });
  });

  // with assert
  it('should test that the Get all users endpoint works as expected', () => {
    cy.request((Cypress.env("BASE_API_URL") + usersRoute()), {method: 'GET'}).then(response => {
      assert.deepEqual(response.body, getAllUsersResponse);
    });
  });

  // with should()
  it('should test that the Get all users endpoint works as expected', () => {
    cy.request((Cypress.env("BASE_API_URL") + usersRoute()), {method: 'GET'}).its("body").should("deep.equal", getAllUsersResponse);
  });
});
