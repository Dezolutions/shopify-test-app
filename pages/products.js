import React from "react";
import ProductList from "../components/ProductList/ProductList";
import CreateProduct from "../components/CreateProduct/CreateProduct";
import { Layout, Page } from "@shopify/polaris";

const Products = () => {
  return (
    <Page>
      <Layout>
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

export default Products;
