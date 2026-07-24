import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  GraduationCap,
  School,
} from "lucide-react";

const boards = [
  {
    name: "CBSE",
    slug: "cbse",
    description: "NCERT-based notes, sample papers and revision material.",
    classes: ["Class 9", "Class 10", "Class 11", "Class 12"],
  },
  {
    name: "UP Board",
    slug: "up-board",
    description: "Hindi and English medium board-focused study material.",
    classes: ["Class 9", "Class 10", "Class 11", "Class 12"],
  },
  {
    name: "ICSE",
    slug: "icse",
    description: "Concept-rich notes for ICSE school students.",
    classes: ["Class 9", "Class 10"],
  },
  {
    name: "ISC",
    slug: "isc",
    description: "Premium notes for ISC Class 11 and Class 12 students.",
    classes: ["Class 11", "Class 12"],
  },
];

export default function BoardsPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8">
        <div className="absolute right-0 top-0 -z-10 h-90 w-90 rounded-full bg-blue-100 blur-3xl" />

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
                <School size={17} />
                Board Exams Section
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                Premium notes for Class 9 to 12 board exams.
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 md:text-lg">
                Choose your board, select your class and access subject-wise
                notes, important questions, sample papers and quick revision
                material.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Board-wise", "Class-wise", "Subject-wise", "Exam-focused"].map(
                  (item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm"
                    >
                      <CheckCircle2 size={16} className="text-green-600" />
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-900/10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-700 text-white">
                <GraduationCap size={34} />
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-950">
                Board Notes Flow
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Select Board",
                  "Select Class",
                  "Select Subject",
                  "Open Notes Bundle",
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
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
                  Choose Board
                </p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">
                  Select your board
                </h2>
              </div>
            </div>

            <div className="mt-7 grid gap-6 md:grid-cols-2">
              {boards.map((board) => (
                <Link
                  key={board.slug}
                  href={`/boards/${board.slug}`}
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
                    {board.name}
                  </h3>

                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                    {board.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {board.classes.map((className) => (
                      <span
                        key={className}
                        className="rounded-full bg-[#FFFDF7] px-3 py-1 text-xs font-black text-slate-600"
                      >
                        {className}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                    Enter {board.name}
                    <ArrowRight size={16} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-14 rounded-4xl border border-slate-200 bg-slate-950 p-7 text-white md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-blue-100">
                  <FileText size={16} />
                  Coming Next
                </div>

                <h2 className="mt-5 text-3xl font-black">
                  Board-wise class pages will be added next.
                </h2>

                <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-300">
                  After this homepage, we will create CBSE, UP Board, ICSE and
                  ISC inner pages with class-wise and subject-wise flows.
                </p>
              </div>

              <Link
                href="/du"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-blue-50"
              >
                View DU Section
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}