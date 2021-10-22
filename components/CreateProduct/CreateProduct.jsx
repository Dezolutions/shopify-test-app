import { useMutation } from '@apollo/client'
import { Button, Card, Form, FormLayout, Heading, TextField } from '@shopify/polaris'
import React from 'react'
import { CREATE_PRODUCT,GET_PRODUCTS } from '../../graphql/queries'

const CreateProduct = () => {

  //mutations
  const [productCreate] = useMutation(CREATE_PRODUCT,{refetchQueries:[
    {query: GET_PRODUCTS}
  ]})

  //states
  const [title, setTitle] = React.useState('')
  const [handle, setHandle] = React.useState('')
  const [price, setPrice] = React.useState(0)

  //handlers
  const handleTitle = React.useCallback(value => setTitle(value),[])
  const handleHandle = React.useCallback(value => setHandle(value),[])
  const handlePrice = React.useCallback(value => setPrice(value),[])
  
  //submit
  const onSubmit = () => {
    productCreate({variables: {
      input: {
        title: title,
        handle: handle,
        variants:{
          price: price
        }
      }
    }})
    setHandle('')
    setPrice(0)
    setTitle('')
  }

  return (
    <Card sectioned>
      <Heading>New product</Heading>
      <Form>
        <FormLayout>
          <TextField
            label="Title"
            value={title}
            type="text"
            onChange={handleTitle}  
          />
          <TextField
            label="Handle"
            value={handle}
            type="text"
            onChange={handleHandle}
          />
          <TextField
            label="Price"
            value={price}
            type="number"
            onChange={handlePrice}
          />
          <Button onClick={onSubmit} primary>Create product</Button>
        </FormLayout>
      </Form>
    </Card>
  )
}

export default CreateProduct
