import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white border-b">
      
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between">

        <Link
          href="/"
          className="text-xl font-bold text-indigo-600"
        >
          CampusNotes
        </Link>

        <div className="flex gap-4 text-sm">

          <Link href="/course/bcom-hons">
            Courses
          </Link>

          <Link href="/login">
            Login
          </Link>

        </div>

      </div>

    </nav>
  );
}