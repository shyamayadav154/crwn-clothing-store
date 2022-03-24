import React,{useContext} from 'react'
import {CartDropdownContainer,EmptyMessage,CartItems} from './cart-dropdown.jsx'
import { useNavigate } from 'react-router-dom'
import Button from '../button/button.component'

import { CartContext } from '../../context/cart.context'
import CartItem from '../cart-items/cart-item.coponent'

const CartDropdown = () => {
    const navigate = useNavigate()
    const {cartItems} = useContext(CartContext)
    const goToCheckoutHandler=()=>{
        navigate('/checkout')
    }
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>go to checkout</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown