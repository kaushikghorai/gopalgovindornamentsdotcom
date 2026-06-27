/* ========================================
   GOPAL GOVIND ORNAMENTS — Shared Utilities
   Used across all pages
   ======================================== */

// ── Page Loader ──
function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 600);
  }, 1200);
}

// ── Theme Toggle ──
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// ── Navbar Scroll Effect ──
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ── Mobile Menu ──
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  const hamburger = document.getElementById('hamburger');
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');

  if (navLinks.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeMenu() {
  const navLinks = document.getElementById('nav-links');
  const hamburger = document.getElementById('hamburger');
  if (!navLinks) return;
  navLinks.classList.remove('active');
  hamburger.classList.remove('active');
  document.body.style.overflow = '';
}

// ── Back to Top ──
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Scroll Animations (Intersection Observer) ──
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ── Active Nav Link ──
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ── Initialize Shared ──
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initThemeToggle();
  initNavbarScroll();
  initBackToTop();
  initScrollAnimations();
  setActiveNavLink();
});
