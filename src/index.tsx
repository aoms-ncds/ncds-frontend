import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LoaderProvider } from './hooks/Loader';
import { AuthProvider } from './hooks/Authentication';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <LoaderProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LoaderProvider>
  </React.StrictMode>,
);
