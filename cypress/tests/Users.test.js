import {usersRoute} from "../helpers/routes";
import getAllUsersResponse from "../helpers/responses/GetAllUsersResponse"
import getAllUsersSchema from "../helpers/schemas/GetAllUsersSchema"
import getAUserResponse from "../helpers/responses/GetAUserResponse"
import getAUserSchema from "../helpers/schemas/GetAUserSchema"
import updateAUserResponse from "../helpers/responses/UpdateAUserResponse"
import updateAUserSchema from "../helpers/schemas/UpdateAUserSchema"
import updateAUserValueResponse from "../helpers/responses/UpdateAUserValueResponse"
import updateAUserValueSchema from "../helpers/schemas/UpdateAUserValueSchema"
import deleteAUserSchema from "../helpers/schemas/DeleteAUserSchema"

describe("Get All Users", () => {
  it.skip('should test that the Get all users endpoint works as expected', () => {
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

  // before(() => {
  //   const createUserPayload = {
  //     url: Cypress.env("BASE_API_URL") + usersRoute(),
  //     method: 'POST',
  //     body: {
  //       username: "Be the QA - 1 user",
  //       email: "betheqa@email.com"
  //     }
  //   };
  //   cy.request(createUserPayload).then(response => {
  //     userId = response.body.id;
  //   });
  // });

  it.skip('should test that the get a user endpoint works', () => {
    cy.request((Cypress.env("BASE_API_URL") + usersRoute() + userId), {method: 'GET'}).then(response => {
      expect(response.body).excludingEvery(['id']).to.deep.equal(getAUserResponse);
      expect(response.body).to.be.jsonSchema(getAUserSchema);
      expect(response.status).to.be.equal(200);
    });
  });
});

describe("Update a user", () => {
  let userId;

  // before(() => {
  //   const createUserPayload = {
  //     url: Cypress.env("BASE_API_URL") + usersRoute(),
  //     method: 'POST',
  //     body: {
  //       username: "Be the QA - iulia",
  //       email: "betheqa_iulia@email.com"
  //     }
  //   };
  //   cy.request(createUserPayload).then(response => {
  //     userId = response.body.id;
  //   });
  // });

  let uptadeAUserPayload = {
    url: Cypress.env("BASE_API_URL") + usersRoute(),
    method: 'PUT',
    body: {
      username: "Be the QA - updated",
      email: "betheqa_updated@email.com",
      address: "15 Yemen Road, Yemen"
    }
  }

  it.skip('should test that the update a user endpoint works as expected', () => {
    uptadeAUserPayload.url = uptadeAUserPayload.url + userId;
    cy.request(uptadeAUserPayload).then(response => {
      expect(response.body).to.deep.equal(updateAUserResponse);
      expect(response.body).to.be.jsonSchema(updateAUserSchema);
      expect(response.status).to.be.equal(200);
    });
  });
});

describe("Update a user value", () => {
  let userId;

  // before(() => {
  //   const createUserPayload = {
  //     url: Cypress.env("BASE_API_URL") + usersRoute(),
  //     method: 'POST',
  //     body: {
  //       username: "Be the QA",
  //       email: "betheqa@email.com"
  //     }
  //   };
  //   cy.request(createUserPayload).then(response => {
  //     userId = response.body.id;
  //   });
  // });

  let uptadeAUserPayload = {
    url: Cypress.env("BASE_API_URL") + usersRoute(),
    method: 'PATCH',
    body: {
      username: "Be the QA - updated",
    }
  }

  it.skip('should test that the update a user value endpoint works as expected', () => {
    uptadeAUserPayload.url = uptadeAUserPayload.url + userId;
    cy.request(uptadeAUserPayload).then(response => {
      expect(response.body).to.deep.equal(updateAUserValueResponse);
      expect(response.body).to.be.jsonSchema(updateAUserValueSchema);
      expect(response.status).to.be.equal(200);
    });
  });
});

describe("Delete a user", () => {
  let userId;

  before(() => {
    const createUserPayload = {
      url: Cypress.env("BASE_API_URL") + usersRoute(),
      method: 'POST',
      body: {
        username: "to be deleted NEW",
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

  it.only('should test that the delete a user endpoint works as expected', () => {
    deleteAUserPayload.url = deleteAUserPayload.url + userId;
    cy.request(deleteAUserPayload).then(response => {
      expect(response.body).to.deep.equal({});
      expect(response.body).to.be.jsonSchema(deleteAUserSchema);
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
