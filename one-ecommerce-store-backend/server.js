require('dotenv').config();


// server.js
// -----------------------------
// 1) IMPORTS
const express = require("express");    // Express = minimal web server (Node)
const cors = require("cors");          // CORS = allow frontend site to call this API
const Stripe = require("stripe");      // Stripe SDK for server (secret key side)

// 2) VARIABLES
// "const" means this variable cannot be reassigned.
// process.env.STRIPE_SECRET_KEY reads a value from your OS environment variables.
// This MUST be your secret key (sk_test_...); never ship this to the browser.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 3) CREATE APP
const app = express();                 // make an express app (server instance)

// 4) MIDDLEWARE (functions that run before your routes)
// cors(...) allows http://localhost:5173 (Vite dev) to call this server.
app.use(cors({ origin: "http://localhost:5173" }));
// express.json() parses JSON request bodies so req.body works.
app.use(express.json());

// 5) SIMPLE HEALTH CHECK ROUTE (GET method)
// Route ("/api/health") is a path; handler takes (req, res) and sends JSON.
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// 6) CREATE PAYMENT INTENT (POST method)
// "async" means we can use "await" inside for asynchronous operations.
// try/catch = handle errors gracefully without crashing.
app.post("/api/create-payment-intent", async (req, res) => {
  try {
    // In real apps compute "amount" from req.body.items on the SERVER
    // (never trust a price sent from the frontend).
    const amount = 1999; // amount is in the smallest unit (cents) -> €19.99

    // stripe.paymentIntents.create(...) returns a Promise (async).
    // await pauses here until Stripe replies.
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      // Let Stripe choose the best available payment method flows
      automatic_payment_methods: { enabled: true },
    });

    // Send the client secret back to the browser (safe to share clientSecret).
    res.json({ clientSecret: intent.client_secret });
  } catch (e) {
    // If anything fails above (network, bad key, etc.), we land here.
    // Return a 500 (server error) and a message.
    res.status(500).json({ error: e.message || "server error" });
  }
});

// 7) START SERVER
const PORT = process.env.PORT || 3000;
// app.listen(...) starts the HTTP server listening on a port.
app.listen(PORT, () => console.log(`API ready at http://localhost:${PORT}`));
