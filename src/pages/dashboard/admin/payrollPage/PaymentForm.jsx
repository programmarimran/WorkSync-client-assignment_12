import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const PaymentForm = ({ selectedPayroll, setShowModal }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  // amount transfer cents
  const amount = selectedPayroll.salary;
  const amountInCents = amount * 100;
  const payMutation = useMutation({
    mutationFn: async ({ id, transactionId }) =>
      await axiosSecure.patch(`/admin/pay-employee/${id}`, {
        transactionId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-payroll-requests"]);
      setShowModal(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // *****************
    if (!stripe || !elements) {
      return;
    }
    // **************
    setIsProcessing(true);
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    // ****************
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    //   console.log("payment method .....:", paymentMethod);
    }
    // ***********create payment intent**********
    const res = await axiosSecure.post(`/pay/create-payment-intent`, {
      amount: amountInCents,
    });
    // final result

    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setIsProcessing(false);
    } else {
      setError("");

      if (result.paymentIntent.status === "succeeded") {
        payMutation.mutate({
          id: selectedPayroll._id,
          transactionId: result.paymentIntent.id,
        });
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" space-y-4 bg-white p-6 rounded-xl shadow-md  w-full max-w-2xl mx-auto"
      >
        <CardElement className=" p-2 border rounded "></CardElement>
        <div className="flex items-center  gap-2">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="btn btn-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary bg-primary border-none mx-auto flex justify-center text-center"
            disabled={!stripe || isProcessing}
          >
            {isProcessing ? "Processing..." : `Pay $${selectedPayroll.salary}`}
          </button>
        </div>
        {error && <p className=" text-error">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
