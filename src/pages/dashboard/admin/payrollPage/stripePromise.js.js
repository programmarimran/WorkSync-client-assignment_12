// stripePromise.js
import { loadStripe } from "@stripe/stripe-js";
export const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);
