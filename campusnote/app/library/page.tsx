"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  Library,
  Lock,
  ShieldCheck,
} from "lucide-react";

type LibraryItem = {
  accessKey: string;
  title: string;
  course: string;
  semester: string;
  subjectUrl: string;
  notesUrl: string;
};

const libraryItems: LibraryItem[] = [
  {
    accessKey: "bcom-hons-1-financial-accounting",
    title: "Financial Accounting",
    course: "B.Com (Hons.)",
    semester: "Semester 1",
    subjectUrl: "/subject/bcom-hons/sem1/financial-accounting",
  notesUrl: "/html/bcom-hons/sem1/financial-accounting/notes.html",
  },
];

export default function LibraryPage() {
  const [purchasedItems, setPurchasedItems] = useState<LibraryItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unlockedItems = libraryItems.filter(
      (item) => localStorage.getItem(`paid_${item.accessKey}`) === "true"
    );

    setPurchasedItems(unlockedItems);
    setLoaded(true);
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FFFDF7]">
        <section className="border-b bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>

            <div className="mt-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-blue-100">
                <Library size={16} />
                My Library
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
                Your purchased notes in one place.
              </h1>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                Access your unlocked subject bundles, open notes and download
                PDFs anytime from this browser.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          {!loaded ? (
            <div className="rounded-4xl border bg-white p-8 shadow-sm">
              <p className="font-bold text-slate-600">Loading library...</p>
            </div>
          ) : purchasedItems.length > 0 ? (
            <>
              <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
                    Purchased Bundles
                  </p>
                  <h2 className="mt-3 text-3xl font-black text-slate-950">
                    Continue studying
                  </h2>
                </div>

                <div className="rounded-full bg-green-50 px-5 py-2 text-sm font-bold text-green-700">
                  {purchasedItems.length} unlocked
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {purchasedItems.map((item) => (
                  <div
                    key={item.accessKey}
                    className="rounded-[1.7rem] border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                        <BookOpen />
                      </div>

                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700">
                        Purchased
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm font-semibold text-slate-500">
                      {item.course} • {item.semester}
                    </p>

                    <div className="mt-6 rounded-2xl bg-[#FFFDF7] p-4">
                      <p className="flex items-center gap-2 text-sm font-bold text-slate-700">
                        <ShieldCheck size={17} className="text-green-600" />
                        Full PDF access unlocked on this browser
                      </p>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <Link
                        href={item.subjectUrl}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                      >
                        <FileText size={16} />
                        Open Bundle
                      </Link>

                      <a
                        href={item.notesUrl}
                        target="_blank"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
                      >
                        <Download size={16} />
                        Open Notes
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mx-auto max-w-2xl rounded-4xl border bg-white p-8 text-center shadow-xl shadow-slate-900/5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Lock />
              </div>

              <h2 className="mt-6 text-3xl font-black text-slate-950">
                No purchased notes yet
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Your unlocked notes will appear here after payment. Start with
                Financial Accounting or explore available courses.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/subject/bcom-hons/sem1/financial-accounting"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  View Financial Accounting
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/#courses"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                >
                  Explore Courses
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}