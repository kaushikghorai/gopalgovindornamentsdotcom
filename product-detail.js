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
  document.getElementById('bc-category').textContent = product.categoryLabel;
  document.getElementById('bc-product').textContent = product.name;
  
  // Main Info
  document.getElementById('pd-image').src = product.image;
  document.getElementById('pd-image').alt = product.name;
  document.getElementById('pd-badge').textContent = product.categoryLabel;
  document.getElementById('pd-name').textContent = product.name;
  document.getElementById('pd-price').textContent = product.price;
  document.getElementById('pd-description').textContent = product.description;
  
  // Specs
  document.getElementById('pd-material').textContent = product.material;
  document.getElementById('pd-craft').textContent = product.craft;
  
  // WhatsApp Button
  const waBtn = document.getElementById('pd-whatsapp-btn');
  waBtn.href = generateWhatsAppLink(product);
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
    // If no related products in the same category, show some featured products
    const fallback = products
      .filter(p => p.id !== currentProduct.id && p.featured)
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
