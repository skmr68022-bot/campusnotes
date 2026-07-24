"use client";

import { X, Lock, BookOpen, ExternalLink, BadgeCheck } from "lucide-react";

type ResourceFile = {
  title: string;
  file: string;
};

type NotesPopupProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  files: ResourceFile[];
  paid: boolean;
};

export default function NotesPopup({
  open,
  onClose,
  title,
  files,
  paid,
}: NotesPopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-4xl bg-white shadow-2xl shadow-slate-950/30">
        <div className="flex items-start justify-between gap-4 border-b bg-slate-950 p-5 text-white md:p-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-black text-blue-100">
              <BookOpen size={14} />
              Unit-wise HTML Notes
            </div>

            <h2 className="mt-3 text-2xl font-black md:text-3xl">
              {title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              {paid
                ? "Full notes are unlocked. Open any unit or revision file."
                : "Preview mode. File names are visible, but full notes are locked until purchase."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Close notes popup"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[62vh] overflow-y-auto p-5 md:p-6">
          <div className="mb-5 rounded-2xl border bg-[#FFFDF7] p-4">
            {paid ? (
              <p className="flex items-center gap-2 text-sm font-black text-green-700">
                <BadgeCheck size={18} />
                Purchased — all HTML notes unlocked
              </p>
            ) : (
              <p className="flex items-center gap-2 text-sm font-black text-yellow-800">
                <Lock size={18} />
                Not purchased — buy the compilation to unlock all files
              </p>
            )}
          </div>

          <div className="grid gap-3">
            {files.map((file, index) => (
              <div
                key={file.file}
                className="flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-blue-700">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-black text-slate-950">
                      {file.title}
                    </h3>

                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      HTML study file
                    </p>
                  </div>
                </div>

                {paid ? (
                  <a
                    href={file.file}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white transition hover:bg-blue-700"
                  >
                    Open
                    <ExternalLink size={15} />
                  </a>
                ) : (
                  <button className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-500">
                    <Lock size={15} />
                    Locked
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t bg-[#FFFDF7] p-5 md:p-6">
          {paid ? (
            <p className="text-center text-sm font-bold text-slate-600">
              You can open all unit-wise files from this popup.
            </p>
          ) : (
            <p className="text-center text-sm font-bold text-slate-600">
              Buy this subject compilation to unlock every unit, numerical notes,
              formula sheet and quick revision file.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}