import React from 'react'
import { TextField,Button, Heading, Card} from '@shopify/polaris'
import {useMutation} from '@apollo/client'
import { UPDATE_PRODUCT } from '../../graphql/queries'

const ProductListItem = ({id,handle,title, variants}) => {
  
  //mutations
  const [productUpdate] = useMutation(UPDATE_PRODUCT)

  //states
  const [title1, setTitle] = React.useState(title)
  const [handle1, setHandle] = React.useState(handle)
  const [price1, setPrice] = React.useState(variants.edges[0].node.price)

  //handlers
  const handleTitle = React.useCallback(value => setTitle(value),[])
  const handleHandle = React.useCallback(value => setHandle(value),[])
  const handlePrice = React.useCallback(value => setPrice(value),[])

  
  const onSubmit = () => {
    productUpdate({variables: {
      input: {
        id: id,
        title: title1,
        handle: handle1,
        variants:{
          price: price1
        }
      }
    }})
  }
  

  return (
    <Card sectioned>
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
      <Button onClick={onSubmit} primary>Update</Button>
    </Card>
  )
}

export default ProductListItem
