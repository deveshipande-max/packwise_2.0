import { Lesson, LearningPackage, UserProfile, TopicCategory } from '../types';

export const ALL_TOPICS: TopicCategory[] = [
  'IT & Software',
  'Business',
  'Design',
  'Data science',
  'Marketing',
  'Content Creator'
];

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'user-robert',
    name: 'Robert Milchick',
    email: 'robert.milchick@lumon.edu',
    role: 'Student',
    userType: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    budget: 135,
    preferredTopic: 'Design',
    preferredStyle: 'mixed',
    weeklyHoursLogged: 6,
    activityDays: [
      { day: 'M', hours: 1.5 },
      { day: 'T', hours: 0.8 },
      { day: 'W', hours: 1.2 },
      { day: 'T', hours: 0.5 },
      { day: 'F', hours: 2.0 },
      { day: 'S', hours: 0.0 },
      { day: 'S', hours: 0.0 }
    ]
  },
  {
    id: 'user-lisha',
    name: 'Lisha Lokwani',
    email: 'lisha.lokwani@mit.edu',
    role: 'Computer Science Student',
    userType: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
    budget: 150,
    preferredTopic: 'IT & Software',
    preferredStyle: 'video',
    weeklyHoursLogged: 8,
    activityDays: [
      { day: 'M', hours: 2.0 },
      { day: 'T', hours: 1.5 },
      { day: 'W', hours: 2.5 },
      { day: 'T', hours: 1.0 },
      { day: 'F', hours: 1.0 },
      { day: 'S', hours: 0.5 },
      { day: 'S', hours: 0.5 }
    ]
  },
  {
    id: 'user-annette',
    name: 'Annette Black',
    email: 'annette.black@techcorps.com',
    role: 'Product Strategist',
    userType: 'student',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    budget: 210,
    preferredTopic: 'Business',
    preferredStyle: 'notes',
    weeklyHoursLogged: 4.5,
    activityDays: [
      { day: 'M', hours: 1.0 },
      { day: 'T', hours: 1.0 },
      { day: 'W', hours: 0.5 },
      { day: 'T', hours: 1.5 },
      { day: 'F', hours: 0.5 },
      { day: 'S', hours: 0.0 },
      { day: 'S', hours: 0.0 }
    ]
  },
  {
    id: 'user-teacher-elena',
    name: 'Prof. Elena Rostova',
    email: 'elena.rostova@pathwise.edu',
    role: 'Design Faculty Lead',
    userType: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256&q=80',
    budget: 0,
    preferredTopic: 'Design',
    preferredStyle: 'mixed',
    weeklyHoursLogged: 24,
    bio: 'Principal UI/UX Designer & Faculty. Enlisting modular courses that empower students on any budget.',
    enlistedLessonIds: ['des-101', 'des-104'],
    totalEarnings: 3420,
    activityDays: [
      { day: 'M', hours: 4.5 },
      { day: 'T', hours: 5.0 },
      { day: 'W', hours: 6.0 },
      { day: 'T', hours: 4.0 },
      { day: 'F', hours: 4.5 },
      { day: 'S', hours: 1.0 },
      { day: 'S', hours: 0.0 }
    ]
  },
  {
    id: 'user-teacher-david',
    name: 'Dr. David Vance',
    email: 'david.vance@stanford.edu',
    role: 'Computer Systems Professor',
    userType: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    budget: 0,
    preferredTopic: 'IT & Software',
    preferredStyle: 'video',
    weeklyHoursLogged: 18,
    bio: 'Systems Architecture & Operating Systems Professor. Dedicated to demystifying computer engineering.',
    enlistedLessonIds: ['it-101', 'it-102'],
    totalEarnings: 2850,
    activityDays: [
      { day: 'M', hours: 3.5 },
      { day: 'T', hours: 4.0 },
      { day: 'W', hours: 3.0 },
      { day: 'T', hours: 4.5 },
      { day: 'F', hours: 3.0 },
      { day: 'S', hours: 0.0 },
      { day: 'S', hours: 0.0 }
    ]
  }
];

