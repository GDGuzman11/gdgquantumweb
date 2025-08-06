// ===== NEURAL PROJECTS TABLE MODULE =====
// Modular integration for GDG Quantum website projects section
// Maintains 100% compatibility with existing architecture

export function initProjectsTable() {
  console.log('🗂️ Initializing Neural Projects Table...');
  
  try {
    // Check if table container exists before initialization
    const tableContainer = document.querySelector('.projects-table-container');
    if (!tableContainer) {
      console.warn('⚠️ Projects table container not found - graceful degradation');
      return;
    }
    
    // Initialize all table systems
    initSearchSystem();
    initFilterSystem();
    initTableInteractions();
    initPreviewSystem();
    initTechStackInteractions();
    initSortingSystem();
    initNeuralEffects();
    
    console.log('✅ Neural Projects Table initialized successfully');
  } catch (error) {
    console.error('🚨 Error initializing projects table:', error);
    handleTableError(error);
  }
}

// ===== SEARCH SYSTEM =====
function initSearchSystem() {
  const searchInput = document.getElementById('projectsSearchInput');
  if (!searchInput) {
    console.warn('⚠️ Search input not found - skipping search functionality');
    return;
  }
  
  let searchTerm = '';
  
  searchInput.addEventListener('input', function() {
    searchTerm = this.value.toLowerCase();
    applyAllFilters();
  });
  
  // Expose search term for other functions
  window.gdqTable = window.gdqTable || {};
  window.gdqTable.getSearchTerm = () => searchTerm;
  
  console.log('🔍 Search system initialized');
}

// ===== FILTER SYSTEM =====
function initFilterSystem() {
  const filterBtns = document.querySelectorAll('.projects-filter-btn');
  const techFilterBtns = document.querySelectorAll('.tech-filter');
  const clearFiltersBtn = document.getElementById('clearProjectsFilters');
  
  if (filterBtns.length === 0) {
    console.warn('⚠️ Filter buttons not found - skipping filter functionality');
    return;
  }
  
  let activeStatusFilters = new Set();
  let activeTechFilters = new Set();
  
  // Status filter handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filterValue = this.dataset.filter;
      const filterType = this.dataset.type;
      
      if (filterType === 'status') {
        handleStatusFilter(filterValue, this, activeStatusFilters);
      }
      
      updateFilterStatus(activeStatusFilters, activeTechFilters);
      applyAllFilters();
    });
  });
  
  // Tech filter handlers
  techFilterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filterValue = this.dataset.filter;
      const filterType = this.dataset.type;
      
      if (filterType === 'tech') {
        handleTechFilter(filterValue, this, activeTechFilters);
      }
      
      updateFilterStatus(activeStatusFilters, activeTechFilters);
      applyAllFilters();
    });
  });
  
  // Clear filters handler
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', function() {
      clearAllFilters(activeStatusFilters, activeTechFilters);
    });
  }
  
  // Initialize with 'All' status filter active
  const allFilter = document.querySelector('[data-filter="all"][data-type="status"]');
  if (allFilter) {
    allFilter.classList.add('active');
  }
  
  // Expose filter states for other functions
  window.gdqTable.getActiveFilters = () => ({
    status: activeStatusFilters,
    tech: activeTechFilters
  });
  
  console.log('🎛️ Filter system initialized');
}

// ===== STATUS FILTER HANDLING =====
function handleStatusFilter(filterValue, btnElement, activeStatusFilters) {
  if (filterValue === 'all') {
    // Clear all status filters
    activeStatusFilters.clear();
    document.querySelectorAll('[data-type="status"]').forEach(b => {
      b.classList.remove('active');
    });
    btnElement.classList.add('active');
  } else {
    // Toggle individual filter
    if (activeStatusFilters.has(filterValue)) {
      activeStatusFilters.delete(filterValue);
      btnElement.classList.remove('active');
    } else {
      activeStatusFilters.add(filterValue);
      btnElement.classList.add('active');
      // Remove 'all' filter when specific filter is selected
      const allBtn = document.querySelector('[data-filter="all"][data-type="status"]');
      if (allBtn) allBtn.classList.remove('active');
    }
    
    // If no filters active, activate 'all'
    if (activeStatusFilters.size === 0) {
      const allBtn = document.querySelector('[data-filter="all"][data-type="status"]');
      if (allBtn) allBtn.classList.add('active');
    }
  }
}

// ===== TECH FILTER HANDLING =====
function handleTechFilter(filterValue, btnElement, activeTechFilters) {
  if (activeTechFilters.has(filterValue)) {
    activeTechFilters.delete(filterValue);
    btnElement.classList.remove('active');
  } else {
    activeTechFilters.add(filterValue);
    btnElement.classList.add('active');
  }
}

