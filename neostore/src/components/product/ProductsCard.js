// NEw Card with loading
import React from 'react';
import { Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'

const baseurl = "http://180.149.241.208:3022/"

const ProductsCard = ({ products, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {products.map(product => (
        <div key={product.id} className='col-md-4'>
            <div className='cards'>
                <img className={'cardimage'} src={`${baseurl}`+product.product_image} alt="Card Images"/>
                <label><Link to={'/productdetail/' + product.product_id} style={{color:"#3368bb"}}>{product.product_name}</Link></label>
                <div className="justify-content-center">
                    <label><strong>Rs. {product.product_cost}</strong></label><br/>
                    <button className="btn-add">Add to Cart</button><br/>
                    <Rating name="" precision="0.5" value={product.product_rating} disabled />
                </div>
            </div>
        </div>
      ))}
    </>
  );
};

export default ProductsCard
