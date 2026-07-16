import AdminContentClient from "@/components/AdminContentClient";
import Link from "next/link";
import { getAdminContentItems } from "@/data/adminContent";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminContentPage() {
  const items = getAdminContentItems();

  const uploadedItems = items.filter((item) => item.status === "available");
  const notUploadedItems = items.filter(
    (item) => item.status === "coming-soon"
  );

  const totalBundles = items.length;
  const uploadedCount = uploadedItems.length;
  const notUploadedCount = notUploadedItems.length;

  const totalHtmlFiles = items.reduce(
    (total, item) => total + item.htmlFileCount,
    0
  );

  const completionPercentage =
    totalBundles > 0 ? Math.round((uploadedCount / totalBundles) * 100) : 0;

  const sections = ["Delhi University", "Board Exams", "Government Exams"];

  const sectionStats = sections.map((section) => {
    const sectionItems = items.filter((item) => item.section === section);
    const sectionUploaded = sectionItems.filter(
      (item) => item.status === "available"
    );
    const sectionNotUploaded = sectionItems.filter(
      (item) => item.status === "coming-soon"
    );

    return {
      section,
      total: sectionItems.length,
      uploaded: sectionUploaded.length,
      notUploaded: sectionNotUploaded.length,
      htmlFiles: sectionItems.reduce(
        (total, item) => total + item.htmlFileCount,
        0
      ),
      percentage:
        sectionItems.length > 0
          ? Math.round((sectionUploaded.length / sectionItems.length) * 100)
          : 0,
    };
  });

  return (
    <main className="min-h-screen bg-[#FFFDF7] px-4 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Campusnotes Admin
          </p>

          <h1 className="mt-3 text-3xl font-black text-slate-950 md:text-5xl">
            Content Status Dashboard
          </h1>

          <p className="mt-3 max-w-3xl text-slate-600">
            Dynamic dashboard showing uploaded and not uploaded notes separately
            for DU, Boards and Government Exams.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-5">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">
                Total Bundles
              </p>
              <p className="mt-2 text-3xl font-black text-slate-950">
                {totalBundles}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-5">
              <p className="text-sm font-semibold text-emerald-700">
                Uploaded
              </p>
              <p className="mt-2 text-3xl font-black text-emerald-700">
                {uploadedCount}
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-700">
                Not Uploaded
              </p>
              <p className="mt-2 text-3xl font-black text-amber-700">
                {notUploadedCount}
              </p>
            </div>

            <div className="rounded-2xl bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-700">
                HTML Files
              </p>
              <p className="mt-2 text-3xl font-black text-blue-700">
                {totalHtmlFiles}
              </p>
            </div>

            <div className="rounded-2xl bg-violet-50 p-5">
              <p className="text-sm font-semibold text-violet-700">
                Completion
              </p>
              <p className="mt-2 text-3xl font-black text-violet-700">
                {completionPercentage}%
              </p>
            </div>
          </div>

          <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {sectionStats.map((stat) => (
            <div
              key={stat.section}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-black text-slate-950">
                {stat.section}
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold text-slate-500">Total</p>
                  <p className="text-2xl font-black text-slate-950">
                    {stat.total}
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs font-bold text-blue-700">Files</p>
                  <p className="text-2xl font-black text-blue-700">
                    {stat.htmlFiles}
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-xs font-bold text-emerald-700">
                    Uploaded
                  </p>
                  <p className="text-2xl font-black text-emerald-700">
                    {stat.uploaded}
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50 p-4">
                  <p className="text-xs font-bold text-amber-700">
                    Not Uploaded
                  </p>
                  <p className="text-2xl font-black text-amber-700">
                    {stat.notUploaded}
                  </p>
                </div>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-500">
                {stat.percentage}% completed
              </p>
            </div>
          ))}
        </div>

        <AdminContentClient items={items} />
      </section>
    </main>
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
  items: ReturnType<typeof getAdminContentItems>;
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