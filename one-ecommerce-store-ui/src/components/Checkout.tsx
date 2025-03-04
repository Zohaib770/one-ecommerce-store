import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import {getStoredCartItems, getCartItems} from './CartUtils'

const Checkout = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'card'>('paypal');
    
    const onSubmit = async (data: any) => {
        try {
            await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/shipping-address`, data);
            toast.success('Checkout erfolgreich!', { position: "top-center", autoClose: 2000 });
            
        } catch (error) {
            toast.error('Fehler beim Checkout!', { position: "top-center" });
        }
    };

    return (
        <>
            <Header cartItems = {getCartItems(getStoredCartItems())} />
            <ToastContainer autoClose={3000} />
            <section className="py-16">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">Checkout</h2>

                    {/* Checkout-Formular */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        {/* Versandadresse */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
                            <div className="space-y-4">
                                <input
                                    {...register("name", { required: "Name ist erforderlich" })}
                                    placeholder="Name"
                                    className="w-full p-2 border rounded-md"
                                />
                                {errors.name && <p className="text-red-500">{String(errors.name.message)}</p>}
                                
                                <input
                                    {...register("address", { required: "Adresse ist erforderlich" })}
                                    placeholder="Address"
                                    className="w-full p-2 border rounded-md"
                                />
                                {errors.address && <p className="text-red-500">{String(errors.address.message)}</p>}
                                
                                <input
                                    {...register("city", { required: "Stadt ist erforderlich" })}
                                    placeholder="City"
                                    className="w-full p-2 border rounded-md"
                                />
                                {errors.city && <p className="text-red-500">{String(errors.city.message)}</p>}
                                
                                <input
                                    {...register("zip", { required: "PLZ ist erforderlich" })}
                                    placeholder="ZIP Code"
                                    className="w-full p-2 border rounded-md"
                                />
                                {errors.zip && <p className="text-red-500">{String(errors.zip.message)}</p>}
                                
                                <input
                                    {...register("country", { required: "Land ist erforderlich" })}
                                    placeholder="Country"
                                    className="w-full p-2 border rounded-md"
                                />
                                {errors.country && <p className="text-red-500">{String(errors.country.message)}</p>}
                            </div>
                        </div>

                        {/* Zahlungsmethode */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
                            <div className="flex border-b mb-4">
                                <button
                                    type="button"
                                    className={`flex-1 py-2 text-center ${paymentMethod === 'paypal' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                                    onClick={() => setPaymentMethod('paypal')}
                                >
                                    PayPal
                                </button>
                                <button
                                    type="button"
                                    className={`flex-1 py-2 text-center ${paymentMethod === 'card' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                                    onClick={() => setPaymentMethod('card')}
                                >
                                    Credit Card
                                </button>
                            </div>

                            {/* PayPal Info */}
                            {paymentMethod === 'paypal' && (
                                <div className="text-center p-4 border rounded-md bg-gray-100">
                                    <p className="text-gray-700">You will be redirected to PayPal for secure payment.</p>
                                </div>
                            )}

                            {/* Kreditkartenfelder */}
                            {paymentMethod === 'card' && (
                                <div className="space-y-4">
                                    <input
                                        {...register("cardNumber", { required: "Kartennummer ist erforderlich" })}
                                        placeholder="Card Number"
                                        className="w-full p-2 border rounded-md"
                                    />
                                    {errors.cardNumber && <p className="text-red-500">{String(errors.cardNumber.message)}</p>}
                                    
                                    <input
                                        {...register("expiry", { required: "Ablaufdatum ist erforderlich" })}
                                        placeholder="Expiry (MM/YY)"
                                        className="w-full p-2 border rounded-md"
                                    />
                                    {errors.expiry && <p className="text-red-500">{String(errors.expiry.message)}</p>}
                                    
                                    <input
                                        {...register("cvv", { required: "CVV ist erforderlich" })}
                                        placeholder="CVV"
                                        className="w-full p-2 border rounded-md"
                                    />
                                    {errors.cvv && <p className="text-red-500">{String(errors.cvv.message)}</p>}
                                </div>
                            )}
                        </div>

                        {/* Absenden-Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        >
                            {paymentMethod === 'paypal' ? 'Pay with PayPal' : 'Complete Checkout'}
                        </button>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Checkout;
