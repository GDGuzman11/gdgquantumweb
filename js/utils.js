// Helper functions and utilities - CLEANED VERSION

// Initialize scroll effects
export function initScrollEffects() {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe elements for animations
  document.querySelectorAll('section, .project-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
  
  console.log('📜 Scroll effects initialized');
}

// Form handling
export function initFormHandling() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) {
    console.warn('Contact form not found');
    return;
  }
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Basic honeypot check
    if (this.website && this.website.value) {
      console.warn('Spam detected via honeypot');
      return false;
    }

    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual backend)
    setTimeout(() => {
      // Show success message
      this.innerHTML = `
        <div style="text-align: center; padding: 3rem; background: rgba(39, 202, 63, 0.1); border-radius: 15px; color: #27ca3f;">
          <h3 style="margin-bottom: 1rem;">✅ Message Sent!</h3>
          <p>Thanks for reaching out! I'll get back to you within 24 hours.</p>
        </div>
      `;
      
      // Track form submission (when analytics is set up)
      console.log('Contact form submitted successfully');
    }, 1500);
  });
  
  console.log('📝 Form handling initialized');
}

// Performance monitoring
export function logPerformance() {
  if (!window.performance) return;
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      const paintEntries = performance.getEntriesByType('paint');
      
      console.log('🚀 Performance metrics:', {
        domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.navigationStart) + 'ms',
        loadComplete: Math.round(perfData.loadEventEnd - perfData.navigationStart) + 'ms',
        firstPaint: paintEntries.length > 0 ? Math.round(paintEntries[0].startTime) + 'ms' : 'N/A',
        firstContentfulPaint: paintEntries.length > 1 ? Math.round(paintEntries[1].startTime) + 'ms' : 'N/A'
      });
    }, 1000);
  });
}

// Error handling
export function initErrorHandling() {
  window.addEventListener('error', (e) => {
    console.error('🚨 JavaScript error:', {
      message: e.message,
      filename: e.filename,
      line: e.lineno,
      column: e.colno,
      error: e.error
    });
  });
  
  window.addEventListener('unhandledrejection', (e) => {
    console.error('🚨 Unhandled promise rejection:', e.reason);
  });
  
  console.log('🛡️ Error handling initialized');
}