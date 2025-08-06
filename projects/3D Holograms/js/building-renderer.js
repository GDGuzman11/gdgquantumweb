/**
 * 🏢 Building Renderer Module
 * Manages 3D building construction and floor animations
 */

export class BuildingRenderer {
    constructor() {
        this.container = null;
        this.floors = [];
        this.isRotating = true;
        this.isBlueprintMode = false;
        this.animationId = null;
        
        this.floorConfigs = [
            {
                name: 'HTML5 Foundation',
                badge: 'Structure',
                color: '#00ff88',
                zIndex: 0,
                delay: 1000,
                specs: [
                    { label: 'Material', value: 'Semantic HTML5' },
                    { label: 'Load Capacity', value: '17 Modules' },
                    { label: 'Accessibility', value: 'WCAG Compliant' },
                    { label: 'Stability', value: 'Production Grade' }
                ]
            },
            {
                name: 'CSS3 Framework',
                badge: 'Presentation',
                color: '#ff8c3c',
                zIndex: 60,
                delay: 2000,
                specs: [
                    { label: 'Architecture', value: 'Modular CSS' },
                    { label: 'Themes', value: 'Dimensional System' },
                    { label: 'Animations', value: '15+ Effects' },
                    { label: 'Responsive', value: 'Mobile-First' }
                ]
            },
            {
                name: 'JavaScript Engine',
                badge: 'Logic',
                color: '#ff64c8',
                zIndex: 120,
                delay: 3000,
                specs: [
                    { label: 'Standard', value: 'ES6 Modules' },
                    { label: 'Functions', value: '50+ Methods' },
                    { label: 'Interactions', value: 'Dynamic Navigation' },
                    { label: 'Performance', value: 'Optimized' }
                ]
            },
            {
                name: 'Neural Network',
                badge: 'Intelligence',
                color: '#c8ff64',
                zIndex: 180,
                delay: 4000,
                specs: [
                    { label: 'Canvas System', value: 'WebGL Ready' },
                    { label: 'Particles', value: 'Real-time' },
                    { label: 'Adaptability', value: 'Machine Learning' },
                    { label: 'Intelligence', value: 'Self-Optimizing' }
                ]
            }
        ];
        
        console.log('🏢 Building Renderer Module Loaded');
    }

    init() {
        try {
            this.createBuildingContainer();
            this.createFloors();
            this.setupEventListeners();
            
            console.log('✅ Building Renderer Initialized');
        } catch (error) {
            console.error('❌ Building Renderer Init Failed:', error);
            throw error;
        }
    }

    createBuildingContainer() {
        const workspace = document.querySelector('.blueprint-workspace');
        if (!workspace) {
            throw new Error('Blueprint workspace not found');
        }

        this.container = document.createElement('div');
        this.container.className = 'building-container';
        
        Object.assign(this.container.style, {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transformStyle: 'preserve-3d',
            animation: 'buildingRotate 20s linear infinite'
        });

        workspace.appendChild(this.container);
    }

    createFloors() {
        this.floorConfigs.forEach((config, index) => {
            const floor = this.createFloor(config, index);
            this.floors.push(floor);
            this.container.appendChild(floor.element);
        });
    }

    createFloor(config, index) {
        const floorElement = document.createElement('div');
        floorElement.className = `building-floor floor-${index + 1}`;
        
        Object.assign(floorElement.style, {
            position: 'absolute',
            width: '300px',
            height: '200px',
            background: this.getFloorGradient(config.color),
            border: `2px solid ${config.color}80`,
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            transformStyle: 'preserve-3d',
            transform: `translateZ(${config.zIndex}px)`,
            opacity: '0',
            animation: `floorConstruct 3s ease-in-out forwards`,
            animationDelay: `${config.delay}ms`
        });

        // Create floor content
        const content = this.createFloorContent(config);
        floorElement.appendChild(content);

        // Create connection line (except for top floor)
        if (index < this.floorConfigs.length - 1) {
            const connectionLine = this.createConnectionLine(config.color);
            floorElement.appendChild(connectionLine);
        }

        const floorData = {
            element: floorElement,
            config: config,
            index: index
        };

        // Add interaction handlers
        this.addFloorInteractions(floorData);

        return floorData;
    }

