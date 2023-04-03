import { gql, useQuery } from "@apollo/client";

export const GET_USER_DETAILS_QUERY = gql`
  query user {
    getUserDetails {
      _id
      fullName
      email
      address
    }
  }
`;
