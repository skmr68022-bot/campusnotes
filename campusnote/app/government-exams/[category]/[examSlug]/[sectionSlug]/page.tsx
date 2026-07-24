import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  FileQuestion,
  FileText,
  IndianRupee,
  Newspaper,
  ShieldCheck,
  Target,
} from "lucide-react";
import ResourceAccess from "@/components/ResourceAccess";
import PaymentButton from "@/components/PaymentButton";
import PurchaseStatus from "@/components/PurchaseStatus";
import {
  getContentStatusFromResources,
  getHtmlFilesFromPublicFolder,
} from "@/data/contentStatus";

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

const createGovernmentHtmlNoteFiles = (
  category: string,
  examSlug: string,
  sectionSlug: string
) => {
  const basePath = `/html/government-exams/${category}/${examSlug}/${sectionSlug}`;

  return [
    {
      title: "Chapter 1: Basic Concepts",
      file: `${basePath}/chapter-1.html`,
    },
    {
      title: "Chapter 2: Important Theory",
      file: `${basePath}/chapter-2.html`,
    },
    {
      title: "Chapter 3: Solved Examples",
      file: `${basePath}/chapter-3.html`,
    },
    {
      title: "Chapter 4: Exam Tricks",
      file: `${basePath}/chapter-4.html`,
    },
    {
      title: "Chapter 5: Advanced Practice",
      file: `${basePath}/chapter-5.html`,
    },
    {
      title: "Practice Set",
      file: `${basePath}/practice-set.html`,
    },
    {
      title: "Previous Year Questions",
      file: `${basePath}/pyqs.html`,
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

type GovernmentBundlePageProps = {
  params: Promise<{
    category: string;
    examSlug: string;
    sectionSlug: string;
  }>;
};

export default async function GovernmentBundlePage({
  params,
}: GovernmentBundlePageProps) {
  const { category, examSlug, sectionSlug } = await params;

  const selectedCategory = examCategories.find(
    (item) => item.slug === category
  );

  if (!selectedCategory || !selectedCategory.exams.includes(examSlug)) {
    notFound();
  }

  const sections = sectionsByCategory[category];

  const selectedSection = sections.find(
    (section) => slugify(section) === sectionSlug
  );

  if (!selectedSection) {
    notFound();
  }

  const examName = examNames[examSlug];
  const accessKey = `government-${category}-${examSlug}-${sectionSlug}`;

  const notesFolderPath = `/html/government-exams/${category}/${examSlug}/${sectionSlug}`;
const dynamicHtmlFiles = getHtmlFilesFromPublicFolder(notesFolderPath);

const resources = [
  {
    title: "Syllabus",
    size: "Exam Syllabus",
    file: `/pdfs/government-exams/${category}/${examSlug}/${sectionSlug}/syllabus.pdf`,
  },
  {
    title: "Notes",
    size: `${dynamicHtmlFiles.length} HTML File${
      dynamicHtmlFiles.length === 1 ? "" : "s"
    }`,
    file: notesFolderPath,
    files: dynamicHtmlFiles,
  },
  {
    title: "Practice + PYQs",
    size: "Exam Practice",
    file: `/pdfs/government-exams/${category}/${examSlug}/${sectionSlug}/practice-pyqs.pdf`,
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
              href="/government-exams"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              ← Government Exams
            </Link>

            <Link
              href={`/government-exams/${selectedCategory.slug}/${examSlug}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              ← {examName}
            </Link>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
                <Target size={17} />
                {examName} • {selectedSection}
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                {selectedSection} Prep Bundle
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 md:text-lg">
                Premium {selectedSection} preparation material for {examName}.
                Get topic-wise notes, practice sets, PYQs, tricks and quick
                revision resources in one exam-focused bundle.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Topic-wise HTML Notes",
                  "Practice Sets",
                  "PYQs Support",
                  "Final Revision",
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
                  <span>Category</span>
                  <span>{selectedCategory.name}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#FFFDF7] p-4 text-sm font-bold text-slate-700">
                  <span>Exam</span>
                  <span>{examName}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#FFFDF7] p-4 text-sm font-bold text-slate-700">
                  <span>Section</span>
                  <span>{selectedSection}</span>
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
                      Unlock full exam preparation bundle with notes and
                      practice material.
                    </p>

                    <div className="mt-5">
                      <PaymentButton
                        amount={1}
                        subjectName={`${examName} ${selectedSection}`}
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
                  Preparation Resources
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
                  Preparation material is being prepared
                </h3>

                <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-700">
                  This bundle will automatically become available when all
                  required HTML files are uploaded in the correct folder.
                </p>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm font-bold text-slate-600">
                  Required folder:
                  <br />
                  <span className="text-blue-700">
                    public/html/government-exams/{category}/{examSlug}/
                    {sectionSlug}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Concept Notes",
                text: "Structured notes to understand important topics quickly.",
                icon: FileText,
              },
              {
                title: "Practice + PYQs",
                text: "Practice questions and previous year question support.",
                icon: FileQuestion,
              },
              {
                title: "Current Revision",
                text: "Quick revision material for final exam preparation.",
                icon: Newspaper,
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