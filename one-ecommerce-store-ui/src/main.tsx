import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from './context/AdminContext';
import { CartProvider } from './context/CartContext.tsx';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminProvider>
      <CartProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </CartProvider>
    </AdminProvider>
  </StrictMode>,
)
