import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './layout/Header.tsx';
import Footer from './layout/Footer.tsx';
import ImageGallery from '../components/ImageGallery.tsx';
import textContent from '../locales/en.tsx'
import { Product } from '../types/Interface.tsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAdmin } from '../context/AdminContext.tsx';
import { useCart } from '../context/CartContext.tsx';

const ProductDetails = () => {
    const { cartItems, saveCartItemToLocalStorage } = useCart();
    const { products } = useAdmin();
    const { id } = useParams();
    // Non-null assertion (!) — sagt TypeScript, dass product garantiert da ist
    const product = products.find((item) => item._id === id)!;

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(isNaN(value) ? 1 : value);
    };
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Kein Fallback mehr nötig
    const totalPrice = quantity * product.price;

    const addToCart = (item: Product) => {
        const CartItem = {
            product: item,
            quantity: quantity,
        }
        saveCartItemToLocalStorage(CartItem);
        toast.success(`${item.name} added to cart!`, { position: "top-center" });
    };

    return (
        <>
            <Header cartItems={cartItems} />
            <ToastContainer autoClose={300} />

            <div className="bg-gray-100 flex flex-col md:flex-row p-4">
                <div className="md:w-1/2 mb-4 md:mb-0">
                    <ImageGallery images={product.imageUrl} />
                </div>

                <div className="md:w-1/2 p-10 mt-15">
                    <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-lg font-semibold">
                        {textContent.price}: {product.price} €
                    </p>
                    <p className="mb-4">{product.description}</p>

                    <div className="flex items-center mb-4 border border-gray-300 w-fit">
                        <button
                            className="text-gray-800 px-3 py-1 rounded-l hover:bg-gray-100"
                            onClick={decreaseQuantity}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            className="text-center px-2 py-1 w-16"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                        />
                        <button
                            className="text-gray-800 px-3 py-1 rounded-r hover:bg-gray-100"
                            onClick={increaseQuantity}
                        >
                            +
                        </button>
                    </div>

                    <p className="text-lg font-semibold">
                        {textContent.total}: {totalPrice.toFixed(2)} €
                    </p>

                    <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        {textContent.add_to_cart}
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ProductDetails;
