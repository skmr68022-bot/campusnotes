"use client";

import { useEffect, useState } from "react";
import {
  Download,
  Eye,
  FileCheck2,
  FileText,
  Lock,
  ShieldCheck,
} from "lucide-react";

type Resource = {
  title: string;
  size: string;
  file: string;
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
    return "Premium structured notes prepared for quick and exam-focused study.";
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

  useEffect(() => {
    setPaid(localStorage.getItem(`paid_${accessKey}`) === "true");
  }, [accessKey]);

  return (
    <div className="space-y-5">
      {resources.map((item) => {
        const previewFile = item.file.replace(".pdf", "-preview.pdf");

        return (
          <div
            key={item.title}
            className="group overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10"
          >
            <div className="p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                    <FileText />
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
                      PDF File • {item.size}
                    </p>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                      {getResourceDescription(item.title)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <a
                  href={previewFile}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                >
                  <Eye size={16} />
                  Preview
                </a>

                {paid ? (
                  <>
                    <a
                      href={item.file}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-100"
                    >
                      <Eye size={16} />
                      View Full
                    </a>

                    <a
                      href={item.file}
                      download
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
                    >
                      <Download size={16} />
                      Download
                    </a>
                  </>
                ) : (
                  <>
                    <button className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-3 text-sm font-black text-slate-500">
                      <Lock size={16} />
                      View Locked
                    </button>

                    <button className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-3 text-sm font-black text-slate-500">
                      <Download size={16} />
                      Download Locked
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="border-t bg-[#FFFDF7] px-6 py-4">
              <p className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <ShieldCheck size={15} className="text-green-600" />
                Preview is free. Full PDF access unlocks after payment.
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}