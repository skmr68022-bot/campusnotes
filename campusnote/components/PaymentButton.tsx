"use client";

import Script from "next/script";

type PaymentButtonProps = {
  amount: number;
  subjectName: string;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentButton({
  amount,
  subjectName,
}: PaymentButtonProps) {
  const handlePayment = async () => {
    try {
      if (!window.Razorpay) {
        alert("Razorpay is loading. Please try again in a few seconds.");
        return;
      }

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const order = await response.json();

      if (!response.ok) {
        alert("Could not create payment order.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "CampusNotes",
        description: subjectName,
        order_id: order.id,

        handler: function (paymentResponse: any) {
          console.log("Payment Success:", paymentResponse);

          alert(
            `Payment Successful!\nPayment ID: ${paymentResponse.razorpay_payment_id}`
          );
        },

        theme: {
          color: "#4f46e5",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response: any) {
        console.log("Payment Failed:", response.error);

        alert(
          `Payment Failed\nReason: ${response.error.description || "Unknown error"}`
        );
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong while starting payment.");
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <button
        onClick={handlePayment}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl mt-4"
      >
        Buy Compilation
      </button>
    </>
  );
}