const GRAPHQL_ENDPOINT = 'http://localhost:3000/graphql';

export const graphqlRequest = async (query, variables = {}) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();
  
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  
  return result.data;
};