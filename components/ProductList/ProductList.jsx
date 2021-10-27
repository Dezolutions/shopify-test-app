import React from 'react'
import {useQuery} from '@apollo/client'
import { GET_PRODUCTS } from '../../graphql/queries';
import { Heading, List, Frame, Loading, InlineError } from '@shopify/polaris';
import ProductListItem from '../ProductListItem/ProductlistItem';

const ProductList = () => {

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  return (
    <>
      {loading && 
        <div style={{height: '100px'}}>
          <Frame>
            <Loading />
          </Frame>
        </div>
      }
      {error && <InlineError message={error.message} fieldID="ProductQueryError"/>}
      {data &&
      <>
        <Heading>Product list</Heading>
        <List>
          {data.products.edges.map((item) => <ProductListItem key={item.node.id} {...item.node}/>)}
        </List>
      </>}
    </>
  )
}

export default ProductList
