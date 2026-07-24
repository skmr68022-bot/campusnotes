import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Landmark,
  Train,
} from "lucide-react";

const examCategories = [
  {
    name: "SSC Exams",
    slug: "ssc",
    description:
      "Preparation material for SSC CGL, CHSL, MTS, GD and other SSC exams.",
    exams: ["ssc-cgl", "ssc-chsl", "ssc-mts", "ssc-gd"],
    icon: BriefcaseBusiness,
  },
  {
    name: "Banking Exams",
    slug: "banking",
    description:
      "Notes and practice material for SBI PO, SBI Clerk, IBPS PO and IBPS Clerk.",
    exams: ["sbi-po", "sbi-clerk", "ibps-po", "ibps-clerk"],
    icon: Banknote,
  },
  {
    name: "Railway Exams",
    slug: "railway",
    description:
      "Exam-focused notes for RRB NTPC, Group D, ALP and Technician exams.",
    exams: ["rrb-ntpc", "rrb-group-d", "rrb-alp", "technician"],
    icon: Train,
  },
  {
    name: "UPSC & State PCS",
    slug: "upsc-state-pcs",
    description:
      "Foundation notes, current affairs and revision material for civil services.",
    exams: ["upsc-cse", "up-pcs", "bpsc", "mp-pcs"],
    icon: Landmark,
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

type GovernmentCategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function GovernmentCategoryPage({
  params,
}: GovernmentCategoryPageProps) {
  const { category } = await params;

  const selectedCategory = examCategories.find(
    (item) => item.slug === category
  );

  if (!selectedCategory) {
    notFound();
  }

  const Icon = selectedCategory.icon;

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8">
        <div className="absolute right-0 top-0 -z-10 h-90 w-90 rounded-full bg-blue-100 blur-3xl" />

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
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
                <Icon size={17} />
                {selectedCategory.name}
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                Select your target exam.
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 md:text-lg">
                {selectedCategory.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Exam-wise Notes",
                  "Practice Sets",
                  "PYQs",
                  "Quick Revision",
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
                Preparation Flow
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Select Exam",
                  "Select Subject / Section",
                  "Open Prep Bundle",
                  "Preview Material",
                  "Purchase & Read Full",
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
              Choose Exam
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-950">
              Available exams
            </h2>

            <div className="mt-7 grid gap-6 md:grid-cols-2">
              {selectedCategory.exams.map((examSlug) => (
                <Link
                  key={examSlug}
                  href={`/government-exams/${selectedCategory.slug}/${examSlug}`}
                  className="group rounded-4xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                      <BadgeCheck size={28} />
                    </div>

                    <ArrowRight
                      size={22}
                      className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
                    />
                  </div>

                  <h3 className="mt-6 text-2xl font-black text-slate-950">
                    {examNames[examSlug]}
                  </h3>

                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                    Notes, practice material, PYQs and quick revision resources
                    for {examNames[examSlug]} preparation.
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                    Enter {examNames[examSlug]}
                    <ArrowRight size={16} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}