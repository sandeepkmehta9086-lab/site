export const profile = {
  name: "Sandeep Kumar",
  headline:
    "Strategic Technology Leader | Banking & Payments | AI/ML & Cloud Transformation",
  location: "Pune, Maharashtra, India",
  email: "sandeepkmehta@yahoo.com",
  phone: "+91 85549 27768",
  linkedin: "https://www.linkedin.com/in/sandeepkumarmehta",
  personalSite: "https://www.sites.google.com/site/atsandeepkumar/",
  summary:
    "Strategic technology leader with 14+ years across global banking, payments and enterprise software — architecting SWIFT financial messaging and wallet platforms, driving AI/ML and cloud transformation, and building high-performing engineering teams across Pune, Bangalore and Kuala Lumpur.",
};

export type Role = {
  company: string;
  title: string;
  period: string;
  duration: string;
  location: string;
  description: string;
  highlights: string[];
  current?: boolean;
};

export const roles: Role[] = [
  {
    company: "Finastra",
    title: "Senior Development Manager",
    period: "Aug 2023 — Present",
    duration: "3+ yrs",
    location: "Pune, India",
    description:
      "Leading the Financial Messaging product across SWIFT, EURO SWIFT, SECOM, TM4C and SIC — development, production support, and AI-powered screening services.",
    highlights: [
      "Built and scaled engineering teams in Pune and Bangalore from scratch, establishing new delivery centers for the FM portfolio",
      "Architected screening services powered by AI/ML — anomaly detection, sanctions screening and compliance validation",
      "Implemented agentic AI workflows with LangGraph and LLMs, cutting false positives and accelerating transaction approvals",
      "Directed SWIFT / ISO 20022 message-standards development in Java with reusable templates and UI modernization",
      "Led production defect qualification and hotfix delivery, managing stakeholders across the US, UK and Swiss regions",
      "Event-driven messaging at scale with Apache Kafka and JMS; negotiated vendor SOWs for UI and API modernization",
    ],
    current: true,
  },
  {
    company: "HSBC",
    title: "Consultant Specialist",
    period: "Jul 2019 — Aug 2023",
    duration: "4.1 yrs",
    location: "Pune, India",
    description:
      "Architect and lead developer of HSBC Kinetic — corporate mobile lending on microservices and Google Cloud Platform, launched in 2021.",
    highlights: [
      "Architected the overall design and framework for the corporate mobile lending solution",
      "Led core module development in Java / Spring for loan origination and customer onboarding",
      "Directed secure, cloud-native deployment on Google Cloud Platform",
      "Optimized Hibernate persistence across complex lending datasets",
    ],
  },
  {
    company: "Persistent Systems",
    title: "Team Lead",
    period: "Jun 2018 — Jul 2019",
    duration: "1.1 yrs",
    location: "Pune, India",
    description: "Owned the complete backend architecture.",
    highlights: [
      "Supervised development teams to 100% error-free code and design",
      "Consistently delivered on time",
    ],
  },
  {
    company: "Aurionpro",
    title: "Senior Software Engineer",
    period: "Apr 2016 — Jun 2018",
    duration: "2.3 yrs",
    location: "Kuala Lumpur, Malaysia",
    description:
      "On-site at RHB Bank — Corporate Loan Origination System (CLOS) for facility creation and collateral management at Malaysia's fourth-largest financial group.",
    highlights: [
      "Application modules in Java, Spring IOC / AOP, Struts and Hibernate",
      "Transaction and business-logic layers for corporate lending operations",
    ],
  },
  {
    company: "Masco Corporation",
    title: "Senior Software Engineer",
    period: "Apr 2015 — Apr 2016",
    duration: "1.1 yrs",
    location: "Pune, India",
    description:
      "Behr Process Corporation (a Masco unit) — built behr.com, the interactive marketing and e-commerce platform for one of North America's largest paint suppliers.",
    highlights: [
      "Consumer, professional and architect modules with paint-quantity and color-visualization projects",
      "Internationalization, Hippo CMS integration with HST Java beans, custom tags",
    ],
  },
  {
    company: "Harbinger Systems",
    title: "Software Engineer",
    period: "May 2014 — Apr 2015",
    duration: "1 yr",
    location: "Pune, India",
    description:
      "Real-time network threat detection for Taasera Inc. — host agents, upgrade manager and a threat intelligence center analyzing invading IP packets as they originate.",
    highlights: [
      "Cyber-security product engineering in Scala, Java, Spring and Python",
    ],
  },
  {
    company: "Parinati Solutions",
    title: "Developer",
    period: "Oct 2012 — May 2014",
    duration: "1.7 yrs",
    location: "Goa, India",
    description:
      "Three flagship fintech deliveries: the Movit mobile wallet for Network International (Dubai), SBI ePay payment aggregator, and NABARD's core banking share-accounting module.",
    highlights: [
      "Mobile Payment System wallet — admin and customer modules, velocity rules and fee structures",
      "SBI ePay white-label aggregator — RBAC, merchant and transaction modules, from inception to production",
      "Dividend calculation engine with complex core-Java mathematical computation",
    ],
  },
];

