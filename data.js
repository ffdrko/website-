// Fahim Faisal Deepto - Portfolio Data Configuration
// Sourced directly from CV, GitHub (@ffdrko), LinkedIn, and Google Scholar

const PORTFOLIO_DATA = {
  personal: {
    name: "Fahim Faisal Deepto",
    title: "AI Engineer | Applied AI & Agentic AI | AI Product Manager",
    headline: "Building Autonomous Agent Systems, Production LLM Pipelines & Applied Machine Learning Solutions",
    location: "Dhaka, Bangladesh",
    email: "faisal.deepto@gmail.com",
    phone: "+880 1534403341",
    avatar: "https://avatars.githubusercontent.com/u/56530414?v=4",
    bio: "AI Engineer with a Computer Science background and an MSc in Intelligent Computing. I bridge deep technical AI engineering capability (LLM workflows, agent evaluation harnesses, MCP connectors, multi-modal computer vision) with hands-on AI product management, user-need analysis, and end-to-end pipeline delivery.",
    resumeUrl: "assets/Fahim_Faisal_Deepto_CV.pdf",
    socials: {
      github: "https://github.com/ffdrko",
      linkedin: "https://linkedin.com/in/fahim-faisal-deepto-b3452b186",
      scholar: "https://scholar.google.com/citations?hl=en&user=tszCzBsAAAAJ",
      email: "mailto:faisal.deepto@gmail.com"
    }
  },

  metrics: [
    {
      value: "90%",
      label: "Crash Detection Accuracy",
      detail: "Multi-modal ensemble model combining dashcam telemetry with deep learning (NSU ACM Awarded)"
    },
    {
      value: "9",
      label: "Healthcare Datasets Analyzed",
      detail: "Engineered 6-stage longitudinal pipeline for SuSastho pharmacy telemedicine at IRIIC"
    },
    {
      value: "10+",
      label: "MCP Tool Integrations",
      detail: "Autonomous agent evaluation across GitHub, Notion, Linear, Slack, Sentry, and Google Workspace"
    },
    {
      value: "IEEE",
      label: "ICDMW 2025 Publication",
      detail: "Benchmarking & optimization framework for ML and LLM-based health triage"
    }
  ],

  categories: [
    { id: "all", label: "All Projects" },
    { id: "agentic", label: "Agentic AI & LLMs" },
    { id: "healthcare", label: "Healthcare & Analytics" },
    { id: "vision", label: "Computer Vision & DL" },
    { id: "product", label: "AI Product & Systems" }
  ],

  projects: [
    {
      id: "ai-buddy",
      title: "AI-Buddy: Autonomous Personalized Study & Tutoring System",
      category: "agentic",
      featured: true,
      badge: "Agentic AI & RAG",
      summary: "An AI-powered adaptive study platform that transforms raw learning materials and multi-page PDFs into an interactive personal tutor using semantic chunking, dense vector embeddings, and LLM-guided retrieval.",
      github: "https://github.com/ffdrko/AI-buddy",
      demo: null,
      tags: ["Python", "LLMs", "RAG", "Embeddings", "Vector Search", "Document Intelligence"],
      highlights: [
        "Architected an end-to-end RAG pipeline ingesting complex multi-page academic PDFs with robust document parsing.",
        "Implemented semantic chunking and dense vector embedding strategies to maximize contextual retrieval precision.",
        "Designed conversational agent workflows that provide iterative Socratic explanations and dynamic practice assessments."
      ],
      deepDive: {
        problem: "Traditional digital learning tools present static text without adaptive feedback or contextual comprehension checks.",
        solution: "Built a retrieval-augmented autonomous study system where users supply reference textbooks or notes, and the agent constructs dynamic question-answering graphs and self-testing quizzes.",
        architecture: "Document Preprocessing -> Semantic Chunking -> Vector Database Embedding -> Similarity Query Retriever -> Prompt Engineering & Agent Response Formatter."
      }
    },
    {
      id: "mcp-agent-eval",
      title: "AI-Agent Testing, Evaluation & MCP Connector Harness",
      category: "agentic",
      featured: true,
      badge: "Industry Production (TigerIT)",
      summary: "Comprehensive evaluation and testing harness built to validate autonomous AI agents, tool invocation accuracy, and multi-connector workflows using the Model Context Protocol (MCP).",
      github: "https://github.com/ffdrko",
      demo: null,
      tags: ["Model Context Protocol (MCP)", "Agent Harness", "Document Intelligence", "Tool Calling", "Failure Case Analysis"],
      highlights: [
        "Tested and validated agent workflows across 10+ real-world connectors: GitHub, Notion, Linear, Sentry, Dropbox, Asana, Google Drive, Gmail, Slack.",
        "Designed document-intelligence test suites covering standard PDFs, image-heavy docs, and standalone scans to evaluate edge-case failure modes.",
        "Benchmarked agent harness approaches to identify hallucination risks, behavioral bottlenecks, and configuration regressions."
      ],
      deepDive: {
        problem: "Autonomous agents frequently derail or hallucinate when invoking complex third-party tools in unstructured enterprise environments.",
        solution: "Formulated rigorous testing matrices and behavioral harnesses simulating edge-case API responses and measuring task completion reliability.",
        architecture: "Client Request -> Agent Planner -> MCP Tool Protocol Broker -> External Service Gateways (GitHub/Notion/Linear/Slack) -> Evaluation Observer & Failure Logger."
      }
    },
    {
      id: "yolo-crash-detection",
      title: "Real-Time Car Crash Detection via Multi-Modal Ensemble",
      category: "vision",
      featured: true,
      badge: "3rd Place - NSU ACM Challenge",
      summary: "An ensemble computer-vision system combining dashboard-camera video streams with multi-view inputs to detect vehicular collisions in real time with 90% accuracy.",
      github: "https://github.com/ffdrko/Yolo-you-only-live-once",
      demo: null,
      tags: ["Computer Vision", "YOLO", "Ensemble Methods", "Video Analytics", "Multi-Modal DL"],
      highlights: [
        "Engineered an ensemble architecture combining complementary camera perspectives to eliminate blind spots.",
        "Achieved 90% real-time collision detection accuracy through rigorous iterative model tuning and spatial-temporal filtering.",
        "Awarded 3rd Place at the NSU ACM Innovation Challenge for technical novelty and public-safety impact."
      ],
      deepDive: {
        problem: "Delayed emergency response in vehicular accidents causes severe casualties; existing vision models suffer high false alarm rates under varied lighting.",
        solution: "Designed a multi-stream deep learning pipeline analyzing consecutive dashcam frames with custom YOLO-based spatial bounding and temporal collision confirmation.",
        architecture: "Live Video Feed -> Frame Extraction -> Preprocessing & Normalization -> Multi-stream Detection Engine -> Ensemble Voting Filter -> Alert Notification Trigger."
      }
    },
    {
      id: "susastho-telemedicine",
      title: "SuSastho Pharmacy Telemedicine Analytics Pipeline",
      category: "healthcare",
      featured: true,
      badge: "Healthcare Research (IRIIC, UIU)",
      summary: "A 6-stage Python analytics pipeline processing 9 real-world nationwide telemedicine datasets to evaluate longitudinal patient outcomes and Non-Communicable Disease (NCD) trends.",
      github: "https://github.com/ffdrko",
      demo: null,
      tags: ["Python", "Pandas", "Statistical Analysis", "Healthcare AI", "Longitudinal Studies"],
      highlights: [
        "Developed a robust 6-stage ETL and statistical modeling pipeline reconciling disparate pharmacy records and clinical consult logs.",
        "Conducted longitudinal significance testing across 5 discrete time periods, identifying a statistically significant decline in 'Not Improved' patient outcomes.",
        "Translated complex epidemiological findings into actionable dashboard metrics for healthcare stakeholders and medical directors."
      ],
      deepDive: {
        problem: "Healthcare providers struggled to quantitatively verify whether rural telemedicine consults yielded measurable clinical health recovery.",
        solution: "Consolidated over 9 operational databases into a normalized longitudinal tracking cohort, executing chi-square and ANOVA statistical validity tests.",
        architecture: "Raw Pharmacy Datasets (9 sources) -> Data Cleaning & Deduplication -> Patient Entity Resolution -> 6-Stage Longitudinal Aggregator -> Statistical Hypothesis Verification -> Trend Visualizations."
      }
    },
    {
      id: "ieee-health-triage",
      title: "Benchmark & Optimization Framework for ML & LLM Health Triage",
      category: "healthcare",
      featured: true,
      badge: "IEEE ICDMW 2025 Paper",
      summary: "Published research establishing an empirical evaluation and optimization framework comparing classical machine learning models and modern LLMs on clinical patient triage tasks.",
      github: "https://github.com/ffdrko/Synergistic-Impact-of-Diabetes-and-Hypertension-on-COVID-19-Respiratory-Severity",
      scholarUrl: "https://scholar.google.com/citations?hl=en&user=tszCzBsAAAAJ",
      tags: ["LLM Evaluation", "Clinical Triage", "Scikit-Learn", "Prompt Engineering", "IEEE Publication"],
      highlights: [
        "Systematically compared decision boundaries of ensemble ML classifiers against specialized LLM zero/few-shot prompt strategies.",
        "Formulated latency, precision, and clinical safety risk trade-off curves for deployment in high-throughput triage environments.",
        "Peer-reviewed and published in IEEE International Conference on Data Mining Workshops (ICDMW 2025)."
      ],
      deepDive: {
        problem: "Deploying LLMs blindly into medical triage presents liability and hallucination risks, while static ML models lack natural language nuance.",
        solution: "Established a standardized benchmark measuring precision, clinical recall, inference speed, and token cost across diverse symptom severity tiers.",
        architecture: "Patient Intake Narrative -> Symptom Extraction -> Dual Inference Engine (Ensemble ML Baseline vs LLM Prompt Chain) -> Consensus Validator -> Triage Urgency Output."
      }
    },
    {
      id: "kemne-jabo",
      title: "Kemne Jabo! - Route Planning & Travel Information Platform",
      category: "product",
      featured: false,
      badge: "Mujib 100 Ideas Awardee",
      summary: "A full-stack intelligent transit and route recommendation system combining graph-based route search with a conversational query-answering engine for urban travelers.",
      github: "https://github.com/ffdrko/Kemne-jabo",
      tags: ["Full-Stack", "Route Optimization", "Graph Algorithms", "Natural Language Query", "Urban Mobility"],
      highlights: [
        "Designed path-finding algorithms tailored to Dhaka's multimodal transit networks (buses, metro, shared routes).",
        "Integrated a conversational assistant allowing users to ask natural queries regarding schedules, transfer points, and fares.",
        "Selected as one of the national 'Mujib 100 Ideas' for civic innovation and practical problem-solving."
      ],
      deepDive: {
        problem: "Commuters in Dhaka face chaotic, unmapped transit options without transparent route or fare intelligence.",
        solution: "Engineered a centralized graph network mapping urban transit points with conversational natural-language querying.",
        architecture: "User Query / Geo-Coordinates -> Route Graph Optimizer -> Fares & Timing Calculator -> Web Application UI."
      }
    },
    {
      id: "augmedix-screening",
      title: "AI Candidate-Screening & Speech Transcription Pipeline",
      category: "product",
      featured: false,
      badge: "Enterprise Solution Concept",
      summary: "Architected an automated candidate-screening pipeline replacing manual phone-based speaking interviews with automated speech transcription, MCQ grammar tests, and AI speech fluency scoring.",
      github: "https://github.com/ffdrko",
      tags: ["Speech-to-Text", "NLP", "Candidate Screening", "Product Architecture", "Inneed Cloud"],
      highlights: [
        "Eliminated recruitment bottlenecks for Augmedix by designing an automated speech-to-text assessment pipeline.",
        "Combined automated pronunciation, cadence, and grammar scoring into an objective candidate qualification index.",
        "Synthesized requirements directly from executive stakeholders into technical architecture specifications."
      ],
      deepDive: {
        problem: "Manual phone-based language assessments took weeks of HR hours and introduced human interviewer bias.",
        solution: "Structured an asynchronous web evaluation testing grammar via automated MCQs and fluency via speech-to-text transcript alignment.",
        architecture: "Candidate Audio Recording -> Audio Cleaning -> Speech-to-Text Transcription -> Language Fluency & Grammar Analysis -> Automated HR Candidate Scorecard."
      }
    },
    {
      id: "pneumonia-cnn",
      title: "Pneumonia Detection from Chest Radiographs using CNNs",
      category: "vision",
      featured: false,
      badge: "Medical Imaging",
      summary: "Deep convolutional neural network architecture trained to classify bacterial and viral pneumonia from patient chest X-ray scans with high diagnostic sensitivity.",
      github: "https://github.com/ffdrko/pneumonia_detection_with_CNN",
      tags: ["PyTorch / TensorFlow", "CNN", "Medical Imaging", "Data Augmentation", "Transfer Learning"],
      highlights: [
        "Implemented transfer learning and convolutional feature extractors for high-resolution radiographic imaging.",
        "Applied targeted data augmentation to mitigate class imbalance between healthy controls and severe pathologies.",
        "Produced saliency visualizations highlighting lung opacity regions responsible for model classifications."
      ],
      deepDive: {
        problem: "Radiologists in under-resourced hospitals encounter severe backlogs in diagnosing critical respiratory conditions.",
        solution: "Trained a convolutional classifier capable of flagging pneumonia symptoms with high sensitivity in seconds.",
        architecture: "Chest Radiograph -> Histogram Equalization -> Conv2D Feature Extraction -> Max Pooling -> Dense Classification -> Heatmap Attribution."
      }
    },
    {
      id: "traffic-accident-data",
      title: "Data Transparency & Historical Accident Trends Analysis",
      category: "healthcare",
      featured: false,
      badge: "Public Policy Data Science",
      summary: "Comprehensive comparative data analysis of national road safety records in Bangladesh, pinpointing institutional reporting discrepancies and fatality trends.",
      github: "https://github.com/ffdrko/Data-Transparency-and-Historic-Trends-in-Traffic-Accidents",
      tags: ["Exploratory Data Analysis", "Jupyter", "Public Policy", "Data Visualization", "Hypothesis Testing"],
      highlights: [
        "Analyzed multi-year statistical records from law enforcement, transport authorities, and civil society databases.",
        "Exposed reporting variance and identified high-density accident corridors to inform municipal policy.",
        "Published reproducible open notebooks to foster transparent public safety research."
      ],
      deepDive: {
        problem: "Government and independent NGO road accident counts diverged drastically, impairing evidence-based road policy.",
        solution: "Created an analytical aggregation framework cross-referencing multiple reporting methodologies.",
        architecture: "Multi-Source Extraction -> Discrepancy Matching -> Geospatial & Temporal Binning -> Statistical Trend Reporting."
      }
    }
  ],

  skills: {
    agentic: [
      { name: "AI Agents & Autonomous Workflows", level: "Advanced", icon: "bot" },
      { name: "Model Context Protocol (MCP)", level: "Advanced", icon: "network" },
      { name: "Tool & Connector Integration", level: "Advanced", icon: "plug" },
      { name: "Agent Evaluation & Test Harnesses", level: "Advanced", icon: "check-circle" },
      { name: "RAG & Vector Retrieval", level: "Advanced", icon: "database" },
      { name: "Prompt Engineering & Evaluation", level: "Advanced", icon: "terminal" },
      { name: "Document Intelligence & Parsing", level: "Proficient", icon: "file-text" }
    ],
    ml_vision: [
      { name: "Machine Learning & Deep Learning", level: "Advanced", icon: "cpu" },
      { name: "Computer Vision & YOLO", level: "Advanced", icon: "eye" },
      { name: "Ensemble Modeling & Optimization", level: "Advanced", icon: "layers" },
      { name: "Convolutional Neural Networks (CNNs)", level: "Advanced", icon: "grid" },
      { name: "Model Fine-tuning & Evaluation", level: "Proficient", icon: "sliders" },
      { name: "U-Net & Semantic Segmentation", level: "Proficient", icon: "activity" }
    ],
    data_eng: [
      { name: "Python (NumPy, Pandas, Scikit-Learn)", level: "Advanced", icon: "code" },
      { name: "SQL & Relational Databases", level: "Advanced", icon: "database" },
      { name: "ETL & Analytics Pipeline Design", level: "Advanced", icon: "git-commit" },
      { name: "Statistical Hypothesis Testing", level: "Advanced", icon: "bar-chart-2" },
      { name: "JavaScript / TypeScript", level: "Proficient", icon: "code" },
      { name: "REST APIs & System Integration", level: "Advanced", icon: "share-2" }
    ],
    product_leadership: [
      { name: "AI Product Prototyping & Feasibility", level: "Advanced", icon: "compass" },
      { name: "User-Need & Technical Gap Analysis", level: "Advanced", icon: "target" },
      { name: "Agile / Scrum Delivery (Scrum Master)", level: "Advanced", icon: "users" },
      { name: "Stakeholder Communication", level: "Advanced", icon: "message-square" },
      { name: "Technical Specifications & RFCs", level: "Advanced", icon: "file-code" },
      { name: "Sprint Planning & Delivery", level: "Advanced", icon: "calendar" }
    ]
  },

  experience: [
    {
      company: "TigerIT Bangladesh Ltd.",
      role: "Innovation Engineer - AI Product & Agent Engineering",
      period: "Nov 2025 – Present",
      location: "Dhaka, Bangladesh",
      type: "Full-Time",
      description: "Driving the prototyping, evaluation, and production hardening of autonomous AI agent workflows and intelligent enterprise systems.",
      bullets: [
        "Prototype and evaluate AI-driven product concepts by translating emerging LLM capabilities and user requirements into technically feasible architectures.",
        "Spearhead AI-agent testing and evaluation, validating agent reasoning loops, tool invocation reliability, and cross-scenario behaviors.",
        "Lead integration and testing of Model Context Protocol (MCP) connectors across GitHub, Notion, Linear, Sentry, Dropbox, Asana, Google Drive, Gmail, Slack, and Google Chat.",
        "Design and execute document-intelligence evaluation suites spanning complex corporate documents, high-density charts, and scanned images.",
        "Benchmark agent execution harnesses to uncover behavioral edge cases, configuration vulnerabilities, and error-recovery pathways.",
        "Collaborate closely with product management and engineering leadership to translate customer requirements into rigorous technical workflow specifications."
      ]
    },
    {
      company: "Institute of Research, Innovation, Incubation and Commercialization (IRIIC), UIU",
      role: "Research Engineer - Applied AI/ML",
      period: "Jun 2025 – Oct 2025",
      location: "Dhaka, Bangladesh",
      type: "Research & Development",
      description: "Applied artificial intelligence and statistical learning methodologies to real-world healthcare and digital health challenges.",
      bullets: [
        "Designed and prototyped AI/ML healthcare architectures using operational patient records from the nationwide SuSastho pharmacy telemedicine platform.",
        "Engineered a scalable 6-stage Python data analytics pipeline ingesting and harmonizing 9 longitudinal clinical datasets.",
        "Conducted longitudinal statistical analysis and hypothesis testing across 5 time horizons, proving a statistically significant decline in 'Not Improved' outcomes.",
        "Formulated research gap analyses and translated unstructured healthcare dilemmas into structured, testable algorithmic approaches."
      ]
    },
    {
      company: "Inneed Cloud",
      role: "IT Business Analyst & Scrum Master",
      period: "Oct 2022 – Mar 2023",
      location: "Dhaka, Bangladesh",
      type: "Contract / Project",
      description: "Spearheaded technical feasibility, client requirements discovery, and agile engineering alignment for high-impact AI/ML initiatives.",
      bullets: [
        "Pitched and presented an ML-based solution framework to a2i (Aspire to Innovate) addressing critical maternal healthcare tracking challenges.",
        "Designed an automated candidate-screening pipeline architecture for Augmedix, replacing manual phone assessments with automated speech transcription and AI-scored fluency tests.",
        "Gathered client business logic and translated business needs into actionable sprint backlogs and technical specifications.",
        "Served as Scrum Master, facilitating daily standups, sprint planning, and retrospective sessions to eliminate delivery blockers."
      ]
    }
  ],

  education: [
    {
      institution: "United International University (UIU)",
      degree: "MSc in Computer Science and Engineering - Intelligent Computing",
      period: "Jun 2024 – Present",
      location: "Dhaka, Bangladesh",
      cgpa: "3.22",
      thesis: "Longitudinal Analysis of Patient Health Outcomes and NCD Trends Using SuSastho Pharmacy-Based Telemedicine Data",
      supervisor: "Prof. Khondaker Abdullah Al Mamun, PhD"
    },
    {
      institution: "North South University (NSU)",
      degree: "BSc in Computer Science and Engineering",
      period: "Jan 2018 – Sep 2022",
      location: "Dhaka, Bangladesh",
      cgpa: "2.83 / 4.0",
      highlights: "AI-focused coursework in Machine Learning, Deep Learning, Artificial Intelligence. General Secretary of NSU Computer & Engineering Club (2022-2023)."
    }
  ],

  publications: [
    {
      title: "A Benchmark and Optimization Framework for ML and LLM-Based Health Triage",
      venue: "IEEE International Conference on Data Mining Workshops (ICDMW)",
      year: "2025",
      type: "Conference Paper",
      status: "Published",
      link: "https://scholar.google.com/citations?hl=en&user=tszCzBsAAAAJ",
      description: "An empirical benchmarking suite comparing classical tree-based ensembles with LLMs under constrained prompt scenarios for clinical triage optimization."
    },
    {
      title: "Synergistic Impact of Diabetes and Hypertension on COVID-19 Respiratory Severity: A Machine Learning Analysis",
      venue: "Research Initiative & Modeling Study",
      year: "2025",
      type: "Research Paper",
      status: "Published / In Review",
      link: "https://github.com/ffdrko/Synergistic-Impact-of-Diabetes-and-Hypertension-on-COVID-19-Respiratory-Severity",
      description: "Multi-factor clinical risk stratification modeling analyzing the compounding impact of chronic comorbidities on acute respiratory distress."
    }
  ],

  leadership: [
    {
      role: "General Secretary",
      organization: "North South University Computer & Engineering Club (NSUCEC)",
      period: "Apr 2022 – Apr 2023",
      description: "Led executive operations, organized national hackathons, technical symposiums, and engineering workshops for over 2,000+ student members."
    },
    {
      role: "General Member",
      organization: "Engineering Students' Association of Bangladesh (ESAB)",
      period: "Jan 2019 – Dec 2020",
      description: "Contributed to collaborative student engineering events, technical skill workshops, and community robotics seminars."
    }
  ]
};
