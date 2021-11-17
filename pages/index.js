import { Layout, Page } from "@shopify/polaris";
import CustomerInfo from "../components/CustomerInfo/CustomerInfo";
import CustomerForm from "../components/CustomerForm/CustomerForm";
import useStore from "../store/store";

const Index = () => {
  const email = useStore((state) => state.email);

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <CustomerForm />
        </Layout.Section>
        <Layout.Section>{email && <CustomerInfo />}</Layout.Section>
      </Layout>
    </Page>
  );
};

export default Index;
