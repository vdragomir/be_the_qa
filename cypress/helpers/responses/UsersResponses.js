export function usersResponse(type) {
  let userResponse = {
    username: "Be the QA",
    email: "betheqa@email.com",
    id: 1
  };

  switch (type) {
    case "get-all-users":
      return [
        userResponse
      ];
    case "get-a-user":
      return {
        ...userResponse, username: "Be the QA - 1 user"
      }
    case "update-with-patch":
      return {
        ...userResponse, email: "betheqa@email.com - updated with patch"
      }
    case "update-with-put":
      return {
        ...userResponse, email: "betheqa@email.com - updated with put"
      }
  }
}
