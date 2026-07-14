import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-500 font-black">
                CN
              </div>

              <div>
                <h2 className="text-xl font-black">CampusNotes</h2>
                <p className="text-sm text-slate-400">
                  Premium notes for smarter semester preparation.
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
              Syllabus-wise notes, PYQs, quick revision resources and premium
              PDFs built for Indian college students.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Explore</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <Link href="/#courses" className="block hover:text-white">
                Courses
              </Link>
              <Link href="/course/bcom-hons" className="block hover:text-white">
                B.Com Hons
              </Link>
              <Link href="/#samples" className="block hover:text-white">
                Free Sample
              </Link>
              <Link href="/login" className="block hover:text-white">
                Login
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Promise</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <p>Exam-oriented notes</p>
              <p>Semester-wise structure</p>
              <p>PYQs included</p>
              <p>Affordable student pricing</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          © 2026 CampusNotes. Built for college students.
        </div>
      </div>
    </footer>
  );
}