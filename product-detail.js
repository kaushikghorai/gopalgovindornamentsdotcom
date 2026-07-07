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
  
  // Order Form
  const weightSelect = document.getElementById('order-weight');
  if (weightSelect) {
    weightSelect.innerHTML = '<option value="" selected>Not Specified</option>';
    if (product.weightLight) weightSelect.innerHTML += `<option value="Light (${product.weightLight})">Light (${product.weightLight})</option>`;
    if (product.weightMedium) weightSelect.innerHTML += `<option value="Medium (${product.weightMedium})">Medium (${product.weightMedium})</option>`;
    if (product.weightPremium) weightSelect.innerHTML += `<option value="Premium (${product.weightPremium})">Premium (${product.weightPremium})</option>`;
  }

  const submitBtn = document.getElementById('pd-submit-order');
  if (submitBtn) {
    // Remove old event listeners by cloning if necessary, or just assign onclick
    submitBtn.onclick = (e) => {
      e.preventDefault();
      const selectedWeight = weightSelect ? weightSelect.value : '';
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
