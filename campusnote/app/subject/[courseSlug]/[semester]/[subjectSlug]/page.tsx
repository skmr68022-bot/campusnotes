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
import { getCourse, getSemester, getSubject } from "@/data/courses";
import {
  getContentStatusFromResources,
  getHtmlFilesFromPublicFolder,
} from "@/data/contentStatus";

type SubjectPageProps = {
  params: Promise<{
    courseSlug: string;
    semester: string;
    subjectSlug: string;
  }>;
};

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { courseSlug, semester, subjectSlug } = await params;

  const semesterNumber = Number(semester.replace("sem", ""));

  const course = getCourse(courseSlug);
  const semesterData = getSemester(courseSlug, semesterNumber);
  const subject = getSubject(courseSlug, semesterNumber, subjectSlug);

  if (!course || !semesterData || !subject) {
    notFound();
  }

  const accessKey = `${courseSlug}-${semesterNumber}-${subject.slug}`;

const notesFolderPath = `/html/${courseSlug}/sem${semesterNumber}/${subject.slug}`;

const dynamicHtmlFiles = getHtmlFilesFromPublicFolder(notesFolderPath);

const dynamicResources = subject.resources.map((resource) => {
  if (resource.title.toLowerCase() === "notes") {
    return {
      ...resource,
      file: notesFolderPath,
      size: `${dynamicHtmlFiles.length} HTML File${
        dynamicHtmlFiles.length === 1 ? "" : "s"
      }`,
      files: dynamicHtmlFiles,
    };
  }

  return resource;
});

const contentStatus = getContentStatusFromResources(dynamicResources);
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
              href="/du"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              ← Delhi University
            </Link>

            <Link
              href={`/course/${course.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              ← {course.name}
            </Link>

            <Link
              href={`/semester/${course.slug}-sem${semesterNumber}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              ← Semester {semesterNumber}
            </Link>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
                <GraduationCap size={17} />
                {course.name} • Semester {semesterNumber}
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                {subject.name} Notes Bundle
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 md:text-lg">
                Premium {subject.name} study material for {course.name} Semester{" "}
                {semesterNumber} students. Access syllabus, unit-wise HTML notes,
                PYQs, quick revision material and exam-focused resources.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Unit-wise HTML Notes",
                  "Exam-oriented Coverage",
                  "Quick Revision",
                  "PYQs Support",
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
                  <span>Course</span>
                  <span>{course.name}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#FFFDF7] p-4 text-sm font-bold text-slate-700">
                  <span>Semester</span>
                  <span>Semester {semesterNumber}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#FFFDF7] p-4 text-sm font-bold text-slate-700">
                  <span>Subject</span>
                  <span>{subject.name}</span>
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
                      This DU subject bundle will become available automatically
                      after all HTML notes files are uploaded.
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
                      ₹{subject.price}
                    </p>

                    <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                      Unlock full DU subject bundle with unit-wise HTML notes,
                      revision material and resources.
                    </p>

                    <div className="mt-5">
                      <PaymentButton
                        amount={subject.price}
                        subjectName={subject.name}
                        accessKey={accessKey}
                      />
                    </div>

                    <Link
                      href="/library"
                      className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                    >
                      Go to My Library
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-black text-slate-950">
                      Content Upload Pending
                    </p>

                    <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                      Payment is disabled until all HTML notes files for this DU
                      subject bundle are uploaded.
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
              <ResourceAccess resources={dynamicResources} accessKey={accessKey} />
            ) : (
              <div className="rounded-[2rem] border border-yellow-200 bg-yellow-50 p-7">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-700">
                  Coming Soon
                </p>

                <h3 className="mt-3 text-2xl font-black text-slate-950">
                  DU notes are being prepared
                </h3>

                <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-700">
                  This DU subject bundle will automatically become available
                  when all required HTML files are uploaded in the correct
                  folder.
                </p>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm font-bold text-slate-600">
                  Required folder:
                  <br />
                  <span className="text-blue-700">
                    public/html/{courseSlug}/sem{semesterNumber}/{subject.slug}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Unit Notes",
                text: "Structured unit-wise notes for concept clarity and exam preparation.",
                icon: FileText,
              },
              {
                title: "PYQs Support",
                text: "Previous year questions help you understand exam pattern and important topics.",
                icon: FileQuestion,
              },
              {
                title: "Quick Revision",
                text: "Final revision resources help you revise faster before exams.",
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