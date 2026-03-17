import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../CssFrComponents/Header.css';
import { selectCartTotalQuantity } from '../utils/cartSlice';
import { selectSearchQuery, setSearchQuery } from '../utils/productSlice';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const cartCount = useSelector(selectCartTotalQuantity);
  const searchQuery = useSelector(selectSearchQuery);
  const isHome = location.pathname === '/';

  return (
    <header className="header">
      <Link to="/" className="brand">
        ShoppyGlobe
      </Link>

      {isHome ? (
        <div className="search">
          <input
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search products..."
            aria-label="Search products"
          />
        </div>
      ) : (
        <div className="search-placeholder" />
      )}

      <nav aria-label="Primary navigation">
        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              <span className="cart-link">
                Cart
                <span className="cart-badge" aria-label={`${cartCount} items in cart`}>
                  {cartCount}
                </span>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/checkout" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Checkout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
