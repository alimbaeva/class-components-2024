import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.js';
import ErrorBoundary from './app/components/ErrorBoundary.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
