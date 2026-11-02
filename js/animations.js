/* =========================================================
   Animasi — versi vanilla JS dari interaksi GSAP/Webflow IX
   yang ada di html.pdf. Tanpa dependensi.

   data-anim="split"        → teks dipecah per huruf, opacity 0.03 → 1 ikut scroll (SplitText + ScrollTrigger scrub)
   data-anim="fade-left"    → masuk dari translateX(-20px) + fade
   data-anim="fade-up"      → masuk dari translateY(50px) + fade
   data-anim="stagger"      → anak-anaknya fade-up bergantian
   data-anim="count"        → angka menghitung naik (data-to, data-prefix, data-suffix)
   data-anim="reel"         → video/elemen membesar dari 0% → 100% saat discroll
   data-anim="parallax"     → bergerak vertikal pelan (data-speed)
   data-anim="marquee"      → loop horizontal tanpa henti (data-duration, data-direction="reverse")
   ========================================================= */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---- Split text: per huruf, dibungkus mask ---- */
  const splits = $$('[data-anim="split"]').map((el) => {
    const text = el.textContent.trim().replace(/\s+/g, " ");
    el.setAttribute("aria-label", text);
    el.textContent = "";
    const letters = [];
    text.split(" ").forEach((word, wi, arr) => {
      const w = document.createElement("span");
      w.setAttribute("aria-hidden", "true");
      w.style.cssText = "display:inline-block;white-space:nowrap";
      [...word].forEach((ch) => {
        const l = document.createElement("span");
        l.textContent = ch;
        l.style.cssText = "display:inline-block;opacity:.03;transition:opacity .25s linear";
        w.appendChild(l);
        letters.push(l);
      });
      el.appendChild(w);
      if (wi < arr.length - 1) el.appendChild(document.createTextNode(" "));
    });
    return { el, letters };
  });

  /* ---- Scroll-driven: split, reel, parallax ---- */
  const reels = $$('[data-anim="reel"]');
  const parallax = $$('[data-anim="parallax"]');
  const clamp = (v) => Math.min(1, Math.max(0, v));

  function onScroll() {
    const vh = innerHeight;
    splits.forEach(({ el, letters }) => {
      const r = el.getBoundingClientRect();
      // mulai saat atas elemen di 85% viewport, selesai saat bawahnya di 45%
      const p = reduce ? 1 : clamp((vh * 0.85 - r.top) / (vh * 0.85 - vh * 0.45 + r.height));
      const lit = Math.floor(p * letters.length);
      letters.forEach((l, i) => (l.style.opacity = i < lit ? 1 : 0.03));
    });
    reels.forEach((el) => {
      const sec = el.parentElement.getBoundingClientRect();
      const p = reduce ? 1 : clamp((vh - sec.top) / (vh + sec.height * 0.25));
      const s = 0.2 + p * 0.8;
      el.style.width = s * 100 + "%";
      el.style.height = s * 100 + "%";
    });
    parallax.forEach((el) => {
      if (reduce) return;
      const r = el.parentElement.getBoundingClientRect();
      const speed = parseFloat(el.dataset.speed || 0.3);
      el.style.transform = `translate3d(0, ${-r.top * speed}px, 0)`;
    });
  }
  let ticking = false;
  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); }
  }, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  /* ---- Reveal on enter (fade-left, fade-up, stagger, count) ---- */
  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  const prep = (el, from) => {
    el.style.opacity = 0;
    el.style.transform = from;
    el.style.transition = `opacity .8s ${ease}, transform .8s ${ease}`;
  };
  const show = (el, delay = 0) => {
    el.style.transitionDelay = delay + "s";
    el.style.opacity = 1;
    el.style.transform = "none";
  };

  const reveal = [];
  if (!reduce) {
    $$('[data-anim="fade-left"]').forEach((el) => { prep(el, "translate3d(-20px,0,0)"); reveal.push(el); });
    $$('[data-anim="fade-up"]').forEach((el) => { prep(el, "translate3d(0,50px,0)"); reveal.push(el); });
    $$('[data-anim="stagger"]').forEach((el) => { [...el.children].forEach((c) => prep(c, "translate3d(0,50px,0)")); reveal.push(el); });
  }
  $$('[data-anim="count"]').forEach((el) => reveal.push(el));

  function countUp(el) {
    const to = parseFloat(el.dataset.to), pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
    if (reduce) { el.textContent = pre + to + suf; return; }
    const t0 = performance.now(), dur = 1600;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + Math.round(to * e) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target: el }) => {
      if (!isIntersecting) return;
      const a = el.dataset.anim;
      if (a === "stagger") [...el.children].forEach((c, i) => show(c, i * 0.1));
      else if (a === "count") countUp(el);
      else show(el);
      io.unobserve(el);
    });
  }, { threshold: 0.15 });
  reveal.forEach((el) => io.observe(el));

  /* ---- Marquee ---- */
  $$('[data-anim="marquee"]').forEach((track) => {
    track.innerHTML += track.innerHTML; // duplikat isi agar loop mulus
    if (reduce) return;
    track.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], {
      duration: parseFloat(track.dataset.duration || 30) * 1000,
      iterations: Infinity,
      direction: track.dataset.direction === "reverse" ? "reverse" : "normal", // data-direction="reverse" → bergerak ke kanan
    });
  });

  /* ---- Replay (khusus halaman style guide) ---- */
  window.replayReveal = (root) => {
    $$("[data-anim]", root).forEach((el) => {
      const a = el.dataset.anim;
      if (a === "fade-left" || a === "fade-up") { el.style.transition = "none"; prep(el, a === "fade-left" ? "translate3d(-20px,0,0)" : "translate3d(0,50px,0)"); requestAnimationFrame(() => requestAnimationFrame(() => { el.style.transition = `opacity .8s ${ease}, transform .8s ${ease}`; show(el); })); }
      if (a === "stagger") [...el.children].forEach((c, i) => { c.style.transition = "none"; prep(c, "translate3d(0,50px,0)"); requestAnimationFrame(() => requestAnimationFrame(() => { c.style.transition = `opacity .8s ${ease}, transform .8s ${ease}`; show(c, i * 0.1); })); });
      if (a === "count") countUp(el);
    });
  };

  /* ---- Mobile menu ---- */
  $$("[data-nav-toggle]").forEach((btn) => {
    const menu = document.getElementById(btn.getAttribute("aria-controls"));
    const set = (open) => {
      btn.setAttribute("aria-expanded", open);
      menu.classList.toggle("is-open", open);
    };
    btn.addEventListener("click", () => set(btn.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { set(false); btn.focus(); }
    });
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !btn.contains(e.target)) set(false);
    });
  });

  /* ---- Tabs ---- */
  $$("[data-tabs]").forEach((group) => {
    const tabs = $$('[role="tab"]', group);
    tabs.forEach((t) => t.addEventListener("click", () => {
      tabs.forEach((x) => {
        const on = x === t;
        x.setAttribute("aria-selected", on);
        document.getElementById(x.getAttribute("aria-controls")).hidden = !on;
      });
    }));
  });
})();
