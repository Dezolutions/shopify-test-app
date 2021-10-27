import { useMutation } from '@apollo/client'
import { Button, TextStyle, InlineError } from '@shopify/polaris'
import React from 'react'
import { CREATE_REFUND } from '../../graphql/mutations'
import styles from './orderitem.module.css'

const OrderItem = ({id,name,displayFulfillmentStatus,refundable}) => {
  
  const [refundCreate, {error}] = useMutation(CREATE_REFUND)
  const onSubmit = () => {
    refundCreate({variables: { input: {orderId: id}}})
  }

  return (
    <div className={styles.orderItem}>
      {error && <InlineError message={error.message} fieldID="orderItemError"/>}
      <TextStyle variation="strong">{name}</TextStyle>
      <TextStyle 
        variation={displayFulfillmentStatus == 'FULFILLED' ? 'positive' : 'negative'}>
          {displayFulfillmentStatus}
      </TextStyle>
      {refundable ? <Button onClick={onSubmit}>Refund</Button>: <p>refunded</p>}
      </div>
    
  )
}

export default OrderItem
