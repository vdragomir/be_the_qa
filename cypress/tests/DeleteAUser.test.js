import {usersRoute} from "../helpers/routes";
import deleteAUserSchema from "../helpers/schemas/DeleteAUserSchema"

describe("Delete a user", () => {
    let userId;
  
    before(() => {
      const createUserPayload = {
        url: Cypress.env("BASE_API_URL") + usersRoute(),
        method: 'POST',
        body: {
          username: "user to be deleted",
          email: "betheqa@email.com"
        }
      };
      cy.request(createUserPayload).then(response => {
        userId = response.body.id;
      });
    });
  
    let deleteAUserPayload = {
      url: Cypress.env("BASE_API_URL") + usersRoute(),
      method: 'DELETE'
    }
  
    it('should test that the delete a user endpoint works as expected', () => {
      deleteAUserPayload.url = deleteAUserPayload.url + userId;
      cy.request(deleteAUserPayload).then(response => {
        expect(response.body).to.deep.equal({});
        expect(response.body).to.be.jsonSchema(deleteAUserSchema);
        expect(response.status).to.be.equal(200);
      });
    });
  });