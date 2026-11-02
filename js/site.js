/* =========================================================
   Perilaku khusus halaman portfolio (di luar animations.js)
   - Navbar berlatar putih setelah melewati dinding foto
   - Label "[ <section> ]" di sidebar mengikuti section yang sedang dibaca
   ========================================================= */
(() => {
  const nav = document.querySelector(".nav");
  const hero = document.querySelector(".wall");
  if (!nav || !hero) return;
  const update = () => nav.classList.toggle("is-solid", hero.getBoundingClientRect().bottom <= nav.offsetHeight);
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();
})();

(() => {
  const label = document.querySelector("[data-current-section]");
  const sections = [...document.querySelectorAll(".cv-section")];
  if (!label || !sections.length) return;

  const set = (text) => {
    if (label.textContent === text) return;
    label.style.opacity = 0;
    setTimeout(() => { label.textContent = text; label.style.opacity = 1; }, 150);
  };

  // Section dianggap aktif saat melewati garis di ~40% tinggi layar
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) set(e.target.dataset.title); });
  }, { rootMargin: "-40% 0px -59% 0px" });
  sections.forEach((s) => io.observe(s));
})();
