/* ========================================
   GOPAL GOVIND ORNAMENTS — Collections Page
   ======================================== */

const PAGE_SIZE = 24; // products per "page"
let visibleCount = PAGE_SIZE;

let currentFilters = {
  categories: [],
  weights: 'all',
  search: ''
};

let currentSort = 'default';
let isListView = false;
let allFiltered = [];

document.addEventListener('DOMContentLoaded', () => {
  parseUrlParams();
  renderFilterOptions();
  setupCategoryTabs();
  setupFilterListeners();
  setupWeightFilterListeners();
  setupSearchListener();
  setupSortListeners();
  setupViewListeners();
  setupMobileFilterToggle();
  setupLoadMore();
  setupBadgeClear();
  applyFiltersAndRender();
});

// ── Parse URL Params ──
function parseUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  if (category) {
    currentFilters.categories = [category];
  }
}

// ── Render Filter Options (sidebar) ──
function renderFilterOptions() {
  const categoryContainer = document.getElementById('filter-categories');
  if (!categoryContainer) return;

  categoryContainer.innerHTML = CATEGORIES.map(cat => {
    const count = products.filter(p => p.category === cat.key).length;
    return `
      <div class="filter-option ${currentFilters.categories.includes(cat.key) ? 'active' : ''}"
           data-type="categories" data-value="${cat.key}" role="checkbox"
           aria-checked="${currentFilters.categories.includes(cat.key)}">
        <div class="filter-checkbox"></div>
        <span class="filter-label">${cat.label}</span>
        <span class="filter-count">${count}</span>
      </div>
    `;
  }).join('');
}

// ── Category Tab Bar ──
function setupCategoryTabs() {
  const tabs = document.querySelectorAll('.collections-tab');
  if (!tabs.length) return;

  // Sync tabs with URL param
  const active = currentFilters.categories[0] || 'all';
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.category === active);
    tab.setAttribute('aria-selected', tab.dataset.category === active ? 'true' : 'false');
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.category;

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      if (cat === 'all') {
        currentFilters.categories = [];
      } else {
        currentFilters.categories = [cat];
      }

      // Sync sidebar checkboxes
      document.querySelectorAll('[data-type="categories"]').forEach(opt => {
        const isActive = currentFilters.categories.includes(opt.dataset.value);
        opt.classList.toggle('active', isActive);
        opt.setAttribute('aria-checked', String(isActive));
      });

      updateUrlParams();
      visibleCount = PAGE_SIZE;
      applyFiltersAndRender();
    });
  });
}

// ── Sidebar Filter Listeners ──
function setupFilterListeners() {
  document.getElementById('filter-categories')?.addEventListener('click', (e) => {
    const option = e.target.closest('.filter-option');
    if (!option) return;

    const value = option.dataset.value;
    const index = currentFilters.categories.indexOf(value);

    if (index === -1) {
      currentFilters.categories.push(value);
    } else {
      currentFilters.categories.splice(index, 1);
    }

    option.classList.toggle('active');
    option.setAttribute('aria-checked', String(option.classList.contains('active')));

    // Sync tab bar
    syncTabsFromFilters();

    updateUrlParams();
    visibleCount = PAGE_SIZE;
    applyFiltersAndRender();
  });

  // Reset button
  document.getElementById('filter-reset')?.addEventListener('click', () => {
    currentFilters = { categories: [], weights: 'all', search: '' };

    document.querySelectorAll('.filter-option[data-type="categories"]').forEach(opt => {
      opt.classList.remove('active');
      opt.setAttribute('aria-checked', 'false');
    });
    // reset weight options
    document.querySelectorAll('.filter-option[data-type="weights"]').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.value === 'all');
    });

    const searchInput = document.getElementById('filter-search');
    if (searchInput) searchInput.value = '';

    // Reset tabs
    document.querySelectorAll('.collections-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.category === 'all');
      t.setAttribute('aria-selected', t.dataset.category === 'all' ? 'true' : 'false');
    });

    updateUrlParams();
    visibleCount = PAGE_SIZE;
    applyFiltersAndRender();
  });
}

// ── Weight Filter ──
function setupWeightFilterListeners() {
  const container = document.getElementById('filter-weights');
  if (!container) return;

  container.addEventListener('click', e => {
    const option = e.target.closest('.filter-option');
    if (!option) return;

    currentFilters.weights = option.dataset.value;

    document.querySelectorAll('[data-type="weights"]').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.value === currentFilters.weights);
    });

    visibleCount = PAGE_SIZE;
    applyFiltersAndRender();
  });
}

