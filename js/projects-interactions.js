// ===== BLUEPRINT CAROUSEL SYSTEM ===== 
// Complete replacement for projects-interactions.js

export function initProjectsWorkspace() {
  console.log('🖥️ Initializing Projects Workspace...');
  
  try {
    // Initialize blueprint carousel
    initBlueprintCarousel();
    
    console.log('✅ Projects Workspace fully initialized');
  } catch (error) {
    console.error('🚨 Error initializing projects workspace:', error);
    
    // Graceful degradation
    try {
      initBlueprintCarousel();
    } catch (fallbackError) {
      console.error('🚨 Fallback initialization also failed:', fallbackError);
    }
  }
}

function initBlueprintCarousel() {
  console.log('🎯 Initializing Blueprint Carousel...');
  
  let currentSlide = 0;
  const totalSlides = 3;
  
  // Show specific slide
  function showSlide(slideIndex) {
    try {
      const sheets = document.querySelectorAll('.blueprint-sheet');
      
      if (sheets.length === 0) {
        console.warn('⚠️ No blueprint sheets found');
        return;
      }
      
      // Hide all sheets
      sheets.forEach((sheet, index) => {
        sheet.classList.toggle('active', index === slideIndex);
      });
      
      // Update indicator
      const indicator = document.getElementById('currentSlide');
      if (indicator) {
        indicator.textContent = slideIndex + 1;
      }
      
      // Update navigation buttons
      updateNavButtons(slideIndex);
      
      console.log(`📊 Showing slide ${slideIndex + 1}/${totalSlides}`);
    } catch (error) {
      console.error('🚨 Error showing slide:', error);
    }
  }
  
  // Update navigation button states
  function updateNavButtons(slideIndex) {
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');
    
    if (prevBtn) {
      prevBtn.disabled = slideIndex === 0;
      prevBtn.style.opacity = slideIndex === 0 ? '0.3' : '1';
    }
    
    if (nextBtn) {
      nextBtn.disabled = slideIndex === totalSlides - 1;
      nextBtn.style.opacity = slideIndex === totalSlides - 1 ? '0.3' : '1';
    }
  }
  
  // Navigate to next slide
  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      showSlide(currentSlide);
    }
  }
  
  // Navigate to previous slide
  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      showSlide(currentSlide);
    }
  }
  
  // Open blueprint modal
  function openBlueprintModal(projectId) {
    try {
      console.log(`📐 Opening blueprint for project: ${projectId}`);
      
      const modal = document.getElementById('blueprintModal');
      const currentSheet = document.querySelector('.blueprint-sheet.active');
      
      if (!modal) {
        console.error('❌ Blueprint modal not found');
        return;
      }
      
      // Add expansion animation to current card
      if (currentSheet && !currentSheet.classList.contains('coming-soon')) {
        currentSheet.classList.add('blueprint-opening');
      }
      
      // Show modal after brief delay for animation
      setTimeout(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Remove animation class after modal opens
        setTimeout(() => {
          if (currentSheet) {
            currentSheet.classList.remove('blueprint-opening');
          }
        }, 800);
      }, 200);
      
      console.log('✅ Blueprint modal opened');
    } catch (error) {
      console.error('🚨 Error opening blueprint modal:', error);
    }
  }
  
  // Close blueprint modal
  function closeBlueprintModal(event) {
    try {
      // Only close if clicking backdrop or close button
      if (event && event.target !== event.currentTarget && !event.target.classList.contains('blueprint-close')) {
        return;
      }
      
      const modal = document.getElementById('blueprintModal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        console.log('✅ Blueprint modal closed');
      }
    } catch (error) {
      console.error('🚨 Error closing blueprint modal:', error);
    }
  }
  
  // Setup event listeners
  function setupEventListeners() {
    try {
      // Navigation buttons
      const prevBtn = document.querySelector('.nav-arrow.prev');
      const nextBtn = document.querySelector('.nav-arrow.next');
      
      if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
      }
      
      // Blueprint sheet clicks (only for active, non-coming-soon sheets)
      const sheets = document.querySelectorAll('.blueprint-sheet:not(.coming-soon)');
      sheets.forEach(sheet => {
        sheet.addEventListener('click', () => {
          if (sheet.classList.contains('active')) {
            const projectId = sheet.getAttribute('data-project');
            openBlueprintModal(projectId);
          }
        });
      });
      
      // Modal close events
      const modal = document.getElementById('blueprintModal');
      if (modal) {
        modal.addEventListener('click', closeBlueprintModal);
      }
      
      const closeBtn = document.querySelector('.blueprint-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', closeBlueprintModal);
      }
      
      // Keyboard navigation
      document.addEventListener('keydown', handleKeyboardNavigation);
      
      console.log('🎮 Blueprint event listeners attached');
    } catch (error) {
      console.error('🚨 Error setting up event listeners:', error);
    }
  }
  
  // Handle keyboard navigation
  function handleKeyboardNavigation(e) {
    const modal = document.getElementById('blueprintModal');
    
    // If modal is open, only handle escape
    if (modal && modal.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeBlueprintModal();
      }
      return;
    }
    
    // Only handle navigation if we're on the projects page
    const projectsCard = document.getElementById('projects-card');
    if (!projectsCard || !projectsCard.classList.contains('active')) {
      return;
    }
    
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        prevSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextSlide();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        const activeSheet = document.querySelector('.blueprint-sheet.active:not(.coming-soon)');
        if (activeSheet) {
          const projectId = activeSheet.getAttribute('data-project');
          openBlueprintModal(projectId);
        }
        break;
    }
  }
  
  // Initialize the carousel
  function initializeCarousel() {
    try {
      // Show first slide
      showSlide(0);
      
      // Setup all event listeners
      setupEventListeners();
      
      console.log('✅ Blueprint carousel initialized successfully');
    } catch (error) {
      console.error('🚨 Error initializing blueprint carousel:', error);
    }
  }
  
  // Make close function globally accessible for onclick
  window.closeBlueprint = closeBlueprintModal;
  
  // Start initialization
  initializeCarousel();
}

console.log('🖥️ Projects Workspace module loaded and ready!');