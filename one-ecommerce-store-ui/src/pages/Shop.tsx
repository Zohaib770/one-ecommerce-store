import { Link } from 'react-router-dom';
import Header from './layout/Header.tsx'
import Footer from './layout/Footer.tsx'
import textContent from '../locales/en.tsx'
import { Product } from "../types/Interface.tsx"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAdmin } from '../context/AdminContext.tsx';
import { useCart } from '../context/CartContext.tsx';

const Shop = () => {
  const { products } = useAdmin();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { cartItems, saveCartItemToLocalStorage } = useCart();

  const addToCart = (item: Product) => {
    const CartItem = {
      product: item,
      quantity: 1
    }
    saveCartItemToLocalStorage(CartItem);
    toast.success(`${item.name} added to cart!`, { position: "top-center" });
  };

  return (
    <>
      <Header cartItems={cartItems} />
      <ToastContainer autoClose={300} />
      <section className="bg-gray-100 py-4 pt-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-900">{textContent.header_shop}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-5">
            {products.map((item) => (
              <div key={item._id} className="border rounded-lg p-4 shadow-md">
                <Link to={`/product-details/${item._id}`}>
                  <img src={`${BACKEND_URL}${item.imageUrl[0]}`} alt={item.name} className="w-full h-90 object-contain mb-4 rounded-md" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.name.length > 20 ? item.name.slice(0, 50) + "..." : item.name}
                  </h3>
                </Link>
                <p className="text-lg font-semibold text-gray-900">{item.price} €</p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  {textContent.add_to_cart}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Shop;