import React from 'react';
import {useRouteError} from "react-router-dom"

function NotFound() {
    const error = useRouteError()
  return (
    <div>
      <h1>Oops! Something went wrong...</h1>
      <p>{error.data}</p>
    </div>
  );
}

export default NotFound;
