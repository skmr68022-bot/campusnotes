"use client";

import Script from "next/script";
import { CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay is loading. Try again.");
      return;
    }

    setLoading(true);

    try {
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
        setLoading(false);
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

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },

        theme: {
          color: "#2563EB",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch {
      alert("Something went wrong while starting payment.");
      setLoading(false);
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
        disabled={loading}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Opening Payment...
          </>
        ) : (
          <>
            <CreditCard size={18} />
            Buy Compilation
          </>
        )}
      </button>

      <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
        <ShieldCheck size={15} className="text-green-600" />
        Secure payment powered by Razorpay
      </div>
    </>
  );
}