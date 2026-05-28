import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCourse } from "@/data/courses";
import { Layers } from "lucide-react";

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
          <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-red-600">
              Course Not Found
            </h1>
            <Link href="/" className="text-indigo-600 mt-4 inline-block">
              Go back to courses
            </Link>
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
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-4xl font-bold text-indigo-600">
            Select Semester
          </h1>

          <p className="text-gray-600 mt-3">{course.name}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {course.semesters.map((semester) => (
              <Link
                key={semester.number}
                href={`/semester/${course.slug}-sem${semester.number}`}
                className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="bg-indigo-100 w-fit p-3 rounded-xl">
                  <Layers className="text-indigo-600" />
                </div>

                <h2 className="text-xl font-semibold mt-5">
                  Semester {semester.number}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  {semester.subjects.length > 0
                    ? `${semester.subjects.length} Subject Compilations`
                    : "Coming Soon"}
                </p>

                <div className="mt-6 text-indigo-600 text-sm font-medium">
                  Open Semester →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}