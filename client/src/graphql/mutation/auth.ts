import { gql } from "@apollo/client";

export interface I_REGISTER_USER_MUTATION {
  email: string;
  password: string;
  fullName: string;
}

export const REGISTER_USER_MUTATION = gql`
  mutation registration(
    $email: String!
    $password: String!
    $fullName: String!
  ) {
    registration(
      registrationRequest: {
        email: $email
        password: $password
        fullName: $fullName
      }
    )
  }
`;

export const CONFIRM_USER_MUTATION = gql`
  mutation confirm($pin: String!) {
    confirmRegister(pin: $pin)
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(loginRequest: { email: $email, password: $password }) {
      jwt
    }
  }
`;
