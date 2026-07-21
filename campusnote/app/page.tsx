"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  GraduationCap,
  Landmark,
  Library,
  School,
  Search,
  Sparkles,
  Star,
  Trophy,
  X,
  Zap,
} from "lucide-react";

const sections = [
  {
    title: "Delhi University",
    subtitle: "Premium notes for DU students",
    description:
      "Access semester-wise notes, PYQs, quick revision, important questions and subject bundles for Delhi University courses.",
    href: "/du",
    icon: GraduationCap,
    badge: "DU Notes",
    button: "Explore DU Notes",
    stats: "B.Com, B.Com Hons & more",
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    title: "Board Exams",
    subtitle: "School exam preparation",
    description:
      "Chapter-wise notes, important questions, formula sheets and revision resources for CBSE, ICSE, ISC and State Boards.",
    href: "/boards",
    icon: School,
    badge: "Class 9–12",
    button: "Explore Board Notes",
    stats: "CBSE • ICSE • State Boards",
    gradient: "from-emerald-600 to-teal-700",
  },
  {
    title: "Government Exams",
    subtitle: "Competitive exam resources",
    description:
      "Topic-wise notes, short tricks, one-liners, practice material and current affairs for SSC, Banking, Railway and more.",
    href: "/government-exams",
    icon: Landmark,
    badge: "Exam Prep",
    button: "Explore Govt Exams",
    stats: "SSC • Banking • Railway",
    gradient: "from-orange-500 to-rose-600",
  },
];

const features = [
  {
    title: "Exam-Oriented Notes",
    description:
      "Notes are structured around syllabus, PYQs and important questions.",
    icon: FileText,
  },
  {
    title: "Quick Revision",
    description:
      "Short revision files help students revise faster before exams.",
    icon: Zap,
  },
  {
    title: "Premium HTML Notes",
    description:
      "Clean, mobile-friendly notes with tables, boxes and proper formatting.",
    icon: Sparkles,
  },
  {
    title: "My Library Access",
    description:
      "Purchased notes can be accessed from the library section anytime.",
    icon: Library,
  },
];

const steps = [
  "Choose your study section",
  "Select course, semester or exam",
  "Open the subject bundle",
  "Purchase and unlock notes",
];

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupSeen = sessionStorage.getItem("campusnotes_popup_seen");

    if (!popupSeen) {
      setShowPopup(true);
      sessionStorage.setItem("campusnotes_popup_seen", "true");
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      {showPopup && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-4xl border border-slate-200 bg-white p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
              aria-label="Close popup"
            >
              <X size={18} />
            </button>

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-600 text-xl font-black text-white">
              CN
            </div>

            <p className="mt-5 text-sm font-black uppercase tracking-[0.25em] text-blue-600">
              Welcome to Campusnotes
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950">
              Premium notes for faster exam preparation
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Access DU notes, board exam resources and government exam material
              in one clean study platform.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="rounded-2xl bg-blue-50 p-3 text-center">
                <BookOpen className="mx-auto text-blue-600" size={20} />
                <p className="mt-2 text-[11px] font-black text-slate-700">
                  Notes
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-3 text-center">
                <CheckCircle2 className="mx-auto text-emerald-600" size={20} />
                <p className="mt-2 text-[11px] font-black text-slate-700">
                  PYQs
                </p>
              </div>

              <div className="rounded-2xl bg-yellow-50 p-3 text-center">
                <Star className="mx-auto text-yellow-600" size={20} />
                <p className="mt-2 text-[11px] font-black text-slate-700">
                  Revision
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
            >
              Start Learning
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      <section className="relative overflow-hidden px-4 py-16 sm:py-20">
        <div className="absolute -left-30 -top-30 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
        <div className="absolute -bottom-35 -right-30 h-80 w-80 rounded-full bg-yellow-200/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm">
                <Sparkles size={15} />
                Premium Study Hub
              </div>

              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-tighter text-slate-950 sm:text-6xl lg:text-7xl">
                Study smarter with notes made for exams.
              </h1>

              <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                Campusnotes brings premium notes, quick revision, important
                questions and PYQ-focused resources for students in one simple
                platform.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/du"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Start with DU Notes
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/search"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-900 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                >
                  <Search size={18} />
                  Search Notes
                </Link>
              </div>

              <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-black text-slate-950">3</p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Study Sections
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-black text-slate-950">24/7</p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Access
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-black text-slate-950">PYQ</p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Focused
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-5 shadow-xl">
              <div className="rounded-4xl bg-linear-to-br from-slate-950 to-blue-700 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-200">
                      Campusnotes
                    </p>
                    <h2 className="mt-2 text-3xl font-black">
                      Your Study Dashboard
                    </h2>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                    <Trophy size={28} />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {steps.map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 rounded-2xl bg-white/10 p-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-blue-700">
                        {index + 1}
                      </div>
                      <p className="text-sm font-bold text-white">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  href="/library"
                  className="rounded-3xl bg-blue-50 p-4 transition hover:bg-blue-100"
                >
                  <Library className="text-blue-600" size={22} />
                  <p className="mt-3 text-sm font-black text-slate-950">
                    My Library
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Open purchased notes
                  </p>
                </Link>

                <Link
                  href="/login"
                  className="rounded-3xl bg-yellow-50 p-4 transition hover:bg-yellow-100"
                >
                  <Star className="text-yellow-600" size={22} />
                  <p className="mt-3 text-sm font-black text-slate-950">
                    Login / Signup
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Save your access
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-600">
                Choose Section
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-950">
                What do you want to study?
              </h2>
            </div>

            <p className="max-w-md text-sm font-medium leading-6 text-slate-600">
              Select your category and continue to course, semester, subject or
              exam-wise resources.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <Link
                  key={section.href}
                  href={section.href}
                  className="group overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className={`bg-linear-to-br ${section.gradient} p-6 text-white`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                        <Icon size={28} />
                      </div>

                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black">
                        {section.badge}
                      </span>
                    </div>

                    <h3 className="mt-7 text-3xl font-black tracking-[-0.03em]">
                      {section.title}
                    </h3>

                    <p className="mt-2 text-sm font-bold text-white/80">
                      {section.subtitle}
                    </p>
                  </div>

                  <div className="p-6">
                    <p className="text-sm leading-7 text-slate-600">
                      {section.description}
                    </p>

                    <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                        Includes
                      </p>
                      <p className="mt-1 text-sm font-black text-slate-800">
                        {section.stats}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-sm font-black text-blue-600">
                        {section.button}
                      </span>

                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                        <ArrowRight size={18} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-600">
                Why Campusnotes
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-950">
                Built for students who want quick and clear preparation.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Instead of scattered PDFs and confusing material, Campusnotes
                gives organised notes in a simple subject-wise flow.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-3xl border border-slate-100 bg-[#FFFDF7] p-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                      <Icon size={22} />
                    </div>

                    <h3 className="mt-4 text-lg font-black text-slate-950">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-xl sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-300">
                Ready to Study?
              </p>

              <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-[-0.04em]">
                Start exploring premium notes for your course or exam.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                Choose a section, open your subject bundle and unlock the notes
                you need for revision.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/du"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50"
              >
                Explore Notes
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/library"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-700"
              >
                My Library
                <Library size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}