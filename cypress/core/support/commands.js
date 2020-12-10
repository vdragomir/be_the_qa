// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import {usersRoute} from "../../helpers/routes";

const BASE_API_URL = Cypress.env("BASE_API_URL");


Cypress.Commands.add("deleteUsers", () => {
  cy.getRequest(usersRoute()).then(response => {
    const user = response.body.length;
    for (let i = 1; i<=user; i++) {
      cy.deleteRequest(usersRoute() + i);
    }
  });
});

Cypress.Commands.add("getRequest", (endpoint) => {
  const props = {
    method: 'GET',
    url: BASE_API_URL + endpoint,
  };
  cy.request(props);
});

Cypress.Commands.add("postRequest", (endpoint, payload) => {
  const props = {
    method: 'POST',
    url: BASE_API_URL + endpoint,
    body: payload
  };
  cy.request(props);
});

Cypress.Commands.add("putRequest", (endpoint, payload) => {
  const props = {
    method: 'PUT',
    url: BASE_API_URL + endpoint,
    body: payload
  };
  cy.request(props);
});

Cypress.Commands.add("patchRequest", (endpoint, payload) => {
  const props = {
    method: 'PATCH',
    url: BASE_API_URL + endpoint,
    body: payload
  };
  cy.request(props);
});

Cypress.Commands.add("deleteRequest", (endpoint) => {
  const props = {
    method: 'DELETE',
    url: BASE_API_URL + endpoint,
  };
  cy.request(props);
});
