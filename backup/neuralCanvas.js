import { Neuron } from './neuron.js';

let canvas, ctx;
const neurons = [];
const NUM_NEURONS = 70;
const LINK_DISTANCE = 130;
const REPULSION_RADIUS = 80;

const pointer = {
  x: null,
  y: null,
  active: false
};

export function initNeuralCanvas() {
  canvas = document.getElementById('neuralCanvas');
  ctx = canvas.getContext('2d');

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // 👇 Desktop mouse
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.active = true;
  });
  window.addEventListener('mouseout', () => (pointer.active = false));

  // 👇 Mobile touch
  window.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    pointer.x = touch.clientX;
    pointer.y = touch.clientY;
    pointer.active = true;
  });
  window.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    pointer.x = touch.clientX;
    pointer.y = touch.clientY;
  });
  window.addEventListener('touchend', () => {
    pointer.active = false;
  });

  // Create neurons
  for (let i = 0; i < NUM_NEURONS; i++) {
    neurons.push(new Neuron(canvas.width, canvas.height));
  }

  animate();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < neurons.length; i++) {
    const n = neurons[i];

    // Repel from mouse or touch
    if (pointer.active) {
      const dx = n.x - pointer.x;
      const dy = n.y - pointer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < REPULSION_RADIUS) {
        const angle = Math.atan2(dy, dx);
        const force = (REPULSION_RADIUS - dist) / REPULSION_RADIUS;
        n.vx += Math.cos(angle) * force * 0.2;
        n.vy += Math.sin(angle) * force * 0.2;
      }
    }

    n.move(canvas.width, canvas.height);

    // Glow if nearby
    let glowing = false;
    if (pointer.active) {
      const dx = n.x - pointer.x;
      const dy = n.y - pointer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      glowing = dist < REPULSION_RADIUS;
    }

    if (glowing) {
      ctx.shadowColor = 'rgba(245, 197, 66, 0.89)';
      ctx.shadowBlur = 18;
    } else {
      ctx.shadowColor = '#000';
      ctx.shadowBlur = 6;
    }

    n.draw(ctx);
    ctx.shadowBlur = 0;
  }

  // Connections
  for (let i = 0; i < neurons.length; i++) {
    for (let j = i + 1; j < neurons.length; j++) {
      drawConnection(neurons[i], neurons[j]);
    }

    if (pointer.active) {
      drawConnection(neurons[i], pointer, true);
    }
  }

  requestAnimationFrame(animate);
}

function drawConnection(p1, p2, isPointer = false) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < LINK_DISTANCE) {
    const alpha = 1 - distance / LINK_DISTANCE;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = `rgba(17, 17, 17, ${isPointer ? alpha * 0.6 : alpha * 0.35})`;
    ctx.lineWidth = isPointer ? 1.5 : 1;
    ctx.stroke();
  }
}
