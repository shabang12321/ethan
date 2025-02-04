document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#heading-list .nav-link, #mobile-nav .nav-link');
    
    // Update active state on scroll
    function updateActiveSection() {
        let currentSection = '';
        const scrollPosition = window.scrollY + (window.innerHeight / 2);
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Check if we're at the very top (within first 100px)
        if (scrollTop < 100) {
            currentSection = 'one';  // About section
        }
        // Check if we're near the bottom (last section fully visible)
        else if (scrollTop + windowHeight >= documentHeight - 100) {
            currentSection = 'three';  // Contact section
        }
        // Otherwise check which section is in view
        else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = section.id;
                }
            });
        }
        
        // Update active states
        navLinks.forEach(link => {
            const href = link.getAttribute('href').slice(1);
            link.classList.remove('active');
            if (href === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active state on click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();  // Prevent default hash behavior
            const targetId = this.getAttribute('href').slice(1);
            
            // Update active state immediately
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll to target without changing URL
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Force active state after scroll
                setTimeout(() => {
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }, 100);
            }
        });
    });
    
    // Throttled scroll listener for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial check
    updateActiveSection();
    
    // Update on page load to ensure correct highlighting
    window.addEventListener('load', updateActiveSection);
}); 