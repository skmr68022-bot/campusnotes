"use client";

import { useState } from "react";
import Script from "next/script";
import { LockKeyhole } from "lucide-react";

type PaymentButtonProps = {
  amount: number;
  subjectName: string;
  accessKey: string;
  courseSlug: string;
  semesterNumber: number;
  subjectSlug: string;
};

type RazorpayFailure = {
  error?: {
    description?: string;
  };
};

type RazorpayOptions = {
  key: string | undefined;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: () => void;
  theme: { color: string };
};

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, callback: (response: RazorpayFailure) => void) => void;
    };
  }
}

export default function PaymentButton({
  amount,
  subjectName,
  accessKey,
  courseSlug,
  semesterNumber,
  subjectSlug,
}: PaymentButtonProps) {
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Payment gateway is still loading. Please try again.");
      return;
    }

    setProcessing(true);

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseSlug, semesterNumber, subjectSlug }),
      });

      const order: { id?: string; amount?: number; error?: string } = await response.json();

      if (!response.ok || !order.id || !order.amount) {
        alert(order.error || "Could not create payment order.");
        setProcessing(false);
        return;
      }

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "CampusNotes",
        description: subjectName,
        order_id: order.id,
        handler: function () {
          localStorage.setItem(`paid_${accessKey}`, "true");
          alert("Payment successful! Your bundle is now unlocked.");
          window.location.reload();
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (paymentFailure) => {
        alert(paymentFailure.error?.description || "Payment failed. Please try again.");
        setProcessing(false);
      });
      razorpay.open();
    } catch {
      alert("Something went wrong while starting payment. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <button
        onClick={handlePayment}
        disabled={processing}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
      >
        <LockKeyhole size={17} />
        {processing ? "Preparing Payment..." : `Buy Complete Bundle • ₹${amount}`}
      </button>
    </>
  );
}
