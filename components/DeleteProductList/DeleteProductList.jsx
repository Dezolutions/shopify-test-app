import React from 'react'
import {useQuery} from '@apollo/client'
import { GET_PRODUCTS } from '../../graphql/queries';
import { Heading, List } from '@shopify/polaris';
import DeleteProductlistItem from '../DeleteProductListItem/DeleteProductlistItem';
import useStore from '../../store/store';

const DeleteProductList = () => {

  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [setProducts, products] = useStore(state=> [state.setProducts, state.products])


  React.useEffect(() => {
    setProducts(data?.products.edges)
  },[data])
  

  return (
    <>
      <Heading>Product list</Heading>
      <List>
        {products && products.map((item) => <DeleteProductlistItem key={item.node.id} {...item.node}/>)}
      </List>
    </>
  )
}

export default DeleteProductList
