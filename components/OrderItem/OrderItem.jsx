import { useMutation } from '@apollo/client'
import { Button, TextStyle, InlineError, TextField } from '@shopify/polaris'
import React from 'react'
import { CREATE_REFUND, UPDATE_ORDER } from '../../graphql/mutations'
import { GET_ORDERS } from '../../graphql/queries'
import styles from './orderitem.module.css'

const OrderItem = ({id,name,refundable,email,netPaymentSet}) => {

  //states
  const [email1, setEmail1] = React.useState(email);
  
  //handlers
  const handleChange = React.useCallback((newValue) => setEmail1(newValue), []);
  
  //mutations
  const [refundCreate, {error}] = useMutation(CREATE_REFUND,{refetchQueries:[
    {query: GET_ORDERS}
  ]})
  const [orderUpdate, {error1}] = useMutation(UPDATE_ORDER,{refetchQueries:[
    {query: GET_ORDERS}
  ]})

  
  //submit funcitons
  const onSubmit = () => refundCreate({variables: { input: { 
    orderId: id,
    transactions: {
      amount: netPaymentSet.shopMoney.amount,
      gateway: "exchange-credit",
      kind: "REFUND",
      orderId: id
    }
  }}})
  const onUpdate = () => orderUpdate({variables: {input: {id:id, email: email1}}})

  return (
    <div className={styles.orderItem}>
      {error1 && <InlineError message={error1.message} fieldID="updateError"/>}
      {error && <InlineError message={error.message} fieldID="refundError"/>}
      <TextStyle variation="strong">{name}</TextStyle>
      <div>
        <TextField value={email1} autoComplete="off" type="email" onChange={handleChange} />
        <Button onClick={onUpdate} primary>Update</Button>
      </div>
      <TextStyle 
        variation={netPaymentSet.shopMoney.amount == 0 ? 'negative' : 'positive'}>
          {netPaymentSet.shopMoney.amount}$
      </TextStyle>
      {refundable ? <Button onClick={onSubmit}>Refund</Button>: <p>refunded</p>}
      </div>
    
  )
}

export default OrderItem
