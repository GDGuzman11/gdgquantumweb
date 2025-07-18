import { Neuron } from './neuron.js';

let canvas, ctx;
const neurons = [];
const NUM_NEURONS = 90;
const LINK_DISTANCE = 130;
const REPULSION_RADIUS = 80;

// Mood definitions
const COLORS = {
  default: { r: 255, g: 200, b: 80 },    // warm yellow
  dreamfield: { r: 100, g: 180, b: 255 }, // soft blue
  combustion: { r: 255, g: 100, b: 100 }, // soft red
  gridlock: { r: 255, g: 255, b: 255 }    // warm white
};

let currentColor = COLORS.default;

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

  const handlePointer = (x, y) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = x - rect.left;
    pointer.y = y - rect.top;
    pointer.active = true;
  };

  window.addEventListener('mousemove', e => handlePointer(e.clientX, e.clientY));
  window.addEventListener('mouseout', () => (pointer.active = false));
  window.addEventListener('touchstart', e => handlePointer(e.touches[0].clientX, e.touches[0].clientY));
  window.addEventListener('touchmove', e => handlePointer(e.touches[0].clientX, e.touches[0].clientY));
  window.addEventListener('touchend', () => (pointer.active = false));

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const BOUND_RADIUS = 500;

  for (let i = 0; i < NUM_NEURONS; i++) {
    const n = new Neuron(centerX, centerY, BOUND_RADIUS);
    n.setGlowColor(currentColor);
    neurons.push(n);
  }

  animate();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  neurons.forEach(n => n.setCenter(centerX, centerY));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const n of neurons) {
    if (pointer.active) {
      const dx = n.x - pointer.x;
      const dy = n.y - pointer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPULSION_RADIUS) {
        const angle = Math.atan2(dy, dx);
        const force = (REPULSION_RADIUS - dist) / REPULSION_RADIUS;
        n.vx += Math.cos(angle) * force * 0.5;
        n.vy += Math.sin(angle) * force * 0.5;
      }
    }

    n.setGlowColor(currentColor);
    n.move(canvas.width, canvas.height);
    n.setGlow(false);
  }

  for (let i = 0; i < neurons.length; i++) {
    let count = 0;
    for (let j = 0; j < neurons.length; j++) {
      if (i === j) continue;
      const dx = neurons[i].x - neurons[j].x;
      const dy = neurons[i].y - neurons[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < LINK_DISTANCE) count++;
    }

    if (pointer.active) {
      const dx = neurons[i].x - pointer.x;
      const dy = neurons[i].y - pointer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < LINK_DISTANCE) count++;
    }

    if (count >= 4) {
      neurons[i].setGlow(true);
    }
  }

  neurons.forEach(n => n.draw(ctx));

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

// Global hooks
window.setNeuralMoodInCanvas = (mood) => {
  currentColor = COLORS[mood] || COLORS.default;
};

window.previewNeuralMoodInCanvas = (mood) => {
  currentColor = COLORS[mood] || COLORS.default;
};

window.clearPreviewMoodInCanvas = () => {
  currentColor = COLORS.default;
};
