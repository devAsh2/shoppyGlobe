import React from 'react';
import { Link, useLocation, useRouteError } from 'react-router-dom';

function NotFound() {
  const error = useRouteError();
  const location = useLocation();

  const status = error?.status ?? 404;
  const statusText = error?.statusText ?? 'Not Found';
  const message = error?.data?.message ?? error?.message ?? 'The page you are looking for does not exist.';

  return (
    <section className="container">
      <div className="card card-pad">
        <h1 className="page-title" style={{ fontSize: 26 }}>
          {status} — {statusText}
        </h1>
        <p className="muted" style={{ marginBottom: 12 }}>
          Path: <span style={{ color: 'var(--text-h)' }}>{location.pathname}</span>
        </p>
        <p className="muted">{message}</p>
        <div style={{ marginTop: 14 }}>
          <Link className="btn btn-primary" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