// ===== CLEAR ALL FILTERS =====
function clearAllFilters(activeStatusFilters, activeTechFilters) {
  // Clear filter sets
  activeStatusFilters.clear();
  activeTechFilters.clear();
  
  // Clear search input
  const searchInput = document.getElementById('projectsSearchInput');
  if (searchInput) {
    searchInput.value = '';
  }
  
  // Reset filter buttons
  document.querySelectorAll('.projects-filter-btn, .tech-filter').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Activate 'all' filter
  const allBtn = document.querySelector('[data-filter="all"][data-type="status"]');
  if (allBtn) allBtn.classList.add('active');
  
  updateFilterStatus(activeStatusFilters, activeTechFilters);
  applyAllFilters();
}

// ===== APPLY ALL FILTERS =====
function applyAllFilters() {
  const tableRows = document.querySelectorAll('.projects-table .project-row');
  const searchTerm = window.gdqTable?.getSearchTerm() || '';
  const filters = window.gdqTable?.getActiveFilters() || { status: new Set(), tech: new Set() };
  
  let visibleCount = 0;
  
  tableRows.forEach(row => {
    const text = row.textContent.toLowerCase();
    const statusElement = row.querySelector('.status-badge');
    const status = statusElement?.textContent.toLowerCase().trim() || '';
    
    // Get tech stack from row
    const techItems = row.querySelectorAll('.tech-item');
    const rowTechs = Array.from(techItems).map(item => item.textContent.toLowerCase());
    
    // Check search term
    const matchesSearch = searchTerm === '' || text.includes(searchTerm);
    
    // Check status filter
    const matchesStatus = filters.status.size === 0 || filters.status.has(status);
    
    // Check tech filter
    const matchesTech = filters.tech.size === 0 || 
      Array.from(filters.tech).some(tech => rowTechs.includes(tech));
    
    const shouldShow = matchesSearch && matchesStatus && matchesTech;
    
    // Apply visibility with smooth transitions
    if (shouldShow) {
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';
      row.style.pointerEvents = 'auto';
      row.style.display = 'table-row';
      visibleCount++;
    } else {
      row.style.opacity = '0';
      row.style.transform = 'translateY(10px)';
      row.style.pointerEvents = 'none';
      
      setTimeout(() => {
        if (row.style.opacity === '0') {
          row.style.display = 'none';
        }
      }, 400);
    }
  });
  
  // Update clear button visibility
  updateClearButtonVisibility(filters, searchTerm);
  
  // Update filter status display
  updateFilterStatusDisplay(visibleCount, filters, searchTerm);
}

// ===== UPDATE FILTER STATUS =====
function updateFilterStatus(activeStatusFilters, activeTechFilters) {
  const searchTerm = window.gdqTable?.getSearchTerm() || '';
  const filterStatus = document.getElementById('projectsFilterStatus');
  
  if (!filterStatus) return;
  
  if (activeStatusFilters.size === 0 && activeTechFilters.size === 0 && searchTerm === '') {
    filterStatus.classList.remove('active');
  } else {
    let statusParts = [];
    
    if (searchTerm) {
      statusParts.push(`Search: "${searchTerm}"`);
    }
    
    if (activeStatusFilters.size > 0) {
      statusParts.push(`Status: ${Array.from(activeStatusFilters).join(', ')}`);
    }
    
    if (activeTechFilters.size > 0) {
      statusParts.push(`Tech: ${Array.from(activeTechFilters).join(', ')}`);
    }
    
    filterStatus.textContent = statusParts.join(' | ');
    filterStatus.classList.add('active');
  }
}

// ===== UPDATE CLEAR BUTTON VISIBILITY =====
function updateClearButtonVisibility(filters, searchTerm) {
  const clearFilters = document.getElementById('clearProjectsFilters');
  if (!clearFilters) return;
  
  const hasActiveFilters = filters.status.size > 0 || filters.tech.size > 0 || searchTerm !== '';
  
  if (hasActiveFilters) {
    clearFilters.classList.add('visible');
  } else {
    clearFilters.classList.remove('visible');
  }
}

// ===== UPDATE FILTER STATUS DISPLAY =====
function updateFilterStatusDisplay(visibleCount, filters, searchTerm) {
  const filterStatus = document.getElementById('projectsFilterStatus');
  if (!filterStatus) return;
  
  if (visibleCount === 0) {
    filterStatus.textContent = 'No projects match current filters';
    filterStatus.classList.add('active');
  }
}

// ===== TABLE INTERACTIONS =====
function initTableInteractions() {
  // Table header sorting
  const headers = document.querySelectorAll('.projects-table th');
  
  headers.forEach(header => {
    header.addEventListener('click', function() {
      if (this.classList.contains('preview-cell')) return; // Skip preview column
      
      const tbody = document.querySelector('.projects-table tbody');
      if (!tbody) return;
      
      // Visual feedback
      tbody.style.opacity = '0.6';
      tbody.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        tbody.style.opacity = '1';
        tbody.style.transform = 'translateY(0)';
        
        // Show sorting notification (integrate with existing notification system if available)
        console.log(`🧠 Sorting by ${this.textContent} - Neural pathways optimized`);
      }, 300);
    });
  });
  
  console.log('🗂️ Table interactions initialized');
}

