// Custom cursor functionality
export function initCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) {
    console.warn('Cursor element not found');
    return;
  }
  
  let mouseX = 0, mouseY = 0;

  // Mouse movement tracking
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Cursor animation loop
  function animateCursor() {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();

  // Hover effects for interactive elements
  const hoverElements = document.querySelectorAll('a, button, .project-item');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
  
  console.log('🖱️ Custom cursor initialized');
}