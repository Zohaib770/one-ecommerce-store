import { Link } from "react-router-dom";
import Header from '../pages/layout/Header.tsx'
import Footer from '../pages/layout/Footer.tsx'
import { useCart } from '../context/CartContext.tsx';

const Cart = () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const { cartItems, updateCartItemQuantityToLocalStorage, removeCartItemFromLocalStorage } = useCart();

    const updateQuantity = (_id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        updateCartItemQuantityToLocalStorage(_id, newQuantity);
    };

    const removeItem = (_id: string) => {
        removeCartItemFromLocalStorage(_id);
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const shippingCost = cartItems.length > 0 ? 5 : 0;
    const finalTotal = totalPrice + shippingCost;

    return (
        <div className="min-h-screen flex flex-col">
            <Header cartItems={cartItems} />

            <section className="py-16 flex-grow">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">Your Cart</h2>

                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    ) : (
                        <>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.product._id} className="flex flex-col border p-4 rounded-md">
                                        <div className="flex items-center">
                                            <img
                                                src={`${BACKEND_URL}${item.product.imageUrl[0]}`}
                                                alt={item.product.name}
                                                className="w-20 h-20 object-contain rounded-md mr-4"
                                            />
                                            <div className="flex-grow">
                                                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                                                <p className="text-gray-600">
                                                    Quantity:
                                                    <button
                                                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                        className="ml-2 text-gray-800 px-2 py-1 border border-gray-300 rounded"
                                                    >
                                                        -
                                                    </button>
                                                    {item.quantity}
                                                    <button
                                                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                        className="ml-2 text-gray-800 px-2 py-1 border border-gray-300 rounded"
                                                    >
                                                        +
                                                    </button>
                                                </p>
                                            </div>
                                            <span className="font-semibold">{item.product.price.toFixed(2)} €</span>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.product._id)}
                                            className="mt-2 text-sm text-blue-600 hover:underline self-start"
                                        >
                                            Remove item
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 border-t pt-4">
                                <div className="flex justify-between">
                                    <span className="font-semibold">Subtotal:</span>
                                    <span className="font-semibold">{totalPrice.toFixed(2)} €</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="font-semibold">Shipping:</span>
                                    <span className="font-semibold">{shippingCost.toFixed(2)} €</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="font-semibold">Total:</span>
                                    <span className="font-semibold">{finalTotal.toFixed(2)} €</span>
                                </div>
                                <Link to="/checkout">
                                    <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                                        Checkout
                                    </button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Cart;