// ===== PREVIEW SYSTEM =====
function initPreviewSystem() {
  const previews = document.querySelectorAll('.project-preview');
  
  previews.forEach(preview => {
    preview.addEventListener('click', function() {
      // Animate preview expansion
      this.style.transform = 'scale(1.1)';
      this.style.borderColor = 'rgba(255, 255, 255, 0.5)';
      
      const content = this.querySelector('.preview-content');
      if (content) {
        content.innerHTML = '▶ Loading<br>Video...';
      }
      
      setTimeout(() => {
        // This would integrate with a modal system in production
        console.log('🎬 Video modal would open with neural frame effects');
        
        // Reset preview state
        this.style.transform = '';
        this.style.borderColor = '';
        if (content) {
          content.innerHTML = content.dataset.originalContent || content.innerHTML;
        }
      }, 1200);
    });
    
    // Store original content for reset
    const content = preview.querySelector('.preview-content');
    if (content) {
      content.dataset.originalContent = content.innerHTML;
    }
  });
  
  console.log('🎬 Preview system initialized');
}

// ===== TECH STACK INTERACTIONS =====
function initTechStackInteractions() {
  const techItems = document.querySelectorAll('.tech-item');
  
  techItems.forEach(item => {
    item.addEventListener('click', function() {
      const tech = this.textContent.toLowerCase();
      
      // Find corresponding filter button and activate it
      const filterBtn = document.querySelector(`[data-filter="${tech}"][data-type="tech"]`);
      if (filterBtn) {
        filterBtn.click();
      }
      
      // Visual feedback
      this.style.transform = 'translateY(-2px) scale(1.1)';
      
      setTimeout(() => {
        this.style.transform = '';
      }, 300);
    });
  });
  
  console.log('🧬 Tech stack interactions initialized');
}

// ===== SORTING SYSTEM =====
function initSortingSystem() {
  // This would be expanded to include actual sorting logic
  // For now, providing the interaction framework
  console.log('📊 Sorting system framework initialized');
}

// ===== NEURAL EFFECTS =====
function initNeuralEffects() {
  const tableRows = document.querySelectorAll('.projects-table .project-row');
  
  tableRows.forEach(row => {
    // Mouse enter effects
    row.addEventListener('mouseenter', function() {
      const complexityDots = this.querySelectorAll('.complexity-dot.active');
      complexityDots.forEach((dot, index) => {
        setTimeout(() => {
          dot.style.transform = 'scale(1.3)';
          dot.style.boxShadow = '0 0 12px rgba(255, 107, 107, 0.6)';
        }, index * 50);
      });
    });
    
    // Mouse leave effects
    row.addEventListener('mouseleave', function() {
      const complexityDots = this.querySelectorAll('.complexity-dot.active');
      complexityDots.forEach(dot => {
        dot.style.transform = '';
        dot.style.boxShadow = '';
      });
    });
  });
  
  // Project link interactions
  const projectLinks = document.querySelectorAll('.project-link');
  projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      this.style.background = 'rgba(255, 255, 255, 0.2)';
      this.style.transform = 'translateY(-3px) scale(1.05)';
      
      setTimeout(() => {
        console.log(`🚀 Opening ${this.textContent} - Neural pathway established`);
        this.style.background = '';
        this.style.transform = '';
      }, 200);
    });
  });
  
  console.log('🧠 Neural effects initialized');
}

// ===== ERROR HANDLING =====
function handleTableError(error) {
  console.error('🚨 Projects table error:', error);
  
  // Graceful degradation - show basic project list if table fails
  const container = document.querySelector('.projects-content-wrapper');
  if (container) {
    const fallbackMessage = document.createElement('div');
    fallbackMessage.style.cssText = `
      text-align: center;
      padding: 3rem;
      background: rgba(255, 60, 60, 0.1);
      border: 1px solid rgba(255, 60, 60, 0.3);
      border-radius: 12px;
      color: #FF6B6B;
      margin: 2rem 0;
    `;
    fallbackMessage.innerHTML = `
      <h3 style="margin-bottom: 1rem;">⚠️ Advanced Table Features Unavailable</h3>
      <p>Basic project information is still accessible. Advanced filtering and interactions are temporarily disabled.</p>
    `;
    
    container.insertBefore(fallbackMessage, container.firstChild);
  }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce search input for better performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to search if needed for large datasets
const debouncedApplyFilters = debounce(applyAllFilters, 150);

// Export for global access if needed
export { 
  applyAllFilters as updateTableFilters,
  clearAllFilters as resetTableFilters
};

console.log('🗂️ Projects Table module loaded and ready for integration!');