export const MASTER_LESSONS: Lesson[] = [
  // DESIGN LESSONS (Matching Wireframe 1 exactly)
  {
    id: 'des-101',
    topic: 'Design',
    title: 'Design Fundamentals',
    description: 'Core visual hierarchies, contrast ratios, typography grids, and spatial distribution.',
    price: 7,
    durationHours: 4,
    format: 'video',
    chapterNumber: 1,
    instructor: 'Elena Rostova (Principal Designer at Stripe)',
    syllabus: ['Visual balance and alignment', 'Color wheel and contrast ratios', 'Type pairings that scale', 'Grid-based spatial mathematics']
  },
  {
    id: 'des-102',
    topic: 'Design',
    title: 'UI/UX Principles',
    description: 'Modern human-computer interaction, mental models, affordances, and cognitive load management.',
    price: 13,
    durationHours: 6,
    format: 'mixed',
    chapterNumber: 2,
    instructor: 'Marcus Chen (Former Head of Design, Airbnb)',
    syllabus: ['Heuristic user patterns', 'Micro-interactions & feedback states', 'Form design & validation flow', 'Accessibility & WCAG AA standards']
  },
  {
    id: 'des-103',
    topic: 'Design',
    title: 'Research',
    description: 'Empirical qualitative discovery, generative interviews, usability testing, and synthesis.',
    price: 10,
    durationHours: 6,
    format: 'notes',
    chapterNumber: 3,
    instructor: 'Sarah Jenkins (UX Research Lead, Spotify)',
    syllabus: ['Semi-structured user interviews', 'Card sorting & tree testing', 'Synthesizing qualitative feedback', 'Affinity diagramming techniques']
  },
  {
    id: 'des-104',
    topic: 'Design',
    title: 'Figma For Professionals',
    description: 'Component architecture, auto-layout 5.0, variables, design tokens, and production handoffs.',
    price: 39,
    durationHours: 14,
    format: 'video',
    chapterNumber: 4,
    instructor: 'Danilo Silva (Design Systems Architect)',
    syllabus: ['Variables & semantic token modes', 'Auto-layout responsive constraints', 'Interactive component prototypes', 'Developer handoff specs']
  },
  {
    id: 'des-105',
    topic: 'Design',
    title: 'Persona Detailing',
    description: 'Building evidence-grounded user archetypes, empathy mapping, and jobs-to-be-done frameworks.',
    price: 38,
    durationHours: 10,
    format: 'mixed',
    chapterNumber: 5,
    instructor: 'Dr. Aris Thorne (Cognitive Ergonomics Researcher)',
    syllabus: ['Archetypes vs demographic stereotypes', 'Jobs-To-Be-Done (JTBD) syntax', 'Behavioral journey mapping', 'Actionable empathy matrices']
  },
  {
    id: 'des-106',
    topic: 'Design',
    title: 'Heuristic Evaluation',
    description: 'Jakob Nielsen’s 10 usability heuristics applied to real audit workflows and redesign scoring.',
    price: 18,
    durationHours: 7,
    format: 'notes',
    chapterNumber: 6,
    instructor: 'Marcus Chen (UX Specialist)',
    syllabus: ['Nielsen 10 heuristics breakdown', 'Conducting competitive UX audits', 'Severity rating scoring system', 'Presenting actionable audit reports']
  },
  {
    id: 'des-107',
    topic: 'Design',
    title: 'Motion Design & After Effects',
    description: 'Functional animation choreography, easing curves, Lottie exports, and micro-delight transitions.',
    price: 37,
    durationHours: 15,
    format: 'video',
    chapterNumber: 7,
    instructor: 'Kira Vance (Senior Motion Director)',
    syllabus: ['Physics of digital motion & easing', 'Crafting expressive loading states', 'Lottie JSON web exports', 'Interactive micro-interactions']
  },
  {
    id: 'des-108',
    topic: 'Design',
    title: 'Intro to React, HTML & CSS',
    description: 'Bridge the design-to-code gap: inspect elements, Tailwind utility styling, and JSX component composition.',
    price: 36,
    durationHours: 14,
    format: 'mixed',
    chapterNumber: 8,
    instructor: 'Liam Gallagher (Staff Frontend Engineer)',
    syllabus: ['Semantic HTML & responsive flexbox/grid', 'Tailwind CSS mental models', 'React JSX props & state basics', 'Translating Figma tokens into code']
  },
  {
    id: 'des-109',
    topic: 'Design',
    title: 'Design Systems & Scale',
    description: 'Building multi-brand tokenized component libraries with documentation and governance models.',
    price: 42,
    durationHours: 12,
    format: 'mixed',
    chapterNumber: 9,
    instructor: 'Danilo Silva (Design Systems Architect)',
    syllabus: ['Foundational color & spatial tokens', 'Building scalable button/input families', 'Documentation & zero-height guidelines', 'Version control for UI kits']
  },

  // IT & SOFTWARE LESSONS
  {
    id: 'it-101',
    topic: 'IT & Software',
    title: 'Introduction to Computer Systems',
    description: 'Von Neumann architecture, binary operations, memory registers, and hardware fundamentals.',
    price: 15,
    durationHours: 5,
    format: 'video',
    chapterNumber: 1,
    instructor: 'Prof. David Vance (Stanford)',
    syllabus: ['CPU, RAM & storage hierarchies', 'How compilers translate code', 'Operating system kernels', 'I/O bus architecture']
  },
  {
    id: 'it-102',
    topic: 'IT & Software',
    title: 'Computer Hardware & Networking',
    description: 'Physical components, motherboards, chipsets, TCP/IP stack, routing tables, and DNS resolution.',
    price: 24,
    durationHours: 8,
    format: 'mixed',
    chapterNumber: 2,
    instructor: 'James McAvoy (Network Architect)',
    syllabus: ['OSI 7-layer vs TCP/IP model', 'IP subnets & packet routing', 'DNS & TLS handshake deep dive', 'Hardware diagnostics & troubleshooting']
  },
  {
    id: 'it-103',
    topic: 'IT & Software',
    title: 'System Software & Operating Systems',
    description: 'Process management, concurrency, threading, virtual memory, and Unix shell automation.',
    price: 28,
    durationHours: 9,
    format: 'notes',
    chapterNumber: 3,
    instructor: 'Lukas Meyer (Linux Foundation Contributor)',
    syllabus: ['Processes, threads & context switching', 'Memory paging & virtual allocations', 'Bash scripting & pipeline manipulation', 'Permissions & systemd services']
  },
  {
    id: 'it-104',
    topic: 'IT & Software',
    title: 'Software Development with Python',
    description: 'Object-oriented programming, data structures, algorithms, modular packages, and test suites.',
    price: 45,
    durationHours: 16,
    format: 'video',
    chapterNumber: 4,
    instructor: 'Priya Sharma (Principal Engineer, Google)',
    syllabus: ['Python idioms & functional paradigms', 'Data structures: dicts, sets, trees', 'Unit testing with PyTest', 'Packaging & virtual environments']
  },
  {
    id: 'it-105',
    topic: 'IT & Software',
    title: 'Networks, Firewalls & Cybersecurity',
    description: 'Zero-trust architecture, TLS encryption, penetration testing principles, and defensive hardening.',
    price: 38,
    durationHours: 12,
    format: 'mixed',
    chapterNumber: 5,
    instructor: 'Alexei Ivanov (Security Researcher)',
    syllabus: ['Vulnerability assessment & OWASP Top 10', 'Public key cryptography & hashing', 'Firewall rules & iptables', 'Incident response playbooks']
  },
  {
    id: 'it-106',
    topic: 'IT & Software',
    title: 'Cloud Architecture & Docker Containers',
    description: 'Containerization, Dockerfile optimization, Kubernetes pods, and serverless deployments.',
    price: 52,
    durationHours: 18,
    format: 'video',
    chapterNumber: 6,
    instructor: 'Rachel Zhang (AWS Community Hero)',
    syllabus: ['Building lean multi-stage Docker images', 'Container orchestration & pod networking', 'Serverless APIs on Cloud Run & Lambda', 'CI/CD deployment pipelines']
  },

  // DATA SCIENCE LESSONS
  {
    id: 'ds-101',
    topic: 'Data science',
    title: 'Data Analysis with Python & Pandas',
    description: 'Data wrangling, cleaning missing values, DataFrame operations, and exploratory data analysis (EDA).',
    price: 25,
    durationHours: 8,
    format: 'video',
    chapterNumber: 1,
    instructor: 'Dr. Hannah Cole (Data Scientist, Netflix)',
    syllabus: ['Pandas series and DataFrames', 'Cleaning messy real-world datasets', 'Groupby, joins & aggregation math', 'Exporting clean analytical tables']
  },
  {
    id: 'ds-102',
    topic: 'Data science',
    title: 'SQL & Database Querying Masterclass',
    description: 'Relational algebra, complex window functions, subqueries, CTEs, and query performance tuning.',
    price: 32,
    durationHours: 10,
    format: 'mixed',
    chapterNumber: 2,
    instructor: 'Amir Patel (Lead Database Engineer)',
    syllabus: ['Advanced aggregations & GROUP BY', 'Window functions: ROW_NUMBER, RANK, LAG', 'Common Table Expressions (CTEs)', 'Indexing & execution plan inspection']
  },
  {
    id: 'ds-103',
    topic: 'Data science',
    title: 'Applied Statistics for Data Science',
    description: 'Hypothesis testing, p-values, confidence intervals, A/B testing design, and Bayesian reasoning.',
    price: 35,
    durationHours: 11,
    format: 'notes',
    chapterNumber: 3,
    instructor: 'Prof. Julian Weber (Applied Math)',
    syllabus: ['Probability distributions & CLT', 'Two-sample t-tests and Chi-squared', 'Statistical power & sample sizing for A/B tests', 'Regression diagnostics & residuals']
  },
  {
    id: 'ds-104',
    topic: 'Data science',
    title: 'Machine Learning Core Algorithms',
    description: 'Scikit-learn supervised learning, decision trees, random forests, gradient boosting, and cross-validation.',
    price: 48,
    durationHours: 16,
    format: 'video',
    chapterNumber: 4,
    instructor: 'Sophia Reyes (Senior ML Engineer)',
    syllabus: ['Linear & logistic regression models', 'Tree ensembles: Random Forests & XGBoost', 'Model evaluation: ROC-AUC, precision-recall', 'Feature engineering & hyperparameter tuning']
  },
  {
    id: 'ds-105',
    topic: 'Data science',
    title: 'Data Visualization & Executive Dashboards',
    description: 'Visual storytelling, Seaborn, Plotly interactive graphics, and executive reporting principles.',
    price: 30,
    durationHours: 9,
    format: 'mixed',
    chapterNumber: 5,
    instructor: 'Dr. Hannah Cole (Data Scientist)',
    syllabus: ['Edward Tufte data-ink ratios', 'Interactive Plotly charts & tooltips', 'Color mapping for quantitative insight', 'Building executive briefing charts']
  },

  // BUSINESS LESSONS
  {
    id: 'biz-101',
    topic: 'Business',
    title: 'Powerful Business Writing: How to Write Concisely',
    description: 'Structure clear executive memos, pitch decks, client proposals, and succinct email strategy.',
    price: 22,
    durationHours: 6,
    format: 'notes',
    chapterNumber: 1,
    instructor: 'Harrison Cole (Former McKinsey Editor)',
    syllabus: ['The Pyramid Principle for memos', 'Eliminating passive voice & corporate jargon', 'Crafting persuasive 1-page proposals', 'Executive summaries that convert']
  },
  {
    id: 'biz-102',
    topic: 'Business',
    title: 'Certified Six Sigma Yellow Belt Training',
    description: 'DMAIC methodology, process mapping, root cause analysis, and eliminating organizational waste.',
    price: 42,
    durationHours: 14,
    format: 'video',
    chapterNumber: 2,
    instructor: 'Linda Kowalski (Master Black Belt)',
    syllabus: ['Define, Measure, Analyze, Improve, Control', 'Fishbone & 5-Whys root cause tools', 'Value stream mapping', 'Yellow Belt certification prep']
  },
  {
    id: 'biz-103',
    topic: 'Business',
    title: 'Financial Modeling & Valuation Basics',
    description: 'Three-statement financial models, DCF cash flow forecasting, unit economics, and break-even math.',
    price: 49,
    durationHours: 15,
    format: 'mixed',
    chapterNumber: 3,
    instructor: 'Arthur Vance (Wall Street VP)',
    syllabus: ['Income statement, balance sheet, cash flows', 'Discounted Cash Flow (DCF) mechanics', 'CAC, LTV & SaaS cohort unit economics', 'Scenario & sensitivity modeling']
  },
  {
    id: 'biz-104',
    topic: 'Business',
    title: 'Agile Product Management & Roadmap Strategy',
    description: 'Scrum vs Kanban, user story mapping, sprint cadences, OKRs, and stakeholder alignment.',
    price: 38,
    durationHours: 12,
    format: 'mixed',
    chapterNumber: 4,
    instructor: 'Jessica Lin (Director of Product, DoorDash)',
    syllabus: ['Sprint planning & backlog grooming', 'Writing testable user acceptance criteria', 'Quarterly OKRs & outcome roadmap frameworks', 'Managing engineering & executive stakeholders']
  },

  // MARKETING LESSONS
  {
    id: 'mkt-101',
    topic: 'Marketing',
    title: 'Modern Digital Marketing Foundations',
    description: 'Inbound funnels, conversion rate optimization, customer lifetime journey, and attribution.',
    price: 19,
    durationHours: 6,
    format: 'video',
    chapterNumber: 1,
    instructor: 'Devon Miller (Growth Director)',
    syllabus: ['Top-of-funnel vs bottom-of-funnel', 'Multi-touch attribution models', 'Conversion landing page essentials', 'Core marketing KPI metrics']
  },
  {
    id: 'mkt-102',
    topic: 'Marketing',
    title: 'SEO & Content Strategy Architecture',
    description: 'Technical SEO audits, search intent clustering, topical authority, and organic rankings.',
    price: 34,
    durationHours: 10,
    format: 'mixed',
    chapterNumber: 2,
    instructor: 'Claire Dupont (Head of Organic Growth)',
    syllabus: ['Keyword research & intent mapping', 'Technical crawling, indexation & Core Web Vitals', 'Building pillar content hubs', 'Backlink acquisition ethics']
  },
  {
    id: 'mkt-103',
    topic: 'Marketing',
    title: 'Paid Acquisition & Meta/Google Ad Campaigns',
    description: 'Campaign setup, audience targeting, ROAS optimization, creative testing, and pixel tracking.',
    price: 44,
    durationHours: 13,
    format: 'video',
    chapterNumber: 3,
    instructor: 'Carlos Mendez (Ad Spend Specialist)',
    syllabus: ['Meta Ads Manager structure & auction dynamics', 'Google Search & PMax campaign design', 'A/B testing high-converting ad copy', 'Calculating true CAC and ROAS']
  },

  // CONTENT CREATOR LESSONS
  {
    id: 'cc-101',
    topic: 'Content Creator',
    title: 'Visual Storytelling & Scriptwriting',
    description: 'Narrative arcs, hook mechanics, retention retention pacing, and script breakdown.',
    price: 26,
    durationHours: 7,
    format: 'notes',
    chapterNumber: 1,
    instructor: 'Zack Thorne (Documentary Filmmaker)',
    syllabus: ['3-second hook construction', 'Open loops and narrative tension', 'Writing conversational scripts', 'Storyboarding visual pacing']
  },
  {
    id: 'cc-102',
    topic: 'Content Creator',
    title: 'Video Editing in DaVinci Resolve & Premiere',
    description: 'Pacing, J/L cuts, sound design, color grading, motion graphics, and audio mastering.',
    price: 46,
    durationHours: 15,
    format: 'video',
    chapterNumber: 2,
    instructor: 'Mia Sterling (Lead Post-Production Editor)',
    syllabus: ['Timeline shortcuts & assembly cutting', 'Dynamic audio mixing & compression', 'Color correction and cinematic LUTs', 'Thumbnail screenshot choreography']
  },
  {
    id: 'cc-103',
    topic: 'Content Creator',
    title: 'YouTube Channel Monetization & Brand Deals',
    description: 'Ad revenue, sponsorship negotiation, contract terms, digital products, and community building.',
    price: 38,
    durationHours: 11,
    format: 'mixed',
    chapterNumber: 3,
    instructor: 'Sammy Brooks (2M+ Creator & Media Founder)',
    syllabus: ['Media kits and pricing brand integrations', 'Sponsorship contract clauses to avoid', 'Building high-margin digital newsletters & goods', 'Community funnel retention']
  }
];

