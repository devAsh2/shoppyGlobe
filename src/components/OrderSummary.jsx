import React from 'react';
import PropTypes from 'prop-types';

const OrderSummary = ({ items, totalQuantity, totalPrice }) => {
  return (
    <div className="card card-pad">
      <h2 className="page-title" style={{ marginBottom: 12 }}>
        Order Summary
      </h2>

      {items.length === 0 ? (
        <p className="muted">Your cart is empty.</p>
      ) : (
        <div className="summary-list" aria-label="Cart items summary">
          {items.map((i) => (
            <div key={i.id} className="summary-item">
              <img src={i.thumbnail} alt={i.title} loading="lazy" />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-h)' }}>{i.title}</div>
                <div className="muted" style={{ fontSize: 13 }}>
                  Qty: {i.quantity}
                </div>
              </div>
              <div className="price">₹{i.price * i.quantity}</div>
            </div>
          ))}
        </div>
      )}

      <div className="divider" />

      <div className="row">
        <span className="muted">Items</span>
        <div className="spacer" />
        <span style={{ color: 'var(--text-h)', fontWeight: 700 }}>{totalQuantity}</span>
      </div>
      <div className="row" style={{ marginTop: 8 }}>
        <span className="muted">Total</span>
        <div className="spacer" />
        <span className="price">₹{totalPrice}</span>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      thumbnail: PropTypes.string,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  totalQuantity: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default OrderSummary;

