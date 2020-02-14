import React, { Component } from 'react'

const addCartHoc = WrappedComponent => {
    class AddCartHoc extends Component {

        addToCart = (product_id) => {
            let oldCart = JSON.parse(localStorage.getItem('cart')) 
            // alert(oldCart)
            if (oldCart===null) {
                oldCart=[]
            }
            // alert(oldCart)
        
            let newItem = {
                productId:product_id,
                quantity:'1'
            }
            // alert(newItem)
            let item=oldCart.filter(item => item.productId===newItem.productId)
            // console.log(item.length)
            if(item.length===0) {
                oldCart.push(newItem);
                // alert(oldCart)
                localStorage.setItem('cart',JSON.stringify(oldCart))
            }
            else{
                alert("Product already in present in cart")
            }
        }
        render() {
            return (
                <WrappedComponent addToCart={this.addToCart}/>
            )
        }
    }
    
    return AddCartHoc
    
}

export default addCartHoc
