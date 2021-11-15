import { useMutation } from '@apollo/client'
import { Button, Card, Form, FormLayout, Heading, InlineError, TextField, Frame, Loading } from '@shopify/polaris'
import React from 'react'
import { DRAFT_ORDER_COMPLETE, DRAFT_ORDER_CREATE } from '../../graphql/mutations'
import { GET_ORDERS } from '../../graphql/queries'

const CreateOrder = () => {

  //states
  const [title, setTitle] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const [createError, setCreateError] = React.useState('');
  
  //handlers
  const handleTitle = React.useCallback((newValue) => setTitle(newValue), []);
  const handleEmail = React.useCallback((newValue) => setEmail(newValue), []);
  const handlePrice = React.useCallback((newValue) => setPrice(newValue), []);
  const handleQuantity = React.useCallback((newValue) => setQuantity(newValue), []);

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
        setTitle('')
        setEmail('')
        setPrice('')
        setQuantity(0)
        setCreateError('')
      } 
        
    }
  })

  //submit functions
  const onCreate = () => {
    draftOrderCreate({
      variables: {
        input : {
          email: email, 
          lineItems: { title: title, quantity: +quantity, originalUnitPrice: price }
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
          <TextField label="Title of product" type="text" value={title} onChange={handleTitle}/>
          <TextField label="Email" type="email" value={email} onChange={handleEmail}/>
          <TextField label="Price" type="number" value={price} onChange={handlePrice}/>
          <TextField label="Quantity" type="number" value={quantity} onChange={handleQuantity}/>
          <Button submit primary>Create</Button>
          {error && <InlineError message={error.message} fieldID="CreateOrderError"/>}
          {createError && <InlineError message={createError} fieldID="CreateOrderError1"/>}
          {errorComplete && <InlineError message={errorComplete.message} fieldID="CompleteOrderError"/>}
        </FormLayout>
      </Form>
    </Card>
  )
}

export default CreateOrder
