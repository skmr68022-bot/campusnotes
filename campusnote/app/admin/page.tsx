"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  BadgeCheck,
  CloudUpload,
  FileText,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  Upload,
} from "lucide-react";

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a PDF first");
      return;
    }

    setUploading(true);

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage.from("pdfs").upload(fileName, file);

    setUploading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("PDF uploaded successfully!");
      setFile(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      <section className="border-b bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to website
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-blue-100">
                <LockKeyhole size={16} />
                Admin Dashboard
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
                CampusNotes Admin
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Upload PDF files to Supabase storage and manage study resources.
                Use this page only for internal/admin work.
              </p>
            </div>

            <div className="rounded-4xl border border-white/10 bg-white/10 p-6">
              <p className="flex items-center gap-2 text-sm font-bold text-green-200">
                <ShieldCheck size={18} />
                Admin utility page
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Later, this can become a full upload panel for course, semester,
                subject and file management.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-4xl border bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <CloudUpload />
          </div>

          <h2 className="mt-5 text-2xl font-black text-slate-950">
            Upload PDF Resource
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Select a PDF file from your computer and upload it to Supabase
            storage.
          </p>

          <label className="mt-6 block">
            <span className="text-sm font-black text-slate-700">
              Select PDF File
            </span>

            <input
              className="mt-2 w-full rounded-2xl border bg-[#FFFDF7] p-4 text-sm font-semibold text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          {file && (
            <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <p className="flex items-center gap-2 text-sm font-black text-blue-800">
                <FileText size={17} />
                Selected file
              </p>
              <p className="mt-2 break-all text-sm font-semibold text-slate-700">
                {file.name}
              </p>
            </div>
          )}

          <button
            onClick={uploadFile}
            disabled={uploading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {uploading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload PDF
              </>
            )}
          </button>
        </div>

        <div className="rounded-4xl border bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
            Recommended Next Upgrade
          </p>

          <h2 className="mt-4 text-3xl font-black text-slate-950">
            Make this a real admin panel later
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Right now this page uploads PDFs to Supabase storage only. Later,
            you should add dropdowns for course, semester, subject and resource
            type so files are automatically organised.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Select course",
              "Select semester",
              "Select subject",
              "Select resource type",
              "Upload PDF",
              "Auto-update website",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl bg-[#FFFDF7] p-4 text-sm font-bold text-slate-700"
              >
                <BadgeCheck size={18} className="text-green-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}