// Helper to generate dynamic packages for any topic and budget!
export function getCustomPackagesForTopicAndBudget(
  topic: TopicCategory,
  budget: number,
  lessonPool: Lesson[] = MASTER_LESSONS
): LearningPackage[] {
  const topicLessons = lessonPool.filter(l => l.topic === topic);
  const fallbackLessons = lessonPool.filter(l => l.topic !== topic);
  const available = topicLessons.length >= 6 ? topicLessons : [...topicLessons, ...fallbackLessons];

  // If topic is Design and budget is around 130-140, match wireframe 1 exact packages!
  if (topic === 'Design') {
    const l1 = available.find(l => l.id === 'des-101') || available[0];
    const l2 = available.find(l => l.id === 'des-102') || available[1];
    const l3 = available.find(l => l.id === 'des-103') || available[2];
    const l4 = available.find(l => l.id === 'des-104') || available[3];
    const l5 = available.find(l => l.id === 'des-105') || available[4];
    const l6 = available.find(l => l.id === 'des-106') || available[5];
    const l7 = available.find(l => l.id === 'des-107') || available[6];
    const l8 = available.find(l => l.id === 'des-108') || available[7];

    const starterLessons = [l1, l2, l3];
    const starterTotal = starterLessons.reduce((sum, l) => sum + l.price, 0);
    const starterHours = starterLessons.reduce((sum, l) => sum + l.durationHours, 0);

    const intermediateLessons = [l4, l2, l5];
    const intermediateTotal = intermediateLessons.reduce((sum, l) => sum + l.price, 0);
    const intermediateHours = intermediateLessons.reduce((sum, l) => sum + l.durationHours, 0);

    const expertLessons = [l4, l6, l7, l8];
    const expertTotal = expertLessons.reduce((sum, l) => sum + l.price, 0);
    const expertHours = expertLessons.reduce((sum, l) => sum + l.durationHours, 0);

    return [
      {
        id: `pkg-starter-${topic.toLowerCase().replace(/\s+/g, '-')}`,
        topic,
        tier: 'starter',
        title: 'Starter Path',
        badge: 'Best for beginners',
        subtitle: 'Build a solid foundation with beginner-friendly courses',
        totalPrice: starterTotal, // $30
        totalHours: starterHours, // 16h
        lessons: starterLessons,
        colorTheme: 'lime',
        targetAudience: 'Beginners looking to build verified baseline skills'
      },
      {
        id: `pkg-intermediate-${topic.toLowerCase().replace(/\s+/g, '-')}`,
        topic,
        tier: 'intermediate',
        title: 'Intermediate Path',
        badge: 'Most Popular',
        subtitle: 'Level up with a balanced mix of foundational & advanced skills',
        totalPrice: intermediateTotal, // $90
        totalHours: intermediateHours, // 30h
        lessons: intermediateLessons,
        colorTheme: 'salmon',
        targetAudience: 'Practitioners transitioning to professional workflows'
      },
      {
        id: `pkg-expert-${topic.toLowerCase().replace(/\s+/g, '-')}`,
        topic,
        tier: 'expert',
        title: 'Expert Path',
        badge: 'Most Valuable',
        subtitle: 'Master your domain with our most comprehensive selection',
        totalPrice: expertTotal, // $130
        totalHours: expertHours, // 50h
        lessons: expertLessons,
        colorTheme: 'sky',
        targetAudience: 'Career switchers and professionals targeting seniority'
      }
    ];
  }

  // For any other topic, dynamically compose packages that respect the user's budget range!
  // Sort lessons by price ascending
  const sorted = [...available].sort((a, b) => a.price - b.price);

  // Starter: 2-3 essential lessons (~25% to 40% of budget or min $25)
  const starterTarget = Math.max(25, Math.min(budget * 0.4, 45));
  let starterLessons: Lesson[] = [];
  let sTotal = 0;
  for (const l of sorted) {
    if (starterLessons.length < 3 && (sTotal + l.price <= starterTarget || starterLessons.length === 0)) {
      starterLessons.push(l);
      sTotal += l.price;
    }
  }
  if (starterLessons.length < 2) starterLessons = sorted.slice(0, 2);

  // Intermediate: balanced mix (~60% to 75% of budget)
  const interTarget = Math.max(sTotal + 20, Math.min(budget * 0.75, 120));
  let intermediateLessons: Lesson[] = [];
  let iTotal = 0;
  for (let idx = 1; idx < sorted.length; idx++) {
    const l = sorted[idx];
    if (intermediateLessons.length < 3 && (iTotal + l.price <= interTarget || intermediateLessons.length < 2)) {
      intermediateLessons.push(l);
      iTotal += l.price;
    }
  }
  if (intermediateLessons.length < 3) intermediateLessons = sorted.slice(1, 4);

  // Expert: comprehensive package (~90% to 100% of budget or slightly over)
  let expertLessons: Lesson[] = [];
  let eTotal = 0;
  for (let idx = sorted.length - 1; idx >= 0; idx--) {
    const l = sorted[idx];
    if (expertLessons.length < 4 && (eTotal + l.price <= budget * 1.1 || expertLessons.length < 3)) {
      expertLessons.push(l);
      eTotal += l.price;
    }
  }
  if (expertLessons.length < 3) expertLessons = sorted.slice(0, 4);

  return [
    {
      id: `pkg-starter-${topic.toLowerCase().replace(/\s+/g, '-')}`,
      topic,
      tier: 'starter',
      title: 'Starter Path',
      badge: 'Best for beginners',
      subtitle: `Build a solid foundation in ${topic} with core concepts`,
      totalPrice: starterLessons.reduce((acc, l) => acc + l.price, 0),
      totalHours: starterLessons.reduce((acc, l) => acc + l.durationHours, 0),
      lessons: starterLessons,
      colorTheme: 'lime',
      targetAudience: 'Beginners stepping into this discipline'
    },
    {
      id: `pkg-intermediate-${topic.toLowerCase().replace(/\s+/g, '-')}`,
      topic,
      tier: 'intermediate',
      title: 'Intermediate Path',
      badge: 'Most Popular',
      subtitle: `Level up in ${topic} with industry standard methodologies`,
      totalPrice: intermediateLessons.reduce((acc, l) => acc + l.price, 0),
      totalHours: intermediateLessons.reduce((acc, l) => acc + l.durationHours, 0),
      lessons: intermediateLessons,
      colorTheme: 'salmon',
      targetAudience: 'Learners aiming for tangible workplace output'
    },
    {
      id: `pkg-expert-${topic.toLowerCase().replace(/\s+/g, '-')}`,
      topic,
      tier: 'expert',
      title: 'Expert Path',
      badge: 'Most Valuable',
      subtitle: `Master ${topic} with deep technical and strategic coverage`,
      totalPrice: expertLessons.reduce((acc, l) => acc + l.price, 0),
      totalHours: expertLessons.reduce((acc, l) => acc + l.durationHours, 0),
      lessons: expertLessons,
      colorTheme: 'sky',
      targetAudience: 'Advanced practitioners seeking comprehensive mastery'
    }
  ];
}

// Initial enrolled package for demo (Robert Milchick enrolled in Starter Path)
export const INITIAL_ENROLLED_PACKAGES = [
  {
    enrollmentId: 'enr-starter-design-01',
    packageId: 'pkg-starter-design',
    title: 'Starter Path (Design)',
    topic: 'Design' as TopicCategory,
    enrolledAt: '2026-10-18T14:30:00Z',
    totalPaid: 30,
    colorTheme: 'lime' as const,
    status: 'active' as const,
    lessons: [
      {
        ...MASTER_LESSONS[0], // Design Fundamentals ($7)
        completed: true,
        completedAt: '2026-10-19T10:00:00Z'
      },
      {
        ...MASTER_LESSONS[1], // UI/UX Principles ($13)
        completed: false
      },
      {
        ...MASTER_LESSONS[2], // Research ($10)
        completed: false
      }
    ]
  }
];
