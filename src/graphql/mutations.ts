import { gql } from "@apollo/client";

export const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, phone: $phone, street: $street, city: $city) {
      name
      phone
      address {
        city
        street
      }
      id
    }
  }
`;

export const UPDATE_PHONE = gql`
  mutation ($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      name
      phone
    }
  }
`;
