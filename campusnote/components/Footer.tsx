import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Landmark,
  Mail,
  School,
  ShieldCheck,
} from "lucide-react";

const footerSections = [
  {
    title: "Study Sections",
    links: [
      { label: "Delhi University", href: "/du" },
      { label: "Board Exams", href: "/boards" },
      { label: "Government Exams", href: "/government-exams" },
      { label: "My Library", href: "/library" },
    ],
  },
  {
    title: "Board Exams",
    links: [
      { label: "CBSE", href: "/boards/cbse" },
      { label: "UP Board", href: "/boards/up-board" },
      { label: "ICSE", href: "/boards/icse" },
      { label: "ISC", href: "/boards/isc" },
    ],
  },
  {
    title: "Government Exams",
    links: [
      { label: "SSC Exams", href: "/government-exams/ssc" },
      { label: "Banking Exams", href: "/government-exams/banking" },
      { label: "Railway Exams", href: "/government-exams/railway" },
      { label: "UPSC & State PCS", href: "/government-exams/upsc-state-pcs" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1.8fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-lg font-black text-white shadow-lg shadow-blue-700/20">
                CN
              </div>

              <div>
                <p className="text-xl font-black leading-none">Campusnotes</p>
                <p className="mt-1 text-xs font-bold text-slate-400">
                  Notes • Boards • Exams
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm font-medium leading-7 text-slate-400">
              Campusnotes is a premium educational hub for Delhi University
              notes, board exam preparation and government exam study material.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                {
                  label: "DU Notes",
                  icon: GraduationCap,
                },
                {
                  label: "Boards",
                  icon: School,
                },
                {
                  label: "Govt Exams",
                  icon: Landmark,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <Icon size={22} className="text-blue-300" />
                    <p className="mt-3 text-sm font-black text-white">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">
                  {section.title}
                </h3>

                <div className="mt-5 space-y-3">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-sm font-bold text-slate-400 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 border-t border-white/10 pt-6 md:grid-cols-3 md:items-center">
          <p className="text-sm font-bold text-slate-500">
            © {new Date().getFullYear()} Campusnotes. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-3 md:justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-black text-slate-300">
              <ShieldCheck size={15} className="text-green-400" />
              Secure Access
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-black text-slate-300">
              <BookOpen size={15} className="text-blue-300" />
              Premium Notes
            </span>
          </div>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-black text-slate-400 transition hover:text-white md:justify-self-end"
          >
            <Mail size={16} />
            Contact / Login
          </Link>
        </div>
      </div>
    </footer>
  );
}