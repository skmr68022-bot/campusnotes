"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

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

    const { error } = await supabase.storage
      .from("pdfs")
      .upload(fileName, file);

    setUploading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("PDF uploaded successfully!");
      setFile(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-md mx-auto bg-white border rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-indigo-600">
          CampusNotes Admin
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Upload PDF files to Supabase storage.
        </p>

        <label className="block mt-6">
          <span className="text-sm font-medium text-gray-700">
            Select PDF File
          </span>

          <input
            className="mt-2 w-full border rounded-xl p-3 text-sm"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        {file && (
          <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-xl p-3">
            <p className="text-sm text-indigo-700 font-medium">
              Selected file:
            </p>
            <p className="text-sm text-gray-700 mt-1">{file.name}</p>
          </div>
        )}

        <button
          onClick={uploadFile}
          disabled={uploading}
          className="w-full mt-5 bg-indigo-600 text-white py-3 rounded-xl disabled:bg-gray-400"
        >
          {uploading ? "Uploading..." : "Upload PDF"}
        </button>
      </div>
    </main>
  );
}