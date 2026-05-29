import Link from "next/link";
import { BookOpen, Library, LogIn } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <BookOpen size={20} />
          </span>
          <span>
            Campus<span className="text-indigo-600">Notes</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 sm:gap-5">
          <Link href="/#courses" className="hidden hover:text-indigo-600 sm:inline">
            Courses
          </Link>
          <Link href="/library" className="flex items-center gap-1.5 rounded-lg px-2 py-2 hover:bg-indigo-50 hover:text-indigo-600 sm:px-0 sm:hover:bg-transparent">
            <Library size={16} />
            <span className="hidden sm:inline">My Library</span>
          </Link>
          <Link href="/login" className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700">
            <LogIn size={16} />
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
