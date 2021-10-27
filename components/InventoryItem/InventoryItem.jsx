import { useMutation } from '@apollo/client'
import { Button, TextStyle, InlineError } from '@shopify/polaris'
import React from 'react'
import { GET_INVENTORY } from '../../graphql/queries'
import { UPDATE_INVENTORY } from '../../graphql/mutations'

const InventoryItem = ({id,sku,tracked}) => {

  //mutations
  const [inventoryItemUpdate,{error}]=useMutation(UPDATE_INVENTORY,{refetchQueries:[
    {query: GET_INVENTORY}
  ]})

  //submit functions
  const onUpdate = () => inventoryItemUpdate({variables:{id:id, input:{tracked: true}}})
  
  return (
    <div>
      {error && <InlineError message={error.message} fieldID="customerInfoError"/>}
      <TextStyle>{id}</TextStyle>
      <p><TextStyle variation="strong">SKU:</TextStyle>{sku}</p>
      {tracked 
        ? <TextStyle variation="strong" >tracked</TextStyle>
        : <Button onClick={onUpdate}>track</Button>}
    </div>
  )
}

export default InventoryItem
