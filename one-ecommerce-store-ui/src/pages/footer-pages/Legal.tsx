import { Outlet } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useCart } from '../../context/CartContext';

const Legal = () => {

    const { cartItems } = useCart();

    return (
        <div className='min-h-screen flex flex-col'>
            <Header cartItems={cartItems} />
            <div className='flex-1 bg-gray-100 pt-20'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Legal;