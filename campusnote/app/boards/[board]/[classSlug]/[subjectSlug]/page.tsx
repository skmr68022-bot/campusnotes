import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  FileQuestion,
  FileText,
  GraduationCap,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";
import ResourceAccess from "@/components/ResourceAccess";
import PaymentButton from "@/components/PaymentButton";
import PurchaseStatus from "@/components/PurchaseStatus";
import { getContentStatusFromResources } from "@/data/contentStatus";

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
  "class-9": ["Mathematics", "Science", "Social Science", "English", "Hindi"],
  "class-10": ["Mathematics", "Science", "Social Science", "English", "Hindi"],
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

const createBoardHtmlNoteFiles = (
  board: string,
  classSlug: string,
  subjectSlug: string
) => {
  const basePath = `/html/boards/${board}/${classSlug}/${subjectSlug}`;

  return [
    {
      title: "Chapter 1: Premium Notes",
      file: `${basePath}/chapter-1.html`,
    },
    {
      title: "Chapter 2: Premium Notes",
      file: `${basePath}/chapter-2.html`,
    },
    {
      title: "Chapter 3: Premium Notes",
      file: `${basePath}/chapter-3.html`,
    },
    {
      title: "Chapter 4: Premium Notes",
      file: `${basePath}/chapter-4.html`,
    },
    {
      title: "Chapter 5: Premium Notes",
      file: `${basePath}/chapter-5.html`,
    },
    {
      title: "Important Questions",
      file: `${basePath}/important-questions.html`,
    },
    {
      title: "Sample Paper Notes",
      file: `${basePath}/sample-paper-notes.html`,
    },
    {
      title: "Quick Revision",
      file: `${basePath}/quick-revision.html`,
    },
    {
      title: "Final Exam Strategy",
      file: `${basePath}/final-exam-strategy.html`,
    },
  ];
};

type BoardSubjectPageProps = {
  params: Promise<{
    board: string;
    classSlug: string;
    subjectSlug: string;
  }>;
};

