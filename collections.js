/* ========================================
   GOPAL GOVIND ORNAMENTS — Collections Page
   ======================================== */

let currentFilters = {
  categories: [],
  materials: []
};

let currentSort = 'default';
let isListView = false;

document.addEventListener('DOMContentLoaded', () => {
  parseUrlParams();
  renderFilterOptions();
  setupFilterListeners();
  setupSortListeners();
  setupViewListeners();
  setupMobileFilterToggle();
  applyFiltersAndRender();
});

// ── Parse URL Params ──
function parseUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  if (category) {
    currentFilters.categories.push(category);
  }
}

// ── Render Filter Options ──
function renderFilterOptions() {
  const categoryContainer = document.getElementById('filter-categories');
  const materialContainer = document.getElementById('filter-materials');

  if (categoryContainer) {
    categoryContainer.innerHTML = CATEGORIES.map(cat => `
      <div class="filter-option ${currentFilters.categories.includes(cat.key) ? 'active' : ''}" data-type="categories" data-value="${cat.key}">
        <div class="filter-checkbox"></div>
        <span class="filter-label">${cat.label}</span>
        <span class="filter-count">(${products.filter(p => p.category === cat.key).length})</span>
      </div>
    `).join('');
  }

  if (materialContainer) {
    const materials = getUniqueMaterials();
    materialContainer.innerHTML = materials.map(mat => `
      <div class="filter-option ${currentFilters.materials.includes(mat) ? 'active' : ''}" data-type="materials" data-value="${mat}">
        <div class="filter-checkbox"></div>
        <span class="filter-label">${mat}</span>
        <span class="filter-count">(${products.filter(p => p.material === mat).length})</span>
      </div>
    `).join('');
  }
}

// ── Filter Logic ──
function setupFilterListeners() {
  document.querySelectorAll('.filter-option').forEach(option => {
    option.addEventListener('click', (e) => {
      const type = e.currentTarget.dataset.type;
      const value = e.currentTarget.dataset.value;

      const index = currentFilters[type].indexOf(value);
      if (index === -1) {
        currentFilters[type].push(value);
      } else {
        currentFilters[type].splice(index, 1);
      }

      // Update UI
      e.currentTarget.classList.toggle('active');

      // Update URL query params
      updateUrlParams();

      applyFiltersAndRender();
    });
  });

  const resetBtn = document.getElementById('filter-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentFilters = { categories: [], materials: [] };
      document.querySelectorAll('.filter-option').forEach(opt => opt.classList.remove('active'));
      updateUrlParams();
      applyFiltersAndRender();
    });
  }
}

function updateUrlParams() {
  const urlParams = new URLSearchParams();
  if (currentFilters.categories.length === 1) {
    urlParams.set('category', currentFilters.categories[0]);
  } else if (currentFilters.categories.length > 1) {
    // If multiple categories are supported in URL, otherwise just clear
    urlParams.delete('category'); 
  }
  
  const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
  window.history.replaceState({}, '', newUrl);
}

function applyFiltersAndRender() {
  let filtered = [...products];

  if (currentFilters.categories.length > 0) {
    filtered = filtered.filter(p => currentFilters.categories.includes(p.category));
  }

  if (currentFilters.materials.length > 0) {
    filtered = filtered.filter(p => currentFilters.materials.includes(p.material));
  }

  // Sort
  if (currentSort === 'az') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (currentSort === 'za') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  renderProductsGrid(filtered);
}

// ── Render Grid ──
function renderProductsGrid(filteredProducts) {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('collection-count');
  
  if (!grid) return;

  // Update count
  if (countEl) {
    countEl.innerHTML = `Showing <strong>${filteredProducts.length}</strong> items`;
  }

  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
        <h3 style="font-family: var(--font-display); font-size: 1.5rem; color: var(--text-primary); margin-bottom: 12px;">No products found</h3>
        <p style="color: var(--text-secondary);">Try adjusting your filters to see more results.</p>
        <button onclick="document.getElementById('filter-reset').click()" class="btn-secondary" style="margin-top: 20px; display: inline-block;">Clear Filters</button>
      </div>
    `;
    return;
  }

  grid.style.opacity = '0';
  grid.style.transform = 'translateY(10px)';

  setTimeout(() => {
    grid.innerHTML = filteredProducts.map((product, index) => createProductCardHTML(product, index)).join('');
    
    requestAnimationFrame(() => {
      grid.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      grid.style.opacity = '1';
      grid.style.transform = 'translateY(0)';
    });
  }, 200);
}

// ── Sorting ──
function setupSortListeners() {
  const sortSelect = document.getElementById('sort-select');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    applyFiltersAndRender();
  });
}

// ── View Toggle (Grid/List) ──
function setupViewListeners() {
  const gridBtn = document.getElementById('view-grid');
  const listBtn = document.getElementById('view-list');
  const grid = document.getElementById('products-grid');
  
  if (!gridBtn || !listBtn || !grid) return;

  gridBtn.addEventListener('click', () => {
    isListView = false;
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    grid.classList.remove('list-view');
  });

  listBtn.addEventListener('click', () => {
    isListView = true;
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    grid.classList.add('list-view');
  });
}

// ── Mobile Filters ──
function setupMobileFilterToggle() {
  const toggleBtn = document.getElementById('filter-toggle-mobile');
  const filterSections = document.getElementById('filter-sections');
  
  if (!toggleBtn || !filterSections) return;

  toggleBtn.addEventListener('click', () => {
    filterSections.classList.toggle('active');
  });
}