// ── Search Filter ──
function setupSearchListener() {
  const input = document.getElementById('filter-search');
  if (!input) return;

  let debounceTimer;
  input.addEventListener('input', e => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      currentFilters.search = e.target.value.trim().toLowerCase();
      visibleCount = PAGE_SIZE;
      applyFiltersAndRender();
    }, 250);
  });
}

// ── Sync Tab Bar from Sidebar ──
function syncTabsFromFilters() {
  const tabs = document.querySelectorAll('.collections-tab');
  const singleCat = currentFilters.categories.length === 1 ? currentFilters.categories[0] : null;

  tabs.forEach(tab => {
    const match = singleCat ? tab.dataset.category === singleCat : tab.dataset.category === 'all';
    tab.classList.toggle('active', match);
    tab.setAttribute('aria-selected', String(match));
  });
}

// ── Update URL Params ──
function updateUrlParams() {
  const urlParams = new URLSearchParams();
  if (currentFilters.categories.length === 1) {
    urlParams.set('category', currentFilters.categories[0]);
  }
  const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
  window.history.replaceState({}, '', newUrl);
}

// ── Apply Filters & Render ──
function applyFiltersAndRender() {
  let filtered = [...products];

  // Category
  if (currentFilters.categories.length > 0) {
    filtered = filtered.filter(p => currentFilters.categories.includes(p.category));
  }

  // Weight
  if (currentFilters.weights && currentFilters.weights !== 'all') {
    filtered = filtered.filter(p => {
      if (currentFilters.weights === 'light')   return !!p.weightLight;
      if (currentFilters.weights === 'medium')  return !!p.weightMedium;
      if (currentFilters.weights === 'premium') return !!p.weightPremium;
      return true;
    });
  }

  // Search
  if (currentFilters.search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(currentFilters.search) ||
      p.category.toLowerCase().includes(currentFilters.search)
    );
  }

  // Sort
  if (currentSort === 'az') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (currentSort === 'za') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  allFiltered = filtered;

  updateActiveChips();
  updateActiveBadge();
  renderProductsGrid(filtered.slice(0, visibleCount));
  updateLoadMore(filtered.length);
}

// ── Active Filter Chips ──
function updateActiveChips() {
  const container = document.getElementById('active-filter-chips');
  if (!container) return;

  const chips = [];

  currentFilters.categories.forEach(cat => {
    const label = CATEGORIES.find(c => c.key === cat)?.label || cat;
    chips.push({ label: `Category: ${label}`, remove: () => {
      currentFilters.categories = currentFilters.categories.filter(c => c !== cat);
      syncTabsFromFilters();
      updateUrlParams();
      renderFilterOptions();
      visibleCount = PAGE_SIZE;
      applyFiltersAndRender();
    }});
  });

  if (currentFilters.weights && currentFilters.weights !== 'all') {
    const wLabel = { light: 'Light weight', medium: 'Medium weight', premium: 'Premium weight' };
    chips.push({ label: wLabel[currentFilters.weights] || currentFilters.weights, remove: () => {
      currentFilters.weights = 'all';
      document.querySelectorAll('[data-type="weights"]').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.value === 'all');
      });
      visibleCount = PAGE_SIZE;
      applyFiltersAndRender();
    }});
  }

  if (currentFilters.search) {
    chips.push({ label: `"${currentFilters.search}"`, remove: () => {
      currentFilters.search = '';
      const inp = document.getElementById('filter-search');
      if (inp) inp.value = '';
      visibleCount = PAGE_SIZE;
      applyFiltersAndRender();
    }});
  }

  if (chips.length === 0) {
    container.style.display = 'none';
    container.innerHTML = '';
    return;
  }

  container.style.display = 'flex';
  container.innerHTML = chips.map((chip, i) => `
    <div class="filter-chip" data-chip-index="${i}">
      ${chip.label}
      <button class="filter-chip-remove" data-chip-index="${i}" aria-label="Remove filter">×</button>
    </div>
  `).join('');

  // Bind remove clicks
  container.querySelectorAll('.filter-chip-remove').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = parseInt(e.currentTarget.dataset.chipIndex);
      chips[idx].remove();
    });
  });
}

