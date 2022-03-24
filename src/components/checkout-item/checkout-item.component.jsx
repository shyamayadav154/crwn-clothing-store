import React,{useContext} from 'react'
import './checkout-item.style.scss'

import { CartContext } from '../../context/cart.context'


const CheckoutItem = ({cartItem}) => {

    const {clearItemFromCart,addItemToCart,removeItemToCart} = useContext(CartContext)

    const clearCartHandler = () => clearItemFromCart(cartItem)
    const addItemHandler = () => addItemToCart(cartItem)
    const removeItemHandler = () => removeItemToCart(cartItem)

    const {name,imageUrl,price,quantity} = cartItem
  return (
    <div className="checkout-item-container">
        <div className="image-container">
            <img src={imageUrl} alt={`${name}`} />
        </div>
       <span className="name">{name}</span>
       <span className="quantity">
         <div onClick={removeItemHandler} className="arrow">
            &#10094;
         </div>
         <span className="value">{quantity}</span>
         <div onClick={addItemHandler} className="arrow">
      &#10095;
         </div>
       </span>
       <span className="price">${price}</span>
        <div onClick={clearCartHandler} className="remove-button">&#10005;</div>
    </div>
  )
}

export default CheckoutItem