/**
 * 🏗️ GDG Quantum - 3D Architecture System
 * Central initialization and module coordination
 */

import { BlueprintWorkspace } from './blueprint-workspace.js';
import { BuildingRenderer } from './building-renderer.js';
import { ParticleSystem } from './particle-system.js';
import { ProgressTracker } from './progress-tracker.js';
import { CameraControls } from './camera-controls.js';
import { InteractionHandler } from './interaction-handler.js';

class ArchitectureSystem {
    constructor() {
        this.modules = new Map();
        this.isInitialized = false;
        
        console.log('🏗️ Architecture System Initializing...');
    }

    async init() {
        try {
            // Initialize workspace foundation
            this.modules.set('workspace', new BlueprintWorkspace());
            
            // Initialize core systems
            this.modules.set('building', new BuildingRenderer());
            this.modules.set('particles', new ParticleSystem());
            this.modules.set('progress', new ProgressTracker());
            this.modules.set('camera', new CameraControls());
            this.modules.set('interaction', new InteractionHandler());

            // Initialize all modules
            for (const [name, module] of this.modules) {
                if (module.init) {
                    await module.init();
                    console.log(`✅ ${name} module initialized`);
                }
            }

            // Setup inter-module communication
            this.setupModuleCommunication();
            
            // Start systems
            this.startSystems();
            
            this.isInitialized = true;
            console.log('🎯 Architecture System Ready');
            
        } catch (error) {
            console.error('❌ Architecture System Init Failed:', error);
            this.handleInitError(error);
        }
    }

    setupModuleCommunication() {
        const camera = this.modules.get('camera');
        const building = this.modules.get('building');
        const interaction = this.modules.get('interaction');

        // Camera controls affect building rotation
        camera.on('blueprintToggle', (enabled) => {
            building.setBlueprintMode(enabled);
        });

        camera.on('rotationToggle', (enabled) => {
            building.setRotationEnabled(enabled);
        });

        camera.on('viewReset', () => {
            building.resetView();
        });

        // Interaction events
        interaction.on('floorHover', (floorIndex, isHovering) => {
            building.highlightFloor(floorIndex, isHovering);
        });
    }

    startSystems() {
        // Start particle system
        const particles = this.modules.get('particles');
        particles.start();

        // Start progress tracking
        const progress = this.modules.get('progress');
        progress.startTracking();

        // Start building animation
        const building = this.modules.get('building');
        building.startAnimation();
    }

    handleInitError(error) {
        // Graceful degradation - show basic content
        document.body.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #00d4ff; font-family: 'Courier New', monospace;">
                <h2>🏗️ GDG Quantum Architecture</h2>
                <p>Loading enhanced 3D experience...</p>
                <p style="font-size: 12px; color: #666;">Fallback mode active</p>
            </div>
        `;
    }

    getModule(name) {
        return this.modules.get(name);
    }

    destroy() {
        for (const [name, module] of this.modules) {
            if (module.destroy) {
                module.destroy();
            }
        }
        this.modules.clear();
        console.log('🔄 Architecture System Destroyed');
    }
}

// Global initialization
let architectureSystem;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeArchitecture);
} else {
    initializeArchitecture();
}

async function initializeArchitecture() {
    try {
        architectureSystem = new ArchitectureSystem();
        await architectureSystem.init();
        
        // Expose to global scope for debugging
        window.architectureSystem = architectureSystem;
        
    } catch (error) {
        console.error('❌ Failed to initialize architecture system:', error);
    }
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (architectureSystem) {
        architectureSystem.destroy();
    }
});

export { ArchitectureSystem };