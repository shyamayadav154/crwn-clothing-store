import React,{useContext} from 'react'

import {ShoppingIcon,ItemCount,CartIconContainer}  from './cart-icon.style.jsx'


import { CartContext } from '../../context/cart.context'

const CartIcon = () => {
    const {isCartOpen,setIsCartOpen,cartCount} = useContext(CartContext)

    const toggleIsCartOpen = ()=> setIsCartOpen(!isCartOpen)
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon />
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon