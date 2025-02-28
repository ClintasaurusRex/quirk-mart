import React from 'react';
import './Cart.scss';

function Cart() {
  return (
    <div className="cart">
      <h1>Your Cart</h1>
      <div className="cart-items">
        <p>Your cart is currently empty.</p>
        {/* placeholder for the items */}
      </div>
      <div className="cart-summary">
        <p>Subtotal: $0.00</p>
        <button>Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
