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

{
  name: "B.Sc. (Hons.) Mathematics",
  slug: "bsc-hons-mathematics",
  semesters: emptySemesters([
    {
      number: 1,
      subjects: [
        createSubject("bsc-hons-mathematics", 1, "Algebra", "algebra"),
        createSubject("bsc-hons-mathematics", 1, "Elementary Real Analysis", "elementary-real-analysis"),
        createSubject("bsc-hons-mathematics", 1, "Probability and Statistics", "probability-and-statistics"),
      ],
    },
    {
      number: 2,
      subjects: [
        createSubject("bsc-hons-mathematics", 2, "Linear Algebra", "linear-algebra"),
        createSubject("bsc-hons-mathematics", 2, "Calculus", "calculus"),
        createSubject("bsc-hons-mathematics", 2, "Ordinary Differential Equations", "ordinary-differential-equations"),
      ],
    },
    {
      number: 3,
      subjects: [
        createSubject("bsc-hons-mathematics", 3, "Group Theory", "group-theory"),
        createSubject("bsc-hons-mathematics", 3, "Riemann Integration", "riemann-integration"),
        createSubject("bsc-hons-mathematics", 3, "Discrete Mathematics", "discrete-mathematics"),
        createSubject("bsc-hons-mathematics", 3, "Graph Theory", "graph-theory"),
        createSubject("bsc-hons-mathematics", 3, "Mathematical Python", "mathematical-python"),
        createSubject("bsc-hons-mathematics", 3, "Number Theory", "number-theory"),
      ],
    },
    {
      number: 4,
      subjects: [
        createSubject("bsc-hons-mathematics", 4, "Sequences and Series of Functions", "sequences-and-series-of-functions"),
        createSubject("bsc-hons-mathematics", 4, "Multivariate Calculus", "multivariate-calculus"),
        createSubject("bsc-hons-mathematics", 4, "Numerical Analysis", "numerical-analysis"),
        createSubject("bsc-hons-mathematics", 4, "Biomathematics", "biomathematics"),
        createSubject("bsc-hons-mathematics", 4, "Mathematical Modelling", "mathematical-modelling"),
        createSubject("bsc-hons-mathematics", 4, "Mechanics", "mechanics"),
      ],
    },
    {
      number: 5,
      subjects: [
        createSubject("bsc-hons-mathematics", 5, "Metric Spaces", "metric-spaces"),
        createSubject("bsc-hons-mathematics", 5, "Ring Theory", "ring-theory"),
        createSubject("bsc-hons-mathematics", 5, "Partial Differential Equations", "partial-differential-equations"),
        createSubject("bsc-hons-mathematics", 5, "Mathematical Data Science", "mathematical-data-science"),
        createSubject("bsc-hons-mathematics", 5, "Linear Programming and Applications", "linear-programming-and-applications"),
        createSubject("bsc-hons-mathematics", 5, "Mathematical Statistics", "mathematical-statistics"),
      ],
    },
    {
      number: 6,
      subjects: [
        createSubject("bsc-hons-mathematics", 6, "Advanced Group Theory", "advanced-group-theory"),
        createSubject("bsc-hons-mathematics", 6, "Advanced Linear Algebra", "advanced-linear-algebra"),
        createSubject("bsc-hons-mathematics", 6, "Complex Analysis", "complex-analysis"),
        createSubject("bsc-hons-mathematics", 6, "Mathematical Finance", "mathematical-finance"),
        createSubject("bsc-hons-mathematics", 6, "Integral Transforms", "integral-transforms"),
        createSubject("bsc-hons-mathematics", 6, "Research Methodology", "research-methodology"),
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
        createSubject("bsc-hons-physics", 1, "Mathematical Physics I", "mathematical-physics-1"),
        createSubject("bsc-hons-physics", 1, "Mechanics", "mechanics"),
      ],
    },
    {
      number: 2,
      subjects: [
        createSubject("bsc-hons-physics", 2, "Electricity and Magnetism", "electricity-and-magnetism"),
        createSubject("bsc-hons-physics", 2, "Waves and Optics", "waves-and-optics"),
      ],
    },
    {
      number: 3,
      subjects: [
        createSubject("bsc-hons-physics", 3, "Mathematical Physics II", "mathematical-physics-2"),
        createSubject("bsc-hons-physics", 3, "Thermal Physics", "thermal-physics"),
        createSubject("bsc-hons-physics", 3, "Digital Systems and Applications", "digital-systems-and-applications"),
      ],
    },
    {
      number: 4,
      subjects: [
        createSubject("bsc-hons-physics", 4, "Mathematical Physics III", "mathematical-physics-3"),
        createSubject("bsc-hons-physics", 4, "Elements of Modern Physics", "elements-of-modern-physics"),
        createSubject("bsc-hons-physics", 4, "Analog Systems and Applications", "analog-systems-and-applications"),
      ],
    },
    {
      number: 5,
      subjects: [
        createSubject("bsc-hons-physics", 5, "Quantum Mechanics and Applications", "quantum-mechanics-and-applications"),
        createSubject("bsc-hons-physics", 5, "Solid State Physics", "solid-state-physics"),
      ],
    },
    {
      number: 6,
      subjects: [
        createSubject("bsc-hons-physics", 6, "Electromagnetic Theory", "electromagnetic-theory"),
        createSubject("bsc-hons-physics", 6, "Statistical Mechanics", "statistical-mechanics"),
      ],
    },
  ]),
},{
  name: "B.Sc. (Hons.) Chemistry",
  slug: "bsc-hons-chemistry",
  semesters: emptySemesters([
    {
      number: 1,
      subjects: [
        createSubject("bsc-hons-chemistry", 1, "Inorganic Chemistry I Atomic Structure and Chemical Bonding", "inorganic-chemistry-1"),
        createSubject("bsc-hons-chemistry", 1, "Physical Chemistry I States of Matter and Ionic Equilibrium", "physical-chemistry-1"),
      ],
    },
    {
      number: 2,
      subjects: [
        createSubject("bsc-hons-chemistry", 2, "Organic Chemistry I Basics and Hydrocarbons", "organic-chemistry-1"),
        createSubject("bsc-hons-chemistry", 2, "Physical Chemistry II Chemical Thermodynamics and Applications", "physical-chemistry-2"),
      ],
    },
    {
      number: 3,
      subjects: [
        createSubject("bsc-hons-chemistry", 3, "Inorganic Chemistry II s and p Block Elements", "inorganic-chemistry-2"),
        createSubject("bsc-hons-chemistry", 3, "Organic Chemistry II Halogenated Hydrocarbons and Oxygen Containing Functional Groups", "organic-chemistry-2"),
        createSubject("bsc-hons-chemistry", 3, "Physical Chemistry III Phase Equilibria and Electrochemical Cells", "physical-chemistry-3"),
      ],
    },
    {
      number: 4,
      subjects: [
        createSubject("bsc-hons-chemistry", 4, "Inorganic Chemistry III Coordination Chemistry", "inorganic-chemistry-3"),
        createSubject("bsc-hons-chemistry", 4, "Organic Chemistry III Nitrogen Containing Functional Groups Poly Nuclear Hydrocarbons Heterocyclic Chemistry Alkaloids and Terpenes", "organic-chemistry-3"),
        createSubject("bsc-hons-chemistry", 4, "Physical Chemistry IV Conductance and Chemical Kinetics", "physical-chemistry-4"),
      ],
    },
    {
      number: 5,
      subjects: [
        createSubject("bsc-hons-chemistry", 5, "Organic Chemistry IV Biomolecules", "organic-chemistry-4"),
        createSubject("bsc-hons-chemistry", 5, "Physical Chemistry V Quantum Chemistry and Spectroscopy", "physical-chemistry-5"),
      ],
    },
    {
      number: 6,
      subjects: [
        createSubject("bsc-hons-chemistry", 6, "Inorganic Chemistry IV Organometallic Chemistry and Bioinorganic Chemistry", "inorganic-chemistry-4"),
        createSubject("bsc-hons-chemistry", 6, "Organic Chemistry V Spectroscopy and Applied Organic Chemistry", "organic-chemistry-5"),
      ],
    },
  ]),
},{
  name: "B.Sc. (Hons.) Botany",
  slug: "bsc-hons-botany",
  semesters: emptySemesters([
    {
      number: 1,
      subjects: [
        createSubject("bsc-hons-botany", 1, "Microbiology and Phycology", "microbiology-and-phycology"),
        createSubject("bsc-hons-botany", 1, "Biomolecules and Cell Biology", "biomolecules-and-cell-biology"),
      ],
    },

    {
      number: 2,
      subjects: [
        createSubject("bsc-hons-botany", 2, "Mycology and Phytopathology", "mycology-and-phytopathology"),
        createSubject("bsc-hons-botany", 2, "Archegoniate", "archegoniate"),
      ],
    },

    {
      number: 3,
      subjects: [
        createSubject("bsc-hons-botany", 3, "Anatomy of Angiosperms", "anatomy-of-angiosperms"),
        createSubject("bsc-hons-botany", 3, "Economic Botany", "economic-botany"),
        createSubject("bsc-hons-botany", 3, "Genetics", "genetics"),
      ],
    },

    {
      number: 4,
      subjects: [
        createSubject("bsc-hons-botany", 4, "Molecular Biology", "molecular-biology"),
        createSubject("bsc-hons-botany", 4, "Ecology", "ecology"),
        createSubject("bsc-hons-botany", 4, "Plant Systematics", "plant-systematics"),
      ],
    },

    {
      number: 5,
      subjects: [
        createSubject("bsc-hons-botany", 5, "Reproductive Biology of Angiosperms", "reproductive-biology-of-angiosperms"),
        createSubject("bsc-hons-botany", 5, "Plant Physiology", "plant-physiology"),
      ],
    },

    {
      number: 6,
      subjects: [
        createSubject("bsc-hons-botany", 6, "Plant Metabolism", "plant-metabolism"),
        createSubject("bsc-hons-botany", 6, "Plant Biotechnology", "plant-biotechnology"),
      ],
    },
  ]),
},{
  name: "B.Sc. (Hons.) Zoology",
  slug: "bsc-hons-zoology",
  semesters: emptySemesters([
    {
      number: 1,
      subjects: [
        createSubject("bsc-hons-zoology", 1, "Non-Chordates I Protista to Pseudocoelomates", "non-chordates-1"),
        createSubject("bsc-hons-zoology", 1, "Principles of Ecology", "principles-of-ecology"),
      ],
    },
    {
      number: 2,
      subjects: [
        createSubject("bsc-hons-zoology", 2, "Non-Chordates II Coelomates", "non-chordates-2"),
        createSubject("bsc-hons-zoology", 2, "Cell Biology", "cell-biology"),
      ],
    },
    {
      number: 3,
      subjects: [
        createSubject("bsc-hons-zoology", 3, "Diversity of Chordates", "diversity-of-chordates"),
        createSubject("bsc-hons-zoology", 3, "Physiology Controlling and Coordinating Systems", "physiology-controlling-and-coordinating-systems"),
        createSubject("bsc-hons-zoology", 3, "Fundamentals of Biochemistry", "fundamentals-of-biochemistry"),
      ],
    },
    {
      number: 4,
      subjects: [
        createSubject("bsc-hons-zoology", 4, "Comparative Anatomy of Vertebrates", "comparative-anatomy-of-vertebrates"),
        createSubject("bsc-hons-zoology", 4, "Physiology Life Sustaining Systems", "physiology-life-sustaining-systems"),
        createSubject("bsc-hons-zoology", 4, "Biochemistry of Metabolic Processes", "biochemistry-of-metabolic-processes"),
      ],
    },
    {
      number: 5,
      subjects: [
        createSubject("bsc-hons-zoology", 5, "Molecular Biology", "molecular-biology"),
        createSubject("bsc-hons-zoology", 5, "Principles of Genetics", "principles-of-genetics"),
      ],
    },
    {
      number: 6,
      subjects: [
        createSubject("bsc-hons-zoology", 6, "Developmental Biology", "developmental-biology"),
        createSubject("bsc-hons-zoology", 6, "Evolutionary Biology", "evolutionary-biology"),
      ],
    },
  ]),
},{
  name: "B.A. (Hons.) Political Science",
  slug: "ba-hons-political-science",
  semesters: emptySemesters([
    {
      number: 1,
      subjects: [
        createSubject("ba-hons-political-science", 1, "Understanding Political Theory", "understanding-political-theory"),
        createSubject("ba-hons-political-science", 1, "Constitutional Government and Democracy in India", "constitutional-government-and-democracy-in-india"),
      ],
    },
    {
      number: 2,
      subjects: [
        createSubject("ba-hons-political-science", 2, "Political Theory Concepts and Debates", "political-theory-concepts-and-debates"),
        createSubject("ba-hons-political-science", 2, "Political Process in India", "political-process-in-india"),
      ],
    },
    {
      number: 3,
      subjects: [
        createSubject("ba-hons-political-science", 3, "Introduction to Comparative Government and Politics", "introduction-to-comparative-government-and-politics"),
        createSubject("ba-hons-political-science", 3, "Perspectives on Public Administration", "perspectives-on-public-administration"),
        createSubject("ba-hons-political-science", 3, "Perspectives on International Relations and World History", "perspectives-on-international-relations-and-world-history"),
      ],
    },
    {
      number: 4,
      subjects: [
        createSubject("ba-hons-political-science", 4, "Political Processes and Institutions in Comparative Perspective", "political-processes-and-institutions-in-comparative-perspective"),
        createSubject("ba-hons-political-science", 4, "Public Policy and Administration in India", "public-policy-and-administration-in-india"),
        createSubject("ba-hons-political-science", 4, "Global Politics", "global-politics"),
      ],
    },
    {
      number: 5,
      subjects: [
        createSubject("ba-hons-political-science", 5, "Classical Political Philosophy", "classical-political-philosophy"),
        createSubject("ba-hons-political-science", 5, "Modern Indian Political Thought I", "modern-indian-political-thought-1"),
      ],
    },
    {
      number: 6,
      subjects: [
        createSubject("ba-hons-political-science", 6, "Modern Political Philosophy", "modern-political-philosophy"),
        createSubject("ba-hons-political-science", 6, "Indian Political Thought II", "indian-political-thought-2"),
      ],
    },
  ]),
},{
  name: "B.A. (Hons.) English",
  slug: "ba-hons-english",
  semesters: emptySemesters([
    {
      number: 1,
      subjects: [
        createSubject("ba-hons-english", 1, "Indian Classical Literature", "indian-classical-literature"),
        createSubject("ba-hons-english", 1, "European Classical Literature", "european-classical-literature"),
      ],
    },
    {
      number: 2,
      subjects: [
        createSubject("ba-hons-english", 2, "Indian Writing in English", "indian-writing-in-english"),
        createSubject("ba-hons-english", 2, "British Poetry and Drama 14th to 17th Centuries", "british-poetry-and-drama-14th-to-17th-centuries"),
      ],
    },
    {
      number: 3,
      subjects: [
        createSubject("ba-hons-english", 3, "American Literature", "american-literature"),
        createSubject("ba-hons-english", 3, "Popular Literature", "popular-literature"),
        createSubject("ba-hons-english", 3, "British Poetry and Drama 17th and 18th Centuries", "british-poetry-and-drama-17th-and-18th-centuries"),
      ],
    },
    {
      number: 4,
      subjects: [
        createSubject("ba-hons-english", 4, "British Literature 18th Century", "british-literature-18th-century"),
        createSubject("ba-hons-english", 4, "British Romantic Literature", "british-romantic-literature"),
        createSubject("ba-hons-english", 4, "British Literature 19th Century", "british-literature-19th-century"),
      ],
    },
    {
      number: 5,
      subjects: [
        createSubject("ba-hons-english", 5, "Women’s Writing", "womens-writing"),
        createSubject("ba-hons-english", 5, "British Literature The Early 20th Century", "british-literature-the-early-20th-century"),
      ],
    },
    {
      number: 6,
      subjects: [
        createSubject("ba-hons-english", 6, "Modern European Drama", "modern-european-drama"),
        createSubject("ba-hons-english", 6, "Postcolonial Literatures", "postcolonial-literatures"),
      ],
    },
  ]),
},{
  name: "B.A. (Hons.) History",
  slug: "ba-hons-history",
  semesters: emptySemesters([
    {
      number: 1,
      subjects: [
        createSubject("ba-hons-history", 1, "History of India I", "history-of-india-1"),
        createSubject("ba-hons-history", 1, "Social Formations and Cultural Patterns of the Ancient World I", "social-formations-and-cultural-patterns-of-the-ancient-world-1"),
      ],
    },
    {
      number: 2,
      subjects: [
        createSubject("ba-hons-history", 2, "History of India II", "history-of-india-2"),
        createSubject("ba-hons-history", 2, "Social Formations and Cultural Patterns of the Ancient and Medieval World II", "social-formations-and-cultural-patterns-of-the-ancient-and-medieval-world-2"),
      ],
    },
    {
      number: 3,
      subjects: [
        createSubject("ba-hons-history", 3, "History of India III c 750-1200 CE", "history-of-india-3"),
        createSubject("ba-hons-history", 3, "Rise of the Modern West I", "rise-of-the-modern-west-1"),
        createSubject("ba-hons-history", 3, "History of India IV c 1200-1500", "history-of-india-4"),
      ],
    },
    {
      number: 4,
      subjects: [
        createSubject("ba-hons-history", 4, "Rise of the Modern West II", "rise-of-the-modern-west-2"),
        createSubject("ba-hons-history", 4, "History of India V c 1500-1600", "history-of-india-5"),
        createSubject("ba-hons-history", 4, "History of India VI c 1750-1857", "history-of-india-6"),
      ],
    },
    {
      number: 5,
      subjects: [
        createSubject("ba-hons-history", 5, "History of Modern Europe I", "history-of-modern-europe-1"),
        createSubject("ba-hons-history", 5, "History of India VII c 1600-1750", "history-of-india-7"),
      ],
    },
    {
      number: 6,
      subjects: [
        createSubject("ba-hons-history", 6, "History of India VIII c 1857-1950", "history-of-india-8"),
        createSubject("ba-hons-history", 6, "History of Modern Europe II", "history-of-modern-europe-2"),
      ],
    },
  ]),
},];
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