// ===== DIMENSIONAL SHIFT TOGGLE SYSTEM =====
// Reality-bending theme toggle with continuous dimensional rotation

export function initDimensionalShift() {
  console.log('🌀 Initializing Dimensional Shift...');
  
  // Check if toggle already exists
  const existingToggle = document.querySelector('.dimensional-shift-container');
  if (existingToggle) {
    console.log('🔄 Removing existing toggle...');
    existingToggle.remove();
  }
  
  // Add required company glow styles first
  addCompanyGlowAnimation();
  
  // Create the dimensional shift toggle
  createDimensionalToggle();
  
  // Verify toggle was created
  const createdToggle = document.querySelector('.dimensional-shift-toggle');
  if (createdToggle) {
    console.log('✅ Toggle created successfully');
  } else {
    console.error('❌ Toggle creation failed');
    return;
  }
  
  // Initialize theme system
  initThemeSystem();
  
  // Setup event listeners
  setupEventListeners();
  
  // Apply saved theme
  applySavedTheme();
  
  console.log('✨ Dimensional Shift online! Reality is now malleable.');
}

// Create the dimensional shift toggle HTML
function createDimensionalToggle() {
  // Create the dimensional shift container
  const container = document.createElement('div');
  container.className = 'dimensional-shift-container top-left-toggle';
  container.innerHTML = `
    <div class="dimensional-shift-toggle" 
         role="button" 
         tabindex="0"
         aria-label="Toggle dimensional shift theme"
         aria-pressed="false">
      
      <!-- Dimensional Planes -->
      <div class="dimension-plane dimension-plane-1"></div>
      <div class="dimension-plane dimension-plane-2"></div>
      <div class="dimension-plane dimension-plane-3"></div>
      
      <!-- Screen reader text -->
      <span class="sr-only">Toggle between light and dark theme</span>
    </div>
    
    <span class="dimensional-label">Theme</span>
  `;
  
  // Append to body for fixed positioning
  document.body.appendChild(container);
  
  console.log('🎯 Dimensional toggle positioned below neural indicator');
}

// Initialize theme system
function initThemeSystem() {
  // Ensure root has the theme system ready
  const root = document.documentElement;
  
  // Add CSS custom property support detection
  if (!CSS.supports('color', 'var(--test)')) {
    console.warn('CSS custom properties not supported - fallback mode');
    return false;
  }
  
  // Theme transition handler
  root.style.setProperty('--theme-transition-active', 'true');
  
  return true;
}

// Setup all event listeners
function setupEventListeners() {
  const toggle = document.querySelector('.dimensional-shift-toggle');
  if (!toggle) return;
  
  // Click handler
  toggle.addEventListener('click', handleDimensionalShift);
  
  // Keyboard handler
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDimensionalShift();
    }
  });
  
  // Enhanced hover effects
  toggle.addEventListener('mouseenter', () => {
    if (!toggle.classList.contains('active')) {
      playHoverPreview();
    }
  });
  
  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', handleSystemThemeChange);
  
  console.log('🎮 Event listeners attached to dimensional controls');
}

// Main dimensional shift handler
function handleDimensionalShift() {
  const toggle = document.querySelector('.dimensional-shift-toggle');
  if (!toggle) return;
  
  // Prevent multiple rapid clicks
  if (toggle.classList.contains('transitioning')) return;
  
  const isCurrentlyActive = toggle.classList.contains('active');
  const newTheme = isCurrentlyActive ? 'light' : 'dark';
  
  console.log(`🌀 Shifting to ${newTheme} reality...`);
  
  // Add transitioning state
  toggle.classList.add('transitioning');
  
  // Update toggle state
  toggle.classList.toggle('active');
  toggle.setAttribute('aria-pressed', (!isCurrentlyActive).toString());
  
  // Shift the reality (apply theme)
  shiftReality(newTheme);
  
  // Save theme preference
  saveThemePreference(newTheme);
  
  // Remove transitioning state after animation
  setTimeout(() => {
    toggle.classList.remove('transitioning');
    
    // Trigger celebration effect for dark theme activation
    if (newTheme === 'dark') {
      triggerDimensionalCelebration();
    }
    
    console.log(`✨ Reality shifted to ${newTheme} dimension!`);
  }, 800);
  
  // Analytics tracking
  trackDimensionalShift(newTheme);
}

