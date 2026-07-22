"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type PaymentButtonProps = {
  amount: string | number;
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
    const checkLocalPurchase = () => {
      const alreadyPaid = localStorage.getItem(`paid_${accessKey}`) === "true";
      setPaid(alreadyPaid);
    };

    checkLocalPurchase();
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

  const getCleanAmount = () => {
    if (typeof amount === "number") {
      return amount;
    }

    return Number(String(amount).replace("₹", "").trim()) || 49;
  };

  const savePurchaseToSupabase = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      alert("Please login first to save this purchase to your account.");
      window.location.href = "/login";
      return false;
    }

    const currentPath = window.location.pathname;
    const cleanAmount = getCleanAmount();

    const { error } = await supabase.from("user_purchases").upsert(
      {
        user_id: userData.user.id,
        access_key: accessKey,
        subject_name: subjectName,
        subject_url: currentPath,
        amount: cleanAmount,
      },
      {
        onConflict: "user_id,access_key",
      }
    );

    if (error) {
      console.error("Purchase save error:", error);
      alert("Payment done, but purchase could not be saved. Please contact support.");
      return false;
    }

    return true;
  };

  const savePurchaseLocally = () => {
    localStorage.setItem(`paid_${accessKey}`, "true");

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
  };

  const handlePayment = async () => {
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      alert("Please login or signup before purchasing notes.");
      setLoading(false);
      window.location.href = "/login";
      return;
    }

    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Razorpay failed to load. Please check your internet connection.");
      setLoading(false);
      return;
    }

    const cleanAmount = getCleanAmount();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_demo",
      amount: cleanAmount * 100,
      currency: "INR",
      name: "Campusnotes",
      description: `${subjectName} Notes Bundle`,

      handler: async function () {
        const savedInSupabase = await savePurchaseToSupabase();

        if (!savedInSupabase) {
          setLoading(false);
          return;
        }

        savePurchaseLocally();

        setPaid(true);

        alert("Payment successful! Full notes unlocked.");
        window.location.reload();
      },

      prefill: {
        name:
          userData.user.user_metadata?.name ||
          userData.user.user_metadata?.full_name ||
          "",
        email: userData.user.email || "",
        contact: "",
      },

      theme: {
        color: "#2563EB",
      },
    };

    if (!window.Razorpay) {
      alert("Razorpay is not available. Please refresh and try again.");
      setLoading(false);
      return;
    }

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
      {loading ? "Processing..." : `Purchase Bundle • ₹${getCleanAmount()}`}
    </button>
  );
}