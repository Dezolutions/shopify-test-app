import { Page } from "@shopify/polaris";
import React from "react";
import InventoryList from "../components/InventoryList/InventoryList";

const inventory = () => {
  return (
    <Page>
      <InventoryList />
    </Page>
  );
};

export default inventory;
