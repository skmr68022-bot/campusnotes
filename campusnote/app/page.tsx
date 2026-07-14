import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses } from "@/data/courses";
import { ArrowRight, BookOpen, ClipboardList, FileText, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";

export default function HomePage() {
  const totalSubjects = courses.reduce(
    (total, course) => total + course.semesters.reduce((sum, semester) => sum + semester.subjects.length, 0),
    0
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <section className="overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-slate-50">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
                <GraduationCap size={17} /> Built for Delhi University students
              </p>

              <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                DU Notes, PYQs &amp; Syllabus in one exam-ready bundle
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Select your course and semester, preview the material, and get subject-wise study resources in a few simple steps.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#courses"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-sm hover:bg-indigo-700"
                >
                  Explore Courses <ArrowRight size={18} />
                </Link>
                <Link
                  href="/subject/bcom/sem1/financial-accounting"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
                >
                  View Sample Bundle
                </Link>
              </div>

              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-600">
                <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-emerald-600" /> Preview available</span>
                <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-emerald-600" /> One-time payment</span>
                <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-emerald-600" /> Mobile friendly</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-indigo-200/60 blur-3xl" />
              <div className="absolute -right-8 bottom-8 h-28 w-28 rounded-full bg-purple-200/70 blur-3xl" />
              <div className="relative rounded-3xl border border-white bg-white p-5 shadow-xl shadow-indigo-100/70">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Complete exam bundle</p>
                    <h2 className="mt-2 font-semibold text-slate-900">Financial Accounting</h2>
                    <p className="mt-1 text-sm text-slate-500">B.Com • Semester 1</p>
                  </div>
                  <div className="rounded-2xl bg-indigo-50 px-4 py-3 text-center">
                    <p className="text-xs text-slate-500">From</p>
                    <p className="text-xl font-bold text-indigo-700">₹1</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    { name: "Simplified Notes", icon: BookOpen },
                    { name: "Previous Year Questions", icon: FileText },
                    { name: "Official Syllabus", icon: ClipboardList },
                  ].map(({ name, icon: Icon }) => (
                    <div key={name} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                      <span className="rounded-lg bg-white p-2 text-indigo-600"><Icon size={18} /></span>
                      <p className="text-sm font-medium text-slate-700">{name}</p>
                      <span className="ml-auto rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">Included</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl bg-indigo-600 p-3 text-center text-sm font-semibold text-white">
                  Preview before purchase
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-7 text-center md:grid-cols-4">
            {[
              { value: `${courses.length}+`, label: "DU Courses" },
              { value: `${totalSubjects}+`, label: "Subject Bundles" },
              { value: "3", label: "PDF Types per Bundle" },
              { value: "6", label: "Semesters Covered" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                <p className="mt-1 text-sm text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="courses" className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-indigo-600">Choose your programme</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Popular DU Courses</h2>
              <p className="mt-2 text-slate-600">Open your course to choose a semester and subject compilation.</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((course, index) => {
              const subjectCount = course.semesters.reduce((sum, semester) => sum + semester.subjects.length, 0);

              return (
                <Link
                  key={course.slug}
                  href={`/course/${course.slug}`}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                >
                  {index < 3 && (
                    <span className="absolute right-4 top-4 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                      Popular
                    </span>
                  )}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <GraduationCap size={22} />
                  </div>
                  <h3 className="mt-5 pr-16 text-lg font-semibold text-slate-900">{course.name}</h3>
                  <p className="mt-2 text-sm text-slate-500">{course.semesters.length} semesters • {subjectCount} bundles</p>
                  <p className="mt-6 flex items-center gap-1 text-sm font-semibold text-indigo-600">
                    View semesters <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-xl">
              <p className="flex items-center gap-2 text-sm font-semibold text-indigo-600"><Sparkles size={16} /> Everything in one bundle</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Prepared for quick exam revision</h2>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                { title: "Syllabus", text: "See the subject structure and units you need to cover.", icon: ClipboardList },
                { title: "Notes", text: "Study from simplified, subject-wise revision material.", icon: BookOpen },
                { title: "PYQs", text: "Practise using previous year examination questions.", icon: FileText },
              ].map(({ title, text, icon: Icon }) => (
                <div key={title} className="rounded-2xl border border-slate-200 p-6">
                  <div className="w-fit rounded-xl bg-indigo-50 p-3 text-indigo-600"><Icon size={23} /></div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <div className="rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10">
            <h2 className="text-2xl font-bold sm:text-3xl">How CampusNotes works</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-4">
              {["Select your course", "Choose semester", "Preview subject bundle", "Buy and access PDFs"].map((step, index) => (
                <div key={step} className="relative">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold">{index + 1}</span>
                  <p className="mt-4 text-sm font-medium text-slate-100">{step}</p>
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
