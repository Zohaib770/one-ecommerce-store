import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { AuthProvider } from './context/AuthContext'
import { AdminProvider } from './context/AdminContext'
import { CartProvider } from './context/CartContext.tsx'
import './index.css'
import App from './App'

// 1) Load your publishable key from Vite env (must start with VITE_)
const pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
// loadStripe(...) loads Stripe.js in the browser. Returns a Promise<Stripe | null>.
const stripePromise = loadStripe(pk)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminProvider>
      <CartProvider>
        <BrowserRouter>
          <AuthProvider>
            {/* 2) Wrap the app so children can access Stripe (Elements/ElementsConsumer) */}
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </AuthProvider>
        </BrowserRouter>
      </CartProvider>
    </AdminProvider>
  </StrictMode>
)
