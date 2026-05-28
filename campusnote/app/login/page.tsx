import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">

        <div className="w-full max-w-sm bg-white border rounded-2xl shadow-sm p-6">

          <h1 className="text-2xl font-bold text-indigo-600">
            Login
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Continue using your phone number
          </p>

          <input
            type="text"
            placeholder="Enter Phone Number"
            className="w-full border rounded-xl px-4 py-3 mt-5 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl mt-4">
            Send OTP
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
}