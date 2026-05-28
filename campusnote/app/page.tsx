import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses } from "@/data/courses";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="bg-white border rounded-3xl p-8 md:p-12 shadow-sm">
            <p className="text-sm font-semibold text-indigo-600">
              For Delhi University Students
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 max-w-3xl mt-4">
              Everything You Need For Your Semester In One Place
            </h1>

            <p className="mt-5 text-gray-600 max-w-2xl">
              Access syllabus, notes and PYQs subject-wise for Delhi University.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="#courses"
                className="bg-indigo-600 text-white px-5 py-3 rounded-xl text-center"
              >
                Explore Courses
              </Link>

              <Link
                href="/subject/bcom/sem1/financial-accounting"
                className="border px-5 py-3 rounded-xl text-center bg-white"
              >
                Browse Notes
              </Link>
            </div>
          </div>
        </section>

        <section id="courses" className="max-w-6xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold">Popular Courses</h2>

          <p className="text-gray-600 mt-2">
            Choose your course and browse semester-wise resources.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={`/course/${course.slug}`}
                className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg">{course.name}</h3>

                <p className="text-sm text-gray-500 mt-2">
                  {course.semesters.length} Semesters Available
                </p>

                <p className="text-indigo-600 text-sm mt-5">Explore →</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
            {[
              "Select Course",
              "Select Semester",
              "Purchase Subject Compilation",
              "Access Notes + PYQs + Syllabus",
            ].map((step, index) => (
              <div
                key={step}
                className="bg-white border rounded-2xl p-5 shadow-sm"
              >
                <p className="text-indigo-600 font-bold">
                  Step {index + 1}
                </p>

                <h3 className="font-semibold mt-3">{step}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}