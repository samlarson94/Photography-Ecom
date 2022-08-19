import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/stateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    // Clear current states as soon as page is loaded
    useEffect(() => {
      //Clear Local Storage, cartItems, totalPrice, totalQuantities
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks();
    }, [])


  return (
    <div className="success-wrapper">
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill />
            </p>
            <h2>Thank you for your order!</h2>
            <br></br>
            <p className='email-msg'>Check your email inbox for the receipt.</p>
            <p className='description'>
              If you have any questions, please email&nbsp;
              <a classname="email" href="mailto:orderhelp@placefiller.com">order@speakercity.com</a>
            </p>
            <Link href="/">
              <button type="button" width="300px" className='btn'>Continue Shopping</button>
            </Link>
        </div>
        
    </div>
  )
}

export default Success;