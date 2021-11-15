import { useMutation } from '@apollo/client'
import { Button, Card, Form, FormLayout,Frame, Loading, Heading, TextField, InlineError } from '@shopify/polaris'
import React from 'react'
import { GET_PRODUCTS } from '../../graphql/queries'
import { CREATE_PRODUCT } from '../../graphql/mutations'

const CreateProduct = () => {

  //states
  const [title, setTitle] = React.useState('')
  const [handle, setHandle] = React.useState('')
  const [price, setPrice] = React.useState(0)
  const [createError, setCreateError] = React.useState('')

  //handlers
  const handleTitle = React.useCallback(value => setTitle(value),[])
  const handleHandle = React.useCallback(value => setHandle(value),[])
  const handlePrice = React.useCallback(value => setPrice(value),[])

  //mutations
  const [productCreate, {error, loading}] = useMutation(CREATE_PRODUCT,{
    refetchQueries:[
      {query: GET_PRODUCTS}
    ],
    onCompleted: data => {
      if(data.productCreate.userErrors[0]?.message){
        setCreateError(data.productCreate.userErrors[0].message)
      }
      else{
        setHandle('')
        setPrice(0)
        setTitle('')
        setCreateError('')
      }
    }
  })
  
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
  }

  return (
    <>
      {loading && 
        <div style={{height: '1px'}}>
          <Frame>
            <Loading />
          </Frame>
        </div>
      }
      <Card sectioned>
      {error && <InlineError message={error.message} fieldID="createPoductError"/>}
      {createError && <InlineError message={createError} fieldID="createPoductError"/>}
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
    </>
  )
}

export default CreateProduct
