import React from 'react'
import {useQuery} from '@apollo/client'
import { GET_CUSTOMER } from '../../graphql/queries';
import useStore from '../../store/store';
import CustomerAddress from '../CustomerAddress/CustomerAddress'
import { Button, DisplayText, Form, TextField } from '@shopify/polaris';

const CustomerInfo = () => {

  const emailData = useStore(state => state.email)
  const { loading, error, data } = useQuery(GET_CUSTOMER, {variables:{email: emailData}});
  const [name, setName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [number, setNumber] = React.useState('')
  
  React.useEffect(() => {
    setName(data?.customers.edges[0].node.firstName)
    setLastName(data?.customers.edges[0].node.lastName)
    setEmail(data?.customers.edges[0].node.email)
    setNumber(data?.customers.edges[0].node.phone)
  },[data])

  const handleName = React.useCallback((value) => setName(value),[]);
  const handleLastName = React.useCallback((value) => setLastName(value),[]);
  const handleEmail = React.useCallback((value) => setEmail(value),[]);
  const handleNumber = React.useCallback((value) => setNumber(value),[]);

  return (
    <>
    <DisplayText size="small">Result:</DisplayText>
      <Form>
        {data && <>
          <TextField
            value={name}
            label="Name"
            onChange={handleName}
            placeholder="Enter customer name please"
            type="text"
          />
          <TextField
            value={lastName}
            label="LastName"
            onChange={handleLastName}
            placeholder="Enter customer lastname please"
            type="text"
          />
          <TextField
            value={email}
            label="Email"
            onChange={handleEmail}
            placeholder="Enter customer email please"
            type="email"
          />
          <TextField
            value={number}
            label="Phone"
            onChange={handleNumber}
            placeholder="Enter customer phone please"
            type="text"
          />
          <Button primary>Update</Button>
          <DisplayText size="small">Addresses:</DisplayText>

          {data.customers.edges[0].node.addresses.map(item => 
            <CustomerAddress key={item.id} {...item}/>
          )}
          
        </>}
      </Form>
    </>
  )
}

export default React.memo(CustomerInfo)
