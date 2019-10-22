import React from 'react';
import Header from "../Header/Header";
import PayPalLoader from "../PayPal/PayPalLoader";
import './cart_styles.css'

import trash from '../icons/trash.png'

class Cart extends React.Component {
    emptyCart = () => {
        localStorage.removeItem('Cart')
        window.location.reload();
    };

    removeItem = (key) => {
        console.log(key);
        let cart = JSON.parse(localStorage.getItem('Cart'));
        let newCart = [];
        for(let i = 0; i < cart.length; i++) {
            if(i !== key) {
                newCart.push(cart[i]);
            }
        }
        localStorage.setItem('Cart', JSON.stringify(newCart));
        window.location.reload();
    };

    render() {
        let cart = JSON.parse(localStorage.getItem('Cart')) || [];
        let totalPrice = 0;
        cart.map(item =>
            totalPrice += parseInt(item.price, 10)
        )
        if (cart.length === 0) {
            return(
                <React.Fragment>
                    <Header/>
                    <div className='cart_wrapper'>
                        <p id='empty'>Your cart is empty.</p>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Header/>
                    <div className='cart_wrapper'>
                        {cart.map((item, key) => {
                            return (
                                <div key={item.name} className='cart_item'>
                                    <p>{item.name},</p>
                                    <p className='cart_price'>${item.price}</p>
                                    <img key={key} onClick={() => this.removeItem(key)} className='delete_icon' src={trash} alt='trash-icon'/>
                                </div>
                            )
                        })}
                        <div id='paypal'>
                            <PayPalLoader price={totalPrice}/>
                        </div>
                        <button id='empty_cart' onClick={this.emptyCart}>Empty Cart</button>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default Cart;