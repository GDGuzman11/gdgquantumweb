/**
 * 🖱️ Interaction Handler Module
 * Manages user interactions and floor highlighting
 */

export class InteractionHandler {
    constructor() {
        this.eventEmitter = new EventTarget();
        this.isActive = true;
        this.touchSupport = this.isTouchDevice();
        this.interactionState = {
            hoveredFloor: -1,
            isInteracting: false
        };
        
        console.log('🖱️ Interaction Handler Module Loaded');
    }

    init() {
        try {
            this.setupGlobalEventListeners();
            this.setupFloorInteractions();
            this.setupKeyboardShortcuts();
            
            console.log('✅ Interaction Handler Initialized');
        } catch (error) {
            console.error('❌ Interaction Handler Init Failed:', error);
            throw error;
        }
    }

    setupGlobalEventListeners() {
        // Global interaction state management
        document.addEventListener('mousedown', this.handleGlobalMouseDown.bind(this));
        document.addEventListener('mouseup', this.handleGlobalMouseUp.bind(this));
        document.addEventListener('mousemove', this.handleGlobalMouseMove.bind(this));
        
        // Touch events for mobile
        if (this.touchSupport) {
            document.addEventListener('touchstart', this.handleTouchStart.bind(this));
            document.addEventListener('touchend', this.handleTouchEnd.bind(this));
            document.addEventListener('touchmove', this.handleTouchMove.bind(this));
        }
        
        // Focus management
        document.addEventListener('focusin', this.handleFocusIn.bind(this));
        document.addEventListener('focusout', this.handleFocusOut.bind(this));
        
        // Visibility API
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    setupFloorInteractions() {
        // Wait for building floors to be created
        setTimeout(() => {
            this.attachFloorListeners();
        }, 100);
    }

    attachFloorListeners() {
        const floors = document.querySelectorAll('.building-floor');
        
        floors.forEach((floor, index) => {
            // Mouse events
            floor.addEventListener('mouseenter', (e) => this.handleFloorEnter(e, index));
            floor.addEventListener('mouseleave', (e) => this.handleFloorLeave(e, index));
            floor.addEventListener('click', (e) => this.handleFloorClick(e, index));
            
            // Touch events
            if (this.touchSupport) {
                floor.addEventListener('touchstart', (e) => this.handleFloorTouchStart(e, index));
                floor.addEventListener('touchend', (e) => this.handleFloorTouchEnd(e, index));
            }
            
            // Keyboard accessibility
            floor.setAttribute('tabindex', '0');
            floor.setAttribute('role', 'button');
            floor.setAttribute('aria-label', `Floor ${index + 1}`);
            
            floor.addEventListener('keydown', (e) => this.handleFloorKeyDown(e, index));
            floor.addEventListener('focus', (e) => this.handleFloorFocus(e, index));
            floor.addEventListener('blur', (e) => this.handleFloorBlur(e, index));
        });
        
        console.log(`🖱️ Attached interactions to ${floors.length} floors`);
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (!this.isActive) return;
            
            // Floor navigation shortcuts (1-4)
            const floorNumber = parseInt(e.key);
            if (floorNumber >= 1 && floorNumber <= 4) {
                e.preventDefault();
                this.focusFloor(floorNumber - 1);
                return;
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateFloors(e.key === 'ArrowUp' ? -1 : 1);
                return;
            }
            
            // Escape to clear selection
            if (e.key === 'Escape') {
                this.clearFloorFocus();
                return;
            }
        });
    }

    // Floor interaction handlers
    handleFloorEnter(event, floorIndex) {
        if (!this.isActive) return;
        
        this.interactionState.hoveredFloor = floorIndex;
        this.emit('floorHover', floorIndex, true);
        
        // Add visual feedback
        this.addFloorHoverEffect(event.target, true);
        
        console.log(`🖱️ Floor ${floorIndex + 1} hovered`);
    }

    handleFloorLeave(event, floorIndex) {
        if (!this.isActive) return;
        
        this.interactionState.hoveredFloor = -1;
        this.emit('floorHover', floorIndex, false);
        
        // Remove visual feedback
        this.addFloorHoverEffect(event.target, false);
        
        console.log(`🖱️ Floor ${floorIndex + 1} unhovered`);
    }

    handleFloorClick(event, floorIndex) {
        if (!this.isActive) return;
        
        this.emit('floorClick', floorIndex);
        this.animateFloorClick(event.target);
        
        console.log(`🖱️ Floor ${floorIndex + 1} clicked`);
    }

    handleFloorTouchStart(event, floorIndex) {
        if (!this.isActive) return;
        
        event.preventDefault();
        this.handleFloorEnter(event, floorIndex);
        
        // Add touch feedback
        this.addTouchFeedback(event.target, true);
    }

    handleFloorTouchEnd(event, floorIndex) {
        if (!this.isActive) return;
        
        event.preventDefault();
        this.handleFloorLeave(event, floorIndex);
        this.handleFloorClick(event, floorIndex);
        
        // Remove touch feedback
        this.addTouchFeedback(event.target, false);
    }

    handleFloorKeyDown(event, floorIndex) {
        if (!this.isActive) return;
        
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleFloorClick(event, floorIndex);
        }
    }

    handleFloorFocus(event, floorIndex) {
        if (!this.isActive) return;
        
        this.handleFloorEnter(event, floorIndex);
        this.addFocusRing(event.target, true);
    }

    handleFloorBlur(event, floorIndex) {
        if (!this.isActive) return;
        
        this.handleFloorLeave(event, floorIndex);
        this.addFocusRing(event.target, false);
    }

    // Visual feedback methods
    addFloorHoverEffect(element, isHovering) {
        if (isHovering) {
            element.style.cursor = 'pointer';
            element.style.filter = 'brightness(1.2)';
        } else {
            element.style.cursor = '';
            element.style.filter = '';
        }
    }

    addTouchFeedback(element, isPressed) {
        if (isPressed) {
            element.style.transform += ' scale(0.98)';
            element.style.filter = 'brightness(1.3)';
        } else {
            element.style.transform = element.style.transform.replace(' scale(0.98)', '');
            element.style.filter = '';
        }
    }

    addFocusRing(element, hasFocus) {
        if (hasFocus) {
            element.style.outline = '2px solid #00d4ff';
            element.style.outlineOffset = '4px';
        } else {
            element.style.outline = '';
            element.style.outlineOffset = '';
        }
    }

    animateFloorClick(element) {
        // Quick scale animation
        element.style.transform += ' scale(1.1)';
        element.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            element.style.transform = element.style.transform.replace(' scale(1.1)', '');
            element.style.transition = '';
        }, 100);
        
        // Ripple effect
        this.createRippleEffect(element);
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'interaction-ripple';
        
        Object.assign(ripple.style, {
            position: 'absolute',
            width: '20px',
            height: '20px',
            background: 'rgba(0, 212, 255, 0.6)',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(0)',
            animation: 'rippleExpand 0.6s ease-out',
            pointerEvents: 'none',
            zIndex: '10'
        });
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // Navigation methods
    focusFloor(floorIndex) {
        const floors = document.querySelectorAll('.building-floor');
        if (floorIndex >= 0 && floorIndex < floors.length) {
            floors[floorIndex].focus();
        }
    }

    navigateFloors(direction) {
        const floors = document.querySelectorAll('.building-floor');
        const currentIndex = this.interactionState.hoveredFloor;
        let newIndex = currentIndex + direction;
        
        // Wrap around
        if (newIndex < 0) newIndex = floors.length - 1;
        if (newIndex >= floors.length) newIndex = 0;
        
        this.focusFloor(newIndex);
    }

    clearFloorFocus() {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('building-floor')) {
            focusedElement.blur();
        }
    }

    // Global event handlers
    handleGlobalMouseDown(event) {
        this.interactionState.isInteracting = true;
    }

    handleGlobalMouseUp(event) {
        this.interactionState.isInteracting = false;
    }

    handleGlobalMouseMove(event) {
        // Track mouse movement for potential future features
    }

    handleTouchStart(event) {
        this.interactionState.isInteracting = true;
    }

    handleTouchEnd(event) {
        this.interactionState.isInteracting = false;
    }

    handleTouchMove(event) {
        // Handle touch movement
    }

    handleFocusIn(event) {
        // Track focus changes
    }

    handleFocusOut(event) {
        // Track focus changes
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.pause();
        } else {
            this.resume();
        }
    }

    // Utility methods
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // State management
    setActive(active) {
        this.isActive = active;
        console.log(`🖱️ Interactions ${active ? 'enabled' : 'disabled'}`);
    }

    pause() {
        this.setActive(false);
    }

    resume() {
        this.setActive(true);
    }

    getState() {
        return { ...this.interactionState };
    }

    // Event emitter methods
    on(event, callback) {
        this.eventEmitter.addEventListener(event, callback);
    }

    off(event, callback) {
        this.eventEmitter.removeEventListener(event, callback);
    }

    emit(event, ...args) {
        this.eventEmitter.dispatchEvent(new CustomEvent(event, { detail: args }));
    }

    destroy() {
        // Remove global event listeners
        document.removeEventListener('mousedown', this.handleGlobalMouseDown.bind(this));
        document.removeEventListener('mouseup', this.handleGlobalMouseUp.bind(this));
        document.removeEventListener('mousemove', this.handleGlobalMouseMove.bind(this));
        document.removeEventListener('touchstart', this.handleTouchStart.bind(this));
        document.removeEventListener('touchend', this.handleTouchEnd.bind(this));
        document.removeEventListener('touchmove', this.handleTouchMove.bind(this));
        document.removeEventListener('focusin', this.handleFocusIn.bind(this));
        document.removeEventListener('focusout', this.handleFocusOut.bind(this));
        document.removeEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
        
        // Clear references
        this.eventEmitter = null;
        
        console.log('🔄 Interaction Handler Destroyed');
    }
}