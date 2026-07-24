import Link from "next/link";
import Footer from "@/components/Footer";
import { getCourse } from "@/data/courses";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Layers,
  Lock,
  Sparkles,
} from "lucide-react";

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
        
        <main className="min-h-screen bg-[#FFFDF7]">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
            <div className="rounded-4xl border bg-white p-8 shadow-sm">
              <h1 className="text-3xl font-black text-red-600">
                Course Not Found
              </h1>
              <p className="mt-3 text-slate-600">
                The course you are looking for is not available yet.
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

  const totalSubjects = course.semesters.reduce(
    (total, semester) => total + semester.subjects.length,
    0
  );

  return (
    <>
      

      <main className="min-h-screen bg-[#FFFDF7]">
        <section className="relative overflow-hidden border-b bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563EB,transparent_35%),radial-gradient(circle_at_top_right,#FACC15,transparent_25%)] opacity-50" />

          <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-blue-100 backdrop-blur">
                  <GraduationCap size={16} />
                  Course Dashboard
                </div>

                <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
                  {course.name}
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  Select your semester and access subject-wise notes, syllabus,
                  PYQs and exam-focused resources in one place.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-3xl font-black">{course.semesters.length}</p>
                  <p className="mt-1 text-sm font-medium text-slate-300">
                    Semesters
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-3xl font-black">{totalSubjects}</p>
                  <p className="mt-1 text-sm font-medium text-slate-300">
                    Subjects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
                Select Semester
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                Continue your semester preparation
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Open a semester to view all available subject compilations.
              </p>
            </div>

            <div className="rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-700">
              Semester-wise resources
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {course.semesters.map((semester) => {
              const available = semester.subjects.length > 0;

              return (
                <Link
                  key={semester.number}
                  href={
                    available
                      ? `/semester/${course.slug}-sem${semester.number}`
                      : `/course/${course.slug}`
                  }
                  className={`group rounded-[1.6rem] border bg-white p-6 shadow-sm transition ${
                    available
                      ? "hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10"
                      : "cursor-not-allowed opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-13 w-13 items-center justify-center rounded-2xl ${
                        available
                          ? "bg-blue-50 text-blue-700 group-hover:bg-blue-700 group-hover:text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {available ? <Layers /> : <Lock />}
                    </div>

                    
                  </div>

                  <h3 className="mt-6 text-2xl font-black text-slate-950">
                    Semester {semester.number}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {available
                      ? `${semester.subjects.length} subject compilations available with notes, syllabus and PYQs.`
                      : "Resources for this semester will be added soon."}
                  </p>

                  <div className="mt-6 space-y-2">
                    <p className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <CheckCircle2 size={16} className="text-green-600" />
                      Subject-wise bundles
                    </p>
                    <p className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <BookOpen size={16} className="text-blue-600" />
                      Notes + PYQs + Syllabus
                    </p>
                    <p className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <Clock size={16} className="text-yellow-600" />
                      Quick exam revision
                    </p>
                  </div>

                  <div
                    className={`mt-7 inline-flex items-center gap-2 text-sm font-black ${
                      available ? "text-blue-700" : "text-slate-400"
                    }`}
                  >
                    {available ? "Open semester" : "Not available yet"}
                    {available && <ArrowRight size={16} />}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
          <div className="rounded-4xl border bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-sm font-black text-yellow-700">
                  <Sparkles size={16} />
                  Premium Study System
                </div>
                <h2 className="mt-4 text-2xl font-black text-slate-950 md:text-3xl">
                  Designed for fast semester preparation
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {["Syllabus-wise", "PYQ-focused", "Revision-ready"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-[#FFFDF7] p-5 text-sm font-bold text-slate-700"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}