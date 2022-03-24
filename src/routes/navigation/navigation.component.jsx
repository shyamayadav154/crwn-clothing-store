import { Fragment,useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown-component';
import CartIcon from '../../components/cart-icon/ccart-icon.component';

import {UserContext } from '../../context/user.context.js'
import {CartContext} from '../../context/cart.context.js'
import {NavigationContainer , LogoContainer,NavLinks ,NavLink} from './navigation.styles.jsx';

const Navigation = () => {
  const {currentUser} = useContext(UserContext)
  const {isCartOpen} = useContext(CartContext)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink  to='/shop'>
            SHOP
          </NavLink>
          {currentUser ? (
            <span onClick={signOutUser} >
              Sign Out
            </span>
          ) : (
            <NavLink  to='/auth'>
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
};

export default Navigation;
