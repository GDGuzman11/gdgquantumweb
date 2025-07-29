// Mouse interactions and navigation
export function initInteractions() {
  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navigation highlight on scroll
  function updateActiveNav() {
    const sections = ['home', 'about', 'projects', 'contact'];
    const scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      const navLink = document.querySelector(`a[href="#${sectionId}"]`);
      
      if (section && navLink) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
          document.querySelectorAll('.nav a').forEach(link => {
            link.style.color = '#1a1a1a';
            link.style.opacity = '0.6';
          });
          navLink.style.color = '#ff3c3c';
          navLink.style.opacity = '1';
        }
      }
    });
  }

  // Scroll progress indicator (if element exists)
  function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
      progressBar.style.width = scrollPercent + '%';
    }
  }

  // Add scroll listeners
  window.addEventListener('scroll', () => {
    updateActiveNav();
    updateScrollProgress();
  });

  // Add magnetic effect to interactive elements
  const magneticElements = document.querySelectorAll('.hero-link, .project-item, .nav a');
  magneticElements.forEach(el => {
    el.classList.add('magnetic');
  });
  
  console.log('🎯 Interactions initialized');
}