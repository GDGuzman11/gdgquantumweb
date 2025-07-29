// Dynamic card navigation system
export function initInteractions() {
  // Initialize card navigation
  initCardNavigation();
  
  // Add magnetic effect to interactive elements
  const magneticElements = document.querySelectorAll('.hero-link, .neural-nav a, .tool-cta, .back-btn');
  magneticElements.forEach(el => {
    el.classList.add('magnetic');
  });
  
  // Enhanced hover effects for neural navigation
  initNeuralNavEffects();
  
  // Initialize cursor interactions
  initCursorInteractions();
  
  // Initialize page load animations
  initPageLoadAnimations();
  
  console.log('🎯 Dynamic card system initialized');
}

// Card navigation system
function initCardNavigation() {
  const navLinks = document.querySelectorAll('.neural-nav a');
  const backButtons = document.querySelectorAll('.back-btn');
  const contentCards = document.querySelectorAll('.content-card');
  
  let currentCard = 'hero-card';
  let isTransitioning = false;
  
  // Navigation link click handlers
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (isTransitioning) return;
      
      const targetCard = this.getAttribute('data-target');
      if (targetCard && targetCard !== currentCard) {
        transitionToCard(targetCard, 'fade');
      }
    });
  });
  
  // Back button click handlers
  backButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (isTransitioning) return;
      
      const targetCard = this.getAttribute('data-target') || 'hero-card';
      transitionToCard(targetCard, 'fade');
    });
  });
  
  // Card transition function
  function transitionToCard(targetCardId, direction = 'fade') {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    const currentCardElement = document.getElementById(currentCard);
    const targetCardElement = document.getElementById(targetCardId);
    
    if (!currentCardElement || !targetCardElement) {
      isTransitioning = false;
      return;
    }
    
    // Add loading state to trigger element
    const triggerElement = document.querySelector(`[data-target="${targetCardId}"]`);
    if (triggerElement) {
      triggerElement.style.opacity = '0.6';
      triggerElement.style.pointerEvents = 'none';
    }
    
    // Create transition overlay for visual feedback
    createTransitionEffect(targetCardId);
    
    // Set up target card initial state
    targetCardElement.style.transform = 'translateX(0)';
    targetCardElement.style.opacity = '0';
    targetCardElement.style.visibility = 'visible';
    targetCardElement.style.zIndex = '25';
    
    // Start fade transition
    requestAnimationFrame(() => {
      // Fade out current card
      currentCardElement.style.opacity = '0';
      currentCardElement.style.transform = 'translateX(0) scale(0.98)';
      
      // Small delay for smoother transition
      setTimeout(() => {
        // Fade in target card
        targetCardElement.style.opacity = '1';
        targetCardElement.style.transform = 'translateX(0) scale(1)';
      }, 200);
    });
    
    // Complete transition
    setTimeout(() => {
      // Clean up current card
      currentCardElement.classList.remove('active');
      currentCardElement.style.visibility = 'hidden';
      currentCardElement.style.zIndex = '10';
      currentCardElement.style.transform = 'translateX(0) scale(1)';
      
      // Activate target card
      targetCardElement.classList.add('active');
      targetCardElement.style.zIndex = '20';
      
      // Update current card reference
      currentCard = targetCardId;
      
      // Reset trigger element
      if (triggerElement) {
        triggerElement.style.opacity = '';
        triggerElement.style.pointerEvents = '';
      }
      
      // Mark transition as complete
      isTransitioning = false;
      
      // Trigger card-specific animations
      triggerCardAnimations(targetCardId);
      
      console.log(`🌟 Faded to: ${targetCardId}`);
    }, 800);
  }
  
  // Create visual transition effect
  function createTransitionEffect(targetCardId) {
    const effect = document.createElement('div');
    effect.className = 'transition-effect';
    effect.style.cssText = `
      position: fixed;
      top: 50%;
      right: 2rem;
      transform: translateY(-50%);
      background: rgba(255, 140, 60, 0.1);
      border: 1px solid rgba(255, 140, 60, 0.3);
      border-radius: 12px;
      padding: 1rem 1.5rem;
      z-index: 1000;
      font-size: 0.9rem;
      color: rgba(26, 26, 26, 0.8);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      font-family: 'Inter', sans-serif;
    `;
    
    const cardNames = {
      'hero-card': 'Home',
      'about-card': 'About',
      'projects-card': 'Projects', 
      'tools-card': 'Automation Station',
      'contact-card': 'Contact'
    };
    
    effect.textContent = `Loading ${cardNames[targetCardId] || 'Content'}...`;
    document.body.appendChild(effect);
    
    // Animate in
    requestAnimationFrame(() => {
      effect.style.opacity = '1';
    });
    
    // Remove after transition
    setTimeout(() => {
      if (effect.parentNode) {
        effect.style.opacity = '0';
        setTimeout(() => {
          if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
          }
        }, 300);
      }
    }, 600);
  }
  
  // Trigger animations specific to each card
  function triggerCardAnimations(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    
    // Reset any existing animations
    card.style.animation = 'none';
    
    // Trigger card-specific entrance animations
    switch(cardId) {
      case 'about-card':
        animateStoryElements(card);
        break;
      case 'projects-card':
        animateProjectItems(card);
        break;
      case 'tools-card':
        animateToolCards(card);
        break;
      case 'contact-card':
        animateContactForm(card);
        break;
      case 'hero-card':
        animateHeroElements(card);
        break;
    }
  }
  
  // Card-specific animations
  function animateStoryElements(card) {
    const sections = card.querySelectorAll('.story-section');
    sections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, 200 + (index * 150));
    });
  }
  
  function animateProjectItems(card) {
    const items = card.querySelectorAll('.project-item');
    items.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(30px)';
      
      setTimeout(() => {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, 300 + (index * 100));
    });
  }
  
  function animateToolCards(card) {
    const toolCards = card.querySelectorAll('.tool-card');
    toolCards.forEach((toolCard, index) => {
      toolCard.style.opacity = '0';
      toolCard.style.transform = 'translateY(30px) scale(0.95)';
      
      setTimeout(() => {
        toolCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        toolCard.style.opacity = '1';
        toolCard.style.transform = 'translateY(0) scale(1)';
      }, 400 + (index * 150));
    });
  }
  
  function animateContactForm(card) {
    const formGroups = card.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
      group.style.opacity = '0';
      group.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        group.style.opacity = '1';
        group.style.transform = 'translateY(0)';
      }, 300 + (index * 100));
    });
  }
  
  function animateHeroElements(card) {
    const neuralCard = card.querySelector('.neural-border-card');
    const heroLeft = card.querySelector('.hero-left');
    
    if (neuralCard) {
      neuralCard.style.opacity = '0';
      neuralCard.style.transform = 'translateX(30px)';
      setTimeout(() => {
        neuralCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        neuralCard.style.opacity = '1';
        neuralCard.style.transform = 'translateX(0)';
      }, 200);
    }
    
    if (heroLeft) {
      heroLeft.style.opacity = '0';
      heroLeft.style.transform = 'translateY(30px)';
      setTimeout(() => {
        heroLeft.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroLeft.style.opacity = '1';
        heroLeft.style.transform = 'translateY(0)';
      }, 100);
    }
  }
}