export type Project = {
  tag: string;
  title: string;
  client: string;
  body: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    tag: "PAYMENTS",
    title: "Financial Messaging Platform",
    client: "Finastra",
    body: "SWIFT / ISO 20022 messaging with AI-powered sanctions screening — agentic workflows, LangGraph pipelines and Kafka event streams serving banks across the US, UK and Switzerland.",
    tech: ["Java", "Kafka", "LangGraph", "Angular", "Spring"],
  },
  {
    tag: "DIGITAL BANKING",
    title: "HSBC Kinetic",
    client: "HSBC",
    body: "Corporate mobile lending on microservices and GCP — architecture, framework and core modules for the bank's flagship SME product, launched 2021.",
    tech: ["Java", "Spring", "Microservices", "GCP"],
  },
  {
    tag: "PAYMENTS",
    title: "SBI ePay",
    client: "State Bank of India",
    body: "White-label payment aggregator — RBAC, merchant onboarding and online transaction modules, architected and delivered from inception to full production rollout.",
    tech: ["Java", "EJB", "JBoss", "SQL/PLSQL"],
  },
  {
    tag: "LENDING",
    title: "Corporate Loan Origination",
    client: "RHB Bank, Malaysia",
    body: "On-site delivery of CLOS — facility creation and collateral management for the fourth-largest fully integrated financial group in Malaysia.",
    tech: ["Java", "Spring IOC/AOP", "Struts", "Hibernate"],
  },
  {
    tag: "FINTECH",
    title: "Movit Mobile Wallet",
    client: "Network International, Dubai",
    body: "Mobile Payment System for the Middle East's leading payments provider — wallet transactions, velocity rules, and merchant fee engines.",
    tech: ["Java", "JSF", "Spring", "JBoss EAP"],
  },
  {
    tag: "CYBER SECURITY",
    title: "Threat Detector",
    client: "Taasera Inc.",
    body: "Real-time detection of network-invading IP packets — host agents, upgrade manager and threat intelligence center for a leading cyber-security firm.",
    tech: ["Scala", "Java", "Spring", "Python"],
  },
];

export const skills = [
  "Java 17 / 21",
  "Spring Boot",
  "Microservices",
  "Apache Kafka",
  "SWIFT & ISO 20022",
  "Payment Systems (UPI · NEFT · RTGS · Fedwire · TIPS)",
  "Google Cloud Platform",
  "AWS",
  "Generative AI & LLMs",
  "Agentic AI",
  "LangGraph",
  "ML Pipelines",
  "Python",
  "Hibernate",
  "SQL / PLSQL",
  "Docker & Kubernetes",
  "Jenkins & CI/CD",
  "Data Architecture & Modeling",
  "System Design (HLD / LLD)",
  "Agile & Scrum",
  "Engineering Leadership",
  "Stakeholder Management",
];

export const certifications = [
  {
    name: "Google Cloud Platform Fundamentals: Core Infrastructure",
    issuer: "Google Cloud",
  },
  {
    name: "Reliable Google Cloud Infrastructure: Design and Process",
    issuer: "Google Cloud",
  },
  {
    name: "Essential Cloud Infrastructure: Core Services",
    issuer: "Google Cloud",
  },
  {
    name: "Foundations of Programming: Databases",
    issuer: "LinkedIn Learning",
  },
  {
    name: "Marketing Foundations: Integrated Marketing Strategies",
    issuer: "LinkedIn Learning",
  },
];

export const publications = [
  {
    title: "Performance Testing on Heavily Used Financial Websites",
    description:
      "Research on load and performance characteristics of high-traffic financial platforms.",
  },
];

export const education = [
  {
    school: "Symbiosis Institute of Business Management, Pune",
    degree: "Master of Business Administration (MBA) — 2023, CGPA 7.35",
  },
  {
    school: "Jawaharlal Nehru National College of Engineering",
    degree: "B.E., Computer Science & Engineering — 2011",
  },
];

export const stats = [
  { value: 14, suffix: "+", label: "Years in Software" },
  { value: 8, suffix: "", label: "Flagship Platforms" },
  { value: 2, suffix: "", label: "Teams Built from Zero" },
  { value: 6, suffix: "", label: "Countries Served" },
];

/**
 * LinkedIn posts to embed in the feed section.
 *
 * To add a post: open the post on LinkedIn → click the "..." menu →
 * "Embed this post" → copy the URN from the iframe src, i.e. the part
 * that looks like "urn:li:share:7123456789012345678" or
 * "urn:li:ugcPost:7123456789012345678" — and paste it below as a string.
 * Posts must be public to render for visitors.
 */
export const linkedinPosts: string[] = [
  // "urn:li:share:7123456789012345678",
  "urn:li:share:7490040684536774656",
  "urn:li:share:7488783121925062656",
  "urn:li:share:7487542127409823744",
  "urn:li:ugcPost:7481414111596105728",
  "urn:li:ugcPost:7478444647460171776"
];
