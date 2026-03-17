import { useEffect, useMemo, useState } from 'react';

export default function useProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('https://dummyjson.com/products', {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch products (${res.status})`);
        }

        const json = await res.json();
        const list = Array.isArray(json?.products) ? json.products : [];

        if (!alive) return;
        setProducts(list);
      } catch (e) {
        if (!alive) return;
        if (e?.name === 'AbortError') return;
        setError(e instanceof Error ? e.message : 'Failed to fetch products');
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
  }, []);

  return useMemo(
    () => ({ products, loading, error }),
    [products, loading, error],
  );
}