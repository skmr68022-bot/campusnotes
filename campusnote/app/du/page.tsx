import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  FileText,
  GraduationCap,
  Layers,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses } from "@/data/courses";

const stats = [
  { label: "Semester-wise", value: "6" },
  { label: "Course categories", value: `${courses.length}+` },
  { label: "Student focused", value: "100%" },
];

const benefits = [
  {
    icon: BookOpen,
    title: "Premium Notes",
    text: "Clean, structured and exam-oriented PDF notes made for fast revision.",
  },
  {
    icon: ClipboardList,
    title: "Syllabus + PYQs",
    text: "Everything is organised subject-wise so students do not waste time searching.",
  },
  {
    icon: Zap,
    title: "Quick Revision",
    text: "Short tricks, important questions and last-minute revision support.",
  },
  {
    icon: ShieldCheck,
    title: "Affordable Access",
    text: "Low-cost subject bundles designed for college students.",
  },
];

const steps = [
  "Choose your course",
  "Select semester",
  "Pick your subject",
  "Preview or unlock PDFs",
];

export default function HomePage() {
  const totalSubjects = courses.reduce(
    (total, course) =>
      total +
      course.semesters.reduce(
        (semesterTotal, semester) => semesterTotal + semester.subjects.length,
        0
      ),
    0
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#FFFDF7]">
        <section className="relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#DBEAFE,transparent_35%),radial-gradient(circle_at_top_right,#FEF3C7,transparent_30%)]" />

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
                <Sparkles size={16} />
                Premium notes platform for college students
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
                Study smarter with{" "}
                <span className="bg-linear-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                  exam-oriented notes
                </span>{" "}
                made for your semester.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Get syllabus-wise notes, PYQs, quick revision resources and
                premium PDFs for B.Com, B.Com Hons and other college courses.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#courses"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Explore Notes
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/subject/bcom-hons/sem1/financial-accounting"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700"
                >
                  View Financial Accounting
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {["DU Focused", "PDF Notes", "PYQs Included", "Quick Revision"].map(
                  (item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                    >
                      <CheckCircle2 size={16} className="text-green-600" />
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 -top-4 h-28 w-28 rounded-full bg-yellow-300/40 blur-2xl" />
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-blue-400/30 blur-2xl" />

              <div className="relative rounded-4xl border border-white bg-white/80 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur">
                <div className="rounded-3xl bg-slate-950 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-blue-200">
                      Featured Bundle
                    </p>
                    <span className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-black text-slate-950">
                      Popular
                    </span>
                  </div>

                  <h2 className="mt-5 text-2xl font-black">
                    Financial Accounting
                  </h2>
                  <p className="mt-2 text-sm text-slate-300">
                    B.Com Hons • Semester 1
                  </p>

                  <div className="mt-6 grid gap-3">
                    {["Premium Notes", "Syllabus PDF", "PYQs", "Quick Revision"].map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3"
                        >
                          <span className="text-sm font-semibold">{item}</span>
                          <BadgeCheck size={18} className="text-green-300" />
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 p-4">
                  {stats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border bg-white p-4 text-center"
                    >
                      <p className="text-xl font-black text-slate-950">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="explore" className="mx-auto max-w-7xl px-4 pb-6 md:px-6">
          <div className="rounded-4xl border bg-white p-5 shadow-xl shadow-slate-900/5 md:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                <Search />
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-950">
                  Find notes faster
                </h2>
                <p className="text-sm text-slate-500">
                  Start with your course and semester.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-4">
              {["Delhi University", "B.Com Hons", "Semester 1", "Financial Accounting"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section id="courses" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
                Popular Courses
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                Choose your course
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Browse semester-wise notes, syllabus and PYQs from one clean
                dashboard.
              </p>
            </div>

            <div className="rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-700">
              {totalSubjects}+ subject resources listed
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => {
              const subjectCount = course.semesters.reduce(
                (total, semester) => total + semester.subjects.length,
                0
              );

              return (
                <Link
                  key={course.slug}
                  href={`/course/${course.slug}`}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                    <GraduationCap />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-slate-950">
                    {course.name}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {course.semesters.length} semesters • {subjectCount} subjects
                  </p>

                  <p className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
                    View semesters
                    <ArrowRight size={16} />
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="samples" className="bg-white py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-2">
            <div className="rounded-4xl bg-slate-950 p-8 text-white">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-300">
                Free Preview
              </p>
              <h2 className="mt-4 text-3xl font-black">
                Let students preview before buying.
              </h2>
              <p className="mt-4 leading-7 text-slate-300">
                A premium notes platform should build trust first. Add sample
                PDFs so students can check quality before unlocking full notes.
              </p>

              <Link
                href="/subject/bcom-hons/sem1/financial-accounting"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950"
              >
                Open sample bundle
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border bg-[#FFFDF7] p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
                      <Icon />
                    </div>
                    <h3 className="mt-5 font-black text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
              Simple Process
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">
              How CampusNotes works
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-3xl border bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-700 font-black text-white">
                  {index + 1}
                </div>
                <h3 className="mt-5 font-black text-slate-950">{step}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Step {index + 1} of your study resource journey.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-4xl px-4 pb-20 md:px-6">
          <div className="rounded-4xl border bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
            <h2 className="text-2xl font-black text-slate-950">
              Frequently asked questions
            </h2>

            <div className="mt-6 divide-y">
              {[
                {
                  q: "What is included in a subject bundle?",
                  a: "A subject bundle can include syllabus, premium notes, PYQs and revision resources depending on availability.",
                },
                {
                  q: "Can I access PDFs after payment?",
                  a: "Yes, the subject page unlocks the available full PDFs after successful payment.",
                },
                {
                  q: "Is CampusNotes only for DU?",
                  a: "The current focus is Delhi University, but more universities can be added later.",
                },
              ].map((item) => (
                <div key={item.q} className="py-5">
                  <h3 className="font-black text-slate-950">{item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}