// Enhanced neural navigation effects
function initNeuralNavEffects() {
  const navLinks = document.querySelectorAll('.neural-nav a');
  
  navLinks.forEach(link => {
    // Mouse enter effect
    link.addEventListener('mouseenter', function() {
      // Add ripple effect
      createRippleEffect(this);
      
      // Enhance neural indicator
      const cardIndicator = document.querySelector('.neural-indicator-card');
      if (cardIndicator) {
        cardIndicator.style.transform = 'scale(1.1)';
        cardIndicator.style.filter = 'brightness(1.3)';
      }
      
      // Add preview hint
      createNavigationPreview(this);
    });
    
    // Mouse leave effect
    link.addEventListener('mouseleave', function() {
      const cardIndicator = document.querySelector('.neural-indicator-card');
      if (cardIndicator) {
        cardIndicator.style.transform = 'scale(1)';
        cardIndicator.style.filter = 'brightness(1)';
      }
      
      // Remove preview
      removeNavigationPreview();
    });
  });
}

// Create navigation preview on hover
function createNavigationPreview(element) {
  const targetCard = element.getAttribute('data-target');
  const previews = {
    'about-card': 'My story and background',
    'projects-card': 'Current projects and tools',
    'tools-card': 'Automation Station showcase',
    'contact-card': 'Get in touch'
  };
  
  const preview = document.createElement('div');
  preview.className = 'nav-preview';
  preview.style.cssText = `
    position: absolute;
    bottom: -2.5rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.8rem;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 1000;
  `;
  
  preview.textContent = previews[targetCard] || 'Navigate';
  element.style.position = 'relative';
  element.appendChild(preview);
  
  requestAnimationFrame(() => {
    preview.style.opacity = '1';
  });
}

