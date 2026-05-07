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

// 1) INTERFACES (TypeScript types for objects)
// "interface" describes the shape of an object so TS can type-check.
interface Option {
  id: string;             // unique id for the option
  name: string;           // display name
  providers: string[];    // extra text
  icon: React.ReactNode;  // any renderable React content (icons, divs, etc.)
}

interface State {
  selected: string;       // which option is chosen
  options: Option[];      // all available options
  processing: boolean;    // are we paying right now?
  error: string | null;   // last error message (if any)
  succeeded: boolean;     // did the payment succeed?
}

// 2) CLASS COMPONENT
// Extends React.Component<Props, State>. We don't need custom props now -> unknown.
class Payment extends React.Component<unknown, State> {
  // 3) INITIAL STATE (a class property using assignment)
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
      { id: "paypal", name: "PayPal", providers: ["PayPal"], icon: <FaPaypal style={{ color: "#003087", fontSize: 24 }} /> },
      { id: "googlepay", name: "Google Pay", providers: ["Google Pay"], icon: <FaGooglePay style={{ color: "#4285f4", fontSize: 24 }} /> },
      { id: "applepay", name: "Apple Pay", providers: ["Apple Pay"], icon: <FaApple style={{ color: "#000", fontSize: 24 }} /> },
      { id: "bank", name: "Bank Transfer", providers: ["Wise", "SEPA", "ACH"], icon: <FaUniversity style={{ color: "#2e7d32", fontSize: 24 }} /> },
    ],
  };

  // 4) RENDER METHOD (required by class components)
  public render() {
    return (
      <div className="page-top-center">
        <div className="pay-card">
          {this.renderHeader()}

          {/* ElementsConsumer gives stripe/elements to a CLASS component */}
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

  // 5) SMALL RENDER HELPERS (just to keep render() clean)
  private renderHeader() {
    return (
      <div className="pay-header">
        <span className="pay-header-text">💳 Select a Payment Method</span>
      </div>
    );
  }

  private renderOptionsWithStripe(stripe: any, elements: any) {
    const { options, selected } = this.state;

    return (
      <div className="pay-options">
        {options.map((opt) => (
          <div key={opt.id}>
            <label
              className={`pay-option ${selected === opt.id ? "selected" : ""}`}
              onClick={() => this.handleSelect(opt.id)} // onClick calls a METHOD
            >
              <div className="pay-option-left">
                <span className="pay-option-icon">{opt.icon}</span>
                <div className="pay-option-info">
                  <div className="pay-option-name">{opt.name}</div>
                  <div className="pay-option-sub">{opt.providers.join(", ")}</div>
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

            {/* show Stripe card field ONLY for the first option */}
            {selected === "card" && opt.id === "card" && this.renderCardForm()}
          </div>
        ))}
      </div>
    );
  }

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

  private renderConfirmWithStripe(stripe: any, elements: any) {
    const { selected, processing } = this.state;

    return (
      <button
        className="pay-confirm"
        disabled={!selected || !stripe || !elements || processing}
        onClick={() => this.handleConfirmStripe(stripe, elements)} // arrow method
        title={!stripe || !elements ? "Loading Stripe…" : ""}
      >
        {processing ? "Processing…" : "Confirm & Pay"}
      </button>
    );
  }

  private renderStatus() {
    const { error, succeeded } = this.state;
    return (
      <>
        {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
        {succeeded && <p style={{ color: "green", marginTop: 8 }}>✅ Payment succeeded!</p>}
      </>
    );
  }

  // 6) METHODS (arrow functions keep "this" bound to the class instance)
  // Why ARROW here? In class components, normal methods lose "this" when passed
  // as callbacks. Arrow methods capture "this" lexically, avoiding manual binding.
  private handleSelect = (id: string) => {
    // setState schedules a state update (async), then React re-renders.
    this.setState({ selected: id, error: null });
  };

  // ASYNC because we await fetch() and stripe.confirmCardPayment()
  private handleConfirmStripe = async (stripe: any, elements: any) => {
    const { selected } = this.state;

    // guard: if not card, just demo an alternate flow
    if (selected !== "card") {
      alert(`You selected "${selected}". Proceeding to checkout...`);
      return;
    }
    if (!stripe || !elements) {
      this.setState({ error: "Stripe is still loading." });
      return;
    }

    this.setState({ processing: true, error: null, succeeded: false });

    try {
      // Call our backend. Because of Vite proxy, /api goes to http://localhost:3000
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",                                // HTTP method
        headers: { "Content-Type": "application/json" }, // we send JSON
        body: JSON.stringify({ items: [{ id: "order-123", qty: 1 }] }), // example data
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
      }

      // Parse JSON body; { clientSecret: string }
      const { clientSecret } = await res.json();
      if (!clientSecret) throw new Error("No clientSecret from server.");

      // Get the secure card field instance from Elements
      const card = elements.getElement(CardElement);

      // Ask Stripe to confirm the payment (handles 3DS/SCA automatically)
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (error) {
        this.setState({ error: error.message || "Payment failed", processing: false });
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        this.setState({ succeeded: true, processing: false });
      } else {
        this.setState({
          error: `Payment status: ${paymentIntent?.status ?? "unknown"}`,
          processing: false,
        });
      }
    } catch (e: any) {
      // Any thrown error lands here (network, bad response, etc.)
      this.setState({ error: e?.message ?? "Network error", processing: false });
    }
  };
}

export default Payment;