    createFloorContent(config) {
        const content = document.createElement('div');
        content.className = 'floor-content';
        
        Object.assign(content.style, {
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        });

        // Header
        const header = document.createElement('div');
        header.className = 'floor-header';
        Object.assign(header.style, {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
        });

        const title = document.createElement('div');
        title.className = 'floor-title';
        title.textContent = config.name;
        Object.assign(title.style, {
            fontSize: '16px',
            fontWeight: 'bold',
            color: config.color,
            textShadow: `0 0 10px ${config.color}`
        });

        const badge = document.createElement('div');
        badge.className = 'floor-badge';
        badge.textContent = config.badge;
        Object.assign(badge.style, {
            background: 'rgba(0, 0, 0, 0.3)',
            border: `1px solid ${config.color}`,
            borderRadius: '15px',
            padding: '4px 12px',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: config.color
        });

        header.appendChild(title);
        header.appendChild(badge);

        // Specifications
        const specs = document.createElement('div');
        specs.className = 'floor-specs';
        Object.assign(specs.style, {
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        });

        config.specs.forEach(spec => {
            const specItem = document.createElement('div');
            specItem.className = 'spec-item';
            Object.assign(specItem.style, {
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                padding: '6px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            });

            const label = document.createElement('span');
            label.className = 'spec-label';
            label.textContent = spec.label;
            label.style.color = 'rgba(255, 255, 255, 0.7)';

            const value = document.createElement('span');
            value.className = 'spec-value';
            value.textContent = spec.value;
            Object.assign(value.style, {
                color: config.color,
                fontWeight: 'bold'
            });

            specItem.appendChild(label);
            specItem.appendChild(value);
            specs.appendChild(specItem);
        });

        content.appendChild(header);
        content.appendChild(specs);

        return content;
    }

    createConnectionLine(color) {
        const line = document.createElement('div');
        line.className = 'connection-line';
        
        Object.assign(line.style, {
            position: 'absolute',
            width: '2px',
            height: '60px',
            background: `linear-gradient(to bottom, ${color}, transparent)`,
            left: '50%',
            bottom: '-60px',
            transform: 'translateX(-50%)',
            animation: 'connectionFlow 2s ease-in-out infinite'
        });

        // Add data flow particle
        const dataFlow = document.createElement('div');
        dataFlow.className = 'data-flow';
        Object.assign(dataFlow.style, {
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: color,
            borderRadius: '50%',
            left: '50%',
            top: '0',
            transform: 'translateX(-50%)',
            animation: 'dataFlowAnimation 3s linear infinite',
            boxShadow: `0 0 10px ${color}`
        });

        line.appendChild(dataFlow);
        return line;
    }

    getFloorGradient(color) {
        const rgb = this.hexToRgb(color);
        return `linear-gradient(135deg, 
            rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1) 0%, 
            rgba(${rgb.r * 0.5}, ${rgb.g * 0.5}, ${rgb.b * 0.5}, 0.05) 50%, 
            rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15) 100%)`;
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    addFloorInteractions(floorData) {
        const { element, config, index } = floorData;

        element.addEventListener('mouseenter', () => {
            this.highlightFloor(index, true);
        });

        element.addEventListener('mouseleave', () => {
            this.highlightFloor(index, false);
        });
    }

    highlightFloor(floorIndex, highlight) {
        const floor = this.floors[floorIndex];
        if (!floor) return;

        const element = floor.element;
        
        if (highlight) {
            element.style.transform += ' scale(1.05)';
            element.style.zIndex = '10';
            element.style.boxShadow = `0 0 30px ${floor.config.color}`;
        } else {
            element.style.transform = element.style.transform.replace(' scale(1.05)', '');
            element.style.zIndex = '';
            element.style.boxShadow = '';
        }
    }

    setBlueprintMode(enabled) {
        this.isBlueprintMode = enabled;
        
        if (enabled) {
            this.container.style.animationPlayState = 'paused';
            this.container.style.transform = 'translate(-50%, -50%) rotateY(45deg) rotateX(15deg)';
        } else {
            this.container.style.animationPlayState = this.isRotating ? 'running' : 'paused';
        }
        
        console.log(`🏢 Building blueprint mode: ${enabled ? 'ON' : 'OFF'}`);
    }

    setRotationEnabled(enabled) {
        this.isRotating = enabled;
        
        if (!this.isBlueprintMode) {
            this.container.style.animationPlayState = enabled ? 'running' : 'paused';
        }
        
        console.log(`🔄 Building rotation: ${enabled ? 'ON' : 'OFF'}`);
    }

    resetView() {
        this.container.style.transform = 'translate(-50%, -50%) rotateY(0deg) rotateX(5deg)';
        this.container.style.animationPlayState = 'paused';
        
        setTimeout(() => {
            if (this.isRotating && !this.isBlueprintMode) {
                this.container.style.animationPlayState = 'running';
            }
        }, 1000);
        
        console.log('🎯 Building view reset');
    }

    startAnimation() {
        if (this.isRotating && !this.isBlueprintMode) {
            this.container.style.animationPlayState = 'running';
        }
    }

    setupEventListeners() {
        // Performance optimization
        this.container.style.willChange = 'transform';
        this.container.style.backfaceVisibility = 'hidden';
    }

    destroy() {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        
        this.floors = [];
        
        console.log('🔄 Building Renderer Destroyed');
    }
}