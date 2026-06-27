/* ========================================
   GOPAL GOVIND ORNAMENTS — Contact Page
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  renderFAQs();
});

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

// ── FAQs ──
function renderFAQs() {
  const faqList = document.getElementById('faq-list');
  if (!faqList) return;

  faqList.innerHTML = faqs.map((faq, index) => `
    <div class="faq-item">
      <button class="faq-question" id="faq-btn-${index}" aria-expanded="false" aria-controls="faq-ans-${index}">
        ${faq.question}
        <span class="faq-icon"></span>
      </button>
      <div class="faq-answer" id="faq-ans-${index}" aria-labelledby="faq-btn-${index}">
        <p>${faq.answer}</p>
      </div>
    </div>
  `).join('');

  setupFAQListeners();
}

function setupFAQListeners() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      
      // Close all other FAQs
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current FAQ
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
        item.classList.remove('active');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + "px";
        item.classList.add('active');
      }
    });
  });
}
