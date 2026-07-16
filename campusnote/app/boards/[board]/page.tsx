import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  School,
} from "lucide-react";

const boards = [
  {
    name: "CBSE",
    slug: "cbse",
    description:
      "NCERT-based premium notes, chapter-wise revision and exam-focused material for CBSE students.",
    classes: ["class-9", "class-10", "class-11", "class-12"],
  },
  {
    name: "UP Board",
    slug: "up-board",
    description:
      "Board-focused notes for UP Board students in a simple and exam-oriented format.",
    classes: ["class-9", "class-10", "class-11", "class-12"],
  },
  {
    name: "ICSE",
    slug: "icse",
    description:
      "Concept-rich notes, important questions and revision material for ICSE students.",
    classes: ["class-9", "class-10"],
  },
  {
    name: "ISC",
    slug: "isc",
    description:
      "Premium Class 11 and Class 12 notes for ISC board students.",
    classes: ["class-11", "class-12"],
  },
];

const formatClassName = (classSlug: string) => {
  return classSlug.replace("class-", "Class ");
};

type BoardPageProps = {
  params: Promise<{
    board: string;
  }>;
};

export default async function BoardPage({ params }: BoardPageProps) {
  const { board } = await params;

  const selectedBoard = boards.find((item) => item.slug === board);

  if (!selectedBoard) {
    notFound();
  }

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
              href="/boards"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              ← Boards
            </Link>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
                <School size={17} />
                {selectedBoard.name} Section
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                Select your class for {selectedBoard.name}.
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 md:text-lg">
                {selectedBoard.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Class-wise Notes",
                  "Subject-wise Material",
                  "Important Questions",
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
                <GraduationCap size={34} />
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-950">
                {selectedBoard.name} Learning Flow
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Select Class",
                  "Select Subject",
                  "Open Notes Bundle",
                  "Preview Resources",
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
              Choose Class
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-950">
              Available classes
            </h2>

            <div className="mt-7 grid gap-6 md:grid-cols-2">
              {selectedBoard.classes.map((classSlug) => (
                <Link
                  key={classSlug}
                  href={`/boards/${selectedBoard.slug}/${classSlug}`}
                  className="group rounded-4xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                      <BookOpen size={28} />
                    </div>

                    <ArrowRight
                      size={22}
                      className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
                    />
                  </div>

                  <h3 className="mt-6 text-2xl font-black text-slate-950">
                    {formatClassName(classSlug)}
                  </h3>

                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                    Subject-wise premium notes, sample papers, important
                    questions and revision material for{" "}
                    {formatClassName(classSlug)}.
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                    Enter {formatClassName(classSlug)}
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