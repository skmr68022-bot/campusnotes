import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentButton from "@/components/PaymentButton";
import ResourceAccess from "@/components/ResourceAccess";
import { getSubject } from "@/data/courses";

type SubjectPageProps = {
  params: Promise<{
    courseSlug: string;
    semester: string;
    subjectSlug: string;
  }>;
};

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { courseSlug, semester, subjectSlug } = await params;

  const semesterNumber = Number(semester.replace("sem", ""));
  const subject = getSubject(courseSlug, semesterNumber, subjectSlug);

  if (!subject) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-red-600">
              Subject Not Found
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

  const accessKey = `${courseSlug}-${semesterNumber}-${subject.slug}`;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-indigo-600">
            {subject.name}
          </h1>

          <p className="text-gray-600 mt-2">
            Preview sample pages before purchase. Full PDFs unlock after payment.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <ResourceAccess
              resources={subject.resources}
              accessKey={accessKey}
            />

            <aside className="bg-white border rounded-2xl p-6 shadow-sm h-fit lg:sticky lg:top-24">
              <h3 className="text-lg font-semibold">
                Compilation Summary
              </h3>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>✓ Syllabus Preview Available</p>
                <p>✓ Notes Preview Available</p>
                <p>✓ PYQs Preview Available</p>
                <p>🔒 Full PDFs unlock after payment</p>
              </div>

              <p className="text-3xl font-bold text-indigo-600 mt-6">
                ₹{subject.price}
              </p>

              <PaymentButton
                amount={subject.price}
                subjectName={subject.name}
                accessKey={accessKey}
              />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}