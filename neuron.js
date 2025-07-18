export class Neuron {
  constructor(centerX, centerY, radius) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.boundaryRadius = radius;

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * radius;
    this.x = centerX + Math.cos(angle) * dist;
    this.y = centerY + Math.sin(angle) * dist;

    this.vx = (Math.random() - 0.5) * 1.4;
    this.vy = (Math.random() - 0.5) * 1.4;

    this.glow = false;
    this.glowAlpha = 0;

    // Default to warm yellow
    this.color = { r: 255, g: 200, b: 80 };
    this.currentColor = { ...this.color }; // animated transition state
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    const dx = this.x - this.centerX;
    const dy = this.y - this.centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > this.boundaryRadius) {
      const angle = Math.atan2(dy, dx);
      const normalX = Math.cos(angle);
      const normalY = Math.sin(angle);
      const dot = this.vx * normalX + this.vy * normalY;

      this.vx -= 2 * dot * normalX;
      this.vy -= 2 * dot * normalY;

      this.x = this.centerX + normalX * this.boundaryRadius * 0.99;
      this.y = this.centerY + normalY * this.boundaryRadius * 0.99;
    }

    // Glow fade
    const targetAlpha = this.glow ? 1 : 0;
    this.glowAlpha += (targetAlpha - this.glowAlpha) * 0.08;

    // Smooth color transition
    ['r', 'g', 'b'].forEach(k => {
      this.currentColor[k] += (this.color[k] - this.currentColor[k]) * 0.05;
    });
  }

  setGlow(state) {
    this.glow = state;
  }

  setCenter(x, y) {
    this.centerX = x;
    this.centerY = y;
  }

  setGlowColor(rgb) {
    this.color = { ...rgb };
  }

  draw(ctx) {
    const jitter = this.glowAlpha > 0.01 ? Math.random() * 0.3 : 0;
    const alpha = this.glowAlpha.toFixed(2);
    const { r, g, b } = this.currentColor;

    ctx.beginPath();
    ctx.arc(this.x, this.y, 3.5 + jitter, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.shadowBlur = 14 * this.glowAlpha;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}