export default async function BoardSubjectPage({
  params,
}: BoardSubjectPageProps) {
  const { board, classSlug, subjectSlug } = await params;

  const selectedBoard = boards.find((item) => item.slug === board);

  if (!selectedBoard || !selectedBoard.classes.includes(classSlug)) {
    notFound();
  }

  const subjects = subjectsByClass[classSlug];

  const selectedSubject = subjects.find(
    (subject) => slugify(subject) === subjectSlug
  );

  if (!selectedSubject) {
    notFound();
  }

  const accessKey = `boards-${board}-${classSlug}-${subjectSlug}`;

  const resources = [
    {
      title: "Syllabus",
      size: "Board Syllabus",
      file: `/pdfs/boards/${board}/${classSlug}/${subjectSlug}/syllabus.pdf`,
    },
    {
      title: "Notes",
      size: "9 HTML Files",
      file: `/html/boards/${board}/${classSlug}/${subjectSlug}`,
      files: createBoardHtmlNoteFiles(board, classSlug, subjectSlug),
    },
    {
      title: "Important Questions",
      size: "Exam Practice",
      file: `/pdfs/boards/${board}/${classSlug}/${subjectSlug}/important-questions.pdf`,
    },
  ];

  const contentStatus = getContentStatusFromResources(resources);
  const isContentAvailable = contentStatus === "available";

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute right-0 top-0 -z-10 h-[360px] w-[360px] rounded-full bg-blue-100 blur-3xl" />

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
              href={`/boards/${selectedBoard.slug}/${classSlug}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              ← {formatClassName(classSlug)}
            </Link>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
                <GraduationCap size={17} />
                {selectedBoard.name} • {formatClassName(classSlug)}
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                {selectedSubject} Notes Bundle
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 md:text-lg">
                Premium {selectedSubject} study material for{" "}
                {selectedBoard.name} {formatClassName(classSlug)} students.
                Access chapter-wise notes, important questions, sample paper
                support and quick revision material.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Chapter-wise HTML Notes",
                  "Important Questions",
                  "Quick Revision",
                  "Board Exam Focused",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-black text-slate-700 shadow-sm"
                  >
                    <CheckCircle2 size={18} className="text-green-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-blue-900/10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-700 text-white">
                <BookOpen size={34} />
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-950">
                Bundle Summary
              </h2>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-[#FFFDF7] p-4 text-sm font-bold text-slate-700">
                  <span>Board</span>
                  <span>{selectedBoard.name}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#FFFDF7] p-4 text-sm font-bold text-slate-700">
                  <span>Class</span>
                  <span>{formatClassName(classSlug)}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#FFFDF7] p-4 text-sm font-bold text-slate-700">
                  <span>Subject</span>
                  <span>{selectedSubject}</span>
                </div>
              </div>

              <div
                className={`mt-6 rounded-2xl border p-4 ${
                  isContentAvailable
                    ? "border-blue-100 bg-blue-50"
                    : "border-yellow-200 bg-yellow-50"
                }`}
              >
                {isContentAvailable ? (
                  <PurchaseStatus accessKey={accessKey} />
                ) : (
                  <div>
                    <p className="text-sm font-black text-yellow-800">
                      Coming Soon
                    </p>

                    <p className="mt-1 text-xs font-bold leading-5 text-yellow-700">
                      This bundle will become available automatically after all
                      HTML notes files are uploaded.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                {isContentAvailable ? (
                  <>
                    <p className="flex items-center gap-2 text-sm font-bold text-slate-500">
                      <IndianRupee size={16} />
                      One-time access price
                    </p>

                    <p className="mt-2 text-4xl font-black text-slate-950">
                      ₹1
                    </p>

                    <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                      Unlock full board subject bundle with chapter-wise HTML
                      notes.
                    </p>

                    <div className="mt-5">
                      <PaymentButton
                        amount={1}
                        subjectName={`${selectedBoard.name} ${formatClassName(
                          classSlug
                        )} ${selectedSubject}`}
                        accessKey={accessKey}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-black text-slate-950">
                      Content Upload Pending
                    </p>

                    <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                      Payment is disabled until all HTML notes files for this
                      bundle are uploaded.
                    </p>

                    <button
                      disabled
                      className="mt-5 w-full cursor-not-allowed rounded-full bg-slate-200 px-5 py-3 text-sm font-black text-slate-500"
                    >
                      Coming Soon
                    </button>
                  </>
                )}
              </div>
            </aside>
          </div>

          <div className="mt-12">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
                  Study Resources
                </p>

                <h2 className="mt-2 text-3xl font-black text-slate-950">
                  What you get in this bundle
                </h2>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm">
                <ShieldCheck size={16} className="text-green-600" />
                Preview first, unlock full access
              </div>
            </div>

            {isContentAvailable ? (
              <ResourceAccess resources={resources} accessKey={accessKey} />
            ) : (
              <div className="rounded-[2rem] border border-yellow-200 bg-yellow-50 p-7">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-700">
                  Coming Soon
                </p>

                <h3 className="mt-3 text-2xl font-black text-slate-950">
                  Notes are being prepared
                </h3>

                <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-700">
                  This bundle will automatically become available when all
                  required HTML files are uploaded in the correct folder.
                </p>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm font-bold text-slate-600">
                  Required folder:
                  <br />
                  <span className="text-blue-700">
                    public/html/boards/{board}/{classSlug}/{subjectSlug}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Chapter Notes",
                text: "Clean, structured and exam-oriented notes for fast understanding.",
                icon: FileText,
              },
              {
                title: "Important Questions",
                text: "Practice high-probability questions before your board exams.",
                icon: FileQuestion,
              },
              {
                title: "Quick Revision",
                text: "Revise key points quickly during the final days before exams.",
                icon: BadgeCheck,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
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
        </div>
      </section>
    </main>
  );
}