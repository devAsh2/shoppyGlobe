import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, selectCartItems, selectCartTotalPrice, selectCartTotalQuantity } from '../utils/cartSlice';
import OrderSummary from './OrderSummary';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalPrice = useSelector(selectCartTotalPrice);

  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.address.trim()) e.address = 'Address is required';
    return e;
  }, [form]);

  const canSubmit = items.length > 0 && Object.keys(errors).length === 0;

  useEffect(() => {
    if (!placed) return;
    const t = setTimeout(() => navigate('/'), 8000);
    return () => clearTimeout(t);
  }, [placed, navigate]);

  const onChange = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const onBlur = (key) => () => setTouched((p) => ({ ...p, [key]: true }));

  const onPlaceOrder = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, address: true });
    if (!canSubmit) return;

    setPlaced(true);
    dispatch(clearCart());
  };

  return (
    <section>
      <h2 className="page-title">Checkout</h2>

      {placed ? <div className="notice">Order placed</div> : null}

      <div className="checkout-layout" style={{ marginTop: 12 }}>
        <form className="card card-pad form" onSubmit={onPlaceOrder}>
          <h3 className="page-title" style={{ fontSize: 18, marginBottom: 0 }}>
            Customer Details
          </h3>
          <p className="muted">This is a Form for order placement.</p>

          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              value={form.name}
              onChange={onChange('name')}
              onBlur={onBlur('name')}
              placeholder="Your name"
              autoComplete="name"
            />
            {touched.name && errors.name ? (
              <div className="muted" style={{ color: '#ef4444', fontSize: 13, marginTop: 6 }}>
                {errors.name}
              </div>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={form.email}
              onChange={onChange('email')}
              onBlur={onBlur('email')}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {touched.email && errors.email ? (
              <div className="muted" style={{ color: '#ef4444', fontSize: 13, marginTop: 6 }}>
                {errors.email}
              </div>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              value={form.phone}
              onChange={onChange('phone')}
              onBlur={onBlur('phone')}
              placeholder="Phone number"
              autoComplete="tel"
            />
            {touched.phone && errors.phone ? (
              <div className="muted" style={{ color: '#ef4444', fontSize: 13, marginTop: 6 }}>
                {errors.phone}
              </div>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              rows={4}
              value={form.address}
              onChange={onChange('address')}
              onBlur={onBlur('address')}
              placeholder="House no, street, city, pincode"
            />
            {touched.address && errors.address ? (
              <div className="muted" style={{ color: '#ef4444', fontSize: 13, marginTop: 6 }}>
                {errors.address}
              </div>
            ) : null}
          </div>

          <button className="btn btn-primary" type="submit" disabled={!canSubmit || placed}>
            Place Order
          </button>

          {items.length === 0 ? (
            <p className="muted" style={{ marginTop: 6 }}>
              Add products to cart before checkout.
            </p>
          ) : null}
        </form>

        <OrderSummary items={items} totalQuantity={totalQuantity} totalPrice={totalPrice} />
      </div>
    </section>
  );
};

export default Checkout;
