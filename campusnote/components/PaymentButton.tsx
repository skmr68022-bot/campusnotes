"use client";

import { useEffect, useState } from "react";

type PaymentButtonProps = {
  amount: string;
  subjectName: string;
  accessKey: string;
};

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export default function PaymentButton({
  amount,
  subjectName,
  accessKey,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const alreadyPaid = localStorage.getItem(`paid_${accessKey}`) === "true";
    setPaid(alreadyPaid);
  }, [accessKey]);

  const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Razorpay failed to load. Please check your internet connection.");
      setLoading(false);
      return;
    }

    const cleanAmount = Number(amount.replace("₹", "").trim()) || 49;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_demo",
      amount: cleanAmount * 100,
      currency: "INR",
      name: "Campusnotes",
      description: `${subjectName} Notes Bundle`,

      handler: function () {
        localStorage.setItem(`paid_${accessKey}`, "true");
        setPaid(true);

        const existingPurchases = JSON.parse(
          localStorage.getItem("campusnotes_purchases") || "[]"
        );

        const currentPath = window.location.pathname;

        const newPurchase = {
          accessKey,
          title: subjectName,
          url: currentPath,
          purchasedAt: new Date().toISOString(),
        };

        const updatedPurchases = [
          newPurchase,
          ...existingPurchases.filter(
            (item: { accessKey: string }) => item.accessKey !== accessKey
          ),
        ];

        localStorage.setItem(
          "campusnotes_purchases",
          JSON.stringify(updatedPurchases)
        );

        alert("Payment successful! Full notes unlocked.");
        window.location.reload();
      },

      prefill: {
        name: "",
        email: "",
        contact: "",
      },

      theme: {
        color: "#2563EB",
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", function () {
      alert("Payment failed. Please try again.");
      setLoading(false);
    });

    paymentObject.open();
    setLoading(false);
  };

  if (paid) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={loading}
      className="rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Processing..." : `Purchase Bundle • ${amount}`}
    </button>
  );
}