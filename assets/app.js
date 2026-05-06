const data = window.PROFILE_DATA;

if (!data) {
  throw new Error("PROFILE_DATA is missing. Check assets/profile-data.js.");
}

const state = {
  lang: localStorage.getItem("lang") || data.defaultLanguage || "en",
  theme: localStorage.getItem("theme") || "light",
};

function localized(value) {
  if (typeof value === "string") return value;
  if (!value) return "";
  return value[state.lang] || value.en || Object.values(value)[0] || "";
}

function uiText(key) {
  return data.ui[state.lang]?.[key] || data.ui.en?.[key] || key;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function renderProfileBasics() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.title = uiText("documentTitle");

  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = data.profile.metaDescription;

  document.querySelectorAll("[data-profile-name]").forEach((element) => {
    element.textContent = data.profile.name;
  });
  document.querySelectorAll("[data-profile-cn]").forEach((element) => {
    element.textContent = data.profile.chineseName;
  });
  document.querySelectorAll("[data-profile-initials]").forEach((element) => {
    element.textContent = data.profile.initials;
  });

  document.querySelectorAll("[data-ui]").forEach((element) => {
    element.textContent = uiText(element.dataset.ui);
  });

  const searchInput = document.querySelector("[data-search-input]");
  if (searchInput) searchInput.placeholder = uiText("searchPlaceholder");

  const langLabel = document.querySelector("[data-lang-label]");
  if (langLabel) langLabel.textContent = state.lang === "en" ? "中" : "EN";
}

function renderHeroLinks() {
  const container = document.querySelector("[data-hero-links]");
  if (!container) return;

  container.innerHTML = "";

  data.heroLinks.forEach((link) => {
    const anchor = createElement(
      "a",
      link.variant === "primary" ? "primary-link" : "secondary-link",
    );
    anchor.href = link.href;

    if (link.icon) {
      const icon = createElement("span", "", link.icon);
      icon.setAttribute("aria-hidden", "true");
      anchor.append(icon);
    }

    anchor.append(document.createTextNode(localized(link.label)));
    container.append(anchor);
  });
}

function renderSnapshot() {
  const list = document.querySelector("[data-snapshot]");
  if (!list) return;

  list.innerHTML = "";

  data.snapshot.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.append(createElement("dt", "", localized(item.label)));
    wrapper.append(createElement("dd", "", localized(item.value)));
    list.append(wrapper);
  });
}

function renderTags(tags) {
  const list = createElement("ul", "tag-list");
  tags.forEach((tag) => list.append(createElement("li", "", tag)));
  return list;
}

function renderLinks(links, className) {
  const container = createElement("div", className);

  links.forEach((link) => {
    const anchor = createElement("a", "", localized(link.label));
    anchor.href = link.href;
    container.append(anchor);
  });

  return container;
}

function renderItem(item) {
  const block = createElement("div", "timeline-item");

  if (item.meta) block.append(createElement("p", "resume-meta", localized(item.meta)));
  if (item.title) block.append(createElement("h3", "", localized(item.title)));
  if (item.authors) block.append(createElement("p", "paper-authors", localized(item.authors)));
  if (item.tags) block.append(renderTags(item.tags));
  if (item.text) block.append(createElement("p", "", localized(item.text)));
  if (item.links) block.append(renderLinks(item.links, "paper-links"));

  return block;
}

function renderSections() {
  const grid = document.querySelector("[data-sections]");
  if (!grid) return;

  grid.innerHTML = "";

  data.sections.forEach((section) => {
    const article = createElement(
      "article",
      `resume-section searchable${section.wide ? " wide" : ""}`,
    );
    article.id = section.id;
    article.dataset.keywords = section.keywords || "";

    const icon = createElement("span", "card-icon", section.icon);
    icon.setAttribute("aria-hidden", "true");
    article.append(icon);

    const content = document.createElement("div");
    content.append(createElement("h2", "", localized(section.title)));

    section.items?.forEach((item) => content.append(renderItem(item)));

    if (section.links) {
      content.append(renderLinks(section.links, "mini-links"));
    }

    article.append(content);
    grid.append(article);
  });
}

function searchBody(section) {
  const parts = [localized(section.title), section.keywords || ""];

  section.items?.forEach((item) => {
    parts.push(localized(item.meta), localized(item.title), localized(item.text), localized(item.authors));
    item.tags?.forEach((tag) => parts.push(tag));
    item.links?.forEach((link) => parts.push(localized(link.label), link.href));
  });

  section.links?.forEach((link) => parts.push(localized(link.label), link.href));
  return parts.filter(Boolean).join(" ");
}

function renderSearchResults(query = "") {
  const results = document.querySelector("[data-search-results]");
  if (!results) return;

  const normalizedQuery = query.trim().toLowerCase();
  const matches = data.sections.filter((section) => {
    if (!normalizedQuery) return true;
    return searchBody(section).toLowerCase().includes(normalizedQuery);
  });

  results.innerHTML = "";

  if (!matches.length) {
    results.append(createElement("p", "empty-result", uiText("noResults")));
    return;
  }

  matches.forEach((section) => {
    const link = createElement("a", "result-link");
    link.href = `#${section.id}`;
    link.append(createElement("strong", "", localized(section.title)));

    const preview = section.items?.[0]?.title || section.items?.[0]?.text || section.links?.[0]?.label;
    link.append(createElement("span", "", localized(preview)));
    link.addEventListener("click", () => {
      const dialog = document.querySelector('[data-dialog="search"]');
      if (dialog?.open) dialog.close();
    });

    results.append(link);
  });
}

function updateSettingsLabels() {
  const languageValue = document.querySelector("[data-setting-language]");
  const themeValue = document.querySelector("[data-setting-theme]");

  if (languageValue) languageValue.textContent = uiText("languageName");
  if (themeValue) {
    themeValue.textContent =
      state.theme === "dark" ? uiText("themeDark") : uiText("themeLight");
  }
}

function applyLanguage() {
  renderProfileBasics();
  renderHeroLinks();
  renderSnapshot();
  renderSections();
  updateSettingsLabels();
  renderSearchResults(document.querySelector("[data-search-input]")?.value || "");
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;

  const themeIcon = document.querySelector("[data-theme-icon]");
  if (themeIcon) themeIcon.textContent = state.theme === "dark" ? "☼" : "◐";

  updateSettingsLabels();
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

function handleAction(action) {
  if (action === "language") toggleLanguage();
  if (action === "theme") toggleTheme();
  if (action === "search") openDialog("search");
  if (action === "settings") openDialog("settings");
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-action]");
  if (trigger) handleAction(trigger.dataset.action);
});

document.querySelector("[data-search-input]")?.addEventListener("input", (event) => {
  renderSearchResults(event.target.value);
});

document.querySelectorAll(".panel-dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

applyTheme();
applyLanguage();
