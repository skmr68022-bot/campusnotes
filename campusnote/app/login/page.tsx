"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type AuthMode = "login" | "signup";
type SignupStep = "details" | "otp";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<AuthMode>("login");
  const [signupStep, setSignupStep] = useState<SignupStep>("details");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const resetMessage = () => {
    setMessage("");
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage("Please enter name, email and password.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password should be at least 6 characters.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
      options: {
        data: {
          name: name.trim(),
          full_name: name.trim(),
        },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setSignupStep("otp");
    setMessage("OTP sent to your email. Check inbox or spam folder.");
  };

  const verifySignupOtp = async () => {
    if (!email.trim() || !otp.trim()) {
      setMessage("Please enter the OTP sent to your email.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: otp.trim(),
      type: "email",
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/");
    router.refresh();
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setMessage("Please enter email and password.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#FFFDF7] px-4 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-600">
          Campusnotes
        </p>

        <h1 className="mt-3 text-3xl font-black text-slate-950">
          {mode === "login" ? "Login to continue" : "Create your account"}
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          {mode === "login"
            ? "Login to access your purchased notes and study library."
            : signupStep === "details"
            ? "Signup with your name, email and password. We will send an OTP to confirm your email."
            : "Enter the OTP sent to your email to confirm your account."}
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-6 w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-50 disabled:opacity-60"
        >
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            or
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="grid grid-cols-2 rounded-full bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setSignupStep("details");
              setOtp("");
              resetMessage();
            }}
            className={`rounded-full px-4 py-2 text-sm font-black transition ${
              mode === "login"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500"
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setSignupStep("details");
              setOtp("");
              resetMessage();
            }}
            className={`rounded-full px-4 py-2 text-sm font-black transition ${
              mode === "signup"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500"
            }`}
          >
            Signup
          </button>
        </div>

        {mode === "signup" && signupStep === "details" && (
          <>
            <label className="mt-5 block text-sm font-bold text-slate-700">
              Full name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
            />
          </>
        )}

        <label className="mt-5 block text-sm font-bold text-slate-700">
          Email address
        </label>

        <input
          type="email"
          placeholder="student@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={mode === "signup" && signupStep === "otp"}
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 disabled:bg-slate-100"
        />

        {mode === "signup" && signupStep === "otp" ? (
          <>
            <label className="mt-4 block text-sm font-bold text-slate-700">
              Email OTP
            </label>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={verifySignupOtp}
              disabled={loading}
              className="mt-5 w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify Email OTP"}
            </button>

            <button
              type="button"
              onClick={() => {
                setSignupStep("details");
                setOtp("");
                setMessage("");
              }}
              className="mt-3 w-full rounded-full bg-slate-100 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-200"
            >
              Change email
            </button>
          </>
        ) : (
          <>
            <label className="mt-4 block text-sm font-bold text-slate-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
            />

            {mode === "login" ? (
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="mt-5 w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSignup}
                disabled={loading}
                className="mt-5 w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Sending OTP..." : "Signup & Send OTP"}
              </button>
            )}
          </>
        )}

        {message && (
          <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
            {message}
          </p>
        )}

        <p className="mt-5 text-center text-xs font-semibold text-slate-500">
          {mode === "login"
            ? "First time here? Click Signup above."
            : signupStep === "details"
            ? "Already have an account? Click Login above."
            : "OTP not received? Check spam or wait before trying again."}
        </p>
      </div>
    </main>
  );
}