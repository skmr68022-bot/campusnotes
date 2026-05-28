import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import { Layers } from "lucide-react";

type CoursePageProps = {
  params: {
    slug?: string;
  };
};

export default function CoursePage({ params }: CoursePageProps) {
  const courseName = params?.slug
    ? params.slug.replaceAll("-", " ").toUpperCase()
    : "COURSE";

  const courseSlug = params?.slug || "bcom-hons";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-10">

          <h1 className="text-4xl font-bold text-indigo-600">
            {courseName}
          </h1>

          <p className="text-gray-600 mt-3 max-w-2xl">
            Browse semester-wise subject compilations including syllabus,
            notes and previous year questions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">

            {[1, 2, 3, 4, 5, 6].map((sem) => (

              <Link
                key={sem}
                href={`/semester/${courseSlug}-sem${sem}`}
                className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >

                <div className="bg-indigo-100 w-fit p-3 rounded-xl">
                  <Layers className="text-indigo-600" />
                </div>

                <h2 className="text-xl font-semibold mt-5">
                  Semester {sem}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  4 Subject Compilations
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