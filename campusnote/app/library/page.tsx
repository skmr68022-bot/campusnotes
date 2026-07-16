"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Landmark,
  Library,
  School,
} from "lucide-react";

type PurchaseItem = {
  accessKey: string;
  title: string;
  url: string;
  purchasedAt: string;
};

const getSectionInfo = (accessKey: string) => {
  if (accessKey.startsWith("boards-")) {
    return {
      label: "Board Exams",
      icon: School,
      color: "text-green-700",
      bg: "bg-green-50",
    };
  }

  if (accessKey.startsWith("government-")) {
    return {
      label: "Government Exams",
      icon: Landmark,
      color: "text-purple-700",
      bg: "bg-purple-50",
    };
  }

  return {
    label: "Delhi University",
    icon: GraduationCap,
    color: "text-blue-700",
    bg: "bg-blue-50",
  };
};

const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Recently";
  }
};

export default function LibraryPage() {
  const [purchases, setPurchases] = useState<PurchaseItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedPurchases = JSON.parse(
      localStorage.getItem("campusnotes_purchases") || "[]"
    );

    setPurchases(savedPurchases);
    setLoaded(true);
  }, []);

  const duPurchases = purchases.filter(
    (item) =>
      !item.accessKey.startsWith("boards-") &&
      !item.accessKey.startsWith("government-")
  );

  const boardPurchases = purchases.filter((item) =>
    item.accessKey.startsWith("boards-")
  );

  const governmentPurchases = purchases.filter((item) =>
    item.accessKey.startsWith("government-")
  );

  const sections = [
    {
      title: "Delhi University",
      description: "Your purchased DU subject bundles.",
      items: duPurchases,
      href: "/du",
      icon: GraduationCap,
    },
    {
      title: "Board Exams",
      description: "Your purchased board exam bundles.",
      items: boardPurchases,
      href: "/boards",
      icon: School,
    },
    {
      title: "Government Exams",
      description: "Your purchased government exam preparation bundles.",
      items: governmentPurchases,
      href: "/government-exams",
      icon: Landmark,
    },
  ];

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8">
        <div className="absolute right-0 top-0 -z-10 h-90 w-90 rounded-full bg-blue-100 blur-3xl" />

        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
            <Library size={17} />
            My Library
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                Your purchased study bundles.
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 md:text-lg">
                Access all unlocked Campusnotes materials from Delhi University,
                Board Exams and Government Exams in one place.
              </p>
            </div>

            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-900/10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white">
                <BookOpen size={28} />
              </div>

              <h2 className="mt-5 text-2xl font-black text-slate-950">
                Library Summary
              </h2>

              <div className="mt-5 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl bg-[#FFFDF7] p-4 text-sm font-bold text-slate-700">
                  <span>Total Bundles</span>
                  <span>{purchases.length}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#FFFDF7] p-4 text-sm font-bold text-slate-700">
                  <span>DU</span>
                  <span>{duPurchases.length}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#FFFDF7] p-4 text-sm font-bold text-slate-700">
                  <span>Boards + Govt</span>
                  <span>{boardPurchases.length + governmentPurchases.length}</span>
                </div>
              </div>
            </div>
          </div>

          {!loaded ? (
            <div className="mt-12 rounded-4xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="font-bold text-slate-600">Loading your library...</p>
            </div>
          ) : purchases.length === 0 ? (
            <div className="mt-12 rounded-4xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <Library size={32} />
              </div>

              <h2 className="mt-6 text-3xl font-black text-slate-950">
                No purchased bundles yet
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-slate-600">
                Once you purchase a DU, board exam or government exam bundle, it
                will appear here automatically.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  href="/du"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  Explore DU Notes
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/boards"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                >
                  Explore Boards
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-12 space-y-10">
              {sections.map((section) => {
                const Icon = section.icon;

                return (
                  <div key={section.title}>
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm">
                          <Icon size={16} className="text-blue-700" />
                          {section.title}
                        </div>

                        <h2 className="mt-3 text-2xl font-black text-slate-950">
                          {section.title} Library
                        </h2>

                        <p className="mt-2 text-sm font-medium text-slate-600">
                          {section.description}
                        </p>
                      </div>

                      <Link
                        href={section.href}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                      >
                        Explore More
                        <ArrowRight size={16} />
                      </Link>
                    </div>

                    {section.items.length === 0 ? (
                      <div className="rounded-4xl border border-dashed border-slate-300 bg-white/70 p-6 text-sm font-bold text-slate-500">
                        No purchases in this section yet.
                      </div>
                    ) : (
                      <div className="grid gap-6 md:grid-cols-2">
                        {section.items.map((item) => {
                          const sectionInfo = getSectionInfo(item.accessKey);
                          const SectionIcon = sectionInfo.icon;

                          return (
                            <Link
                              key={item.accessKey}
                              href={item.url}
                              className="group rounded-4xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div
                                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${sectionInfo.bg} ${sectionInfo.color}`}
                                >
                                  <SectionIcon size={28} />
                                </div>

                                <ArrowRight
                                  size={22}
                                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
                                />
                              </div>

                              <div className="mt-6">
                                <span
                                  className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${sectionInfo.bg} ${sectionInfo.color}`}
                                >
                                  {sectionInfo.label}
                                </span>

                                <h3 className="mt-4 text-xl font-black text-slate-950">
                                  {item.title}
                                </h3>

                                <div className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-500">
                                  <CalendarDays size={16} />
                                  Purchased on {formatDate(item.purchasedAt)}
                                </div>

                                <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                                  Open Bundle
                                  <ArrowRight size={16} />
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}