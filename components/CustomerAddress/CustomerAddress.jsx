import { Button,TextField } from '@shopify/polaris'
import React from 'react'

const CustomerAddress = () => {

  const [address1, setAddress1] = React.useState('')
  const [address2, setAddress2] = React.useState('')
  const [city, setCity] = React.useState('')
  const [country, setCountry] = React.useState('')
  const handleAddress1 = React.useCallback((value) => setAddress1(value),[]);
  const handleAddress2 = React.useCallback((value) => setAddress2(value),[]);
  const handleCity = React.useCallback((value) => setCity(value),[]);
  const handleCountry = React.useCallback((value) => setCountry(value),[]);
  
  return (
    <div>
      <TextField
        value={address1}
        label="Address1"
        onChange={handleAddress1}
        placeholder="Enter customer address1 please"
        type="text"
      />
      <TextField
        value={address2}
        label="Address2"
        onChange={handleAddress2}
        placeholder="Enter customer address2 please"
        type="text"
      />
      <TextField
        value={city}
        label="City"
        onChange={handleCity}
        placeholder="Enter customer city please"
        type="text"
      />
      <TextField
        value={country}
        label="Country"
        onChange={handleCountry}
        placeholder="Enter customer country please"
        type="text"
      />
      <Button primary>Update Adress</Button>
    </div>
  )
}

export default CustomerAddress
