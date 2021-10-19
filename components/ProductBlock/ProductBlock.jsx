import React from 'react'
import { Heading, Page, TextStyle, Layout, EmptyState, DisplayText} from "@shopify/polaris";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import useStore from '../../store/store'
import ProductList from '../ProductList/ProductList'
import CreateProduct from '../CreateProduct/CreateProduct';

const ProductBlock = () => {
  const [ids,setIds] = useStore(state => [state.ids, state.setIds])
  const [open, setOpen] = React.useState(false)
  const onHandleSelect = (res) => {
    setOpen(false)
    const a = res.selection.map(item => item.id)
    setIds(a)
  }
  return (
    <div>
      <Heading>Products</Heading>
      <TitleBar
        primaryAction={{
          content: 'Select products',
          onAction: () => setOpen(true)
        }}
      />
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={open}
        onSelection= {(res) => onHandleSelect(res)}
        onCancel={() => setOpen(false)}
      />
      
        <Layout>
          <Layout.Section oneHalf>
            <EmptyState
              heading="Get your products"
              action={{
                content: 'Select products',
                onAction: () => setOpen(true)
              }}
            >
              <DisplayText size="small">Select products to change their fields.</DisplayText>
            </EmptyState>
          </Layout.Section>
          <Layout.Section oneHalf>
            <CreateProduct/>
          </Layout.Section>
        </Layout>
        <ProductList/> 
         
      
    </div>
  )
}

export default ProductBlock
