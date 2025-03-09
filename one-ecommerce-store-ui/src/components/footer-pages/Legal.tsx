import { Outlet } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { getStoredCartItems, getCartItems } from '../CartUtils.tsx';

const Legal = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Header cartItems={getCartItems(getStoredCartItems())} />
            <div className='flex-1 bg-gray-100'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Legal;