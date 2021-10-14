import {  Heading,  Form, Button, FormLayout,TextField } from '@shopify/polaris'
import React from 'react'
import useStore from '../../store/store';
const CustomerInfo = () => {
  const [email, setEmail] = React.useState('');
  const handleEmailChange = React.useCallback(value => setEmail(value), []);
  const  setEmaill = useStore(state =>  state.setEmail)
  console.log('info render')
  const onSubmit = () => {
    setEmaill(email)
  }

  return (
    <>
      <Heading>Customer info</Heading>
      <Form onSubmit={onSubmit}>
        <FormLayout>
          <TextField
            value={email}
            label="Email"
            autoComplete="email"
            onChange={handleEmailChange}
            placeholder="Enter customer email please"
            type="email"
          />
          <Button submit primary>Find</Button>
        </FormLayout>
      </Form>
    </>   
  )
}

export default React.memo(CustomerInfo)
