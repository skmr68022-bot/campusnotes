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
          createSubject("bcom", 1, "Business Organisation and Management", "business-organisation-and-management"),
        ],
      },
      {
        number: 2,
        subjects: [
          createSubject("bcom", 2, "Business Laws", "business-laws"),
          createSubject("bcom", 2, "Business Mathematics and Statistics", "business-mathematics-and-statistics"),
        ],
      },
      {
        number: 3,
        subjects: [
          createSubject("bcom", 3, "Company Law", "company-law"),
          createSubject("bcom", 3, "Income Tax Law and Practice", "income-tax-law-and-practice"),
          createSubject("bcom", 3, "Computer Applications in Business", "computer-applications-in-business"),
          createSubject("bcom", 3, "Cyber Crimes and Laws", "cyber-crimes-and-laws"),
        ],
      },
      {
        number: 4,
        subjects: [
          createSubject("bcom", 4, "Corporate Accounting", "corporate-accounting"),
          createSubject("bcom", 4, "Cost Accounting", "cost-accounting"),
          createSubject("bcom", 4, "E-Commerce", "e-commerce"),
          createSubject("bcom", 4, "Investing in Stock Markets", "investing-in-stock-markets"),
          createSubject("bcom", 4, "Personal Tax Planning", "personal-tax-planning"),
        ],
      },
      {
        number: 5,
        subjects: [
          createSubject("bcom", 5, "Human Resource Management", "human-resource-management"),
          createSubject("bcom", 5, "Principles of Marketing", "principles-of-marketing"),
          createSubject("bcom", 5, "Auditing and Corporate Governance", "auditing-and-corporate-governance"),
          createSubject("bcom", 5, "Financial Reporting and Analysis", "financial-reporting-and-analysis"),
          createSubject("bcom", 5, "Document Management System", "document-management-system"),
          createSubject("bcom", 5, "Fundamentals of Financial Management", "fundamentals-of-financial-management"),
          createSubject("bcom", 5, "Goods and Service Tax (GST) and Customs Laws", "gst-and-customs-laws"),
          createSubject("bcom", 5, "Training and Development", "training-and-development"),
          createSubject("bcom", 5, "Industrial Laws", "industrial-laws"),
        ],
      },
      {
        number: 6,
        subjects: [
          createSubject("bcom", 6, "Corporate Tax Planning", "corporate-tax-planning"),
          createSubject("bcom", 6, "Banking and Insurance", "banking-and-insurance"),
          createSubject("bcom", 6, "Management Accounting", "management-accounting"),
          createSubject("bcom", 6, "Computerised Accounting System", "computerised-accounting-system"),
          createSubject("bcom", 6, "Financial Markets Institutions and Services", "financial-markets-institutions-and-services"),
          createSubject("bcom", 6, "International Business", "international-business"),
          createSubject("bcom", 6, "Fundamentals of Investment", "fundamentals-of-investment"),
          createSubject("bcom", 6, "Consumer Protection", "consumer-protection"),
          createSubject("bcom", 6, "Organizational Behaviour", "organizational-behaviour"),
          createSubject("bcom", 6, "Advertising Personal Selling and Salesmanship", "advertising-personal-selling-and-salesmanship"),
          createSubject("bcom", 6, "Collective Bargaining and Negotiation Skills", "collective-bargaining-and-negotiation-skills"),
          createSubject("bcom", 6, "Entrepreneurship Development", "entrepreneurship-development"),
          createSubject("bcom", 6, "Finance for Non-Finance Executives", "finance-for-non-finance-executives"),
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
          createSubject("bcom-hons", 1, "Business Laws", "business-laws"),
          createSubject("bcom-hons", 1, "Basics of Accounting", "basics-of-accounting"),
          createSubject("bcom-hons", 1, "Business Organization and Management", "business-organization-and-management"),
        ],
      },
      {
        number: 2,
        subjects: [
          createSubject("bcom-hons", 2, "Corporate Accounting", "corporate-accounting"),
          createSubject("bcom-hons", 2, "Corporate Laws", "corporate-laws"),
          createSubject("bcom-hons", 2, "Entrepreneurship", "entrepreneurship"),
          createSubject("bcom-hons", 2, "Finance for Non-Finance Executives", "finance-for-non-finance-executives"),
        ],
      },
      {
        number: 3,
        subjects: [
          createSubject("bcom-hons", 3, "Human Resource Management", "human-resource-management"),
          createSubject("bcom-hons", 3, "Income Tax Law and Practice", "income-tax-law-and-practice"),
          createSubject("bcom-hons", 3, "Management Principles and Applications", "management-principles-and-applications"),
          createSubject("bcom-hons", 3, "Investing in Stock Markets", "investing-in-stock-markets"),
          createSubject("bcom-hons", 3, "Fundamentals of Marketing", "fundamentals-of-marketing"),
          createSubject("bcom-hons", 3, "E-Commerce", "e-commerce"),
          createSubject("bcom-hons", 3, "Training and Development", "training-and-development"),
          createSubject("bcom-hons", 3, "Digital Marketing", "digital-marketing"),
          createSubject("bcom-hons", 3, "Personal Tax Planning", "personal-tax-planning"),
          createSubject("bcom-hons", 3, "Communication and Documentation in Business", "communication-and-documentation-in-business"),
          createSubject("bcom-hons", 3, "Personal Finance and Planning", "personal-finance-and-planning"),
        ],
      },
      {
        number: 4,
        subjects: [
          createSubject("bcom-hons", 4, "Cost Accounting", "cost-accounting"),
          createSubject("bcom-hons", 4, "Business Mathematics", "business-mathematics"),
          createSubject("bcom-hons", 4, "Computer Applications in Business", "computer-applications-in-business"),
          createSubject("bcom-hons", 4, "Insurance and Risk Management", "insurance-and-risk-management"),
          createSubject("bcom-hons", 4, "Project Management and Techniques", "project-management-and-techniques"),
          createSubject("bcom-hons", 4, "Computerised Accounting System", "computerised-accounting-system"),
          createSubject("bcom-hons", 4, "Business Research Methods and Analytics", "business-research-methods-and-analytics"),
          createSubject("bcom-hons", 4, "Leadership and Team Development", "leadership-and-team-development"),
          createSubject("bcom-hons", 4, "Collective Bargaining and Negotiation Skills", "collective-bargaining-and-negotiation-skills"),
          createSubject("bcom-hons", 4, "E-Filing of Returns", "e-filing-of-returns"),
          createSubject("bcom-hons", 4, "Cyber Crimes and Laws", "cyber-crimes-and-laws"),
        ],
      },
      {
        number: 5,
        subjects: [
          createSubject("bcom-hons", 5, "Principles of Marketing", "principles-of-marketing"),
          createSubject("bcom-hons", 5, "Financial Management", "financial-management"),
          createSubject("bcom-hons", 5, "Management Accounting", "management-accounting"),
          createSubject("bcom-hons", 5, "Organizational Behaviour", "organizational-behaviour"),
          createSubject("bcom-hons", 5, "Macro Economics", "macro-economics"),
          createSubject("bcom-hons", 5, "Entrepreneurship Development", "entrepreneurship-development"),
          createSubject("bcom-hons", 5, "Corporate Tax Planning", "corporate-tax-planning"),
          createSubject("bcom-hons", 5, "Financial Markets Institutions and Services", "financial-markets-institutions-and-services"),
          createSubject("bcom-hons", 5, "Advertising and Personal Selling", "advertising-and-personal-selling"),
          createSubject("bcom-hons", 5, "Business Statistics", "business-statistics"),
        ],
      },
      {
        number: 6,
        subjects: [
          createSubject("bcom-hons", 6, "Auditing and Corporate Governance", "auditing-and-corporate-governance"),
          createSubject("bcom-hons", 6, "Goods and Service Tax (GST) and Customs Law", "gst-and-customs-law"),
          createSubject("bcom-hons", 6, "Fundamentals of Investment", "fundamentals-of-investment"),
          createSubject("bcom-hons", 6, "Compensation Management", "compensation-management"),
          createSubject("bcom-hons", 6, "Business Tax Procedures and Management", "business-tax-procedures-and-management"),
          createSubject("bcom-hons", 6, "Consumer Affairs and Customer Care", "consumer-affairs-and-customer-care"),
          createSubject("bcom-hons", 6, "Financial Reporting and Analysis", "financial-reporting-and-analysis"),
          createSubject("bcom-hons", 6, "Banking and Insurance", "banking-and-insurance"),
          createSubject("bcom-hons", 6, "Project Management and Techniques", "project-management-and-techniques"),
          createSubject("bcom-hons", 6, "International Business", "international-business"),
          createSubject("bcom-hons", 6, "Industrial Relations and Labour Laws", "industrial-relations-and-labour-laws"),
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