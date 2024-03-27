import { gql } from '@apollo/client';

export const REGISTER_USER_MUTATION = gql`
mutation RegisterUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone_number: String!
    $password: String!
) {
  Register(
    firstName: $firstName
    lastName: $lastName
    email: $email
    phone_number: $phone_number
    password: $password
  ) {
    status
    data
  }
}
`;


export const LOGIN_USER_MUTATION = gql`
mutation LoginUser(
    $email: String!
    $password: String!
) {
  Login(
    email: $email
    password: $password
  ) {
    status
    data
    token
    id
  }
}
`;

export const CHANGE_PASSWORD_USER_MUTATION = gql`
mutation ChangePasswordUser(
    $id: String!
    $confirmPassword: String!
) {
  changePassword(
    id: $id
    password: $confirmPassword
  ) {
    status
    data
  }
}
`;

export const DETAIL_USER_MUTATION = gql`
mutation UserDetail(
    $id: String!
) {
  getUserDetails(
    id: $id
  ) {
    status
    data
    firstName
    lastName
    email
    phone_number
    created_at
  }
}
`;


export const GET_ALL_USERS_MUTATION = gql`
mutation getAllUsers{
  getUsers {
      status
      data{
        id
        firstName
        lastName
        email
        phone_number
        password
        is_added
        created_at
      }
  }
}
`;

export const CLEAR_SHARE_MUTATION = gql`
mutation clearShare{
  clearAddedUsers
}
`;

export const SEARCH_USER_MUTATION = gql`
mutation searchUsers(
    $text: String!
) {
  searchUser(
    text: $text
  ) {
    status
    data{
      id
      firstName
      lastName
      email
    }
  }
}
`;