// ── Active Filter Badge (toolbar) ──
function updateActiveBadge() {
  const badge = document.getElementById('collection-active-badge');
  const text  = document.getElementById('collection-active-text');
  if (!badge || !text) return;

  const isFiltered = currentFilters.categories.length > 0 ||
    (currentFilters.weights && currentFilters.weights !== 'all') ||
    currentFilters.search;

  badge.style.display = isFiltered ? 'flex' : 'none';

  if (isFiltered) {
    const parts = [];
    if (currentFilters.categories.length) {
      const label = CATEGORIES.find(c => c.key === currentFilters.categories[0])?.label;
      parts.push(label || currentFilters.categories[0]);
    }
    if (currentFilters.weights !== 'all') parts.push(currentFilters.weights);
    if (currentFilters.search) parts.push(`"${currentFilters.search}"`);
    text.textContent = parts.join(' · ');
  }
}

// ── Badge Clear ──
function setupBadgeClear() {
  document.getElementById('badge-clear-btn')?.addEventListener('click', () => {
    document.getElementById('filter-reset')?.click();
  });
}

// ── Render Grid ──
function renderProductsGrid(filteredProducts, append = false) {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('collection-count');

  if (!grid) return;

  if (countEl) {
    countEl.innerHTML = `Showing <strong>${filteredProducts.length}</strong> of <strong>${allFiltered.length}</strong> items`;
  }

  if (allFiltered.length === 0) {
    grid.innerHTML = `
      <div class="collections-empty-state">
        <div class="empty-state-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            <path d="M8 11h6"/>
          </svg>
        </div>
        <h3 class="empty-state-title">No pieces found</h3>
        <p class="empty-state-text">Try adjusting your filters or search term.</p>
        <button onclick="document.getElementById('filter-reset').click()" class="btn-secondary empty-state-btn">
          Clear All Filters
        </button>
      </div>
    `;
    return;
  }

  if (!append) {
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(10px)';

    setTimeout(() => {
      grid.innerHTML = filteredProducts.map((product, index) => createProductCardHTML(product, index)).join('');

      requestAnimationFrame(() => {
        grid.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
      });

      // Staggered card entrance for all
      grid.querySelectorAll('.product-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`;
        requestAnimationFrame(() => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        });
      });
    }, 200);
  } else {
    // Append mode for infinite scroll
    const currentCount = grid.querySelectorAll('.product-card').length;
    const newProducts = filteredProducts.slice(currentCount);
    
    if (newProducts.length === 0) return;

    const temp = document.createElement('div');
    temp.innerHTML = newProducts.map((product, index) => createProductCardHTML(product, currentCount + index)).join('');
    
    const newCards = Array.from(temp.children);
    
    newCards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`;
      grid.appendChild(card);
      
      requestAnimationFrame(() => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      });
    });
  }
}


// ── Load More (Infinite Scroll) ──
let scrollObserver = null;

function updateLoadMore(total) {
  const sentinel = document.getElementById('scroll-sentinel');
  const loader   = document.getElementById('scroll-loader');
  if (!sentinel) return;
  // Show/hide the sentinel based on whether there is more to load
  sentinel.style.display = visibleCount < total ? 'block' : 'none';
  if (loader) loader.style.display = 'none';
}

function setupLoadMore() {
  const sentinel = document.getElementById('scroll-sentinel');
  if (!sentinel) return;

  let isFetching = false;

  scrollObserver = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && !isFetching && visibleCount < allFiltered.length) {
      isFetching = true;

      // Show spinner
      const loader = document.getElementById('scroll-loader');
      if (loader) loader.style.display = 'flex';

      setTimeout(() => {
        visibleCount += PAGE_SIZE;
        renderProductsGrid(allFiltered.slice(0, visibleCount), true);
        updateLoadMore(allFiltered.length);
        isFetching = false;
      }, 400);
    }
  }, { rootMargin: '200px' });

  scrollObserver.observe(sentinel);
}

// ── Sorting ──
function setupSortListeners() {
  document.getElementById('sort-select')?.addEventListener('change', (e) => {
    currentSort = e.target.value;
    visibleCount = PAGE_SIZE;
    applyFiltersAndRender();
  });
}

// ── View Toggle (Grid/List) ──
function setupViewListeners() {
  const gridBtn = document.getElementById('view-grid');
  const listBtn = document.getElementById('view-list');
  const grid    = document.getElementById('products-grid');

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
    const isOpen = filterSections.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });
}
