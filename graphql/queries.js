import { gql } from "@apollo/client";

export const GET_CUSTOMER = gql`
  query getCustomer($email: String) {
    customers(first: 1, query: $email) {
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

export const GET_PRODUCTS = gql`
  query getAllProducts {
    products(first: 100) {
      edges {
        node {
          id
          title
          handle
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
  }
`;

export const GET_ORDERS = gql`
  query getOrders {
    orders(first: 100) {
      edges {
        node {
          id
          name
          email
          refundable
          netPaymentSet {
            shopMoney {
              amount
            }
          }
        }
      }
    }
  }
`;

export const GET_INVENTORY = gql`
  query inventoryItems {
    inventoryItems(first: 100) {
      edges {
        node {
          id
          sku
          tracked
          variant {
            inventoryQuantity
          }
          inventoryLevels(first: 5) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;
