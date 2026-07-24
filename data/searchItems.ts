import { courses } from "@/data/courses";

export type SearchItem = {
  title: string;
  section: "Delhi University" | "Board Exams" | "Government Exams";
  description: string;
  href: string;
  tags: string[];
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

const duSearchItems: SearchItem[] = courses.flatMap((course) =>
  course.semesters.flatMap((semester) =>
    semester.subjects.map((subject) => ({
      title: subject.name,
      section: "Delhi University",
      description: `${course.name} Semester ${semester.number} ${subject.name} notes, syllabus, PYQs and revision material.`,
      href: `/subject/${course.slug}/sem${semester.number}/${subject.slug}`,
      tags: [
        "du",
        "delhi university",
        course.name,
        course.slug,
        `semester ${semester.number}`,
        `sem ${semester.number}`,
        subject.name,
        subject.slug,
      ],
    }))
  )
);

const boardSearchItems: SearchItem[] = boardData.flatMap((board) =>
  board.classes.flatMap((classSlug) =>
    subjectsByClass[classSlug].map((subject) => ({
      title: `${board.name} ${formatClassName(classSlug)} ${subject}`,
      section: "Board Exams",
      description: `${board.name} ${formatClassName(
        classSlug
      )} ${subject} notes, important questions and revision material.`,
      href: `/boards/${board.slug}/${classSlug}/${slugify(subject)}`,
      tags: [
        board.name,
        board.slug,
        formatClassName(classSlug),
        classSlug,
        subject,
        slugify(subject),
        "board",
        "board exams",
        "school",
      ],
    }))
  )
);

const governmentSearchItems: SearchItem[] = examCategories.flatMap((category) =>
  category.exams.flatMap((examSlug) =>
    sectionsByCategory[category.slug].map((section) => ({
      title: `${examNames[examSlug]} ${section}`,
      section: "Government Exams",
      description: `${examNames[examSlug]} ${section} notes, practice material, PYQs and revision resources.`,
      href: `/government-exams/${category.slug}/${examSlug}/${slugify(
        section
      )}`,
      tags: [
        category.name,
        category.slug,
        examNames[examSlug],
        examSlug,
        section,
        slugify(section),
        "government exams",
        "exam preparation",
      ],
    }))
  )
);

export const searchItems: SearchItem[] = [
  ...duSearchItems,
  ...boardSearchItems,
  ...governmentSearchItems,
];