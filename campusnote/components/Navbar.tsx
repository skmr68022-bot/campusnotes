import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-blue-700 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-900/20">
            CN
          </div>

          <div>
            <p className="text-lg font-black tracking-tight text-slate-950">
              CampusNotes
            </p>
            <p className="-mt-1 hidden text-xs font-medium text-slate-500 sm:block">
              Premium study resources
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
          <Link href="/#explore" className="hover:text-blue-700">
            Explore Notes
          </Link>
          <Link href="/#courses" className="hover:text-blue-700">
            Courses
          </Link>
          <Link href="/#samples" className="hover:text-blue-700">
            Free Sample
          </Link>
          <Link href="/library" className="hover:text-blue-700">
           My Library
          </Link>
          <Link href="/#faq" className="hover:text-blue-700">
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 sm:block"
          >
            Login
          </Link>

          <Link
            href="/#courses"
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}