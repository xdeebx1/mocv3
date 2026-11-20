import { useEffect, useRef } from "react";
import Lenis from "lenis";
import type { Language } from "./data";

const darkBackgrounds = [
  [".hero", "#090A0D"],
  ["#about", "#090A0D"],
  ["#work", "#090A0D"],
  ["#skills", "#111318"],
  ["#certs", "#0b0c11"],
  ["#journey", "#111318"],
  ["#contact", "#0a0c15"],
] as const;

const lightBackgrounds = [
  [".hero", "#F1F0EC"],
  ["#about", "#F1F0EC"],
  ["#work", "#F1F0EC"],
  ["#skills", "#E6E4DD"],
  ["#certs", "#EDEBE5"],
  ["#journey", "#E6E4DD"],
  ["#contact", "#E8E9EF"],
] as const;

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export function usePageEffects(language: Language) {
  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === "ar" ? "rtl" : "ltr";
    document.title =
      language === "ar"
        ? "محمد عمر — المعماري الرقمي"
        : "Mohamed Omar — The Digital Architect | Junior Full Stack Developer";
  }, [language]);

  const activeLanguage = useRef(language);

  useEffect(() => {
    activeLanguage.current = language;
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    const progress = document.querySelector<HTMLElement>(".prog");
    const cursorRing = document.querySelector<HTMLElement>(".k-ring");
    const cursorDot = document.querySelector<HTMLElement>(".k-dot");
    const cursorShape = cursorRing?.querySelector<HTMLElement>(".k-shape");
    const cursorLabel = cursorRing?.querySelector<HTMLElement>(".k-lbl span");
    const canvas = document.querySelector<HTMLCanvasElement>(".trail");
    const context = canvas?.getContext("2d") ?? null;
    const distortionMap = document.querySelector<SVGElement>("#dist feDisplacementMap");
    const animatedText = new Map<HTMLElement, { interval: number; original: string }>();
    const scrambledHeadings = new WeakSet<HTMLElement>();
    const trail: Array<[number, number]> = [];
    let lenis: Lenis | undefined;
    let frame = 0;
    let lastY = window.scrollY;
    let navY = lastY;
    let scrollVelocity = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let targetX = pointerX;
    let targetY = pointerY;
    let ringX = -100;
    let ringY = -100;
    let ringVX = 0;
    let ringVY = 0;
    let previousPointerX = targetX;
    let previousPointerY = targetY;
    let smoothX = targetX;
    let smoothY = targetY;
    let hoveredShot: HTMLElement | null = null;
    let distortion = 0;
    let currentBackground = "";
    let activeMagnet: HTMLElement | null = null;
    let countFrame = 0;

    if (!reducedMotion && finePointer) {
      lenis = new Lenis({ duration: 1.15 });
      root.classList.add("lenis");
    }

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.classList.add("in");
          if (element.matches(".proj")) {
            element.querySelector(".shot")?.classList.add("in");
          }
          if (element.matches(".cert")) {
            element.querySelector(".im")?.classList.add("in");
          }
          if (element.matches(".stats")) animateStats(element);
          observer.unobserve(element);
        });
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(".rv, .proj, .cert, .sbox")
      .forEach((element) => revealObserver.observe(element));

    function animateStats(container: HTMLElement) {
      const counters = Array.from(
        container.querySelectorAll<HTMLElement>("b[data-v]"),
      );
      if (reducedMotion) {
        counters.forEach((counter) => {
          counter.textContent = String(counter.dataset.v ?? "0").padStart(2, "0");
        });
        return;
      }
      const start = performance.now();
      const update = (now: number) => {
        const progress = Math.min(1, (now - start) / 1400);
        const eased = 1 - Math.pow(1 - progress, 3);
        counters.forEach((counter) => {
          const value = Number(counter.dataset.v) || 0;
          counter.textContent = String(Math.round(value * eased)).padStart(2, "0");
        });
        if (progress < 1) countFrame = window.requestAnimationFrame(update);
      };
      countFrame = window.requestAnimationFrame(update);
    }

    const scramble = (element: HTMLElement) => {
      if (activeLanguage.current !== "en" || reducedMotion || animatedText.has(element)) return;
      const original = element.textContent ?? "";
      if (!original.trim()) return;
      const glyphs = "01#/<>_+=*";
      let progress = 0;
      const interval = window.setInterval(() => {
        element.textContent = Array.from(original)
          .map((character, index) =>
            character === " " || index < progress
              ? character
              : glyphs[Math.floor(Math.random() * glyphs.length)],
          )
          .join("");
        progress += 0.7;
        if (progress >= original.length) {
          element.textContent = original;
          window.clearInterval(interval);
          animatedText.delete(element);
        }
      }, 30);
      animatedText.set(element, { interval, original });
    };

    const scrambleObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const heading = entry.target as HTMLElement;
          if (!scrambledHeadings.has(heading)) {
            scrambledHeadings.add(heading);
            scramble(heading);
          }
          observer.unobserve(heading);
        });
      },
      { threshold: 0.7 },
    );
    document
      .querySelectorAll<HTMLElement>("h2.big,.contact h2")
      .forEach((heading) => scrambleObserver.observe(heading));

    const backgroundElements = darkBackgrounds.map(([selector]) =>
      document.querySelector<HTMLElement>(selector),
    );
    const heroElement = document.querySelector<HTMLElement>(".hero");
    const heroArch = document.querySelector<HTMLElement>(".arch .hp");
    const heroBeam = document.querySelector<HTMLElement>(".beam");
    const heroHeading = document.querySelector<HTMLElement>(".hero h1");
    const statement = document.querySelector<HTMLElement>(".stmt");
    const movingImages = Array.from(
      document.querySelectorAll<HTMLElement>(".proj .shot,.cert .im"),
    );
    const projectShots = Array.from(
      document.querySelectorAll<HTMLElement>(".proj .shot"),
    );
    const sectionHeadings = Array.from(
      document.querySelectorAll<HTMLElement>("h2.big"),
    );
    const timeline = document.querySelector<HTMLElement>(".tl");
    const marqueeRows = document.querySelectorAll<HTMLElement>(".marq .tr");

    const onPointerMove = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      targetX = event.clientX;
      targetY = event.clientY;
      pointerX = targetX;
      pointerY = targetY;

      const hero = document.querySelector<HTMLElement>(".hero");
      if (finePointer && !reducedMotion && hero) {
        hero.style.setProperty("--mx", `${event.clientX}px`);
        hero.style.setProperty("--my", `${event.clientY}px`);
      }

      const target = event.target;
      const labelTarget = target.closest<HTMLElement>("[data-cur]");
      const interactive = target.closest(
        "a,button,[role=button],input,select,summary,label",
      );
      if (finePointer && !reducedMotion) {
        root.classList.add("kc");
        root.classList.remove("k-out");
        root.classList.toggle("k-label", Boolean(labelTarget));
        root.classList.toggle("k-hover", Boolean(interactive && !labelTarget));
        root.classList.toggle(
          "k-text",
          Boolean(target.closest("p,.tl p,.about p,li") && !interactive),
        );
        if (cursorLabel) {
          cursorLabel.textContent = labelTarget?.dataset.cur ?? "";
        }
        if (cursorDot) {
          cursorDot.style.transform = `translate(${targetX}px,${targetY}px)`;
        }
      }

      const magnet = target.closest<HTMLElement>(
        ".mag,.btn,.lang,.soc a,.links a",
      );
      if (activeMagnet && activeMagnet !== magnet) activeMagnet.style.transform = "";
      activeMagnet = magnet;
      if (magnet && finePointer && !reducedMotion) {
        const rect = magnet.getBoundingClientRect();
        magnet.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.25}px,${(event.clientY - rect.top - rect.height / 2) * 0.3}px)`;
      }

      const card = target.closest<HTMLElement>(".pc,.jc,.cert,.stats div,.sk div");
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
        card.style.setProperty("--cx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--cy", `${event.clientY - rect.top}px`);
      }

      if (finePointer && !reducedMotion) {
        const tilt = target.closest<HTMLElement>(".proj .shot,.cert .im");
        if (tilt) {
          const rect = tilt.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;
          tilt.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
          tilt.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
          tilt.style.setProperty("--gx", `${x * 100}%`);
          tilt.style.setProperty("--gy", `${y * 100}%`);
        }

        const nextShot = target.closest<HTMLElement>(".proj .shot");
        if (hoveredShot !== nextShot) {
          hoveredShot?.classList.remove("dist");
          hoveredShot = nextShot;
          hoveredShot?.classList.add("dist");
        }
        if (target.closest(".hero") && hero) {
          hero.style.setProperty(
            "--px",
            String((event.clientX / window.innerWidth - 0.5) * 2),
          );
          hero.style.setProperty(
            "--py",
            String((event.clientY / window.innerHeight - 0.5) * 2),
          );
        }
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target;
      const related = event.relatedTarget;
      const leaving = (selector: string) => {
        const item = target.closest<HTMLElement>(selector);
        return item && (!(related instanceof Element) || !item.contains(related))
          ? item
          : null;
      };
      const magnet = leaving(".mag,.btn,.lang,.soc a,.links a");
      if (magnet) magnet.style.transform = "";
      if (magnet === activeMagnet) activeMagnet = null;

      const tilt = leaving(".proj .shot,.cert .im");
      if (tilt) {
        tilt.style.setProperty("--rx", "0deg");
        tilt.style.setProperty("--ry", "0deg");
      }
      if (leaving(".proj .shot")) {
        hoveredShot?.classList.remove("dist");
        hoveredShot = null;
      }
      if (leaving(".hero")) {
        const hero = document.querySelector<HTMLElement>(".hero");
        hero?.style.setProperty("--px", "0");
        hero?.style.setProperty("--py", "0");
      }
    };

    const onPointerDown = () => root.classList.add("k-down");
    const onPointerUp = () => root.classList.remove("k-down");
    const onMouseLeave = () => root.classList.add("k-out");
    const onMouseEnter = () => root.classList.remove("k-out");
    const onScrambleHover = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>(".links a,.btn,.soc a");
      if (element) scramble(element);
    };

    const update = (time: number) => {
      lenis?.raf(time);
      const y = window.scrollY;
      const height = window.innerHeight;
      const scrollable = document.documentElement.scrollHeight - height;
      if (progress) {
        progress.style.transform = `scaleX(${scrollable > 0 ? y / scrollable : 0})`;
      }
      if (Math.abs(y - navY) > 6) {
        body.classList.toggle(
          "nav-hide",
          y > navY && y > 200 && !body.classList.contains("menu-open"),
        );
        navY = y;
      }
      scrollVelocity += ((y - lastY) - scrollVelocity) * 0.12;
      lastY = y;

      const themeBackgrounds = root.dataset.theme === "light"
        ? lightBackgrounds
        : darkBackgrounds;
      for (const [index, section] of backgroundElements.entries()) {
        if (!section) continue;
        const color = themeBackgrounds[index][1];
        const rect = section.getBoundingClientRect();
        if (rect.top <= height * 0.5 && rect.bottom > height * 0.5) {
          if (currentBackground !== color) {
            body.style.background = color;
            currentBackground = color;
          }
          break;
        }
      }

      if (heroElement) {
        heroElement.style.setProperty("--hp", String(clamp(y / (heroElement.offsetHeight * 0.7))));
        smoothX += (pointerX - smoothX) * 0.07;
        smoothY += (pointerY - smoothY) * 0.07;
        if (y < height * 1.2) {
          const nx = finePointer ? smoothX / window.innerWidth - 0.5 : 0;
          const ny = finePointer ? smoothY / height - 0.5 : 0;
          if (heroArch) {
            heroArch.style.transform = `translate3d(${nx * -50}px,${ny * -30 + y * 0.18}px,0) rotate(${nx * -2}deg)`;
          }
          if (heroBeam) heroBeam.style.transform = `translate3d(${nx * 90}px,0,0) rotate(18deg)`;
          if (heroHeading) heroHeading.style.transform = `translate3d(0,${y * 0.1}px,0)`;
          heroElement.style.setProperty("--mx", `${smoothX}px`);
          heroElement.style.setProperty("--my", `${smoothY + y}px`);
          heroElement.style.setProperty("--px", String((smoothX / window.innerWidth - 0.5) * 2));
          heroElement.style.setProperty("--py", String((smoothY / height - 0.5) * 2));
          if (activeLanguage.current === "en" && finePointer) {
            heroElement.querySelectorAll<HTMLElement>(".hero h1 .ch").forEach((character) => {
              const rect = character.getBoundingClientRect();
              const distance = Math.hypot(
                targetX - (rect.left + rect.width / 2),
                targetY - (rect.top + rect.height / 2),
              );
              const amount = clamp(1 - distance / 240);
              character.style.transform = `translateY(${-amount * 30}px) scale(${1 + amount * 0.1})`;
            });
          }
        }
      }

      if (statement) {
        const rect = statement.getBoundingClientRect();
        const amount = clamp((height * 0.85 - rect.top) / (rect.height + height * 0.35));
        statement.querySelectorAll(".w").forEach((word, index, words) => {
          word.classList.toggle("lit", index < amount * words.length * 1.15);
        });
      }

      movingImages.forEach((item) => {
          const rect = item.getBoundingClientRect();
          if (rect.bottom < -100 || rect.top > height + 100) return;
          const image = item.matches(".im")
            ? item.querySelector<HTMLElement>("img")
            : item.querySelector<HTMLElement>(".mock");
          image?.style.setProperty(
            "--py",
            `${-((rect.top + rect.height / 2 - height / 2) / height) * 24}px`,
          );
      });

      sectionHeadings.forEach((title) => {
        const rect = title.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < height) {
          title.style.setProperty(
            "--hx",
            String(-clamp((rect.top - height / 2) / height, -1, 1) * 22),
          );
        }
      });

      if (timeline && timeline.offsetHeight) {
        const rect = timeline.getBoundingClientRect();
        timeline.style.setProperty(
          "--tp",
          String(clamp((height * 0.6 - rect.top) / rect.height)),
        );
      }

      const half = marqueeRows[0]?.scrollWidth / 2 || 1;
      const offset = (y * 0.5) % half;
      const skew = clamp(scrollVelocity * 0.25, -10, 10);
      marqueeRows[0]?.style.setProperty(
        "transform",
        `translate3d(${-offset}px,0,0) skewX(${skew}deg)`,
      );
      marqueeRows[1]?.style.setProperty(
        "transform",
        `translate3d(${-half + offset}px,0,0) skewX(${skew}deg)`,
      );

      ringVX += (targetX - ringX) * 0.16;
      ringVY += (targetY - ringY) * 0.16;
      ringVX *= 0.68;
      ringVY *= 0.68;
      ringX += ringVX;
      ringY += ringVY;
      if (cursorRing) cursorRing.style.transform = `translate(${ringX}px,${ringY}px)`;
      const speed = Math.hypot(ringVX, ringVY);
      if (cursorShape && !root.classList.contains("k-label") && !root.classList.contains("k-text")) {
        if (speed < 0.15) cursorShape.style.transform = "";
        else {
          const stretch = Math.min(speed * 0.035, 0.45);
          const angle = Math.atan2(ringVY, ringVX) * (180 / Math.PI);
          cursorShape.style.transform = `rotate(${angle}deg) scale(${1 + stretch},${1 - stretch * 0.45})`;
        }
      }

      const pointerSpeed = Math.hypot(targetX - previousPointerX, targetY - previousPointerY);
      previousPointerX = targetX;
      previousPointerY = targetY;
      const targetDistortion = hoveredShot
        ? clamp(pointerSpeed * 1.5 + 8, 8, 45)
        : 0;
      distortion += (targetDistortion - distortion) * 0.12;
      distortionMap?.setAttribute("scale", distortion.toFixed(1));
      if (!hoveredShot && distortion < 0.5) {
        projectShots.forEach((shot) => shot.classList.remove("dist"));
      }

      if (context && canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (y < height * 0.9) {
          trail.push([targetX, targetY]);
          if (trail.length > 22) trail.shift();
          for (let index = 1; index < trail.length; index += 1) {
            context.strokeStyle = `rgba(130,158,255,${(index / trail.length) * 0.6})`;
            context.lineWidth = (index / trail.length) * 4;
            context.beginPath();
            context.moveTo(trail[index - 1][0], trail[index - 1][1]);
            context.lineTo(trail[index][0], trail[index][1]);
            context.stroke();
          }
        } else {
          trail.length = 0;
        }
      }

      if (!reducedMotion) frame = window.requestAnimationFrame(update);
    };

    const onResize = resizeCanvas;
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("pointerover", onScrambleHover);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    if (reducedMotion) {
      document
        .querySelectorAll<HTMLElement>(".rv,.proj,.cert,.sbox")
        .forEach((element) => {
          element.classList.add("in");
          element.querySelectorAll(".shot,.im").forEach((child) => child.classList.add("in"));
        });
      document.querySelectorAll<HTMLElement>(".tl").forEach((timeline) => timeline.style.setProperty("--tp", "1"));
    } else {
      frame = window.requestAnimationFrame(update);
    }
    return () => {
      revealObserver.disconnect();
      scrambleObserver.disconnect();
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(countFrame);
      lenis?.destroy();
      root.classList.remove("kc", "k-down", "k-hover", "k-label", "k-text", "k-out", "lenis");
      body.classList.remove("nav-hide");
      body.style.background = "";
      if (activeMagnet) activeMagnet.style.transform = "";
      hoveredShot?.classList.remove("dist");
      animatedText.forEach(({ interval, original }, element) => {
        window.clearInterval(interval);
        element.textContent = original;
      });
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointerover", onScrambleHover);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);
}
