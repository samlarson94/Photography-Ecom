import React from 'react';
import Link from 'next/link';

// Import necessary urlFor const from lib/client
import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        {/* DEV NOTE: All CAPITAL text will be dynamic data fed from Sanity */}
        {/* <p className='beats-solo'>{heroBanner.smallText}</p> */}
        <h1>{heroBanner.largeText1}</h1>
        <h1>{heroBanner.largeText2}</h1>
        {/* Make sure to import urlFor from lib/client */}
        <img src={urlFor(heroBanner.image)} alt="headphones" className='hero-banner-image'></img>

        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className='desc'>
            <h5>{heroBanner.desc}</h5>
            <p>The top-rated headphones on the market!</p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default HeroBanner