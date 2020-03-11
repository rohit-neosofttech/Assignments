import React, {useState}  from 'react';
import { Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'
import * as api from '../../api'
import {addToCartCount} from '../redux'
import {connect} from 'react-redux'

import SnackAlert from '../SnackAlert'
// import Loading from 'react-fullscreen-loading';

function ProductsCard (props) {
  // function ProductsCard ({ products, loading, error }) {

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [type, setType] = React.useState('');

  // if (loading) {
  //   return <Loading loading loaderColor="#3498db" />;
  // }

  const addToCart = (product) => {
    let oldCart = JSON.parse(localStorage.getItem('cart')) 
    if (oldCart===null) {
        oldCart=[]
    }

    let newItem = product
        newItem['quantity'] = 1;
        newItem['total'] = product.quantity * product.product_cost

    let item=oldCart.filter(item => item.product_id===newItem.product_id)
    if(item.length===0) {
        oldCart.push(newItem);
        localStorage.setItem('cart',JSON.stringify(oldCart))
        setType('success')
        setMessage("Product Added to Cart")
        setOpen(true);
        props.addToCartCount()
    }
    else{
        setType('warning')
        setMessage("Product already present in cart")
        setOpen(true);
    }
}

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {props.products.map(product => (
        <div className='col-sm-4' key={product.product_id} >
          <div className='cards'spinnerFlag='true' >
            <img className={'cardimage'} src={`${api.baseurl}/`+product.product_image} alt="Card Images"/>
            <label><Link to={'/productdetail/' + product.product_id} style={{color:"#3368bb"}}>{product.product_name}</Link></label>
            <div className="bottomCenter">
              <label><strong>&#8377; {product.product_cost}</strong></label><br/>
              <button className="btn-add" onClick={()=>addToCart(product)}>Add to Cart</button><br/>
              <Rating name="rating" precision={0.1} value={Number(product.product_rating)} disabled />
            </div>
          </div>
        </div>
      ))}
      {open && <SnackAlert open={open} message={message} type={type} handleClose={handleClose}/>}
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
      addToCartCount: () => dispatch(addToCartCount())
  }
}

export default connect(null, mapDispatchToProps)(ProductsCard)
