import {usersRoute} from "../helpers/routes";
import updateAUserValueResponse from "../helpers/responses/UpdateAUserValueResponse"
import updateAUserValueSchema from "../helpers/schemas/UpdateAUserValueSchema"

describe("Update a user value", () => {
    let userId;
   
     before(() => {
       const createUserPayload = {
         url: Cypress.env("BASE_API_URL") + usersRoute(),
         method: 'POST',
         body: {
           username: "Be the QA",
           email: "betheqa@email.com"
         }
       };
       cy.request(createUserPayload).then(response => {
         userId = response.body.id;
       });
     });
   
     let uptadeAUserPayload = {
       url: Cypress.env("BASE_API_URL") + usersRoute(),
       method: 'PATCH',
       body: {
         username: "Be the QA - updated",
       }
     }
   
     it('should test that the update a user value endpoint works as expected', () => {
       uptadeAUserPayload.url = uptadeAUserPayload.url + userId;
       cy.request(uptadeAUserPayload).then(response => {
         expect(response.body).excludingEvery(['id']).to.deep.equal(updateAUserValueResponse);
         expect(response.body).to.be.jsonSchema(updateAUserValueSchema);
         expect(response.status).to.be.equal(200);
       });
     });
   });