// Apply the dimensional shift (theme change)
function shiftReality(theme) {
  const root = document.documentElement;
  const body = document.body;
  
  // Apply theme data attribute
  root.setAttribute('data-theme', theme);
  
  // Add body class for additional styling if needed
  body.classList.remove('theme-light', 'theme-dark');
  body.classList.add(`theme-${theme}`);
  
  // Enhance neural system for dark theme
  if (theme === 'dark') {
    enhanceNeuralSystemForDark();
  } else {
    restoreNeuralSystemToLight();
  }
  
  // Trigger company name glow effect
  triggerCompanyNameGlow(theme);
  
  console.log(`🎨 Reality matrix updated to ${theme} theme`);
}

// Enhance neural system for dark theme
function enhanceNeuralSystemForDark() {
  const neuralElements = document.querySelectorAll(
    '.neural-dot, .falling-node, .border-segment, .connection-pulse'
  );
  
  neuralElements.forEach(el => {
    el.style.filter = 'brightness(1.3) drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))';
  });
  
  // Enhance data streams
  const dataStreams = document.querySelectorAll('.data-stream');
  dataStreams.forEach(stream => {
    stream.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.5)';
  });
}

// Restore neural system to light theme
function restoreNeuralSystemToLight() {
  const neuralElements = document.querySelectorAll(
    '.neural-dot, .falling-node, .border-segment, .connection-pulse'
  );
  
  neuralElements.forEach(el => {
    el.style.filter = '';
  });
  
  const dataStreams = document.querySelectorAll('.data-stream');
  dataStreams.forEach(stream => {
    stream.style.boxShadow = '';
  });
}

// Trigger company name glow effect
function triggerCompanyNameGlow(theme) {
  const companyName = document.querySelector('.hero-title .highlight');
  if (!companyName) return;
  
  if (theme === 'dark') {
    // Add epic glow effect
    companyName.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    companyName.style.textShadow = 'var(--company-text-shadow)';
    
    // Trigger glow animation
    setTimeout(() => {
      companyName.style.animation = 'company-glow-pulse 2s ease-in-out infinite alternate';
    }, 600);
  } else {
    // Remove glow effect
    companyName.style.textShadow = 'none';
    companyName.style.animation = 'none';
  }
}

