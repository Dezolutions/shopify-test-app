import { useMutation } from '@apollo/client'
import { Button, TextStyle, InlineError, Frame, Loading } from '@shopify/polaris'
import React from 'react'
import { GET_INVENTORY } from '../../graphql/queries'
import { CHANGE_INVENTORY_ITEM_QUANTITY, UPDATE_INVENTORY } from '../../graphql/mutations'
import styles from './inventoryItem.module.css'

const InventoryItem = ({id,sku,tracked, inventoryLevels,variant}) => {

  //states
  const [count, setCount] = React.useState(variant.inventoryQuantity)

  //handlers
  const onUp = () => setCount(prev => prev + 1)
  const onDown = () => setCount(prev => prev - 1)

  //mutations
  const [inventoryItemUpdate,{error, loading}]=useMutation(UPDATE_INVENTORY,{refetchQueries:[
    {query: GET_INVENTORY}
  ]})
  const [inventoryAdjustQuantity,{loading: quantityLoading}] = useMutation(CHANGE_INVENTORY_ITEM_QUANTITY,{refetchQueries:[
    {query: GET_INVENTORY}
  ]})

  //submit functions
  const onTrack = () => inventoryItemUpdate({variables:{id:id, input:{tracked: true}}})
  const onUntrack = () => inventoryItemUpdate({variables:{id:id, input:{tracked: false}}})
  const onChange = () => inventoryAdjustQuantity({variables:{input:{availableDelta: count, inventoryLevelId: inventoryLevels.edges[0].node.id}}})
  return (
    <div>
      {(loading || quantityLoading) && 
        <div style={{height: '1px'}}>
          <Frame>
            <Loading />
          </Frame>
        </div>
      }
      {error && <InlineError message={error.message} fieldID="customerInfoError"/>}
      <p><TextStyle variation="strong">ID: </TextStyle>{id}</p>
      <p><TextStyle variation="strong">SKU: </TextStyle>{sku}</p>
      {tracked &&
      <>
        <p><TextStyle variation="strong">Quantity: </TextStyle>{variant.inventoryQuantity}</p>
        <div className={styles.counter}>
          <Button onClick={onUp}>+</Button>
          <p className={styles.counterText}><TextStyle variation={count > 0 ? 'positive' : 'negative'}>{count}</TextStyle></p>
          <Button onClick={onDown}>-</Button>
        </div>
        <Button onClick={onChange}>{count > 0 ? 'Add' : 'Remove'} quantity</Button>
      </>}
      {tracked 
        ? <div className={styles.btn}><Button primary onClick={onUntrack}>Untrack quantity</Button></div>
        : <Button primary onClick={onTrack}>Track quantity</Button>}
    </div>
  )
}

export default InventoryItem
