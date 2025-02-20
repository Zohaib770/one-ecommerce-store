import textContent from "../locales/en";

const Header = () => (
  <header className="bg-gray-900 text-white p-4">
    <div className="flex items-center justify-between">
      <div className="text-2xl font-bold">{textContent.store_name}</div>
      <nav className="space-x-4">
        <a href="" className="hover:text-gray-400">Home</a>
        <a href="" className="hover:text-gray-400">Shop</a>
      </nav>
      <div className="flex items-center space-x-2">
        <a href="" className="hover:text-gray-400">Cart</a>
      </div>
    </div>
  </header>
);

export default Header;
