// Helper functions and utilities

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

// Utility functions
export function debounce(func, wait) {
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

export function isMobile() {
  return window.innerWidth <= 768;
}

export function isReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Preload critical resources
export function preloadResources() {
  const criticalFonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap'
  ];

  criticalFonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = font;
    document.head.appendChild(link);
  });
}

// Local storage helpers
export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
    return false;
  }
}

export function getLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn('Failed to read from localStorage:', error);
    return defaultValue;
  }
}

// Analytics helper (when implemented)
export function trackEvent(eventName, properties = {}) {
  // Placeholder for analytics tracking
  console.log('📊 Track event:', eventName, properties);
  
  // Example for Google Analytics
  // if (window.gtag) {
  //   gtag('event', eventName, properties);
  // }
  
  // Example for Plausible
  // if (window.plausible) {
  //   plausible(eventName, { props: properties });
  // }
}

// Theme detection
export function getPreferredTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Device info
export function getDeviceInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    screenWidth: screen.width,
    screenHeight: screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight
  };
}