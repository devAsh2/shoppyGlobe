import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useProduct from '../hooks/useProduct';
import ProductItem from './ProductItem';
import { selectSearchQuery } from '../utils/productSlice';

const ProductList = () => {
  const { products, loading, error } = useProduct();
  const searchQuery = useSelector(selectSearchQuery);

  const filtered = useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase();
    if (!q) return products;

    return products.filter((p) => {
      const searchAbleText = `${p.title ?? ''} ${p.brand ?? ''} ${p.category ?? ''}`.toLowerCase();
      return searchAbleText.includes(q);
    });
  }, [products, searchQuery]);

  return (
    <section>
      <h2 className="page-title">Products</h2>

      {loading ? <p className="muted">Loading products…</p> : null}

      {error ? (
        <div className="card card-pad">
          <p className="page-title" style={{ marginBottom: 6 }}>
            Couldn’t load products
          </p>
          <p className="muted">{error}</p>
        </div>
      ) : null}

      {!loading && !error && filtered.length === 0 ? (
        <div className="card card-pad">
          <p className="page-title" style={{ marginBottom: 6 }}>
            No results
          </p>
          <p className="muted">Try a different search.</p>
        </div>
      ) : null}

      {!loading && !error && filtered.length > 0 ? (
        <div className="grid" aria-label="Product list">
          {filtered.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default ProductList;
