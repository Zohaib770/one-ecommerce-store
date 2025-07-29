import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Payment from '../components/Payment.tsx';
import { useCart } from '../context/CartContext.tsx';
import textContent from '../locales/en';
import Apis from '../api/Apis'

const Checkout = () => {
    const { cartItems } = useCart();
    const { createOrder } = Apis();

    const { register, handleSubmit, formState: { errors } } = useForm();
    //const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'card'>('paypal');

    const onSubmit = async (data: any) => {
        try {
            const order = {
                cartItems: cartItems.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity
                })),
                personalDetail: {
                    fullName: data.fullName,
                    email: data.email,
                    phone: data.phone
                },
                shippingAddress: {
                    streetAndHouseNumber: data.streetAndHouseNumber,
                    zip: data.zip,
                    city: data.city,
                    comment: data.comment || ''
                },
                payment: {
                    method: '',
                    status: '',
                    transactionId: '',
                    date: ''
                },
                price: cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0),
                status: 'new'
            };

            await createOrder(order);
        } catch (error) {
            toast.error('Fehler beim Checkout!', { position: "top-center" });
        }
    };

    return (
        <>
            <Header cartItems={cartItems} />
            <ToastContainer autoClose={300} />
            <section className="py-16 pt-20">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center text-gray-900 mb-10">
                        {textContent.checkout_title}
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

                        {/* Persönliche Angaben */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">👤 Persönliche Angaben</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        {...register("fullName", { required: "Vollständiger Name ist erforderlich" })}
                                        placeholder="Vollständiger Name"
                                        className="w-full p-2 border rounded-md"
                                    />
                                    {errors.fullName && <p className="text-red-500 text-sm">{String(errors.fullName.message)}</p>}
                                </div>

                                <div>
                                    <input
                                        {...register("email", {
                                            required: "E-Mail ist erforderlich",
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: "Ungültige E-Mail-Adresse"
                                            }
                                        })}
                                        placeholder="E-Mail-Adresse"
                                        className="w-full p-2 border rounded-md"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
                                </div>

                                <div>
                                    <input
                                        {...register("phone", { required: "Telefonnummer ist erforderlich" })}
                                        placeholder="Telefonnummer"
                                        className="w-full p-2 border rounded-md"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm">{String(errors.phone.message)}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Versandadresse */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">📦 {textContent.checkout_shipping_address}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        {...register("streetAndHouseNumber", { required: "Straße & Hausnummer ist erforderlich" })}
                                        placeholder="Straße und Hausnummer"
                                        className="w-full p-2 border rounded-md"
                                    />
                                    {errors.streetAndHouseNumber && <p className="text-red-500 text-sm">{String(errors.streetAndHouseNumber.message)}</p>}
                                </div>

                                <div>
                                    <input
                                        {...register("zip", { required: "PLZ ist erforderlich" })}
                                        placeholder="Postleitzahl"
                                        className="w-full p-2 border rounded-md"
                                    />
                                    {errors.zip && <p className="text-red-500 text-sm">{String(errors.zip.message)}</p>}
                                </div>

                                <div>
                                    <input
                                        {...register("city", { required: "Stadt ist erforderlich" })}
                                        placeholder="Stadt"
                                        className="w-full p-2 border rounded-md"
                                    />
                                    {errors.city && <p className="text-red-500 text-sm">{String(errors.city.message)}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <textarea
                                        {...register("comment")}
                                        placeholder="Kommentar zur Lieferung (optional)"
                                        className="w-full p-2 border rounded-md"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Zahlungsoptionen */}
                        <Payment />

                        {/* Absenden */}
                        <div className="text-center">
                            <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                                Bestellung abschicken
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Checkout;
