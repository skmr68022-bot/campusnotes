import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileQuestion,
  FileText,
  GraduationCap,
} from "lucide-react";

const boards = [
  {
    name: "CBSE",
    slug: "cbse",
    classes: ["class-9", "class-10", "class-11", "class-12"],
  },
  {
    name: "UP Board",
    slug: "up-board",
    classes: ["class-9", "class-10", "class-11", "class-12"],
  },
  {
    name: "ICSE",
    slug: "icse",
    classes: ["class-9", "class-10"],
  },
  {
    name: "ISC",
    slug: "isc",
    classes: ["class-11", "class-12"],
  },
];

const subjectsByClass: Record<string, string[]> = {
  "class-9": [
    "Mathematics",
    "Science",
    "Social Science",
    "English",
    "Hindi",
  ],
  "class-10": [
    "Mathematics",
    "Science",
    "Social Science",
    "English",
    "Hindi",
  ],
  "class-11": [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Accountancy",
    "Business Studies",
    "Economics",
    "English",
  ],
  "class-12": [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Accountancy",
    "Business Studies",
    "Economics",
    "English",
  ],
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

const formatClassName = (classSlug: string) => {
  return classSlug.replace("class-", "Class ");
};

type BoardClassPageProps = {
  params: Promise<{
    board: string;
    classSlug: string;
  }>;
};

export default async function BoardClassPage({
  params,
}: BoardClassPageProps) {
  const { board, classSlug } = await params;

  const selectedBoard = boards.find((item) => item.slug === board);

  if (!selectedBoard || !selectedBoard.classes.includes(classSlug)) {
    notFound();
  }

  const subjects = subjectsByClass[classSlug];

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
              href="/boards"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              ← Boards
            </Link>

            <Link
              href={`/boards/${selectedBoard.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              ← {selectedBoard.name}
            </Link>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
                <GraduationCap size={17} />
                {selectedBoard.name} • {formatClassName(classSlug)}
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                Select your subject for {formatClassName(classSlug)}.
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 md:text-lg">
                Choose a subject to access premium board exam notes, important
                questions, sample papers, PYQs and quick revision resources.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Chapter-wise Notes",
                  "Important Questions",
                  "Sample Papers",
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
                Subject Bundle Includes
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Syllabus Overview",
                  "Chapter-wise Notes",
                  "Important Questions",
                  "Sample Papers / PYQs",
                  "Final Revision Material",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-[#FFFDF7] p-4 text-sm font-bold text-slate-700"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-xs font-black text-white">
                      {index + 1}
                    </span>
                    {item}
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
              Available subjects
            </h2>

            <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject) => {
                const subjectSlug = slugify(subject);

                return (
                  <Link
                    key={subjectSlug}
                    href={`/boards/${selectedBoard.slug}/${classSlug}/${subjectSlug}`}
                    className="group rounded-4xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                        <FileText size={28} />
                      </div>

                      <ArrowRight
                        size={22}
                        className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
                      />
                    </div>

                    <h3 className="mt-6 text-xl font-black text-slate-950">
                      {subject}
                    </h3>

                    <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                      Premium {subject} notes for {selectedBoard.name}{" "}
                      {formatClassName(classSlug)} students.
                    </p>

                    <div className="mt-5 grid gap-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <FileText size={15} className="text-blue-700" />
                        Notes + Revision
                      </div>

                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <FileQuestion size={15} className="text-blue-700" />
                        Important Questions
                      </div>
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                      Open Subject Bundle
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