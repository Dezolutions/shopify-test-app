import { Layout, Page } from "@shopify/polaris";
import React from "react";
import ProductList from "../components/ProductList/ProductList";
import CreateProduct from "../components/CreateProduct/CreateProduct";

const products = () => {
  return (
    <Page>
      <Layout sectioned>
        <Layout.Section>
          <CreateProduct />
        </Layout.Section>
        <Layout.Section>
          <ProductList />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default products;
