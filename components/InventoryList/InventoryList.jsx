import React from 'react'
import {useQuery} from '@apollo/client'
import { GET_INVENTORY } from '../../graphql/queries'
import { Card, ResourceList, ResourceItem, Heading, InlineError, Frame, Loading } from '@shopify/polaris'
import InventoryItem from '../InventoryItem/InventoryItem'

const InventoryList = () => {

  const {data,error, loading} = useQuery(GET_INVENTORY)

  return (
    <>
      {loading && 
        <div style={{height: '1px'}}>
          <Frame>
            <Loading />
          </Frame>
        </div>
      }
      {error && <InlineError message={error.message} fieldID="InventoryQueryError"/>}
      <Heading>Inventory list</Heading>
      {data &&
      <Card>
        {<ResourceList
          resourceName={{singular: 'order', plural: 'orders'}}
          items={data?.inventoryItems.edges}
          renderItem={(item) => {
            return (
              <ResourceItem id={item.node.id}><InventoryItem {...item.node}/> </ResourceItem>
            );
          }}
        
        />}
      </Card>}
    </>
  )
}

export default InventoryList
