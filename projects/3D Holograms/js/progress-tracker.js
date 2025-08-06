/**
 * 📊 Progress Tracker Module
 * Manages the blueprint panel and construction progress visualization
 */

export class ProgressTracker {
    constructor() {
        this.panel = null;
        this.progressBars = [];
        this.isTracking = false;
        this.updateInterval = null;
        
        this.projectData = {
            name: 'GDG Quantum Website',
            classification: 'Advanced Web Architecture',
            floors: 4,
            codeLines: '2,500+',
            modules: 17,
            performance: 95,
            buildTime: '4 weeks',
            status: 'Operational'
        };
        
        this.progressItems = [
            { name: 'Foundation Layer', baseProgress: 100, variation: 2 },
            { name: 'Styling Framework', baseProgress: 95, variation: 3 },
            { name: 'Logic Engine', baseProgress: 92, variation: 4 },
            { name: 'Neural System', baseProgress: 98, variation: 2 }
        ];
        
        console.log('📊 Progress Tracker Module Loaded');
    }

    init() {
        try {
            this.createBlueprintPanel();
            this.setupEventListeners();
            
            console.log('✅ Progress Tracker Initialized');
        } catch (error) {
            console.error('❌ Progress Tracker Init Failed:', error);
            throw error;
        }
    }

    createBlueprintPanel() {
        const workspace = document.querySelector('.blueprint-workspace');
        if (!workspace) {
            throw new Error('Blueprint workspace not found');
        }

        this.panel = document.createElement('div');
        this.panel.className = 'blueprint-panel';
        
        Object.assign(this.panel.style, {
            position: 'absolute',
            top: '20px',
            left: '20px',
            width: '300px',
            background: 'rgba(0, 0, 0, 0.8)',
            border: '2px solid #00d4ff',
            borderRadius: '12px',
            padding: '20px',
            backdropFilter: 'blur(15px)',
            zIndex: '10',
            fontFamily: '"Courier New", monospace'
        });

        // Create panel content
        this.createPanelTitle();
        this.createProjectInfo();
        this.createProgressSection();
        this.createBuildingStats();

        workspace.appendChild(this.panel);
    }

    createPanelTitle() {
        const title = document.createElement('div');
        title.className = 'panel-title';
        title.textContent = 'Project Blueprint';
        
        Object.assign(title.style, {
            fontSize: '14px',
            color: '#00d4ff',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '20px',
            textAlign: 'center',
            borderBottom: '1px solid #333',
            paddingBottom: '10px'
        });

        this.panel.appendChild(title);
    }

    createProjectInfo() {
        const projectInfo = document.createElement('div');
        projectInfo.className = 'project-info';
        projectInfo.style.marginBottom = '20px';

        const projectName = document.createElement('div');
        projectName.className = 'project-name';
        projectName.textContent = this.projectData.name;
        Object.assign(projectName.style, {
            fontSize: '18px',
            color: '#00ff88',
            marginBottom: '8px',
            textShadow: '0 0 10px rgba(0, 255, 136, 0.5)'
        });

        const classification = document.createElement('div');
        classification.className = 'project-classification';
        classification.textContent = this.projectData.classification;
        Object.assign(classification.style, {
            fontSize: '11px',
            color: '#66ddff',
            background: 'rgba(0, 212, 255, 0.1)',
            padding: '4px 12px',
            borderRadius: '15px',
            display: 'inline-block',
            border: '1px solid rgba(0, 212, 255, 0.3)'
        });

        projectInfo.appendChild(projectName);
        projectInfo.appendChild(classification);
        this.panel.appendChild(projectInfo);
    }

    createProgressSection() {
        const progressSection = document.createElement('div');
        progressSection.className = 'construction-progress';
        progressSection.style.marginBottom = '20px';

        const sectionTitle = document.createElement('div');
        sectionTitle.textContent = 'Construction Progress';
        Object.assign(sectionTitle.style, {
            fontSize: '12px',
            color: '#00d4ff',
            marginBottom: '15px',
            textTransform: 'uppercase'
        });

        progressSection.appendChild(sectionTitle);

        this.progressItems.forEach((item, index) => {
            const progressItem = this.createProgressItem(item, index);
            progressSection.appendChild(progressItem);
        });

        this.panel.appendChild(progressSection);
    }

    createProgressItem(item, index) {
        const progressItem = document.createElement('div');
        progressItem.className = 'progress-item';
        Object.assign(progressItem.style, {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            fontSize: '11px'
        });

        const label = document.createElement('span');
        label.textContent = item.name;
        label.style.color = '#ccc';

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        Object.assign(progressBar.style, {
            width: '120px',
            height: '6px',
            background: '#1a1a1a',
            borderRadius: '3px',
            overflow: 'hidden',
            border: '1px solid #333'
        });

        const progressFill = document.createElement('div');
        progressFill.className = 'progress-fill';
        Object.assign(progressFill.style, {
            height: '100%',
            background: 'linear-gradient(90deg, #00ff88, #00d4ff)',
            borderRadius: '3px',
            width: `${item.baseProgress}%`,
            transition: 'width 2s ease',
            animation: 'progressPulse 3s ease-in-out infinite',
            boxShadow: '0 0 5px rgba(0, 255, 136, 0.3)'
        });

        progressBar.appendChild(progressFill);
        progressItem.appendChild(label);
        progressItem.appendChild(progressBar);

        // Store reference for updates
        this.progressBars.push({
            element: progressFill,
            baseProgress: item.baseProgress,
            variation: item.variation
        });

        return progressItem;
    }

