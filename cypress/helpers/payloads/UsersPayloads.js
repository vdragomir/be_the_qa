export function usersPayload (type) {
  let createUserPayload = {
    username: "Be the QA",
    email: "betheqa@email.com"
  };

  switch (type) {
    case "create":
      return createUserPayload;
    case "create-one":
      return {
        ...createUserPayload, username: "Be the QA - 1 user"
      }
  }
}
