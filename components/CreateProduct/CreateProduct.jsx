import { useMutation } from '@apollo/client'
import { Button, Card, Form, FormLayout, Heading, TextField } from '@shopify/polaris'
import React from 'react'
import { CREATE_PRODUCT } from '../../graphql/queries'

const CreateProduct = () => {

  const [productCreate] = useMutation(CREATE_PRODUCT)
  //states
  const [title, setTitle] = React.useState('')
  const [handle, setHandle] = React.useState('')
  const [price, setPrice] = React.useState('')
  //handlers
  const handleTitle = React.useCallback(value => setTitle(value),[])
  const handleHandle = React.useCallback(value => setHandle(value),[])
  const handlePrice = React.useCallback(value => setPrice(value),[])

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
  }

  return (
    <Card sectioned>
      <Heading>New product</Heading>
      <Form>
        <FormLayout>
          <TextField
            label="Title"
            value={title}
            onChange={handleTitle}  
          />
          <TextField
            label="Handle"
            value={handle}
            onChange={handleHandle}
          />
          <TextField
            label="Price"
            value={price}
            onChange={handlePrice}
          />
          <Button onClick={onSubmit} primary>Create product</Button>
        </FormLayout>
      </Form>
    </Card>
  )
}

export default CreateProduct
