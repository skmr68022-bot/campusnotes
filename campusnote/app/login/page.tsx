import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <ShieldCheck size={24} />
          </div>

          <p className="mt-6 text-sm font-semibold text-indigo-600">STUDENT ACCOUNT</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Secure login is coming next</h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Login will be activated after secure user accounts and purchase records are connected. You can still preview course bundles now.
          </p>

          <div className="mt-6 rounded-2xl bg-indigo-50 p-4 text-sm text-indigo-800">
            <p className="flex items-center gap-2 font-medium">
              <BookOpen size={16} /> Current preview access is available without login.
            </p>
          </div>

          <Link
            href="/#courses"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white hover:bg-indigo-700"
          >
            Explore Course Bundles <ArrowRight size={17} />
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