    createBuildingStats() {
        const stats = document.createElement('div');
        stats.className = 'building-stats';
        Object.assign(stats.style, {
            fontSize: '10px',
            lineHeight: '1.6',
            color: '#888'
        });

        const statsHTML = `
            <strong style="color: #00d4ff;">BUILDING SPECIFICATIONS</strong><br>
            Total Floors: <span class="stat-highlight" style="color: #00d4ff; font-weight: bold;">${this.projectData.floors}</span><br>
            Code Lines: <span class="stat-highlight" style="color: #00d4ff; font-weight: bold;">${this.projectData.codeLines}</span><br>
            Modules: <span class="stat-highlight" style="color: #00d4ff; font-weight: bold;">${this.projectData.modules}</span><br>
            Performance: <span class="stat-highlight" style="color: #00d4ff; font-weight: bold;">${this.projectData.performance}/100</span><br>
            Build Time: <span class="stat-highlight" style="color: #00d4ff; font-weight: bold;">${this.projectData.buildTime}</span><br>
            Status: <span class="stat-highlight" style="color: #00d4ff; font-weight: bold;">${this.projectData.status}</span>
        `;

        stats.innerHTML = statsHTML;
        this.panel.appendChild(stats);
    }

    startTracking() {
        if (this.isTracking) return;
        
        this.isTracking = true;
        
        // Update progress bars periodically
        this.updateInterval = setInterval(() => {
            this.updateProgressBars();
        }, 5000);
        
        console.log('📊 Progress tracking started');
    }

    stopTracking() {
        this.isTracking = false;
        
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        
        console.log('⏸️ Progress tracking stopped');
    }

    updateProgressBars() {
        if (!this.isTracking) return;

        this.progressBars.forEach(bar => {
            const currentWidth = parseInt(bar.element.style.width);
            const variation = (Math.random() - 0.5) * bar.variation; // ±variation%
            const newWidth = Math.max(88, Math.min(100, bar.baseProgress + variation));
            
            bar.element.style.width = `${newWidth}%`;
        });
    }

    updateProjectData(newData) {
        this.projectData = { ...this.projectData, ...newData };
        
        // Update the stats section
        const statsElement = this.panel.querySelector('.building-stats');
        if (statsElement) {
            this.panel.removeChild(statsElement);
            this.createBuildingStats();
        }
        
        console.log('📊 Project data updated:', newData);
    }

    animateProgressTo(index, targetProgress) {
        if (index < 0 || index >= this.progressBars.length) return;
        
        const progressBar = this.progressBars[index];
        const currentWidth = parseInt(progressBar.element.style.width);
        const difference = targetProgress - currentWidth;
        const steps = 30;
        const stepSize = difference / steps;
        
        let currentStep = 0;
        const animationInterval = setInterval(() => {
            currentStep++;
            const newWidth = currentWidth + (stepSize * currentStep);
            
            progressBar.element.style.width = `${Math.min(100, Math.max(0, newWidth))}%`;
            
            if (currentStep >= steps) {
                clearInterval(animationInterval);
                progressBar.baseProgress = targetProgress;
            }
        }, 50);
    }

    highlightProgress(index, highlight = true) {
        if (index < 0 || index >= this.progressBars.length) return;
        
        const progressBar = this.progressBars[index];
        
        if (highlight) {
            progressBar.element.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.8)';
            progressBar.element.style.transform = 'scaleY(1.5)';
        } else {
            progressBar.element.style.boxShadow = '0 0 5px rgba(0, 255, 136, 0.3)';
            progressBar.element.style.transform = 'scaleY(1)';
        }
    }

    setupEventListeners() {
        // Make panel draggable on desktop
        if (!this.isMobileDevice()) {
            this.makePanelDraggable();
        }
        
        // Responsive handling
        window.addEventListener('resize', this.handleResize.bind(this));
        this.handleResize(); // Initial call
    }

    makePanelDraggable() {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        const panelTitle = this.panel.querySelector('.panel-title');
        
        panelTitle.style.cursor = 'move';
        panelTitle.style.userSelect = 'none';

        panelTitle.addEventListener('mousedown', (e) => {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            isDragging = true;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                xOffset = currentX;
                yOffset = currentY;
                
                this.panel.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    handleResize() {
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        // Adjust panel size for mobile
        if (viewport.width < 768) {
            this.panel.style.width = '280px';
            this.panel.style.left = '10px';
            this.panel.style.top = '10px';
        } else {
            this.panel.style.width = '300px';
            this.panel.style.left = '20px';
            this.panel.style.top = '20px';
        }
    }

    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    destroy() {
        this.stopTracking();
        
        if (this.panel && this.panel.parentNode) {
            this.panel.parentNode.removeChild(this.panel);
        }
        
        window.removeEventListener('resize', this.handleResize.bind(this));
        
        this.progressBars = [];
        
        console.log('🔄 Progress Tracker Destroyed');
    }
}