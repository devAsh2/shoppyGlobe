import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../utils/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch product (${res.status})`);
        }

        const json = await res.json();
        if (!alive) return;
        setProduct(json);
        setActiveImage(json?.thumbnail || json?.images?.[0] || null);
      } catch (e) {
        if (!alive) return;
        if (e?.name === 'AbortError') return;
        setError(e instanceof Error ? e.message : 'Failed to fetch product');
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
      controller.abort();
    };
  }, [id]);

  const images = useMemo(() => {
    const list = Array.isArray(product?.images) ? product.images : [];
    const thumb = product?.thumbnail ? [product.thumbnail] : [];
    const combined = [...thumb, ...list].filter(Boolean);
    return Array.from(new Set(combined));
  }, [product]);

  if (loading) return <p className="muted">Loading product…</p>;

  if (error) {
    return (
      <div className="card card-pad">
        <h2 className="page-title" style={{ marginBottom: 6 }}>
          Couldn’t load product
        </h2>
        <p className="muted">{error}</p>
        <div style={{ marginTop: 12 }}>
          <Link className="btn" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="card card-pad">
        <h2 className="page-title" style={{ marginBottom: 6 }}>
          Product not found
        </h2>
        <Link className="btn" to="/">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <section>
      <div className="row" style={{ marginBottom: 12 }}>
        <Link className="btn" to="/">
          ← Back
        </Link>
        <div className="spacer" />
        <span className="pill">{product.category}</span>
        {product.brand ? <span className="pill">{product.brand}</span> : null}
      </div>

      <div className="detail-layout">
        <div className="card card-pad detail-gallery">
          {activeImage ? (
            <img
              className="detail-hero"
              src={activeImage}
              alt={product.title}
              loading="lazy"
            />
          ) : null}

          {images.length > 1 ? (
            <div className="thumb-row" aria-label="Product images">
              {images.slice(0, 8).map((src) => (
                <img
                  key={src}
                  className="thumb"
                  src={src}
                  alt=""
                  loading="lazy"
                  onClick={() => setActiveImage(src)}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="card card-pad">
          <h2 className="page-title" style={{ marginBottom: 6 }}>
            {product.title}
          </h2>
          <p className="muted" style={{ marginBottom: 12 }}>
            {product.description}
          </p>

          <div className="row" style={{ marginBottom: 12 }}>
            <span className="price" style={{ fontSize: 22 }}>
              ₹{product.price}
            </span>
            <div className="spacer" />
            {typeof product.rating === 'number' ? (
              <span className="pill">Rating: {product.rating}</span>
            ) : null}
          </div>

          <button className="btn btn-primary" onClick={() => dispatch(addToCart(product))}>
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
