import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { decreaseQty, increaseQty, removeFromCart } from '../utils/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="card card-pad">
      <div className="summary-item" style={{ gridTemplateColumns: '56px 1fr auto' }}>
        <img src={item.thumbnail} alt={item.title} loading="lazy" />
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text-h)' }}>{item.title}</div>
          <div className="muted" style={{ fontSize: 13 }}>
            ₹{item.price} each
          </div>
          <div className="row" style={{ marginTop: 10, gap: 8 }}>
            <button
              className="btn"
              onClick={() => dispatch(decreaseQty(item.id))}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span style={{ minWidth: 26, textAlign: 'center', color: 'var(--text-h)' }}>
              {item.quantity}
            </span>
            <button
              className="btn"
              onClick={() => dispatch(increaseQty(item.id))}
              aria-label="Increase quantity"
            >
              +
            </button>
            <div className="spacer" />
            <button
              className="btn btn-danger"
              onClick={() => dispatch(removeFromCart(item.id))}
              aria-label="Remove item"
            >
              Remove
            </button>
          </div>
        </div>
        <div className="price">₹{item.price * item.quantity}</div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
