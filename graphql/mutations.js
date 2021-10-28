import { gql } from "@apollo/client";

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
        id
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

export const CREATE_REFUND = gql`
  mutation refundCreate($input: RefundInput!) {
    refundCreate(input: $input) {
      userErrors {
        field
        message
      }
      order {
        id
      }
      refund {
        id
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation orderUpdate($input: OrderInput!) {
    orderUpdate(input: $input) {
      userErrors {
        field
        message
      }
      order {
        id
        email
      }
    }
  }
`;

export const DRAFT_ORDER_CREATE = gql`
  mutation draftOrderCreate($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      userErrors {
        field
        message
      }
      draftOrder {
        id
      }
    }
  }
`;

export const UPDATE_INVENTORY = gql`
  mutation inventoryItemUpdate($id: ID!, $input: InventoryItemUpdateInput!) {
    inventoryItemUpdate(id: $id, input: $input) {
      userErrors {
        field
        message
      }
      inventoryItem {
        id
      }
    }
  }
`;
