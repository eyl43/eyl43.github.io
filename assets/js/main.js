/* ===========================
   MAIN.JS — Brennan Flannery Personal Site
=========================== */

// ===== NAV SCROLL EFFECT =====
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

// Mobile nav toggle
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== ACTIVE NAV LINK =====
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 80;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (scrollY >= top && scrollY < top + height) {
      document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
      navLink?.classList.add('active');
    }
  });
}

// ===== PUBLICATION TABS =====
document.querySelectorAll('.pub-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.pub-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.pub-group').forEach(g => g.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

// ===== LIGHTBOX =====
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox?.querySelector('.lightbox-img');
const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.dataset.src;
    const caption = item.dataset.caption;
    if (lightboxImg && lightboxCaption && lightbox) {
      lightboxImg.src = src;
      lightboxCaption.textContent = caption;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox?.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== FADE-IN OBSERVER =====
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// ===== DUPLICATE GALLERY ITEMS (infinite scroll) =====
const track = document.querySelector('.gallery-track');
if (track) {
  const items = track.innerHTML;
  track.innerHTML = items + items; // duplicate for seamless loop
}

// ===== SMOOTH HERO PARALLAX =====
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (heroBg) {
    const y = window.scrollY * 0.3;
    heroBg.style.transform = `translateY(${y}px)`;
  }
}, { passive: true });