// Add glow animation for company name
function addCompanyGlowAnimation() {
  if (!document.querySelector('#company-glow-styles')) {
    const style = document.createElement('style');
    style.id = 'company-glow-styles';
    style.textContent = `
      @keyframes company-glow-pulse {
        0% {
          text-shadow: 
            0 0 20px rgba(255, 255, 255, 0.6),
            0 0 40px rgba(255, 255, 255, 0.4),
            0 0 60px rgba(255, 255, 255, 0.2);
        }
        100% {
          text-shadow: 
            0 0 30px rgba(255, 255, 255, 0.8),
            0 0 50px rgba(255, 255, 255, 0.6),
            0 0 70px rgba(255, 255, 255, 0.4);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Play hover preview animation
function playHoverPreview() {
  const planes = document.querySelectorAll('.dimension-plane');
  planes.forEach((plane, index) => {
    plane.style.transition = 'transform 0.3s ease';
  });
}

// Trigger celebration effect for dark theme activation
function triggerDimensionalCelebration() {
  // Create celebration particles
  createCelebrationParticles();
  
  // Brief screen flash effect
  createRealityFlash();
  
  console.log('🎉 Dimensional celebration triggered!');
}

// Create celebration particles
function createCelebrationParticles() {
  const container = document.querySelector('.dimensional-shift-container');
  if (!container) return;
  
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        top: 25px;
        left: 25px;
        opacity: 1;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
        animation: celebration-burst 1.5s ease-out forwards;
        --angle: ${(360 / 8) * i}deg;
        --distance: ${40 + Math.random() * 20}px;
      `;
      
      container.appendChild(particle);
      
      // Remove after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1500);
    }, i * 50);
  }
  
  // Add celebration animation if not exists
  if (!document.querySelector('#celebration-styles')) {
    const style = document.createElement('style');
    style.id = 'celebration-styles';
    style.textContent = `
      @keyframes celebration-burst {
        0% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
        100% {
          transform: 
            translate(
              calc(cos(var(--angle)) * var(--distance)),
              calc(sin(var(--angle)) * var(--distance))
            ) 
            scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Create reality flash effect
function createRealityFlash() {
  const flash = document.createElement('div');
  flash.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(circle at center, 
      rgba(255, 255, 255, 0.1) 0%, 
      transparent 60%);
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    animation: reality-flash 0.6s ease-out forwards;
  `;
  
  document.body.appendChild(flash);
  
  setTimeout(() => {
    if (flash.parentNode) {
      flash.parentNode.removeChild(flash);
    }
  }, 600);
  
  // Add flash animation if not exists
  if (!document.querySelector('#flash-styles')) {
    const style = document.createElement('style');
    style.id = 'flash-styles';
    style.textContent = `
      @keyframes reality-flash {
        0% { opacity: 0; }
        30% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// Save theme preference
function saveThemePreference(theme) {
  try {
    localStorage.setItem('gdq-dimensional-theme', theme);
    console.log(`💾 Theme preference saved: ${theme}`);
  } catch (error) {
    console.warn('Failed to save theme preference:', error);
  }
}

// Apply saved theme on load
function applySavedTheme() {
  try {
    const savedTheme = localStorage.getItem('gdq-dimensional-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeToApply = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    if (themeToApply === 'dark') {
      const toggle = document.querySelector('.dimensional-shift-toggle');
      if (toggle) {
        toggle.classList.add('active');
        toggle.setAttribute('aria-pressed', 'true');
      }
      shiftReality('dark');
    }
    
    console.log(`🎯 Applied saved theme: ${themeToApply}`);
  } catch (error) {
    console.warn('Failed to apply saved theme:', error);
  }
}

// Handle system theme changes
function handleSystemThemeChange(e) {
  // Only auto-switch if user hasn't manually set a preference
  const hasManualPreference = localStorage.getItem('gdq-dimensional-theme');
  if (hasManualPreference) return;
  
  const toggle = document.querySelector('.dimensional-shift-toggle');
  if (!toggle) return;
  
  const shouldBeDark = e.matches;
  const isCurrentlyDark = toggle.classList.contains('active');
  
  if (shouldBeDark !== isCurrentlyDark) {
    handleDimensionalShift();
  }
}

// Analytics tracking
function trackDimensionalShift(theme) {
  // Track theme toggle event
  if (typeof window.gtag === 'function') {
    gtag('event', 'dimensional_shift', {
      event_category: 'theme',
      event_label: theme,
      value: 1
    });
  }
  
  // Track for other analytics platforms
  if (typeof window.plausible === 'function') {
    plausible('Dimensional Shift', { props: { theme } });
  }
  
  console.log(`📊 Dimensional shift tracked: ${theme}`);
}

// Error handling
function handleDimensionalError(error, context) {
  console.error(`🚨 Dimensional shift error in ${context}:`, error);
  
  // Fallback to light theme
  const root = document.documentElement;
  root.setAttribute('data-theme', 'light');
  
  // Reset toggle state
  const toggle = document.querySelector('.dimensional-shift-toggle');
  if (toggle) {
    toggle.classList.remove('active', 'transitioning');
    toggle.setAttribute('aria-pressed', 'false');
  }
}

// Export for manual initialization if needed
export { 
  handleDimensionalShift,
  shiftReality,
  triggerDimensionalCelebration 
};

// Global error handler for dimensional issues
window.addEventListener('error', (e) => {
  if (e.message.includes('dimensional') || e.message.includes('theme')) {
    handleDimensionalError(e.error, 'global');
  }
});

console.log('🌀 Dimensional Shift module loaded and ready to bend reality!');