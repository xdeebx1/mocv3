# Reference port checklist

Source: `design-reference/index.html` (identical to the supplied reference).

## Document and setup

- [x] Preserve `lang="en"`, `dir="ltr"`, UTF-8, viewport-fit, title, description, theme color, Open Graph, Twitter card, author, JSON-LD, and inline icon.
- [x] Preserve Google font preconnects and Manrope, Space Grotesk, Cairo, and Instrument Serif font declarations.
- [x] Preserve the hardware/device-memory `lite` class check.
- [x] Keep Matter.js 0.19.0, GSAP 3.12.5 + ScrollTrigger, and Lenis 1.1.13 behavior using the same npm versions.
- [x] Serve the reference design at the existing Vite root page without a new route or visual adaptation.

## Tokens and global CSS

- [x] Copy all CSS from the reference, including `--bg`, `--bg2`, `--fg`, `--mut`, `--acc`, `--line`, `--f`, `--fd`, `--pad`, `--ease`, and `--s`.
- [x] Preserve the dark defaults, `[data-theme=light]` overrides, RTL font overrides, exact fonts/fallbacks, reset, global focus-visible style, grid, and section wrappers.
- [x] Preserve all layout, typography, color, spacing, border, radii, shadow, clip-path, mask, SVG, filter, and custom-property rules verbatim.
- [x] Preserve `@property --s`, generated mockup container-query units, every `@media` rule, and all 13 keyframes (`bob`, `breathe`, `cb`, `dp`, `halo`, `hfin`, `hfspin`, `hfy`, `hu`, `ln`, `pulse`, `rip`, `up`).
- [x] Preserve all touch/fine-pointer guards, hover rules, `prefers-reduced-motion` rules, and mobile overflow/layout fixes.

## Sections and data

- [x] Keep the skip link, intro curtain, percentage loader, custom cursor targets, fixed navigation, active indicator, availability label, EN/AR control, and animated mobile menu.
- [x] Keep the hero grid, architecture/beam, staged name, role dot, typed highlighted tagline, supporting copy, three CTAs, code card, and seven floating technology chips.
- [x] Keep the About statement, optional profile image fallback, scroll-highlighted story, five values, and animated project/skill/certificate statistics.
- [x] Keep the selected-work section, all three sample projects, alternating vertical layout, generated CSS/SVG project artwork, action links, and project detail content.
- [x] Keep the optional `window.PROJECTS_HORIZONTAL` pinned horizontal layout and its `>1100px` fine-pointer condition.
- [x] Keep the Technologies and How I Work skill groups, their exact data, and optional Matter.js physics stage/reset control.
- [x] Keep all three demo certificates, generated certificate SVGs, verification links, and certificate lightbox.
- [x] Keep the five sample journey/timeline entries, active count, and scroll-filled timeline indicator.
- [x] Keep the contact heading/copy/CTA, social links, required contact fields, mailto submission, CV links, footer, Cairo clock, and back-to-top control.
- [x] Keep the footer/contact and certificate/project preview lightboxes, project detail dialog with facts/features/screens/challenge/outcome/next project, and command palette.
- [x] Keep editable `PROFILE`, `PROJECTS`, `PROJECT_DETAILS`, `PRACTICES`, `SKILLS`, `CERTS`, `TIMELINE`, `I18N`, `XT`, `ART`, and `ART2` data and every supplied EN/AR string.

## Effects and interactions

- [x] Preserve page-load curtain/progress timing (1,800ms progress curve, 250ms completion delay, 5,000ms fallback) and the 1,100ms curtain transition with its 500ms delay.
- [x] Preserve hero typing (650ms start, 30ms per character, 900ms caret cleanup), 2,400/2,800ms supporting-copy/button entrances, 1,200ms code-line start with 170ms stagger, and chip reveal/float timings.
- [x] Preserve `.rv` reveal (40px, 900ms), 1,100ms masked heading reveal, project shot 1,400ms clip reveal, and certificate/section stagger delays.
- [x] Preserve hero pointer proximity, hero/architecture/code-card parallax and scroll scaling/fade, floating constellation depth, and their fine-pointer/reduced-motion guards.
- [x] Preserve About story word splitting/highlighting and scroll progress; preserve 1,400ms cubic-eased stat counters.
- [x] Preserve navigation scroll hide/show (6px movement threshold after 200px), active-section observer, mobile menu transitions, and magnetic link/button movement.
- [x] Preserve top progress bar, project marquee scroll offset/skew, section background changes, title drift, timeline line fill, and generated project-image parallax.
- [x] Preserve project/certificate tilt (`10deg`/`8deg`), glare, card hover scale (`1.25`), CSS `--s` transition, and SVG displacement distortion.
- [x] Preserve the optional horizontal project pinning and GSAP SVG scroll animation; use Lenis duration `1.15` and its specified easing, with native-scroll fallback.
- [x] Preserve Matter.js skill physics, body dimensions/initial positions, restitution `0.3`, friction `0.15`, air friction `0.012`, mouse constraint stiffness `0.18`, visibility pause, and cleanup/reset behavior.
- [x] Preserve cursor dot/ring spring (`0.16` force, `0.68` damping), velocity stretch, labels, click ripples (700ms), hero canvas trail (22 points), and touch/reduced-motion exclusions.
- [x] Preserve theme persistence (`theme`), theme circular reveal (900ms), language persistence (`lang`), `lang`/`dir`/title updates, and 520ms view-transition reveal.
- [x] Preserve sound-off default, oscillator/gain timings, 90ms hover throttle, and language/theme/sound command-palette actions.
- [x] Preserve text scramble (30ms interval), Cairo clock (1-second update), CTA halo (2.8s / 42px), button text flips, footer back-to-top animation, and keyboard shortcuts.
- [x] Preserve project-detail expansion/collapse, next-project action, Escape behavior, lightbox open/close, focus return, `noscroll` handling, and Lenis stop/start.
- [x] Preserve all reference ARIA roles/labels, keyboard activation, focus-visible styling, form labels/required attributes, reduced-motion behavior, and image error fallbacks.

## Responsive behavior, assets, and validation

- [x] Preserve each breakpoint: `380px`, `420px`, `520px`, `600px`, `640px`, `760px`, `900px`, `1024px`, `1100px`, and `1240px`, plus coarse-pointer and reduced-motion queries.
- [x] Preserve all `cqw`-scaled generated gallery screens and the reference's touch behavior (natural scrolling; pointer-only effects disabled).
- [x] Keep `assets/me.jpg` and `assets/og.jpg`; report missing `assets/cv.pdf`. Optional `assets/p1-a.jpg`/`assets/your-file.jpg` are not active data.
- [x] Run production build and linter; verify module versions and that the reference and served page have matching structure/styles/interactions.
- [x] Compare the reference and served root page at 360px, 390px, 820px, 1100px, and 1440px; check English/Arabic and dark/light themes.
- [x] Check for console errors, horizontal overflow, broken referenced assets, and correct reduced-motion/touch behavior.
