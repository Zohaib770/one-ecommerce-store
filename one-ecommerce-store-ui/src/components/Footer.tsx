// components/Footer.js
const Footer = () => (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex justify-around">
          <div className="flex flex-col mt-4 space-x-4">
            <p className="mb-4">MyStore name</p>
            <a href="#" className="hover:text-gray-400">Home Page</a>
            <a href="#" className="hover:text-gray-400">About</a>
          </div>
          <div className="flex flex-col mt-4 space-x-4">
            <p className="mb-4">CUSTOMER SERVICES</p>
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Delivery Policy</a>
            <a href="#" className="hover:text-gray-400">Exchange & Return Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">FAQs</a>
          </div>
          <div className="flex flex-col mt-4 space-x-4">
            <p className="mb-4">Need help</p>
            <a href="#" className="hover:text-gray-400">WhatsApp: 00000</a>
            <a href="#" className="hover:text-gray-400">Email: example@gmail.com</a>
          </div>
        </div>
        <p className="mt-5">&copy; 2025 Brand Name. All rights reserved.</p>
      </div>
    </footer>
  );
  
  export default Footer;
  