/**
 * ✨ Particle System Module
 * Manages construction particles and environmental effects
 */

export class ParticleSystem {
    constructor() {
        this.container = null;
        this.particles = [];
        this.isActive = false;
        this.animationId = null;
        this.spawnInterval = null;
        
        this.config = {
            spawnRate: 1500, // milliseconds between spawns
            maxParticles: 20,
            particleLifetime: 4000, // milliseconds
            colors: ['#00d4ff', '#00ff88', '#ff8c3c', '#ff64c8', '#c8ff64'],
            size: { min: 2, max: 4 },
            speed: { min: 0.5, max: 2 },
            opacity: { min: 0.3, max: 1 }
        };
        
        console.log('✨ Particle System Module Loaded');
    }

    init() {
        try {
            this.createParticleContainer();
            this.createInitialParticles();
            this.setupEventListeners();
            
            console.log('✅ Particle System Initialized');
        } catch (error) {
            console.error('❌ Particle System Init Failed:', error);
            throw error;
        }
    }

    createParticleContainer() {
        const workspace = document.querySelector('.blueprint-workspace');
        if (!workspace) {
            throw new Error('Blueprint workspace not found');
        }

        this.container = document.createElement('div');
        this.container.className = 'construction-particles';
        
        Object.assign(this.container.style, {
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: '5'
        });

        workspace.appendChild(this.container);
    }

    createInitialParticles() {
        // Create initial set of particles with staggered animations
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                this.spawnParticle(i * 0.25);
            }, i * 1000);
        }
    }

    spawnParticle(positionOffset = null) {
        if (this.particles.length >= this.config.maxParticles) {
            return;
        }

        const particle = this.createParticle(positionOffset);
        this.particles.push(particle);
        this.container.appendChild(particle.element);

        // Remove particle after lifetime
        setTimeout(() => {
            this.removeParticle(particle);
        }, this.config.particleLifetime);
    }

    createParticle(positionOffset = null) {
        const element = document.createElement('div');
        element.className = 'particle';
        
        const size = this.randomBetween(this.config.size.min, this.config.size.max);
        const color = this.getRandomColor();
        const leftPosition = positionOffset !== null 
            ? (positionOffset * 100) % 100
            : Math.random() * 100;
        const animationDuration = this.randomBetween(3, 6);
        const opacity = this.randomBetween(this.config.opacity.min, this.config.opacity.max);
        
        Object.assign(element.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            background: color,
            borderRadius: '50%',
            left: `${leftPosition}%`,
            bottom: '0',
            opacity: opacity,
            animation: `particleFloat ${animationDuration}s linear infinite`,
            boxShadow: `0 0 ${size * 2}px ${color}40`,
            willChange: 'transform, opacity'
        });

        const particleData = {
            element: element,
            id: Date.now() + Math.random(),
            color: color,
            size: size,
            lifetime: this.config.particleLifetime,
            createdAt: Date.now()
        };

        return particleData;
    }

    getRandomColor() {
        return this.config.colors[Math.floor(Math.random() * this.config.colors.length)];
    }

    randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    removeParticle(particle) {
        const index = this.particles.findIndex(p => p.id === particle.id);
        if (index !== -1) {
            this.particles.splice(index, 1);
        }

        if (particle.element && particle.element.parentNode) {
            particle.element.parentNode.removeChild(particle.element);
        }
    }

    start() {
        if (this.isActive) return;
        
        this.isActive = true;
        
        // Start continuous particle spawning
        this.spawnInterval = setInterval(() => {
            if (this.isActive) {
                this.spawnParticle();
            }
        }, this.config.spawnRate);
        
        console.log('✨ Particle System Started');
    }

    stop() {
        this.isActive = false;
        
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        
        console.log('⏸️ Particle System Stopped');
    }

    setSpawnRate(rate) {
        this.config.spawnRate = rate;
        
        if (this.isActive && this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = setInterval(() => {
                if (this.isActive) {
                    this.spawnParticle();
                }
            }, this.config.spawnRate);
        }
    }

    setParticleColor(color) {
        this.config.colors = [color];
    }

    burst(count = 5, position = null) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.spawnParticle(position);
            }, i * 100);
        }
    }

    setupEventListeners() {
        // Performance optimization
        this.container.style.transform = 'translateZ(0)';
        
        // Respond to visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stop();
            } else if (!this.isActive) {
                this.start();
            }
        });
        
        // Reduce particles on low-end devices
        if (this.isLowEndDevice()) {
            this.config.maxParticles = 10;
            this.config.spawnRate = 3000;
        }
    }

    isLowEndDevice() {
        // Simple heuristic for low-end device detection
        return navigator.hardwareConcurrency < 4 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    getParticleCount() {
        return this.particles.length;
    }

    clearAllParticles() {
        this.particles.forEach(particle => {
            if (particle.element && particle.element.parentNode) {
                particle.element.parentNode.removeChild(particle.element);
            }
        });
        
        this.particles = [];
        console.log('🧹 All particles cleared');
    }

    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        console.log('⚙️ Particle config updated:', newConfig);
    }

    destroy() {
        this.stop();
        this.clearAllParticles();
        
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        
        console.log('🔄 Particle System Destroyed');
    }
}