import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { AuthProvider } from './context/AuthContext'
import { AdminProvider } from './context/AdminContext'
import { CartProvider } from './context/CartContext.tsx'
import './index.css'
import App from './App.tsx'

// Load Stripe using your Vite env key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminProvider>
      <CartProvider>
        <BrowserRouter>
          <AuthProvider>
            {/* Wrap your app with Elements */}
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </AuthProvider>
        </BrowserRouter>
      </CartProvider>
    </AdminProvider>
  </StrictMode>,
)
