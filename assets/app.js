const translations = {
  en: {
    documentTitle: "Xianyi Wang",
    eyebrow: "Resume Website",
    summary:
      "Master's student in Computer Science and Technology at Lanzhou University, interested in software engineering, intelligent systems, and practical developer tools.",
    snapshot: "Snapshot",
    education: "Education",
    educationValue: "Master's Student",
    university: "University",
    universityValue: "Lanzhou University",
    major: "Major",
    majorValue: "Computer Science and Technology",
    exploreAction: "Explore",
    educationSectionTitle: "Education",
    educationSectionMeta: "Lanzhou University · Master's Student",
    educationSectionText:
      "Major in Computer Science and Technology, with interests in software engineering, intelligent systems, and developer tools.",
    interestsTitle: "Research Interests",
    interestsText:
      "Software engineering, intelligent systems, machine learning, and tools that make research and development smoother.",
    skillsTitle: "Skills",
    skillsText:
      "Building clean project workflows and practical tools for study, research, and development.",
    projectsTitle: "Projects",
    projectOneMeta: "Personal Website · GitHub Pages",
    projectOneTitle: "Resume-style personal homepage",
    projectOneText:
      "Built a lightweight bilingual personal site with dark mode, search, settings, responsive layout, and selected public resume content.",
    publicationsTitle: "Publications",
    publicationStatus: "To be updated",
    publicationPlaceholderTitle: "Publication list",
    publicationPlaceholderText:
      "Add paper titles, venues, years, author order, and links here when you want to publish them on the site.",
    linksTitle: "Quick Links",
    searchTitle: "Search",
    searchLabel: "Search public profile sections",
    searchPlaceholder: "Try projects, papers, skills",
    settingsTitle: "Settings",
    languageSetting: "Language",
    themeSetting: "Theme",
    languageName: "English",
    themeLight: "Light",
    themeDark: "Dark",
    noResults: "No matching public section found.",
  },
  zh: {
    documentTitle: "王贤义 | Xianyi Wang",
    eyebrow: "简历主页",
    summary:
      "兰州大学计算机科学与技术专业硕士研究生，关注软件工程、智能系统以及实用开发工具。",
    snapshot: "基本信息",
    education: "学历",
    educationValue: "硕士研究生",
    university: "学校",
    universityValue: "兰州大学",
    major: "专业",
    majorValue: "计算机科学与技术",
    exploreAction: "浏览",
    educationSectionTitle: "教育背景",
    educationSectionMeta: "兰州大学 · 硕士研究生",
    educationSectionText: "计算机科学与技术专业，关注软件工程、智能系统和开发工具。",
    interestsTitle: "研究兴趣",
    interestsText: "软件工程、智能系统、机器学习，以及让科研和开发更顺畅的工具。",
    skillsTitle: "技能方向",
    skillsText: "构建清晰的项目工作流，以及面向学习、科研和开发的实用工具。",
    projectsTitle: "项目经历",
    projectOneMeta: "个人主页 · GitHub Pages",
    projectOneTitle: "简历式个人主页",
    projectOneText:
      "构建轻量级双语个人网站，包含夜间模式、搜索、设置、响应式布局和筛选后的公开简历内容。",
    publicationsTitle: "论文发表",
    publicationStatus: "待补充",
    publicationPlaceholderTitle: "论文列表",
    publicationPlaceholderText:
      "之后可以在这里补充论文题目、发表会议/期刊、年份、作者顺序和链接。",
    linksTitle: "快捷链接",
    searchTitle: "搜索",
    searchLabel: "搜索公开主页内容",
    searchPlaceholder: "试试 项目、论文、技能",
    settingsTitle: "设置",
    languageSetting: "语言",
    themeSetting: "主题",
    languageName: "中文",
    themeLight: "浅色",
    themeDark: "深色",
    noResults: "没有找到匹配的公开内容。",
  },
};

