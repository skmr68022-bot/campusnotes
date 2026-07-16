"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Landmark,
  School,
  Sparkles,
  X,
} from "lucide-react";

const sections = [
  {
    title: "Delhi University",
    subtitle: "Semester-wise DU notes, syllabus, PYQs and premium revision material.",
    href: "/du",
    icon: GraduationCap,
    badge: "College Notes",
    points: ["DU Courses", "Semester Notes", "PYQs", "Premium Bundles"],
  },
  {
    title: "Board Exams",
    subtitle: "Class 9th to 12th notes for UP Board, CBSE, ICSE and ISC.",
    href: "/boards",
    icon: School,
    badge: "School Notes",
    points: ["Class 9–12", "Board-wise Notes", "Important Questions", "Quick Revision"],
  },
  {
    title: "Government Exams",
    subtitle: "Exam-focused preparation notes for SSC, Banking, Railway, UPSC and more.",
    href: "/government-exams",
    icon: Landmark,
    badge: "Exam Prep",
    points: ["SSC", "Banking", "Railway", "UPSC / PCS"],
  },
];

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupSeen = sessionStorage.getItem("campusnotes_popup_seen");

    if (!popupSeen) {
      setShowPopup(true);
    }
  }, []);

  const closePopup = () => {
    sessionStorage.setItem("campusnotes_popup_seen", "true");
    setShowPopup(false);
  };

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      {showPopup && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden ]rounded-[2rem bg-white p-7 text-center shadow-2xl shadow-slate-950/30">
            <button
              onClick={closePopup}
              className="absolute right-5 top-5 rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
              aria-label="Close popup"
            >
              <X size={18} />
            </button>

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-700 text-3xl font-black text-white shadow-xl shadow-blue-700/25">
              CN
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.25em] text-blue-700">
              Campusnotes
            </p>

            <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950">
              One Platform for Notes, Boards & Exams
            </h1>

            <p className="mt-4 text-sm font-medium leading-6 text-slate-600">
              Choose your learning section and access premium study material in
              a clean, exam-focused format.
            </p>

            <button
              onClick={closePopup}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Start Learning
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      )}

      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-0 -z-10 h-105 w-105 -translate-x-1/2 rounded-full bg-blue-100 blur-3xl" />

        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-black text-blue-700 shadow-sm">
            <Sparkles size={16} />
            Welcome to the new Campusnotes
          </div>

          <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
            Choose your study section and start learning faster.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 md:text-lg">
            Campusnotes is expanding from DU notes into a complete educational
            hub for college students, school board students and government exam
            aspirants.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.title}
                href={section.href}
                className="group flex min-h-107.5 flex-col rounded-4xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/10"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                    <Icon size={32} />
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                    {section.badge}
                  </span>
                </div>

                <div className="mt-7">
                  <h2 className="text-2xl font-black text-slate-950">
                    {section.title}
                  </h2>

                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                    {section.subtitle}
                  </p>
                </div>

                <div className="mt-6 grid gap-3">
                  {section.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 rounded-2xl bg-[#FFFDF7] px-4 py-3 text-sm font-bold text-slate-700"
                    >
                      <BookOpen size={16} className="text-blue-700" />
                      {point}
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8">
                  <div className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-4 text-sm font-black text-white transition group-hover:bg-blue-700">
                    Enter Section
                    <ArrowRight size={17} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}