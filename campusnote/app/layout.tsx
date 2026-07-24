import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Campusnotes | Notes, Boards & Exams",
  description:
    "Campusnotes is a premium educational hub for Delhi University notes, board exam notes and government exam preparation.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FFFDF7] text-slate-900">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}