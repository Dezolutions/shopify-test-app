import { Page, Layout } from "@shopify/polaris";
import React from "react";
import InventoryList from "../components/InventoryList/InventoryList";

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
