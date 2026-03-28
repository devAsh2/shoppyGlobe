import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import { selectCartItems, selectCartTotalPrice, selectCartTotalQuantity } from '../utils/cartSlice';

const Cart = () => {
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalPrice = useSelector(selectCartTotalPrice);

  return (
    <section>
      <div className="row" style={{ marginBottom: 12 }}>
        <h2 className="page-title" style={{ margin: 0 }}>
          Cart
        </h2>
        <div className="spacer" />
        <span className="pill">{totalQuantity} items</span>
        <span className="pill">Total: ₹{totalPrice}</span>
        <Link className="btn btn-primary" to="/checkout">
          Checkout
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="card card-pad">
          <p className="page-title" style={{ marginBottom: 6 }}>
            Your cart is empty
          </p>
          <p className="muted" style={{ marginBottom: 12 }}>
            Browse products and add something you like.
          </p>
          <Link className="btn" to="/">
            Go to Home
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Cart;
