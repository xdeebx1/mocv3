# Known differences

- `public/assets/cv.pdf` is absent, although the reference links to it for resume downloads. Vite's fallback may respond to that missing URL with `index.html` (`text/html`), not a PDF, until the owner adds the file.
- The reference's suggested optional project image paths (`assets/p1-a.jpg` and `assets/your-file.jpg`) are not present, but none are selected in the reference data; the projects use its generated artwork.
- The project has no Git repository, so the requested branch and per-step commits cannot be produced without initializing new repository plumbing.
- The reference itself emits a GSAP warning for `.sq svg` because no matching element exists; it appears on both the reference and the port and was left unchanged.
- The reference closes the mobile menu after a nav-link click but does not reset the burger button's `aria-expanded` value. This reference behavior was preserved unchanged.
- No separate `/__fx` preview page or individual effect commits were created. The source CSS and inline scripts were kept identical and previewed directly against the supplied source instead.

No visual or interaction differences are intended. Browser/build verification is recorded in `PORTING_LOG.md`.
