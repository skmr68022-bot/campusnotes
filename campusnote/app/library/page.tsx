"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses } from "@/data/courses";
import { ArrowRight, BookOpen, Library, ShoppingBag } from "lucide-react";

type PurchasedBundle = {
  courseName: string;
  courseSlug: string;
  semesterNumber: number;
  subjectName: string;
  subjectSlug: string;
};

export default function LibraryPage() {
  const [purchasedBundles, setPurchasedBundles] = useState<PurchasedBundle[]>([]);
  const [ready, setReady] = useState(false);

  const allBundles = useMemo(
    () =>
      courses.flatMap((course) =>
        course.semesters.flatMap((semester) =>
          semester.subjects.map((subject) => ({
            courseName: course.name,
            courseSlug: course.slug,
            semesterNumber: semester.number,
            subjectName: subject.name,
            subjectSlug: subject.slug,
          }))
        )
      ),
    []
  );

  useEffect(() => {
    const purchased = allBundles.filter((bundle) => {
      const accessKey = `${bundle.courseSlug}-${bundle.semesterNumber}-${bundle.subjectSlug}`;
      return localStorage.getItem(`paid_${accessKey}`) === "true";
    });

    setPurchasedBundles(purchased);
    setReady(true);
  }, [allBundles]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <section className="rounded-3xl border border-indigo-100 bg-white p-7 sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Library size={24} />
            </div>
            <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">My Library</h1>
            <p className="mt-3 max-w-xl text-slate-600">
              Quickly open subject bundles that have been unlocked on this device after payment.
            </p>
          </section>

          {!ready ? (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500">
              Loading your purchased bundles...
            </div>
          ) : purchasedBundles.length === 0 ? (
            <section className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <ShoppingBag size={25} />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-slate-900">No purchased bundles yet</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Explore your DU course, preview a subject bundle and complete a payment to access it here.
              </p>
              <Link
                href="/#courses"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Browse Courses <ArrowRight size={16} />
              </Link>
            </section>
          ) : (
            <section className="mt-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Purchased Bundles</h2>
                <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700">
                  {purchasedBundles.length} available
                </span>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {purchasedBundles.map((bundle) => (
                  <Link
                    key={`${bundle.courseSlug}-${bundle.semesterNumber}-${bundle.subjectSlug}`}
                    href={`/subject/${bundle.courseSlug}/sem${bundle.semesterNumber}/${bundle.subjectSlug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <span className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                        <BookOpen size={21} />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Unlocked Bundle</p>
                        <h3 className="mt-2 text-lg font-semibold text-slate-900">{bundle.subjectName}</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {bundle.courseName} • Semester {bundle.semesterNumber}
                        </p>
                      </div>
                    </div>
                    <p className="mt-5 flex items-center gap-1 text-sm font-semibold text-indigo-600">
                      Open PDFs <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <p className="mt-8 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
            Current access is stored on this device. Account-based access across devices will be enabled when secure user login and verified purchase records are connected.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
