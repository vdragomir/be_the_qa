import {usersRoute} from "../helpers/routes";
import updateAUserResponse from "../helpers/responses/UpdateAUserResponse"
import updateAUserSchema from "../helpers/schemas/UpdateAUserSchema"

describe("Update a user", () => {
    let userId;
  
    before(() => {
      const createUserPayload = {
        url: Cypress.env("BASE_API_URL") + usersRoute(),
        method: 'POST',
        body: {
          username: "Be the QA",
          email: "betheqa_iulia@email.com"
        }
      };
      cy.request(createUserPayload).then(response => {
        userId = response.body.id;
      });
    });
  
    let uptadeAUserPayload = {
      url: Cypress.env("BASE_API_URL") + usersRoute(),
      method: 'PUT',
      body: {
        username: "Be the QA - updated",
        email: "betheqa_updated@email.com",
        address: "15 Yemen Road, Yemen"
      }
    }
  
    it('should test that the update a user endpoint works as expected', () => {
      uptadeAUserPayload.url = uptadeAUserPayload.url + userId;
      cy.request(uptadeAUserPayload).then(response => {
        expect(response.body).excludingEvery(['id']).to.deep.equal(updateAUserResponse);
        expect(response.body).to.be.jsonSchema(updateAUserSchema);
        expect(response.status).to.be.equal(200);
      });
    });

  });