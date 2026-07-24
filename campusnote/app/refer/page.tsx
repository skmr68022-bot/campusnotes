"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Copy,
  Gift,
  LogIn,
  Share2,
  Sparkles,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export default function ReferPage() {
  const [user, setUser] = useState<User | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedReferral, setSavedReferral] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const refCode = searchParams.get("ref");

    if (refCode) {
      localStorage.setItem("campusnotes_referred_by", refCode);
      setSavedReferral(refCode);
    }

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const userName =
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    "Campusnotes User";

  const referralCode = useMemo(() => {
    if (!user?.email || !user?.id) {
      return "";
    }

    const emailName = user.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
    const shortId = user.id.slice(0, 6).toUpperCase();

    return `${emailName}-${shortId}`.toUpperCase();
  }, [user]);

  const referralLink = useMemo(() => {
    if (!referralCode || typeof window === "undefined") {
      return "";
    }

    return `${window.location.origin}/login?ref=${referralCode}`;
  }, [referralCode]);

  const copyReferralLink = async () => {
    if (!referralLink) {
      return;
    }

    await navigator.clipboard.writeText(referralLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hey! I found Campusnotes useful for premium exam notes. Signup using my referral link: ${referralLink}`
  );

  return (
    <main className="min-h-screen bg-[#FFFDF7] px-4 py-16">
      <section className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm">
          <div className="bg-linear-to-br from-blue-600 via-indigo-700 to-slate-950 p-8 text-white sm:p-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-100">
                  <Gift size={16} />
                  Refer and Earn
                </div>

                <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.95] tracking-tighter sm:text-6xl">
                  Invite friends and earn Campusnotes rewards.
                </h1>

                <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-blue-100">
                  Share your referral link with students. When referral rewards
                  become active, successful referrals will be tracked and shown
                  here.
                </p>
              </div>

              <div className="rounded-4xl bg-white/10 p-6">
                <Trophy size={42} className="text-yellow-300" />
                <p className="mt-4 text-3xl font-black">Coming Rewards</p>
                <p className="mt-2 text-sm font-semibold text-blue-100">
                  Referral wallet and reward tracking will be connected later.
                </p>
              </div>
            </div>
          </div>

          {savedReferral && (
            <div className="border-b border-emerald-100 bg-emerald-50 px-6 py-4">
              <p className="text-sm font-black text-emerald-700">
                Referral code saved: {savedReferral}
              </p>
            </div>
          )}

          <div className="grid gap-6 p-6 lg:grid-cols-[1fr_0.9fr] sm:p-8">
            <div className="rounded-4xl border border-slate-200 bg-[#FFFDF7] p-6">
              {user ? (
                <>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
                    Your Referral Link
                  </p>

                  <h2 className="mt-3 text-3xl font-black text-slate-950">
                    Hi, {userName}
                  </h2>

                  <p className="mt-2 text-sm font-semibold text-slate-600">
                    Share this link with your friends. They can signup using
                    your referral link.
                  </p>

                  <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                      Referral Code
                    </p>

                    <p className="mt-2 break-all text-xl font-black text-slate-950">
                      {referralCode}
                    </p>
                  </div>

                  <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                      Referral Link
                    </p>

                    <p className="mt-2 break-all text-sm font-bold leading-6 text-slate-700">
                      {referralLink}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={copyReferralLink}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                    >
                      <Copy size={18} />
                      {copied ? "Copied!" : "Copy Link"}
                    </button>

                    <a
                      href={`https://wa.me/?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-black text-white transition hover:bg-emerald-700"
                    >
                      <Share2 size={18} />
                      Share on WhatsApp
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
                    Login Required
                  </p>

                  <h2 className="mt-3 text-3xl font-black text-slate-950">
                    Login to generate your referral link.
                  </h2>

                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
                    After login, Campusnotes will create your unique referral
                    link automatically using your account.
                  </p>

                  <Link
                    href="/login"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                  >
                    <LogIn size={18} />
                    Signup / Login
                  </Link>
                </>
              )}
            </div>

            <div className="grid gap-4">
              <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
                <Users className="text-blue-600" size={28} />
                <h3 className="mt-4 text-xl font-black text-slate-950">
                  Invite Students
                </h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  Share Campusnotes with classmates, juniors and friends who
                  need notes.
                </p>
              </div>

              <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
                <Sparkles className="text-yellow-600" size={28} />
                <h3 className="mt-4 text-xl font-black text-slate-950">
                  Referral Tracking
                </h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  The referral code is saved when someone opens your link.
                  Backend reward tracking can be added later with Supabase.
                </p>
              </div>

              <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
                <Wallet className="text-emerald-600" size={28} />
                <h3 className="mt-4 text-xl font-black text-slate-950">
                  Reward Wallet
                </h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  A real wallet system can be added later after purchase system
                  is connected to Supabase database.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}