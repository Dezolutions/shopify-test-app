import React from 'react'
import {useQuery} from '@apollo/client'
import { GET_ORDERS } from '../../graphql/queries'
import { Card, ResourceList, ResourceItem, Heading, InlineError, Frame, Loading } from '@shopify/polaris'
import OrderItem from '../OrderItem/OrderItem'

const OrderList = () => {

  const {data,error, loading} = useQuery(GET_ORDERS)
  
  return (
    <>
      {loading && 
        <div style={{height: '100px'}}>
          <Frame>
            <Loading />
          </Frame>
        </div>
      }
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
