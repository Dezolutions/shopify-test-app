import { useMutation } from '@apollo/client'
import { Button, Heading, InlineError, TextField } from '@shopify/polaris'
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
    <div>
      <Heading>Create order</Heading>
      {error && <InlineError message={error.message} fieldID="CreateOrderError"/>}
      <TextField label="Title of product" type="text" value={title} onChange={handleTitle}/>
      <TextField label="Email" type="email" value={email} onChange={handleEmail}/>
      <TextField label="Price" type="number" value={price} onChange={handlePrice}/>
      <TextField label="Quantity" type="number" value={quantity} onChange={handleQuantity}/>
      <Button onClick={onCreate}>Create</Button>
    </div>
  )
}

export default CreateOrder
