"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Landmark,
  Search,
  School,
  X,
} from "lucide-react";
import { searchItems } from "@/data/searchItems";

const getSectionIcon = (section: string) => {
  if (section === "Delhi University") return GraduationCap;
  if (section === "Board Exams") return School;
  return Landmark;
};

const getSectionStyle = (section: string) => {
  if (section === "Delhi University") {
    return {
      bg: "bg-blue-50",
      text: "text-blue-700",
      label: "DU Notes",
    };
  }

  if (section === "Board Exams") {
    return {
      bg: "bg-green-50",
      text: "text-green-700",
      label: "Board Exams",
    };
  }

  return {
    bg: "bg-purple-50",
    text: "text-purple-700",
    label: "Govt Exams",
  };
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const trimmedQuery = searchQuery.trim();

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return [];
    }

    return searchItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.section.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8">
        <div className="absolute left-0 top-0 -z-10 h-[360px] w-[360px] rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute right-0 top-60 -z-10 h-[320px] w-[320px] rounded-full bg-yellow-100 blur-3xl" />

        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
            <Search size={17} />
            Campusnotes Search
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                Search notes across Campusnotes.
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 md:text-lg">
                Find Delhi University notes, board exam subjects and government
                exam preparation material from one search page.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-blue-900/10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white">
                <BookOpen size={28} />
              </div>

              <h2 className="mt-5 text-2xl font-black text-slate-950">
                Try searching
              </h2>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Financial Accounting",
                  "CBSE Class 10 Science",
                  "SBI PO Quant",
                  "SSC CGL GK",
                  "RRB NTPC Maths",
                ].map((example) => (
                  <button
                    key={example}
                    onClick={() => setSearchQuery(example)}
                    className="rounded-full bg-[#FFFDF7] px-4 py-2 text-xs font-black text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm md:p-5">
            <div className="flex items-center gap-3">
              <Search size={22} className="shrink-0 text-blue-700" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search Financial Accounting, CBSE Class 10 Science, SBI PO Quant..."
                className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none placeholder:text-slate-400 md:text-base"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
                Results
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-950">
                {trimmedQuery
                  ? `${filteredItems.length} result${
                      filteredItems.length === 1 ? "" : "s"
                    } found`
                  : "Start searching"}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Delhi University", "Board Exams", "Government Exams"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => setSearchQuery(section)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    {section}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="mt-7">
            {!trimmedQuery ? (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Search size={32} />
                </div>

                <h2 className="mt-6 text-3xl font-black text-slate-950">
                  Search your study material
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-slate-600">
                  Type a subject, course, board, class or exam name to find
                  matching notes.
                </p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <Search size={32} />
                </div>

                <h2 className="mt-6 text-3xl font-black text-slate-950">
                  No results found
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-slate-600">
                  Try searching another course, subject, board, class or exam.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => {
                  const Icon = getSectionIcon(item.section);
                  const style = getSectionStyle(item.section);

                  return (
                    <Link
                      key={`${item.section}-${item.title}-${item.href}`}
                      href={item.href}
                      className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${style.bg} ${style.text}`}
                        >
                          <Icon size={28} />
                        </div>

                        <ArrowRight
                          size={22}
                          className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
                        />
                      </div>

                      <div className="mt-6">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${style.bg} ${style.text}`}
                        >
                          {style.label}
                        </span>

                        <h3 className="mt-4 text-xl font-black text-slate-950">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                          {item.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {item.tags.slice(0, 4).map((tag) => (
                            <span
                              key={`${item.href}-${tag}`}
                              className="rounded-full bg-[#FFFDF7] px-3 py-1 text-xs font-black text-slate-500"
                            >
                              {tag}
                            </span>
                          ))}
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
        </div>
      </section>
    </main>
  );
}