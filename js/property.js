gsap.registerPlugin(ScrollTrigger);

/* ── Load property from URL param ─────────────────── */
const params   = new URLSearchParams(window.location.search);
const propId   = params.get("id");
const property = COMPLEX.properties.find(p => p.id === propId);

if (!property) { window.location.href = "index.html"; }

/* ── Populate page ─────────────────────────────────── */
function populate() {
  document.title = `${property.name} – Комплекс Вивиана | Цигов Чарк`;
  document.getElementById("propName").textContent = property.name;
  document.getElementById("propType").textContent = property.type === "villa" ? "Вила" : "Студио";
  document.getElementById("propCapacity").textContent = property.capacity;
  document.getElementById("propBedrooms").textContent = property.bedrooms;
  document.getElementById("propBeds").textContent = property.beds;
  document.getElementById("propDescription").textContent = property.description;

  /* Gallery */
  const galleryInner = document.getElementById("galleryInner");
  if (property.images.length > 0) {
    property.images.forEach(src => {
      galleryInner.innerHTML += `<div class="swiper-slide"><img src="${src}" alt="${property.name}"></div>`;
    });
    new Swiper(".prop-swiper", {
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
    });
  } else {
    document.getElementById("gallery").innerHTML = `
      <div class="prop-gallery-placeholder" style="background:${property.gradient}">
        <i class="fas fa-camera"></i>
        <p>Снимките идват скоро</p>
      </div>`;
  }

  /* Features */
  const featIcons = { "Климатик": "fa-snowflake", "Wi-Fi": "fa-wifi", "Паркинг": "fa-car",
                      "Тераса": "fa-umbrella-beach", "Барбекю": "fa-fire", "Балкон": "fa-door-open" };
  const featList = document.getElementById("propFeatures");
  property.features.forEach(f => {
    featList.innerHTML += `
      <li class="prop-feature-item">
        <i class="fas ${featIcons[f] || 'fa-check'}"></i>
        <span>${f}</span>
      </li>`;
  });
}

/* ── Build complex amenities ───────────────────────── */
function buildPropAmenities() {
  const grid = document.getElementById("propAmenitiesGrid");
  if (!grid) return;
  COMPLEX.amenities.forEach(a => {
    grid.innerHTML += `
      <div class="amenity-item">
        <div class="amenity-icon"><i class="fas ${a.icon}"></i></div>
        <div class="amenity-name">${a.name}</div>
        ${a.detail ? `<div class="amenity-detail">${a.detail}</div>` : ""}
      </div>`;
  });
  gsap.from("#propAmenitiesGrid .amenity-item", {
    scrollTrigger: { trigger: "#propAmenitiesGrid", start: "top 85%", toggleActions: "play none none none" },
    rotateY: 90, opacity: 0, transformPerspective: 800,
    stagger: 0.1, duration: 0.7, ease: "power3.out"
  });
}

/* ── Entrance animations ───────────────────────────── */
function initAnimations() {
  gsap.from(".prop-header", { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" });
  gsap.from(".prop-info-card", {
    scrollTrigger: { trigger: ".prop-info-card", start: "top 90%" },
    opacity: 0, y: 30, duration: 0.7, ease: "power3.out"
  });
  gsap.from(".prop-feature-item", {
    scrollTrigger: { trigger: ".prop-features", start: "top 90%" },
    opacity: 0, x: -20, stagger: 0.07, duration: 0.5, ease: "power2.out"
  });
  gsap.from(".prop-others .prop-card", {
    scrollTrigger: { trigger: ".prop-others", start: "top 85%" },
    opacity: 0, y: 40, stagger: 0.1, duration: 0.6, ease: "power3.out"
  });
}

/* ── Nav scroll ────────────────────────────────────── */
const nav = document.getElementById("nav");
ScrollTrigger.create({
  start: "top -60",
  onUpdate: self => nav.classList.toggle("nav-scrolled", self.progress > 0)
});

/* ── Mobile burger ─────────────────────────────────── */
document.getElementById("navBurger").addEventListener("click", function () {
  this.classList.toggle("open");
  document.getElementById("navMobile").classList.toggle("open");
});

populate();
buildPropAmenities();
initAnimations();
