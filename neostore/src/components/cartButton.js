import React from 'react'

function cartButton() {
    // const addToCart = (product_id) => {
    //     let oldCart = JSON.parse(localStorage.getItem('cart')) 
    //     if (oldCart===null) {
    //         oldCart=[]
    //     }
    
    //     let newItem = {
    //         productId:product_id,
    //         quantity:'1'
    //     }

    //     let item=oldCart.filter(item => item.productId===newItem.productId)
    //     if(item.length===0) {
    //         oldCart.push(newItem);
    //         localStorage.setItem('cart',JSON.stringify(oldCart))
    //     }
    //     else{
    //         alert("Product already in present in cart")
    //     }
    // }

    return (
        <>
        <button className="btn-add" >Add to Cart</button>
        </>
    )
}

export default cartButton
