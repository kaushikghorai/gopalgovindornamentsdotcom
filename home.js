/* ========================================
   GOPAL GOVIND ORNAMENTS — Home Page JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts('all');
  initHomeTabs();
  renderTestimonials();
  initCounters();
  initContactForm();
  renderHomeFAQ();
  initLookbook();
  initStyleQuiz();
  initHeroParticles();
  initGoldRateFlicker();
  initWishlistState();
});

// ── Product Pool ──
function getFeaturedProducts(category) {
  if (category === 'all') {
    const necklaces  = products.filter(p => p.category === 'necklace').slice(0, 2);
    const earrings   = products.filter(p => p.category === 'earrings').slice(0, 2);
    const bangles    = products.filter(p => p.category === 'bangals').slice(0, 2);
    const rings      = products.filter(p => p.category === 'rings').slice(0, 2);
    const result = [];
    const max = Math.max(necklaces.length, earrings.length, bangles.length, rings.length);
    for (let i = 0; i < max; i++) {
      if (necklaces[i])  result.push(necklaces[i]);
      if (earrings[i])   result.push(earrings[i]);
      if (bangles[i])    result.push(bangles[i]);
      if (rings[i])      result.push(rings[i]);
    }
    return result.slice(0, 8);
  }
  return products.filter(p => p.category === category).slice(0, 8);
}

// ── Render Featured Products ──
function renderFeaturedProducts(category) {
  const grid = document.getElementById('featured-products-grid');
  if (!grid) return;

  const featured = getFeaturedProducts(category);

  grid.style.opacity = '0';
  grid.style.transform = 'translateY(10px)';
  grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

  setTimeout(() => {
    grid.innerHTML = featured.map((product, index) => {
      let badge = null;
      if (index === 0) badge = { type: 'badge-popular', label: 'Popular' };
      else if (index === featured.length - 1) badge = { type: 'badge-new', label: 'New' };
      return createProductCardHTMLWithWishlist(product, index, badge);
    }).join('');

    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';

    grid.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 60);
    });

    // Re-attach wishlist listeners
    grid.querySelectorAll('.product-wishlist-btn').forEach(btn => {
      const id = btn.dataset.id;
      if (isWishlisted(id)) btn.classList.add('wishlisted');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(id, btn);
      });
    });
  }, 300);
}

// ── Create product card HTML with wishlist button ──
function createProductCardHTMLWithWishlist(product, index, badge) {
  const waMsg = encodeURIComponent(
    `Hello Gopal Govind Ornaments! 👋\n\nI'm interested in:\n*${product.name}*\nCategory: ${product.category}\n\nPlease share more details and pricing. Thank you! 🙏`
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;
  const catLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return `
    <div class="product-card animate-on-scroll" style="transition-delay:${index * 0.05}s">
      <a href="product.html?id=${product.id}" class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        <div class="product-category-badge">${catLabel}</div>
        ${badge ? `<div class="product-badge ${badge.type}">${badge.label}</div>` : ''}
        <div class="product-quick-view-overlay">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          Quick View
        </div>
      </a>
      <button class="product-wishlist-btn" data-id="${product.id}" aria-label="Add to wishlist">
        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
      <div class="product-info">
        <div class="product-name">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </div>
        <div class="product-description" style="font-size:0.8rem; color:var(--text-muted); margin-bottom:6px;">
          <span class="weight-pill light">${product.weightLight}</span>
          <span class="weight-pill medium">${product.weightMedium}</span>
          <span class="weight-pill premium">${product.weightPremium}</span>
        </div>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-label">Starting weight</span>
            ${product.weightLight}
          </div>
          <a href="${waLink}" target="_blank" rel="noopener" class="btn-whatsapp">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Enquire
          </a>
        </div>
      </div>
    </div>
  `;
}

// ── Homepage Filter Tabs ──
function initHomeTabs() {
  const tabs = document.querySelectorAll('.home-filter-tab');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderFeaturedProducts(tab.dataset.category);
    });
  });
}

// ── WISHLIST ──
function getWishlist() {
  try { return JSON.parse(localStorage.getItem('ggo_wishlist') || '[]'); }
  catch { return []; }
}
function saveWishlist(list) {
  localStorage.setItem('ggo_wishlist', JSON.stringify(list));
}
function isWishlisted(id) {
  return getWishlist().includes(String(id));
}
function toggleWishlist(id, btn) {
  let list = getWishlist();
  const sid = String(id);
  if (list.includes(sid)) {
    list = list.filter(x => x !== sid);
    btn.classList.remove('wishlisted');
    btn.title = 'Add to wishlist';
  } else {
    list.push(sid);
    btn.classList.add('wishlisted');
    btn.title = 'Remove from wishlist';
    // Heart pop animation
    btn.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.5)' },
      { transform: 'scale(1)' }
    ], { duration: 350, easing: 'cubic-bezier(0.34,1.56,0.64,1)' });
  }
  saveWishlist(list);
}
function initWishlistState() {
  document.querySelectorAll('.product-wishlist-btn').forEach(btn => {
    if (isWishlisted(btn.dataset.id)) btn.classList.add('wishlisted');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleWishlist(btn.dataset.id, btn);
    });
  });
}

// ── Render Testimonials ──
let currentTestimonial = 0;
let testimonialInterval;

function renderTestimonials() {
  const track = document.getElementById('testimonial-track');
  const dotsContainer = document.getElementById('testimonial-dots');
  if (!track || !dotsContainer) return;

  const homeTestimonials = testimonials.slice(0, 5);

  track.innerHTML = homeTestimonials.map(t => `
    <div class="testimonial-slide">
      <div class="testimonial-card-inner">
        <div class="testimonial-quote-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
          </svg>
        </div>
        <div class="testimonial-stars">
          ${'<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'.repeat(t.rating)}
        </div>
        <p class="testimonial-quote">${t.text}</p>
        <div class="testimonial-divider"></div>
        <h4 class="testimonial-author">${t.name}</h4>
        <div class="testimonial-location">${t.location}</div>
      </div>
    </div>
  `).join('');

  dotsContainer.innerHTML = homeTestimonials.map((_, i) => `
    <button class="testimonial-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to testimonial ${i + 1}"></button>
  `).join('');

  const dots = dotsContainer.querySelectorAll('.testimonial-dot');
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      goToTestimonial(parseInt(e.target.dataset.index), track, dots);
      resetTestimonialInterval(track, dots, homeTestimonials.length);
    });
  });

  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  if (prevBtn) prevBtn.addEventListener('click', () => {
    let prev = currentTestimonial - 1;
    if (prev < 0) prev = homeTestimonials.length - 1;
    goToTestimonial(prev, track, dots);
    resetTestimonialInterval(track, dots, homeTestimonials.length);
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    let next = currentTestimonial + 1;
    if (next >= homeTestimonials.length) next = 0;
    goToTestimonial(next, track, dots);
    resetTestimonialInterval(track, dots, homeTestimonials.length);
  });

  let touchStartX = 0;
  track.parentElement.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  track.parentElement.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 50) {
      let next = dx < 0 ? currentTestimonial + 1 : currentTestimonial - 1;
      if (next < 0) next = homeTestimonials.length - 1;
      if (next >= homeTestimonials.length) next = 0;
      goToTestimonial(next, track, dots);
      resetTestimonialInterval(track, dots, homeTestimonials.length);
    }
  }, { passive: true });

  startTestimonialInterval(track, dots, homeTestimonials.length);
}

function goToTestimonial(index, track, dots) {
  currentTestimonial = index;
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(d => d.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
}

function startTestimonialInterval(track, dots, total) {
  testimonialInterval = setInterval(() => {
    let next = currentTestimonial + 1;
    if (next >= total) next = 0;
    goToTestimonial(next, track, dots);
  }, 5500);
}

function resetTestimonialInterval(track, dots, total) {
  clearInterval(testimonialInterval);
  startTestimonialInterval(track, dots, total);
}

// ── Hero Stats Counters ──
function initCounters() {
  const heroObserver = new IntersectionObserver(
    (entries) => { entries.forEach(entry => { if (entry.isIntersecting) { animateCounters(); heroObserver.unobserve(entry.target); } }); },
    { threshold: 0.5 }
  );
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) heroObserver.observe(heroStats);
}

function animateCounters() {
  document.querySelectorAll('.hero-stat-number').forEach(counter => {
    const text = counter.textContent;
    const number = parseInt(text);
    if (isNaN(number)) return;
    const suffix = text.replace(/[0-9]/g, '');
    let current = 0;
    const increment = Math.ceil(number / 60);
    const stepTime = 2000 / (number / increment);
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) { current = number; clearInterval(timer); }
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
    const name     = document.getElementById('contact-name').value.trim();
    const phone    = document.getElementById('contact-phone').value.trim();
    const interest = document.getElementById('contact-interest').value;
    const message  = document.getElementById('contact-message').value.trim();
    const whatsappMessage = `Hello ${STORE_NAME}! 👋\n\n📋 *New Inquiry*\n\n👤 Name: ${name}\n📱 Phone: ${phone}\n💎 Interested In: ${interest}\n\n💬 Message:\n${message}\n\nPlease get back to me at your earliest convenience. Thank you! 🙏`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    form.reset();
  });
}

// ── FAQ Accordion (Homepage) ──
function renderHomeFAQ() {
  const container = document.getElementById('home-faq-list');
  if (!container || typeof faqs === 'undefined') return;

  container.innerHTML = faqs.map((faq, i) => `
    <div class="faq-item" id="faq-item-${i}">
      <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}" id="faq-btn-${i}">
        <span class="faq-question-text">${faq.question}</span>
        <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
      <div class="faq-answer" id="faq-answer-${i}" role="region" aria-labelledby="faq-btn-${i}">
        <div class="faq-answer-inner">${faq.answer}</div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      container.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      // Open this one if it was closed
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ── Bridal Lookbook Carousel ──
function initLookbook() {
  const wrapper = document.getElementById('lookbook-wrapper');
  const track   = document.getElementById('lookbook-track');
  const prevBtn = document.getElementById('lookbook-prev');
  const nextBtn = document.getElementById('lookbook-next');
  const dotsEl  = document.getElementById('lookbook-dots');
  if (!wrapper || !track) return;

  const slides = track.querySelectorAll('.lookbook-slide');
  const total = slides.length;
  let current = 0;
  let autoScrollTimer = null;

  function getVisibleCount() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function getMax() {
    return Math.max(0, total - getVisibleCount());
  }

  function renderDots() {
    const max = getMax();
    dotsEl.innerHTML = Array.from({ length: max + 1 }, (_, i) =>
      `<button class="lookbook-dot ${i === current ? 'active' : ''}" data-i="${i}" aria-label="Go to slide ${i + 1}"></button>`
    ).join('');
    
    dotsEl.querySelectorAll('.lookbook-dot').forEach(d => 
      d.addEventListener('click', () => goTo(parseInt(d.dataset.i)))
    );
  }

  function goTo(n) {
    const max = getMax();
    // Wrap around for auto-scroll
    if (n > max) n = 0;
    if (n < 0) n = max;
    
    current = Math.max(0, Math.min(n, max));
    const slideW = slides[0].getBoundingClientRect().width + 24; // 24px gap
    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform = `translateX(-${current * slideW}px)`;
    
    const dots = dotsEl.querySelectorAll('.lookbook-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    
    resetAutoScroll();
  }

  function startAutoScroll() {
    stopAutoScroll();
    autoScrollTimer = setInterval(() => {
      goTo(current + 1);
    }, 3500); // Auto scroll every 3.5s
  }

  function stopAutoScroll() {
    if (autoScrollTimer) clearInterval(autoScrollTimer);
  }

  function resetAutoScroll() {
    startAutoScroll();
  }

  prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

  // Drag support
  let isDragging = false, startX = 0, startTranslate = 0;

  wrapper.addEventListener('mousedown', e => {
    isDragging = true;
    stopAutoScroll();
    startX = e.clientX;
    const m = track.style.transform.match(/-?[\d.]+/);
    startTranslate = m ? parseFloat(m[0]) : 0;
    track.style.transition = 'none';
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    track.style.transform = `translateX(${startTranslate + dx}px)`;
  });

  window.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 60) {
      goTo(dx < 0 ? current + 1 : current - 1);
    } else {
      goTo(current);
    }
  });

  // Touch support
  wrapper.addEventListener('touchstart', e => {
    stopAutoScroll();
    startX = e.touches[0].clientX;
    const m = track.style.transform.match(/-?[\d.]+/);
    startTranslate = m ? parseFloat(m[0]) : 0;
    track.style.transition = 'none';
  }, { passive: true });

  wrapper.addEventListener('touchend', e => {
    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
    else goTo(current);
  }, { passive: true });

  // Pause on hover
  wrapper.addEventListener('mouseenter', stopAutoScroll);
  wrapper.addEventListener('mouseleave', startAutoScroll);

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      renderDots();
      goTo(current);
    }, 150);
  });

  // Init
  renderDots();
  startAutoScroll();
}

// ── Style Quiz ──
function initStyleQuiz() {
  const answers = { step1: null, step2: null, step3: null };

  function setupStep(stepNum, nextBtn, backBtn) {
    const optionsEl = document.getElementById(`quiz-options-${stepNum}`);
    if (!optionsEl) return;

    optionsEl.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', () => {
        optionsEl.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        answers[`step${stepNum}`] = opt.dataset.value;
        if (nextBtn) nextBtn.disabled = false;
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (!answers[`step${stepNum}`]) return;
        showStep(stepNum + 1);
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => showStep(stepNum - 1));
    }
  }

  function showStep(n) {
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    if (n > 3) {
      showResult();
    } else {
      const el = document.getElementById(`quiz-step-${n}`);
      if (el) el.classList.add('active');
    }
  }

  function showResult() {
    const result = document.getElementById('quiz-result');
    const titleEl = document.getElementById('quiz-result-title');
    const descEl = document.getElementById('quiz-result-desc');
    const catEl = document.getElementById('quiz-result-category');
    const linkEl = document.getElementById('quiz-result-link');

    // Determine recommendation
    let collection = 'necklace', catName = 'Necklace', title, desc;
    const s3 = answers.step3;

    if (s3 === 'kundan') {
      catName = 'Jadau Kundan'; collection = 'necklace';
      title = 'You\'re a Kundan Royalist! 👑';
      desc = 'Your soul craves opulence. Our Jadau Kundan collection — with polki diamonds and meenakari enamel — is your perfect statement.';
    } else if (s3 === 'gemstone') {
      catName = 'Gemstone Jewellery'; collection = 'earrings';
      title = 'You\'re a Gemstone Enthusiast! 💎';
      desc = 'Vibrant, certified rubies, sapphires and emeralds set in gold — our gemstone collection will take your breath away.';
    } else if (s3 === 'antique') {
      catName = 'Antique Jewellery'; collection = 'bangals';
      title = 'You\'re a Heritage Lover! 🏺';
      desc = 'Our antique-finish oxidized collection channels centuries of Indian craftsmanship with temple motifs and timeless patina.';
    } else {
      catName = 'Gold Jewellery'; collection = 'necklace';
      title = 'You\'re a Classic Gold Connoisseur! 🪙';
      desc = 'Pure, hallmarked 22K gold in timeless designs — our gold collection is crafted for those who appreciate the real thing.';
    }

    if (catEl) catEl.textContent = `Your Match: ${catName}`;
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (linkEl) linkEl.href = `collections.html?category=${collection}`;

    result && result.classList.add('active');
  }

  setupStep(1, document.getElementById('quiz-next-1'), null);
  setupStep(2, document.getElementById('quiz-next-2'), document.getElementById('quiz-back-2'));
  setupStep(3, document.getElementById('quiz-next-3'), document.getElementById('quiz-back-3'));

  const restartBtn = document.getElementById('quiz-restart');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      answers.step1 = answers.step2 = answers.step3 = null;
      document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      document.querySelectorAll('.quiz-btn-next').forEach(b => b.disabled = true);
      showStep(1);
    });
  }
}

// ── Hero Particle Canvas ──
function initHeroParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 55;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const goldColors = [
    'rgba(212,160,23,',
    'rgba(240,208,96,',
    'rgba(184,134,11,',
    'rgba(245,224,122,'
  ];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      color: goldColors[Math.floor(Math.random() * goldColors.length)],
      alpha: Math.random() * 0.5 + 0.1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.1,
      pulse: Math.random() * Math.PI * 2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.02;
      const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

      // Wrap around edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${a})`;
      ctx.fill();

      // Optional: sparkle cross on larger particles
      if (p.r > 1.5) {
        ctx.beginPath();
        ctx.moveTo(p.x - p.r * 2, p.y);
        ctx.lineTo(p.x + p.r * 2, p.y);
        ctx.moveTo(p.x, p.y - p.r * 2);
        ctx.lineTo(p.x, p.y + p.r * 2);
        ctx.strokeStyle = `${p.color}${a * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
    requestAnimationFrame(draw);
  }

  draw();
}

// ── Live Gold Rate (Real API Integration) ──
async function initGoldRateFlicker() {
  const r22El = document.getElementById('rate-22k');
  const r24El = document.getElementById('rate-24k');
  const c22El = document.getElementById('change-22k');
  const c24El = document.getElementById('change-24k');
  if (!r22El) return;

  // Fallback / Base values in case API fails
  let base22 = 6842;
  let base24 = 7461;

  try {
    const response = await fetch('https://api.gold-api.com/price/XAU/INR');
    if (response.ok) {
      const data = await response.json();
      // data.price is the international spot price per Troy Ounce in INR.
      // 1 Troy Ounce = 31.1034768 grams.
      const spotPricePerGram24k = data.price / 31.1034768;
      
      // Indian retail market premium (Import Duty + GST + Local Premium)
      // Historical average markup is around 15.85% over international spot price
      const INDIAN_MARKET_PREMIUM = 1.1585; 
      
      const retailPricePerGram24k = spotPricePerGram24k * INDIAN_MARKET_PREMIUM;
      // 22K is mathematically 22/24 parts of 24K gold
      const retailPricePerGram22k = retailPricePerGram24k * (22 / 24);

      base24 = Math.round(retailPricePerGram24k);
      base22 = Math.round(retailPricePerGram22k);
    }
  } catch (error) {
    console.warn('Failed to fetch live gold rate, using fallback prices:', error);
  }

  function flicker() {
    // Add a tiny random fluctuation (± 3 to 10 INR) to simulate live market feel
    const delta22 = Math.floor((Math.random() - 0.48) * 8);
    const delta24 = Math.floor((Math.random() - 0.48) * 9);
    const new22 = base22 + delta22;
    const new24 = base24 + delta24;

    r22El.textContent = `₹${new22.toLocaleString('en-IN')}`;
    r24El.textContent = `₹${new24.toLocaleString('en-IN')}`;

    const pct22 = ((delta22 / base22) * 100).toFixed(2);
    const pct24 = ((delta24 / base24) * 100).toFixed(2);

    c22El.textContent = `${delta22 >= 0 ? '▲' : '▼'} ${Math.abs(pct22)}%`;
    c22El.className = `gold-rate-change${delta22 < 0 ? ' down' : ''}`;
    c24El.textContent = `${delta24 >= 0 ? '▲' : '▼'} ${Math.abs(pct24)}%`;
    c24El.className = `gold-rate-change${delta24 < 0 ? ' down' : ''}`;

    setTimeout(flicker, 8000 + Math.random() * 4000);
  }
  
  // Set initial values and start slight flicker
  flicker();
}


function renderTestimonials() {
  const track = document.getElementById('testimonial-track');
  const dotsContainer = document.getElementById('testimonial-dots');
  if (!track || !dotsContainer) return;

  const homeTestimonials = testimonials.slice(0, 5);

  track.innerHTML = homeTestimonials.map(t => `
    <div class="testimonial-slide">
      <div class="testimonial-card-inner">
        <div class="testimonial-quote-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
          </svg>
        </div>
        <div class="testimonial-stars">
          ${'<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'.repeat(t.rating)}
        </div>
        <p class="testimonial-quote">${t.text}</p>
        <div class="testimonial-divider"></div>
        <h4 class="testimonial-author">${t.name}</h4>
        <div class="testimonial-location">${t.location}</div>
      </div>
    </div>
  `).join('');

  dotsContainer.innerHTML = homeTestimonials.map((_, i) => `
    <button class="testimonial-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to testimonial ${i + 1}"></button>
  `).join('');

  // Dot click events
  const dots = dotsContainer.querySelectorAll('.testimonial-dot');
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      goToTestimonial(index, track, dots);
      resetTestimonialInterval(track, dots, homeTestimonials.length);
    });
  });

  // Arrow nav
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      let prev = currentTestimonial - 1;
      if (prev < 0) prev = homeTestimonials.length - 1;
      goToTestimonial(prev, track, dots);
      resetTestimonialInterval(track, dots, homeTestimonials.length);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      let next = currentTestimonial + 1;
      if (next >= homeTestimonials.length) next = 0;
      goToTestimonial(next, track, dots);
      resetTestimonialInterval(track, dots, homeTestimonials.length);
    });
  }

  // Touch / swipe support
  let touchStartX = 0;
  track.parentElement.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.parentElement.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) {
        let next = currentTestimonial + 1;
        if (next >= homeTestimonials.length) next = 0;
        goToTestimonial(next, track, dots);
      } else {
        let prev = currentTestimonial - 1;
        if (prev < 0) prev = homeTestimonials.length - 1;
        goToTestimonial(prev, track, dots);
      }
      resetTestimonialInterval(track, dots, homeTestimonials.length);
    }
  }, { passive: true });

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
  }, 5500);
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

    const name     = document.getElementById('contact-name').value.trim();
    const phone    = document.getElementById('contact-phone').value.trim();
    const interest = document.getElementById('contact-interest').value;
    const message  = document.getElementById('contact-message').value.trim();

    const whatsappMessage = `Hello ${STORE_NAME}! 👋\n\n📋 *New Inquiry*\n\n👤 Name: ${name}\n📱 Phone: ${phone}\n💎 Interested In: ${interest}\n\n💬 Message:\n${message}\n\nPlease get back to me at your earliest convenience. Thank you! 🙏`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    form.reset();
  });
}
