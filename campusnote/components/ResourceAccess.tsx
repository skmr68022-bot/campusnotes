"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Download, Eye, FileText, Lock } from "lucide-react";

type Resource = {
  title: string;
  size: string;
  file: string;
};

type ResourceAccessProps = {
  resources: Resource[];
  accessKey: string;
};

export default function ResourceAccess({ resources, accessKey }: ResourceAccessProps) {
  const [paid, setPaid] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPaid(localStorage.getItem(`paid_${accessKey}`) === "true");
    setReady(true);
  }, [accessKey]);

  return (
    <div className="space-y-4 lg:col-span-2">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-slate-900">Bundle Resources</h2>
        {ready && paid ? (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <CheckCircle2 size={14} /> Unlocked
          </span>
        ) : (
          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
            <Lock size={14} /> Locked
          </span>
        )}
      </div>

      {resources.map((item) => {
        const previewFile = item.file.replace(".pdf", "-preview.pdf");

        return (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex gap-4">
                <div className="h-fit rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <FileText size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">PDF file • {item.size}</p>
                </div>
              </div>
              <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                Included in bundle
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
              <a
                href={previewFile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
              >
                <Eye size={16} /> Preview Sample
              </a>

              {ready && paid ? (
                <>
                  <a
                    href={item.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-indigo-200 px-4 py-2.5 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
                  >
                    <Eye size={16} /> View Full
                  </a>
                  <a
                    href={item.file}
                    download
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    <Download size={16} /> Download
                  </a>
                </>
              ) : (
                <span className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-500">
                  <Lock size={16} /> Full PDF locked
                </span>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
