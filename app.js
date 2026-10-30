// Fahim Faisal Deepto - Portfolio Script (poulo.site architecture)

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupNavScroll();
  initStoryCards();
  renderWorks("all");
  renderExperiments();
  renderStack();
  renderAbout();
  initAskAssistant();
  initAgentView();
  initModalsAndToasts();
  refreshIcons();
});

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 1. Theme Management
function initTheme() {
  const saved = localStorage.getItem("poulo_theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcon(saved);

  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme");
      const next = cur === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("poulo_theme", next);
      updateThemeIcon(next);
      refreshIcons();
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("themeIcon");
  if (!icon) return;
  icon.setAttribute("data-lucide", theme === "light" ? "sun" : "moon");
}

// 2. Active Dock Navigation on Scroll
function setupNavScroll() {
  const navItems = document.querySelectorAll(".dock-item[data-nav]");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) {
        current = sec.getAttribute("id");
      }
    });

    navItems.forEach(item => {
      item.classList.remove("active");
      if (item.getAttribute("data-nav") === current) {
        item.classList.add("active");
      }
    });
  });
}

// 3. Hero Story Accordion Cards
function initStoryCards() {
  const cards = document.querySelectorAll(".story-card");
  cards.forEach(c => {
    c.querySelector(".story-header").addEventListener("click", () => {
      const isOpen = c.classList.contains("open");
      cards.forEach(other => other.classList.remove("open"));
      if (!isOpen) {
        c.classList.add("open");
      }
    });
  });
}

// 4. Works (Case Studies) Rendering & Filters
let activeWorkCat = "all";

function renderWorks(catId) {
  const filterContainer = document.getElementById("workFilters");
  const grid = document.getElementById("worksGrid");
  if (!grid || !PORTFOLIO_DATA.projects) return;

  // Render Filter Pills once
  if (filterContainer && !filterContainer.hasChildNodes()) {
    const categories = [
      { id: "all", label: "Show all" },
      { id: "agentic", label: "AI and Agentics" },
      { id: "healthcare", label: "Healthcare & Analytics" },
      { id: "vision", label: "Vision & Deep Learning" },
      { id: "product", label: "AI Product & Systems" }
    ];

    filterContainer.innerHTML = categories.map(cat => `
      <button class="filter-pill ${cat.id === activeWorkCat ? 'active' : ''}" data-cat="${cat.id}">
        ${cat.label}
      </button>
    `).join("");

    filterContainer.querySelectorAll(".filter-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        filterContainer.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeWorkCat = btn.getAttribute("data-cat");
        renderWorks(activeWorkCat);
      });
    });
  }

  // Filter projects
  const filtered = catId === "all"
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === catId);

  grid.innerHTML = filtered.map(p => `
    <div class="poulo-card p-6 sm:p-8 flex flex-col justify-between group">
      <div>
        <div class="flex items-center justify-between gap-2 mb-4">
          <span class="tag-badge text-teal-300 font-mono text-[11px]">${p.badge}</span>
          ${p.featured ? `
            <span class="text-[11px] font-mono text-amber-400 flex items-center gap-1">
              <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Key Initiative
            </span>
          ` : ''}
        </div>

        <h3 class="font-display font-bold text-xl text-white mb-2 group-hover:text-teal-400 transition-colors">
          ${p.title}
        </h3>

        <p class="text-xs text-slate-300 leading-relaxed mb-4">
          ${p.summary}
        </p>

        <!-- Highlights -->
        <ul class="space-y-1.5 mb-5 text-xs text-slate-400">
          ${p.highlights.slice(0, 2).map(h => `
            <li class="flex items-start gap-2">
              <i data-lucide="check" class="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0"></i>
              <span>${h}</span>
            </li>
          `).join("")}
        </ul>
      </div>

      <div>
        <div class="flex flex-wrap gap-1.5 mb-5">
          ${p.tags.map(t => `<span class="tag-badge text-[11px]">${t}</span>`).join("")}
        </div>

        <div class="flex items-center gap-2 pt-4 border-t border-white/10">
          <button class="btn-solid flex-1 text-xs py-2 px-3 deep-dive-trigger" data-id="${p.id}">
            <i data-lucide="layers" class="w-3.5 h-3.5"></i>
            <span>Architecture Deep Dive</span>
          </button>
          ${p.github ? `
            <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn-ghost text-xs p-2" title="Inspect GitHub Repository">
              <i data-lucide="github" class="w-4 h-4"></i>
            </a>
          ` : ''}
          ${p.scholarUrl ? `
            <a href="${p.scholarUrl}" target="_blank" rel="noopener noreferrer" class="btn-ghost text-xs p-2 text-cyan-400" title="Google Scholar Citation">
              <i data-lucide="graduation-cap" class="w-4 h-4"></i>
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".deep-dive-trigger").forEach(btn => {
    btn.addEventListener("click", () => openDeepDiveModal(btn.getAttribute("data-id")));
  });

  refreshIcons();
}

