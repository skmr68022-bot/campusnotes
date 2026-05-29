"use client";

import Script from "next/script";

type PaymentButtonProps = {
  amount: number;
  subjectName: string;
  accessKey: string;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentButton({
  amount,
  subjectName,
  accessKey,
}: PaymentButtonProps) {
  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay is loading. Try again.");
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

      handler: function () {
        localStorage.setItem(`paid_${accessKey}`, "true");
        alert("Payment successful! PDFs unlocked.");
        window.location.reload();
      },

      theme: {
        color: "#4f46e5",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
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