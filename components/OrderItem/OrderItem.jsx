import { useMutation } from '@apollo/client'
import { Button, TextStyle, InlineError, TextField, Frame, Loading } from '@shopify/polaris'
import React from 'react'
import { CREATE_REFUND, UPDATE_ORDER } from '../../graphql/mutations'
import { GET_ORDERS } from '../../graphql/queries'
import styles from './orderitem.module.css'

const OrderItem = ({id,name,refundable,email,netPaymentSet}) => {

  //states
  const [emailData, setEmailData] = React.useState(email);
  
  //handlers
  const handleChange = React.useCallback((newValue) => setEmailData(newValue), []);
  
  //mutations
  const [refundCreate, {error: deleteError, loading:deleteLoading}] = useMutation(CREATE_REFUND,{refetchQueries:[
    {query: GET_ORDERS}
  ]})
  const [orderUpdate, {error: updateError, loading:updateLoading}] = useMutation(UPDATE_ORDER,{refetchQueries:[
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
  const onUpdate = () => orderUpdate({variables: {input: {id:id, email: emailData}}})

  return (
    <>
      {(deleteLoading || updateLoading) && 
        <div style={{height: '1px'}}>
          <Frame>
            <Loading />
          </Frame>
        </div>
      }
      {deleteError && <InlineError message={deleteError.message} fieldID="updateError"/>}
      {updateError && <InlineError message={updateError.message} fieldID="refundError"/>}
      <div className={styles.orderItem}>
        <TextStyle variation="strong">{name}</TextStyle>
        <div>
          <TextField value={emailData} autoComplete="off" type="email" onChange={handleChange} />
          <Button onClick={onUpdate} primary>Update</Button>
        </div>
        <TextStyle 
          variation={netPaymentSet.shopMoney.amount == 0 ? 'negative' : 'positive'}>
            {netPaymentSet.shopMoney.amount}$
        </TextStyle>
        {refundable ? <Button onClick={onSubmit}>Refund</Button>: <p>refunded</p>}
      </div>
    </>
  )
}

export default OrderItem
