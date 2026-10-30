// Fahim Faisal Deepto - Portfolio Application Logic

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderMetrics();
  renderFilters();
  renderProjects("all");
  renderSkills();
  renderExperience();
  renderPublications();
  renderEducation();
  renderLeadership();
  setupEventListeners();
  refreshIcons();
});

// Refresh Lucide Icons safely
function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 1. Theme Management (Obsidian Dark default)
function initTheme() {
  const savedTheme = localStorage.getItem("portfolio_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  const toggleBtn = document.getElementById("themeToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("portfolio_theme", next);
      updateThemeIcon(next);
      refreshIcons();
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("themeIcon");
  if (!icon) return;
  if (theme === "light") {
    icon.setAttribute("data-lucide", "sun");
  } else {
    icon.setAttribute("data-lucide", "moon");
  }
}

// 2. Render Metrics Ribbon
function renderMetrics() {
  const container = document.getElementById("metricsContainer");
  if (!container || !PORTFOLIO_DATA.metrics) return;

  container.innerHTML = PORTFOLIO_DATA.metrics.map(m => `
    <div class="glass-panel p-5 rounded-2xl flex flex-col justify-between">
      <div class="flex items-baseline justify-between mb-2">
        <span class="font-display font-extrabold text-3xl sm:text-4xl text-gradient-cyan tracking-tight">${m.value}</span>
        <span class="w-2 h-2 rounded-full bg-teal-400"></span>
      </div>
      <div>
        <h4 class="font-display font-bold text-sm text-white mb-1">${m.label}</h4>
        <p class="text-xs text-slate-400 leading-relaxed">${m.detail}</p>
      </div>
    </div>
  `).join("");
}

// 3. Render Project Filters
let activeCategory = "all";

function renderFilters() {
  const container = document.getElementById("filterTabs");
  if (!container || !PORTFOLIO_DATA.categories) return;

  container.innerHTML = PORTFOLIO_DATA.categories.map(cat => `
    <button class="filter-btn ${cat.id === activeCategory ? 'active' : ''}" data-category="${cat.id}">
      ${cat.label}
    </button>
  `).join("");

  container.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.getAttribute("data-category");
      renderProjects(activeCategory);
      refreshIcons();
    });
  });
}

