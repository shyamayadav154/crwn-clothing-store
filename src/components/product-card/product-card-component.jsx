import './product-card.style.scss'
import {useContext} from 'react'
import { CartContext } from '../../context/cart.context'
import React from 'react'
import Button,{BUTTON_TYPE_CLASSES} from '../button/button.component'

const ProductCard = ({product}) => {

    const {name,price,imageUrl} = product
    const {addItemToCart}= useContext(CartContext)
    const addProductCart = () => addItemToCart(product)
  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductCart}>
        Add to cart
      </Button>
    </div>
  )
}

export default ProductCard