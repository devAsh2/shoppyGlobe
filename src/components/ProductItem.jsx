import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../utils/cartSlice';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <article className="card product-card">
      <Link to={`/product/${product.id}`} aria-label={`View details for ${product.title}`}>
        <img
          className="product-thumb"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
      </Link>

      <div className="card-pad" style={{ display: 'grid', gap: 10 }}>
        <div>
          <h3 className="product-title">{product.title}</h3>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <span className="price">₹{product.price}</span>
            <span className="pill">{product.category}</span>
          </div>
        </div>

        <div className="row">
          <Link className="btn" to={`/product/${product.id}`}>
            View
          </Link>
          <button className="btn btn-primary" onClick={() => dispatch(addToCart(product))}>
            Add to cart
          </button>
          <div className="spacer" />
        </div>
      </div>
    </article>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};

export default ProductItem;
