import { gql } from "@apollo/client";

export const GET_CUSTOMER = gql`
  query getCustomer($email: String) {
    customers(first: 20, query: $email) {
      edges {
        node {
          id
          firstName
          lastName
          email
          phone
          addresses {
            id
            address1
            address2
            city
            country
          }
        }
      }
    }
  }
`;

export const UPDATE_CUSTOMER_INFO = gql`
  mutation customerUpdate($input: CustomerInput!) {
    customerUpdate(input: $input) {
      userErrors {
        field
        message
      }
      customer {
        id
        firstName
        lastName
        email
        phone
      }
    }
  }
`;

export const UPDATE_CUSTOMER_ADDRESS = gql`
  mutation customerUpdateAddress($input: CustomerInput!) {
    customerUpdate(input: $input) {
      userErrors {
        field
        message
      }
      customer {
        id
        addresses {
          id
          address1
          address2
          city
          country
        }
      }
    }
  }
`;
