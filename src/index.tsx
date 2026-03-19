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
