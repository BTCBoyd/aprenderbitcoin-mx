// Chapter Page Interactive Features

// Show sticky CTA after 10 seconds
setTimeout(() => {
    const stickyCTA = document.getElementById('stickyArcadiaCTA');
    if (stickyCTA) {
        stickyCTA.style.display = 'block';
    }
}, 10000);

// Track scroll position and update progress bar
let sections = [];
let currentSection = null;

document.addEventListener('DOMContentLoaded', () => {
    // Get all content sections
    sections = [
        { id: 'pre', element: document.querySelector('.prelectura') },
        { id: 'video', element: document.querySelector('.video-section') },
        { id: 'discussion', element: document.querySelector('.discussion') },
        { id: 'deep', element: document.querySelector('.deepdive') },
        { id: 'case', element: document.querySelector('.case-study') },
        { id: 'exercise', element: document.querySelector('.exercise') }
    ].filter(s => s.element);
    
    // Update progress on scroll
    window.addEventListener('scroll', updateProgress);
    updateProgress();
});

function updateProgress() {
    const scrollPosition = window.scrollY + (window.innerHeight / 2);
    
    sections.forEach(section => {
        if (!section.element) return;
        
        const rect = section.element.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        
        const progressStep = document.querySelector(`.progress-step[data-section="${section.id}"]`);
        if (!progressStep) return;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Currently viewing this section
            progressStep.classList.add('active');
            progressStep.classList.remove('completed');
            currentSection = section.id;
        } else if (scrollPosition >= sectionBottom) {
            // Already completed this section
            progressStep.classList.remove('active');
            progressStep.classList.add('completed');
        } else {
            // Haven't reached this section yet
            progressStep.classList.remove('active', 'completed');
        }
    });
}

// Smooth scroll to section when clicking progress step
document.querySelectorAll('.progress-step').forEach(step => {
    step.addEventListener('click', () => {
        const sectionId = step.dataset.section;
        const section = sections.find(s => s.id === sectionId);
        if (section && section.element) {
            section.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
