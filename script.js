/* =========================================================
   EDIT THESE DETAILS — brand config, contact, products
   ========================================================= */
const WHATSAPP_NUMBER = "YOUR_NUMBER_HERE"; // e.g. "919876543210" (country code, no + or spaces)
const WHATSAPP_MESSAGE = "Hello LISHA, I would like to discuss a lighting requirement.";

const products = [
  { name: "LED Lighting", category: "Core Range", desc: "High-efficiency LED modules built for consistent output and long service life.", image: "assets/product-led-modules.jpg" },
  { name: "Optic & Lens Systems", category: "Engineering", desc: "Precision lens arrays engineered for controlled beam and light distribution.", image: "assets/product-optics.jpg" },
  { name: "Panel Lights", category: "Core Range", desc: "Flat, even-output PCB arrays for offices and commercial ceilings.", image: "assets/product-pcb-array.jpg" },
  { name: "Downlights", category: "Core Range", desc: "Recessed lighting for clean, minimal ceilings.", image: "assets/product-4.jpg" },
  { name: "Industrial Lighting", category: "Heavy Duty", desc: "Rugged fixtures built for warehouses and factories.", image: "assets/product-5.jpg" },
  { name: "Electrical Accessories", category: "Components", desc: "Switches, drivers and fittings that complete the system.", image: "assets/product-6.jpg" },
];

const applications = ["Residential","Commercial","Retail","Hospitality","Industrial","Architectural","Office","Outdoor"];

/* ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* Loader */
  const loader = document.getElementById("loader");
  const hero = document.getElementById("hero");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
      hero.classList.add("loaded");
    }, 600);
  });

  /* Render products */
  const grid = document.getElementById("productGrid");
  grid.innerHTML = products.map(p => `
    <article class="product-card">
      <div class="product-visual">
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block';">
        <span class="ph" style="display:none">${p.category}</span>
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <a href="#contact" class="product-link">Enquire <span class="arrow">→</span></a>
      </div>
    </article>`).join("");

  /* Render applications */
  const appGrid = document.getElementById("appGrid");
  appGrid.innerHTML = applications.map(a => `<div class="app-card"><h3>${a}</h3></div>`).join("");

  /* Header scroll state */
  const header = document.getElementById("siteHeader");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  /* Mobile menu */
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.classList.toggle("open");
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  }));

  /* Scroll reveal */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal-up").forEach(el => io.observe(el));

  /* Custom cursor (desktop only) */
  if (window.matchMedia("(hover: hover)").matches) {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    let rx = 0, ry = 0, mx = 0, my = 0;
    window.addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    });
    (function loop(){ rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("a,button,input,select,textarea").forEach(el => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
  }

  /* WhatsApp button */
  const waBtn = document.getElementById("whatsappBtn");
  waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  /* Contact form */
  const form = document.getElementById("enquiryForm");
  const success = document.getElementById("formSuccess");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const required = ["fName", "fMobile", "fEmail"];
    let valid = true;
    required.forEach(id => {
      const field = document.getElementById(id);
      if (!field.value.trim()) { valid = false; field.style.borderColor = "#c94f4f"; }
      else { field.style.borderColor = ""; }
    });
    const email = document.getElementById("fEmail");
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      valid = false; email.style.borderColor = "#c94f4f";
    }
    if (!valid) {
      success.textContent = "Please fill all required fields correctly.";
      success.style.color = "#c94f4f";
      return;
    }
    success.style.color = "";
    success.textContent = "Thank you. Your enquiry has been prepared.";
    form.reset();
  });

});
