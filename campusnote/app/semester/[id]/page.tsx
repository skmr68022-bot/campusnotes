import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import {
  BookOpen,
  FileText,
  ClipboardList,
} from "lucide-react";

type SemesterPageProps = {
  params: {
    id?: string;
  };
};

export default function SemesterPage({ params }: SemesterPageProps) {
  const semesterName = params?.id
    ? params.id.replaceAll("-", " ").toUpperCase()
    : "SEMESTER";

  const subjects = [
    "Financial Accounting",
    "Business Law",
    "Business Economics",
    "Computer Applications",
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-indigo-600">
            {semesterName}
          </h1>

          <p className="text-gray-600 mt-2">
            Choose a subject compilation to preview or purchase.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {subjects.map((subject, index) => (
              <div
                key={subject}
                className="bg-white border rounded-2xl p-5 shadow-sm"
              >
                <p className="text-sm text-indigo-600 font-semibold">
                  Subject {index + 1}
                </p>

                <h2 className="text-xl font-semibold mt-2">
                  {subject}
                </h2>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <ClipboardList size={16} /> Syllabus Included
                  </p>

                  <p className="flex items-center gap-2">
                    <BookOpen size={16} /> Notes Included
                  </p>

                  <p className="flex items-center gap-2">
                    <FileText size={16} /> PYQs Included
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xl font-bold text-indigo-600">
                    ₹99
                  </span>

                  <div className="flex gap-3">
                    <Link
                      href={`/subject/${subject
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                      className="border px-4 py-2 rounded-xl text-sm"
                    >
                      Preview
                    </Link>

                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}