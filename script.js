/* ==========================================================================
   Pranav Raj — Portfolio interactions
   Vanilla JS · no dependencies · IntersectionObserver driven
   ========================================================================== */
(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  /* ---------------- Loading animation ---------------- */
  const hideLoader = () => {
    const loader = $("#loader");
    if (loader) window.setTimeout(() => loader.classList.add("is-done"), 350);
  };
  window.addEventListener("load", hideLoader);
  window.setTimeout(hideLoader, 2500); // safety net if assets stall

  /* ---------------- Footer year ---------------- */
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------------- Navigation ---------------- */
  const nav = $("#nav");
  const navLinks = $("#navLinks");
  const navToggle = $("#navToggle");

  const closeMenu = () => {
    navLinks?.classList.remove("is-open");
    navToggle?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  };

  navToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  /* ---------------- Scroll: nav state, progress bar, back-to-top ---------------- */
  const progress = $("#scrollProgress");
  const toTop = $("#toTop");

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    nav?.classList.toggle("is-scrolled", y > 20);
    toTop?.classList.toggle("is-visible", y > 600);
    if (progress) progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
  };

  let scrollScheduled = false;
  window.addEventListener(
    "scroll",
    () => {
      if (scrollScheduled) return;
      scrollScheduled = true;
      window.requestAnimationFrame(() => {
        onScroll();
        scrollScheduled = false;
      });
    },
    { passive: true }
  );
  onScroll();

  /* ---------------- Active section highlighting ---------------- */
  const sections = $$("main section[id]");
  const linkFor = (id) => $(`.nav__links a[href="#${id}"]`);

  if (sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          $$(".nav__links a").forEach((a) => a.classList.remove("is-active"));
          linkFor(entry.target.id)?.classList.add("is-active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------------- Scroll reveal ---------------- */
  const revealTargets = $$("[data-reveal]");

  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
          el.classList.add("is-visible");
          observer.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  }

  /* ---------------- Typing animation ---------------- */
  const typingEl = $("#typing");
  const phrases = [
    "Mathematics Student",
    "Competitive Programmer",
    "AI Enthusiast",
    "Community Builder",
  ];

  if (typingEl) {
    if (prefersReducedMotion) {
      typingEl.textContent = phrases[0];
    } else {
      const TYPE_MS = 85;
      const ERASE_MS = 45;
      const HOLD_MS = 1500;
      let phraseIndex = 0;
      let charIndex = 0;
      let erasing = false;

      const tick = () => {
        const phrase = phrases[phraseIndex];
        charIndex += erasing ? -1 : 1;
        typingEl.textContent = phrase.slice(0, charIndex);

        let delay = erasing ? ERASE_MS : TYPE_MS;

        if (!erasing && charIndex === phrase.length) {
          erasing = true;
          delay = HOLD_MS;
        } else if (erasing && charIndex === 0) {
          erasing = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          delay = 320;
        }

        window.setTimeout(tick, delay);
      };

      window.setTimeout(tick, 700);
    }
  }

  /* ---------------- Animated counters ---------------- */
  const counters = $$(".counter");

  const runCounter = (el) => {
    const target = Number(el.dataset.target || "0");
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (t < 1) window.requestAnimationFrame(step);
    };

    if (prefersReducedMotion) {
      el.textContent = `${target}${suffix}`;
      return;
    }
    window.requestAnimationFrame(step);
  };

  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  }

  /* ---------------- Animated skill bars ---------------- */
  const bars = $$(".bar__fill");

  if (bars.length) {
    const barObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.style.width = `${Number(el.dataset.level || "0")}%`;
          observer.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    bars.forEach((el) => barObserver.observe(el));
  }

  /* ---------------- Project card pointer glow ---------------- */
  $$(".project").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const shine = $(".project__shine", card);
      if (shine) shine.style.background =
        `radial-gradient(circle at ${x}% 0, rgba(56,189,248,0.35), transparent 70%)`;
    });
  });

  /* ---------------- Floating particles (hero canvas) ---------------- */
  const canvas = $("#particles");

  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d");
    const pointer = { x: -9999, y: -9999 };
    let particles = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(110, Math.max(35, (width * height) / 16000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.7 + 0.6,
        a: Math.random() * 0.45 + 0.25,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.a})`;
        ctx.fill();
      });

      // constellation links
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist > 120) continue;
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.14 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      // pointer halo links
      particles.forEach((p) => {
        const dist = Math.hypot(p.x - pointer.x, p.y - pointer.y);
        if (dist > 150) return;
        ctx.strokeStyle = `rgba(129, 140, 248, ${0.28 * (1 - dist / 150)})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.stroke();
      });

      frame = window.requestAnimationFrame(draw);
    };

    canvas.addEventListener("pointermove", (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    });
    canvas.addEventListener("pointerleave", () => {
      pointer.x = -9999;
      pointer.y = -9999;
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    });

    // pause the loop when the hero is off-screen to save battery/CPU
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!frame) frame = window.requestAnimationFrame(draw);
        } else {
          window.cancelAnimationFrame(frame);
          frame = 0;
        }
      });
    });

    resize();
    heroObserver.observe(canvas);
  }
})();
