import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  certificates,
  copy,
  practices,
  projects,
  skills,
  socialLinks,
  timeline,
  values,
  type Language,
} from "./data";
import { usePageEffects } from "./usePageEffects";

type Preview =
  | { kind: "certificate"; index: number }
  | null;

const technologyChips = [
  { label: "H5", name: "HTML", color: "#f0b27a" },
  { label: "C3", name: "CSS", color: "#829EFF" },
  { label: "JS", name: "JavaScript", color: "#f5d451" },
  { label: "Rx", name: "React", color: "#7fe0f5" },
  { label: "TS", name: "TypeScript", color: "#6fa8ff" },
  { label: "Tw", name: "Tailwind CSS", color: "#5be3d0" },
  { label: "Bs", name: "Bootstrap", color: "#b79bff" },
];

const copyrightYear = new Date().getFullYear();

const codeLines = [
  <Fragment key="opening">
    <span className="k">const</span> developer <span className="p">=</span> {"{"}
  </Fragment>,
  <Fragment key="name">
    &nbsp; name<span className="p">:</span> <span className="s">"Mohamed Omar"</span>
    <span className="p">,</span>
  </Fragment>,
  <Fragment key="role">
    &nbsp; role<span className="p">:</span>{" "}
    <span className="s">"Full Stack Developer"</span>
    <span className="p">,</span>
  </Fragment>,
  <Fragment key="stack">
    &nbsp; stack<span className="p">:</span> [
    <span className="s">"React"</span>
    <span className="p">,</span> <span className="s">"TypeScript"</span>]
    <span className="p">,</span>
  </Fragment>,
  <Fragment key="focus">
    &nbsp; focus<span className="p">:</span>{" "}
    <span className="s">"clean, accessible UI"</span>
    <span className="p">,</span>
  </Fragment>,
  <Fragment key="availability">
    &nbsp; available<span className="p">:</span> <span className="b">true</span>
    <span className="p">,</span>
  </Fragment>,
  <Fragment key="closing">
    {"}"}
    <span className="p">;</span>
  </Fragment>,
  <span className="cb" key="cursor" />,
];

function FlipText({ children, language }: { children: string; language: Language }) {
  return (
    <span className="f">
      <span><LocalText language={language}>{children}</LocalText></span>
      <span aria-hidden="true"><LocalText language={language}>{children}</LocalText></span>
    </span>
  );
}

