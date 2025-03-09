import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main.tsx'
import Shop from './components/Shop.tsx'
import ProductDetails from './components/ProductDetails.tsx'
import Cart from './components/Cart.tsx'
import Checkout from './components/Checkout.tsx'

import Legal from './components/footer-pages/Legal.tsx'
import PrivacyPolicy from './components/footer-pages/PrivacyPolicy.tsx'
import DeliveryPolicy from './components/footer-pages/DeliveryPolicy.tsx'
import TermsOfService from './components/footer-pages/TermsOfService.tsx'
import Faqs from './components/footer-pages/Faqs.tsx'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        
        <Route path="/legal" element={<Legal />}>
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="delivery-policy" element={<DeliveryPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="faqs" element={<Faqs />} />
        </Route>
      
      </Routes>
    </Router>
  )
}

export default App
