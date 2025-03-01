import { Link, useLocation } from "react-router-dom";
import textContent from "../locales/en";

const Header = ({ cartItems }) => {

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isShopPage = location.pathname === '/shop';
  const isCartPage = location.pathname === '/cart';

  return (

    <header className="bg-gray-900 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link to="/">{textContent.store_name}</Link>
        </div>
        <nav className="space-x-4">
          <Link to="/" className={`hover:text-gray-400 ${isHomePage ? 'font-bold' : ''}`}>{textContent.home}</Link>
          <Link to="/shop" className={`hover:text-gray-400 ${isShopPage ? 'font-bold' : ''}`}>{textContent.header_shop}</Link>
        </nav>
        <div className="flex items-center space-x-2">
          <Link to="/cart" className={`hover:text-gray-400 ${isCartPage ? 'font-bold' : ''}`}>{textContent.header_cart}
            {2 > 0 && (
              <span className="absolute top-2 right-1 bg-blue-500 text-white rounded-full px-2 text-xs">
                  {2}
              </span>
          )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