// 5. AI Experiments Grid
function renderExperiments() {
  const container = document.getElementById("experimentsGrid");
  if (!container || !PORTFOLIO_DATA.projects) return;

  const experiments = PORTFOLIO_DATA.projects.filter(p => p.github && p.github.includes("github.com/ffdrko/"));

  container.innerHTML = experiments.map(exp => `
    <div class="poulo-card p-5 flex flex-col justify-between group">
      <div>
        <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span class="text-teal-400 flex items-center gap-1">
            <i data-lucide="code" class="w-3.5 h-3.5"></i> Experiment
          </span>
          <span>${exp.tags[0] || 'Python'}</span>
        </div>
        <h4 class="font-display font-bold text-base text-white mb-2 group-hover:text-teal-400 transition-colors">
          ${exp.title.split(":")[0]}
        </h4>
        <p class="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
          ${exp.summary}
        </p>
      </div>

      <div class="pt-3 border-t border-white/10 flex items-center justify-between">
        <a href="${exp.github}" target="_blank" rel="noopener noreferrer" class="text-xs font-mono text-teal-400 hover:underline flex items-center gap-1">
          <span>GitHub Code</span>
          <i data-lucide="arrow-up-right" class="w-3 h-3"></i>
        </a>
        <button class="text-xs text-slate-400 hover:text-white deep-dive-trigger" data-id="${exp.id}">
          Details
        </button>
      </div>
    </div>
  `).join("");

  container.querySelectorAll(".deep-dive-trigger").forEach(btn => {
    btn.addEventListener("click", () => openDeepDiveModal(btn.getAttribute("data-id")));
  });
}

// 6. Technical Stack Cards
function renderStack() {
  const container = document.getElementById("stackGrid");
  if (!container || !PORTFOLIO_DATA.skills) return;

  const categories = [
    { title: "Agentic AI & LLMs", sub: "Autonomous Workflows & MCP", list: PORTFOLIO_DATA.skills.agentic, icon: "bot" },
    { title: "Vision & ML", sub: "Deep Learning & Detection", list: PORTFOLIO_DATA.skills.ml_vision, icon: "eye" },
    { title: "Data & Pipelines", sub: "ETL & Hypothesis Testing", list: PORTFOLIO_DATA.skills.data_eng, icon: "database" },
    { title: "Product & Delivery", sub: "Scrum & Feasibility", list: PORTFOLIO_DATA.skills.product_leadership, icon: "target" }
  ];

  container.innerHTML = categories.map(cat => `
    <div class="poulo-card p-6 flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-9 h-9 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
            <i data-lucide="${cat.icon}" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="font-display font-bold text-white text-sm">${cat.title}</h3>
            <span class="text-[11px] font-mono text-slate-400">${cat.sub}</span>
          </div>
        </div>

        <ul class="space-y-2 text-xs text-slate-300">
          ${cat.list.map(s => `
            <li class="flex items-center justify-between py-1 border-b border-white/5">
              <span>${s.name}</span>
              <span class="font-mono text-[10px] text-teal-400">${s.level}</span>
            </li>
          `).join("")}
        </ul>
      </div>
    </div>
  `).join("");
}