function LocalText({
  language,
  children,
}: {
  language: Language;
  children: ReactNode;
}) {
  const content = language === "ar" && typeof children === "string"
    ? children.split(/([A-Za-z0-9]+(?:[A-Za-z0-9 .&'/-]*[A-Za-z0-9])?)/g).map((part, index) =>
        /^[A-Za-z0-9]/.test(part)
          ? <bdi dir="ltr" lang="en" key={index}>{part}</bdi>
          : part,
      )
    : children;
  return (
    <bdi
      dir={language === "ar" ? "rtl" : "ltr"}
      lang={language}
      className={language === "ar" ? "arabic-text" : undefined}
    >
      {content}
    </bdi>
  );
}

function HeroTagline({ language }: { language: Language }) {
  const segments: Array<{ text: string; kind?: string }> = language === "en"
    ? [
        { text: "I build " },
        { text: "modern web interfaces", kind: "mark" },
        { text: ", " },
        { text: "full-stack applications", kind: "mark b" },
        { text: " and " },
        { text: "accessible experiences", kind: "mark" },
        { text: " " },
        { text: "from concept through deployment", kind: "em" },
        { text: "." },
      ]
    : [
        { text: "أبني " },
        { text: "واجهات ويب حديثة", kind: "mark" },
        { text: " و" },
        { text: "تطبيقات متكاملة", kind: "mark b" },
        { text: " و" },
        { text: "تجارب سهلة الاستخدام", kind: "mark" },
        { text: " " },
        { text: "من الفكرة حتى النشر", kind: "em" },
        { text: "." },
      ];
  const chars = segments.map((segment) => Array.from(segment.text));
  const total = chars.reduce((count, segment) => count + segment.length, 0);
  const [initialTotal] = useState(total);
  const [animationComplete, setAnimationComplete] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [visibleChars, setVisibleChars] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? total : 0,
  );

  useEffect(() => {
    if (animationComplete) return;

    let startTimer = 0;
    let frame = 0;
    const begin = () => {
      startTimer = window.setTimeout(() => {
        const start = performance.now();
        const type = (now: number) => {
          const count = Math.min(initialTotal, Math.floor((now - start) / 30));
          setVisibleChars(count);
          if (count === initialTotal) setAnimationComplete(true);
          if (count < initialTotal) frame = window.requestAnimationFrame(type);
        };
        frame = window.requestAnimationFrame(type);
      }, 650);
    };
    const observer = new MutationObserver(() => {
      if (!document.body.classList.contains("loaded")) return;
      observer.disconnect();
      begin();
    });
    if (document.body.classList.contains("loaded")) begin();
    else observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      window.clearTimeout(startTimer);
      window.cancelAnimationFrame(frame);
    };
  }, [animationComplete, initialTotal]);

  let offset = 0;
  const fullText = segments.map((segment) => segment.text).join("");
  const shownChars = animationComplete ? total : visibleChars;

  return (
    <p
      className={`hl${shownChars < total ? " typing" : ""}${language === "ar" ? " arabic-text" : ""}`}
      dir={language === "ar" ? "rtl" : "ltr"}
      lang={language}
      aria-label={fullText}
    >
      {segments.map((segment, index) => {
        const shown = chars[index].slice(0, Math.max(0, shownChars - offset)).join("");
        offset += chars[index].length;
        if (segment.kind?.startsWith("mark")) {
          return <mark className={`${segment.kind.split(" ")[1] ?? ""}${shown ? " on" : ""}`} key={index}>{shown}</mark>;
        }
        if (segment.kind === "em") return <em key={index}>{shown}</em>;
        return <span key={index}>{shown}</span>;
      })}
      {shownChars < total && <span className="caret" aria-hidden="true" />}
    </p>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem("lang") === "ar" ? "ar" : "en";
    } catch {
      return "en";
    }
  });
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      return localStorage.getItem("theme") === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [preview, setPreview] = useState<Preview>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [time, setTime] = useState("");
  const [activeSection, setActiveSection] = useState("top");
  const [activeJourney, setActiveJourney] = useState(1);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [paletteSelected, setPaletteSelected] = useState(0);
  const [detailProject, setDetailProject] = useState<number | null>(null);
  const [detailClip, setDetailClip] = useState("inset(50%)");
  const audioContext = useRef<AudioContext | null>(null);
  const loaderPercent = useRef<HTMLElement>(null);
  const paletteInput = useRef<HTMLInputElement>(null);
  const detailOrigin = useRef<HTMLElement | null>(null);
  const detailCloseTimer = useRef<number | null>(null);
  const previewOrigin = useRef<HTMLElement | null>(null);
  const t = copy[language];

  usePageEffects(language);

  useEffect(() => {
    const body = document.body;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      if (loaderPercent.current) loaderPercent.current.textContent = "100%";
      body.classList.add("loaded", "settled");
      return;
    }

    let ready = document.readyState === "complete";
    let frame = 0;
    let forceTimer = 0;
    let settleTimer = 0;
    const onLoad = () => { ready = true; };
    const complete = () => {
      if (body.classList.contains("loaded")) return;
      window.clearTimeout(forceTimer);
      if (loaderPercent.current) loaderPercent.current.textContent = "100%";
      body.classList.add("loaded");
      settleTimer = window.setTimeout(() => body.classList.add("settled"), 1900);
    };
    const started = performance.now();
    const progress = (now: number) => {
      let value = Math.round(100 * (1 - Math.pow(1 - Math.min((now - started) / 1800, 1), 3)));
      if (!ready) value = Math.min(value, 90);
      if (loaderPercent.current) loaderPercent.current.textContent = `${value}%`;
      if (value < 100) frame = window.requestAnimationFrame(progress);
      else settleTimer = window.setTimeout(complete, 250);
    };
    window.addEventListener("load", onLoad);
    frame = window.requestAnimationFrame(progress);
    forceTimer = window.setTimeout(complete, 5000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(forceTimer);
      window.clearTimeout(settleTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("lang", language);
      localStorage.setItem("theme", theme);
    } catch {
      // Storage can be unavailable in private browsing; the selected state still works.
    }
  }, [language, menuOpen, theme]);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat(language === "ar" ? "ar-EG" : "en-GB", {
          timeZone: "Africa/Cairo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date()),
      );
    };
    updateTime();
    const timer = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(timer);
  }, [language]);

  useEffect(() => {
    const sections = ["top", "about", "work", "certs", "contact"]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.15, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (current) {
          setActiveJourney(Number((current.target as HTMLElement).dataset.n) || 1);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    document.querySelectorAll("#tl .it").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (preview) {
      previewOrigin.current = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
      window.setTimeout(() => document.querySelector<HTMLElement>(".lb .x")?.focus(), 0);
    } else {
      previewOrigin.current?.focus();
      previewOrigin.current = null;
    }
  }, [preview]);

  useEffect(() => {
    if (detailProject !== null) {
      window.setTimeout(() => document.querySelector<HTMLElement>(".pd .x")?.focus(), 0);
    }
  }, [detailProject]);

  useEffect(() => () => {
    if (detailCloseTimer.current !== null) window.clearTimeout(detailCloseTimer.current);
  }, []);

  useEffect(() => {
    if (preview || paletteOpen || detailProject !== null) return;
    document.documentElement.classList.remove("noscroll");
  }, [preview, paletteOpen, detailProject]);

  useEffect(() => {
    const onShortcut = (event: globalThis.KeyboardEvent) => {
      const active = document.activeElement;
      const typing = active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;
      if (
        (event.key === "/" && !typing) ||
        ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k")
      ) {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, []);

  useEffect(() => {
    if (paletteOpen) {
      const timer = window.setTimeout(() => {
        setPaletteQuery("");
        setPaletteSelected(0);
        paletteInput.current?.focus();
      }, 0);
      return () => window.clearTimeout(timer);
    }
  }, [paletteOpen]);

  const navigate = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    setPaletteOpen(false);
  };

  const playSound = useCallback((frequency: number, duration: number, force = false) => {
    if (!soundOn && !force) return;
    const AudioContextConstructor =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextConstructor) return;
    audioContext.current ??= new AudioContextConstructor();
    const oscillator = audioContext.current.createOscillator();
    const gain = audioContext.current.createGain();
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.04, audioContext.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      audioContext.current.currentTime + duration,
    );
    oscillator.connect(gain).connect(audioContext.current.destination);
    oscillator.start();
    oscillator.stop(audioContext.current.currentTime + duration);
  }, [soundOn]);

  useEffect(() => {
    if (!soundOn) return;
    let lastSound = 0;
    const onHover = (event: globalThis.PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest("a,button,[data-cur]")) return;
      const now = performance.now();
      if (now - lastSound < 90) return;
      lastSound = now;
      playSound(660 + Math.random() * 180, 0.05);
    };
    const onClick = () => playSound(240, 0.12);
    document.addEventListener("pointerover", onHover);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerover", onHover);
      document.removeEventListener("click", onClick);
    };
  }, [playSound, soundOn]);

  const toggleTheme = (event?: ReactMouseEvent<HTMLButtonElement>) => {
    const next = theme === "dark" ? "light" : "dark";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const documentWithTransition = document as Document & {
      startViewTransition?: (callback: () => void) => { ready: Promise<void> };
    };
    if (!documentWithTransition.startViewTransition || reduced) {
      setTheme(next);
      return;
    }
    const x = event?.clientX || window.innerWidth - 60;
    const y = event?.clientY || 40;
    const transition = documentWithTransition.startViewTransition(() => setTheme(next));
    void transition.ready.then(
      () => {
        const radius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y),
        );
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0 at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 900,
            easing: "cubic-bezier(.77,0,.18,1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      },
      () => setTheme(next),
    );
  };

  const openProjectDetail = (index: number, origin: HTMLElement) => {
    if (detailCloseTimer.current !== null) {
      window.clearTimeout(detailCloseTimer.current);
      detailCloseTimer.current = null;
    }
    detailOrigin.current = origin;
    const rect = origin.getBoundingClientRect();
    setDetailClip(
      `inset(${rect.top}px ${window.innerWidth - rect.right}px ${window.innerHeight - rect.bottom}px ${rect.left}px)`,
    );
    setDetailProject(index);
    document.documentElement.classList.add("noscroll");
    window.requestAnimationFrame(() => setDetailClip("inset(0)"));
  };

  const closeProjectDetail = useCallback(() => {
    if (detailProject === null) return;
    const rect = detailOrigin.current?.getBoundingClientRect();
    setDetailClip(
      rect && rect.bottom > 0 && rect.top < window.innerHeight
        ? `inset(${rect.top}px ${window.innerWidth - rect.right}px ${window.innerHeight - rect.bottom}px ${rect.left}px)`
        : "inset(50%)",
    );
    if (detailCloseTimer.current !== null) window.clearTimeout(detailCloseTimer.current);
    detailCloseTimer.current = window.setTimeout(() => {
      setDetailProject(null);
      detailOrigin.current?.focus();
      detailCloseTimer.current = null;
    }, 1000);
  }, [detailProject]);

  useEffect(() => {
    if (!preview && !paletteOpen && detailProject === null) return;
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreview(null);
        setPaletteOpen(false);
        closeProjectDetail();
      }
    };
    document.documentElement.classList.add("noscroll");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [preview, paletteOpen, detailProject, closeProjectDetail]);

  const paletteCommands = [
    { label: t.navWork, action: () => navigate("work") },
    { label: t.navAbout, action: () => navigate("about") },
    { label: t.skillsTitle, action: () => navigate("skills") },
    { label: t.navCertificates, action: () => navigate("certs") },
    { label: t.journeyTitle, action: () => navigate("journey") },
    { label: t.navContact, action: () => navigate("contact") },
    {
      label: language === "en" ? "Switch language" : "تبديل اللغة",
      action: () => setLanguage((current) => current === "en" ? "ar" : "en"),
    },
    {
      label: language === "en" ? "Toggle theme" : "تبديل المظهر",
      action: toggleTheme,
    },
    {
      label: language === "en" ? "Toggle sound" : "تبديل الصوت",
      action: () => setSoundOn((on) => !on),
    },
  ];
  const visibleCommands = paletteCommands.filter((command) =>
    command.label.toLocaleLowerCase().includes(paletteQuery.toLocaleLowerCase()),
  );
  const runPaletteCommand = (index: number) => {
    const command = visibleCommands[index];
    if (!command) return;
    setPaletteOpen(false);
    command.action();
  };

  const onPaletteKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && visibleCommands.length) {
      event.preventDefault();
      setPaletteSelected((index) => (index + 1) % visibleCommands.length);
    } else if (event.key === "ArrowUp" && visibleCommands.length) {
      event.preventDefault();
      setPaletteSelected((index) => (index - 1 + visibleCommands.length) % visibleCommands.length);
    } else if (event.key === "Enter") {
      runPaletteCommand(paletteSelected);
    }
  };

  const onPaletteQueryChange = (value: string) => {
    setPaletteQuery(value);
    setPaletteSelected(0);
  };

  const openCertificate = (index: number, origin: HTMLElement) => {
    previewOrigin.current = origin;
    setPreview({ kind: "certificate", index });
  };

  const onSkillsPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    const element = event.currentTarget;
    element.setPointerCapture(event.pointerId);
    element.dataset.dragX = element.dataset.dragX || "0";
    element.dataset.dragY = element.dataset.dragY || "0";
    element.dataset.startX = String(event.clientX);
    element.dataset.startY = String(event.clientY);
    element.dataset.moved = "false";
  };

  const onSkillsPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const element = event.currentTarget;
    if (!element.hasPointerCapture(event.pointerId)) return;
    const dx = event.clientX - Number(element.dataset.startX);
    const dy = event.clientY - Number(element.dataset.startY);
    if (Math.abs(dx) + Math.abs(dy) > 4) element.dataset.moved = "true";
    const x = Number(element.dataset.dragX) + dx;
    const y = Number(element.dataset.dragY) + dy;
    element.style.transform = `translate3d(${x}px,${y}px,0)`;
  };

  const onSkillsPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    const element = event.currentTarget;
    if (!element.hasPointerCapture(event.pointerId)) return;
    element.releasePointerCapture(event.pointerId);
    const dx = event.clientX - Number(element.dataset.startX);
    const dy = event.clientY - Number(element.dataset.startY);
    element.dataset.dragX = String(Number(element.dataset.dragX) + dx);
    element.dataset.dragY = String(Number(element.dataset.dragY) + dy);
  };

  const resetSkills = () => {
    document.querySelectorAll<HTMLElement>(".sbox .pill").forEach((pill) => {
      pill.style.transform = "";
      delete pill.dataset.dragX;
      delete pill.dataset.dragY;
    });
  };

  return (
    <>
      <div className="prog" aria-hidden="true" />
      <canvas className="trail" aria-hidden="true" />
      <div className="k-ring" aria-hidden="true">
        <div className="k-shape" />
        <div className="k-lbl"><span /><i>↗</i></div>
      </div>
      <div className="k-dot" aria-hidden="true" />
      <div className="curtain" aria-hidden="true">
        <span>MO<i>.</i></span>
        <b className="pct" ref={loaderPercent}>0%</b>
      </div>
      <svg width="0" height="0" className="svg-filters" aria-hidden="true">
        <filter id="dist">
          <feTurbulence type="fractalNoise" baseFrequency=".012 .03" numOctaves="1" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" />
        </filter>
      </svg>

      <nav id="nav" aria-label="Main navigation">
        <a className="mono" href="#top" aria-label={language === "en" ? "Mohamed Omar home" : "العودة إلى الرئيسية"}>
          MO<i>.</i>
        </a>
        <div className="links">
        <a className={activeSection === "work" ? "on" : ""} href="#work" onClick={() => setMenuOpen(false)}><LocalText language={language}>{t.navWork}</LocalText></a>
        <a className={activeSection === "about" ? "on" : ""} href="#about" onClick={() => setMenuOpen(false)}><LocalText language={language}>{t.navAbout}</LocalText></a>
        <a className={activeSection === "certs" ? "on" : ""} href="#certs" onClick={() => setMenuOpen(false)}><LocalText language={language}>{t.navCertificates}</LocalText></a>
        <a className={activeSection === "contact" ? "on" : ""} href="#contact" onClick={() => setMenuOpen(false)}><LocalText language={language}>{t.navContact}</LocalText></a>
        </div>
        <div className="tools">
        <span className="avail"><b /><LocalText language={language}>{t.available}</LocalText></span>
          <button className="lang" type="button" aria-label={language === "en" ? "Toggle light and dark theme" : "تبديل المظهر الفاتح والداكن"} onClick={toggleTheme}>{theme === "dark" ? "◐" : "◑"}</button>
          <button className="lang" type="button" aria-label={language === "en" ? "Open command palette" : "فتح لوحة الأوامر"} onClick={() => setPaletteOpen(true)}>/</button>
          <button className="lang sound" type="button" aria-label={language === "en" ? "Toggle sound effects" : "تبديل المؤثرات الصوتية"} aria-pressed={soundOn} onClick={() => {if (!soundOn) playSound(520, 0.1, true); setSoundOn((on) => !on);}}>{soundOn ? "♪ on" : "♪ off"}</button>
          <button className="lang" type="button" aria-label={language === "en" ? "Switch language" : "تبديل اللغة"} onClick={() => setLanguage((current) => current === "en" ? "ar" : "en")}>EN / AR</button>
          <button className="burger" type="button" aria-label={language === "en" ? "Menu" : "القائمة"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><i /><i /></button>
        </div>
      </nav>

      <main id="top">
        <header className="hero">
          <div className="grid-bg" />
          <div className="arch" aria-hidden="true"><div className="beam" /><div className="hp" /></div>
          <div className="hwrap">
            <div className="tag"><b className="dotg" /><LocalText language={language}>{t.role}</LocalText></div>
            <h1 className={language === "ar" ? "hero-name-ar" : undefined} aria-label={language === "ar" ? "محمد عمر" : "Mohamed Omar"}>
              {(language === "ar" ? ["محمد", "عمر."] : ["Mohamed", "Omar."]).map((word, line) => (
                <span className="mask" key={line}>
                  <span>{language === "ar"
                    ? <bdi dir="rtl" lang="ar" className="arabic-text">{word}</bdi>
                    : Array.from(word).map((letter, index) => <span className="ch" key={index}>{letter}</span>)}</span>
                </span>
              ))}
            </h1>
            <HeroTagline language={language} />
            <p className={`hs${language === "ar" ? " arabic-text" : ""}`} dir={language === "ar" ? "rtl" : "ltr"} lang={language}>{t.intro}</p>
            <div className="hbtns">
              <a className="hb pri mag" href="#work"><FlipText language={language}>{t.explore}</FlipText></a>
              <a className="hb mag" href="https://www.instagram.com/mohamed.omar.72/" target="_blank" rel="noopener noreferrer"><b>ig</b><FlipText language={language}>{t.connect}</FlipText></a>
            </div>
          </div>
          <aside className="hcode" aria-hidden="true">
            <div className="hc-bar"><i /><i /><i /><span>portfolio.tsx</span></div>
            <pre><code>{codeLines.map((line, index) => <span className="ln" style={{ "--i": index } as CSSProperties} key={index}>{line}</span>)}</code></pre>
          </aside>
          <div className="hfloat" aria-hidden="true">
            <div className="hf-ring r1" /><div className="hf-ring r2" />
            <div className="hf-core"><span>MO<i>.</i></span></div>
            {technologyChips.map((chip, index) => {
              const style = {
                "--i": index,
                "--d": [1, 0.7, 1.2, 0.9, 1.1, 0.8, 1][index],
                "--t": ["6.2s", "7s", "5.6s", "6.6s", "7.4s", "6s", "6.8s"][index],
                "--c": chip.color,
                "--bx": ["50%", "83.6%", "91.9%", "68.7%", "31.3%", "8.1%", "16.4%"][index],
                "--by": ["7%", "23.2%", "59.6%", "88.7%", "88.7%", "59.6%", "23.2%"][index],
                "--ax": ["0%", "40%", "98%", "104%", "92%", "38%", "4%"][index],
                "--ay": ["-12%", "-26%", "-8%", "46%", "114%", "130%", "96%"][index],
              } as CSSProperties;
              return <span className="hf-chip" style={style} key={chip.name}><span className="in"><b>{chip.label}</b>{chip.name}</span></span>;
            })}
          </div>
          <span className="scroll">SCROLL</span>
        </header>

        <section className="about" id="about">
          <div className="grid-bg" />
          <div className="wrap">
            <p className="stmt rv arabic-text" dir={language === "ar" ? "rtl" : "ltr"} lang={language}>
              {t.about.split(" ").map((word, index, words) => (
                <Fragment key={`${word}-${index}`}>
                  <span className="w">{word}</span>
                  {index < words.length - 1 ? " " : ""}
                </Fragment>
              ))}
            </p>
            <div className="sq rv me-card"><div className="mono"><span>MO<i>.</i></span></div><img className="me" src="/assets/profile/personal-photo.jpeg" alt="Mohamed Omar" /></div>
            <p className="story rv arabic-text" dir={language === "ar" ? "rtl" : "ltr"} lang={language}>{t.story.split(" ").map((word, index) => <span className="sw" key={`${word}-${index}`}>{word} </span>)}</p>
            <div className="pts rv">
              {values[language].map(([title, description], index) => (
                <article className="pc" key={title}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {index === 0 ? <><path d="M8 7l-5 5 5 5M16 7l5 5-5 5" /></> : index === 1 ? <><path d="M5 3l14 7-6 2-2 6z" /></> : index === 2 ? <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4" /></> : index === 3 ? <><path d="M3 9l9-4 9 4-9 4zM7 11v5c3 2 7 2 10 0v-5" /></> : <><path d="M12 3a6 6 0 00-4 10.5V17h8v-3.5A6 6 0 0012 3zM9 21h6" /></>}
                  </svg>
                  <em>{String(index + 1).padStart(2, "0")}</em><b dir={language === "ar" ? "rtl" : "ltr"} lang={language} className={language === "ar" ? "arabic-text" : undefined}>{title}</b><p dir={language === "ar" ? "rtl" : "ltr"} lang={language} className={language === "ar" ? "arabic-text" : undefined}>{description}</p>
                </article>
              ))}
            </div>
            <div className="stats rv">
              {[["03", language === "en" ? "Projects" : "مشاريع"], ["07", language === "en" ? "Technologies" : "تقنيات"], ["04", language === "en" ? "Certificates" : "شهادات"]].map(([number, label]) => <div key={label}><b data-v={Number(number)}>00</b><span dir={language === "ar" ? "rtl" : "ltr"} lang={language} className={language === "ar" ? "arabic-text" : undefined}>{label}</span></div>)}
            </div>
          </div>
        </section>

        <section id="work"><div className="wrap">
          <div className="head rv"><h2 className={`big${language === "ar" ? " arabic-text" : ""}`} dir={language === "ar" ? "rtl" : "ltr"} lang={language}>{t.workTitle}</h2></div>
          <div id="projects">
            {projects.map((project, index) => (
              <article className="proj" key={project.name}>
                <button className="shot" data-cur={language === "ar" ? "عرض" : "View"} type="button" aria-label={language === "en" ? `${project.name} preview` : `معاينة ${project.name}`} onClick={(event) => openProjectDetail(index, event.currentTarget)}>
                  <img className="mock" src={project.image} alt={`${project.name} project screenshot`} loading={index === 0 ? "eager" : "lazy"} />
                </button>
                <div className="info rv">
                  <div className={`cat${language === "ar" ? " arabic-text" : ""}`} dir={language === "ar" ? "rtl" : "ltr"} lang={language}>{project.category[language]}</div>
                  <h3>{project.name}</h3>
                  <p className={language === "ar" ? "arabic-text" : undefined} dir={language === "ar" ? "rtl" : "ltr"} lang={language}>{project.description[language]}</p>
                  <div className="btns">
                    <button className="btn pri" type="button" onClick={(event) => openProjectDetail(index, event.currentTarget)}><LocalText language={language}>{t.viewProject}</LocalText></button>
                    <a className="btn" href={project.live} target="_blank" rel="noopener noreferrer"><LocalText language={language}>{t.livePreview}</LocalText></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div></section>

        <div className="marq" aria-hidden="true">
          <span className="tr">{("HTML — CSS — JavaScript — React — TypeScript — Tailwind CSS — Bootstrap — ").repeat(4)}</span>
          <span className="tr o">{("HTML — CSS — JavaScript — React — TypeScript — Tailwind CSS — Bootstrap — ").repeat(4)}</span>
        </div>

        <section className="skills" id="skills"><div className="wrap">
          <div className="head rv"><h2 className={`big${language === "ar" ? " arabic-text" : ""}`} dir={language === "ar" ? "rtl" : "ltr"} lang={language}>{t.skillsTitle}</h2><span className="lbl"><LocalText language={language}>{language === "en" ? "DRAG TO EXPLORE" : "اسحب للاستكشاف"}</LocalText></span></div>
          <div className="sbox rv">
            <button className="sreset" type="button" onClick={resetSkills}><LocalText language={language}>{language === "en" ? "↺ Reset" : "↺ إعادة"}</LocalText></button>
            <div id="sk">
              <span className="gl"><LocalText language={language}>{t.skillsLabel}</LocalText></span>
              {skills.map((skill, index) => (
                <button className="pill" type="button" style={{ "--i": index } as CSSProperties} key={skill} onPointerDown={onSkillsPointerDown} onPointerMove={onSkillsPointerMove} onPointerUp={onSkillsPointerUp} onPointerCancel={onSkillsPointerUp}>{skill}</button>
              ))}
              <span className="gl"><LocalText language={language}>{t.practicesLabel}</LocalText></span>
              {practices[language].map((practice, index) => (
                <button className="pill pr" type="button" dir={language === "ar" ? "rtl" : "ltr"} lang={language} style={{ "--i": index + skills.length } as CSSProperties} key={practice} onPointerDown={onSkillsPointerDown} onPointerMove={onSkillsPointerMove} onPointerUp={onSkillsPointerUp} onPointerCancel={onSkillsPointerUp}>{practice}</button>
              ))}
            </div>
          </div>
        </div></section>

        <section id="certs"><div className="wrap">
          <div className="head rv"><h2 className={`big${language === "ar" ? " arabic-text" : ""}`} dir={language === "ar" ? "rtl" : "ltr"} lang={language}>{t.certificatesTitle}</h2></div>
          <div className="certs">
            {certificates.map((certificate, index) => (
              <figure className="cert rv" key={certificate.image}>
                <button className="im" data-cur={language === "ar" ? "تكبير" : "Zoom"} data-label={language === "ar" ? "عرض الشهادة ↗" : "VIEW CERTIFICATE ↗"} type="button" aria-label={language === "ar" ? `عرض شهادة ${certificate.title}` : `View ${certificate.title} certificate`} onClick={(event) => openCertificate(index, event.currentTarget)}>
                  <img src={certificate.image} alt={`${certificate.title} certificate`} loading="lazy" />
                </button>
                <div className="cert-copy rv"><h4>{certificate.title}</h4><p>{certificate.issuer}</p></div>
              </figure>
            ))}
          </div>
        </div></section>

        <section id="journey"><div className="wrap jr">
          <aside className="jside"><span className="lbl"><LocalText language={language}>{t.journeyLabel}</LocalText></span><h2 className={`jt${language === "ar" ? " arabic-text" : ""}`} dir={language === "ar" ? "rtl" : "ltr"} lang={language}>{t.journeyTitle}</h2><p className={language === "ar" ? "arabic-text" : undefined} dir={language === "ar" ? "rtl" : "ltr"} lang={language}>{t.journeySubtitle}</p><div className="jcount"><b>{String(activeJourney).padStart(2, "0")}</b><span>/ 04</span></div></aside>
          <div className="tl">
            {timeline.map((item, index) => (
              <article className="it rv" data-n={index + 1} key={item.label.en}>
                <span className="no">{String(index + 1).padStart(2, "0")}</span>
                <div className="jc"><span className="lbl"><LocalText language={language}>{item.label[language]}</LocalText></span><h4 className={language === "ar" ? "arabic-text" : undefined} dir={language === "ar" ? "rtl" : "ltr"} lang={language}><LocalText language={language}>{item.title[language]}</LocalText></h4><p className={language === "ar" ? "arabic-text" : undefined} dir={language === "ar" ? "rtl" : "ltr"} lang={language}><LocalText language={language}>{item.description[language]}</LocalText></p></div>
              </article>
            ))}
          </div>
        </div></section>

        <section className="contact" id="contact">
          <div className="grid-bg" />
          <h2 className="rv arabic-text" dir={language === "ar" ? "rtl" : "ltr"} lang={language}>{t.contactTitle}</h2>
          <p className="rv arabic-text" dir={language === "ar" ? "rtl" : "ltr"} lang={language}>{t.contactText}</p>
          <a className="cta mag" data-cur={language === "ar" ? "ابدأ" : "Go"} href="https://wa.me/201282782648" target="_blank" rel="noopener noreferrer"><span><LocalText language={language}>{t.contactCta}</LocalText></span></a>
          <div className="soc">
            {socialLinks.map((link) => <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name}>{link.name} ↗</a>)}
          </div>
          <footer>
            <span>© {copyrightYear} Mohamed Omar</span>
            <span dir={language === "ar" ? "rtl" : "ltr"} lang={language} className={language === "ar" ? "arabic-text" : undefined}>{t.footer}</span>
            <span dir={language === "ar" ? "rtl" : "ltr"} lang={language} className={language === "ar" ? "arabic-text" : undefined}>{language === "en" ? "Cairo" : "القاهرة"} {time}</span>
            <div className="footer-social">{socialLinks.map((link) => <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name}>{link.name} ↗</a>)}</div>
            <button className="top" type="button" aria-label={t.backToTop} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><i>↑</i></button>
          </footer>
        </section>
      </main>

      <div className={`lb${preview ? " open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!preview} aria-label={language === "en" ? "Certificate preview" : "معاينة الشهادة"} onClick={(event) => {if (event.target === event.currentTarget) setPreview(null);}}>
        <button className="x" type="button" aria-label={language === "en" ? "Close preview" : "إغلاق المعاينة"} onClick={() => setPreview(null)}>×</button>
        {preview && <figure className="box">
          <div className="certificate-preview">
            <img src={certificates[preview.index].image} alt={`${certificates[preview.index].title} certificate`} />
          </div>
          <figcaption>{certificates[preview.index].title} · {certificates[preview.index].issuer}</figcaption>
        </figure>}
      </div>

      <div className={`pal${paletteOpen ? " open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!paletteOpen} aria-label={language === "en" ? "Command palette" : "لوحة الأوامر"} onClick={(event) => {if (event.target === event.currentTarget) setPaletteOpen(false);}}>
        <div className="bx" data-lenis-prevent>
          <input
            ref={paletteInput}
            aria-label={language === "en" ? "Command search" : "البحث عن أمر"}
            autoComplete="off"
            value={paletteQuery}
            onChange={(event) => onPaletteQueryChange(event.target.value)}
            onKeyDown={onPaletteKeyDown}
          />
          <ul>
            {visibleCommands.map((command, index) => <li className={index === paletteSelected ? "on" : ""} key={command.label} onMouseEnter={() => setPaletteSelected(index)} onClick={() => runPaletteCommand(index)}>{command.label}</li>)}
          </ul>
        </div>
      </div>

      <div
        className={`pd${detailProject !== null ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={detailProject === null}
        data-lenis-prevent
        style={{ clipPath: detailClip }}
      >
        <button className="x" type="button" aria-label={language === "en" ? "Close project details" : "إغلاق تفاصيل المشروع"} onClick={closeProjectDetail}>×</button>
        {detailProject !== null && <div className="pdi">
          <div className={`cat${language === "ar" ? " arabic-text" : ""}`} dir={language === "ar" ? "rtl" : "ltr"} lang={language} style={{ color: "var(--acc)" }}>{projects[detailProject].category[language]}</div>
          <h2>{projects[detailProject].name}</h2>
          <p className={`pdlead${language === "ar" ? " arabic-text" : ""}`} dir={language === "ar" ? "rtl" : "ltr"} lang={language}>{projects[detailProject].description[language]}</p>
          <div className="pdv"><img src={projects[detailProject].image} alt={`${projects[detailProject].name} project screenshot`} /></div>
          <div className="pdsec">
            <div><h3 dir={language === "ar" ? "rtl" : "ltr"} lang={language} className={language === "ar" ? "arabic-text" : undefined}>{language === "en" ? "About this project" : "عن المشروع"}</h3><p className={language === "ar" ? "arabic-text" : undefined} dir={language === "ar" ? "rtl" : "ltr"} lang={language}>{projects[detailProject].description[language]}</p></div>
            <div><h3 dir={language === "ar" ? "rtl" : "ltr"} lang={language} className={language === "ar" ? "arabic-text" : undefined}>{language === "en" ? "Live website" : "الموقع المباشر"}</h3><p className={language === "ar" ? "arabic-text" : undefined} dir={language === "ar" ? "rtl" : "ltr"} lang={language}>{language === "en" ? "Open the deployed project to explore the full website." : "افتح الموقع المنشور لاستكشاف المشروع بالكامل."}</p></div>
          </div>
          <div className="btns">
            <a className="btn pri" href={projects[detailProject].live} target="_blank" rel="noopener noreferrer"><LocalText language={language}>{t.livePreview}</LocalText></a>
          </div>
          <button className="nx" type="button" onClick={(event) => openProjectDetail((detailProject + 1) % projects.length, event.currentTarget)}>
            <LocalText language={language}>{language === "en" ? "Next" : "التالي"}</LocalText>: {projects[(detailProject + 1) % projects.length].name}
          </button>
        </div>}
      </div>
    </>
  );
}

export default App;
