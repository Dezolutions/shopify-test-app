import { Card, Heading, Layout, Page } from "@shopify/polaris";
import CustomerInfo from "../components/CustomerInfo/CustomerInfo";
import CustomerForm from "../components/CustomerForm/CustomerForm";
import useStore from "../store/store";


const Index = () => {
  console.log('index render')
  const email = useStore(state => state.email)
  return (
  <Page>
    <Heading>Shopify Admin API</Heading>
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <CustomerForm/>
          <hr/>
          {email && <CustomerInfo/>}
        </Card>
      </Layout.Section>
    </Layout>
  </Page>
)};

export default Index;
