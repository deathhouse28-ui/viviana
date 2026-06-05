gsap.registerPlugin(ScrollTrigger);

/* ── Helpers ────────────────────────────────── */
const featIcons = {
  "Wi-Fi": "fa-wifi", "Паркинг": "fa-car",
  "Тераса": "fa-umbrella-beach", "Барбекю": "fa-fire", "Балкон": "fa-door-open"
};

function makeCard(p) {
  const card = document.createElement("a");
  card.href = `property.html?id=${p.id}`;
  card.className = "prop-card";
  card.dataset.type = p.type;

  const thumb = p.images.length
    ? `<img src="${p.images[0]}" alt="${p.name}" class="prop-card-img" loading="lazy">`
    : `<div class="prop-card-placeholder" style="background:${p.gradient}">
         <i class="fas fa-camera prop-card-icon"></i>
         <span>Снимките идват скоро</span>
       </div>`;

  const feats = p.features.slice(0, 4).map(f =>
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
      <p class="prop-card-desc">${p.description.substring(0, 90)}…</p>
      <div class="prop-card-feats">${feats}</div>
      <div class="prop-card-footer">
        <span class="prop-card-price">от <strong>${COMPLEX.pricing.withoutBreakfast}€</strong>/нощ</span>
        <span class="prop-card-link">Виж повече <i class="fas fa-arrow-right"></i></span>
      </div>
    </div>`;
  return card;
}

/* ── Build grid ─────────────────────────────── */
function buildGrid(filter = "all") {
  const grid = document.getElementById("roomsGrid");
  const meta = document.getElementById("roomsMeta");
  grid.innerHTML = "";

  const filtered = filter === "all"
    ? COMPLEX.properties
    : COMPLEX.properties.filter(p => p.type === filter);

  const label = filter === "villa" ? "вили" : filter === "studio" ? "студиа" : "имота";
  meta.textContent = `Показват се ${filtered.length} ${label}`;

  filtered.forEach(p => grid.appendChild(makeCard(p)));

  gsap.from(".prop-card", {
    opacity: 0, y: 50,
    stagger: 0.07, duration: 0.6, ease: "power3.out"
  });
}

/* ── Filter tabs ────────────────────────────── */
document.querySelectorAll(".filter-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    buildGrid(tab.dataset.filter);
  });
});

/* ── 3D card tilt ───────────────────────────── */
function initTilt() {
  if (window.matchMedia("(hover: none)").matches) return;
  document.querySelectorAll(".prop-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
      const y = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
      gsap.to(card, { rotateY: x * 10, rotateX: -y * 8,
        transformPerspective: 900, duration: 0.3, ease: "power2.out" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "elastic.out(1,.8)" });
    });
  });
}

/* ── Nav ────────────────────────────────────── */
const nav = document.getElementById("nav");
ScrollTrigger.create({
  start: "top -60",
  onUpdate: self => nav.classList.toggle("nav-scrolled", self.progress > 0)
});
document.getElementById("navBurger").addEventListener("click", function () {
  this.classList.toggle("open");
  document.getElementById("navMobile").classList.toggle("open");
});

/* ── Page banner entrance ───────────────────── */
gsap.from(".page-banner-content > *", {
  opacity: 0, y: 30, stagger: 0.15, duration: 0.8, ease: "power3.out", delay: 0.2
});

/* ── Init ───────────────────────────────────── */
buildGrid();
setTimeout(initTilt, 300);
