import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCourse } from "@/data/courses";
import { ArrowRight, ChevronRight, Layers } from "lucide-react";

 type CoursePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h1 className="text-3xl font-bold text-slate-900">Course not found</h1>
              <p className="mt-3 text-slate-600">The selected course is unavailable right now.</p>
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
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-indigo-600">Home</Link>
            <ChevronRight size={15} />
            <span className="text-slate-700">{course.name}</span>
          </nav>

          <section className="mt-6 rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-white p-7 sm:p-10">
            <p className="text-sm font-semibold text-indigo-600">Delhi University Programme</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{course.name}</h1>
            <p className="mt-3 max-w-xl text-slate-600">
              Choose your semester to find subject-wise syllabus, notes and PYQ compilations.
            </p>
          </section>

          <div className="mt-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Select Semester</h2>
              <p className="mt-2 text-sm text-slate-500">Bundles are shown subject-wise inside each semester.</p>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {course.semesters.map((semester) => {
              const available = semester.subjects.length > 0;

              return (
                <Link
                  key={semester.number}
                  href={available ? `/semester/${course.slug}-sem${semester.number}` : "#"}
                  aria-disabled={!available}
                  className={`group rounded-2xl border bg-white p-6 shadow-sm transition ${
                    available
                      ? "border-slate-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                      : "cursor-not-allowed border-slate-100 opacity-65"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-fit rounded-xl bg-indigo-50 p-3 text-indigo-600">
                      <Layers size={22} />
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${available ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                      {available ? "Available" : "Coming Soon"}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-slate-900">Semester {semester.number}</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {available ? `${semester.subjects.length} Subject Compilations` : "Resources will be added soon"}
                  </p>

                  {available && (
                    <p className="mt-6 flex items-center gap-1 text-sm font-semibold text-indigo-600">
                      Open Semester <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
