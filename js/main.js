gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════ */
const featIcons = {
  "Wi-Fi": "fa-wifi", "Паркинг": "fa-car",
  "Тераса": "fa-umbrella-beach", "Барбекю": "fa-fire", "Балкон": "fa-door-open"
};
const isMobile = () => window.innerWidth <= 768;

/* Split element text into <span class="char"> elements */
function splitChars(el) {
  const text = el.textContent;
  el.innerHTML = [...text].map(c =>
    c === " " ? " " : `<span class="char" style="display:inline-block;">${c}</span>`
  ).join("");
  return el.querySelectorAll(".char");
}

/* ══════════════════════════════════════════════
   PRELOADER — показва се само при първо посещение
   (sessionStorage: веднъж на сесия / таб)
   ══════════════════════════════════════════════ */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const alreadyShown = sessionStorage.getItem("v_pre");

  if (alreadyShown) {
    preloader.style.display = "none";
    initAll();
    return;
  }

  sessionStorage.setItem("v_pre", "1");

  const tl = gsap.timeline({
    onComplete: () => {
      preloader.style.display = "none";
      initAll();
    }
  });
  tl.to(".preloader-progress", { width: "100%", duration: 1.2, ease: "power2.inOut" })
    .to(".preloader-inner",    { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" });
});

/* ══════════════════════════════════════════════
   BUILD AMENITIES
   ══════════════════════════════════════════════ */
function buildAmenities() {
  const grid = document.getElementById("amenitiesGrid");
  if (!grid) return;
  COMPLEX.amenities.forEach(a => {
    grid.innerHTML += `
      <div class="amenity-item">
        <div class="amenity-icon"><i class="fas ${a.icon}"></i></div>
        <div class="amenity-name">${a.name}</div>
        ${a.detail ? `<div class="amenity-detail">${a.detail}</div>` : ""}
      </div>`;
  });
}

/* ══════════════════════════════════════════════
   BUILD HORIZONTAL SCROLL CARDS
   ══════════════════════════════════════════════ */
function buildHorizontalProps() {
  const track = document.getElementById("propsTrack");
  if (!track) return;

  COMPLEX.properties.forEach(p => {
    const card = document.createElement("a");
    card.href = `property.html?id=${p.id}`;
    card.className = "prop-card horiz-card";

    const thumb = p.images.length
      ? `<img src="${p.images[0]}" alt="${p.name}" class="prop-card-img" loading="lazy">`
      : `<div class="prop-card-placeholder" style="background:${p.gradient}">
           <i class="fas fa-camera prop-card-icon"></i>
         </div>`;

    const feats = p.features.slice(0, 3).map(f =>
      `<span class="prop-feat" title="${f}"><i class="fas ${featIcons[f] || 'fa-check'}"></i></span>`
    ).join("");

    card.innerHTML = `
      <div class="prop-card-media">${thumb}</div>
      <div class="prop-card-body">
        <div class="prop-card-top">
          <span class="prop-card-type">${p.type === "villa" ? "Вила" : "Студио"}</span>
          <span class="prop-card-capacity"><i class="fas fa-user"></i> ${p.capacity}</span>
        </div>
        <h3 class="prop-card-name">${p.name}</h3>
        <div class="prop-card-feats">${feats}</div>
        <div class="prop-card-footer">
          <span class="prop-card-price">от <strong>${COMPLEX.pricing.withoutBreakfast}€</strong>/нощ</span>
          <span class="prop-card-link">Виж <i class="fas fa-arrow-right"></i></span>
        </div>
      </div>`;
    track.appendChild(card);
  });
}

/* ══════════════════════════════════════════════
   INIT ALL — called after preloader
   ══════════════════════════════════════════════ */
function initAll() {
  buildAmenities();
  buildHorizontalProps();
  // Recalculate all scroll positions after dynamic content is added
  ScrollTrigger.refresh();

  initHeroAnim();
  initRevealItems();
  initStats();
  initAmenityFlip();
  initHorizontalScroll();
  // Refresh след horizontal scroll pin — преизчислява позициите на всичко под него
  ScrollTrigger.refresh();
  initCardTilt();
  initPricing();
  initMap();
  initCta();
}

/* ══════════════════════════════════════════════
   HERO ANIMATIONS
   ══════════════════════════════════════════════ */
