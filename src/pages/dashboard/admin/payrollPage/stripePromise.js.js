// stripePromise.js alada raksi karon modal er baire thakai initial match na kore error dei!
import { loadStripe } from "@stripe/stripe-js";
export const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);
