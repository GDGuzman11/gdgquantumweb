/**
 * 🎯 Camera Controls Module
 * Manages view controls and user interactions
 */

export class CameraControls {
    constructor() {
        this.controlsContainer = null;
        this.buttons = {};
        this.eventEmitter = new EventTarget();
        this.state = {
            isBlueprintMode: false,
            isRotating: true,
            isInteractive: true
        };
        
        this.controls = [
            {
                id: 'blueprint',
                icon: '📐',
                title: 'Blueprint Mode',
                action: 'blueprintToggle',
                key: 'b'
            },
            {
                id: 'reset',
                icon: '🎯',
                title: 'Reset View',
                action: 'viewReset',
                key: 'r'
            },
            {
                id: 'rotation',
                icon: '🔄',
                title: 'Toggle Rotation',
                action: 'rotationToggle',
                key: ' '
            }
        ];
        
        console.log('🎯 Camera Controls Module Loaded');
    }

    init() {
        try {
            this.createControlsContainer();
            this.createControlButtons();
            this.setupEventListeners();
            
            console.log('✅ Camera Controls Initialized');
        } catch (error) {
            console.error('❌ Camera Controls Init Failed:', error);
            throw error;
        }
    }

    createControlsContainer() {
        const workspace = document.querySelector('.blueprint-workspace');
        if (!workspace) {
            throw new Error('Blueprint workspace not found');
        }

        this.controlsContainer = document.createElement('div');
        this.controlsContainer.className = 'camera-controls';
        
        Object.assign(this.controlsContainer.style, {
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            gap: '10px',
            zIndex: '10'
        });

        workspace.appendChild(this.controlsContainer);
    }

    createControlButtons() {
        this.controls.forEach(control => {
            const button = this.createControlButton(control);
            this.buttons[control.id] = button;
            this.controlsContainer.appendChild(button.element);
        });
    }

    createControlButton(control) {
        const button = document.createElement('button');
        button.className = `control-btn control-btn-${control.id}`;
        button.innerHTML = control.icon;
        button.title = `${control.title} (${control.key.toUpperCase()})`;
        
        Object.assign(button.style, {
            width: '40px',
            height: '40px',
            background: 'rgba(0, 0, 0, 0.7)',
            border: '2px solid #00d4ff',
            borderRadius: '50%',
            color: '#00d4ff',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            outline: 'none',
            userSelect: 'none'
        });

        // Add hover effects
        button.addEventListener('mouseenter', () => {
            Object.assign(button.style, {
                background: 'rgba(0, 212, 255, 0.1)',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
                transform: 'scale(1.1)'
            });
        });

        button.addEventListener('mouseleave', () => {
            Object.assign(button.style, {
                background: 'rgba(0, 0, 0, 0.7)',
                boxShadow: 'none',
                transform: 'scale(1)'
            });
        });

        // Add click handler
        button.addEventListener('click', () => {
            this.handleControlAction(control.action);
            this.animateButtonPress(button);
        });

        return {
            element: button,
            control: control
        };
    }

