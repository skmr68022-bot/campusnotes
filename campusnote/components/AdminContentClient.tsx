"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AdminContentItem } from "@/data/adminContent";

type Props = {
  items: AdminContentItem[];
};

export default function AdminContentClient({ items }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return items.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.section.toLowerCase().includes(query) ||
        item.folderPath.toLowerCase().includes(query) ||
        item.htmlFiles.join(" ").toLowerCase().includes(query);

      const matchesSection =
        sectionFilter === "all" || item.section === sectionFilter;

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesSection && matchesStatus;
    });
  }, [items, searchQuery, sectionFilter, statusFilter]);

  const uploadedItems = filteredItems.filter(
    (item) => item.status === "available"
  );

  const notUploadedItems = filteredItems.filter(
    (item) => item.status === "coming-soon"
  );

  return (
    <section>
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black text-slate-950">
          Search & Filter Content
        </h2>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <input
            type="text"
            placeholder="Search subject, exam, folder, file..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
          />

          <select
            value={sectionFilter}
            onChange={(event) => setSectionFilter(event.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
          >
            <option value="all">All Sections</option>
            <option value="Delhi University">Delhi University</option>
            <option value="Board Exams">Board Exams</option>
            <option value="Government Exams">Government Exams</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="available">Uploaded</option>
            <option value="coming-soon">Not Uploaded</option>
          </select>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
            Showing {filteredItems.length} of {items.length}
          </span>

          <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
            Uploaded {uploadedItems.length}
          </span>

          <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700">
            Not Uploaded {notUploadedItems.length}
          </span>

          {(searchQuery || sectionFilter !== "all" || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSectionFilter("all");
                setStatusFilter("all");
              }}
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <ContentSection
        title="Uploaded Notes"
        description="Filtered uploaded bundles with at least one HTML file."
        items={uploadedItems}
        statusType="uploaded"
      />

      <ContentSection
        title="Not Uploaded Yet"
        description="Filtered bundles with no HTML files yet."
        items={notUploadedItems}
        statusType="not-uploaded"
      />
    </section>
  );
}

function ContentSection({
  title,
  description,
  items,
  statusType,
}: {
  title: string;
  description: string;
  items: AdminContentItem[];
  statusType: "uploaded" | "not-uploaded";
}) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-950">{title}</h2>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>

        <span
          className={`w-fit rounded-full px-4 py-2 text-sm font-black ${
            statusType === "uploaded"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {items.length} Bundles
        </span>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="font-bold text-slate-700">No item found.</p>
        </div>
      ) : (
        <div className="grid gap-5">
          {items.map((item) => (
            <div
              key={`${item.section}-${item.href}`}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      {item.section}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        item.status === "available"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {item.status === "available"
                        ? "Available"
                        : "Coming Soon"}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {item.htmlFileCount} HTML File
                      {item.htmlFileCount === 1 ? "" : "s"}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-black text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.subtitle}
                  </p>

                  <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                      Folder Path
                    </p>

                    <code className="mt-2 block break-all rounded-xl bg-white p-3 text-sm text-slate-700">
                      public{item.folderPath}
                    </code>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-bold text-slate-800">
                      Uploaded HTML Files
                    </p>

                    {item.htmlFiles.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.htmlFiles.map((file) => (
                          <span
                            key={file}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                          >
                            {file}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-slate-500">
                        No HTML file uploaded yet.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 lg:flex-col">
                  <Link
                    href={item.href}
                    className="rounded-full bg-slate-950 px-5 py-2 text-center text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    View Page
                  </Link>

                  <Link
                    href={item.folderPath}
                    className="rounded-full border border-slate-200 px-5 py-2 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    Open URL
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}