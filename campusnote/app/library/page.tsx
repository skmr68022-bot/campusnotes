"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Landmark,
  Library,
  Lock,
  LogIn,
  RefreshCcw,
  School,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Purchase = {
  accessKey: string;
  title: string;
  url: string;
  purchasedAt: string;
  amount?: number;
};

type SupabasePurchaseRow = {
  access_key: string;
  subject_name: string;
  subject_url: string;
  amount: number | null;
  created_at: string;
};

const getSectionName = (accessKey: string) => {
  if (accessKey.startsWith("boards-")) {
    return "Board Exams";
  }

  if (accessKey.startsWith("government-")) {
    return "Government Exams";
  }

  return "Delhi University";
};

const getSectionIcon = (section: string) => {
  if (section === "Board Exams") {
    return School;
  }

  if (section === "Government Exams") {
    return Landmark;
  }

  return GraduationCap;
};

export default function LibraryPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const loadPurchases = async () => {
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      setLoggedIn(false);
      setPurchases([]);
      setLoading(false);
      return;
    }

    setLoggedIn(true);
    setUserEmail(userData.user.email || "");

    const { data, error } = await supabase
      .from("user_purchases")
      .select("access_key, subject_name, subject_url, amount, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Library fetch error:", error);

      const localPurchases = JSON.parse(
        localStorage.getItem("campusnotes_purchases") || "[]"
      );

      setPurchases(localPurchases);
      setLoading(false);
      return;
    }

    const supabasePurchases: Purchase[] = (data as SupabasePurchaseRow[]).map(
      (item) => ({
        accessKey: item.access_key,
        title: item.subject_name,
        url: item.subject_url,
        amount: item.amount || 0,
        purchasedAt: item.created_at,
      })
    );

    setPurchases(supabasePurchases);

    supabasePurchases.forEach((item) => {
      localStorage.setItem(`paid_${item.accessKey}`, "true");
    });

    localStorage.setItem(
      "campusnotes_purchases",
      JSON.stringify(supabasePurchases)
    );

    setLoading(false);
  };

  useEffect(() => {
    loadPurchases();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadPurchases();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const groupedPurchases = useMemo(() => {
    return purchases.reduce<Record<string, Purchase[]>>((groups, purchase) => {
      const section = getSectionName(purchase.accessKey);

      if (!groups[section]) {
        groups[section] = [];
      }

      groups[section].push(purchase);

      return groups;
    }, {});
  }, [purchases]);

  const totalPurchases = purchases.length;

  return (
    <main className="min-h-screen bg-[#FFFDF7] px-4 py-12">
      <section className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm">
          <div className="bg-linear-to-br from-slate-950 via-blue-800 to-blue-600 p-8 text-white sm:p-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-100">
                  <Library size={16} />
                  My Library
                </div>

                <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.95] tracking-tighter sm:text-6xl">
                  Your purchased notes in one place.
                </h1>

                <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-blue-100">
                  Access your unlocked Campusnotes bundles anytime after login.
                  Purchases are now connected with your Supabase account.
                </p>
              </div>

              <div className="rounded-4xl bg-white/10 p-6">
                <BookOpen size={42} className="text-yellow-300" />
                <p className="mt-4 text-3xl font-black">{totalPurchases}</p>
                <p className="mt-2 text-sm font-semibold text-blue-100">
                  Purchased Bundles
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {loading ? (
              <div className="rounded-4xl border border-slate-200 bg-slate-50 p-8 text-center">
                <RefreshCcw className="mx-auto animate-spin text-blue-600" size={34} />
                <h2 className="mt-4 text-2xl font-black text-slate-950">
                  Loading your library...
                </h2>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  Please wait while we fetch your purchases.
                </p>
              </div>
            ) : !loggedIn ? (
              <div className="rounded-4xl border border-slate-200 bg-slate-50 p-8 text-center">
                <Lock className="mx-auto text-blue-600" size={38} />

                <h2 className="mt-4 text-3xl font-black text-slate-950">
                  Login required
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-7 text-slate-600">
                  Please login or signup to view your purchased notes. Your
                  purchases will appear here after successful payment.
                </p>

                <Link
                  href="/login"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  <LogIn size={18} />
                  Signup / Login
                </Link>
              </div>
            ) : purchases.length === 0 ? (
              <div className="rounded-4xl border border-slate-200 bg-slate-50 p-8 text-center">
                <Library className="mx-auto text-blue-600" size={38} />

                <h2 className="mt-4 text-3xl font-black text-slate-950">
                  Your library is empty
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-7 text-slate-600">
                  You are logged in as{" "}
                  <span className="font-black text-blue-600">{userEmail}</span>.
                  Purchased notes will appear here automatically.
                </p>

                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href="/du"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                  >
                    Explore DU Notes
                    <ArrowRight size={18} />
                  </Link>

                  <Link
                    href="/search"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-800 transition hover:text-blue-700"
                  >
                    Search Notes
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex flex-col justify-between gap-4 rounded-4xl border border-slate-200 bg-[#FFFDF7] p-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-black text-slate-950">
                      Logged in as
                    </p>
                    <p className="mt-1 text-sm font-bold text-blue-600">
                      {userEmail}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={loadPurchases}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm transition hover:text-blue-700"
                  >
                    <RefreshCcw size={17} />
                    Refresh Library
                  </button>
                </div>

                {Object.entries(groupedPurchases).map(([section, items]) => {
                  const Icon = getSectionIcon(section);

                  return (
                    <section key={section}>
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                          <Icon size={23} />
                        </div>

                        <div>
                          <h2 className="text-2xl font-black text-slate-950">
                            {section}
                          </h2>
                          <p className="text-sm font-semibold text-slate-500">
                            {items.length} purchased bundle
                            {items.length === 1 ? "" : "s"}
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {items.map((purchase) => (
                          <Link
                            key={purchase.accessKey}
                            href={purchase.url}
                            className="group rounded-4xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                <BookOpen size={22} />
                              </div>

                              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                                Unlocked
                              </span>
                            </div>

                            <h3 className="mt-5 text-xl font-black text-slate-950">
                              {purchase.title}
                            </h3>

                            <p className="mt-2 text-sm font-semibold text-slate-500">
                              Purchased on{" "}
                              {new Date(
                                purchase.purchasedAt
                              ).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>

                            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                Access Key
                              </p>
                              <p className="mt-1 break-all text-xs font-bold text-slate-600">
                                {purchase.accessKey}
                              </p>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                              <span className="text-sm font-black text-blue-600">
                                Open Notes
                              </span>

                              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                                <ArrowRight size={18} />
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}