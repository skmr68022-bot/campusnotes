"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Home, Library, LogIn, LogOut, User, Phone, Gift, ShieldCheck, FileText } from "lucide-react";
import { supabase } from "@/lib/supabase";

type UserInfo = {
  name: string;
  email: string;
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setUser({
          name:
            data.user.user_metadata?.name ||
            data.user.user_metadata?.full_name ||
            "Campusnotes User",
          email: data.user.email || "",
        });
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          name:
            session.user.user_metadata?.name ||
            session.user.user_metadata?.full_name ||
            "Campusnotes User",
          email: session.user.email || "",
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    localStorage.removeItem("campusnotes_purchases");

    setUser(null);
    setMenuOpen(false);

    window.location.href = "/";
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const menuLinks = [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "My Library",
      href: "/library",
      icon: Library,
    },
    {
      title: "Contact Us / Customer Care",
      href: "/contact",
      icon: Phone,
    },
    {
      title: "Refer and Earn",
      href: "/refer",
      icon: Gift,
    },
    {
      title: "Privacy Policy",
      href: "/privacy",
      icon: ShieldCheck,
    },
    {
      title: "Terms and Conditions",
      href: "/terms",
      icon: FileText,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#FFFDF7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-950 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white">
                CN
              </div>

              <div>
                <p className="text-base font-black leading-none text-slate-950">
                  Campusnotes
                </p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Study Hub
                </p>
              </div>
            </Link>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            {user ? (
              <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
                Hi, {user.name}
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-black text-white transition hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-100">
          <button
            type="button"
            aria-label="Close menu background"
            onClick={closeMenu}
            className="absolute inset-0 bg-slate-950/40"
          />

          <aside className="absolute left-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto bg-[#FFFDF7] shadow-2xl">
            <div className="border-b border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-base font-black text-white">
                      CN
                    </div>

                    <div>
                      <p className="text-lg font-black text-slate-950">
                        Campusnotes
                      </p>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                        Premium Notes
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-3xl bg-slate-50 p-4">
                    {user ? (
                      <div className="flex gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                          <User size={20} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-black text-slate-950">
                            {user.name}
                          </p>
                          <p className="truncate text-xs font-semibold text-slate-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-black text-slate-950">
                          Welcome Student
                        </p>
                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          Login or signup to access your purchased notes.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-red-50 hover:text-red-600"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <nav className="space-y-2 p-4">
              {menuLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black text-slate-800 transition hover:bg-blue-50 hover:text-blue-700"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                      <Icon size={18} />
                    </span>
                    {item.title}
                  </Link>
                );
              })}

              {!user ? (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  <LogIn size={18} />
                  Signup / Login
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-red-50 px-5 py-3 text-sm font-black text-red-700 transition hover:bg-red-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              )}
            </nav>

            <div className="border-t border-slate-200 p-5">
              <p className="text-xs font-semibold leading-6 text-slate-500">
                Campusnotes helps students access premium notes, PYQs, important
                questions and quick revision resources.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}