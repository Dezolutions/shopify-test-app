import { Layout, Page } from "@shopify/polaris";
import React from "react";
import OrderList from "../components/OrderList/OrderList";
import CreateOrder from "../components/CreateOrder/CreateOrder";

const orders = () => {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <CreateOrder />
        </Layout.Section>
        <Layout.Section>
          <OrderList />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default orders;
