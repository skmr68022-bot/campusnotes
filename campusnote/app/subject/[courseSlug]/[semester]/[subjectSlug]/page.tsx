import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentButton from "@/components/PaymentButton";
import ResourceAccess from "@/components/ResourceAccess";
import { getSubject } from "@/data/courses";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  IndianRupee,
  Lock,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

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
  const subject = getSubject(courseSlug, semesterNumber, subjectSlug);

  if (!subject) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#FFFDF7]">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
            <div className="rounded-4xl border bg-white p-8 shadow-sm">
              <h1 className="text-3xl font-black text-red-600">
                Subject Not Found
              </h1>

              <p className="mt-3 text-slate-600">
                The subject bundle you are looking for is not available.
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white"
              >
                <ArrowLeft size={16} />
                Go back home
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const accessKey = `${courseSlug}-${semesterNumber}-${subject.slug}`;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FFFDF7]">
        <section className="relative overflow-hidden border-b bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563EB,transparent_36%),radial-gradient(circle_at_top_right,#FACC15,transparent_24%)] opacity-50" />

          <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
            <Link
              href={`/semester/${courseSlug}-sem${semesterNumber}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to subjects
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
              <div>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-blue-100 backdrop-blur">
                    <GraduationCap size={16} />
                    Semester {semesterNumber}
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-yellow-100 backdrop-blur">
                    <Sparkles size={16} />
                    Premium Bundle
                  </span>
                </div>

                <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
                  {subject.name}
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  Unlock syllabus, premium notes and PYQs in one clean subject
                  bundle made for faster exam preparation.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "Syllabus-wise",
                    "PYQs included",
                    "PDF access",
                    "Preview available",
                  ].map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white"
                    >
                      <CheckCircle2 size={16} className="text-green-300" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <aside className="rounded-4xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-sm font-bold text-blue-200">
                  Bundle Price
                </p>

                <p className="mt-3 flex items-center text-5xl font-black">
                  <IndianRupee size={38} />
                  {subject.price}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  One-time unlock for this subject compilation.
                </p>

                <div className="mt-6 rounded-2xl bg-white/10 p-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-green-200">
                    <BadgeCheck size={17} />
                    Full PDFs unlock after payment
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
                    Bundle Resources
                  </p>
                  <h2 className="mt-3 text-3xl font-black text-slate-950">
                    Preview and unlock files
                  </h2>
                  <p className="mt-3 max-w-2xl text-slate-600">
                    Preview sample files first. Full resources unlock after
                    successful payment.
                  </p>
                </div>
              </div>

              <ResourceAccess
                resources={subject.resources}
                accessKey={accessKey}
              />
            </div>

            <aside className="h-fit rounded-4xl border bg-white p-6 shadow-xl shadow-slate-900/5 lg:sticky lg:top-24">
              <div className="rounded-3xl bg-slate-950 p-5 text-white">
                <p className="text-sm font-bold text-blue-200">
                  Compilation Summary
                </p>

                <h3 className="mt-3 text-2xl font-black">{subject.name}</h3>

                <p className="mt-2 text-sm text-slate-300">
                  B.Com Hons style subject bundle for semester preparation.
                </p>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  {
                    icon: FileText,
                    text: "Syllabus preview available",
                  },
                  {
                    icon: BookOpen,
                    text: "Premium notes included",
                  },
                  {
                    icon: Star,
                    text: "PYQs included",
                  },
                  {
                    icon: Lock,
                    text: "Full files unlock after payment",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.text}
                      className="flex items-center gap-3 rounded-2xl bg-[#FFFDF7] p-4 text-sm font-bold text-slate-700"
                    >
                      <Icon size={18} className="text-blue-700" />
                      {item.text}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border bg-blue-50 p-4">
                <p className="text-sm font-black text-blue-800">
                  Why this bundle?
                </p>

                <div className="mt-3 space-y-2 text-sm font-semibold text-blue-900">
                  <p className="flex gap-2">
                    <ShieldCheck size={17} />
                    Structured for exam preparation
                  </p>
                  <p className="flex gap-2">
                    <Clock size={17} />
                    Saves searching time
                  </p>
                  <p className="flex gap-2">
                    <BadgeCheck size={17} />
                    One place for notes + PYQs
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Total
                  </p>

                  <p className="mt-1 flex items-center text-4xl font-black text-slate-950">
                    <IndianRupee size={30} />
                    {subject.price}
                  </p>
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700">
                  Student Price
                </span>
              </div>

              <PaymentButton
                amount={subject.price}
                subjectName={subject.name}
                accessKey={accessKey}
              />

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                After successful payment, files unlock on this device/browser.
              </p>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}