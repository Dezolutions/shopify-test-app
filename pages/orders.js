import { Layout, Page } from "@shopify/polaris";
import React from "react";
import CreateOrder from "../components/CreateOrder/CreateOrder";
import OrderList from "../components/OrderList/OrderList";

const orders = () => {
  return (
    <Page>
      <Layout sectioned>
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
