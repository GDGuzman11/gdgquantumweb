/**
 * 🏗️ Blueprint Workspace Module
 * Manages the main workspace environment and grid system
 */

export class BlueprintWorkspace {
    constructor() {
        this.workspace = null;
        this.grid = null;
        this.overlay = null;
        this.annotations = null;
        this.isBlueprintMode = false;
        
        console.log('📐 Blueprint Workspace Module Loaded');
    }

    init() {
        try {
            this.createWorkspace();
            this.createGrid();
            this.createOverlay();
            this.createAnnotations();
            this.setupEventListeners();
            
            console.log('✅ Blueprint Workspace Initialized');
        } catch (error) {
            console.error('❌ Blueprint Workspace Init Failed:', error);
            throw error;
        }
    }

    createWorkspace() {
        this.workspace = document.createElement('div');
        this.workspace.className = 'blueprint-workspace';
        
        // Apply workspace styles
        Object.assign(this.workspace.style, {
            position: 'relative',
            width: '100%',
            height: '100vh',
            background: `
                radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)
            `,
            perspective: '2000px'
        });
        
        document.body.appendChild(this.workspace);
    }

    createGrid() {
        this.grid = document.createElement('div');
        this.grid.className = 'blueprint-grid';
        
        Object.assign(this.grid.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: '0.3',
            animation: 'gridPulse 4s ease-in-out infinite',
            pointerEvents: 'none'
        });
        
        this.workspace.appendChild(this.grid);
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'blueprint-overlay';
        
        Object.assign(this.overlay.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: `
                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 212, 255, 0.1) 2px, rgba(0, 212, 255, 0.1) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 212, 255, 0.1) 2px, rgba(0, 212, 255, 0.1) 4px)
            `,
            opacity: '0',
            transition: 'opacity 0.5s ease',
            pointerEvents: 'none'
        });
        
        this.workspace.appendChild(this.overlay);
    }

    createAnnotations() {
        this.annotations = document.createElement('div');
        this.annotations.className = 'technical-annotations';
        
        Object.assign(this.annotations.style, {
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            opacity: '0',
            transition: 'opacity 0.5s ease'
        });

        // Create annotation elements
        const annotationsData = [
            { text: 'HTML5 Foundation Layer', top: '30%', left: '15%' },
            { text: 'CSS3 Styling Framework', top: '40%', right: '20%' },
            { text: 'JavaScript Logic Engine', top: '50%', left: '10%' },
            { text: 'Neural Animation System', top: '60%', right: '15%' }
        ];

        annotationsData.forEach(data => {
            const annotation = this.createAnnotation(data);
            this.annotations.appendChild(annotation);
        });

        this.workspace.appendChild(this.annotations);
    }

    createAnnotation(data) {
        const annotation = document.createElement('div');
        annotation.className = 'annotation';
        annotation.textContent = data.text;
        
        Object.assign(annotation.style, {
            position: 'absolute',
            background: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid #00d4ff',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '9px',
            color: '#00d4ff',
            whiteSpace: 'nowrap',
            top: data.top || 'auto',
            left: data.left || 'auto',
            right: data.right || 'auto',
            bottom: data.bottom || 'auto'
        });

        // Add annotation line
        const line = document.createElement('div');
        Object.assign(line.style, {
            position: 'absolute',
            width: '20px',
            height: '1px',
            background: '#00d4ff',
            top: '50%',
            right: '-20px',
            transform: 'translateY(-50%)'
        });

        const dot = document.createElement('div');
        Object.assign(dot.style, {
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: '#00d4ff',
            borderRadius: '50%',
            top: '50%',
            right: '-24px',
            transform: 'translateY(-50%)'
        });

        annotation.appendChild(line);
        annotation.appendChild(dot);

        return annotation;
    }

    setBlueprintMode(enabled) {
        this.isBlueprintMode = enabled;
        
        if (enabled) {
            this.overlay.style.opacity = '0.6';
            this.annotations.style.opacity = '1';
            document.body.classList.add('blueprint-mode');
        } else {
            this.overlay.style.opacity = '0';
            this.annotations.style.opacity = '0';
            document.body.classList.remove('blueprint-mode');
        }
        
        console.log(`📐 Blueprint mode: ${enabled ? 'ON' : 'OFF'}`);
    }

    setupEventListeners() {
        // Responsive handling
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Performance optimization
        this.workspace.style.willChange = 'transform';
        this.workspace.style.transform = 'translateZ(0)';
    }

    handleResize() {
        // Recalculate grid positioning if needed
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        // Adjust grid size for different screen sizes
        if (viewport.width < 768) {
            this.grid.style.backgroundSize = '20px 20px';
        } else {
            this.grid.style.backgroundSize = '40px 40px';
        }
    }

    getWorkspaceElement() {
        return this.workspace;
    }

    destroy() {
        if (this.workspace && this.workspace.parentNode) {
            this.workspace.parentNode.removeChild(this.workspace);
        }
        
        window.removeEventListener('resize', this.handleResize.bind(this));
        
        console.log('🔄 Blueprint Workspace Destroyed');
    }
}