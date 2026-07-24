export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF7] px-4 py-16">
      <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-600">
          Campusnotes
        </p>

        <h1 className="mt-4 text-4xl font-black text-slate-950">
          Contact Us
        </h1>

        <p className="mt-3 text-slate-600">
          Need help with notes, payment, access, or account login? Contact
          Campusnotes support.
        </p>

        <div className="mt-8 space-y-4">
          <div className="rounded-2xl bg-blue-50 p-5">
            <p className="text-sm font-black text-slate-950">Email Support</p>
            <p className="mt-1 text-sm font-bold text-blue-700">
              skmr68022@gmail.com
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-black text-slate-950">Support Timing</p>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              We usually respond as soon as possible.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}