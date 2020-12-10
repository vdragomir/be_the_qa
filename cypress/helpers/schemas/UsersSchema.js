export function usersSchema(type) {
  let userSchema = {
    "required": [
      "username",
      "email",
      "id"
    ],
    "properties": {
      "username": {
      },
      "email": {
      },
      "id": {
      }
    }
  };

  return userSchema;
}
