export type Resource = {
  title: string;
  size: string;
  file: string;
};

export type Subject = {
  name: string;
  slug: string;
  price: number;
  resources: Resource[];
};

export type Semester = {
  number: number;
  subjects: Subject[];
};

export type Course = {
  name: string;
  slug: string;
  semesters: Semester[];
};

const createResources = (
  courseSlug: string,
  semester: number,
  subjectSlug: string
): Resource[] => [
  {
    title: "Syllabus",
    size: "1.2 MB",
    file: `/pdfs/${courseSlug}/sem${semester}/${subjectSlug}/syllabus.pdf`,
  },
  {
    title: "Notes",
    size: "4.8 MB",
    file: `/pdfs/${courseSlug}/sem${semester}/${subjectSlug}/notes.pdf`,
  },
  {
    title: "PYQs",
    size: "2.4 MB",
    file: `/pdfs/${courseSlug}/sem${semester}/${subjectSlug}/pyqs.pdf`,
  },
];

const createSubject = (
  courseSlug: string,
  semester: number,
  name: string,
  slug: string
): Subject => ({
  name,
  slug,
  price: 99,
  resources: createResources(courseSlug, semester, slug),
});

const emptySemesters = (usedSemesters: Semester[]): Semester[] => {
  return [1, 2, 3, 4, 5, 6].map((number) => {
    const existingSemester = usedSemesters.find(
      (semester) => semester.number === number
    );

    return existingSemester || {
      number,
      subjects: [],
    };
  });
};

