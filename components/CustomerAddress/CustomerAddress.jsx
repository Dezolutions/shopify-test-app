import { Button,TextField } from '@shopify/polaris'
import React from 'react'
import {useMutation} from '@apollo/client'
import { UPDATE_CUSTOMER_ADDRESS } from '../../graphql/queries'
const CustomerAddress = ({city,address1, address2, country, id,customerId}) => {
  
  //states
  const [address1State, setAddress1] = React.useState(address1)
  const [address2State, setAddress2] = React.useState(address2)
  const [cityState, setCity] = React.useState(city)
  const [countryState, setCountry] = React.useState(country)

  //state handlers
  const handleAddress1 = React.useCallback((value) => setAddress1(value),[]);
  const handleAddress2 = React.useCallback((value) => setAddress2(value),[]);
  const handleCity = React.useCallback((value) => setCity(value),[]);
  const handleCountry = React.useCallback((value) => setCountry(value),[]);
  
  const [customerUpdateAddress] = useMutation(UPDATE_CUSTOMER_ADDRESS)

  const onSubmit = () => {
    customerUpdateAddress({variables: 
      {input:
        {
          id: customerId,
          addresses: 
          { id: id,
            address1: address1State,
            address2: address2State,
            city: cityState,
            country: countryState
          }
        }
      }
    })
  }

  return (
    <div>
      <TextField
        value={address1State}
        label="Address1"
        onChange={handleAddress1}
        placeholder="Enter customer address1 please"
        type="text"
      />
      <TextField
        value={address2State}
        label="Address2"
        onChange={handleAddress2}
        placeholder="Enter customer address2 please"
        type="text"
      />
      <TextField
        value={cityState}
        label="City"
        onChange={handleCity}
        placeholder="Enter customer city please"
        type="text"
      />
      <TextField
        value={countryState}
        label="Country"
        onChange={handleCountry}
        placeholder="Enter customer country please"
        type="text"
      />
      <Button onClick={onSubmit} primary>Update Adress</Button>
    </div>
  )
}

export default React.memo(CustomerAddress)
