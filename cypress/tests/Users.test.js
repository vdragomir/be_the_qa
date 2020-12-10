import {usersRoute} from "../helpers/routes";
import {usersPayload} from "../helpers/payloads/UsersPayloads";
import {usersResponse} from "../helpers/responses/UsersResponses";
import {usersSchema} from "../helpers/schemas/UsersSchema";

describe("Get All Users", () => {
  before(() => {
    cy.deleteUsers();
  });

  it('should test that the Get all users endpoint works as expected', () => {
    cy.postRequest(usersRoute(), usersPayload("create")).then(response => {
      cy.getRequest(usersRoute()).then(response => {
        expect(response.body).to.deep.equal(usersResponse("get-all-users"));
        expect(response.body).to.be.jsonSchema(usersSchema());
        expect(response.status).to.be.equal(200);
      });
    });
  });
});

describe("Get A User", () => {
  let userId;

  before(() => {
    cy.postRequest(usersRoute(), usersPayload("create-one")).then(response => {
      userId = response.body.id;
    });
  });

  it('should test that the get a user endpoint works', () => {
    cy.getRequest(usersRoute() + userId).then(response => {
      expect(response.body).excludingEvery(['id']).to.deep.equal(usersResponse("get-a-user"));
      expect(response.body).to.be.jsonSchema(usersSchema());
      expect(response.status).to.be.equal(200);
    });
  });
});

describe("Assertion types in Cypress", () => {
  before(()=> {
    cy.deleteUsers();
    cy.postRequest(usersRoute(), usersPayload("create")).then(response => {});
  });
  // with expect()
  it('should test that the Get all users endpoint works as expected', () => {
    cy.request((Cypress.env("BASE_API_URL") + usersRoute()), {method: 'GET'}).then(response => {
      expect(response.body).to.deep.equal(usersResponse("get-all-users"));
    });
  });

  // with assert
  it('should test that the Get all users endpoint works as expected', () => {
    cy.request((Cypress.env("BASE_API_URL") + usersRoute()), {method: 'GET'}).then(response => {
      assert.deepEqual(response.body, usersResponse("get-all-users"));
    });
  });

  // with should()
  it('should test that the Get all users endpoint works as expected', () => {
    cy.request((Cypress.env("BASE_API_URL") + usersRoute()), {method: 'GET'}).its("body").should("deep.equal", usersResponse("get-all-users"));
  });
});