// 7. About Section (Experience, Education & Leadership)
function renderAbout() {
  const expBox = document.getElementById("aboutExperience");
  const eduBox = document.getElementById("aboutEducation");
  const leadBox = document.getElementById("aboutLeadership");

  if (expBox && PORTFOLIO_DATA.experience) {
    expBox.innerHTML = PORTFOLIO_DATA.experience.map(e => `
      <div class="poulo-card p-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
          <span class="text-xs font-mono text-teal-400 uppercase font-semibold">${e.company}</span>
          <span class="text-xs font-mono text-slate-400">${e.period}</span>
        </div>
        <h3 class="font-display font-bold text-lg text-white mb-2">${e.role}</h3>
        <p class="text-xs text-slate-300 mb-4 leading-relaxed">${e.description}</p>
        <ul class="space-y-2 text-xs text-slate-400">
          ${e.bullets.map(b => `
            <li class="flex items-start gap-2">
              <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0"></i>
              <span>${b}</span>
            </li>
          `).join("")}
        </ul>
      </div>
    `).join("");
  }

  if (eduBox && PORTFOLIO_DATA.education) {
    eduBox.innerHTML = PORTFOLIO_DATA.education.map(ed => `
      <div class="poulo-card p-5">
        <div class="flex items-baseline justify-between gap-2 mb-1">
          <h4 class="font-display font-bold text-sm text-white">${ed.institution}</h4>
          <span class="text-xs font-mono text-teal-400">${ed.period}</span>
        </div>
        <p class="text-xs text-teal-300 mb-2">${ed.degree}</p>
        <div class="text-xs text-slate-400 space-y-1">
          ${ed.cgpa ? `<p><strong>CGPA:</strong> ${ed.cgpa}</p>` : ''}
          ${ed.thesis ? `<p><strong>Thesis:</strong> ${ed.thesis}</p>` : ''}
        </div>
      </div>
    `).join("");
  }

  if (leadBox && PORTFOLIO_DATA.leadership) {
    leadBox.innerHTML = PORTFOLIO_DATA.leadership.map(l => `
      <div class="poulo-card p-5">
        <div class="flex items-baseline justify-between gap-2 mb-1">
          <h4 class="font-display font-bold text-sm text-white">${l.role}</h4>
          <span class="text-xs font-mono text-teal-400">${l.period}</span>
        </div>
        <p class="text-xs text-teal-300 mb-1">${l.organization}</p>
        <p class="text-xs text-slate-400 leading-relaxed">${l.description}</p>
      </div>
    `).join("");
  }
}

// 8. "Ask me anything..." Interactive AI Assistant
function initAskAssistant() {
  const input = document.getElementById("askInput");
  const btn = document.getElementById("askSubmitBtn");
  const responseBox = document.getElementById("askResponse");
  const chips = document.querySelectorAll(".prompt-chip");

  const answers = {
    agent: "At TigerIT, Fahim works on AI-agent testing and evaluation, validating agent reasoning loops, tool invocation accuracy, and Model Context Protocol (MCP) connectors across 10+ enterprise services including GitHub, Notion, Linear, Slack, Sentry, and Google Workspace. He also built AI-Buddy, an autonomous RAG tutoring agent.",
    pipeline: "At IRIIC (UIU), Fahim designed and executed a 6-stage Python analytics pipeline processing 9 real-world nationwide telemedicine datasets from SuSastho. His longitudinal statistical significance testing across five periods proved a statistically significant reduction in 'Not Improved' patient outcomes.",
    yolo: "Fahim developed an ensemble multi-modal computer vision system using YOLO and dashcam video feeds to detect car collisions in real time with 90% accuracy. The project won 3rd Place at the NSU ACM Innovation Challenge.",
    skills: "Fahim specializes in Agentic AI (MCP, Tool calling, Agent harnesses, Prompting), Machine Learning & Vision (YOLO, CNNs, U-Net, PyTorch, Scikit-Learn), Data Engineering (Python, Pandas, SQL, 6-stage ETL), and AI Product Management (Scrum Master, Feasibility Analysis, RFCs).",
    publication: "Fahim co-authored 'A Benchmark and Optimization Framework for ML and LLM-Based Health Triage', published at the IEEE International Conference on Data Mining Workshops (ICDMW 2025). He has also researched COVID-19 comorbidity severity and completed his MSc thesis on SuSastho telemedicine data.",
    contact: "You can reach Fahim at faisal.deepto@gmail.com, call +880 1534403341, or connect via LinkedIn (linkedin.com/in/fahim-faisal-deepto-b3452b186). He responds within 24 hours!"
  };

  function processQuery(query) {
    if (!query || !query.trim()) return;
    const q = query.toLowerCase();
    let reply = "";

    if (q.includes("agent") || q.includes("mcp") || q.includes("tigerit") || q.includes("llm")) {
      reply = answers.agent;
    } else if (q.includes("pipeline") || q.includes("susastho") || q.includes("health") || q.includes("iriic") || q.includes("data")) {
      reply = answers.pipeline;
    } else if (q.includes("yolo") || q.includes("crash") || q.includes("car") || q.includes("vision")) {
      reply = answers.yolo;
    } else if (q.includes("skill") || q.includes("stack") || q.includes("python") || q.includes("experience")) {
      reply = answers.skills;
    } else if (q.includes("paper") || q.includes("ieee") || q.includes("publication") || q.includes("research") || q.includes("scholar")) {
      reply = answers.publication;
    } else if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("phone")) {
      reply = answers.contact;
    } else {
      reply = `Regarding "${query}": Fahim Faisal Deepto is an AI Engineer with an MSc in Intelligent Computing. He has hands-on experience in production AI agents, MCP connector harnesses at TigerIT, 6-stage healthcare analytics at IRIIC UIU, and computer vision models. Feel free to explore his projects above or email him at faisal.deepto@gmail.com.`;
    }

    responseBox.innerHTML = `
      <div>
        <p class="font-bold text-teal-400 mb-1 flex items-center gap-1.5 font-mono text-xs">
          <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Fahim's AI Assistant:
        </p>
        <p class="text-slate-200 leading-relaxed">${reply}</p>
      </div>
    `;
    refreshIcons();
  }

  if (btn && input) {
    btn.addEventListener("click", () => {
      processQuery(input.value);
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") processQuery(input.value);
    });
  }

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const p = chip.getAttribute("data-prompt");
      input.value = p;
      processQuery(p);
    });
  });
}

