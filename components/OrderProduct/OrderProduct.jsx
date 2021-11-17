import React from 'react'
import styles from './orderProduct.module.css'
import useStore from '../../store/store';
import { Button, TextStyle } from '@shopify/polaris';

const OrderProduct = ({id,title,variants, images}) => {

  //states
  const [count, setCount] = React.useState(1);  
  
  //handlers
  const onAdd = () => setCount(prev => prev + 1 > variants[0].inventoryQuantity ? prev : prev + 1)
  const onRemove = () => setCount(prev => prev - 1 == 0 ? prev : prev - 1)
  React.useEffect(() => setProduct({id:id, orderQuantity: count}),[count])
  
  //mutations
  const [setProduct, deleteProduct] = useStore(state => [state.setProduct, state.deleteProduct])

  //submit functions
  const onDeleteProduct = () => deleteProduct(id)

  return (
    <div className={styles.productItem}>
      <img className={styles.productImg} src={images[0].originalSrc} alt="" />
      <p>{title}</p>
      <Button onClick={onAdd}>+</Button>
      <TextStyle variation="positive" >{count}</TextStyle>
      <Button onClick={onRemove}>-</Button>
      <p>Available: {variants[0].inventoryQuantity}</p>
      <Button onClick={onDeleteProduct}>Delete</Button>
    </div>
  )
}

export default OrderProduct
