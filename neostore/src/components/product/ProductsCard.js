import React, {useState}  from 'react';
import { Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'
import * as api from '../../api'
import {addToCartCount} from '../redux'
import {connect} from 'react-redux'

import SnackAlert from '../modules/SnackAlert'

function ProductsCard (props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  /**
   * Add the product's detail to the cart with additional properties like quantity and total.
   * Also checks if the product if already present in the cart or not
   * 
   * @param product  contains the name of the product that is need to be added to the cart
   */
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

  /**
   * Triggers the SnackBar Close event.
   * 
   * @param   event   contains the component that is been trigger from the event.
   * @param   reason  contains the string that is triggered when user clickes outside the sweetAlert model.
   */
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {props.products.map(product => (
        <div className='col-sm-4' key={product._id} >
          <div className='cards'>
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
