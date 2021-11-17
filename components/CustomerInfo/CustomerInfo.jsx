import React from 'react'
import {useQuery, useMutation} from '@apollo/client'
import { GET_CUSTOMER  } from '../../graphql/queries';
import { UPDATE_CUSTOMER_INFO } from '../../graphql/mutations'
import useStore from '../../store/store';
import CustomerAddress from '../CustomerAddress/CustomerAddress'
import { Button, DisplayText, Form, TextField, Frame,Loading, InlineError, Card } from '@shopify/polaris';

const CustomerInfo = () => {

   //states
   const [customerId, setCustomerId] = React.useState('')
   const [name, setName] = React.useState('')
   const [lastName, setLastName] = React.useState('')
   const [email, setEmail] = React.useState('')
   const [number, setNumber] = React.useState('')
   const [infoError, setInfoError] = React.useState('')

  //get email for query
  const emailData = useStore(state => state.email)

  //queries and mutations
  const { loading, error, data } = useQuery(GET_CUSTOMER, {
    variables:{email: emailData},
    onCompleted: data => {
      if(data.customers.edges.length != 0){
        setInfoError('')
      }
      else{
        setInfoError('There is no customer with this email')
      }
    }
  });
  const [customerUpdate, { error:mutationError, loading: updateLoading }] = useMutation(UPDATE_CUSTOMER_INFO)

  //submit functions
  const onSubmit = () => {
    customerUpdate({variables: {input:{id: customerId,firstName: name, lastName: lastName, email: email, phone: number}}})
  }

  //change state by received data
  React.useEffect(() => {
    setCustomerId(data?.customers.edges[0]?.node.id)
    setName(data?.customers.edges[0]?.node.firstName)
    setLastName(data?.customers.edges[0]?.node.lastName)
    setEmail(data?.customers.edges[0]?.node.email)
    setNumber(data?.customers.edges[0]?.node.phone)
  },[data])

  //state handlers
  const handleName = React.useCallback((value) => setName(value),[]);
  const handleLastName = React.useCallback((value) => setLastName(value),[]);
  const handleEmail = React.useCallback((value) => setEmail(value),[]);
  const handleNumber = React.useCallback((value) => setNumber(value),[]);

  return (
    <>
      {(loading || updateLoading) && 
        <div style={{height: '1px'}}>
          <Frame>
            <Loading />
          </Frame>
        </div>
      }
      {infoError && <InlineError message={infoError} fieldID="customerInfoError"/>}
      {error && <InlineError message={error.message} fieldID="customerQueryInfoError"/>}
      {mutationError && <InlineError message={mutationError.message} fieldID="customerMutInfoError"/>}
      {data?.customers.edges[0]?.node &&
        <>
          <Card sectioned>
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
            </Form>
          </Card>
          <Card sectioned>
            <DisplayText size="small">Addresses:</DisplayText>
                {data.customers.edges[0].node.addresses.map(item => 
                  <CustomerAddress key={item.id} customerId={customerId} {...item}/>
                )}
          </Card>
        </>     
      }
    </>
  )
}

export default React.memo(CustomerInfo)
