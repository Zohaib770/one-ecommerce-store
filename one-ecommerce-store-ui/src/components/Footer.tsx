import {Link} from "react-router-dom";
import textContent from "../locales/en";

const Footer = () => (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex justify-around">
          <div className="flex flex-col mt-4 space-x-4">
            <p className="mb-4">{textContent.store_name}</p>
            <Link to="/" className="hover:text-gray-400">{textContent.home}</Link>
            <Link to="" className="hover:text-gray-400">{textContent.footer_about}</Link>
          </div>
          <div className="flex flex-col mt-4 space-x-4">
            <p className="mb-4">{textContent.footer_customer_services}</p>
            <a href="#" className="hover:text-gray-400">{textContent.footer_privacy_policy}</a>
            <a href="#" className="hover:text-gray-400">{textContent.footer_delivery_policy}</a>
            <a href="#" className="hover:text-gray-400">{textContent.footer_exchange_policy}</a>
            <a href="#" className="hover:text-gray-400">{textContent.footer_terms_of_service}</a>
            <a href="#" className="hover:text-gray-400">{textContent.footer_faqs}</a>
          </div>
          <div className="flex flex-col mt-4 space-x-4">
            <p className="mb-4">{textContent.footer_need_help}</p>
            <a href="#" className="hover:text-gray-400">{textContent.footer_whatsapp}</a>
            <a href="#" className="hover:text-gray-400">{textContent.footer_email}</a>
          </div>
        </div>
        <p className="mt-5">{textContent.footer_copyright}</p>
      </div>
    </footer>
  );
  
  export default Footer;
  