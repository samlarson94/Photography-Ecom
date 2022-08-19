import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

import { Cart } from './';
import { useStateContext } from '../context/stateContext';

import { urlFor } from '../lib/client'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          {/* <img src='ecommerce-sanity-app/styles/assets/Speaker City Logo Red.png' height="20px" width="20px"/> */}
          <p>Speaker City</p>
        </Link>
      </p>
      {/* <img className="logo-img" src='#' alt="Speaker City Logo" /> */}
      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-itm-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar