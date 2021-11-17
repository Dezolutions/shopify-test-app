import { useMutation } from '@apollo/client'
import { Button, Card, Form, FormLayout, Heading, InlineError, TextField, Frame, Loading, EmptyState, List, ResourceList, ResourceItem } from '@shopify/polaris'
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import React from 'react'
import { DRAFT_ORDER_COMPLETE, DRAFT_ORDER_CREATE } from '../../graphql/mutations'
import { GET_ORDERS } from '../../graphql/queries'
import useStore from '../../store/store';
import OrderProduct from '../OrderProduct/OrderProduct';

const CreateOrder = () => {

  //store
  const [products,setProducts] = useStore(state => [state.products, state.setProducts])

  //states
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [createError, setCreateError] = React.useState('');

  //handlers
  const handleEmail = React.useCallback((newValue) => setEmail(newValue), []);
  const handleSelection = (resources) => {
    setOpen(false);
    setProducts(resources.selection)
  };

  //mutations
  const [draftOrderComplete, {error:errorComplete}] = useMutation(DRAFT_ORDER_COMPLETE, {refetchQueries: [
    {query: GET_ORDERS}
  ]})
  const [draftOrderCreate, {error, loading}] = useMutation(DRAFT_ORDER_CREATE,{
    onCompleted:data => {
      const {draftOrderCreate:order} = data
      if(order.userErrors[0]?.message){
        setCreateError(order.userErrors[0]?.message)
      }
      else{
        draftOrderComplete({
          variables:{
            id: order.draftOrder?.id
          }
        })
        setEmail('')
        setCreateError('')
        setProducts([])
      } 
        
    }
  })

  //submit functions
  const onCreate = () => {
    draftOrderCreate({
      variables: {
        input : {
          email: email, 
          lineItems: products.map(product => ({quantity: product.orderQuantity || 1, variantId: product.variants[0].id}))
        }
      }
    })
  }
  
  return (
    <Card sectioned>
      {loading && 
        <div style={{height: '1px'}}>
          <Frame>
            <Loading />
          </Frame>
        </div>
      }
      <Form onSubmit={onCreate}>
        <FormLayout>
          <Heading>Create order</Heading>
          {products.length 
            ? <ResourceList
                items={products}
                renderItem={item => {
                  return (
                    <ResourceItem id={item.id}>
                      <OrderProduct {...item}/>
                    </ResourceItem>
                  )
                }}
              />
            : <EmptyState
                heading="Select products for your order"
                action={{
                  content: 'Select products',
                  onAction: () => setOpen(true),
                }}
              ></EmptyState>
          }
          <TitleBar
            primaryAction={{
              content: 'Select products',
              onAction: () => setOpen(true),
            }}
          />
          <ResourcePicker
            resourceType="Product"
            showVariants={false}
            open={open}
            onSelection={(resources) => handleSelection(resources)}
            onCancel={() => setOpen(false)}
          />
          <TextField label="Customer email(optional)" type="email" value={email} onChange={handleEmail}/>
          <Button submit primary>Create Order</Button>
          {error && <InlineError message={error.message} fieldID="CreateOrderError"/>}
          {createError && <InlineError message={createError} fieldID="CreateOrderError1"/>}
          {errorComplete && <InlineError message={errorComplete.message} fieldID="CompleteOrderError"/>}
        </FormLayout>
      </Form>
    </Card>
  )
}

export default CreateOrder
