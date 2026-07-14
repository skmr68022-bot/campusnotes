import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <h2 className="text-xl font-bold text-slate-900">
            Campus<span className="text-indigo-600">Notes</span>
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
            Exam-focused notes, syllabus and previous year questions for Delhi University students.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-500">
            <Link href="/#courses" className="hover:text-indigo-600">Courses</Link>
            <Link href="/library" className="hover:text-indigo-600">My Library</Link>
            <Link href="/login" className="hover:text-indigo-600">Login</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Information</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-500">
            <p>Preview before purchase</p>
            <p>Instant digital access</p>
            <p>Delhi University focused</p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 px-4 py-5 text-center text-sm text-slate-500">
        © 2026 CampusNotes. Made for Delhi University students.
      </div>
    </footer>
  );
}
