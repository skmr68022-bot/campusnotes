"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const response = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Wrong password. Try again.");
      return;
    }

    router.push("/admin/content");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFFDF7] px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
          Campusnotes Admin
        </p>

        <h1 className="mt-3 text-3xl font-black text-slate-950">
          Admin Login
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Enter admin password to access the content dashboard.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
          />

          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}