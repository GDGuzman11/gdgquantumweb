// Canvas particle system
export function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) {
    console.warn('Neural canvas element not found');
    return;
  }
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  
  // Set canvas size to match container
  function resize() {
    const container = document.querySelector('.neural-flow');
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  // Create initial particles
  function createParticles() {
    particles.length = 0;
    for (let i = 0; i < 8; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.2 + 0.05,
        size: Math.random() * 1.5 + 0.5
      });
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off boundaries
      if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
      if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;
      
      // Keep within bounds
      particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(26, 26, 26, ${particle.alpha})`;
      ctx.fill();
    });

    // Draw connections
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const alpha = (1 - distance / 150) * 0.03;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(26, 26, 26, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  }

  // Initialize
  resize();
  createParticles();
  animate();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
  
  console.log('🎨 Neural canvas initialized');
}