"use client";

import { useEffect, useState } from "react";
import {
  Download,
  Eye,
  FileCheck2,
  FileText,
  Lock,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import NotesPopup from "@/components/NotesPopup";

type ResourceFile = {
  title: string;
  file: string;
};

type Resource = {
  title: string;
  size: string;
  file: string;
  files?: ResourceFile[];
};

type ResourceAccessProps = {
  resources: Resource[];
  accessKey: string;
};

const getResourceDescription = (title: string) => {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("syllabus")) {
    return "Complete syllabus file to understand your exact subject coverage.";
  }

  if (lowerTitle.includes("notes")) {
    return "Premium unit-wise HTML notes, numerical notes, formula sheet and quick revision resources.";
  }

  if (lowerTitle.includes("pyq")) {
    return "Previous year questions to understand exam pattern and important topics.";
  }

  return "Subject resource file included in this compilation.";
};

export default function ResourceAccess({
  resources,
  accessKey,
}: ResourceAccessProps) {
  const [paid, setPaid] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<Resource | null>(null);

  useEffect(() => {
    setPaid(localStorage.getItem(`paid_${accessKey}`) === "true");
  }, [accessKey]);

  return (
    <>
      <div className="space-y-5">
        {resources.map((item) => {
          const isNotesCollection = item.title === "Notes" && item.files?.length;
          const isHtml = item.file.endsWith(".html") || isNotesCollection;
          const isPdf = item.file.endsWith(".pdf");

          const previewFile = isPdf
            ? item.file.replace(".pdf", "-preview.pdf")
            : item.file;

          return (
            <div
              key={item.title}
              className="group overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10"
            >
              <div className="p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                      {isNotesCollection ? <BookOpen /> : <FileText />}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-black text-slate-950">
                          {item.title}
                        </h2>

                        {paid ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700">
                            <FileCheck2 size={14} />
                            Unlocked
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
                            <Lock size={14} />
                            Locked
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm font-medium text-slate-500">
                        {isNotesCollection
                          ? "Unit-wise HTML Notes"
                          : isHtml
                            ? "Online HTML Notes"
                            : "PDF File"}{" "}
                        • {item.size}
                      </p>

                      <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                        {getResourceDescription(item.title)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {isNotesCollection ? (
                    <button
                      onClick={() => setSelectedNotes(item)}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                    >
                      <Eye size={16} />
                      Preview List
                    </button>
                  ) : (
                    <a
                      href={previewFile}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                    >
                      <Eye size={16} />
                      {isHtml ? "Read Preview" : "Preview"}
                    </a>
                  )}

                  {paid ? (
                    <>
                      {isNotesCollection ? (
                        <button
                          onClick={() => setSelectedNotes(item)}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-100"
                        >
                          <BookOpen size={16} />
                          Read Full
                        </button>
                      ) : (
                        <a
                          href={item.file}
                          target="_blank"
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-100"
                        >
                          <Eye size={16} />
                          {isHtml ? "Read Full" : "View Full"}
                        </a>
                      )}

                      {isHtml ? (
                        <a
                          href={item.file}
                          target="_blank"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
                        >
                          <BookOpen size={16} />
                          Open
                        </a>
                      ) : (
                        <a
                          href={item.file}
                          download
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
                        >
                          <Download size={16} />
                          Download
                        </a>
                      )}
                    </>
                  ) : (
                    <>
                      <button className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-3 text-sm font-black text-slate-500">
                        <Lock size={16} />
                        Read Locked
                      </button>

                      <button className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-3 text-sm font-black text-slate-500">
                        <Lock size={16} />
                        Full Access Locked
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="border-t bg-[#FFFDF7] px-6 py-4">
                <p className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <ShieldCheck size={15} className="text-green-600" />
                  {isNotesCollection
                    ? "Unit-wise file names are visible. Full HTML notes unlock after payment."
                    : "Preview is free. Full access unlocks after payment."}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedNotes?.files && (
        <NotesPopup
          open={Boolean(selectedNotes)}
          onClose={() => setSelectedNotes(null)}
          title={selectedNotes.title}
          files={selectedNotes.files}
          paid={paid}
        />
      )}
    </>
  );
}