function initHeroAnim() {
  /* Split "Вивиана" chars — cinematic stagger */
  const goldEl = document.getElementById("heroTitleGold");
  if (goldEl) {
    const chars = splitChars(goldEl);
    gsap.from(chars, {
      opacity: 0, y: 60, rotateX: -80,
      transformPerspective: 700,
      stagger: 0.045, duration: 0.85,
      ease: "power3.out", delay: 0.5
    });
  }

  /* "Комплекс" title line — slow cinematic slide */
  gsap.from("#heroTitleTop", {
    opacity: 0, x: -50, duration: 1.1, ease: "power3.out", delay: 0.35
  });

  /* Gold underline grows */
  gsap.from(".hero-title-underline", {
    scaleX: 0, transformOrigin: "left center",
    duration: 1.4, ease: "power3.out", delay: 0.9
  });

  /* Decorative side lines sweep inward */
  gsap.from(".hero-line-left",  { x: -200, opacity: 0, duration: 1.6, ease: "power3.out", delay: 0.2 });
  gsap.from(".hero-line-right", { x:  200, opacity: 0, duration: 1.6, ease: "power3.out", delay: 0.2 });

  /* Badge, subtitle, stats, buttons — staggered reveal */
  const heroTl = gsap.timeline({ delay: 0.5 });
  heroTl
    .from(".hero-badge",        { opacity: 0, y: 24, duration: 0.7, ease: "power2.out" })
    .from(".hero-subtitle",     { opacity: 0, y: 20, duration: 0.65, ease: "power2.out" }, "-=0.3")
    .from(".hero-stat",         { opacity: 0, y: 24, stagger: 0.12, duration: 0.55 }, "-=0.25")
    .from(".hero-actions .btn", { opacity: 0, y: 20, stagger: 0.14, duration: 0.55 }, "-=0.2")
    .from(".hero-scroll",       { opacity: 0, duration: 0.7 }, "-=0.1");

  /* Cinematic depth recession on scroll */
  gsap.timeline({
    scrollTrigger: {
      trigger: ".hero", start: "top top", end: "bottom top", scrub: 2
    }
  })
  .to("#hero3d",  { scale: 0.88, opacity: 0, ease: "none" }, 0)
  .to(".hero-bg", { scale: 1.12, ease: "none" }, 0)
  .to(".hero-line-left",  { x: -120, opacity: 0, ease: "none" }, 0)
  .to(".hero-line-right", { x:  120, opacity: 0, ease: "none" }, 0);
}

/* ══════════════════════════════════════════════
   REVEAL ITEMS (section headings + about text)
   ══════════════════════════════════════════════ */
function initRevealItems() {
  gsap.utils.toArray(".reveal-item").forEach(el => {
    gsap.from(el, {
      immediateRender: false,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none"
      },
      opacity: 0, y: 42,
      duration: 0.85, ease: "power3.out"
    });
  });

  /* Gold line in About grows on scroll */
  gsap.from(".about-gold-line", {
    scrollTrigger: { trigger: ".about-gold-line", start: "top 90%" },
    scaleX: 0, transformOrigin: "left center",
    duration: 1.4, ease: "power3.out"
  });

  /* About visual collage — cinematic parallax depth */
  gsap.to(".about-frame-large", {
    scrollTrigger: { trigger: ".about-section", scrub: 2, start: "top bottom", end: "bottom top" },
    y: -55, ease: "none"
  });
  gsap.to(".about-frame-small", {
    scrollTrigger: { trigger: ".about-section", scrub: 1.2, start: "top bottom", end: "bottom top" },
    y: 40, ease: "none"
  });
}

/* ══════════════════════════════════════════════
   STATS COUNT-UP
   ══════════════════════════════════════════════ */
function initStats() {
  document.querySelectorAll(".stat-num").forEach(el => {
    const target  = parseInt(el.dataset.count);
    const suffix  = el.dataset.suffix || "";
    let triggered = false;

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (triggered) return;
        triggered = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5, ease: "power3.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          }
        });
      }
    });
  });

  /* Stats band — cinematic fade in */
  gsap.from(".stats-band", {
    scrollTrigger: { trigger: ".stats-band", start: "top 92%" },
    opacity: 0, duration: 1
  });
  gsap.from(".stat-item", {
    scrollTrigger: { trigger: ".stats-band", start: "top 92%" },
    opacity: 0, y: 36, stagger: 0.18, duration: 0.85, ease: "power3.out"
  });
}

/* ══════════════════════════════════════════════
   AMENITY CARDS — 3D FLIP
   ══════════════════════════════════════════════ */