// 9. Signature "Agent View" Markdown Drawer
function initAgentView() {
  const openBtn = document.getElementById("openAgentViewBtn");
  const closeBtn = document.getElementById("closeAgentViewBtn");
  const backdrop = document.getElementById("agentDrawerBackdrop");
  const copyBtn = document.getElementById("copyMarkdownBtn");
  const pre = document.getElementById("agentMarkdownContent");

  const markdownContent = `# Fahim Faisal Deepto
AI Engineer | Applied AI & Agentic AI | AI Product Manager
Location: Dhaka, Bangladesh
Email: faisal.deepto@gmail.com | Phone: +880 1534403341
GitHub: https://github.com/ffdrko
LinkedIn: https://linkedin.com/in/fahim-faisal-deepto-b3452b186
Google Scholar: https://scholar.google.com/citations?hl=en&user=tszCzBsAAAAJ

---

## Professional Summary
AI Engineer with a Computer Science background and an MSc in Intelligent Computing.
Specializes in AI-agent systems, Model Context Protocol (MCP) integrations, document intelligence,
and production LLM evaluation at TigerIT. Experienced in 6-stage longitudinal healthcare analytics pipelines
at IRIIC UIU, computer vision (YOLO car crash detection with 90% accuracy), and agile product leadership.

---

## Core Competencies
- Agentic AI & LLMs: AI Agents, MCP Tools & Connectors, Agent Evaluation Harnesses, RAG, Prompt Engineering.
- Machine Learning & Vision: YOLO, CNNs, U-Net, Ensemble Methods, Model Evaluation, PyTorch, Scikit-Learn.
- Data Engineering & Pipelines: Python, SQL, Pandas, NumPy, Statistical Hypothesis Testing, 6-Stage ETL.
- AI Product Management: Feasibility Analysis, Agile/Scrum (Scrum Master), Requirements Discovery.

---

## Work Experience

### TigerIT Bangladesh Ltd. (Nov 2025 – Present)
Role: Innovation Engineer - AI Product & Agent Engineering
- Prototype and evaluate AI-driven product concepts translating emerging LLMs into feasible opportunities.
- Test and evaluate AI agents across 10+ MCP connectors: GitHub, Notion, Linear, Slack, Sentry, Google Workspace.
- Design document-intelligence test suites across standard docs, image-heavy docs, and scanned inputs.
- Benchmark agent harnesses to isolate hallucination edge-cases, failure modes, and recovery paths.

### IRIIC, UIU (Jun 2025 – Oct 2025)
Role: Research Engineer - Applied AI/ML
- Built a 6-stage Python analytics pipeline processing 9 real-world telemedicine datasets from SuSastho.
- Proved statistically significant reduction in "Not Improved" patient outcomes across 5 observation periods.
- Published research on ML & LLM health triage benchmarking in IEEE ICDMW 2025.

### Inneed Cloud (Oct 2022 – Mar 2023)
Role: IT Business Analyst & Scrum Master
- Proposed ML solution concept to a2i for maternal health challenges.
- Architected automated speech-to-text candidate-screening pipeline for Augmedix.
- Served as Scrum Master across sprint ceremonies.

---

## Notable Projects & Repositories
1. AI-Buddy: Autonomous Personalized Study & Tutoring System (RAG, Embeddings, PDF Parsing)
   - URL: https://github.com/ffdrko/AI-buddy
2. YOLO Real-Time Car Crash Detection: Multi-Modal Ensemble Vision (90% Accuracy, NSU ACM 3rd Place)
   - URL: https://github.com/ffdrko/Yolo-you-only-live-once
3. SuSastho Telemedicine Pipeline: 6-Stage Longitudinal Healthcare Analytics
4. Kemne Jabo!: Transit Route Optimization & Query Platform (Awarded Mujib 100 Ideas)
   - URL: https://github.com/ffdrko/Kemne-jabo
5. Pneumonia Detection with CNNs: Chest Radiographic Deep Learning Classification
   - URL: https://github.com/ffdrko/pneumonia_detection_with_CNN

---

## Education & Research
- MSc in Computer Science & Engineering (Intelligent Computing) - United International University (CGPA 3.22)
  Thesis: Longitudinal Analysis of Patient Health Outcomes Using SuSastho Pharmacy Data (Supervisor: Prof. Khondaker Abdullah Al Mamun, PhD)
- BSc in Computer Science & Engineering - North South University
  General Secretary - NSU Computer & Engineering Club (2022-2023)
- Publication: "A Benchmark and Optimization Framework for ML and LLM-Based Health Triage" — IEEE ICDMW 2025
`;

  if (pre) pre.textContent = markdownContent;

  if (openBtn && backdrop) {
    openBtn.addEventListener("click", () => backdrop.classList.add("open"));
  }
  if (closeBtn && backdrop) {
    closeBtn.addEventListener("click", () => backdrop.classList.remove("open"));
  }
  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) backdrop.classList.remove("open");
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(markdownContent).then(() => {
        showToast("Markdown copied to clipboard!");
      });
    });
  }
}

