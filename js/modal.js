// js/modal.js - Modal functionality for about section cards

export function initModal() {
  console.log('🎭 Initializing modal system...');
  
  // Make functions globally accessible for onclick attributes
  window.openCard = openCard;
  window.closeCard = closeCard;
  
  console.log('✅ Modal system ready');
}

function openCard(cardNumber) {
  console.log('Opening card:', cardNumber);
  const modal = document.getElementById('cardModal');
  const modalNumber = document.getElementById('modalNumber');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  
  // Content for each card
  const cardContent = {
    1: {
      title: "The Learning Journey",
      content: `
        <p class="modal-text">Started as a systems analyst in Calgary, diving deep into how complex systems break down and why they fail. Every bug, every crashed server, every frustrated user taught me something fundamental: most problems aren't technical—they're human.</p>
        <p class="modal-text">The real breakthrough came when I realized that understanding the problem is 90% of building the solution. Whether it's a hiring process that overlooks great candidates or a security system that's too complex to use, the issue isn't the technology—it's how we think about the problem.</p>
        <p class="modal-text">This mindset shift led me from fixing broken systems to preventing them from breaking in the first place.</p>
      `
    },
    2: {
      title: "From Ideas to Action", 
      content: `
        <p class="modal-text">Ideas are everywhere. Execution is rare. After years of watching good ideas die in committee meetings and seeing real problems go unsolved, I decided to stop waiting for someone else to build the tools I needed.</p>
        <p class="modal-text">The first step was admitting that traditional approaches weren't working. Resumes get filtered out by ATS systems before humans ever see them. Security training is theoretical when it should be hands-on. The gap between what exists and what's needed kept growing.</p>
        <p class="modal-text">So I started building. Small tools at first, then bigger systems. Each project taught me that the distance between a good idea and a working solution is measured in persistence, not genius.</p>
      `
    },
    3: {
      title: "The Human-Centered Approach",
      content: `
        <p class="modal-text">Technology should amplify human potential, not replace human judgment. Every AI tool I build starts with a simple question: "How can this make someone's life measurably better?"</p>
        <p class="modal-text">For Resum8, it's not about gaming the system—it's about ensuring qualified candidates aren't filtered out by broken processes. For Aegis, it's not about replacing security teams—it's about giving them realistic training environments.</p>
        <p class="modal-text">The goal isn't to automate humans out of the equation. It's to automate the frustrating parts so humans can focus on what they do best: think, create, and solve complex problems.</p>
      `
    },
    4: {
      title: "Building for the Long Term",
      content: `
        <p class="modal-text">GDG Quantum Inc. isn't just a company—it's a commitment to building ethical AI that serves real human needs. Every tool we create is designed to level playing fields, not create new advantages for those who already have them.</p>
        <p class="modal-text">The vision is bigger than any single product. It's about proving that AI can be built responsibly, transparently, and with genuine respect for the people who use it. No dark patterns, no hidden agendas, no data mining disguised as features.</p>
        <p class="modal-text">We're building tools that solve real problems for real people. Everything else is just noise.</p>
      `
    }
  };
  
  const card = cardContent[cardNumber];
  if (!card) return;
  
  // Update modal content
  modalNumber.textContent = String(cardNumber).padStart(2, '0');
  modalTitle.textContent = card.title;
  modalContent.innerHTML = card.content;
  
  // Show modal
  modal.classList.add('active');
}

function closeCard(event) {
  const modal = document.getElementById('cardModal');
  if (event.target === modal) {
    modal.classList.remove('active');
  }
}