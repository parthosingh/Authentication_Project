export const GET_ME_QUERY = `
  query GetMe {
    me {
      id
      name
      email
      address
      scope
      startDate
      endDate
      GSTNo
      role
    }
  }
`;

export const GET_ALL_USERS_QUERY = `
  query GetAllUsers {
    users {
      id
      name
      email
      address
      scope
      startDate
      endDate
      GSTNo
      role
      createdAt
    }
  }
`;

export const GET_USER_BY_GST_QUERY = `
  query GetUserByGST($GSTNo: String!) {
    userByGST(GSTNo: $GSTNo) {
      id
      name
      email
      address
      scope
      startDate
      endDate
      GSTNo
      role
    }
  }
`;