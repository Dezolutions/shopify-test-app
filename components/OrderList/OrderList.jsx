import React from 'react'
import {useQuery} from '@apollo/client'
import { GET_ORDERS } from '../../graphql/queries'
import { Card, ResourceList, ResourceItem, Heading } from '@shopify/polaris'
import OrderItem from '../OrderItem/OrderItem'

const OrderList = () => {

  const {data,error} = useQuery(GET_ORDERS)

  return (
    <>
      <Heading>Order list</Heading>
      {error && <InlineError message={error.message} fieldID="OrderQueryError"/>}
      {data &&
      <Card>
        {<ResourceList
          resourceName={{singular: 'order', plural: 'orders'}}
          items={data?.orders.edges}
          renderItem={(item) => {
            return (
              <ResourceItem id={item.node.id}><OrderItem {...item.node}/> </ResourceItem>
            );
          }}
        
        />}
      </Card>}
    </>
  )
}

export default OrderList
