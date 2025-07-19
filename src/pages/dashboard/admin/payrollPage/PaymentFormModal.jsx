// PaymentFormModal.jsx
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./stripePromise.js";
import PaymentForm from "./paymentform.jsx";

const PaymentFormModal = ({ selectedPayroll, setShowModal }) => {
  return (
    <div className="fixed inset-0 z-50 bg-primary/20 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md md:max-w-xl lg:max-w-2xl rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Enter Card Details</h3>
        <Elements stripe={stripePromise}>
          <PaymentForm
            setShowModal={setShowModal}
            selectedPayroll={selectedPayroll}
          />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentFormModal;
