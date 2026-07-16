import Link from "next/link";
import Footer from "@/components/Footer";
import { courses, getSemester } from "@/data/courses";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  FileText,
  GraduationCap,
  IndianRupee,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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
      
        <main className="min-h-screen bg-[#FFFDF7]">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
            <div className="rounded-4xl border bg-white p-8 shadow-sm">
              <h1 className="text-3xl font-black text-red-600">
                Semester Not Found
              </h1>
              <p className="mt-3 text-slate-600">
                The semester you are looking for is not available.
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

  return (
    <>
    

      <main className="min-h-screen bg-[#FFFDF7]">
        <section className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
            <Link
              href={`/course/${course.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-700"
            >
              <ArrowLeft size={16} />
              Back to semesters
            </Link>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
                  <GraduationCap size={16} />
                  {course.name}
                </div>

                <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                  Semester {semester.number} Notes
                </h1>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                  Choose a subject bundle and access syllabus, premium notes and
                  PYQs in a clean PDF format.
                </p>
              </div>

              <div className="rounded-4xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10">
                <p className="text-sm font-bold text-blue-200">
                  Available Resources
                </p>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-3xl font-black">
                      {semester.subjects.length}
                    </p>
                    <p className="text-sm text-slate-400">Subjects</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black">3x</p>
                    <p className="text-sm text-slate-400">PDF types</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-4xl border bg-[#FFFDF7] p-4">
              <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
                <Search className="text-blue-700" size={20} />
                <p className="text-sm font-semibold text-slate-500">
                  Browse available subject bundles below. Search feature can be
                  added later.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
                Subject Bundles
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">
                Pick your subject
              </h2>
            </div>

            <div className="rounded-full bg-green-50 px-5 py-2 text-sm font-bold text-green-700">
              Preview before purchase
            </div>
          </div>

          {semester.subjects.length === 0 ? (
            <div className="mt-8 rounded-4xl border bg-white p-8 text-center shadow-sm">
              <h3 className="text-2xl font-black text-slate-950">
                Subjects coming soon
              </h3>
              <p className="mt-3 text-slate-600">
                Notes for this semester will be added later.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {semester.subjects.map((subject, index) => (
                <div
                  key={subject.slug}
                  className="group rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                      <BookOpen />
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-black text-yellow-700">
                        Subject {index + 1}
                      </span>
                      
                    </div>
                  </div>

                  <h3 className="mt-6 text-2xl font-black text-slate-950">
                    {subject.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Premium subject compilation with syllabus, notes and PYQs
                    for faster exam preparation.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-[#FFFDF7] p-4">
                      <ClipboardList size={18} className="text-blue-700" />
                      <p className="mt-2 text-xs font-bold text-slate-700">
                        Syllabus
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#FFFDF7] p-4">
                      <BookOpen size={18} className="text-blue-700" />
                      <p className="mt-2 text-xs font-bold text-slate-700">
                        Notes
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#FFFDF7] p-4">
                      <FileText size={18} className="text-blue-700" />
                      <p className="mt-2 text-xs font-bold text-slate-700">
                        PYQs
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <p className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <CheckCircle2 size={16} className="text-green-600" />
                      Exam-oriented resources
                    </p>
                    <p className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <ShieldCheck size={16} className="text-blue-600" />
                      PDF access after unlock
                    </p>
                    <p className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <Sparkles size={16} className="text-yellow-600" />
                      Clean premium format
                    </p>
                  </div>

                  <div className="mt-7 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Bundle Price
                      </p>
                      <p className="mt-1 flex items-center text-2xl font-black text-slate-950">
                        <IndianRupee size={22} />
                        {subject.price}
                      </p>
                    </div>

                    <Link
                      href={`/subject/${course.slug}/sem${semester.number}/${subject.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
                    >
                      View Bundle
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}