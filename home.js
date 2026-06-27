/* ========================================
   GOPAL GOVIND ORNAMENTS — Home Page
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts();
  renderTestimonials();
  initCounters();
  initContactForm();
});

// ── Render Featured Products ──
function renderFeaturedProducts() {
  const grid = document.getElementById('featured-products-grid');
  if (!grid) return;

  // Show only 4 featured products
  const featured = products.filter(p => p.featured).slice(0, 4);

  grid.innerHTML = featured.map((product, index) => createProductCardHTML(product, index)).join('');
}

// ── Render Testimonials ──
let currentTestimonial = 0;
let testimonialInterval;

function renderTestimonials() {
  const track = document.getElementById('testimonial-track');
  const dotsContainer = document.getElementById('testimonial-dots');
  if (!track || !dotsContainer) return;

  // Only take first 3 testimonials for home page
  const homeTestimonials = testimonials.slice(0, 3);

  track.innerHTML = homeTestimonials.map(t => `
    <div class="testimonial-slide">
      <div class="testimonial-stars">
        ${'<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'.repeat(t.rating)}
      </div>
      <p class="testimonial-quote">${t.text}</p>
      <h4 class="testimonial-author">${t.name}</h4>
      <div class="testimonial-location">${t.location}</div>
    </div>
  `).join('');

  dotsContainer.innerHTML = homeTestimonials.map((_, i) => `
    <button class="testimonial-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to testimonial ${i + 1}"></button>
  `).join('');

  // Add event listeners to dots
  const dots = dotsContainer.querySelectorAll('.testimonial-dot');
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      goToTestimonial(index, track, dots);
      resetTestimonialInterval(track, dots, homeTestimonials.length);
    });
  });

  // Start auto-rotation
  startTestimonialInterval(track, dots, homeTestimonials.length);
}

function goToTestimonial(index, track, dots) {
  currentTestimonial = index;
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(d => d.classList.remove('active'));
  dots[index].classList.add('active');
}

function startTestimonialInterval(track, dots, total) {
  testimonialInterval = setInterval(() => {
    let next = currentTestimonial + 1;
    if (next >= total) next = 0;
    goToTestimonial(next, track, dots);
  }, 5000);
}

function resetTestimonialInterval(track, dots, total) {
  clearInterval(testimonialInterval);
  startTestimonialInterval(track, dots, total);
}

// ── Hero Stats Counters ──
function initCounters() {
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          heroObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) heroObserver.observe(heroStats);
}

function animateCounters() {
  const counters = document.querySelectorAll('.hero-stat-number');
  counters.forEach(counter => {
    const text = counter.textContent;
    const number = parseInt(text);
    if (isNaN(number)) return;

    const suffix = text.replace(/[0-9]/g, '');
    let current = 0;
    const increment = Math.ceil(number / 60);
    const duration = 2000;
    const stepTime = duration / (number / increment);

    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        current = number;
        clearInterval(timer);
      }
      counter.textContent = current + suffix;
    }, stepTime);
  });
}

// ── Contact Form ──
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const interest = document.getElementById('contact-interest').value;
    const message = document.getElementById('contact-message').value.trim();

    const whatsappMessage = `Hello ${STORE_NAME}! 👋\n\n📋 *New Inquiry*\n\n👤 Name: ${name}\n📱 Phone: ${phone}\n💎 Interested In: ${interest}\n\n💬 Message:\n${message}\n\nPlease get back to me at your earliest convenience. Thank you! 🙏`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    form.reset();
  });
}
