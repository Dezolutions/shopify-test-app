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
export const GET_PRODUCTS = gql`
  query getAllProducts {
    products(first: 100) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
export const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        id
        variants(first: 1) {
          edges {
            node {
              price
            }
          }
        }
      }
    }
  }
`;
export const UPDATE_PRODUCT = gql`
  mutation productUpdate($input: ProductInput!) {
    productUpdate(input: $input) {
      userErrors {
        field
        message
      }
      product {
        title
        handle
        id
        variants(first: 1) {
          edges {
            node {
              price
            }
          }
        }
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation productCreate($input: ProductInput!) {
    productCreate(input: $input) {
      userErrors {
        field
        message
      }
      product {
        title
        handle
        id
        variants(first: 1) {
          edges {
            node {
              price
            }
          }
        }
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation productDelete($input: ProductDeleteInput!) {
    productDelete(input: $input) {
      userErrors {
        field
        message
      }
      deletedProductId
    }
  }
`;
