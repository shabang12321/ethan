document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#heading-list .nav-link');
    
    // Update active state on scroll
    function updateActiveSection() {
        let currentSection = '';
        const scrollPosition = window.scrollY;
        
        // Check if we're at the very top
        if (scrollPosition < 100) {
            currentSection = 'one'; // Default to About section at top
        }
        // Check if we're at the bottom
        else if ((window.innerHeight + scrollPosition) >= document.documentElement.scrollHeight - 50) {
            currentSection = 'three'; // Contact section
        }
        else {
            // Find the current section
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100; // Add offset for better detection
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
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            
            // Update active state immediately
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll to target
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
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