// 4. Render Filtered Projects
function renderProjects(categoryId) {
  const grid = document.getElementById("projectsGrid");
  if (!grid || !PORTFOLIO_DATA.projects) return;

  const filtered = categoryId === "all" 
    ? PORTFOLIO_DATA.projects 
    : PORTFOLIO_DATA.projects.filter(p => p.category === categoryId);

  grid.innerHTML = filtered.map(p => `
    <div class="glass-panel p-6 rounded-2xl flex flex-col justify-between group">
      <div>
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="tag-badge text-teal-300 border-teal-500/30 bg-teal-500/10 font-semibold">
            ${p.badge}
          </span>
          ${p.featured ? `
            <span class="text-[11px] font-mono text-amber-400 flex items-center gap-1">
              <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i> Featured
            </span>
          ` : ''}
        </div>

        <h3 class="font-display font-bold text-lg text-white mb-2 group-hover:text-teal-400 transition-colors">
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
        <!-- Tags -->
        <div class="flex flex-wrap gap-1.5 mb-5">
          ${p.tags.map(t => `<span class="tag-badge text-[11px]">${t}</span>`).join("")}
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2 pt-3 border-t border-slate-800/80">
          <button class="btn-primary flex-1 text-xs py-2 px-3 deep-dive-btn" data-project-id="${p.id}">
            <i data-lucide="info" class="w-3.5 h-3.5"></i>
            <span>Architecture Deep Dive</span>
          </button>
          ${p.github ? `
            <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn-secondary text-xs p-2" title="View Source on GitHub">
              <i data-lucide="github" class="w-4 h-4"></i>
            </a>
          ` : ''}
          ${p.scholarUrl ? `
            <a href="${p.scholarUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary text-xs p-2 text-cyan-400" title="View Publication on Google Scholar">
              <i data-lucide="graduation-cap" class="w-4 h-4"></i>
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `).join("");

  // Attach Deep Dive Modal listeners
  grid.querySelectorAll(".deep-dive-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pid = btn.getAttribute("data-project-id");
      openProjectModal(pid);
    });
  });
}

// 5. Project Deep Dive Modal
function openProjectModal(projectId) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById("projectModal");
  const body = document.getElementById("modalBody");

  body.innerHTML = `
    <div class="mb-4">
      <span class="tag-badge text-teal-300 border-teal-500/30 bg-teal-500/10 mb-2 font-mono">
        ${project.badge}
      </span>
      <h3 class="font-display font-bold text-2xl text-white mt-2">${project.title}</h3>
      <p class="text-xs text-slate-400 mt-1">${project.summary}</p>
    </div>

    <div class="space-y-4 text-xs sm:text-sm text-slate-300">
      <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
        <h4 class="font-bold text-teal-400 mb-1 flex items-center gap-2">
          <i data-lucide="alert-circle" class="w-4 h-4"></i> Problem Statement
        </h4>
        <p class="text-slate-300 leading-relaxed">${project.deepDive.problem}</p>
      </div>

      <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
        <h4 class="font-bold text-cyan-400 mb-1 flex items-center gap-2">
          <i data-lucide="check-circle-2" class="w-4 h-4"></i> Engineered Solution
        </h4>
        <p class="text-slate-300 leading-relaxed">${project.deepDive.solution}</p>
      </div>

      <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
        <h4 class="font-bold text-indigo-400 mb-2 flex items-center gap-2 font-mono">
          <i data-lucide="git-merge" class="w-4 h-4"></i> System Architecture Flow
        </h4>
        <div class="p-3 rounded-lg bg-black/50 border border-slate-800/80 font-mono text-xs text-teal-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
${project.deepDive.architecture}
        </div>
      </div>

      <div>
        <h4 class="font-bold text-slate-200 mb-2">Technical Implementation Stack</h4>
        <div class="flex flex-wrap gap-1.5">
          ${project.tags.map(t => `<span class="tag-badge text-xs">${t}</span>`).join("")}
        </div>
      </div>
    </div>

    <div class="flex items-center gap-3 mt-6 pt-4 border-t border-slate-800/80">
      ${project.github ? `
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn-primary text-xs py-2 px-4">
          <i data-lucide="github" class="w-4 h-4"></i>
          <span>Inspect Repository</span>
        </a>
      ` : ''}
      ${project.scholarUrl ? `
        <a href="${project.scholarUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary text-xs py-2 px-4 text-cyan-400">
          <i data-lucide="graduation-cap" class="w-4 h-4"></i>
          <span>View on Google Scholar</span>
        </a>
      ` : ''}
    </div>
  `;

  modal.classList.add("open");
  refreshIcons();
}

// 6. Render Skills Matrix
function renderSkills() {
  const renderList = (skills) => skills.map(s => `
    <li class="flex items-center justify-between py-1 border-b border-slate-800/40">
      <span class="flex items-center gap-2">
        <i data-lucide="${s.icon || 'check'}" class="w-3.5 h-3.5 text-teal-400"></i>
        <span>${s.name}</span>
      </span>
      <span class="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/50">
        ${s.level}
      </span>
    </li>
  `).join("");

  const sa = document.getElementById("skillsAgentic");
  const sm = document.getElementById("skillsML");
  const sd = document.getElementById("skillsData");
  const sp = document.getElementById("skillsProduct");

  if (sa) sa.innerHTML = renderList(PORTFOLIO_DATA.skills.agentic);
  if (sm) sm.innerHTML = renderList(PORTFOLIO_DATA.skills.ml_vision);
  if (sd) sd.innerHTML = renderList(PORTFOLIO_DATA.skills.data_eng);
  if (sp) sp.innerHTML = renderList(PORTFOLIO_DATA.skills.product_leadership);
}

// 7. Render Professional Experience
function renderExperience() {
  const container = document.getElementById("experienceList");
  if (!container || !PORTFOLIO_DATA.experience) return;

  container.innerHTML = PORTFOLIO_DATA.experience.map(exp => `
    <div class="glass-panel p-6 sm:p-8 rounded-2xl relative">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span class="text-xs font-mono text-teal-400 font-semibold tracking-wider uppercase">${exp.company}</span>
          <h3 class="font-display font-bold text-xl text-white mt-0.5">${exp.role}</h3>
        </div>
        <div class="flex items-center gap-2">
          <span class="tag-badge text-[11px] text-teal-300 border-teal-500/30 bg-teal-500/10 font-mono">${exp.type}</span>
          <span class="text-xs text-slate-400 font-mono">${exp.period}</span>
        </div>
      </div>

      <p class="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed font-normal">
        ${exp.description}
      </p>

      <ul class="space-y-2 text-xs sm:text-sm text-slate-400">
        ${exp.bullets.map(b => `
          <li class="flex items-start gap-2.5">
            <i data-lucide="chevron-right" class="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0"></i>
            <span>${b}</span>
          </li>
        `).join("")}
      </ul>
    </div>
  `).join("");
}

// 8. Render Publications
function renderPublications() {
  const container = document.getElementById("publicationsList");
  if (!container || !PORTFOLIO_DATA.publications) return;

  container.innerHTML = PORTFOLIO_DATA.publications.map(pub => `
    <div class="glass-panel p-6 rounded-2xl flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="tag-badge text-cyan-300 border-cyan-500/30 bg-cyan-500/10 font-mono">
            ${pub.venue}
          </span>
          <span class="text-xs font-mono text-teal-400">${pub.year}</span>
        </div>

        <h3 class="font-display font-bold text-base sm:text-lg text-white mb-2 leading-snug">
          ${pub.title}
        </h3>

        <p class="text-xs text-slate-300 leading-relaxed mb-4">
          ${pub.description}
        </p>
      </div>

      <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span class="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
          <i data-lucide="badge-check" class="w-4 h-4"></i> ${pub.status}
        </span>
        <a href="${pub.link}" target="_blank" rel="noopener noreferrer" class="text-xs font-medium text-teal-400 hover:text-teal-300 flex items-center gap-1">
          <span>Read Paper / Citation</span>
          <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    </div>
  `).join("");
}

// 9. Render Education & Leadership
function renderEducation() {
  const container = document.getElementById("educationList");
  if (!container || !PORTFOLIO_DATA.education) return;

  container.innerHTML = PORTFOLIO_DATA.education.map(edu => `
    <div class="glass-panel p-6 rounded-xl">
      <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
        <h3 class="font-display font-bold text-base text-white">${edu.institution}</h3>
        <span class="text-xs font-mono text-teal-400">${edu.period}</span>
      </div>
      <p class="text-xs font-medium text-teal-300 mb-2">${edu.degree}</p>
      <div class="text-xs text-slate-400 space-y-1">
        ${edu.cgpa ? `<p><strong class="text-slate-300">CGPA:</strong> ${edu.cgpa}</p>` : ''}
        ${edu.thesis ? `<p><strong class="text-slate-300">Thesis:</strong> ${edu.thesis}</p>` : ''}
        ${edu.supervisor ? `<p><strong class="text-slate-300">Supervisor:</strong> ${edu.supervisor}</p>` : ''}
        ${edu.highlights ? `<p class="mt-2 text-slate-400 leading-relaxed">${edu.highlights}</p>` : ''}
      </div>
    </div>
  `).join("");
}

function renderLeadership() {
  const container = document.getElementById("leadershipList");
  if (!container || !PORTFOLIO_DATA.leadership) return;

  container.innerHTML = PORTFOLIO_DATA.leadership.map(lead => `
    <div class="glass-panel p-5 rounded-xl">
      <div class="flex items-baseline justify-between gap-2 mb-1">
        <h4 class="font-display font-bold text-sm text-white">${lead.role}</h4>
        <span class="text-[11px] font-mono text-teal-400">${lead.period}</span>
      </div>
      <p class="text-xs text-teal-300 mb-2">${lead.organization}</p>
      <p class="text-xs text-slate-400 leading-relaxed">${lead.description}</p>
    </div>
  `).join("");
}

// 10. Setup Event Listeners
function setupEventListeners() {
  // Copy Email button
  const copyBtn = document.getElementById("copyEmailBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("faisal.deepto@gmail.com").then(() => {
        showToast("Email address copied to clipboard!");
      }).catch(() => {
        showToast("faisal.deepto@gmail.com");
      });
    });
  }

  // Modal Close
  const closeBtn = document.getElementById("modalCloseBtn");
  const modal = document.getElementById("projectModal");
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) {
        modal.classList.remove("open");
      }
    });
  }

  // Mobile menu toggle
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
    mobileMenu.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
    });
  }
}

// Toast helper
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
