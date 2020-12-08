import {usersRoute} from "../helpers/routes";
import getAllUsersResponse from "../helpers/responses/GetAllUsersResponse"
import getAllUsersSchema from "../helpers/schemas/GetAllUsersSchema"

describe("Users tests", () => {
  it('should test that the Get all users endpoint works as expected',  () => {
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