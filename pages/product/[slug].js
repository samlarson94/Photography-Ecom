import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/stateContext';


const ProductDetails = ({ product, products }) => {
    // Destructure values received from product and products
    const { image, name, details, price } = product;

    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        //Call onAdd function to add product and qty to cart
        onAdd(product, qty);
        //Call setShowCart to be true to display cart
        setShowCart(true);
    }

    return (
    <div>
        <div className="product-detail-container">
            <div>
                <div className="image-container">
                    <img className="product-detail-image" src={urlFor(image && image[index])} />
                </div>
                
                <div className="small-images-container">
                    {image?.map((item, i) => (
                        <img
                        key={i}
                        src={urlFor(item)}
                        // Adding dynamic className to control image sizing via CSS classes based on what photo has been selected. 
                        className={i === index ? 'small-image selected-image' : 'small-image'}
                        // {/* Adding function to onMouseEnter to set image index to the photo selected.  */}
                        onMouseEnter={() => setIndex(i)}
                        />
                    ))}
                </div>
            </div>
            <div className="product-detail-desc">
                <h1>{name}</h1>
                <div className="reviews">
                    <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    </div>
                    <p>(20)</p>
                </div>
                <h4>Details: </h4>
                <p>{details}</p>
                <p className='price'>${price}</p>
                <div className="quantity">
                    <h3>Quantity: </h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decQty}> <AiOutlineMinus /> </span>
                        <span className='num'>{qty}</span>
                        <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
                    </p>
                </div>
                <div className="buttons">
                    <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
                    <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                </div>
            </div>
        </div>
        <div className='maylike-products-wrapper'>
            <h2>You May Also Like...</h2>
            <div className="marquee">
                <div className="maylike-products-container track">
                    {products.map((item) => (
                        <Product key={item._id} product={item} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

// Add getStaticPaths function to get information for all products but only return the current slug 
export const getStaticPaths = async () => {
    // Revise query to filter for slug
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;
    // New products constant
    const products = await client.fetch(query);
    // Add paths constant to hold product object
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));
    // Return paths and a fallback value
    return {
        paths, 
        fallback: 'blocking'
    }
}

//ReFactoring getServerSideProps to get static props and render user's requests
    //Use Next.js getStaticProps
export const getStaticProps = async ({ params: { slug } }) => {
    // Refactor query to look at all products and grab the first one that matches the selected slug.
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    // Add query to grab similar products
    const productsQuery = '*[_type == "product"]'

    // Create product constant to save result of query
    const product = await client.fetch(query);
    // Create products constant to save result of productsQuery
    const products = await client.fetch(productsQuery);

    console.log(product);
  
    //Return product and products as props and insert as parameters into ProductDetails.
    return {
      props: { products, product } 
    }
  
  }

export default ProductDetails