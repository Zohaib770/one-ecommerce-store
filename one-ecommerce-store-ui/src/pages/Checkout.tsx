import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import textContent from '../locales/en';

const Checkout = () => {

    const { cartItems } = useCart();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'card'>('paypal');

    const onSubmit = async (data: any) => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/shipping-address`, data);
            toast.success('Checkout erfolgreich!', { position: "top-center", autoClose: 2000 });

        } catch (error) {
            toast.error('Fehler beim Checkout!', { position: "top-center" });
        }
    };

    return (
        <>
            <Header cartItems={cartItems} />
            <ToastContainer autoClose={300} />
            <section className="py-16 pt-20">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">{textContent.checkout_title}</h2>

                    {/* Checkout-Formular */}
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Versandadresse */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">{textContent.checkout_shipping_address}</h3>
                            <div className="space-y-4">
                                <input
                                    {...register("name", { required: "Name ist erforderlich" })}
                                    placeholder={textContent.checkout_name_placeholder}
                                    className="w-full p-2 border rounded-md"
                                />
                                {errors.name && <p className="text-red-500">{String(errors.name.message)}</p>}

                                <input
                                    {...register("address", { required: "Adresse ist erforderlich" })}
                                    placeholder={textContent.checkout_address_placeholder}
                                    className="w-full p-2 border rounded-md"
                                />
                                {errors.address && <p className="text-red-500">{String(errors.address.message)}</p>}

                                <input
                                    {...register("city", { required: "Stadt ist erforderlich" })}
                                    placeholder={textContent.checkout_city_placeholder}
                                    className="w-full p-2 border rounded-md"
                                />
                                {errors.city && <p className="text-red-500">{String(errors.city.message)}</p>}

                                <input
                                    {...register("zip", { required: "PLZ ist erforderlich" })}
                                    placeholder={textContent.checkout_zip_placeholder}
                                    className="w-full p-2 border rounded-md"
                                />
                                {errors.zip && <p className="text-red-500">{String(errors.zip.message)}</p>}

                            </div>
                        </div>

                        {/* Zahlungsmethode */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">{textContent.checkout_payment_method}</h3>
                            <div className="flex border-b mb-4">
                                <button
                                    type="button"
                                    className={`flex-1 py-2 text-center ${paymentMethod === 'paypal' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                                    onClick={() => setPaymentMethod('paypal')}
                                >
                                    {textContent.checkout_paypal}
                                </button>
                                <button
                                    type="button"
                                    className={`flex-1 py-2 text-center ${paymentMethod === 'card' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                                    onClick={() => setPaymentMethod('card')}
                                >
                                    {textContent.checkout_card}
                                </button>
                            </div>

                            {/* PayPal Info */}
                            {paymentMethod === 'paypal' && (
                                <div className="text-center p-4 border rounded-md bg-gray-100">
                                    <p className="text-gray-700">{textContent.checkout_paypal_info}</p>
                                </div>
                            )}

                            {/* Kreditkartenfelder */}
                            {paymentMethod === 'card' && (
                                <div className="space-y-4">
                                    <input
                                        {...register("cardNumber", { required: "Kartennummer ist erforderlich" })}
                                        placeholder={textContent.checkout_card_number_placeholder}
                                        className="w-full p-2 border rounded-md"
                                    />
                                    {errors.cardNumber && <p className="text-red-500">{String(errors.cardNumber.message)}</p>}

                                    <input
                                        {...register("expiry", { required: "Ablaufdatum ist erforderlich" })}
                                        placeholder={textContent.checkout_expiry_placeholder}
                                        className="w-full p-2 border rounded-md"
                                    />
                                    {errors.expiry && <p className="text-red-500">{String(errors.expiry.message)}</p>}

                                    <input
                                        {...register("cvv", { required: "CVV ist erforderlich" })}
                                        placeholder={textContent.checkout_cvv_placeholder}
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

                        {/* <Link to="/payment">Payments</Link> */}

                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Checkout;
