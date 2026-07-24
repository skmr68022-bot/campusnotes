import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BookOpen,
  BriefcaseBusiness,
  FileText,
  Landmark,
  Newspaper,
  Train,
} from "lucide-react";

const examCategories = [
  {
    name: "SSC Exams",
    slug: "ssc",
    description: "Preparation material for SSC CGL, CHSL, MTS, GD and more.",
    exams: ["SSC CGL", "SSC CHSL", "SSC MTS", "SSC GD"],
    icon: BriefcaseBusiness,
  },
  {
    name: "Banking Exams",
    slug: "banking",
    description: "Notes and practice material for SBI, IBPS and other banking exams.",
    exams: ["SBI PO", "SBI Clerk", "IBPS PO", "IBPS Clerk"],
    icon: Banknote,
  },
  {
    name: "Railway Exams",
    slug: "railway",
    description: "Exam-focused notes for RRB NTPC, Group D, ALP and Technician exams.",
    exams: ["RRB NTPC", "RRB Group D", "RRB ALP", "Technician"],
    icon: Train,
  },
  {
    name: "UPSC & State PCS",
    slug: "upsc-state-pcs",
    description: "Foundation notes, current affairs and revision material for civil services.",
    exams: ["UPSC CSE", "UP PCS", "BPSC", "MP PCS"],
    icon: Landmark,
  },
];

export default function GovernmentExamsPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8">
        <div className="absolute left-0 top-0 -z-10 h-95 w-95 rounded-full bg-blue-100 blur-3xl" />

        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
          >
            ← Back to Campusnotes
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
                <Landmark size={17} />
                Government Exams Section
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                Exam-focused preparation hub for government exams.
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 md:text-lg">
                Select your exam category, choose your target exam and access
                subject-wise notes, practice material, PYQs, current affairs and
                quick revision resources.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Exam-wise",
                  "Subject-wise",
                  "Practice-focused",
                  "Revision-ready",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm"
                  >
                    <BadgeCheck size={16} className="text-green-600" />
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
                Government Exam Flow
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Select Exam Category",
                  "Select Exam",
                  "Select Subject / Section",
                  "Open Preparation Bundle",
                  "Preview / Purchase / Read Full",
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
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
                Choose Category
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-950">
                Select your exam category
              </h2>
            </div>

            <div className="mt-7 grid gap-6 md:grid-cols-2">
              {examCategories.map((category) => {
                const Icon = category.icon;

                return (
                  <Link
                    key={category.slug}
                    href={`/government-exams/${category.slug}`}
                    className="group rounded-4xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                        <Icon size={28} />
                      </div>

                      <ArrowRight
                        size={22}
                        className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
                      />
                    </div>

                    <h3 className="mt-6 text-2xl font-black text-slate-950">
                      {category.name}
                    </h3>

                    <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                      {category.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {category.exams.map((exam) => (
                        <span
                          key={exam}
                          className="rounded-full bg-[#FFFDF7] px-3 py-1 text-xs font-black text-slate-600"
                        >
                          {exam}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                      Enter {category.name}
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Notes",
                text: "Topic-wise theory notes for fast concept clarity.",
                icon: FileText,
              },
              {
                title: "Practice",
                text: "Practice sets and exam-style questions.",
                icon: BookOpen,
              },
              {
                title: "Current Affairs",
                text: "Current affairs and static GK revision support.",
                icon: Newspaper,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-xl font-black text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 rounded-4xl border border-slate-200 bg-slate-950 p-7 text-white md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-blue-100">
                  <FileText size={16} />
                  Coming Next
                </div>

                <h2 className="mt-5 text-3xl font-black">
                  Exam category inner pages will be added next.
                </h2>

                <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-300">
                  After this homepage, we will create category pages like SSC,
                  Banking, Railway and UPSC with exam-wise flows.
                </p>
              </div>

              <Link
                href="/boards"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-blue-50"
              >
                View Boards Section
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}