export const courses: Course[] = [
  {
    name: "B.Com",
    slug: "bcom",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("bcom", 1, "Financial Accounting", "financial-accounting"),
          createSubject("bcom", 1, "Business Law", "business-law"),
          createSubject("bcom", 1, "Business Economics", "business-economics"),
          createSubject("bcom", 1, "Computer Applications", "computer-applications"),
        ],
      },
      {
        number: 2,
        subjects: [
          createSubject("bcom", 2, "Corporate Accounting", "corporate-accounting"),
          createSubject("bcom", 2, "Company Law", "company-law"),
          createSubject("bcom", 2, "Business Mathematics", "business-mathematics"),
          createSubject("bcom", 2, "Income Tax Law", "income-tax-law"),
        ],
      },
    ]),
  },
  {
    name: "B.Com (Hons.)",
    slug: "bcom-hons",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("bcom-hons", 1, "Financial Accounting", "financial-accounting"),
          createSubject("bcom-hons", 1, "Business Law", "business-law"),
          createSubject("bcom-hons", 1, "Micro Economics", "micro-economics"),
          createSubject("bcom-hons", 1, "Business Organisation", "business-organisation"),
        ],
      },
      {
        number: 2,
        subjects: [
          createSubject("bcom-hons", 2, "Corporate Accounting", "corporate-accounting"),
          createSubject("bcom-hons", 2, "Company Law", "company-law"),
          createSubject("bcom-hons", 2, "Macro Economics", "macro-economics"),
          createSubject("bcom-hons", 2, "Business Statistics", "business-statistics"),
        ],
      },
    ]),
  },
  {
    name: "B.A. Programme",
    slug: "ba-programme",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("ba-programme", 1, "English Language", "english-language"),
          createSubject("ba-programme", 1, "Political Science", "political-science"),
          createSubject("ba-programme", 1, "History", "history"),
          createSubject("ba-programme", 1, "Environmental Studies", "environmental-studies"),
        ],
      },
    ]),
  },
  {
    name: "B.A. (Hons.) English",
    slug: "ba-hons-english",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("ba-hons-english", 1, "Indian Classical Literature", "indian-classical-literature"),
          createSubject("ba-hons-english", 1, "European Classical Literature", "european-classical-literature"),
          createSubject("ba-hons-english", 1, "Academic Writing", "academic-writing"),
        ],
      },
    ]),
  },
  {
    name: "B.A. (Hons.) Political Science",
    slug: "ba-hons-political-science",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("ba-hons-political-science", 1, "Understanding Political Theory", "understanding-political-theory"),
          createSubject("ba-hons-political-science", 1, "Constitutional Government", "constitutional-government"),
          createSubject("ba-hons-political-science", 1, "Political Processes", "political-processes"),
        ],
      },
    ]),
  },
  {
    name: "B.A. (Hons.) History",
    slug: "ba-hons-history",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("ba-hons-history", 1, "History of India", "history-of-india"),
          createSubject("ba-hons-history", 1, "Social Formations", "social-formations"),
          createSubject("ba-hons-history", 1, "History Writing", "history-writing"),
        ],
      },
    ]),
  },
  {
    name: "B.A. (Hons.) Economics",
    slug: "ba-hons-economics",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("ba-hons-economics", 1, "Introductory Microeconomics", "introductory-microeconomics"),
          createSubject("ba-hons-economics", 1, "Mathematical Methods", "mathematical-methods"),
          createSubject("ba-hons-economics", 1, "Economic History", "economic-history"),
        ],
      },
    ]),
  },
  {
    name: "B.A. (Hons.) Psychology",
    slug: "ba-hons-psychology",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("ba-hons-psychology", 1, "Introduction to Psychology", "introduction-to-psychology"),
          createSubject("ba-hons-psychology", 1, "Biopsychology", "biopsychology"),
          createSubject("ba-hons-psychology", 1, "Statistical Methods", "statistical-methods"),
        ],
      },
    ]),
  },
  {
    name: "B.Sc. (Hons.) Computer Science",
    slug: "bsc-hons-computer-science",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("bsc-hons-computer-science", 1, "Programming Fundamentals", "programming-fundamentals"),
          createSubject("bsc-hons-computer-science", 1, "Computer System Architecture", "computer-system-architecture"),
          createSubject("bsc-hons-computer-science", 1, "Discrete Mathematics", "discrete-mathematics"),
        ],
      },
    ]),
  },
  {
    name: "B.Sc. Physical Sciences",
    slug: "bsc-physical-sciences",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("bsc-physical-sciences", 1, "Mechanics", "mechanics"),
          createSubject("bsc-physical-sciences", 1, "Calculus", "calculus"),
          createSubject("bsc-physical-sciences", 1, "Chemistry Basics", "chemistry-basics"),
        ],
      },
    ]),
  },
  {
    name: "B.Sc. Life Sciences",
    slug: "bsc-life-sciences",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("bsc-life-sciences", 1, "Botany", "botany"),
          createSubject("bsc-life-sciences", 1, "Zoology", "zoology"),
          createSubject("bsc-life-sciences", 1, "Chemistry", "chemistry"),
        ],
      },
    ]),
  },
  {
    name: "B.Sc. (Hons.) Mathematics",
    slug: "bsc-hons-mathematics",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("bsc-hons-mathematics", 1, "Calculus", "calculus"),
          createSubject("bsc-hons-mathematics", 1, "Algebra", "algebra"),
          createSubject("bsc-hons-mathematics", 1, "Real Analysis", "real-analysis"),
        ],
      },
    ]),
  },
  {
    name: "B.Sc. (Hons.) Chemistry",
    slug: "bsc-hons-chemistry",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("bsc-hons-chemistry", 1, "Organic Chemistry", "organic-chemistry"),
          createSubject("bsc-hons-chemistry", 1, "Inorganic Chemistry", "inorganic-chemistry"),
          createSubject("bsc-hons-chemistry", 1, "Physical Chemistry", "physical-chemistry"),
        ],
      },
    ]),
  },
  {
    name: "B.Sc. (Hons.) Physics",
    slug: "bsc-hons-physics",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("bsc-hons-physics", 1, "Mechanics", "mechanics"),
          createSubject("bsc-hons-physics", 1, "Electricity and Magnetism", "electricity-and-magnetism"),
          createSubject("bsc-hons-physics", 1, "Mathematical Physics", "mathematical-physics"),
        ],
      },
    ]),
  },
  {
    name: "B.A. Programme (History + Political Science)",
    slug: "ba-programme-history-plus-political-science",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("ba-programme-history-plus-political-science", 1, "History", "history"),
          createSubject("ba-programme-history-plus-political-science", 1, "Political Science", "political-science"),
          createSubject("ba-programme-history-plus-political-science", 1, "English Language", "english-language"),
        ],
      },
    ]),
  },
  {
    name: "B.A. Programme (English + Political Science)",
    slug: "ba-programme-english-plus-political-science",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("ba-programme-english-plus-political-science", 1, "English", "english"),
          createSubject("ba-programme-english-plus-political-science", 1, "Political Science", "political-science"),
          createSubject("ba-programme-english-plus-political-science", 1, "Environmental Studies", "environmental-studies"),
        ],
      },
    ]),
  },
  {
    name: "B.A. Programme (English + Economics)",
    slug: "ba-programme-english-plus-economics",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("ba-programme-english-plus-economics", 1, "English", "english"),
          createSubject("ba-programme-english-plus-economics", 1, "Economics", "economics"),
          createSubject("ba-programme-english-plus-economics", 1, "Environmental Studies", "environmental-studies"),
        ],
      },
    ]),
  },
  {
    name: "BMS (Bachelor of Management Studies)",
    slug: "bms",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("bms", 1, "Principles of Management", "principles-of-management"),
          createSubject("bms", 1, "Business Statistics", "business-statistics"),
          createSubject("bms", 1, "Financial Accounting", "financial-accounting"),
        ],
      },
    ]),
  },
  {
    name: "BBA FIA",
    slug: "bba-fia",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("bba-fia", 1, "Financial Accounting", "financial-accounting"),
          createSubject("bba-fia", 1, "Business Mathematics", "business-mathematics"),
          createSubject("bba-fia", 1, "Financial Markets", "financial-markets"),
        ],
      },
    ]),
  },
  {
    name: "B.A. (Hons.) Journalism & Mass Communication",
    slug: "ba-hons-journalism-and-mass-communication",
    semesters: emptySemesters([
      {
        number: 1,
        subjects: [
          createSubject("ba-hons-journalism-and-mass-communication", 1, "Introduction to Journalism", "introduction-to-journalism"),
          createSubject("ba-hons-journalism-and-mass-communication", 1, "Media and Communication", "media-and-communication"),
          createSubject("ba-hons-journalism-and-mass-communication", 1, "Reporting and Editing", "reporting-and-editing"),
        ],
      },
    ]),
  },
];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getSemester(courseSlug: string, semesterNumber: number) {
  const course = getCourse(courseSlug);
  return course?.semesters.find((semester) => semester.number === semesterNumber);
}

export function getSubject(
  courseSlug: string,
  semesterNumber: number,
  subjectSlug: string
) {
  const semester = getSemester(courseSlug, semesterNumber);
  return semester?.subjects.find((subject) => subject.slug === subjectSlug);
}