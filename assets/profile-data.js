// Edit this file to update the website content.
// To add a paper, add another object to the `items` array in the `publications` section.
// To add a project, add another object to the `items` array in the `projects` section.
window.PROFILE_DATA = {
  defaultLanguage: "en",
  profile: {
    initials: "XW",
    name: "Xianyi Wang",
    chineseName: "王贤义",
    github: "https://github.com/LZUCSWang",
    metaDescription: "Personal resume website of Xianyi Wang, also known as 王贤义.",
  },
  ui: {
    en: {
      documentTitle: "Xianyi Wang",
      eyebrow: "Resume Website",
      summary:
        "Master's student in Computer Science and Technology at Lanzhou University, working on reinforcement learning, combinatorial optimization, and neural combinatorial optimization.",
      snapshot: "Snapshot",
      exploreAction: "Explore",
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
        "兰州大学计算机科学与技术专业硕士研究生，研究方向主要包括强化学习、组合优化与神经组合优化算法。",
      snapshot: "基本信息",
      exploreAction: "浏览",
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
  },
  snapshot: [
    {
      label: { en: "Education", zh: "学历" },
      value: { en: "Master's Student", zh: "硕士研究生" },
    },
    {
      label: { en: "University", zh: "学校" },
      value: { en: "Lanzhou University", zh: "兰州大学" },
    },
    {
      label: { en: "Major", zh: "专业" },
      value: {
        en: "Computer Science and Technology",
        zh: "计算机科学与技术",
      },
    },
  ],
  heroLinks: [
    {
      label: { en: "GitHub", zh: "GitHub" },
      href: "https://github.com/LZUCSWang",
      icon: "◆",
      variant: "primary",
    },
    {
      label: { en: "Explore", zh: "浏览" },
      href: "#projects",
      icon: "✦",
      variant: "secondary",
    },
  ],
  sections: [
    {
      id: "education",
      icon: "ED",
      title: { en: "Education", zh: "教育背景" },
      keywords: "education lanzhou university master computer science 教育 兰州大学 硕士 计算机",
      items: [
        {
          meta: {
            en: "Lanzhou University · Master's Student",
            zh: "兰州大学 · 硕士研究生",
          },
          text: {
            en: "Major in Computer Science and Technology, with interests in software engineering, intelligent systems, and developer tools.",
            zh: "计算机科学与技术专业，关注软件工程、智能系统和开发工具。",
          },
        },
      ],
    },
    {
      id: "interests",
      icon: "RI",
      title: { en: "Research Interests", zh: "研究兴趣" },
      keywords: "research interests reinforcement learning combinatorial optimization neural combinatorial optimization RL CO NCO 研究兴趣 强化学习 组合优化 神经组合优化算法",
      items: [
        {
          text: {
            en: "My research focuses on reinforcement learning, combinatorial optimization, and neural combinatorial optimization, with particular interest in learning-based algorithms for large-scale decision-making and optimization problems.",
            zh: "我的研究主要聚焦于强化学习、组合优化与神经组合优化算法，尤其关注面向大规模决策与优化问题的学习型算法设计。",
          },
        },
      ],
    },
    {
      id: "skills",
      icon: "SK",
      title: { en: "Skills", zh: "技能方向" },
      keywords: "skills python java web linux git 技能",
      items: [
        {
          tags: ["Python", "Java", "Web", "Linux", "Git"],
          text: {
            en: "Building clean project workflows and practical tools for study, research, and development.",
            zh: "构建清晰的项目工作流，以及面向学习、科研和开发的实用工具。",
          },
        },
      ],
    },
    {
      id: "projects",
      icon: "PR",
      wide: true,
      title: { en: "Projects", zh: "项目经历" },
      keywords: "projects github pages personal website bilingual dark mode search 项目 个人主页 双语 夜间模式 搜索",
      items: [
        {
          meta: { en: "Personal Website · GitHub Pages", zh: "个人主页 · GitHub Pages" },
          title: { en: "Resume-style personal homepage", zh: "简历式个人主页" },
          text: {
            en: "Built a lightweight bilingual personal site with dark mode, search, settings, responsive layout, and selected public resume content.",
            zh: "构建轻量级双语个人网站，包含夜间模式、搜索、设置、响应式布局和筛选后的公开简历内容。",
          },
        },
      ],
    },
    {
      id: "publications",
      icon: "PB",
      wide: true,
      title: { en: "Publications", zh: "论文发表" },
      keywords: "publications papers research publication OD-DEAL CVRP arXiv 2602.00488 capacitated vehicle routing online decomposition 论文 发表 科研 车辆路径",
      items: [
        {
          meta: { en: "arXiv:2602.00488 · 2026", zh: "arXiv:2602.00488 · 2026" },
          title: {
            en: "OD-DEAL: Dynamic Expert-Guided Adversarial Learning with Online Decomposition for Scalable Capacitated Vehicle Routing",
            zh: "OD-DEAL: Dynamic Expert-Guided Adversarial Learning with Online Decomposition for Scalable Capacitated Vehicle Routing",
          },
          authors: "Dongbin Jiao, Zisheng Chen, Xianyi Wang, Jintao Shi, Shengcai Liu, and Shi Yan",
          links: [
            {
              label: { en: "arXiv", zh: "arXiv" },
              href: "https://arxiv.org/abs/2602.00488",
            },
          ],
        },
      ],
    },
    {
      id: "links",
      icon: "↗",
      title: { en: "Quick Links", zh: "快捷链接" },
      keywords: "links github projects publications skills 链接 项目 论文 技能",
      links: [
        { label: { en: "GitHub", zh: "GitHub" }, href: "https://github.com/LZUCSWang" },
        { label: { en: "Projects", zh: "项目经历" }, href: "#projects" },
        { label: { en: "Publications", zh: "论文发表" }, href: "#publications" },
      ],
    },
  ],
};
