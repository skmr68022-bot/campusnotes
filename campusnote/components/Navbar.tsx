
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Home,
  Landmark,
  Library,
  LogIn,
  School,
  Search,
} from "lucide-react";

const navLinks = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
  label: "Search",
  href: "/search",
  icon: Search,
},
  {
    label: "Delhi University",
    href: "/du",
    icon: GraduationCap,
  },
  {
    label: "Board Exams",
    href: "/boards",
    icon: School,
  },
  {
    label: "Government Exams",
    href: "/government-exams",
    icon: Landmark,
  },
  {
    label: "My Library",
    href: "/library",
    icon: Library,
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-700 text-lg font-black text-white shadow-lg shadow-blue-700/20">
            CN
          </div>

          <div>
            <p className="text-lg font-black leading-none text-slate-950">
              Campusnotes
            </p>
            <p className="mt-1 text-xs font-bold text-slate-500">
              Notes • Boards • Exams
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:text-blue-700 sm:inline-flex"
          >
            <LogIn size={16} />
            Login
          </Link>

          <Link
            href="/boards"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            <BookOpen size={16} />
            Explore
          </Link>
        </div>
      </nav>

      <div className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
        <div className="flex gap-2 overflow-x-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#FFFDF7] px-4 py-2 text-xs font-black text-slate-700"
              >
                <Icon size={15} />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}