<<<<<<< HEAD
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './hooks/Authentication';
import { LoaderProvider } from './hooks/Loader';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <LoaderProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </LoaderProvider>,
  // </React.StrictMode>
);
=======
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './hooks/Authentication';
import { LoaderProvider } from './hooks/Loader';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <LoaderProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </LoaderProvider>,
  // </React.StrictMode>
);
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