// Remove navigation preview
function removeNavigationPreview() {
  const previews = document.querySelectorAll('.nav-preview');
  previews.forEach(preview => {
    preview.style.opacity = '0';
    setTimeout(() => {
      if (preview.parentNode) {
        preview.parentNode.removeChild(preview);
      }
    }, 300);
  });
}

// Create ripple effect on navigation hover
function createRippleEffect(element) {
  const ripple = document.createElement('div');
  ripple.className = 'nav-ripple';
  
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  
  ripple.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle, rgba(255, 140, 60, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    pointer-events: none;
    z-index: 0;
    animation: ripple-expand 0.6s ease-out;
  `;
  
  element.style.position = 'relative';
  element.appendChild(ripple);
  
  // Remove ripple after animation
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
}

// Initialize enhanced cursor interactions
function initCursorInteractions() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;
  
  // Enhanced hover states for neural elements
  const neuralElements = document.querySelectorAll('.neural-nav a, .falling-node, .neural-indicator-card, .back-btn');
  
  neuralElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.background = 'rgba(100, 116, 139, 0.8)';
      cursor.style.borderColor = 'rgba(255, 180, 100, 0.8)';
      cursor.style.boxShadow = '0 0 20px rgba(255, 140, 60, 0.6)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.background = '#333';
      cursor.style.borderColor = '#000';
      cursor.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    });
  });
}

// Page load animations
function initPageLoadAnimations() {
  // Create a subtle load-in animation for the hero page
  const heroCard = document.getElementById('hero-card');
  
  if (heroCard) {
    heroCard.style.opacity = '0';
    heroCard.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      heroCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      heroCard.style.opacity = '1';
      heroCard.style.transform = 'translateY(0)';
      
      // Trigger hero animations after load
      setTimeout(() => {
        triggerHeroLoadAnimations();
      }, 400);
    }, 100);
  }
}

// Hero-specific load animations
function triggerHeroLoadAnimations() {
  const neuralCard = document.querySelector('.neural-border-card');
  const heroLeft = document.querySelector('.hero-left');
  
  if (neuralCard) {
    neuralCard.style.opacity = '0';
    neuralCard.style.transform = 'translateX(30px)';
    setTimeout(() => {
      neuralCard.style.transition = 'opacity 1s ease 0.3s, transform 1s ease 0.3s';
      neuralCard.style.opacity = '1';
      neuralCard.style.transform = 'translateX(0)';
    }, 200);
  }
  
  if (heroLeft) {
    const elements = heroLeft.querySelectorAll('.hero-intro, .hero-title, .hero-description, .hero-links');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 + (index * 150));
    });
  }
}

// Keyboard navigation support
function initKeyboardNavigation() {
  const navLinks = document.querySelectorAll('.neural-nav a');
  let currentIndex = -1;
  
  document.addEventListener('keydown', (e) => {
    // Only handle keyboard nav when on hero card
    const heroCard = document.getElementById('hero-card');
    if (!heroCard || !heroCard.classList.contains('active')) return;
    
    if (e.key === 'Tab' && e.target.matches('.neural-nav a')) {
      e.target.classList.add('keyboard-focus');
    }
    
    // Arrow key navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      
      if (e.key === 'ArrowDown') {
        currentIndex = (currentIndex + 1) % navLinks.length;
      } else {
        currentIndex = currentIndex <= 0 ? navLinks.length - 1 : currentIndex - 1;
      }
      
      navLinks[currentIndex].focus();
    }
    
    // Enter key to navigate
    if (e.key === 'Enter' && e.target.matches('.neural-nav a')) {
      e.target.click();
    }
    
    // Escape key to return to hero
    if (e.key === 'Escape') {
      const backBtn = document.querySelector('.back-btn');
      if (backBtn) {
        backBtn.click();
      }
    }
  });
  
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') {
      document.querySelectorAll('.keyboard-focus').forEach(el => {
        el.classList.remove('keyboard-focus');
      });
    }
  });
}

// Form handling for contact form
function initFormHandling() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
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
    submitBtn.style.opacity = '0.6';
    
    // Simulate form submission (replace with actual backend)
    setTimeout(() => {
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.style.cssText = `
        text-align: center;
        padding: 3rem;
        background: rgba(39, 202, 63, 0.1);
        border-radius: 15px;
        color: #27ca3f;
        margin-top: 2rem;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
      `;
      successMessage.innerHTML = `
        <h3 style="margin-bottom: 1rem; font-size: 1.2rem;">✅ Message Sent!</h3>
        <p>Thanks for reaching out! I'll get back to you within 24 hours.</p>
      `;
      
      this.appendChild(successMessage);
      
      // Animate success message in
      requestAnimationFrame(() => {
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translateY(0)';
      });
      
      // Hide form
      const formGroups = this.querySelectorAll('.form-group, .submit-btn');
      formGroups.forEach(group => {
        group.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        group.style.opacity = '0.3';
        group.style.transform = 'scale(0.95)';
      });
      
      // Track form submission
      console.log('Contact form submitted successfully');
    }, 1500);
  });
}

// Add dynamic styles for animations
function addDynamicStyles() {
  if (!document.querySelector('#dynamic-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'dynamic-animation-styles';
    style.textContent = `
      @keyframes ripple-expand {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0;
        }
      }
      
      .loading {
        opacity: 0.6 !important;
        transform: translateX(4px);
        pointer-events: none;
      }
      
      .magnetic {
        transition: transform 0.3s cubic-bezier(0.23, 1, 0.320, 1);
      }
      
      .magnetic:hover {
        transform: scale(1.02) translateX(3px);
      }
      
      .neural-nav .magnetic:hover {
        transform: scale(1.01) translateX(8px);
      }
      
      .keyboard-focus {
        outline: 2px solid rgba(255, 140, 60, 0.5) !important;
        outline-offset: 2px;
      }
      
      .transition-effect {
        animation: fade-in-out 0.8s ease;
      }
      
      @keyframes fade-in-out {
        0%, 100% { opacity: 0; transform: translateY(-50%) scale(0.9); }
        50% { opacity: 1; transform: translateY(-50%) scale(1); }
      }
      
      /* Enhanced card transitions - Fade Effect */
      .content-card {
        will-change: transform, opacity;
        transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                   transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .content-card.transitioning {
        pointer-events: none;
      }
      
      .content-card.fade-enter {
        opacity: 0;
        transform: translateX(0) scale(0.96);
      }
      
      .content-card.fade-enter-active {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
      
      .content-card.fade-exit {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
      
      .content-card.fade-exit-active {
        opacity: 0;
        transform: translateX(0) scale(0.98);
      }
      
      /* Performance optimizations */
      .neural-border-card,
      .tool-card,
      .story-section {
        transform: translateZ(0);
        backface-visibility: hidden;
      }
      
      /* Mobile touch improvements */
      @media (max-width: 768px) {
        .magnetic:hover {
          transform: scale(1.01) translateX(2px);
        }
        
        .neural-nav .magnetic:hover {
          transform: scale(1.005) translateX(4px);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Error handling for card transitions
function handleTransitionError(error, cardId) {
  console.error(`🚨 Transition error for ${cardId}:`, error);
  
  // Reset all cards to stable state
  const cards = document.querySelectorAll('.content-card');
  cards.forEach(card => {
    card.style.transform = '';
    card.style.opacity = '';
    card.style.visibility = '';
    card.style.zIndex = '';
    card.classList.remove('active');
  });
  
  // Show hero card as fallback
  const heroCard = document.getElementById('hero-card');
  if (heroCard) {
    heroCard.classList.add('active');
    heroCard.style.visibility = 'visible';
    heroCard.style.opacity = '1';
    heroCard.style.transform = 'translateX(0)';
  }
}

// Initialize all interactions when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  try {
    addDynamicStyles();
    initKeyboardNavigation();
    initFormHandling();
    
    console.log('🎯 Dynamic interactions fully loaded');
  } catch (error) {
    console.error('🚨 Error initializing interactions:', error);
  }
});

// Initialize error handling
window.addEventListener('error', (e) => {
  if (e.message.includes('card') || e.message.includes('transition')) {
    handleTransitionError(e.error, 'unknown');
  }
});

// Export for main.js integration
export { 
  initCardNavigation, 
  initNeuralNavEffects, 
  createRippleEffect,
  initPageLoadAnimations 
};

// Enhanced Contact Form with Security Features
function initEnhancedContactForm() {
  const inputs = document.querySelectorAll('#contactForm input:not(.honeypot), #contactForm textarea');
  const progressFill = document.querySelector('.progress-fill');
  const charCounter = document.querySelector('.char-counter span');
  const charRing = document.querySelector('.char-ring');
  const textarea = document.querySelector('#message');
  const submitBtn = document.querySelector('.submit-btn');
  
  if (!progressFill || !charCounter || !charRing || !textarea) {
    console.warn('Enhanced contact form elements not found');
    return;
  }
  
  // 🛡️ SECURITY FUNCTIONS
  function sanitizeInput(input) {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/[<>"'&]/g, '') // Remove potentially dangerous characters
      .trim();
  }
  
  // Malicious pattern detection
  const blockedPatterns = [
    /\b(hack|exploit|injection|malware|virus|trojan|phishing)\b/i,
    /\b(script|iframe|object|embed|eval|alert)\b/i,
    /(union\s+select|drop\s+table|delete\s+from|insert\s+into)/i, // SQL injection
    /(\{|\[|\$|%|#|\*){3,}/g, // Suspicious character patterns
    /(data:|vbscript:|livescript:)/i, // Dangerous protocols
    /(\bor\b|\band\b).*(\=|\<|\>)/i // Basic SQL patterns
  ];
  
  function validateContent(content) {
    // First sanitize
    const sanitized = sanitizeInput(content);
    
    // Check for blocked patterns
    for (let pattern of blockedPatterns) {
      if (pattern.test(sanitized)) {
        return { 
          valid: false, 
          content: sanitized,
          message: 'Content contains restricted terms or patterns' 
        };
      }
    }
    
    // Check length limits
    if (sanitized.length > 500 && content === textarea.value) {
      return { 
        valid: false, 
        content: sanitized,
        message: 'Message exceeds maximum length' 
      };
    }
    
    if (sanitized.length > 100 && content !== textarea.value) {
      return { 
        valid: false, 
        content: sanitized,
        message: 'Field exceeds maximum length' 
      };
    }
    
    // Check for empty content after sanitization
    if (sanitized.length === 0 && content.length > 0) {
      return {
        valid: false,
        content: sanitized,
        message: 'Content removed due to security filters'
      };
    }
    
    return { valid: true, content: sanitized };
  }
  
  // Rate limiting
  let submitAttempts = 0;
  let lastSubmitTime = 0;
  const RATE_LIMIT_WINDOW = 60000; // 1 minute
  const MAX_ATTEMPTS = 3;
  
  function checkRateLimit() {
    const now = Date.now();
    if (now - lastSubmitTime > RATE_LIMIT_WINDOW) {
      submitAttempts = 0;
    }
    
    if (submitAttempts >= MAX_ATTEMPTS) {
      return {
        allowed: false,
        message: 'Too many submission attempts. Please wait before trying again.'
      };
    }
    
    return { allowed: true };
  }
  
  // 📊 PROGRESS TRACKING
  function updateProgress() {
    const filledInputs = Array.from(inputs).filter(input => {
      const validation = validateContent(input.value);
      return validation.valid && validation.content.length > 0;
    }).length;
    
    const progress = (filledInputs / inputs.length) * 100;
    progressFill.style.width = progress + '%';
    
    // Update progress color based on completion
    if (progress === 100) {
      progressFill.style.background = 'linear-gradient(90deg, #22C55E, #16A34A)'; // Green when complete
    } else {
      progressFill.style.background = 'linear-gradient(90deg, #00D4FF, #0099CC)'; // Blue default
    }
  }
  
  // 🔢 CHARACTER COUNTER
  function updateCharCounter() {
    const validation = validateContent(textarea.value);
    const count = validation.content.length;
    charCounter.textContent = `${count}/500`;
    
    // Update ring state
    if (count > 0) {
      charRing.classList.add('active');
    } else {
      charRing.classList.remove('active');
    }
    
    // Update colors based on validation
    if (!validation.valid) {
      charRing.classList.add('invalid');
      charCounter.style.color = '#EF4444';
    } else {
      charRing.classList.remove('invalid');
      charCounter.style.color = '#6B7280';
    }
    
    // Warning at 90% capacity
    if (count > 450) {
      charCounter.style.color = '#F59E0B'; // Orange warning
    }
  }
  
  // 🔍 REAL-TIME VALIDATION
  function validateInput(input) {
    const validation = validateContent(input.value);
    
    // Visual feedback
    if (!validation.valid) {
      input.classList.add('invalid');
      input.style.borderBottomColor = '#EF4444';
      
      // Show error tooltip
      showValidationError(input, validation.message);
    } else {
      input.classList.remove('invalid');
      input.style.borderBottomColor = '#00D4FF';
      hideValidationError(input);
      
      // Update with sanitized content if different
      if (validation.content !== input.value) {
        input.value = validation.content;
      }
    }
    
    return validation;
  }
  
  // Error tooltip system
  function showValidationError(input, message) {
    // Remove existing error
    hideValidationError(input);
    
    const error = document.createElement('div');
    error.className = 'validation-error';
    error.style.cssText = `
      position: absolute;
      bottom: -2rem;
      left: 0;
      background: #EF4444;
      color: white;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      font-size: 0.8rem;
      white-space: nowrap;
      z-index: 1000;
      animation: fadeInUp 0.3s ease;
    `;
    error.textContent = message;
    
    input.parentElement.style.position = 'relative';
    input.parentElement.appendChild(error);
  }
  
  function hideValidationError(input) {
    const existing = input.parentElement.querySelector('.validation-error');
    if (existing) {
      existing.remove();
    }
  }
  
  // 🎯 EVENT LISTENERS
  inputs.forEach(input => {
    // Real-time validation on input
    input.addEventListener('input', (e) => {
      validateInput(e.target);
      updateProgress();
    });
    
    // Validation on blur (when user leaves field)
    input.addEventListener('blur', (e) => {
      validateInput(e.target);
    });
    
    // Clear errors on focus
    input.addEventListener('focus', (e) => {
      hideValidationError(e.target);
    });
  });
  
  // Character counter for textarea
  textarea.addEventListener('input', updateCharCounter);
  
  // 🚀 ENHANCED FORM SUBMISSION
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    // Remove existing event listener to avoid conflicts
    contactForm.replaceWith(contactForm.cloneNode(true));
    const newForm = document.getElementById('contactForm');
    
    newForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Rate limiting check
      const rateCheck = checkRateLimit();
      if (!rateCheck.allowed) {
        showSubmissionError(rateCheck.message);
        return;
      }
      
      // Honeypot check
      const honeypot = this.querySelector('.honeypot');
      if (honeypot && honeypot.value) {
        console.warn('🚨 Spam detected via honeypot');
        showSubmissionError('Spam detection triggered');
        return;
      }
      
      // Validate all inputs
      const formInputs = this.querySelectorAll('input:not(.honeypot), textarea');
      let allValid = true;
      const formData = {};
      
      formInputs.forEach(input => {
        const validation = validateInput(input);
        if (!validation.valid) {
          allValid = false;
        } else {
          formData[input.name] = validation.content;
        }
      });
      
      if (!allValid) {
        showSubmissionError('Please correct the errors above');
        return;
      }
      
      // Update rate limiting
      submitAttempts++;
      lastSubmitTime = Date.now();
      
      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate secure submission
      setTimeout(() => {
        // Success state
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');
        submitBtn.textContent = 'Message Sent!';
        
        // Log sanitized data (for debugging)
        console.log('📨 Secure form submission:', formData);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form after delay
        setTimeout(() => {
          this.reset();
          submitBtn.classList.remove('success');
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
          updateProgress();
          updateCharCounter();
        }, 3000);
        
      }, 2000);
    });
  }
  
  // Success/Error messaging
  function showSuccessMessage() {
    const container = document.querySelector('.form-container');
    const existing = container.querySelector('.form-message');
    if (existing) existing.remove();
    
    const message = document.createElement('div');
    message.className = 'form-message success';
    message.style.cssText = `
      position: absolute;
      top: 1rem;
      left: 1rem;
      right: 1rem;
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      color: #16A34A;
      padding: 1rem;
      border-radius: 12px;
      text-align: center;
      animation: fadeInUp 0.5s ease;
      z-index: 1000;
    `;
    message.textContent = '✅ Message sent successfully! I\'ll get back to you within 24 hours.';
    
    container.style.position = 'relative';
    container.appendChild(message);
    
    setTimeout(() => message.remove(), 5000);
  }
  
  function showSubmissionError(errorMessage) {
    const container = document.querySelector('.form-container');
    const existing = container.querySelector('.form-message');
    if (existing) existing.remove();
    
    const message = document.createElement('div');
    message.className = 'form-message error';
    message.style.cssText = `
      position: absolute;
      top: 1rem;
      left: 1rem;
      right: 1rem;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #DC2626;
      padding: 1rem;
      border-radius: 12px;
      text-align: center;
      animation: fadeInUp 0.5s ease;
      z-index: 1000;
    `;
    message.textContent = '⚠️ ' + errorMessage;
    
    container.style.position = 'relative';
    container.appendChild(message);
    
    setTimeout(() => message.remove(), 4000);
  }
  
  // Initialize
  updateProgress();
  updateCharCounter();
  
  console.log('🛡️ Enhanced contact form with security initialized');
}

// Export the function
export { initEnhancedContactForm };