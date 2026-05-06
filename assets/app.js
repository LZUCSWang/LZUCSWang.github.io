const translations = {
  en: {
    documentTitle: "Xianyi Wang",
    eyebrow: "Personal Website",
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
    interestsTitle: "Interests",
    interestsText:
      "Software engineering, intelligent systems, machine learning, and tools that make research and development smoother.",
    skillsTitle: "Skills",
    skillsText:
      "Python, Java, web development, Linux, Git, and building clean project workflows.",
    privacyTitle: "Privacy",
    privacyText:
      "This page keeps only public academic and professional basics: no avatar, phone number, address, or private identifiers.",
    languagesTitle: "Languages",
    languagesText:
      "Chinese and English for study, reading, technical communication, and collaboration.",
    statusTitle: "Current Status",
    statusText:
      "Graduate student focused on building a steady technical foundation and turning ideas into useful projects.",
    linksTitle: "Quick Links",
    searchTitle: "Search",
    searchLabel: "Search public profile sections",
    searchPlaceholder: "Try skills, research, privacy",
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
    eyebrow: "个人主页",
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
    interestsTitle: "兴趣方向",
    interestsText: "软件工程、智能系统、机器学习，以及让科研和开发更顺畅的工具。",
    skillsTitle: "技能方向",
    skillsText: "Python、Java、Web 开发、Linux、Git，以及清晰可靠的项目工作流。",
    privacyTitle: "隐私边界",
    privacyText: "此页面只保留公开的学业与专业基础信息，不展示头像、电话、住址或私人身份信息。",
    languagesTitle: "语言",
    languagesText: "中文和英文，用于学习、阅读、技术交流与协作。",
    statusTitle: "当前状态",
    statusText: "硕士研究生，持续夯实技术基础，并把想法转化成有用的项目。",
    linksTitle: "快捷链接",
    searchTitle: "搜索",
    searchLabel: "搜索公开主页内容",
    searchPlaceholder: "试试 技能、研究、隐私",
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
    id: "privacy",
    titleKey: "privacyTitle",
    textKey: "privacyText",
    keywords: "privacy no avatar phone address 隐私 头像 电话 地址",
  },
  {
    id: "languages",
    titleKey: "languagesTitle",
    textKey: "languagesText",
    keywords: "languages chinese english 语言 中文 英文",
  },
  {
    id: "status",
    titleKey: "statusTitle",
    textKey: "statusText",
    keywords: "status graduate student lzu 当前 状态 硕士 兰州大学",
  },
  {
    id: "links",
    titleKey: "linksTitle",
    textKey: "linksTitle",
    keywords: "links github skills privacy contact 链接 技能 隐私",
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
