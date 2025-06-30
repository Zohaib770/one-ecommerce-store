import { Link } from 'react-router-dom';
import headphone from "../assets/headphone1.png";
import Header from './layout/Header.tsx';
import Footer from './layout/Footer.tsx';
import { useCart } from '../context/CartContext.tsx';
import textContent from "../locales/en.tsx";

const Main = () => {
  const { cartItems } = useCart();

  return (
    <>
      <Header cartItems={cartItems} />

      {/* hero section */}
      <section className="bg-gray-100 py-16 pt-20" id="hero">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold text-gray-900">{textContent.home_headline}</h1>
            <p className="text-lg text-gray-700 mt-4">{textContent.home_description}</p>
            <Link to="/shop">
              <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                {textContent.home_shop_now}
              </button>
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={headphone}
              alt="Amazing Product"
              width={500}
              height={500}
              className="w-full object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* featured products */}
      <section className="py-16" id="product">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-900">
            {textContent.home_product_features}
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-4xl text-blue-600 mb-4">💡</div>
              <h3 className="text-xl font-semibold">{textContent.innovative_design}</h3>
              <p className="text-gray-700 mt-2">{textContent.innovative_description}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-blue-600 mb-4">🔋</div>
              <h3 className="text-xl font-semibold">{textContent.long_battery}</h3>
              <p className="text-gray-700 mt-2">{textContent.battery_description}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-blue-600 mb-4">📦</div>
              <h3 className="text-xl font-semibold">{textContent.free_shipping}</h3>
              <p className="text-gray-700 mt-2">{textContent.shipping_description}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Main;
