import {  Heading,  Form, Button, FormLayout,TextField, Card } from '@shopify/polaris'
import React from 'react'
import useStore from '../../store/store';

const CustomerInfo = () => {
  //states
  const [email, setEmail] = React.useState('');
  
  //handlers
  const handleEmailChange = React.useCallback(value => setEmail(value), []);

  //store actions
  const  setEmaill = useStore(state =>  state.setEmail)
  
  //functions
  const onSubmit = () => {
    setEmaill(email)
  }

  return (
    <Card sectioned>
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
    </Card>   
  )
}

export default React.memo(CustomerInfo)
