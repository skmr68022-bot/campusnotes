import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses, getSemester } from "@/data/courses";
import { ArrowRight, BookOpen, ChevronRight, ClipboardList, FileText } from "lucide-react";

type SemesterPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SemesterPage({ params }: SemesterPageProps) {
  const { id } = await params;
  const semesterMatch = id.match(/-sem(\d+)$/);
  const semesterNumber = semesterMatch ? Number(semesterMatch[1]) : 1;
  const courseSlug = id.replace(/-sem\d+$/, "");
  const course = courses.find((item) => item.slug === courseSlug);
  const semester = getSemester(courseSlug, semesterNumber);

  if (!course || !semester) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h1 className="text-3xl font-bold text-slate-900">Semester not found</h1>
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
            <span className="text-slate-700">Semester {semester.number}</span>
          </nav>

          <section className="mt-6 flex flex-col justify-between gap-5 rounded-3xl border border-indigo-100 bg-white p-7 sm:flex-row sm:items-end sm:p-9">
            <div>
              <p className="text-sm font-semibold text-indigo-600">Subject compilations</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">
                {course.name} • Semester {semester.number}
              </h1>
              <p className="mt-3 text-slate-600">
                Preview notes, syllabus and PYQs before purchasing a complete bundle.
              </p>
            </div>
            <div className="rounded-2xl bg-indigo-50 px-5 py-4 text-center">
              <p className="text-2xl font-bold text-indigo-700">{semester.subjects.length}</p>
              <p className="text-sm text-indigo-700">Bundles available</p>
            </div>
          </section>

          {semester.subjects.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
              <h2 className="text-xl font-semibold text-slate-900">Resources coming soon</h2>
              <p className="mt-2 text-sm text-slate-500">No subject compilations have been added for this semester yet.</p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              {semester.subjects.map((subject, index) => (
                <article key={subject.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-200 hover:shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Subject {index + 1}</p>
                      <h2 className="mt-2 text-xl font-semibold text-slate-900">{subject.name}</h2>
                    </div>
                    <span className="whitespace-nowrap rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-bold text-indigo-700">₹{subject.price}</span>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs font-medium text-slate-600">
                    <p className="rounded-xl bg-slate-50 px-2 py-3"><ClipboardList size={16} className="mx-auto mb-1.5 text-indigo-600" />Syllabus</p>
                    <p className="rounded-xl bg-slate-50 px-2 py-3"><BookOpen size={16} className="mx-auto mb-1.5 text-indigo-600" />Notes</p>
                    <p className="rounded-xl bg-slate-50 px-2 py-3"><FileText size={16} className="mx-auto mb-1.5 text-indigo-600" />PYQs</p>
                  </div>

                  <Link
                    href={`/subject/${course.slug}/sem${semester.number}/${subject.slug}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    Preview &amp; Buy Bundle <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
