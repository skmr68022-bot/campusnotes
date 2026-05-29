"use client";

import { useEffect, useState } from "react";
import { Download, Eye, FileText, Lock } from "lucide-react";

type Resource = {
  title: string;
  size: string;
  file: string;
};

type ResourceAccessProps = {
  resources: Resource[];
  accessKey: string;
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
    <div className="lg:col-span-2 space-y-5">
      {resources.map((item) => {
        const previewFile = item.file.replace(".pdf", "-preview.pdf");

        return (
          <div
            key={item.title}
            className="bg-white border rounded-2xl p-5 shadow-sm"
          >
            <div className="flex gap-4">
              <div className="bg-indigo-100 p-3 rounded-xl h-fit">
                <FileText className="text-indigo-600" />
              </div>

              <div>
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  PDF File • {item.size}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <a
                href={previewFile}
                target="_blank"
                className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm"
              >
                <Eye size={16} />
                Preview
              </a>

              {paid ? (
                <>
                  <a
                    href={item.file}
                    target="_blank"
                    className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm"
                  >
                    <Eye size={16} />
                    View Full
                  </a>

                  <a
                    href={item.file}
                    download
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm"
                  >
                    <Download size={16} />
                    Download
                  </a>
                </>
              ) : (
                <button className="flex items-center gap-2 bg-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm">
                  <Lock size={16} />
                  Locked
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}