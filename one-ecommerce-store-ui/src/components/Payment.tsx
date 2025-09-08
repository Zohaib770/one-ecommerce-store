import React from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaGooglePay,
  FaApple,
  FaUniversity,
} from "react-icons/fa";
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import "./Payment.css";

interface Option {
  id: string;
  name: string;
  providers: string[];
  icon: React.ReactNode;
}

interface State {
  selected: string;
  options: Option[];
  processing: boolean;
  error: string | null;
  succeeded: boolean;
}

class Payment extends React.Component<unknown, State> {
  public state: State = {
    selected: "",
    processing: false,
    error: null,
    succeeded: false,
    options: [
      {
        id: "card",
        name: "Credit / Debit Card",
        providers: ["Visa", "Mastercard", "American Express"],
        icon: (
          <div style={{ display: "flex", gap: "6px", fontSize: "24px" }}>
            <FaCcVisa style={{ color: "#1a1f71" }} />
            <FaCcMastercard style={{ color: "#eb001b" }} />
          </div>
        ),
      },
      {
        id: "paypal",
        name: "PayPal",
        providers: ["PayPal"],
        icon: <FaPaypal style={{ color: "#003087", fontSize: "24px" }} />,
      },
      {
        id: "googlepay",
        name: "Google Pay",
        providers: ["Google Pay"],
        icon: <FaGooglePay style={{ color: "#4285f4", fontSize: "24px" }} />,
      },
      {
        id: "applepay",
        name: "Apple Pay",
        providers: ["Apple Pay"],
        icon: <FaApple style={{ color: "#000000", fontSize: "24px" }} />,
      },
      {
        id: "bank",
        name: "Bank Transfer",
        providers: ["Wise", "SEPA", "ACH"],
        icon: <FaUniversity style={{ color: "#2e7d32", fontSize: "24px" }} />,
      },
    ],
  };

  public render() {
    return (
      <div className="page-top-center">
        <div className="pay-card">
          {this.renderHeader()}

          {/* We use ElementsConsumer so a class component can access stripe/elements */}
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <>
                {this.renderOptionsWithStripe(stripe, elements)}
                {this.renderConfirmWithStripe(stripe, elements)}
              </>
            )}
          </ElementsConsumer>

          {this.renderStatus()}
        </div>
      </div>
    );
  }

  private renderHeader() {
    return (
      <div className="pay-header">
        <span className="pay-header-text">💳 Select a Payment Method</span>
      </div>
    );
  }

  /** The options list; only "card" shows a secure CardElement below it */
  private renderOptionsWithStripe(stripe: any, elements: any) {
    const { options, selected } = this.state;

    return (
      <div className="pay-options">
        {options.map((opt) => (
          <div key={opt.id}>
            <label
              className={`pay-option ${selected === opt.id ? "selected" : ""}`}
              onClick={() => this.handleSelect(opt.id)}
            >
              <div className="pay-option-left">
                <span className="pay-option-icon">{opt.icon}</span>
                <div className="pay-option-info">
                  <div className="pay-option-name">{opt.name}</div>
                  <div className="pay-option-sub">
                    {opt.providers.join(", ")}
                  </div>
                </div>
              </div>
              <input
                type="radio"
                name="payment"
                value={opt.id}
                checked={selected === opt.id}
                onChange={() => this.handleSelect(opt.id)}
              />
            </label>

            {/* Secure Stripe card form only for the first option */}
            {selected === "card" && opt.id === "card" && this.renderCardForm()}
          </div>
        ))}
      </div>
    );
  }

  /** Stripe secure card input (replaces manual number/expiry/cvv inputs) */
  private renderCardForm() {
    return (
      <div className="card-form">
        <div className="card-element-wrapper">
          <CardElement
            options={{
              style: { base: { fontSize: "16px" } },
              hidePostalCode: true,
            }}
          />
        </div>
      </div>
    );
  }

  /** Confirm button wired to Stripe or plain flow depending on selected method */
  private renderConfirmWithStripe(stripe: any, elements: any) {
    const { selected, processing } = this.state;

    return (
      <button
        className="pay-confirm"
        disabled={!selected || processing}
        onClick={() => this.handleConfirmStripe(stripe, elements)}
      >
        {processing ? "Processing…" : "Confirm & Pay"}
      </button>
    );
  }

  /** Status / errors */
  private renderStatus() {
    const { error, succeeded } = this.state;
    return (
      <>
        {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
        {succeeded && (
          <p style={{ color: "green", marginTop: 8 }}>✅ Payment succeeded!</p>
        )}
      </>
    );
  }

  // --- Handlers ---

  private handleSelect = (id: string) => {
    this.setState({ selected: id, error: null });
  };

  /** Creates PaymentIntent on your backend and confirms it with Stripe Elements */
  private handleConfirmStripe = async (stripe: any, elements: any) => {
    const { selected } = this.state;

    // Non-card methods: just proceed (you can replace with your own flows)
    if (selected !== "card") {
      alert(`You selected "${selected}". Proceeding to checkout...`);
      return;
    }

    if (!stripe || !elements) {
      this.setState({ error: "Stripe has not loaded yet." });
      return;
    }

    this.setState({ processing: true, error: null, succeeded: false });

    try {
      // 1) Ask your backend for a PaymentIntent client secret
      const res = await fetch("http://localhost:3000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Optional: include cart/order info so server computes amount securely
        body: JSON.stringify({ items: [{ id: "order-123", qty: 1 }] }),
      });
      const { clientSecret } = await res.json();

      if (!clientSecret) {
        throw new Error("No clientSecret returned from server.");
      }

      // 2) Confirm the payment with the card details in CardElement
      const card = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card },
        }
      );

      if (error) {
        this.setState({
          error: error.message || "Payment failed",
          processing: false,
        });
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        this.setState({ succeeded: true, processing: false, error: null });
        // TODO: call your backend or rely on webhooks to mark the order paid
      } else {
        this.setState({
          error: `Payment status: ${paymentIntent?.status ?? "unknown"}`,
          processing: false,
        });
      }
    } catch (e: any) {
      this.setState({ error: e?.message ?? "Unexpected error", processing: false });
    }
  };
}

export default Payment;
