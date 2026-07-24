import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Library,
  Lock,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Unlock,
  Zap,
} from "lucide-react";

import { getCourse, getSemester, getSubject } from "@/data/courses";
import {
  getContentStatusFromResources,
  getHtmlFilesFromPublicFolder,
} from "@/data/contentStatus";
import PaymentButton from "@/components/PaymentButton";
import ResourceAccess from "@/components/ResourceAccess";
import PurchaseStatus from "@/components/PurchaseStatus";

type SubjectPageProps = {
  params: Promise<{
    courseSlug: string;
    semester: string;
    subjectSlug: string;
  }>;
};

const getSemesterNumber = (semester: string) => {
  return Number(semester.replace("sem", ""));
};

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { courseSlug, semester, subjectSlug } = await params;

  const semesterNumber = getSemesterNumber(semester);
  const course = getCourse(courseSlug);
  const selectedSemester = getSemester(courseSlug, semesterNumber);
  const subject = getSubject(courseSlug, semesterNumber, subjectSlug);

  if (!course || !selectedSemester || !subject) {
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

  const totalFiles = dynamicHtmlFiles.length;

  const benefits = [
    {
      title: "Premium Notes",
      description: "Structured HTML notes with clean formatting and exam focus.",
      icon: BookOpen,
    },
    {
      title: "Quick Revision",
      description: "Fast revision material for last-day preparation.",
      icon: Zap,
    },
    {
      title: "PYQ-Oriented",
      description: "Material designed around semester exam preparation.",
      icon: Trophy,
    },
    {
      title: "Library Access",
      description: "Unlocked notes can be accessed from My Library.",
      icon: Library,
    },
  ];

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      <section className="relative overflow-hidden px-4 py-10 sm:py-14">
        <div className="absolute -left-30 -top-30 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
        <div className="absolute -bottom-35 -right-30 h-80 w-80 rounded-full bg-yellow-200/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href={`/semester/sem${semesterNumber}?course=${courseSlug}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
          >
            <ArrowLeft size={17} />
            Back to Semester {semesterNumber}
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm">
                <GraduationCap size={15} />
                Delhi University Bundle
              </div>

              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] tracking-tighter text-slate-950 sm:text-6xl">
                {subject.name}
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600">
                {subject.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
                  {course.name}
                </span>

                <span className="rounded-full bg-yellow-50 px-4 py-2 text-sm font-black text-yellow-700">
                  Semester {semesterNumber}
                </span>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-black ${
                    isContentAvailable
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-orange-50 text-orange-700"
                  }`}
                >
                  {isContentAvailable ? "Available" : "Coming Soon"}
                </span>
              </div>

              <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <FileText className="text-blue-600" size={24} />
                  <p className="mt-3 text-2xl font-black text-slate-950">
                    {totalFiles}
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Uploaded HTML Files
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <Clock className="text-emerald-600" size={24} />
                  <p className="mt-3 text-2xl font-black text-slate-950">
                    24/7
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Study Access
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <Star className="text-yellow-600" size={24} />
                  <p className="mt-3 text-2xl font-black text-slate-950">
                    PYQ
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Exam Focused
                  </p>
                </div>
              </div>
            </div>

            <aside className="rounded-4xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="rounded-3xl bg-linear-to-br from-slate-950 to-blue-700 p-6 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-200">
                      Bundle Price
                    </p>

                    <h2 className="mt-2 text-4xl font-black">
                      {subject.price}
                    </h2>

                    <p className="mt-2 text-sm font-semibold text-blue-100">
                      One-time unlock for this subject bundle.
                    </p>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                    {isContentAvailable ? (
                      <Unlock size={28} />
                    ) : (
                      <Lock size={28} />
                    )}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                    <CheckCircle2 size={18} className="text-emerald-300" />
                    <p className="text-sm font-bold">
                      Premium notes and revision files
                    </p>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                    <CheckCircle2 size={18} className="text-emerald-300" />
                    <p className="text-sm font-bold">
                      Subject-wise organised access
                    </p>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                    <CheckCircle2 size={18} className="text-emerald-300" />
                    <p className="text-sm font-bold">
                      Works on mobile and desktop
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <PurchaseStatus accessKey={accessKey} />
              </div>

              {isContentAvailable ? (
                <div className="mt-5">
                  <PaymentButton
                    amount={subject.price}
                    subjectName={subject.name}
                    accessKey={accessKey}
                  />
                </div>
              ) : (
                <div className="mt-5 rounded-3xl bg-orange-50 p-5">
                  <p className="text-sm font-black text-orange-800">
                    Content is being prepared
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-orange-700">
                    This bundle will become available after notes are uploaded.
                  </p>
                </div>
              )}

              <div className="mt-5 rounded-3xl bg-slate-50 p-5">
                <p className="flex items-center gap-2 text-sm font-black text-slate-950">
                  <ShieldCheck size={18} className="text-blue-600" />
                  Access Status
                </p>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  Before purchase, files stay locked. After purchase, notes
                  unlock in this browser and appear in My Library.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-600">
                  Bundle Files
                </p>

                <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-950">
                  What you will get
                </h2>
              </div>

              <p className="max-w-md text-sm font-medium leading-6 text-slate-600">
                Preview the available resources. Full access unlocks after
                successful purchase.
              </p>
            </div>

            <div className="mt-7">
              <ResourceAccess
                resources={dynamicResources}
                accessKey={accessKey}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-4 text-lg font-black text-slate-950">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-xl sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-300">
                Exam Preparation
              </p>

              <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-[-0.04em]">
                Use this bundle for faster revision and better answer writing.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                Open notes, revise important questions, check PYQ-focused
                material and keep everything organised in one subject page.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/library"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50"
              >
                My Library
                <Library size={18} />
              </Link>

              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-700"
              >
                Search More Notes
                <Sparkles size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}