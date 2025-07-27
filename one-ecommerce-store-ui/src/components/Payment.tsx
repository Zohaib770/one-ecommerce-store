import React, { useState } from "react";
import { FaCcVisa, FaCcMastercard, FaPaypal, FaGooglePay, FaApple, FaUniversity } from "react-icons/fa";

/* 
=========================================
💳 PAYMENT OPTIONS OVERVIEW
=========================================

1️⃣ Credit & Debit Cards  
-----------------------------------------
✔ Options: Stripe, PayPal, Adyen, Braintree  
✔ Best Choice: Stripe (Easy integration, low fees, global support)  
✔ Why? Most users prefer paying with their credit/debit cards.  

2️⃣ Digital Wallets (For fast & secure checkout)  
-----------------------------------------
✔ Options: PayPal, Google Pay, Apple Pay  
✔ Why? These allow quick payments without entering card details.  

3️⃣ Direct Bank Transfers (For large orders)  
-----------------------------------------
✔ Options: Wise, SEPA, ACH  
✔ Best Choice: Wise (Low fees, multi-currency support)  
✔ Why? Good for bulk transactions & B2B payments.  
*/

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("");

  // Payment methods
  const paymentOptions = [
    {
      id: "card",
      name: "Credit/Debit Card",
      providers: ["Visa", "Mastercard", "American Express"],
      icon: <FaCcVisa className="text-blue-600 text-2xl" />,
    },
    {
      id: "paypal",
      name: "PayPal",
      providers: ["PayPal"],
      icon: <FaPaypal className="text-yellow-500 text-2xl" />,
    },
    {
      id: "googlepay",
      name: "Google Pay",
      providers: ["Google Pay"],
      icon: <FaGooglePay className="text-black text-2xl" />,
    },
    {
      id: "applepay",
      name: "Apple Pay",
      providers: ["Apple Pay"],
      icon: <FaApple className="text-gray-700 text-2xl" />,
    },
    {
      id: "bank",
      name: "Bank Transfer",
      providers: ["Wise", "SEPA", "ACH"],
      icon: <FaUniversity className="text-green-600 text-2xl" />,
    },
  ];

  // Handle payment selection
  const handlePaymentSelect = (method: string) => {
    setSelectedMethod(method);
  };

  // Handle payment confirmation
  const handlePaymentConfirm = () => {
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }
    alert(`You selected ${selectedMethod}. Proceeding to checkout...`);
    // Here, you can integrate Stripe, PayPal, or a payment API
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">💳 Select a Payment Method</h2>

      {/* Payment Options */}
      <div className="space-y-3">
        {paymentOptions.map((option) => (
          <label
            key={option.id}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
              selectedMethod === option.id ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={option.id}
              className="hidden"
              onChange={() => handlePaymentSelect(option.id)}
            />
            <span className="mr-3">{option.icon}</span>
            <div>
              <p className="font-medium">{option.name}</p>
              <p className="text-sm text-gray-600">{option.providers.join(", ")}</p>
            </div>
          </label>
        ))}
      </div>

      {/* Confirm Payment Button */}
      <button
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={handlePaymentConfirm}
      >
        Confirm & Pay
      </button>
    </div>
  );
};

export default Payment;
