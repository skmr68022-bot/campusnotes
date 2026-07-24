import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  FileQuestion,
  FileText,
  Newspaper,
} from "lucide-react";

const examCategories = [
  {
    name: "SSC Exams",
    slug: "ssc",
    exams: ["ssc-cgl", "ssc-chsl", "ssc-mts", "ssc-gd"],
  },
  {
    name: "Banking Exams",
    slug: "banking",
    exams: ["sbi-po", "sbi-clerk", "ibps-po", "ibps-clerk"],
  },
  {
    name: "Railway Exams",
    slug: "railway",
    exams: ["rrb-ntpc", "rrb-group-d", "rrb-alp", "technician"],
  },
  {
    name: "UPSC & State PCS",
    slug: "upsc-state-pcs",
    exams: ["upsc-cse", "up-pcs", "bpsc", "mp-pcs"],
  },
];

const examNames: Record<string, string> = {
  "ssc-cgl": "SSC CGL",
  "ssc-chsl": "SSC CHSL",
  "ssc-mts": "SSC MTS",
  "ssc-gd": "SSC GD",
  "sbi-po": "SBI PO",
  "sbi-clerk": "SBI Clerk",
  "ibps-po": "IBPS PO",
  "ibps-clerk": "IBPS Clerk",
  "rrb-ntpc": "RRB NTPC",
  "rrb-group-d": "RRB Group D",
  "rrb-alp": "RRB ALP",
  technician: "Technician",
  "upsc-cse": "UPSC CSE",
  "up-pcs": "UP PCS",
  bpsc: "BPSC",
  "mp-pcs": "MP PCS",
};

const sectionsByCategory: Record<string, string[]> = {
  ssc: [
    "Quantitative Aptitude",
    "Reasoning Ability",
    "English Language",
    "General Awareness",
    "Current Affairs",
  ],
  banking: [
    "Quantitative Aptitude",
    "Reasoning Ability",
    "English Language",
    "Banking Awareness",
    "Current Affairs",
  ],
  railway: [
    "Mathematics",
    "General Intelligence",
    "General Science",
    "General Awareness",
    "Current Affairs",
  ],
  "upsc-state-pcs": [
    "History",
    "Geography",
    "Polity",
    "Economy",
    "Environment",
    "Current Affairs",
  ],
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

type GovernmentExamPageProps = {
  params: Promise<{
    category: string;
    examSlug: string;
  }>;
};

export default async function GovernmentExamPage({
  params,
}: GovernmentExamPageProps) {
  const { category, examSlug } = await params;

  const selectedCategory = examCategories.find(
    (item) => item.slug === category
  );

  if (!selectedCategory || !selectedCategory.exams.includes(examSlug)) {
    notFound();
  }

  const sections = sectionsByCategory[category];
  const examName = examNames[examSlug];

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8">
        <div className="absolute left-0 top-0 -z-10 h-90 w-90 rounded-full bg-blue-100 blur-3xl" />

        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              ← Campusnotes
            </Link>

            <Link
              href="/government-exams"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              ← Government Exams
            </Link>

            <Link
              href={`/government-exams/${selectedCategory.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              ← {selectedCategory.name}
            </Link>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
                <BadgeCheck size={17} />
                {selectedCategory.name} • {examName}
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                Select subject for {examName}.
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 md:text-lg">
                Choose a preparation section to access notes, practice material,
                PYQs, quick revision and exam-focused resources for {examName}.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Topic-wise Notes",
                  "Practice Material",
                  "PYQs",
                  "Current Affairs",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm"
                  >
                    <CheckCircle2 size={16} className="text-green-600" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-900/10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-700 text-white">
                <BookOpen size={34} />
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-950">
                {examName} Prep Bundle Flow
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Select Subject / Section",
                  "Open Preparation Bundle",
                  "Preview Notes",
                  "Unlock Full Material",
                  "Revise Before Exam",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-3 rounded-2xl bg-[#FFFDF7] p-4 text-sm font-bold text-slate-700"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-xs font-black text-white">
                      {index + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
              Choose Subject
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-950">
              Available preparation sections
            </h2>

            <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sections.map((section) => {
                const sectionSlug = slugify(section);

                return (
                  <Link
                    key={sectionSlug}
                    href={`/government-exams/${selectedCategory.slug}/${examSlug}/${sectionSlug}`}
                    className="group rounded-4xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                        {section.toLowerCase().includes("current") ? (
                          <Newspaper size={28} />
                        ) : section.toLowerCase().includes("question") ? (
                          <FileQuestion size={28} />
                        ) : (
                          <FileText size={28} />
                        )}
                      </div>

                      <ArrowRight
                        size={22}
                        className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
                      />
                    </div>

                    <h3 className="mt-6 text-xl font-black text-slate-950">
                      {section}
                    </h3>

                    <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                      Premium {section} preparation material for {examName}.
                    </p>

                    <div className="mt-5 grid gap-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <FileText size={15} className="text-blue-700" />
                        Notes + Concepts
                      </div>

                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <FileQuestion size={15} className="text-blue-700" />
                        Practice + PYQs
                      </div>
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                      Open Prep Bundle
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}