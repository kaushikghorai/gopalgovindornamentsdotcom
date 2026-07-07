/* ========================================
   GOPAL GOVIND ORNAMENTS — Product Detail Page
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const productId = getProductIdFromUrl();
  
  if (productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      renderProductDetails(product);
      renderRelatedProducts(product);
    } else {
      showError('Product not found.');
    }
  } else {
    showError('No product selected.');
  }
});

// ── Get ID from URL ──
function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const idStr = urlParams.get('id');
  return idStr ? parseInt(idStr, 10) : null;
}

// ── Render Product Details ──
function renderProductDetails(product) {
  document.title = `${product.name} — Gopal Govind Ornaments`;
  
  // Breadcrumb
  document.getElementById('bc-category').textContent = product.category;
  document.getElementById('bc-category').style.textTransform = 'capitalize';
  document.getElementById('bc-product').textContent = product.name;
  
  // Main Info
  document.getElementById('pd-image').src = product.image;
  document.getElementById('pd-image').alt = product.name;
  document.getElementById('pd-badge').textContent = product.category;
  document.getElementById('pd-badge').style.textTransform = 'capitalize';
  document.getElementById('pd-name').textContent = product.name;
  
  let weightsHTML = '';
  if (product.weightLight) weightsHTML += `<div class="spec-row"><span class="spec-label">Light Weight</span><span class="spec-value">${product.weightLight}</span></div>`;
  if (product.weightMedium) weightsHTML += `<div class="spec-row"><span class="spec-label">Medium Weight</span><span class="spec-value">${product.weightMedium}</span></div>`;
  if (product.weightPremium) weightsHTML += `<div class="spec-row"><span class="spec-label">Premium Weight</span><span class="spec-value">${product.weightPremium}</span></div>`;
  
  document.getElementById('pd-specs').innerHTML = weightsHTML;
  
  // Order Form — Weight Buttons
  const weightBtnGroup = document.getElementById('weight-btn-group');
  let selectedWeight = '';

  if (weightBtnGroup) {
    weightBtnGroup.innerHTML = '';

    const weights = [];
    if (product.weightLight)   weights.push({ label: 'Light',   range: product.weightLight,   cls: 'light' });
    if (product.weightMedium)  weights.push({ label: 'Medium',  range: product.weightMedium,  cls: 'medium' });
    if (product.weightPremium) weights.push({ label: 'Premium', range: product.weightPremium, cls: 'premium' });

    if (weights.length === 0) {
      weightBtnGroup.innerHTML = '<span style="font-size:0.85rem;color:var(--text-muted);">No weight options available</span>';
    } else {
      // Add a "Not Specified" button first
      const nsBtn = document.createElement('button');
      nsBtn.className = 'weight-btn active';
      nsBtn.type = 'button';
      nsBtn.innerHTML = '<span class="btn-weight-label">Any</span>';
      nsBtn.dataset.value = '';
      weightBtnGroup.appendChild(nsBtn);

      weights.forEach(w => {
        const btn = document.createElement('button');
        btn.className = 'weight-btn';
        btn.type = 'button';
        btn.innerHTML = `<span class="btn-weight-label">${w.label}</span><span class="btn-weight-range">${w.range}</span>`;
        btn.dataset.value = `${w.label} (${w.range})`;
        weightBtnGroup.appendChild(btn);
      });

      weightBtnGroup.querySelectorAll('.weight-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          weightBtnGroup.querySelectorAll('.weight-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedWeight = btn.dataset.value;
        });
      });
    }
  }

  const submitBtn = document.getElementById('pd-submit-order');
  if (submitBtn) {
    submitBtn.onclick = (e) => {
      e.preventDefault();
      const customizations = document.getElementById('order-custom') ? document.getElementById('order-custom').value.trim() : '';
      const link = generateWhatsAppLink(product, selectedWeight, customizations);
      window.open(link, '_blank');
    };
  }
}

// ── Render Related Products ──
function renderRelatedProducts(currentProduct) {
  const grid = document.getElementById('related-products-grid');
  if (!grid) return;

  // Find products in the same category, excluding the current one
  const related = products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 3); // Max 3 related products

  if (related.length > 0) {
    grid.innerHTML = related.map((p, index) => createProductCardHTML(p, index)).join('');
  } else {
    // If no related products in the same category, show some fallback products
    const fallback = products
      .filter(p => p.id !== currentProduct.id)
      .slice(0, 3);
    grid.innerHTML = fallback.map((p, index) => createProductCardHTML(p, index)).join('');
  }
}

// ── Error Handling ──
function showError(message) {
  const container = document.querySelector('.product-detail-grid');
  if (container) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 100px 20px;">
        <h1 style="font-family: var(--font-display); font-size: 2rem; color: var(--text-primary); margin-bottom: 20px;">Oops!</h1>
        <p style="color: var(--text-secondary); margin-bottom: 30px;">${message}</p>
        <a href="collections.html" class="btn-primary">Browse Collections</a>
      </div>
    `;
  }
}
