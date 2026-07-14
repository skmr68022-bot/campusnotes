import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentButton from "@/components/PaymentButton";
import ResourceAccess from "@/components/ResourceAccess";
import { getCourse, getSubject } from "@/data/courses";
import { CheckCircle2, ChevronRight, ShieldCheck } from "lucide-react";

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
  const course = getCourse(courseSlug);

  if (!subject || !course) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h1 className="text-3xl font-bold text-slate-900">Subject not found</h1>
              <p className="mt-3 text-slate-600">This subject bundle is unavailable right now.</p>
              <Link href="/" className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700">
                Go back to courses
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

      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-indigo-600">Home</Link>
            <ChevronRight size={15} />
            <Link href={`/course/${course.slug}`} className="hover:text-indigo-600">{course.name}</Link>
            <ChevronRight size={15} />
            <Link href={`/semester/${course.slug}-sem${semesterNumber}`} className="hover:text-indigo-600">Semester {semesterNumber}</Link>
            <ChevronRight size={15} />
            <span className="text-slate-700">{subject.name}</span>
          </nav>

          <section className="mt-6 rounded-3xl border border-indigo-100 bg-white p-6 sm:p-9">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                  Complete Exam Bundle
                </span>
                <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">{subject.name}</h1>
                <p className="mt-3 text-slate-600">{course.name} • Semester {semesterNumber} • Notes, PYQs and syllabus included</p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5"><ShieldCheck size={17} className="text-emerald-600" /> Preview first</span>
                <span className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5"><CheckCircle2 size={17} className="text-indigo-600" /> One-time access</span>
              </div>
            </div>
          </section>

          <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <ResourceAccess resources={subject.resources} accessKey={accessKey} />

            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <p className="text-sm font-semibold text-indigo-600">COMPILATION SUMMARY</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">What you will receive</h2>

              <div className="mt-5 space-y-3 text-sm text-slate-600">
                {["Syllabus PDF", "Subject Notes PDF", "Previous Year Questions PDF"].map((item) => (
                  <p key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={17} className="text-emerald-600" /> {item}
                  </p>
                ))}
              </div>

              <div className="mt-7 border-t border-slate-100 pt-5">
                <p className="text-sm text-slate-500">Bundle price</p>
                <p className="mt-1 text-4xl font-bold text-slate-900">₹{subject.price}</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Preview files before purchase. Access is unlocked after successful payment.
                </p>
              </div>

              <PaymentButton
                amount={subject.price}
                subjectName={subject.name}
                accessKey={accessKey}
                courseSlug={courseSlug}
                semesterNumber={semesterNumber}
                subjectSlug={subject.slug}
              />
              <Link href="/library" className="mt-3 block text-center text-sm font-medium text-indigo-600 hover:text-indigo-700">
                View My Library
              </Link>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
