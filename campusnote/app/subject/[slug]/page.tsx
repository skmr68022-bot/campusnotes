import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import {
  FileText,
  Download,
  Eye,
} from "lucide-react";

type SubjectPageProps = {
  params: {
    slug?: string;
  };
};

export default function SubjectPage({
  params,
}: SubjectPageProps) {
  const subjectName = params?.slug
    ? params.slug.replaceAll("-", " ")
    : "Subject";

  const resources = [
    {
      title: "Syllabus",
      size: "1.2 MB",
      file: "/pdfs/syllabus.pdf",
    },
    {
      title: "Notes",
      size: "4.8 MB",
      file: "/pdfs/notes.pdf",
    },
    {
      title: "PYQs",
      size: "2.4 MB",
      file: "/pdfs/pyqs.pdf",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-10">

          <h1 className="text-3xl font-bold text-indigo-600 capitalize">
            {subjectName}
          </h1>

          <p className="text-gray-600 mt-2">
            Access all PDF resources for this subject.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

            <div className="lg:col-span-2 space-y-5">

              {resources.map((item) => (

                <div
                  key={item.title}
                  className="bg-white border rounded-2xl p-5 shadow-sm"
                >

                  <div className="flex gap-4">

                    <div className="bg-indigo-100 p-3 rounded-xl h-fit">
                      <FileText className="text-indigo-600" />
                    </div>

                    <div>

                      <h2 className="font-semibold text-lg">
                        {item.title}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        PDF File • {item.size}
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-3 mt-5">

                    <a
                      href={item.file}
                      target="_blank"
                      className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm hover:bg-gray-50"
                    >

                      <Eye size={16} />

                      View

                    </a>

                    <a
                      href={item.file}
                      download
                      className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-700"
                    >

                      <Download size={16} />

                      Download

                    </a>

                  </div>

                </div>

              ))}

            </div>

            <aside className="bg-white border rounded-2xl p-6 shadow-sm h-fit lg:sticky lg:top-24">

              <h3 className="text-lg font-semibold">
                Compilation Summary
              </h3>

              <div className="mt-4 space-y-2 text-sm text-gray-600">

                <p>✓ Syllabus Included</p>
                <p>✓ Notes Included</p>
                <p>✓ PYQs Included</p>

              </div>

              <p className="text-3xl font-bold text-indigo-600 mt-6">
                ₹99
              </p>

              <button className="w-full bg-indigo-600 text-white py-3 rounded-xl mt-4">
                Buy Compilation
              </button>

            </aside>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}