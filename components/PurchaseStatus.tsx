"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, Lock } from "lucide-react";

type PurchaseStatusProps = {
  accessKey: string;
};

export default function PurchaseStatus({ accessKey }: PurchaseStatusProps) {
  const [paid, setPaid] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPaid(localStorage.getItem(`paid_${accessKey}`) === "true");
    setLoaded(true);
  }, [accessKey]);

  if (!loaded) {
    return (
      <div className="mt-5 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-500">
        Checking access...
      </div>
    );
  }

  if (paid) {
    return (
      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-black text-green-800">
        <BadgeCheck size={18} />
        Purchased — full PDFs unlocked
      </div>
    );
  }

  return (
    <div className="mt-5 flex items-center gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-black text-yellow-800">
      <Lock size={18} />
      Not purchased — preview only
    </div>
  );
}