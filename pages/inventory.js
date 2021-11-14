import { Layout, Page } from "@shopify/polaris";
import InventoryList from "../components/InventoryList/InventoryList";
import React from "react";

const inventory = () => {
  return (
    <Page>
      <Layout sectioned>
        <Layout.Section>
          <InventoryList />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default inventory;
