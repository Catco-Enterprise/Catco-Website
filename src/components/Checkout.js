import React from "react";
import Cart from "./Cart";
import '../style/Checkout.css'



const Checkout = ({activeOrder, cartItems, setCartItems}) => {
    return (
        <div className="checkout-container">
            <h1><u>Checkout</u></h1>
            <form className="checkout-form">
                <div className="checkout-shipping">
                    <h2><u>Shipping Info</u></h2>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" placeholder="Enter Full Name"/>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder="Enter Valid Email"/>
                    <label htmlFor="address">Address:</label>
                    <input type="text" name="address" placeholder="Current Address"/>
                    <label htmlFor="city">City:</label>
                    <input type="text" name="city" placeholder="City" />
                    <label htmlFor="state">State:</label>
                    <input type="text" name="state" placeholder="State"/>
                    <label htmlFor="zip">Zip:</label>
                    <input type="text" name="zip" placeholder="ZIP Code"/>
                </div>
                <div className="checkout-payment">
                    <h2><u>Payment Info</u></h2>
                    <label htmlFor="Name">Name On Card:</label>
                    <input type="text" name="Name" placeholder="Enter Full Name"/>
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input type="password" name="cardNumber" placeholder="xxxx xxxx xxxx xxxx"/>
                    <label htmlFor="expiry">Expiration Date:</label>
                    <input type="text" name="expiry" placeholder="MM/YYYY"/>
                    <label htmlFor="cvv">CVV:</label>
                    <input type="text" name="cvv" placeholder="xxx" />
                    <label htmlFor="zip">Zip:</label>
                    <input type="text" name="zip" placeholder="ZIP Code" />
                </div> 
            </form>
            <div className="checkout-cart">
                <h1><u>Review Your Cart</u></h1>
                <Cart activeOrder={activeOrder} cartItems={cartItems} setCartItems={setCartItems}/>
            </div>
            <button className="placeorder-button">Place Order</button>

            
        </div>
    )

}

export default Checkout;