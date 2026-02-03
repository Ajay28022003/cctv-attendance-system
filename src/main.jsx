import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <--- Import this
import App from './App.jsx';
import './index.css';
import { ToastProvider } from './contexts/ToastContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <--- Wrap App here */}
      <ToastProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
        
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
);