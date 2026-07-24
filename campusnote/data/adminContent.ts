import fs from "fs";
import path from "path";
import { courses } from "@/data/courses";

export type AdminContentItem = {
  section: "Delhi University" | "Board Exams" | "Government Exams";
  title: string;
  subtitle: string;
  href: string;
  folderPath: string;
  status: "available" | "coming-soon";
  htmlFileCount: number;
  htmlFiles: string[];
};

const getPublicPath = (publicPath: string) => {
  const cleanPath = publicPath.startsWith("/")
    ? publicPath.slice(1)
    : publicPath;

  return path.join(process.cwd(), "public", cleanPath);
};

const getHtmlFiles = (folderPath: string) => {
  try {
    const fullPath = getPublicPath(folderPath);

    if (!fs.existsSync(fullPath)) {
      return [];
    }

    return fs
      .readdirSync(fullPath)
      .filter((file) => file.toLowerCase().endsWith(".html"))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

const formatClassName = (classSlug: string) =>
  classSlug.replace("class-", "Class ");

const boardData = [
  {
    name: "CBSE",
    slug: "cbse",
    classes: ["class-9", "class-10", "class-11", "class-12"],
  },
  {
    name: "UP Board",
    slug: "up-board",
    classes: ["class-9", "class-10", "class-11", "class-12"],
  },
  {
    name: "ICSE",
    slug: "icse",
    classes: ["class-9", "class-10"],
  },
  {
    name: "ISC",
    slug: "isc",
    classes: ["class-11", "class-12"],
  },
];

const subjectsByClass: Record<string, string[]> = {
  "class-9": ["Mathematics", "Science", "Social Science", "English", "Hindi"],
  "class-10": ["Mathematics", "Science", "Social Science", "English", "Hindi"],
  "class-11": [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Accountancy",
    "Business Studies",
    "Economics",
    "English",
  ],
  "class-12": [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Accountancy",
    "Business Studies",
    "Economics",
    "English",
  ],
};

const examCategories = [
  {
    name: "SSC Exams",
    slug: "ssc",
    exams: ["ssc-cgl", "ssc-chsl", "ssc-mts", "ssc-gd"],
  },
  {
    name: "Banking Exams",
    slug: "banking",
    exams: ["sbi-po", "sbi-clerk", "ibps-po", "ibps-clerk"],
  },
  {
    name: "Railway Exams",
    slug: "railway",
    exams: ["rrb-ntpc", "rrb-group-d", "rrb-alp", "technician"],
  },
  {
    name: "UPSC & State PCS",
    slug: "upsc-state-pcs",
    exams: ["upsc-cse", "up-pcs", "bpsc", "mp-pcs"],
  },
];

const examNames: Record<string, string> = {
  "ssc-cgl": "SSC CGL",
  "ssc-chsl": "SSC CHSL",
  "ssc-mts": "SSC MTS",
  "ssc-gd": "SSC GD",
  "sbi-po": "SBI PO",
  "sbi-clerk": "SBI Clerk",
  "ibps-po": "IBPS PO",
  "ibps-clerk": "IBPS Clerk",
  "rrb-ntpc": "RRB NTPC",
  "rrb-group-d": "RRB Group D",
  "rrb-alp": "RRB ALP",
  technician: "Technician",
  "upsc-cse": "UPSC CSE",
  "up-pcs": "UP PCS",
  bpsc: "BPSC",
  "mp-pcs": "MP PCS",
};

const sectionsByCategory: Record<string, string[]> = {
  ssc: [
    "Quantitative Aptitude",
    "Reasoning Ability",
    "English Language",
    "General Awareness",
    "Current Affairs",
  ],
  banking: [
    "Quantitative Aptitude",
    "Reasoning Ability",
    "English Language",
    "Banking Awareness",
    "Current Affairs",
  ],
  railway: [
    "Mathematics",
    "General Intelligence",
    "General Science",
    "General Awareness",
    "Current Affairs",
  ],
  "upsc-state-pcs": [
    "History",
    "Geography",
    "Polity",
    "Economy",
    "Environment",
    "Current Affairs",
  ],
};

export const getAdminContentItems = (): AdminContentItem[] => {
  const duItems: AdminContentItem[] = courses.flatMap((course) =>
    course.semesters.flatMap((semester) =>
      semester.subjects.map((subject) => {
        const folderPath = `/html/${course.slug}/sem${semester.number}/${subject.slug}`;
        const htmlFiles = getHtmlFiles(folderPath);

        return {
          section: "Delhi University",
          title: subject.name,
          subtitle: `${course.name} • Semester ${semester.number}`,
          href: `/subject/${course.slug}/sem${semester.number}/${subject.slug}`,
          folderPath,
          status: htmlFiles.length > 0 ? "available" : "coming-soon",
          htmlFileCount: htmlFiles.length,
          htmlFiles,
        };
      })
    )
  );

  const boardItems: AdminContentItem[] = boardData.flatMap((board) =>
    board.classes.flatMap((classSlug) =>
      subjectsByClass[classSlug].map((subject) => {
        const subjectSlug = slugify(subject);
        const folderPath = `/html/boards/${board.slug}/${classSlug}/${subjectSlug}`;
        const htmlFiles = getHtmlFiles(folderPath);

        return {
          section: "Board Exams",
          title: `${board.name} ${formatClassName(classSlug)} ${subject}`,
          subtitle: `${board.name} • ${formatClassName(classSlug)}`,
          href: `/boards/${board.slug}/${classSlug}/${subjectSlug}`,
          folderPath,
          status: htmlFiles.length > 0 ? "available" : "coming-soon",
          htmlFileCount: htmlFiles.length,
          htmlFiles,
        };
      })
    )
  );

  const governmentItems: AdminContentItem[] = examCategories.flatMap(
    (category) =>
      category.exams.flatMap((examSlug) =>
        sectionsByCategory[category.slug].map((section) => {
          const sectionSlug = slugify(section);
          const folderPath = `/html/government-exams/${category.slug}/${examSlug}/${sectionSlug}`;
          const htmlFiles = getHtmlFiles(folderPath);

          return {
            section: "Government Exams",
            title: `${examNames[examSlug]} ${section}`,
            subtitle: category.name,
            href: `/government-exams/${category.slug}/${examSlug}/${sectionSlug}`,
            folderPath,
            status: htmlFiles.length > 0 ? "available" : "coming-soon",
            htmlFileCount: htmlFiles.length,
            htmlFiles,
          };
        })
      )
  );

  return [...duItems, ...boardItems, ...governmentItems];
};