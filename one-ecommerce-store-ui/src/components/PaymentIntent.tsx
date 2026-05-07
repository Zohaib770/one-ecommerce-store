import React from "react";
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";

interface Props {}
interface State {
  processing: boolean;
  succeeded: boolean;
  error: string | null;
}

class PaymentIntent extends React.Component<Props, State> {
  public state: State = {
    processing: false,
    succeeded: false,
    error: null,
  };

  // ---- Confirm Payment ----
  private handleSubmit = async (stripe: any, elements: any) => {
    if (!stripe || !elements) {
      this.setState({ error: "Stripe.js has not loaded yet." });
      return;
    }

    this.setState({ processing: true, error: null });

    try {
      // 1) Ask backend to create a PaymentIntent and return clientSecret
      const res = await fetch("http://localhost:3000/create-payment-intent", {
        method: "POST",
      });
      const { clientSecret } = await res.json();

      // 2) Get card element (secure card input from Stripe)
      const cardElement = elements.getElement(CardElement);

      // 3) Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        this.setState({ error: error.message || "Payment failed", processing: false });
        return;
      }

      if (paymentIntent.status === "succeeded") {
        this.setState({ succeeded: true, processing: false });
      }
    } catch (err: any) {
      this.setState({ error: err.message, processing: false });
    }
  };

  // ---- Render ----
  public render() {
    const { processing, succeeded, error } = this.state;

    return (
      <div className="pay-card">
        <h2>💳 Pay with Card</h2>

        {/* Stripe secure card field */}
        <div className="card-element-wrapper">
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <>
                <CardElement options={{ style: { base: { fontSize: "16px" } } }} />

                <button
                  className="pay-confirm"
                  disabled={processing || succeeded}
                  onClick={() => this.handleSubmit(stripe, elements)}
                >
                  {processing ? "Processing..." : "Confirm & Pay"}
                </button>
              </>
            )}
          </ElementsConsumer>
        </div>

        {/* Status messages */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {succeeded && <p style={{ color: "green" }}>✅ Payment succeeded!</p>}
      </div>
    );
  }
}

export default PaymentIntent;