// 10. Deep Dive Modal & Toast
function openDeepDiveModal(projectId) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById("deepDiveModal");
  const body = document.getElementById("modalBody");

  body.innerHTML = `
    <div class="mb-5">
      <span class="tag-badge text-teal-400 mb-2 font-mono">${project.badge}</span>
      <h3 class="font-display font-bold text-2xl text-white mt-2">${project.title}</h3>
      <p class="text-xs text-slate-300 mt-1">${project.summary}</p>
    </div>

    <div class="space-y-4 text-xs sm:text-sm">
      <div class="p-4 rounded-xl bg-slate-900/90 border border-white/10">
        <h4 class="font-bold text-teal-400 mb-1 flex items-center gap-1.5 font-mono text-xs">
          <i data-lucide="alert-circle" class="w-4 h-4"></i> Problem Statement
        </h4>
        <p class="text-slate-300 leading-relaxed">${project.deepDive.problem}</p>
      </div>

      <div class="p-4 rounded-xl bg-slate-900/90 border border-white/10">
        <h4 class="font-bold text-cyan-400 mb-1 flex items-center gap-1.5 font-mono text-xs">
          <i data-lucide="check-circle-2" class="w-4 h-4"></i> Engineered Solution
        </h4>
        <p class="text-slate-300 leading-relaxed">${project.deepDive.solution}</p>
      </div>

      <div class="p-4 rounded-xl bg-slate-900/90 border border-white/10">
        <h4 class="font-bold text-indigo-400 mb-2 flex items-center gap-1.5 font-mono text-xs">
          <i data-lucide="git-merge" class="w-4 h-4"></i> System Architecture Flow
        </h4>
        <div class="p-3 rounded-lg bg-black/60 font-mono text-xs text-teal-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
${project.deepDive.architecture}
        </div>
      </div>
    </div>

    <div class="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
      ${project.github ? `
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn-solid text-xs py-2 px-4">
          <i data-lucide="github" class="w-4 h-4"></i>
          <span>Inspect Repository</span>
        </a>
      ` : ''}
      ${project.scholarUrl ? `
        <a href="${project.scholarUrl}" target="_blank" rel="noopener noreferrer" class="btn-ghost text-xs py-2 px-4 text-cyan-400">
          <i data-lucide="graduation-cap" class="w-4 h-4"></i>
          <span>Google Scholar</span>
        </a>
      ` : ''}
    </div>
  `;

  modal.classList.add("open");
  refreshIcons();
}

function initModalsAndToasts() {
  const modal = document.getElementById("deepDiveModal");
  const closeBtn = document.getElementById("modalCloseBtn");
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
  }

  const quickCopy = document.getElementById("quickCopyEmail");
  if (quickCopy) {
    quickCopy.addEventListener("click", () => {
      navigator.clipboard.writeText("faisal.deepto@gmail.com").then(() => {
        showToast("Email copied to clipboard!");
      });
    });
  }
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
