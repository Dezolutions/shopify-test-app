import React from 'react'
import {useQuery, useMutation} from '@apollo/client'
import { GET_CUSTOMER  } from '../../graphql/queries';
import { UPDATE_CUSTOMER_INFO } from '../../graphql/mutations'
import useStore from '../../store/store';
import CustomerAddress from '../CustomerAddress/CustomerAddress'
import { Button, DisplayText, Form, TextField, Frame,Loading, InlineError } from '@shopify/polaris';

const CustomerInfo = () => {

  //get email for query
  const emailData = useStore(state => state.email)

  //queries and mutations
  const { loading, error, data } = useQuery(GET_CUSTOMER, {variables:{email: emailData}});
  const [customerUpdate, { error:mutationError }] = useMutation(UPDATE_CUSTOMER_INFO)

  //states
  const customerId = data?.customers.edges[0].node.id || ''
  const [name, setName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [number, setNumber] = React.useState('')

  

  //submit functions
  const onSubmit = () => {
    customerUpdate({variables: {input:{id: customerId,firstName: name, lastName: lastName, email: email, phone: number}}})
  }

  //change state by received data
  React.useEffect(() => {
    setName(data?.customers.edges[0].node.firstName)
    setLastName(data?.customers.edges[0].node.lastName)
    setEmail(data?.customers.edges[0].node.email)
    setNumber(data?.customers.edges[0].node.phone)
  },[data])

  //state handlers
  const handleName = React.useCallback((value) => setName(value),[]);
  const handleLastName = React.useCallback((value) => setLastName(value),[]);
  const handleEmail = React.useCallback((value) => setEmail(value),[]);
  const handleNumber = React.useCallback((value) => setNumber(value),[]);

  return (
    <>
      {loading && 
        <div style={{height: '100px'}}>
          <Frame>
            <Loading />
          </Frame>
        </div>
      }
      {error && <InlineError message={error.message} fieldID="customerQueryInfoError"/>}
      {mutationError && <InlineError message={mutationError.message} fieldID="customerMutInfoError"/>}
      {data &&
      <>
        <DisplayText size="small">Result:</DisplayText>
        <Form>
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
          <Button onClick={onSubmit} primary>Update</Button>
          <DisplayText size="small">Addresses:</DisplayText>
          {data.customers.edges[0].node.addresses.map(item => 
            <CustomerAddress key={item.id} customerId={customerId} {...item}/>
          )}
        </Form>
      </>}
    </>
  )
}

export default React.memo(CustomerInfo)