    animateButtonPress(button) {
        button.style.transform = 'scale(0.95)';
        button.style.background = 'rgba(0, 212, 255, 0.2)';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.style.background = 'rgba(0, 0, 0, 0.7)';
        }, 150);
    }

    handleControlAction(action) {
        switch (action) {
            case 'blueprintToggle':
                this.toggleBlueprint();
                break;
            case 'viewReset':
                this.resetView();
                break;
            case 'rotationToggle':
                this.toggleRotation();
                break;
            default:
                console.warn(`Unknown control action: ${action}`);
        }
    }

    toggleBlueprint() {
        this.state.isBlueprintMode = !this.state.isBlueprintMode;
        
        // Update button state
        const blueprintBtn = this.buttons.blueprint.element;
        if (this.state.isBlueprintMode) {
            blueprintBtn.style.background = 'rgba(0, 212, 255, 0.3)';
            blueprintBtn.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.5)';
        } else {
            blueprintBtn.style.background = 'rgba(0, 0, 0, 0.7)';
            blueprintBtn.style.boxShadow = 'none';
        }
        
        // Emit event
        this.emit('blueprintToggle', this.state.isBlueprintMode);
        
        console.log(`🎯 Blueprint mode: ${this.state.isBlueprintMode ? 'ON' : 'OFF'}`);
    }

    toggleRotation() {
        this.state.isRotating = !this.state.isRotating;
        
        // Update button state
        const rotationBtn = this.buttons.rotation.element;
        if (!this.state.isRotating) {
            rotationBtn.style.background = 'rgba(255, 140, 60, 0.3)';
            rotationBtn.style.borderColor = '#ff8c3c';
            rotationBtn.style.color = '#ff8c3c';
        } else {
            rotationBtn.style.background = 'rgba(0, 0, 0, 0.7)';
            rotationBtn.style.borderColor = '#00d4ff';
            rotationBtn.style.color = '#00d4ff';
        }
        
        // Emit event
        this.emit('rotationToggle', this.state.isRotating);
        
        console.log(`🎯 Rotation: ${this.state.isRotating ? 'ON' : 'OFF'}`);
    }

    resetView() {
        // Animate reset button
        const resetBtn = this.buttons.reset.element;
        resetBtn.style.background = 'rgba(0, 255, 136, 0.3)';
        resetBtn.style.borderColor = '#00ff88';
        resetBtn.style.color = '#00ff88';
        
        setTimeout(() => {
            resetBtn.style.background = 'rgba(0, 0, 0, 0.7)';
            resetBtn.style.borderColor = '#00d4ff';
            resetBtn.style.color = '#00d4ff';
        }, 1000);
        
        // Emit event
        this.emit('viewReset');
        
        console.log('🎯 View reset');
    }

    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        
        // Touch/mobile support
        if (this.isTouchDevice()) {
            this.setupTouchControls();
        }
        
        // Responsive handling
        window.addEventListener('resize', this.handleResize.bind(this));
        this.handleResize(); // Initial call
    }

    handleKeyDown(event) {
        if (!this.state.isInteractive) return;
        
        // Find control by key
        const control = this.controls.find(ctrl => 
            ctrl.key.toLowerCase() === event.key.toLowerCase()
        );
        
        if (control) {
            event.preventDefault();
            this.handleControlAction(control.action);
            
            // Visual feedback for keyboard interaction
            const button = this.buttons[control.id];
            if (button) {
                this.animateButtonPress(button.element);
            }
        }
    }

    setupTouchControls() {
        // Add touch feedback
        Object.values(this.buttons).forEach(button => {
            button.element.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.animateButtonPress(button.element);
            });
            
            button.element.addEventListener('touchend', (e) => {
                e.preventDefault();
            });
        });
    }

    handleResize() {
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        // Adjust controls for mobile
        if (viewport.width < 768) {
            this.controlsContainer.style.bottom = '10px';
            this.controlsContainer.style.right = '10px';
            this.controlsContainer.style.gap = '8px';
            
            // Make buttons slightly larger on mobile
            Object.values(this.buttons).forEach(button => {
                Object.assign(button.element.style, {
                    width: '45px',
                    height: '45px',
                    fontSize: '18px'
                });
            });
        } else {
            this.controlsContainer.style.bottom = '20px';
            this.controlsContainer.style.right = '20px';
            this.controlsContainer.style.gap = '10px';
            
            Object.values(this.buttons).forEach(button => {
                Object.assign(button.element.style, {
                    width: '40px',
                    height: '40px',
                    fontSize: '16px'
                });
            });
        }
    }

    // Event emitter methods
    on(event, callback) {
        this.eventEmitter.addEventListener(event, callback);
    }

    off(event, callback) {
        this.eventEmitter.removeEventListener(event, callback);
    }

    emit(event, data = null) {
        this.eventEmitter.dispatchEvent(new CustomEvent(event, { detail: data }));
    }

    // Utility methods
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    setInteractive(interactive) {
        this.state.isInteractive = interactive;
        
        Object.values(this.buttons).forEach(button => {
            button.element.style.pointerEvents = interactive ? 'auto' : 'none';
            button.element.style.opacity = interactive ? '1' : '0.5';
        });
    }

    getState() {
        return { ...this.state };
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
    }

    showTooltip(buttonId, message, duration = 2000) {
        const button = this.buttons[buttonId];
        if (!button) return;

        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'control-tooltip';
        tooltip.textContent = message;
        
        Object.assign(tooltip.style, {
            position: 'absolute',
            bottom: '50px',
            right: '0',
            background: 'rgba(0, 0, 0, 0.9)',
            color: '#00d4ff',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            border: '1px solid #00d4ff',
            backdropFilter: 'blur(10px)',
            opacity: '0',
            transform: 'translateY(10px)',
            transition: 'all 0.3s ease',
            pointerEvents: 'none',
            zIndex: '20'
        });

        button.element.style.position = 'relative';
        button.element.appendChild(tooltip);

        // Animate in
        setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        }, 10);

        // Remove after duration
        setTimeout(() => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 300);
        }, duration);
    }

    destroy() {
        // Remove event listeners
        document.removeEventListener('keydown', this.handleKeyDown.bind(this));
        window.removeEventListener('resize', this.handleResize.bind(this));
        
        // Remove controls container
        if (this.controlsContainer && this.controlsContainer.parentNode) {
            this.controlsContainer.parentNode.removeChild(this.controlsContainer);
        }
        
        // Clear references
        this.buttons = {};
        this.eventEmitter = null;
        
        console.log('🔄 Camera Controls Destroyed');
    }
}