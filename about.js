/* ========================================
   GOPAL GOVIND ORNAMENTS — About Page
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderTestimonials();
});

// ── Render Testimonials ──
let currentTestimonial = 0;
let testimonialInterval;

function renderTestimonials() {
  const track = document.getElementById('testimonial-track');
  const dotsContainer = document.getElementById('testimonial-dots');
  if (!track || !dotsContainer) return;

  // Use all testimonials on About page
  track.innerHTML = testimonials.map(t => `
    <div class="testimonial-slide">
      <div class="testimonial-stars">
        ${'<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'.repeat(t.rating)}
      </div>
      <p class="testimonial-quote">${t.text}</p>
      <h4 class="testimonial-author">${t.name}</h4>
      <div class="testimonial-location">${t.location}</div>
    </div>
  `).join('');

  dotsContainer.innerHTML = testimonials.map((_, i) => `
    <button class="testimonial-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to testimonial ${i + 1}"></button>
  `).join('');

  // Add event listeners to dots
  const dots = dotsContainer.querySelectorAll('.testimonial-dot');
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      goToTestimonial(index, track, dots);
      resetTestimonialInterval(track, dots, testimonials.length);
    });
  });

  // Start auto-rotation
  startTestimonialInterval(track, dots, testimonials.length);
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
