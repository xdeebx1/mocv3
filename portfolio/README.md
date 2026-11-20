# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
# Mohamed Omar Portfolio

The root page is a faithful port of the single-file reference. Vite serves and builds `index.html`; its inline CSS, page structure, editable data, and interactions remain together to preserve the reference behavior.

## Run and build

```sh
npm install
npm run dev
npm run build
npm run lint
```

The page uses React/Vite project plumbing, while the reference's original standalone HTML and browser scripts drive the root page. Reference animation libraries are loaded from their pinned npm versions through `src/vendor.js`.

## Edit content and assets

In the script near the bottom of `index.html`, edit `PROFILE`, `PROJECTS`, `PROJECT_DETAILS`, `PRACTICES`, `SKILLS`, `CERTS`, `TIMELINE`, `I18N`, and `XT`. Project screenshots and certificate scans are stored under `public/assets/` and referenced by the `img` values in `PROJECTS` and `CERTS`.

The profile photo is `public/assets/mohamed-omar.jpeg`; `public/assets/og-card.png` is the social preview image and `public/favicon.svg` is the MO site icon. `cv.pdf` is currently missing, so resume links need that file. To add a language, extend the `I18N` and `XT` dictionaries and provide matching language values for the project, project-detail, practices, and timeline data.

## Reference and port notes

The supplied source is retained unchanged at `design-reference/index.html`. See `PORTING_CHECKLIST.md`, `PORTING_LOG.md`, and `KNOWN_DIFFERENCES.md` for the audit, verification status, and missing assets.
