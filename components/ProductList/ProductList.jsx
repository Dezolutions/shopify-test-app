import React from 'react'
import {useQuery } from '@apollo/client'
import { GET_PRODUCTS_BY_ID } from '../../graphql/queries';
import useStore from '../../store/store'
import { Card, Frame, ResourceItem, ResourceList,Loading, InlineError } from '@shopify/polaris';
import ProductListItem from '../ProductListItem/ProductListItem';


const ProductList = () => {
  
  const ids = useStore(state => state.ids)
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_ID, {variables: {ids: ids}});

  return (
    <>
      {loading && 
        <div style={{height: '100px'}}>
          <Frame>
            <Loading />
          </Frame>
        </div>
      }
      {error && <InlineError message={error.message} fieldID="error1"/>}
      {data && 
        <ResourceList
          resourceName={{singular: 'product', plural: 'products'}}
          items={data.nodes}
          renderItem={(item) => <ResourceItem><ProductListItem {...item}/></ResourceItem >
          }
        />
      }
    </>
  )
}

export default ProductList
