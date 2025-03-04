import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import items from "./ProductList.tsx"
import Header from './layout/Header.tsx'
import Footer from './layout/Footer.tsx'
import textContent from '../locales/en.tsx'
import { Product, CartItem, StoredCartItem } from "./Interface.tsx"
import { getStoredCartItems, getCartItems } from "./CartUtils.tsx"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Shop = () => {

  const [storedCartItems, setStoredCartItems] = useState<StoredCartItem[]>(getStoredCartItems);
  const [CartItems, setCartItems] = useState<CartItem[]>(getCartItems(storedCartItems));

  useEffect(() => {

    setCartItems(getCartItems(storedCartItems));
    if (storedCartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(storedCartItems));
    }
  }, [storedCartItems]);

  const addToCart = (item: Product) => {
    const cart = [...storedCartItems];
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
    
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ id: item.id, quantity: 1 });
    }

    setStoredCartItems(cart);
    toast.success(`${item.name} added to cart!` , {position: "top-center"});
  };

  return (
    <>
      <Header cartItems={CartItems} />
      <ToastContainer autoClose={3000} />
      <section className="bg-gray-100 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-900">Shop</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-5">
            {items.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 shadow-md">
                <Link to={`/product-details/${item.id}`}>
                  <img src={item.image[0]} alt={item.name} className="w-full h-90 object-contain mb-4 rounded-md" />
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