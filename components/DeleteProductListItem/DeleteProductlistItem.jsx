import { Button, Heading, List } from '@shopify/polaris'
import React from 'react'

const DeleteProductlistItem = ({title, id}) => {
  return (
    <List.Item>
      <Heading>{title}</Heading>
      <Button>Delete product</Button>
    </List.Item>
  )
}

export default DeleteProductlistItem