const searchItems = [
  {
    id: "education",
    titleKey: "educationSectionTitle",
    textKey: "educationSectionText",
    keywords: "education lanzhou university master computer science 教育 兰州大学 硕士 计算机",
  },
  {
    id: "interests",
    titleKey: "interestsTitle",
    textKey: "interestsText",
    keywords: "research interests ai software engineering tools 研究 兴趣 软件工程 智能系统 工具",
  },
  {
    id: "skills",
    titleKey: "skillsTitle",
    textKey: "skillsText",
    keywords: "skills python java web linux git 技能",
  },
  {
    id: "projects",
    titleKey: "projectsTitle",
    textKey: "projectOneText",
    keywords: "projects github pages personal website bilingual dark mode search 项目 个人主页 双语 夜间模式 搜索",
  },
  {
    id: "publications",
    titleKey: "publicationsTitle",
    textKey: "publicationPlaceholderText",
    keywords: "publications papers research publication 论文 发表 科研",
  },
  {
    id: "links",
    titleKey: "linksTitle",
    textKey: "linksTitle",
    keywords: "links github projects publications skills 链接 项目 论文 技能",
  },
];

const state = {
  lang: localStorage.getItem("lang") || "en",
  theme: localStorage.getItem("theme") || "light",
};

const getText = (key) => translations[state.lang][key] || translations.en[key] || key;

function applyLanguage() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.title = getText("documentTitle");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = getText(element.dataset.i18n);
  });

  const searchInput = document.querySelector("[data-search-input]");
  if (searchInput) {
    searchInput.placeholder = getText("searchPlaceholder");
  }

  const langLabel = document.querySelector("[data-lang-label]");
  if (langLabel) {
    langLabel.textContent = state.lang === "en" ? "中" : "EN";
  }

  updateSettingsLabels();
  renderSearchResults(searchInput?.value || "");
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;

  const themeIcon = document.querySelector("[data-theme-icon]");
  if (themeIcon) {
    themeIcon.textContent = state.theme === "dark" ? "☼" : "◐";
  }

  updateSettingsLabels();
}

function updateSettingsLabels() {
  const languageValue = document.querySelector("[data-setting-language]");
  const themeValue = document.querySelector("[data-setting-theme]");

  if (languageValue) {
    languageValue.textContent = getText("languageName");
  }

  if (themeValue) {
    themeValue.textContent =
      state.theme === "dark" ? getText("themeDark") : getText("themeLight");
  }
}

function toggleLanguage() {
  state.lang = state.lang === "en" ? "zh" : "en";
  localStorage.setItem("lang", state.lang);
  applyLanguage();
}

function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", state.theme);
  applyTheme();
}

function openDialog(name) {
  const dialog = document.querySelector(`[data-dialog="${name}"]`);
  if (!dialog) return;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }

  if (name === "search") {
    const input = dialog.querySelector("[data-search-input]");
    input?.focus();
    renderSearchResults(input?.value || "");
  }
}

function renderSearchResults(query) {
  const results = document.querySelector("[data-search-results]");
  if (!results) return;

  const normalizedQuery = query.trim().toLowerCase();
  const matches = searchItems.filter((item) => {
    if (!normalizedQuery) return true;
    const haystack = [
      getText(item.titleKey),
      getText(item.textKey),
      item.keywords,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  results.innerHTML = "";

  if (!matches.length) {
    const empty = document.createElement("p");
    empty.className = "empty-result";
    empty.textContent = getText("noResults");
    results.append(empty);
    return;
  }

  matches.forEach((item) => {
    const link = document.createElement("a");
    link.className = "result-link";
    link.href = `#${item.id}`;
    link.innerHTML = `<strong>${getText(item.titleKey)}</strong><span>${getText(
      item.textKey,
    )}</span>`;
    link.addEventListener("click", () => {
      const dialog = document.querySelector('[data-dialog="search"]');
      if (dialog?.open) dialog.close();
    });
    results.append(link);
  });
}

function handleAction(action) {
  if (action === "language") toggleLanguage();
  if (action === "theme") toggleTheme();
  if (action === "search") openDialog("search");
  if (action === "settings") openDialog("settings");
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-action]");
  if (trigger) {
    handleAction(trigger.dataset.action);
  }
});

document.querySelector("[data-search-input]")?.addEventListener("input", (event) => {
  renderSearchResults(event.target.value);
});

document.querySelectorAll(".panel-dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});

applyTheme();
applyLanguage();
