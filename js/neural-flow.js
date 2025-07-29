// CSS animation system for neural flow
export function initNeuralFlow() {
  const flowContainer = document.getElementById('neuralFlow');
  if (!flowContainer) {
    console.warn('Neural flow container not found');
    return;
  }
  
  const containerRect = flowContainer.getBoundingClientRect();
  
  // Code snippets for generation
  const codeSnippets = [
    'def neural_process():',
    'if data.length > 0:',
    'model.predict(input)',
    'return optimize()',
    'AI.analyze(patterns)',
    'for i in range(nodes):',
    'while learning:',
    'class NeuralNet:',
    'import tensorflow',
    'const ai = new AI()',
    'function think() {',
    'let neurons = []',
    'async process() {',
    'return await ai.learn',
    'export default model',
    'from brain import *',
    'self.weights += delta',
    'matrix.multiply(data)',
    'gradient.descent()',
    'activation.sigmoid()',
    'loss.minimize()',
    'epoch += 1',
    'print("AI thinking...")',
    'console.log("neural")',
    'tf.keras.Sequential(['
  ];

  // Create warm data streams
  function createDataStream() {
    const stream = document.createElement('div');
    const variants = ['data-stream', 'data-stream warm-variant', 'data-stream golden-variant'];
    stream.className = variants[Math.floor(Math.random() * variants.length)];
    
    stream.style.left = Math.random() * containerRect.width + 'px';
    stream.style.height = Math.random() * 200 + 80 + 'px';
    stream.style.animationDelay = Math.random() * 3 + 's';
    stream.style.animationDuration = (Math.random() * 2 + 4) + 's';
    
    flowContainer.appendChild(stream);
    
    setTimeout(() => {
      if (stream.parentNode) {
        stream.parentNode.removeChild(stream);
      }
    }, 8000);
  }

  // Create floating nodes
  function createFloatingNode() {
    const node = document.createElement('div');
    node.className = 'neural-node';
    node.style.left = Math.random() * containerRect.width + 'px';
    node.style.top = Math.random() * containerRect.height + 'px';
    node.style.animationDelay = Math.random() * 12 + 's';
    node.style.animationDuration = (Math.random() * 6 + 10) + 's';
    
    flowContainer.appendChild(node);
    
    setTimeout(() => {
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    }, 18000);
  }

  // Create pulse waves with code generation
  function createPulseWave() {
    const wave = document.createElement('div');
    wave.className = 'pulse-wave';
    const size = Math.random() * 40 + 30;
    wave.style.width = size + 'px';
    wave.style.height = size + 'px';
    const x = Math.random() * (containerRect.width - 100) + 50;
    const y = Math.random() * (containerRect.height - 100) + 50;
    wave.style.left = x + 'px';
    wave.style.top = y + 'px';
    wave.style.animationDelay = Math.random() * 4 + 's';
    
    flowContainer.appendChild(wave);
    
    // Generate code after delay
    setTimeout(() => {
      createCodeGeneration(x + size/2, y + size/2);
    }, (Math.random() * 1 + 2) * 1000);
    
    setTimeout(() => {
      if (wave.parentNode) {
        wave.parentNode.removeChild(wave);
      }
    }, 6000);
  }

  // Create code generation
  function createCodeGeneration(centerX, centerY) {
    const codeCount = Math.random() * 4 + 3;
    
    for (let i = 0; i < codeCount; i++) {
      setTimeout(() => {
        const codeElement = document.createElement('div');
        const variants = ['code-snippet', 'code-snippet variant-1', 'code-snippet variant-2'];
        codeElement.className = variants[Math.floor(Math.random() * variants.length)];
        
        const angle = (Math.PI * 2 * i) / codeCount + (Math.random() - 0.5) * 1;
        const distance = Math.random() * 60 + 40;
        const codeX = centerX + Math.cos(angle) * distance;
        const codeY = centerY + Math.sin(angle) * distance;
        
        const boundedX = Math.max(10, Math.min(containerRect.width - 150, codeX));
        const boundedY = Math.max(10, Math.min(containerRect.height - 20, codeY));
        
        codeElement.style.left = boundedX + 'px';
        codeElement.style.top = boundedY + 'px';
        codeElement.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        
        flowContainer.appendChild(codeElement);
        
        setTimeout(() => {
          if (codeElement.parentNode) {
            codeElement.parentNode.removeChild(codeElement);
          }
        }, 4000);
        
      }, i * 150);
    }
  }

  // Create flowing particles with warm touches
  function createFlowParticle() {
    const particle = document.createElement('div');
    particle.className = 'flow-particle';
    particle.style.left = Math.random() * containerRect.width + 'px';
    particle.style.top = Math.random() * containerRect.height + 'px';
    
    // Add warm glow to some particles
    if (Math.random() > 0.7) {
      particle.style.background = 'rgba(255, 140, 60, 0.3)';
      particle.style.boxShadow = '0 0 6px rgba(255, 140, 60, 0.4)';
    }
    
    // Random movement
    const moveX = (Math.random() - 0.5) * 200;
    const moveY = (Math.random() - 0.5) * 200;
    const duration = Math.random() * 10 + 15;
    
    particle.style.transition = `transform ${duration}s ease-in-out, opacity ${duration}s ease-in-out`;
    flowContainer.appendChild(particle);
    
    // Animate
    requestAnimationFrame(() => {
      particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
      particle.style.opacity = '0';
    });
    
    // Remove after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, duration * 1000);
  }

  // Initialize intervals with increased frequency
  setInterval(createDataStream, 1500); // More frequent streams
  setInterval(createFloatingNode, 5000);
  setInterval(createPulseWave, 4000); // More frequent pulses
  setInterval(createFlowParticle, 2000);
  
  // Create initial elements
  for (let i = 0; i < 5; i++) {
    setTimeout(createDataStream, i * 300);
    setTimeout(createFloatingNode, i * 1500);
    setTimeout(createPulseWave, i * 1000);
  }
  
  console.log('🌊 Neural flow initialized');
}