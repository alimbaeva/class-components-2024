import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import ErrorBoundary from './app/components/ErrorBoundary';
import { ThemeProvider } from './app/components/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
