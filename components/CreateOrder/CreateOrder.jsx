import { useMutation } from '@apollo/client'
import { Button, Form, FormLayout, Heading, InlineError, TextField } from '@shopify/polaris'
import React from 'react'
import { DRAFT_ORDER_CREATE } from '../../graphql/mutations'

const CreateOrder = () => {

  //states
  const [title, setTitle] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  
  //handlers
  const handleTitle = React.useCallback((newValue) => setTitle(newValue), []);
  const handleEmail = React.useCallback((newValue) => setEmail(newValue), []);
  const handlePrice = React.useCallback((newValue) => setPrice(newValue), []);
  const handleQuantity = React.useCallback((newValue) => setQuantity(newValue), []);

  //mutations
  const [draftOrderCreate, {error}] = useMutation(DRAFT_ORDER_CREATE)

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
    <Form onSubmit={onCreate}>
      <FormLayout>
        <Heading>Create draft order</Heading>
        <TextField label="Title of product" type="text" value={title} onChange={handleTitle}/>
        <TextField label="Email" type="email" value={email} onChange={handleEmail}/>
        <TextField label="Price" type="number" value={price} onChange={handlePrice}/>
        <TextField label="Quantity" type="number" value={quantity} onChange={handleQuantity}/>
        <Button submit primary>Create</Button>
        {error && <InlineError message={error.message} fieldID="CreateOrderError"/>}
      </FormLayout>
    </Form>
  )
}

export default CreateOrder
