import React from 'react'
import { TextField,Button, Heading, Card, InlineError, Frame, Loading} from '@shopify/polaris'
import {useMutation} from '@apollo/client'
import { GET_PRODUCTS } from '../../graphql/queries'
import { UPDATE_PRODUCT,DELETE_PRODUCT } from '../../graphql/mutations'

const ProductListItem = ({id,handle,title, variants}) => {
  
  //states
  const [title1, setTitle] = React.useState(title)
  const [handle1, setHandle] = React.useState(handle)
  const [price1, setPrice] = React.useState(variants.edges[0].node.price)
  const [updateError, setUpdateError] = React.useState('')

  //handlers
  const handleTitle = React.useCallback(value => setTitle(value),[])
  const handleHandle = React.useCallback(value => setHandle(value),[])
  const handlePrice = React.useCallback(value => setPrice(value),[])

  //mutations
  const [productUpdate, {loading:updateLoading}] = useMutation(UPDATE_PRODUCT,{
    refetchQueries:[
      {query: GET_PRODUCTS}
    ],
    onCompleted: data => {
      if(data.productUpdate.userErrors[0]?.message){
        setUpdateError(data.productUpdate.userErrors[0].message)
      }
      else{
        setUpdateError('')
      }
    }
  });
  const [productDelete, {error:deleteError, loading:deleteLoading}] = useMutation(DELETE_PRODUCT,{refetchQueries:[
    {query: GET_PRODUCTS}
  ]});


  //submit functions
  const onSubmit = () => {
    productUpdate({variables: {
      input: {
        id: id,
        title: title1,
        handle: handle1,
        variants:{
          price: +price1
        }
      }
    }})
  }
  const onDeleteSubmit = () => productDelete({variables: {input: {id: id}}});
  

  return (
    <>
      {(deleteLoading || updateLoading) && 
        <div style={{height: '1px'}}>
          <Frame>
            <Loading />
          </Frame>
        </div>
      }
      <Card sectioned>
      {deleteError && <InlineError message={deleteError.message} fieldID="deleteProductError"/>}
      {updateError && <InlineError message={updateError} fieldID="updateProductError"/>}
        <Heading>{title}</Heading>
        <TextField 
          type="text" 
          placeholder="Enter a title please" 
          label="Title" 
          value={title1}
          onChange={handleTitle}
        />
        <TextField 
          type="text" 
          placeholder="Enter a handle please" 
          label="Handle" 
          value={handle1}
          onChange={handleHandle}
        />
        <TextField 
          type="number" 
          placeholder="Enter a price please" 
          label="Price $" 
          value={price1}
          onChange={handlePrice}
        />
        <Button onClick={onSubmit} >Update</Button>
        <Button onClick={onDeleteSubmit} primary >Delete</Button>
      </Card>
    </>
  )
}

export default ProductListItem
