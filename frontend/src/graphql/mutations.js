export const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      user {
        id
        email
        name
        role
      }
    }
  }
`;

export const SIGNUP_MUTATION = `
  mutation Signup($createUserInput: CreateUserInput!) {
    signup(createUserInput: $createUserInput) {
      access_token
      user {
        id
        email
        name
        role
      }
    }
  }
`;

export const CREATE_USER_MUTATION = `
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
      email
      GSTNo
    }
  }
`;

export const UPDATE_USER_MUTATION = `
  mutation UpdateUser($id: String!, $updateUserInput: UpdateUserInput!) {
    updateUser(id: $id, updateUserInput: $updateUserInput) {
      id
      name
      email
      address
      scope
      startDate
      endDate
      GSTNo
    }
  }
`;

export const DELETE_USER_MUTATION = `
  mutation DeleteUser($id: String!) {
    removeUser(id: $id)
  }
`;
