import { Routes, Route } from 'react-router-dom';
import Main from './components/Main.tsx'
import Shop from './components/Shop.tsx'
import ProductDetails from './components/ProductDetails.tsx'
import Cart from './components/Cart.tsx'
import Checkout from './components/Checkout.tsx'
import Payment from './components/Payment.tsx'

import Legal from './pages/footer-pages/Legal.tsx'
import PrivacyPolicy from './pages/footer-pages/PrivacyPolicy.tsx'
import DeliveryPolicy from './pages/footer-pages/DeliveryPolicy.tsx'
import TermsOfService from './pages/footer-pages/TermsOfService.tsx'
import Faqs from './pages/footer-pages/Faqs.tsx'

import ProtectedRoute from './components/ProtectedRoute.tsx';
import Admin from './pages/admin/Admin'
import Login from './pages/admin/login'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="payment" element={<Payment />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />

        <Route path="/legal" element={<Legal />}>
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="delivery-policy" element={<DeliveryPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="faqs" element={<Faqs />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>}
        />

      </Routes>
    </>
  )
}

export default App
