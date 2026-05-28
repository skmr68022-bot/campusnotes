import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const courses = [
  "B.Com",
  "B.Com (Hons.)",
  "B.A. Programme",
  "B.A. (Hons.) English",
  "B.A. (Hons.) Political Science",
  "B.A. (Hons.) History",
  "B.A. (Hons.) Economics",
  "B.A. (Hons.) Psychology",
  "B.Sc. (Hons.) Computer Science",
  "B.Sc. Physical Sciences",
  "B.Sc. Life Sciences",
  "B.Sc. (Hons.) Mathematics",
  "B.Sc. (Hons.) Chemistry",
  "B.Sc. (Hons.) Physics",
  "B.A. Programme (History + Political Science)",
  "B.A. Programme (English + Political Science)",
  "B.A. Programme (English + Economics)",
  "BMS (Bachelor of Management Studies)",
  "BBA FIA",
  "B.A. (Hons.) Journalism & Mass Communication",
];

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
                href="/course/bcom"
                className="bg-indigo-600 text-white px-5 py-3 rounded-xl text-center"
              >
                Explore Courses
              </Link>

              <Link
                href="/subject/financial-accounting"
                className="border px-5 py-3 rounded-xl text-center bg-white"
              >
                Browse Notes
              </Link>

            </div>

          </div>

        </section>

        <section className="max-w-6xl mx-auto px-4 pb-16">

          <h2 className="text-2xl font-bold">
            Popular Courses
          </h2>

          <p className="text-gray-600 mt-2">
            Choose your course and browse semester-wise resources.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">

            {courses.map((course) => (

              <Link
                key={course}
                href={`/course/${course
                  .toLowerCase()
                  .replaceAll(" ", "-")
                  .replaceAll(".", "")
                  .replaceAll("(", "")
                  .replaceAll(")", "")
                  .replaceAll("+", "plus")
                  .replaceAll("&", "and")}`}
                className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              >

                <h3 className="font-semibold text-lg">
                  {course}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  6 Semesters
                </p>

                <p className="text-indigo-600 text-sm mt-5">
                  Explore →
                </p>

              </Link>

            ))}

          </div>

        </section>

        <section className="max-w-6xl mx-auto px-4 pb-16">

          <h2 className="text-2xl font-bold">
            How It Works
          </h2>

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

                <h3 className="font-semibold mt-3">
                  {step}
                </h3>

              </div>

            ))}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}