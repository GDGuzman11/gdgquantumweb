// Main initialization file for GDG Quantum Inc. website
import { initCursor } from './cursor.js';
import { initNeuralCanvas } from './neural-canvas.js';
import { initNeuralFlow } from './neural-flow.js';
import { initInteractions, initEnhancedContactForm } from './interactions.js';
import { initScrollEffects, initFormHandling, logPerformance, initErrorHandling } from './utils.js';

// 🔥 GLITCH ANIMATION FUNCTION
function initGlitchAnimation() {
  const mpossibleWord = document.getElementById('mpossible');
  const nevitableWord = document.getElementById('nevitable');
  
  if (!mpossibleWord || !nevitableWord) {
    console.warn('Glitch elements not found');
    return;
  }

  function triggerGlitch() {
    // Start dissolving "mpossible"
    mpossibleWord.classList.add('dissolving');
    
    // After dissolve completes, hide it and show "nevitable"
    setTimeout(() => {
      mpossibleWord.classList.add('hidden');
      nevitableWord.classList.remove('hidden');
      nevitableWord.classList.add('materializing');
    }, 1500); // Duration of dissolve animation
    
    // After materialize completes, prepare for next cycle
    setTimeout(() => {
      nevitableWord.classList.remove('materializing');
    }, 3000); // Duration of both animations
    
    // Reset for next cycle
    setTimeout(() => {
      mpossibleWord.classList.remove('dissolving', 'hidden');
      nevitableWord.classList.add('hidden');
      nevitableWord.classList.remove('materializing');
    }, 7000); // Wait before next cycle
  }
  
  // Start the glitch cycle after page loads
  setTimeout(() => {
    triggerGlitch();
    // Repeat every 8 seconds
    setInterval(triggerGlitch, 8000);
  }, 3000); // Initial delay after page load
  
  console.log('🔥 Glitch animation initialized');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🧠 Initializing GDG Quantum Inc. website...');
  
  try {
    // Initialize core systems
    initCursor();
    initNeuralCanvas();
    initNeuralFlow();
    initInteractions();
    initEnhancedContactForm
    initScrollEffects();
    initFormHandling();
    initErrorHandling();
    
    // 🔥 Initialize the epic glitch animation
    initGlitchAnimation();
    
    // Performance monitoring
    logPerformance();
    
    console.log('✅ All systems online!');
  } catch (error) {
    console.error('🚨 Initialization error:', error);
  }
});

// Export for global access if needed
window.GDGQuantum = {
  version: '2.0.0',
  initialized: true,
  glitchMode: 'ACTIVATED' // 🔥
};