# Xianyi Wang Resume Website

This site is data-driven. Most future content changes should be made in
`assets/profile-data.js`, not in `index.html`.

## Common Edits

- Basic identity: edit `profile`.
- Hero text and UI labels: edit `ui.en` and `ui.zh`.
- Snapshot fields: edit `snapshot`.
- Resume sections: edit `sections`.
- Projects: add an item inside the section with `id: "projects"`.
- Papers: add an item inside the section with `id: "publications"`.

## Add A Publication

Add a new object to the `items` array in the `publications` section:

```js
{
  meta: { en: "arXiv:xxxx.xxxxx · 2026", zh: "arXiv:xxxx.xxxxx · 2026" },
  title: {
    en: "Paper title",
    zh: "Paper title"
  },
  authors: "Author A, Xianyi Wang, Author B",
  links: [
    { label: { en: "arXiv", zh: "arXiv" }, href: "https://arxiv.org/abs/xxxx.xxxxx" }
  ]
}
```

Also add useful search terms to the `keywords` string in that section.