function initAmenityFlip() {
  gsap.from("#amenitiesGrid .amenity-item", {
    immediateRender: false,
    scrollTrigger: {
      trigger: "#amenitiesGrid",
      start: "top 82%",
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    stagger: 0.09,
    duration: 0.75,
    ease: "power3.out"
  });
}

/* ══════════════════════════════════════════════
   HORIZONTAL SCROLL — properties teaser
   ══════════════════════════════════════════════ */
function initHorizontalScroll() {
  const section = document.getElementById("section-horizontal");
  const track   = document.getElementById("propsTrack");
  if (!section || !track) return;

  /* Mobile: convert to normal scroll grid */
  if (isMobile()) {
    section.classList.add("horiz-mobile");
    return;
  }

  ScrollTrigger.refresh();

  const scrollDist = track.scrollWidth - window.innerWidth + 80;

  gsap.to(track, {
    x: -scrollDist,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      pin: true,
      anticipatePin: 1,
      scrub: 1,
      start: "top top",
      end: () => "+=" + scrollDist,
      invalidateOnRefresh: true
    }
  });

  /* Title counter-parallax */
  gsap.to("#horizTitle", {
    x: scrollDist * 0.15,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      scrub: 1,
      start: "top top",
      end: () => "+=" + scrollDist,
      invalidateOnRefresh: true
    }
  });
}

/* ══════════════════════════════════════════════
   3D CARD TILT on hover
   ══════════════════════════════════════════════ */
function initCardTilt() {
  if (window.matchMedia("(hover: none)").matches) return;
  document.querySelectorAll(".prop-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
      const y = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
      gsap.to(card, {
        rotateY: x * 10, rotateX: -y * 8,
        transformPerspective: 900,
        duration: 0.3, ease: "power2.out"
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "elastic.out(1,.8)" });
    });
  });
}

/* ══════════════════════════════════════════════
   PRICING — slide from sides
   ══════════════════════════════════════════════ */
function initPricing() {
  ScrollTrigger.create({
    trigger: ".pricing-cards",
    start: "top 85%",
    onEnter: () => {
      gsap.from(".pricing-card-left",  { x: -90, opacity: 0, duration: 1.1, ease: "power3.out" });
      gsap.from(".pricing-card-right", { x:  90, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.08 });
    }
  });
  gsap.from(".pricing-note", {
    scrollTrigger: { trigger: ".pricing-note", start: "top 90%" },
    opacity: 0, y: 20, duration: 0.75
  });
}

/* ══════════════════════════════════════════════
   MAP — clip-path wipe
   ══════════════════════════════════════════════ */
function initMap() {
  gsap.from(".map-wrapper", {
    immediateRender: false,
    invalidateOnRefresh: true,
    scrollTrigger: { trigger: ".map-wrapper", start: "top 88%" },
    clipPath: "inset(100% 0% 0% 0%)",
    duration: 1.1, ease: "power3.out"
  });
}

/* ══════════════════════════════════════════════
   CTA — entrance + magnetic button
   ══════════════════════════════════════════════ */
function initCta() {
  gsap.from([".cta-title", ".cta-text", ".cta-phone-btn"], {
    immediateRender: false,         // НЕ скрива веднага — trigger поема
    invalidateOnRefresh: true,      // преизчислява позицията след horizontal scroll pin
    scrollTrigger: {
      trigger: ".cta-section",
      start: "top 78%",
      toggleActions: "play none none none"
    },
    opacity: 0, y: 50, stagger: 0.18, duration: 0.85, ease: "power3.out"
  });

  /* Magnetic hover on CTA button */
  const ctaBtn = document.querySelector(".cta-phone-btn");
  if (ctaBtn && !isMobile()) {
    ctaBtn.addEventListener("mousemove", e => {
      const r   = ctaBtn.getBoundingClientRect();
      const dx  = e.clientX - (r.left + r.width  / 2);
      const dy  = e.clientY - (r.top  + r.height / 2);
      gsap.to(ctaBtn, { x: dx * 0.25, y: dy * 0.25, duration: 0.3, ease: "power2.out" });
    });
    ctaBtn.addEventListener("mouseleave", () => {
      gsap.to(ctaBtn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,.7)" });
    });
  }
}

/* ══════════════════════════════════════════════
   NAV — scroll behavior
   ══════════════════════════════════════════════ */
const nav = document.getElementById("nav");
ScrollTrigger.create({
  start: "top -60",
  onUpdate: self => nav.classList.toggle("nav-scrolled", self.progress > 0)
});

/* ── Mobile burger ──────────────────────────── */
document.getElementById("navBurger").addEventListener("click", function () {
  this.classList.toggle("open");
  document.getElementById("navMobile").classList.toggle("open");
});
document.querySelectorAll(".nav-mobile-link, .nav-mobile-cta").forEach(a => {
  a.addEventListener("click", () => {
    document.getElementById("navBurger").classList.remove("open");
    document.getElementById("navMobile").classList.remove("open");
  });
});

/* ── Smooth scroll for # links ──────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
  });
});
