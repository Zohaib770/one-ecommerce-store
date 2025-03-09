import { Link } from 'react-router-dom';
import headphone from "../assets/headphone1.png"
import Header from './layout/Header.tsx'
import Footer from './layout/Footer.tsx'
import { getStoredCartItems, getCartItems } from './CartUtils.tsx';

const Main = () => (
    <>
      <Header cartItems={getCartItems(getStoredCartItems())} />
    
      {/* hero section */}
      <section className="bg-gray-100 py-16" id="hero">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="w-1/2">
            <h1 className="text-4xl font-bold text-gray-900">Amazing Product</h1>
            <p className="text-lg text-gray-700 mt-4">Discover the features and benefits of our amazing product.</p>
            <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              <Link to="/shop">shop Now</Link>
            </button>
          </div>
          <div className="w-1/2">
            <img src={headphone} alt="Amazing Product" width={500} height={500} className="w-full object-contain rounded-lg shadow-lg" />
          </div>
        </div>
    </section>
    {/* featured products */}
    <section className="py-16" id="product">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-900">Product Features</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="text-4xl text-blue-600 mb-4">💡</div>
            <h3 className="text-xl font-semibold">Innovative Design</h3>
            <p className="text-gray-700 mt-2">Our product comes with a modern and ergonomic design for all your needs.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl text-blue-600 mb-4">🔋</div>
            <h3 className="text-xl font-semibold">Long Battery Life</h3>
            <p className="text-gray-700 mt-2">Enjoy up to 12 hours of usage on a single charge, ensuring maximum convenience.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl text-blue-600 mb-4">📦</div>
            <h3 className="text-xl font-semibold">Free Shipping</h3>
            <p className="text-gray-700 mt-2">We offer free shipping on all orders, no matter where you are!</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </>
);

export default Main;