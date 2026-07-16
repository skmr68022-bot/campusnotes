import Link from "next/link";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  LockKeyhole,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  return (
    <>
    

      <main className="min-h-screen bg-[#FFFDF7]">
        <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-4 py-12 md:px-6 lg:grid-cols-2">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-700"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
              <Sparkles size={16} />
              Student Access
            </div>

            <h1 className="mt-6 max-w-xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Continue your study journey.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Login to access purchased notes, saved subjects and your premium
              study library.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: BookOpen,
                  title: "My Library",
                  text: "Access purchased notes anytime.",
                },
                {
                  icon: BadgeCheck,
                  title: "Premium Access",
                  text: "Unlock full PDFs after payment.",
                },
                {
                  icon: ShieldCheck,
                  title: "Safe Login",
                  text: "Simple student-friendly access.",
                },
                {
                  icon: LockKeyhole,
                  title: "Protected Notes",
                  text: "Resources stay organised in one place.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border bg-white p-5 shadow-sm"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-4 font-black text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="rounded-4xl border bg-white p-6 shadow-2xl shadow-slate-900/10 md:p-8">
              <div className="rounded-3xl bg-slate-950 p-5 text-white">
                <p className="text-sm font-bold text-blue-200">
                  CampusNotes Login
                </p>
                <h2 className="mt-3 text-2xl font-black">
                  Access your account
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Continue using your phone number. OTP functionality can be
                  connected later.
                </p>
              </div>

              <label className="mt-6 block">
                <span className="text-sm font-black text-slate-700">
                  Phone Number
                </span>

                <div className="mt-2 flex items-center gap-3 rounded-2xl border bg-[#FFFDF7] px-4 py-3 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
                  <Phone size={18} className="text-blue-700" />
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>

              <button className="mt-5 w-full rounded-full bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
                Send OTP
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
                <ShieldCheck size={15} className="text-green-600" />
                Secure student login
              </div>

              <p className="mt-6 text-center text-xs leading-5 text-slate-500">
                This is currently a frontend login screen. Real OTP/auth can be
                connected with Supabase later.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}